import React, { useState } from "react";
import { db } from "../../services/firebase"; // adjust the path as needed
import { collection, addDoc } from "firebase/firestore";

const HireMeModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null; // Render modal only when isOpen is true

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      // Add the inquiry to the "hireRequests" collection in Firestore.
      await addDoc(collection(db, "hireRequests"), {
        name,
        email,
        projectDetails,
        createdAt: new Date(),
      });
      // Clear form fields
      setName("");
      setEmail("");
      setProjectDetails("");
      onClose(); // Close the modal
    } catch (err) {
      console.error("Error adding inquiry:", err);
      setError("Failed to submit inquiry. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative max-w-xl w-full mx-4 bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-3xl shadow-2xl text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl font-bold text-white hover:text-green-400 transition-colors duration-300"
        >
          &times;
        </button>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Hire Me
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="hire-name" className="block text-sm font-medium text-gray-300">
              Name
            </label>
            <input
              id="hire-name"
              type="text"
              placeholder="Your Name"
              className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="hire-email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              id="hire-email"
              type="email"
              placeholder="you@example.com"
              className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="hire-message" className="block text-sm font-medium text-gray-300">
              Project Details
            </label>
            <textarea
              id="hire-message"
              rows="5"
              placeholder="Tell me about your project..."
              className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              value={projectDetails}
              onChange={(e) => setProjectDetails(e.target.value)}
              required
            ></textarea>
          </div>
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <div className="text-center">
            <button
              type="submit"
              className="mt-4 w-full py-3 bg-green-500 hover:bg-green-600 text-[#101820] font-bold text-lg rounded-lg transition-colors duration-300"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Inquiry"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HireMeModal;
