import React, { useState, useEffect } from "react";
import { db, storage } from "../../../services/firebase"; // adjust the path as needed
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const BlogManager = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
  const [currentPost, setCurrentPost] = useState({
    title: "",
    date: "",
    description: "",
    link: "",
    image: "",
  });
  // Holds the new image file, if selected
  const [imageFile, setImageFile] = useState(null);

  // Fetch blog posts from Firestore
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const colRef = collection(db, "blogPosts");
        const snapshot = await getDocs(colRef);
        const postsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching blog posts: ", error);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const openAddModal = () => {
    setModalMode("add");
    setCurrentPost({
      title: "",
      date: "",
      description: "",
      link: "",
      image: "",
    });
    setImageFile(null);
    setIsModalOpen(true);
  };

  const openEditModal = (post) => {
    setModalMode("edit");
    setCurrentPost(post);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = currentPost.image;
      // If a new image file is provided (either on add or when editing)
      if (imageFile) {
        const imageRef = ref(
          storage,
          `blogImages/${Date.now()}_${imageFile.name}`
        );
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      if (modalMode === "add") {
        const postToAdd = { ...currentPost, image: imageUrl };
        const docRef = await addDoc(collection(db, "blogPosts"), postToAdd);
        setPosts((prev) => [...prev, { id: docRef.id, ...postToAdd }]);
        setMessage("Blog post added successfully!");
      } else if (modalMode === "edit") {
        const postDocRef = doc(db, "blogPosts", currentPost.id);
        const updatedPost = { ...currentPost, image: imageUrl };
        await updateDoc(postDocRef, updatedPost);
        setPosts((prev) =>
          prev.map((post) =>
            post.id === currentPost.id ? updatedPost : post
          )
        );
        setMessage("Blog post updated successfully!");
      }
    } catch (error) {
      console.error("Error saving blog post: ", error);
      setMessage("Error saving blog post.");
    }
    setLoading(false);
    closeModal();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      setLoading(true);
      try {
        await deleteDoc(doc(db, "blogPosts", id));
        setPosts((prev) => prev.filter((post) => post.id !== id));
        setMessage("Blog post deleted successfully!");
      } catch (error) {
        console.error("Error deleting blog post: ", error);
        setMessage("Error deleting blog post.");
      }
      setLoading(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto p-8 bg-gradient-to-b from-[#101820] to-[#131313] text-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Blog Posts</h2>
      {message && <p className="mb-4 text-center text-green-400">{message}</p>}
      {loading && <p className="text-center text-gray-400">Loading...</p>}
      <div className="flex justify-end mb-6">
        <button
          onClick={openAddModal}
          className="bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-500 transition-colors"
        >
          Add Blog Post
        </button>
      </div>
      {posts.length === 0 ? (
        <p className="text-center text-gray-400">No blog posts available.</p>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="group relative bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl transition-transform duration-300 hover:scale-105 hover:border-2 hover:border-green-400 cursor-pointer"
            >
              {/* Post Image */}
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30"></div>
              </div>
              {/* Post Content */}
              <div className="p-4 space-y-2">
                <h3 className="text-xl font-bold">{post.title}</h3>
                <p className="text-xs text-gray-400">{post.date}</p>
                <p className="text-xs text-gray-300 line-clamp-3">{post.description}</p>
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 px-3 py-2 bg-green-400 text-[#101820] font-bold text-xs rounded-md transition-colors duration-300 hover:bg-green-500"
                >
                  Read More
                </a>
              </div>
              {/* Action Buttons */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-end space-x-2 z-20">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditModal(post);
                  }}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-500 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(post.id);
                  }}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Add/Edit Blog Post */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn cursor-pointer"
          onClick={closeModal}
        >
          <div
            className="relative max-w-3xl w-full mx-auto bg-gray-900/95 backdrop-blur-md rounded-2xl p-8 shadow-2xl text-white cursor-auto transform transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-3xl font-bold hover:text-green-400 transition-colors duration-300"
            >
              &times;
            </button>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              {modalMode === "edit" ? "Edit Blog Post" : "Add Blog Post"}
            </h2>
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={currentPost.title}
                  onChange={handleChange}
                  placeholder="Blog Title"
                  className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400 transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Date
                </label>
                <input
                  type="text"
                  name="date"
                  value={currentPost.date}
                  onChange={handleChange}
                  placeholder="e.g., August 2023"
                  className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400 transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Description
                </label>
                <textarea
                  name="description"
                  rows="3"
                  value={currentPost.description}
                  onChange={handleChange}
                  placeholder="Blog description..."
                  className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400 transition"
                  required
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Link
                </label>
                <input
                  type="url"
                  name="link"
                  value={currentPost.link}
                  onChange={handleChange}
                  placeholder="https://blog.com/post"
                  className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400 transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Image
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  className="mt-1 block w-full text-gray-300"
                  accept="image/*"
                  // When adding, image is required. When editing, it's optional.
                  required={modalMode === "add"}
                />
              </div>
              <div className="flex justify-end gap-6 mt-8">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-red-600 text-white font-bold text-sm rounded-md transition-colors duration-300 hover:bg-red-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-gray-900 font-bold text-sm rounded-md transition-colors duration-300 hover:bg-green-700"
                >
                  {modalMode === "edit" ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default BlogManager;
