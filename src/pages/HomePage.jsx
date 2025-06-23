// ================================================================================
// | FILE: src/pages/HomePage.jsx (Corrected Layout)
// ================================================================================
import {
  ArrowRight,
  BookOpen,
  Users,
  Award,
  Bell,
  Download,
  Calendar,
} from "lucide-react";
import { useInterval } from "../hooks/useInterval"; // In your local file
import React, { useState } from "react";
import HeroImage from "../assets/banner.webp"; // In your local file
import { a } from "framer-motion/client";

import { notices, events } from "../data/mockData";


const HomePage = ({ navigateTo }) => {
  const [currentNotice, setCurrentNotice] = useState(0);
  useInterval(() => {
    setCurrentNotice((prev) => (prev + 1) % notices.length);
  }, 5000);

  const handleNoticeDownload = (notice) => {
    if (window.jspdf) {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      doc.setProperties({ title: notice.title });
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("Springdale Public School", 20, 20);
      doc.setDrawColor(245, 158, 11);
      doc.line(20, 23, 190, 23);
      doc.setFontSize(16);
      doc.text(notice.title, 20, 35);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(100, 115, 132);
      doc.text(`Date: ${notice.date}`, 20, 42);
      doc.setFontSize(12);
      doc.setTextColor(51, 65, 85);
      const contentLines = doc.splitTextToSize(notice.content, 170);
      doc.text(contentLines, 20, 55);

      // Download the PDF with a sanitized filename
      const filename = `Notice-${notice.title
        .replace(/[^a-z0-9]/gi, "_")
        .toLowerCase()}.pdf`;
      doc.save(filename);
    }else{
      alert("PDF generation library is not available. Please try again later.");
    }
  };

  return (
    <div className="animate-fade-in-up">
      {/* ... Hero Section (unchanged) ... */}
      <div
        className="relative h-[60vh] md:h-[80vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(${HeroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent flex items-center justify-center">
          <div className="text-center text-white p-4">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Nurturing Minds, Shaping Futures
            </h2>
            <p className="mt-4 text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
              Welcome to Springdale, where we ignite curiosity and foster a
              lifelong love for learning.
            </p>
            <button
              onClick={() => navigateTo("contact")}
              className="mt-8 bg-amber-500 text-slate-900 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-amber-400 transition-all duration-300 transform hover:scale-105 flex items-center mx-auto"
            >
              Inquire Now <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* FIXED LAYOUT SECTION */}
      <div className="bg-white py-20">
        {/* MODIFIED: Changed lg:grid-cols-2 to md:grid-cols-2 to show columns on smaller screens */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-start">
          {/* Section 1: Latest News (Carousel with Download) */}
          <div className="w-full">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold text-slate-800">Latest News</h3>
              <p className="mt-4 text-lg text-slate-600">
                Click on a notice to download the circular.
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl shadow-lg p-8 overflow-hidden">
              <div className="relative h-28 sm:h-24">
                {notices.map((notice, index) => (
                  <a
                    key={notice.id}
                    href={notice.fileUrl}
                    // download
                    onClick={() => handleNoticeDownload(notice)}
                    className={`absolute w-full transition-all duration-500 ease-in-out group cursor-pointer p-2 -m-2 rounded-lg hover:bg-slate-200/50 ${
                      index === currentNotice
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 " +
                          (index > currentNotice
                            ? "translate-y-full"
                            : "-translate-y-full")
                    }`}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 rounded-full bg-amber-500 text-white flex items-center justify-center">
                          <Download size={24} />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold text-slate-900 group-hover:text-amber-600 transition-colors">
                          {notice.title}
                        </h4>
                        <p className="text-sm text-slate-500">{notice.date}</p>
                        <p className="mt-1 text-slate-700 hidden sm:block">
                          {notice.content.substring(0, 100)}
                          {notice.content.length > 100 ? "..." : ""}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
              <div className="mt-6 flex justify-center space-x-2">
                {notices.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentNotice(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentNotice
                        ? "bg-amber-500"
                        : "bg-slate-300 hover:bg-slate-400"
                    }`}
                  ></button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Upcoming Events */}
          {/* MODIFIED: Changed lg:mt-0 to md:mt-0 to match the new grid breakpoint */}
          <div className="w-full mt-16 md:mt-0">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold text-slate-800">
                Upcoming Events
              </h3>
              <p className="mt-4 text-lg text-slate-600">
                Mark your calendars for these exciting events.
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl shadow-lg p-8">
              <ul className="space-y-6">
                {events.map((event) => (
                  <li key={event.id} className="flex items-start group">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-full bg-slate-800 text-white flex items-center justify-center">
                        <Calendar size={24} />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-slate-900 group-hover:text-amber-600 transition-colors">
                        {event.title}
                      </h4>
                      <p className="text-sm text-slate-500">{event.date}</p>
                      <p className="mt-1 text-slate-700">{event.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigateTo("notices")}
                className="mt-8 bg-slate-800 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-slate-700 transition-all duration-300 transform hover:scale-105 flex items-center mx-auto"
              >
                View All Events
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ... Why Choose Springdale Section (unchanged) ... */}
      <div className="py-20 bg-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-slate-800">
              Why Choose Springdale?
            </h3>
            <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
              A legacy of excellence in holistic education.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div
              className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: "200ms" }}
            >
              <div className="flex items-center justify-center h-20 w-20 rounded-full bg-amber-100 text-amber-600 mx-auto mb-6">
                <BookOpen className="h-10 w-10" />
              </div>
              <h4 className="text-2xl font-semibold text-slate-900">
                Expert Faculty
              </h4>
              <p className="mt-2 text-slate-600">
                Dedicated and experienced educators who are experts in their
                fields.
              </p>
            </div>
            <div
              className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: "400ms" }}
            >
              <div className="flex items-center justify-center h-20 w-20 rounded-full bg-amber-100 text-amber-600 mx-auto mb-6">
                <Users className="h-10 w-10" />
              </div>
              <h4 className="text-2xl font-semibold text-slate-900">
                Holistic Development
              </h4>
              <p className="mt-2 text-slate-600">
                Focus on sports, arts, and leadership alongside academics.
              </p>
            </div>
            <div
              className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: "600ms" }}
            >
              <div className="flex items-center justify-center h-20 w-20 rounded-full bg-amber-100 text-amber-600 mx-auto mb-6">
                <Award className="h-10 w-10" />
              </div>
              <h4 className="text-2xl font-semibold text-slate-900">
                Modern Facilities
              </h4>
              <p className="mt-2 text-slate-600">
                State-of-the-art labs, smart classrooms, and extensive sports
                infrastructure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
