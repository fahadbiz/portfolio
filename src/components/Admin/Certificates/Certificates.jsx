import React, { useState, useEffect } from "react";
import { db } from "../../../services/firebase"; // Adjust the path as needed
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const CertificatesAdmin = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
  const [currentCert, setCurrentCert] = useState({
    title: "",
    issuer: "",
    link: "",
    date: "",
    description: "",
    moreDescription: "",
  });

  // Fetch certificates from Firestore on mount
  useEffect(() => {
    const fetchCertificates = async () => {
      setLoading(true);
      try {
        const colRef = collection(db, "certificates");
        const snapshot = await getDocs(colRef);
        const certsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCertificates(certsData);
      } catch (error) {
        console.error("Error fetching certificates: ", error);
      }
      setLoading(false);
    };

    fetchCertificates();
  }, []);

  const openAddModal = () => {
    setModalMode("add");
    setCurrentCert({
      title: "",
      issuer: "",
      link: "",
      date: "",
      description: "",
      moreDescription: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (cert) => {
    setModalMode("edit");
    setCurrentCert(cert);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentCert((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (modalMode === "add") {
        const docRef = await addDoc(collection(db, "certificates"), currentCert);
        setCertificates((prev) => [...prev, { id: docRef.id, ...currentCert }]);
        setMessage("Certificate added successfully!");
      } else if (modalMode === "edit") {
        const certDocRef = doc(db, "certificates", currentCert.id);
        await updateDoc(certDocRef, currentCert);
        setCertificates((prev) =>
          prev.map((cert) =>
            cert.id === currentCert.id ? currentCert : cert
          )
        );
        setMessage("Certificate updated successfully!");
      }
    } catch (error) {
      console.error("Error saving certificate: ", error);
      setMessage("Error saving certificate.");
    }
    setLoading(false);
    closeModal();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this certificate?")) {
      setLoading(true);
      try {
        await deleteDoc(doc(db, "certificates", id));
        setCertificates((prev) => prev.filter((cert) => cert.id !== id));
        setMessage("Certificate deleted successfully!");
      } catch (error) {
        console.error("Error deleting certificate: ", error);
        setMessage("Error deleting certificate.");
      }
      setLoading(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto p-8 bg-gradient-to-b from-[#101820] to-[#131313] text-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Certificates</h2>
      {message && <p className="mb-4 text-center text-green-400">{message}</p>}
      {loading && <p className="text-center text-gray-400">Loading...</p>}
      <div className="flex justify-end mb-6">
        <button
          onClick={openAddModal}
          className="bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-500 transition-colors"
        >
          Add Certificate
        </button>
      </div>
      {certificates.length === 0 ? (
        <p className="text-center text-gray-400">No certificates available.</p>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl transition-transform duration-300 hover:scale-105 hover:border-2 hover:border-green-400 cursor-pointer"
            >
              <div className="relative z-10 space-y-3">
                <h3 className="text-xl font-bold mb-1">{cert.title}</h3>
                <p className="text-xs text-gray-400 mb-1">
                  {cert.issuer} | {cert.date}
                </p>
                <p className="text-xs text-gray-300 line-clamp-3">{cert.description}</p>
                <div className="mt-4">
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-green-400 text-[#101820] font-bold text-xs rounded-md transition-colors duration-300 hover:bg-green-500"
                  >
                    View Certificate
                  </a>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-end space-x-2 z-20">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditModal(cert);
                  }}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-500 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(cert.id);
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

      {/* Modal for Add/Edit Certificate */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn cursor-pointer"
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
              {modalMode === "edit" ? "Edit Certificate" : "Add Certificate"}
            </h2>
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={currentCert.title}
                  onChange={handleChange}
                  placeholder="Certificate Title"
                  className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400 transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Issuer
                </label>
                <input
                  type="text"
                  name="issuer"
                  value={currentCert.issuer}
                  onChange={handleChange}
                  placeholder="Certificate Issuer"
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
                  value={currentCert.date}
                  onChange={handleChange}
                  placeholder="e.g., July 2024"
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
                  value={currentCert.link}
                  onChange={handleChange}
                  placeholder="https://certificate.com"
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
                  value={currentCert.description}
                  onChange={handleChange}
                  placeholder="Certificate description..."
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
                  value={currentCert.moreDescription}
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

export default CertificatesAdmin;
