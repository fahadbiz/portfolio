import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase'; // Using the exported Firestore instance
import heroImage from '../../assets/Image.png';
import BiographyModal from './Biography';
import HireMeModal from './HireMeModal';
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import ActivityIndicator from '../ActivityIndicator';

export default function HeroSection() {
    const [showBiographyModal, setShowBiographyModal] = useState(false);
    const [isHireModalOpen, setIsHireModalOpen] = useState(false);
    const [heroData, setHeroData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Modal control functions
    const openHireModal = () => setIsHireModalOpen(true);
    const closeHireModal = () => setIsHireModalOpen(false);
    const openBiographyModal = () => setShowBiographyModal(true);
    const closeBiographyModal = () => setShowBiographyModal(false);

    // Fetch data from Firestore
    useEffect(() => {
        const fetchData = async () => {
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

    if (loading && heroImage) {
        return (
            <section className="flex items-center justify-center h-screen w-full bg-gradient-to-r from-gray-900 via-[#0f0f0f] to-gray-900 text-white">
                <ActivityIndicator />
            </section>
        );
    }

    const { bio, passion, heroTitle, hero, github, linkedin, gmail } = heroData;

    return (
        <section className="md:pl-25 relative flex flex-col md:flex-row items-center justify-center h-screen w-full bg-gradient-to-r from-gray-900 via-[#0f0f0f] to-gray-900 overflow-hidden text-white">
            {/* Left Content */}
            <div className="md:-mt-30 md:w-1/2 sm:px-12 lg:px-16 flex flex-col space-y-4 z-10 mx-4 sm:mx-0">
                {/* Passion / Tagline */}
                {/* <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <div className="w-8 h-[2px] bg-green-400" />
          <p className="uppercase text-xs tracking-widest text-green-400">
            {passion}
          </p>
        </div> */}
                {/* Hero Title */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                        {heroTitle.split(" ")[0]}
                    </span>{' '}
                    {heroTitle.split(" ").slice(1).join(" ")}
                </h1>
                {/* Hero Description */}
                <p className="text-gray-300 max-w-xl leading-relaxed">
                    {hero}
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
                    </a>
                    <a
                        href={linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 hover:text-green-400 transition"
                    >
                        <FaLinkedin className="text-2xl" />
                    </a>
                    <a
                        href={`mailto:${gmail}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 hover:text-green-400 transition"
                    >
                        <FaEnvelope className="text-2xl" />
                    </a>
                </div>
                {/* Buttons */}
                <div className="flex space-x-4 pb-10">
                    <button
                        onClick={() => openBiographyModal()}
                        className="px-6 py-2 bg-transparent border border-green-400 text-green-400 rounded-md shadow-lg hover:bg-green-400 hover:text-gray-900 transition-colors duration-300"
                    >
                        Biography
                    </button>
                    <button
                        onClick={openHireModal}
                        className="px-6 py-2 bg-green-400 text-gray-900 rounded-md shadow-lg hover:bg-green-500 transition-colors duration-300"
                    >
                        Hire Me
                    </button>
                </div>
            </div>

            {/* Enhanced Image Section */}
            <div className="self-center md:-mt-50 md:w-1/2 flex items-center justify-center relative mx-4 sm:mx-0">
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
                    <div
                        className="absolute inset-0 rounded-full filter blur-3xl opacity-60 animate-[pulseSlow_4s_ease-in-out_infinite]"
                        style={{
                            background:
                                'radial-gradient(circle, rgba(66,153,225,1) 0%, rgba(72,187,120,0.8) 50%, rgba(139,92,246,0.5) 100%)'
                        }}
                    />
                    <div className="absolute inset-0 rounded-full p-1">
                        <div className="w-full h-full rounded-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 animate-[spin_8s_linear_infinite]" />
                    </div>
                    <div className="absolute inset-0 rounded-full p-2">
                        <div className="w-full h-full rounded-full border border-white/20" />
                    </div>
                    <div className="absolute inset-2 rounded-full border border-gray-800 opacity-80" />
                    <div
                        className="absolute inset-4 rounded-full filter blur-sm opacity-20"
                        style={{
                            background:
                                'radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 80%)'
                        }}
                    />
                    <div className="absolute top-4 left-4 w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full opacity-30 animate-[bounce_2s_infinite]" />
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                        <div
                            className="absolute -translate-x-full inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-20 animate-[shimmerDynamic_4s_linear_infinite]"
                        />
                    </div>
                    <div className="relative z-10 rounded-full overflow-hidden border-4 border-gray-900 transform transition-transform duration-700 hover:scale-110 hover:rotate-2 shadow-2xl">
                        <img
                            src={heroImage}
                            alt="Muhammad Fahad"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="absolute inset-0 rounded-full transition-transform duration-700 transform hover:scale-105 pointer-events-none" />
                </div>
            </div>

            <WaveDivider />

            <BiographyModal
                isOpen={showBiographyModal}
                onClose={closeBiographyModal}
                bio={bio}
            />
            <HireMeModal isOpen={isHireModalOpen} onClose={closeHireModal} />
        </section>
    );
}

function WaveDivider() {
    return (
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            <svg
                className="relative block w-full h-40"
                viewBox="0 0 1440 320"
                preserveAspectRatio="none"
            >
                <path
                    fill="#0f0f0f"
                    fillOpacity="1"
                    d="M0,224L60,208C120,192,240,160,360,138.7C480,117,600,107,720,122.7C840,139,960,181,1080,181.3C1200,181,1320,139,1380,117.3L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                />
            </svg>
        </div>
    );
}
