// File location: src/components/GalleryPage.jsx

import React, { useState } from "react";

import galleryImages from "../data/mockData"; // Assuming you have a galleryImages.js file exporting an array of image objects


const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

 

  return (
    <div className="py-20 bg-slate-100 animate-fade-in-up">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-slate-800 mb-12">
          Moments at Springdale
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative rounded-lg overflow-hidden shadow-lg cursor-pointer h-72 animate-fade-in-up"
              onClick={() => setSelectedImage(image.src)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={image.src}
                alt={image.alt}
                // MODIFIED: Added group-hover:blur-sm for a blur effect on hover and combined transitions.
                className="w-full h-full object-cover transform group-hover:scale-105 group-hover:blur-xs transition-all duration-500 ease-in-out"
              />
              {/* MODIFIED: Replaced solid overlay with a gradient that fades in. */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out flex items-end p-6">
                {/* MODIFIED: Made text larger, added a drop-shadow, and adjusted transition. */}
                <h3 className="text-white text-xl font-bold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-in-out delay-150 [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)]">
                  {image.alt}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Enlarged view"
            className="max-w-full max-h-full rounded-lg shadow-2xl animate-zoom-in"
          />
        </div>
      )}
    </div>
  );
};

export default GalleryPage;