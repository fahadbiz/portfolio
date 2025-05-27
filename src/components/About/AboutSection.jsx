import React, { useState, useEffect } from "react";
import { FaSmile, FaCheckCircle, FaHourglassHalf, FaClock } from "react-icons/fa";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebase"; // Adjust path as needed
import ActivityIndicator from "../ActivityIndicator";

const fallbackData = {
  aboutTitle: "Innovate with Technology",
  subTitle: "Software Engineer | Mobile Developer",
  aboutDescription:
    "I am a software engineer skilled in mobile app development and full-stack development. I work with React Native, React JS, Python, and JavaScript to create fast, user-friendly, and efficient applications that solve real-world problems. I am currently learning AI and always exploring new technologies like cloud computing and modern development tools to improve my skills and build better solutions.",
  passion: "Mobile Development, AI, and UX Design",
  projectsDone: "25 Projects Completed",
  happyClients: "7 Happy Clients",
  inProgress: "4 Projects Under Development",
  workingHours: "350+ Hours Invested",
  cvUrl: "https://yourdomain.com/cv.pdf",
};

const AboutSection = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const docRef = doc(db, "about", "info");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data());
        } else {
          console.log("No about data found, using fallback.");
          setData(fallbackData);
        }
      } catch (error) {
        console.error("Error fetching about data:", error);
        setData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) return <div className="text-center py-20"><ActivityIndicator /></div>;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#101820] to-[#131313] text-white py-16 px-8">
      <div className="absolute top-[-5rem] right-[-5rem] w-80 h-80 rounded-full bg-[#00e676]/20 blur-3xl opacity-60"></div>
      <div className="absolute bottom-[-5rem] left-[-5rem] w-80 h-80 rounded-full bg-[#00e676]/20 blur-3xl opacity-60"></div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div className="grid grid-cols-2 gap-8 md:w-1/2">
          <div className="flex flex-col items-center">
            <div className="group relative bg-[#1f1f1f] w-32 h-32 rounded-full flex items-center justify-center transition-transform hover:scale-105 shadow-lg">
              <FaSmile className="text-3xl text-[#00e676]" />
              <div className="absolute inset-0 rounded-full border-2 border-[#00e676] opacity-0 group-hover:opacity-100 animate-ping"></div>
            </div>
            <p className="mt-2 text-lg font-semibold">{data.happyClients}+ Satisfied Partners</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="group relative bg-[#1f1f1f] w-32 h-32 rounded-full flex items-center justify-center transition-transform hover:scale-105 shadow-lg">
              <FaCheckCircle className="text-3xl text-[#00e676]" />
              <div className="absolute inset-0 rounded-full border-2 border-[#00e676] opacity-0 group-hover:opacity-100 animate-ping"></div>
            </div>
            <p className="mt-2 text-lg font-semibold">{data.projectsDone}+ Innovative Solutions</p>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col items-center">
            <div className="group relative bg-[#1f1f1f] w-32 h-32 rounded-full flex items-center justify-center transition-transform hover:scale-105 shadow-lg">
              <FaHourglassHalf className="text-3xl text-[#00e676]" />
              <div className="absolute inset-0 rounded-full border-2 border-[#00e676] opacity-0 group-hover:opacity-100 animate-ping"></div>
            </div>
            <p className="mt-2 text-lg font-semibold">{data.inProgress}+ Active Research Projects</p>
          </div>

          {/* Stat 4 */}
          <div className="flex flex-col items-center">
            <div className="group relative bg-[#1f1f1f] w-32 h-32 rounded-full flex items-center justify-center transition-transform hover:scale-105 shadow-lg">
              <FaClock className="text-3xl text-[#00e676]" />
              <div className="absolute inset-0 rounded-full border-2 border-[#00e676] opacity-0 group-hover:opacity-100 animate-ping"></div>
            </div>
            <p className="mt-2 text-lg font-semibold">{data.workingHours}+ Collaborative Hours</p>
          </div>
        </div>

        {/* Right Side: Content Area */}
        <div className="md:w-1/2">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#00e676] mb-4">
            {data.aboutTitle}
          </h1>
          <h3 className="text-xl font-medium mb-4">{data.passion}</h3>
          <p className="text-[#cfcfcf] leading-relaxed mb-6">{data.aboutDescription}</p>
          {data.cvUrl && (
            <button
              onClick={() => window.open(data.cvUrl, "_blank")}
              className="bg-[#00e676] text-[#101820] px-6 py-3 font-bold rounded hover:bg-[#00c767] transition-colors shadow-md"
            >
              Download CV
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
