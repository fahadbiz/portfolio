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
import { FaEdit } from "react-icons/fa";

// WorkExperienceCard Component
const WorkExperienceCard = ({ experience, onEdit, onDelete }) => {
  const { step, title, company, date, description } = experience;
  return (
    <div className="group relative w-80 h-64 rounded-2xl shadow-2xl overflow-hidden bg-white/10 backdrop-blur-md transition-transform duration-300 hover:scale-105 hover:border-2 hover:border-green-400">
      {/* Front Cover Info */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
        <span className="text-white text-2xl font-bold drop-shadow-lg">{step}</span>
        <h3 className="text-xl font-bold text-white mt-2">{title}</h3>
        <p className="text-xs text-gray-400 mt-1">{company} | {date}</p>
        <p className="mt-2 text-xs text-gray-300 line-clamp-3">{description}</p>
      </div>
      {/* Action Buttons */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-end space-x-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(experience);
          }}
          className="px-3 py-1 bg-green-400 text-gray-900 font-bold text-xs rounded-md transition-colors duration-300 hover:bg-green-500"
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(experience.id);
          }}
          className="px-3 py-1 bg-red-600 text-white font-bold text-xs rounded-md transition-colors duration-300 hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

// WorkExperienceManager Component
const WorkExperienceManager = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
  const [currentExp, setCurrentExp] = useState({
    step: "",
    title: "",
    company: "",
    date: "",
    description: "",
    moreDescription: "",
    link: "",
  });

  // Fetch work experiences from Firestore on mount
  useEffect(() => {
    const fetchExperiences = async () => {
      setLoading(true);
      try {
        const expCollection = collection(db, "workExperiences");
        const expSnapshot = await getDocs(expCollection);
        const expList = expSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setExperiences(expList);
      } catch (error) {
        console.error("Error fetching experiences: ", error);
      }
      setLoading(false);
    };

    fetchExperiences();
  }, []);

  const openAddModal = () => {
    setModalMode("add");
    setCurrentExp({
      step: String(experiences.length + 1).padStart(2, "0"),
      title: "",
      company: "",
      date: "",
      description: "",
      moreDescription: "",
      link: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (exp) => {
    setModalMode("edit");
    setCurrentExp(exp);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentExp((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (modalMode === "add") {
        // Add new document
        const docRef = await addDoc(collection(db, "workExperiences"), currentExp);
        setExperiences((prev) => [...prev, { id: docRef.id, ...currentExp }]);
        setMessage("Work experience added successfully!");
      } else if (modalMode === "edit") {
        // Update existing document
        const docRef = doc(db, "workExperiences", currentExp.id);
        await updateDoc(docRef, currentExp);
        setExperiences((prev) =>
          prev.map((exp) => (exp.id === currentExp.id ? currentExp : exp))
        );
        setMessage("Work experience updated successfully!");
      }
    } catch (error) {
      console.error("Error saving work experience: ", error);
      setMessage("Error saving work experience.");
    }
    setLoading(false);
    closeModal();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this work experience?")) {
      setLoading(true);
      try {
        await deleteDoc(doc(db, "workExperiences", id));
        setExperiences((prev) => prev.filter((exp) => exp.id !== id));
        setMessage("Work experience deleted successfully!");
      } catch (error) {
        console.error("Error deleting work experience: ", error);
        setMessage("Error deleting work experience.");
      }
      setLoading(false);
    }
  };

  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-[#101820] to-[#131313] text-white overflow-hidden animate-fadeIn">
      {/* Decorative Blobs */}
      <div className="absolute top-[-8rem] left-[-8rem] w-72 h-72 bg-green-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-8rem] right-[-8rem] w-72 h-72 bg-green-400/20 rounded-full blur-3xl animate-pulse delay-200"></div>

      <div className="relative max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Work Experience</h2>
        <div className="flex justify-end mb-6">
          <button
            onClick={openAddModal}
            className="px-4 py-2 bg-green-400 text-gray-900 font-bold text-sm rounded-md transition-colors duration-300 hover:bg-green-500"
          >
            Add Work Experience
          </button>
        </div>
        {loading && <p className="text-center text-gray-400">Loading...</p>}
        {experiences.length === 0 && !loading ? (
          <p className="text-center text-gray-400">No work experience available.</p>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center">
            {experiences.map((exp) => (
              <WorkExperienceCard
                key={exp.id}
                experience={exp}
                onEdit={openEditModal}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal for Add/Edit Work Experience */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 cursor-pointer animate-fadeIn"
          onClick={closeModal}
        >
          <div
            className="relative max-w-3xl mx-auto bg-gray-900/90 backdrop-blur-md rounded-2xl p-8 shadow-2xl text-white cursor-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-3xl font-bold text-white hover:text-green-400 transition-colors duration-300"
            >
              &times;
            </button>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
              {modalMode === "edit" ? "Edit Work Experience" : "Add Work Experience"}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={currentExp.title}
                  onChange={handleChange}
                  placeholder="e.g., Software Engineer"
                  className="mt-1 block w-full px-4 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400 transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={currentExp.company}
                  onChange={handleChange}
                  placeholder="e.g., Tech Company A"
                  className="mt-1 block w-full px-4 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400 transition"
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
                  value={currentExp.date}
                  onChange={handleChange}
                  placeholder="e.g., Jan 2020 - Present"
                  className="mt-1 block w-full px-4 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400 transition"
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
                  value={currentExp.description}
                  onChange={handleChange}
                  placeholder="Enter a brief description..."
                  className="mt-1 block w-full px-4 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400 transition"
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
                  value={currentExp.moreDescription}
                  onChange={handleChange}
                  placeholder="Enter additional details..."
                  className="mt-1 block w-full px-4 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400 transition"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Link
                </label>
                <input
                  type="url"
                  name="link"
                  value={currentExp.link}
                  onChange={handleChange}
                  placeholder="https://example.com/experience"
                  className="mt-1 block w-full px-4 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400 transition"
                />
              </div>
              <div className="flex justify-end gap-4 mt-6">
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

export default WorkExperienceManager;
