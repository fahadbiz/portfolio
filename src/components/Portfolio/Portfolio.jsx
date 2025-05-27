import React, { useState, useEffect } from "react";
import { db } from "../../services/firebase"; 
import { collection, getDocs } from "firebase/firestore";
import ActivityIndicator from "../ActivityIndicator";

const PortfolioProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const colRef = collection(db, "projects");
        const snapshot = await getDocs(colRef);
        const projectsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(projectsData);
      } catch (err) {
        console.error("Error fetching projects: ", err);
        setError("Failed to load projects.");
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  return (
    <section className="relative py-16 px-4 bg-gradient-to-b from-[#101820] to-[#131313] text-white overflow-hidden">
      <div className="absolute top-[-8rem] right-[-8rem] w-72 h-72 bg-[#00e676]/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-8rem] left-[-8rem] w-72 h-72 bg-[#00e676]/20 rounded-full blur-3xl animate-pulse delay-200"></div>

      <div className="relative max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          My Projects
        </h2>

        {loading && <p className="text-center text-gray-400"><ActivityIndicator /></p>}
        {error && <p className="text-center text-red-400">{error}</p>}

        {projects.length === 0 && !loading ? (
          <p className="text-center text-gray-400">No projects available.</p>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group relative p-6 rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
              >
                {/* Glassy Background */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 group-hover:border-green-400 transition-all duration-300"></div>
                <div className="relative z-10 space-y-3">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <p className="text-xs text-gray-300 line-clamp-3">
                    {project.description}
                  </p>
                  {/* Technology Badges */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {Array.isArray(project.technologies)
                      ? project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-700 text-xs text-white font-semibold rounded-full"
                        >
                          {tech}
                        </span>
                      ))
                      : typeof project.technologies === "string"
                        ? project.technologies.split(",").map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-700 text-xs text-white font-semibold rounded-full"
                          >
                            {tech.trim()}
                          </span>
                        ))
                        : null}
                  </div>

                  {/* Link Button */}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 px-3 py-2 bg-green-400 text-[#101820] font-bold text-xs rounded-md transition-colors duration-300 hover:bg-green-500"
                  >
                    Visit Project
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioProjects;
