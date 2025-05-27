import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { db } from "../../services/firebase"; // adjust the path as needed
import { collection, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";

const ContactSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [formStatus, setFormStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [heroData, setHeroData] = useState(null);

  // Fetch hero data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Adjust collection and document IDs as needed
        const docRef = doc(db, "biographies", "bio");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setHeroData(docSnap.data());
        } else {
          console.error("No such document in 'biographies'!");
        }
      } catch (error) {
        console.error("Error fetching hero data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || !heroData) {
    return (
      <section className="flex items-center justify-center h-screen w-full bg-gradient-to-r from-gray-900 via-[#0f0f0f] to-gray-900 text-white">
        <p>Loading...</p>
      </section>
    );
  }

  const { bio, passion, heroTitle, hero, github, linkedin, gmail } = heroData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormStatus("");
    try {
      await addDoc(collection(db, "contactMessages"), {
        name,
        email,
        message: msg,
        seen: false, // default status when new message is received
        timestamp: serverTimestamp(),
      });
      // Open the modal to confirm success
      setModalOpen(true);
      // Clear form fields
      setName("");
      setEmail("");
      setMsg("");
    } catch (error) {
      console.error("Error sending message: ", error);
      setFormStatus("Error sending message. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-[#101820] to-[#131313] text-white overflow-hidden animate-fadeIn">
      {/* Decorative Blobs */}
      <div className="absolute top-[-8rem] left-[-8rem] w-72 h-72 bg-[#00e676]/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-8rem] right-[-8rem] w-72 h-72 bg-[#00e676]/20 rounded-full blur-3xl animate-pulse delay-200"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Get in Touch
        </h2>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Side: Intro + Social Links */}
          <div className="md:w-1/2 flex flex-col justify-center space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">
              Let's Connect!
            </h3>
            <p className="text-sm md:text-base text-gray-300">
              I'm always excited to connect. You can reach me through any of the platforms below.
            </p>
            {/* Social Links */}
            <div className="flex items-center space-x-6">
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-green-400 transition"
              >
                <FaGithub className="text-2xl" />
                <span className="text-sm">GitHub</span>
              </a>
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-green-400 transition"
              >
                <FaLinkedin className="text-2xl" />
                <span className="text-sm">LinkedIn</span>
              </a>
              <a
                href={`mailto:${gmail}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-green-400 transition"
              >
                <FaEnvelope className="text-2xl" />
                <span className="text-sm">Gmail</span>
              </a>
            </div>
          </div>
          {/* Right Side: Contact Form */}
          <div className="md:w-1/2">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl transition-transform duration-500 hover:scale-105">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full px-4 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400 transition"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-4 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400 transition"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    placeholder="Your Message..."
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    className="mt-1 block w-full px-4 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400 transition"
                    required
                  ></textarea>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-block px-8 py-3 bg-green-400 text-[#101820] font-bold text-sm rounded-md transition-colors duration-300 hover:bg-green-500"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </div>
                {formStatus && (
                  <p className="text-center text-sm text-green-400">{formStatus}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Success Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white p-8 rounded shadow-lg text-black max-w-sm mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4">Success</h3>
            <p>Your message has been sent successfully!</p>
            <button
              onClick={() => setModalOpen(false)}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded transition-colors hover:bg-green-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContactSection;
