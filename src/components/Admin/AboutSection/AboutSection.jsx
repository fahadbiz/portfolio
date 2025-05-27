import React, { useState, useEffect } from "react";
import { FaLinkedin, FaGithub, FaEnvelope, FaTwitter } from "react-icons/fa";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../services/firebase"; // Adjust path as needed

const fallbackData = {
  aboutTitle: "Welcome to My Portfolio",
  subTitle: "I'm Fahad—a creative, resourceful professional.",
  aboutDescription:
    "I have built a strong foundation through both my education and hands-on experience, which helps me quickly adapt to new challenges and develop smart solutions. I enjoy teamwork and clear communication, and I'm always excited to learn and grow.",
  passion: "Mobile Development, AI, and UX Design",
  projectsDone: "15+ Projects Done",
  happyClients: "5+ Happy Clients",
  inProgress: "3+ In Progress",
  workingHours: "300+ Working Hours",
  cvUrl: "https://yourdomain.com/cv.pdf",
  linkedin: "https://linkedin.com/in/muhammadfahaddev",
  github: "https://github.com/muhammadfahaddev",
  gmail: "muhammadfahad.dev@gmail.com",
  twitter: "https://twitter.com/yourusername",
};

const AboutAdmin = () => {
  const [data, setData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  // We'll use a temporary state to hold form changes
  const [tempData, setTempData] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch existing about data from Firebase on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "about", "info");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data());
          setTempData(docSnap.data());
        } else {
          console.log("No about data found, using fallback.");
          setData(fallbackData);
          setTempData(fallbackData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setData(fallbackData);
        setTempData(fallbackData);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const docRef = doc(db, "about", "info");
      await setDoc(docRef, tempData);
      setData(tempData);
      setIsEditing(false);
      setMessage("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      setMessage("Error saving data.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this about data?"))
      return;
    try {
      const docRef = doc(db, "about", "info");
      await deleteDoc(docRef);
      setData(null);
      setTempData(null);
      setMessage("Data deleted successfully!");
    } catch (error) {
      console.error("Error deleting data:", error);
      setMessage("Error deleting data.");
    }
  };

  const handleCancel = () => {
    setTempData(data);
    setIsEditing(false);
  };

  if (!data || !tempData)
    return <div className="text-center py-20">Loading...</div>;

  return (
    <section id="About" className="relative py-20 px-4 bg-gradient-to-b from-[#101820] to-[#131313] text-white overflow-hidden animate-fadeIn">
      {/* Decorative Blobs */}
      <div className="absolute top-[-8rem] left-[-8rem] w-72 h-72 bg-green-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-8rem] right-[-8rem] w-72 h-72 bg-green-400/20 rounded-full blur-3xl animate-pulse delay-200"></div>
      
      <div className="relative max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">About</h2>
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
          {isEditing ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
              className="space-y-4"
            >
              {/* Top row: About Title and SubTitle */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    About Title
                  </label>
                  <input
                    type="text"
                    name="aboutTitle"
                    value={tempData.aboutTitle}
                    onChange={handleChange}
                    placeholder="Enter about title..."
                    className="mt-1 block w-full px-4 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400 transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    SubTitle Paragraph
                  </label>
                  <textarea
                    name="subTitle"
                    rows="2"
                    value={tempData.subTitle || ""}
                    onChange={handleChange}
                    placeholder="Enter a short introduction..."
                    className="mt-1 block w-full px-4 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400 transition"
                    required
                  ></textarea>
                </div>
              </div>
              {/* About Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  About Description
                </label>
                <textarea
                  name="aboutDescription"
                  rows="4"
                  value={tempData.aboutDescription}
                  onChange={handleChange}
                  placeholder="Enter your biography..."
                  className="mt-1 block w-full px-4 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400 transition"
                  required
                ></textarea>
              </div>
              {/* Passion */}
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Passion / Specializing
                </label>
                <input
                  type="text"
                  name="passion"
                  value={tempData.passion}
                  onChange={handleChange}
                  placeholder="e.g., Mobile Development, AI, etc."
                  className="mt-1 block w-full px-4 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400 transition"
                  required
                />
              </div>
              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Projects Done
                  </label>
                  <input
                    type="text"
                    name="projectsDone"
                    value={tempData.projectsDone}
                    onChange={handleChange}
                    placeholder="e.g., 15+ Projects Done"
                    className="mt-1 block w-full px-4 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400 transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Happy Clients
                  </label>
                  <input
                    type="text"
                    name="happyClients"
                    value={tempData.happyClients}
                    onChange={handleChange}
                    placeholder="e.g., 5+ Happy Clients"
                    className="mt-1 block w-full px-4 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400 transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    In Progress
                  </label>
                  <input
                    type="text"
                    name="inProgress"
                    value={tempData.inProgress}
                    onChange={handleChange}
                    placeholder="e.g., 3+ In Progress"
                    className="mt-1 block w-full px-4 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400 transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Working Hours
                  </label>
                  <input
                    type="text"
                    name="workingHours"
                    value={tempData.workingHours}
                    onChange={handleChange}
                    placeholder="e.g., 300+ Working Hours"
                    className="mt-1 block w-full px-4 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400 transition"
                    required
                  />
                </div>
              </div>
              {/* CV URL */}
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  CV URL
                </label>
                <input
                  type="url"
                  name="cvUrl"
                  value={tempData.cvUrl}
                  onChange={handleChange}
                  placeholder="Link to your CV..."
                  className="mt-1 block w-full px-4 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400 transition"
                />
              </div>
              {/* Action Buttons */}
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 bg-red-600 text-white font-bold text-sm rounded-md transition-colors duration-300 hover:bg-red-700"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 text-gray-900 font-bold text-sm rounded-md transition-colors duration-300 hover:bg-green-700"
                >
                  {data.aboutDescription ? "Update About" : "Add About"}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">{data.aboutTitle}</h2>
              <p className="text-sm text-gray-300">{data.subTitle}</p>
              <p className="text-sm text-gray-300">{data.aboutDescription}</p>
              <p className="text-sm text-gray-300">
                <span className="font-bold">Passion:</span> {data.passion}
              </p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <p className="text-xs text-gray-300">
                  <span className="font-bold">Projects:</span> {data.projectsDone}
                </p>
                <p className="text-xs text-gray-300">
                  <span className="font-bold">Happy Clients:</span> {data.happyClients}
                </p>
                <p className="text-xs text-gray-300">
                  <span className="font-bold">In Progress:</span> {data.inProgress}
                </p>
                <p className="text-xs text-gray-300">
                  <span className="font-bold">Working Hours:</span> {data.workingHours}
                </p>
              </div>
              {data.cvUrl && (
                <div className="mt-4">
                  <a
                    href={data.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-green-400 text-gray-900 font-bold text-sm rounded-md transition-colors duration-300 hover:bg-green-500"
                  >
                    Download CV
                  </a>
                </div>
              )}
              <div className="flex space-x-4 mt-4">
                {data.linkedin && (
                  <a
                    href={data.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-400 transition-colors"
                  >
                    <FaLinkedin size={20} />
                  </a>
                )}
                {data.github && (
                  <a
                    href={data.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-400 transition-colors"
                  >
                    <FaGithub size={20} />
                  </a>
                )}
                {data.gmail && (
                  <a
                    href={`mailto:${data.gmail}`}
                    className="hover:text-green-400 transition-colors"
                  >
                    <FaEnvelope size={20} />
                  </a>
                )}
                {data.twitter && (
                  <a
                    href={data.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-400 transition-colors"
                  >
                    <FaTwitter size={20} />
                  </a>
                )}
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-green-400 text-gray-900 font-bold text-sm rounded-md transition-colors duration-300 hover:bg-green-500"
                >
                  Edit About
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white font-bold text-sm rounded-md transition-colors duration-300 hover:bg-red-700"
                >
                  Delete About
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutAdmin;
