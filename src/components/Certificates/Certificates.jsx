import React, { useState, useEffect } from "react";
import { db } from "../../services/firebase"; 
import { collection, getDocs } from "firebase/firestore";
import ActivityIndicator from "../ActivityIndicator";

const CertificatesSection = () => {
  const [certificates, setCertificates] = useState([]);
  const [selectedCert, setSelectedCert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const colRef = collection(db, "certificates");
        const snapshot = await getDocs(colRef);
        const certsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCertificates(certsData);
      } catch (err) {
        console.error("Error fetching certificates: ", err);
        setError("Failed to load certificates.");
      }
      setLoading(false);
    };

    fetchCertificates();
  }, []);

  const openModal = (cert) => setSelectedCert(cert);
  const closeModal = () => setSelectedCert(null);

  if (loading) {
    return (
      <section className="relative py-20 px-4 bg-gradient-to-b from-[#101820] to-[#131313] text-white overflow-hidden animate-fadeIn">
        <div className="text-center"><ActivityIndicator /></div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative py-20 px-4 bg-gradient-to-b from-[#101820] to-[#131313] text-white overflow-hidden animate-fadeIn">
        <div className="text-center text-red-400">{error}</div>
      </section>
    );
  }

  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-[#101820] to-[#131313] text-white overflow-hidden animate-fadeIn">
      {/* Decorative Blobs */}
      <div className="absolute top-[-8rem] right-[-8rem] w-72 h-72 bg-[#00e676]/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-8rem] left-[-8rem] w-72 h-72 bg-[#00e676]/20 rounded-full blur-3xl animate-pulse delay-200"></div>

      <div className="relative max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Certificates
        </h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {certificates.length === 0 ? (
            <p className="text-center">No certificates available.</p>
          ) : (
            certificates.map((cert) => (
              <div
                key={cert.id}
                className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl transition-transform duration-300 hover:scale-105 hover:border-2 hover:border-green-400 cursor-pointer"
                onClick={() => openModal(cert)}
              >
                <h3 className="text-xl font-bold mb-2">{cert.title}</h3>
                <p className="text-xs text-gray-400 mb-2">
                  {cert.issuer} | {cert.date}
                </p>
                <p className="text-xs text-gray-300 line-clamp-3">
                  {cert.description}
                </p>
                <div className="mt-4">
                  <button className="w-full inline-block px-3 py-2 bg-green-400 text-[#101820] font-bold text-xs rounded-md transition-colors duration-300 hover:bg-green-500">
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 cursor-pointer"
          onClick={closeModal}
        >
          <div
            className="bg-gray-900/90 backdrop-blur-md rounded-2xl p-8 max-w-lg w-full text-white relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white font-bold text-2xl"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold mb-4">{selectedCert.title}</h3>
            <p className="text-xs text-gray-200 mb-2">
              <span className="font-semibold">Issuer:</span> {selectedCert.issuer}
            </p>
            <p className="text-xs text-gray-200 mb-4">
              <span className="font-semibold">Date:</span> {selectedCert.date}
            </p>
            <p className="text-xs text-gray-300 mb-4">{selectedCert.description}</p>
            <a
              href={selectedCert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-green-400 text-black font-bold text-xs rounded-md transition-colors duration-300 hover:bg-green-500"
            >
              Go to Certificate
            </a>
          </div>
        </div>
      )}
    </section>
  );
};

export default CertificatesSection;
