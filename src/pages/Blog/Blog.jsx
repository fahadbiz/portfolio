import React, { useState, useEffect } from "react";
import { db } from "../../services/firebase"; // Adjust the path as needed
import { collection, getDocs } from "firebase/firestore";

const BlogSection = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch blog posts from Firestore on mount
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const colRef = collection(db, "blogPosts");
        const snapshot = await getDocs(colRef);
        const postsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogPosts(postsData);
      } catch (err) {
        console.error("Error fetching blog posts: ", err);
        setError("Failed to load blog posts.");
      }
      setLoading(false);
    };

    fetchBlogPosts();
  }, []);

  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-[#101820] to-[#131313] text-white overflow-hidden animate-fadeIn">
      {/* Decorative Blobs */}
      <div className="absolute top-[-8rem] left-[-8rem] w-72 h-72 bg-green-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-8rem] right-[-8rem] w-72 h-72 bg-green-400/20 rounded-full blur-3xl animate-pulse delay-200"></div>

      <div className="relative max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Blog
        </h2>

        {loading ? (
          <div className="text-center">Loading blog posts...</div>
        ) : error ? (
          <div className="text-center text-red-400">{error}</div>
        ) : blogPosts.length === 0 ? (
          <p className="text-center">No blog posts available.</p>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="group relative bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl transition-transform duration-300 hover:scale-105 hover:border-2 hover:border-green-400 cursor-pointer"
              >
                {/* Post Image with Gradient Overlay */}
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
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
