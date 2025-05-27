import React, { useState, useEffect } from "react";
import { FaLinkedin, FaGithub, FaEnvelope, FaTwitter } from "react-icons/fa";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "../../../services/firebase"; // adjust path as needed

const BiographyManager = () => {
  const [bioData, setBioData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({
    heroTitle: "",
    hero: "",
    bio: "",
    passion: "",
    linkedin: "",
    github: "",
    gmail: "",
    twitter: "",
  });

  useEffect(() => {
    const fetchBiography = async () => {
      const docRef = doc(db, "biographies", "bio");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setBioData(data);
        setTempData(data);
      } else {
        // If not exists, initialize a document
        const initialData = {
          heroTitle: "Welcome to My Portfolio",
          hero: "I'm Fahad—a creative, resourceful professional.",
          bio: "I have built a strong foundation through both education and hands-on experience, which helps me quickly adapt to new challenges and come up with smart solutions to everyday problems.",
          passion: "Mobile Development, AI, and UX Design",
          linkedin: "https://linkedin.com/in/muhammadfahaddev",
          github: "https://github.com/muhammadfahaddev",
          gmail: "muhammadfahad.dev@gmail.com",
          twitter: "https://twitter.com/yourusername",
        };
        await setDoc(docRef, initialData);
        setBioData(initialData);
        setTempData(initialData);
      }
    };
    fetchBiography();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData({ ...tempData, [name]: value });
  };

  const handleSave = async () => {
    const docRef = doc(db, "biographies", "bio");
    await updateDoc(docRef, tempData);
    setBioData(tempData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData(bioData);
    setIsEditing(false);
  };

  if (!bioData) return <div className="text-center py-20">Loading...</div>;

  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-[#101820] to-[#131313] text-white overflow-hidden animate-fadeIn">
      {/* Decorative Blobs */}
      <div className="absolute top-[-8rem] left-[-8rem] w-72 h-72 bg-green-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-8rem] right-[-8rem] w-72 h-72 bg-green-400/20 rounded-full blur-3xl animate-pulse delay-200"></div>
      
      <div className="relative max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Hero Section & Social Links</h2>
        {isEditing ? (
          <form className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">Hero Title</label>
              <input
                type="text"
                name="heroTitle"
                value={tempData.heroTitle}
                onChange={handleChange}
                placeholder="Enter hero title..."
                className="mt-1 block w-full px-4 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400 transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Hero Paragraph</label>
              <textarea
                name="hero"
                rows="2"
                value={tempData.hero}
                onChange={handleChange}
                placeholder="Enter a short introduction..."
                className="mt-1 block w-full px-4 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400 transition"
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Biography</label>
              <textarea
                name="bio"
                rows="4"
                value={tempData.bio}
                onChange={handleChange}
                placeholder="Enter your biography..."
                className="mt-1 block w-full px-4 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400 transition"
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Passion / Specializing</label>
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">LinkedIn</label>
                <input
                  type="url"
                  name="linkedin"
                  value={tempData.linkedin}
                  onChange={handleChange}
                  placeholder="LinkedIn URL"
                  className="mt-1 block w-full px-4 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">GitHub</label>
                <input
                  type="url"
                  name="github"
                  value={tempData.github}
                  onChange={handleChange}
                  placeholder="GitHub URL"
                  className="mt-1 block w-full px-4 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Gmail</label>
                <input
                  type="email"
                  name="gmail"
                  value={tempData.gmail}
                  onChange={handleChange}
                  placeholder="yourname@gmail.com"
                  className="mt-1 block w-full px-4 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Twitter/X</label>
                <input
                  type="url"
                  name="twitter"
                  value={tempData.twitter}
                  onChange={handleChange}
                  placeholder="Twitter URL"
                  className="mt-1 block w-full px-4 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400 transition"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-red-500 text-white font-bold text-sm rounded-md transition-colors duration-300 hover:bg-red-600"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 bg-green-400 text-gray-900 font-bold text-sm rounded-md transition-colors duration-300 hover:bg-green-500"
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">{bioData.heroTitle}</h2>
            <p className="text-sm text-gray-300">{bioData.hero}</p>
            <p className="text-sm text-gray-300">{bioData.bio}</p>
            <p className="text-sm text-gray-300">
              <span className="font-bold">Passion:</span> {bioData.passion}
            </p>
            <div className="flex space-x-4 mt-4">
              {bioData.linkedin && (
                <a
                  href={bioData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400 transition-colors"
                >
                  <FaLinkedin size={20} />
                </a>
              )}
              {bioData.github && (
                <a
                  href={bioData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400 transition-colors"
                >
                  <FaGithub size={20} />
                </a>
              )}
              {bioData.gmail && (
                <a
                  href={`mailto:${bioData.gmail}`}
                  className="hover:text-green-400 transition-colors"
                >
                  <FaEnvelope size={20} />
                </a>
              )}
              {bioData.twitter && (
                <a
                  href={bioData.twitter}
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
                Edit Biography
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BiographyManager;
