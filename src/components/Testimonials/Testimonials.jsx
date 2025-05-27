import React from "react";
import { FaQuoteLeft, FaGlobe, FaEnvelope } from "react-icons/fa";
import taimoor from "../../assets/taimoor.jpg";
const testimonials = [
  {
    id: 1,
    clientName: "Taimoor Nasir",
    company: "Newage Dispatch.",
    position: "Founder & CEO",
    website: "https://www.newagedispatch.com/",
    email: "info@newagedispatch.com",
    testimonial:
      "I would like to say that the work of this website is truly excellent. Their services are unmatched and consistently demonstrate high levels of efficiency and quality. I sincerely appreciate their dedication and commitment.",
    image: taimoor,
  },
  {
    id: 2,
    clientName: "Saif Ullah",
    company: "CallWave LLC.",
    position: "Founder & COO",
    website: "https://callwavedispatch.com",
    email: "Info@callwavedispatch.com",
    testimonial:
      "Muhammad Fahad is an outstanding professional who always delivers high-quality work. His creative approach and attention to detail make him an asset to any team.",
    image: "https://via.placeholder.com/80",
  },
  // {
  //   id: 3,
  //   clientName: "Carol Lee",
  //   company: "Tech Solutions",
  //   position: "Software Engineer",
  //   website: "",
  //   email: "carol@techsolutions.com",
  //   testimonial:
  //     "Working with Muhammad Fahad was a great experience. His technical expertise and positive attitude made collaboration seamless.",
  //   image: "https://via.placeholder.com/80",
  // },
];

const TestimonialsSection = () => {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-[#101820] to-[#131313] text-white overflow-hidden animate-fadeIn">
      {/* Decorative Blobs */}
      <div className="absolute top-[-8rem] right-[-8rem] w-72 h-72 bg-green-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-8rem] left-[-8rem] w-72 h-72 bg-green-400/20 rounded-full blur-3xl animate-pulse delay-200"></div>

      <div className="relative max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Testimonials
        </h2>
        <div className="grid gap-50 grid-cols-1 sm:grid-cols-2 md:grid-cols-2">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl transition-transform duration-300 hover:scale-105 hover:border-2 hover:border-green-400 cursor-pointer"
            >
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={item.image}
                  alt={item.clientName}
                  className="w-16 h-16 rounded-full object-cover border-2 border-green-400"
                />
                <div>
                  <h3 className="text-lg font-bold">{item.clientName}</h3>
                  <p className="text-xs text-gray-400">{item.position}</p>
                </div>
              </div>
              {/* Additional Client Details */}
              <div className="mb-4 text-xs text-gray-300">
                <p>
                  <span className="font-semibold">Company:</span> {item.company}
                </p>
                {item.website && (
                  <p>
                    <span className="font-semibold">Website:</span>{" "}
                    <a
                      href={item.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-green-400 transition-colors"
                    >
                      {item.website}
                    </a>
                  </p>
                )}
                {item.email && (
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    <a
                      href={`mailto:${item.email}`}
                      className="hover:text-green-400 transition-colors"
                    >
                      {item.email}
                    </a>
                  </p>
                )}
              </div>
              <FaQuoteLeft className="text-green-400 text-3xl mb-2" />
              <p className="text-xs text-gray-300 line-clamp-4">{item.testimonial}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
