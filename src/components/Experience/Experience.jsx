import React, { useState, useEffect } from "react";
import WorkExperienceCard from "./WorkExperienceCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase"; 
import ActivityIndicator from "../ActivityIndicator";

const WorkExperienceSection = () => {
  const [workExperiences, setWorkExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkExperiences = async () => {
      try {
        const expCollection = collection(db, "workExperiences");
        const expSnapshot = await getDocs(expCollection);
        const expList = expSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setWorkExperiences(expList);
      } catch (error) {
        console.error("Error fetching work experiences: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkExperiences();
  }, []);

  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-[#101820] to-[#131313] text-white overflow-hidden animate-fadeIn">
      {/* Decorative Blobs */}
      <div className="absolute top-[-8rem] left-[-8rem] w-72 h-72 bg-green-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-8rem] right-[-8rem] w-72 h-72 bg-green-400/20 rounded-full blur-3xl animate-pulse delay-200"></div>

      <div className="relative max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Work Experience
        </h2>
        {loading ? (
          <p className="text-center text-gray-400"><ActivityIndicator /></p>
        ) : workExperiences.length === 0 ? (
          <p className="text-center text-gray-400">No work experience available.</p>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center">
            {workExperiences.map((exp) => (
              <WorkExperienceCard key={exp.id} {...exp} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default WorkExperienceSection;
