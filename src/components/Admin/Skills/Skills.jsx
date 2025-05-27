import React, { useState, useEffect } from "react";
import { db } from "../../../services/firebase"; // adjust the path if needed
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { FaReact, FaHtml5, FaCss3Alt, FaNodeJs } from "react-icons/fa";
import { SiTailwindcss, SiJavascript } from "react-icons/si";

// Mapping from icon identifier string to its component (the component itself, not an element).
const iconMap = {
  FaReact: FaReact,
  SiJavascript: SiJavascript,
  SiTailwindcss: SiTailwindcss,
  FaHtml5: FaHtml5,
  FaCss3Alt: FaCss3Alt,
  FaNodeJs: FaNodeJs,
};

const SkillsAdmin = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
  const [currentSkill, setCurrentSkill] = useState({
    name: "",
    iconName: "",
    iconColor: "",
  });

  // Fetch skills from Firestore on mount
  useEffect(() => {
    const fetchSkills = async () => {
      setLoading(true);
      try {
        const colRef = collection(db, "skills");
        const snapshot = await getDocs(colRef);
        const skillsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSkills(skillsData);
      } catch (error) {
        console.error("Error fetching skills: ", error);
      }
      setLoading(false);
    };

    fetchSkills();
  }, []);

  const openAddModal = () => {
    setModalMode("add");
    setCurrentSkill({
      name: "",
      iconName: "",
      iconColor: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (skill) => {
    setModalMode("edit");
    setCurrentSkill(skill);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentSkill((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (modalMode === "add") {
        const docRef = await addDoc(collection(db, "skills"), currentSkill);
        setSkills((prev) => [...prev, { id: docRef.id, ...currentSkill }]);
        setMessage("Skill added successfully!");
      } else if (modalMode === "edit") {
        const skillDocRef = doc(db, "skills", currentSkill.id);
        await updateDoc(skillDocRef, currentSkill);
        setSkills((prev) =>
          prev.map((skill) =>
            skill.id === currentSkill.id ? currentSkill : skill
          )
        );
        setMessage("Skill updated successfully!");
      }
    } catch (error) {
      console.error("Error saving skill: ", error);
      setMessage("Error saving skill.");
    }
    setLoading(false);
    closeModal();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      setLoading(true);
      try {
        await deleteDoc(doc(db, "skills", id));
        setSkills((prev) => prev.filter((skill) => skill.id !== id));
        setMessage("Skill deleted successfully!");
      } catch (error) {
        console.error("Error deleting skill: ", error);
        setMessage("Error deleting skill.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 text-white rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Manage Skills</h2>
      {message && <p className="mb-4">{message}</p>}
      {loading && <p>Loading...</p>}
      <button
        onClick={openAddModal}
        className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 transition-colors mb-4"
      >
        Add Skill
      </button>
      {skills.length === 0 ? (
        <p>No skills available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skills.map((skill) => {
            const IconComponent = iconMap[skill.iconName];
            const iconElement = IconComponent ? (
              <IconComponent style={{ color: skill.iconColor, fontSize: "1.75rem" }} />
            ) : null;
            return (
              <div
                key={skill.id}
                className="flex items-center justify-between p-4 bg-gray-700 rounded-md"
              >
                <div className="flex items-center gap-2">
                  <div className="text-3xl">{iconElement}</div>
                  <span>{skill.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(skill)}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-500 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(skill.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal for Add/Edit Skill */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-gray-900 p-6 rounded-lg w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-3xl font-bold hover:text-green-400"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4">
              {modalMode === "edit" ? "Edit Skill" : "Add Skill"}
            </h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Skill Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={currentSkill.name}
                  onChange={handleChange}
                  placeholder="e.g., React"
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-green-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Icon Identifier
                </label>
                <input
                  type="text"
                  name="iconName"
                  value={currentSkill.iconName}
                  onChange={handleChange}
                  placeholder='e.g., FaReact or SiJavascript'
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-green-400"
                  required
                />
                <p className="text-xs text-gray-400">
                  Enter the icon identifier exactly as in our mapping (e.g., FaReact, SiJavascript).
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Icon Color
                </label>
                <input
                  type="text"
                  name="iconColor"
                  value={currentSkill.iconColor}
                  onChange={handleChange}
                  placeholder='e.g., #00ff00 or green'
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-green-400"
                  required
                />
                <p className="text-xs text-gray-400">
                  Enter a valid CSS color code (e.g., #00ff00) or color name.
                </p>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-gray-900 rounded hover:bg-green-700"
                >
                  {modalMode === "edit" ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsAdmin;
