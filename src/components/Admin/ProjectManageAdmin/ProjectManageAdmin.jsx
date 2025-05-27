import React, { useState, useEffect } from "react";
import { db } from "../../../services/firebase"; // adjust the path as needed
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const PortfolioProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
  const [currentProject, setCurrentProject] = useState({
    title: "",
    link: "",
    description: "",
    moreDescription: "",
  });

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const colRef = collection(db, "projects");
        const snapshot = await getDocs(colRef);
        const projectsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects: ", error);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const openAddModal = () => {
    setModalMode("add");
    // Note: we do not include technologies here because we will display them inline.
    setCurrentProject({
      title: "",
      link: "",
      description: "",
      moreDescription: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (project) => {
    setModalMode("edit");
    setCurrentProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (modalMode === "add") {
        // When adding a project, initialize technologies as an empty array
        const projectToAdd = { ...currentProject, technologies: [] };
        const docRef = await addDoc(collection(db, "projects"), projectToAdd);
        setProjects((prev) => [
          ...prev,
          { id: docRef.id, ...projectToAdd },
        ]);
        setMessage("Project added successfully!");
      } else if (modalMode === "edit") {
        const projDocRef = doc(db, "projects", currentProject.id);
        await updateDoc(projDocRef, currentProject);
        setProjects((prev) =>
          prev.map((proj) =>
            proj.id === currentProject.id ? currentProject : proj
          )
        );
        setMessage("Project updated successfully!");
      }
    } catch (error) {
      console.error("Error saving project: ", error);
      setMessage("Error saving project.");
    }
    setLoading(false);
    closeModal();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setLoading(true);
      try {
        await deleteDoc(doc(db, "projects", id));
        setProjects((prev) => prev.filter((proj) => proj.id !== id));
        setMessage("Project deleted successfully!");
      } catch (error) {
        console.error("Error deleting project: ", error);
        setMessage("Error deleting project.");
      }
      setLoading(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto p-8 bg-gradient-to-b from-[#101820] to-[#131313] text-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Portfolio Projects</h2>
      {message && <p className="mb-4 text-center text-green-400">{message}</p>}
      {loading && <p className="text-center text-gray-400">Loading...</p>}
      <div className="flex justify-end mb-6">
        <button
          onClick={openAddModal}
          className="bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-500 transition-colors"
        >
          Add Project
        </button>
      </div>
      {projects.length === 0 ? (
        <p className="text-center text-gray-400">No projects available.</p>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative p-6 rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl bg-white/10 backdrop-blur-lg border border-white/10 group-hover:border-green-400"
            >
              <div className="relative z-10 space-y-3">
                <h3 className="text-xl font-bold">{project.title}</h3>
                <p className="text-xs text-gray-300 line-clamp-3">
                  {project.description}
                </p>
                {project.moreDescription && (
                  <p className="text-xs text-gray-300 line-clamp-2">
                    {project.moreDescription}
                  </p>
                )}
                <div className="mt-2">
                  <button
                    className="px-2 py-1 rounded-full text-xs transition-colors duration-300 bg-gray-700 text-gray-300 hover:bg-green-500"
                  >
                    {Array.isArray(project.technologies)
                      ? project.technologies.join(", ")
                      : project.technologies}
                  </button>
                </div>
                <div className="mt-2 flex gap-2"></div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 px-4 py-2 bg-green-400 text-[#101820] font-bold text-xs rounded-md transition-colors duration-300 hover:bg-green-500"
                >
                  Visit Project
                </a>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-end space-x-2 z-20">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditModal(project);
                  }}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-500 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(project.id);
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

      {/* Modal for Add/Edit Project */}
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
              {modalMode === "edit" ? "Edit Project" : "Add Project"}
            </h2>
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Project Name
                </label>
                <input
                  type="text"
                  name="title"
                  value={currentProject.title}
                  onChange={handleChange}
                  placeholder="Project Name"
                  className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400 transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Link
                </label>
                <input
                  type="url"
                  name="link"
                  value={currentProject.link}
                  onChange={handleChange}
                  placeholder="https://project.com"
                  className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400 transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Technologies
                </label>
                <input
                  type="text"
                  name="technologies"
                  value={currentProject.technologies}
                  onChange={handleChange}
                  placeholder="e.g., React, Tailwind CSS, Node.js"
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
                  value={currentProject.description}
                  onChange={handleChange}
                  placeholder="Project description..."
                  className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400 transition"
                  required
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  More Description
                </label>
                <textarea
                  name="moreDescription"
                  rows="3"
                  value={currentProject.moreDescription}
                  onChange={handleChange}
                  placeholder="Additional details..."
                  className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400 transition"
                ></textarea>
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

export default PortfolioProjectsManager;
