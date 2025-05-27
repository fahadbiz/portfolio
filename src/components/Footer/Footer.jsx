import React, { useState, useEffect } from "react";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { db } from "../../services/firebase"; // adjust the path as needed
import { doc, getDoc } from "firebase/firestore";

const Footer = () => {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);

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
      <footer className="bg-gradient-to-b from-black to-gray-900 text-white pt-10">
        <div className="text-center py-4">Loading...</div>
      </footer>
    );
  }

  const { github, linkedin, twitter } = heroData;

  return (
    <footer className="bg-gradient-to-b from-black to-gray-900 text-white pt-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-gray-700 pt-6 space-y-4 md:space-y-0">
          {/* Branding */}
          <div className="text-center md:text-left">
            <h1 className="text-xl font-bold">Muhammad Fahad</h1>
            <p className="text-xs text-gray-400">Creative Developer & Designer</p>
            <p className="text-xs mt-2">&copy; {new Date().getFullYear()} All rights reserved.</p>
          </div>
          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center space-x-6">
            <a href="#about" className="text-sm hover:text-green-400 transition-colors duration-300">
              About
            </a>
            <a href="#skills" className="text-sm hover:text-green-400 transition-colors duration-300">
              Skills
            </a>
            <a href="#portfolio" className="text-sm hover:text-green-400 transition-colors duration-300">
              Portfolio
            </a>
            <a href="#blog" className="text-sm hover:text-green-400 transition-colors duration-300">
              Blog
            </a>
            <a href="/LoginPage" className="text-sm hover:text-green-400 transition-colors duration-300">
              Contact
            </a>
          </div>
          {/* Social Icons */}
          <div className="flex items-center space-x-4">
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-400 transition transform hover:scale-110 duration-300"
            >
              <FaGithub size={20} />
            </a>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-400 transition transform hover:scale-110 duration-300"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href={twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-400 transition transform hover:scale-110 duration-300"
            >
              <FaTwitter size={20} />
            </a>
          </div>
        </div>
      </div>
      {/* Wave Divider placed in document flow */}
      <div className="mt-6">
        <WaveDivider />
      </div>
    </footer>
  );
};

const WaveDivider = () => {
  return (
    <div className="w-full overflow-hidden leading-none">
      <svg
        className="block w-full h-32"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#1a1a1a"
          fillOpacity="1"
          d="M0,256L60,229.3C120,203,240,149,360,149.3C480,149,600,203,720,224C840,245,960,235,1080,197.3C1200,160,1320,96,1380,64L1440,32L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        />
      </svg>
    </div>
  );
};

export default Footer;
