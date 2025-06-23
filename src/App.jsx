/*
================================================================================
| FILE: src/index.css
| DESCRIPTION: Global styles and animations. In a real project using Vite or
| Create React App, you would create this file and import it into your
| `main.jsx` or `index.js`.
================================================================================

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-slate-100 font-sans antialiased;
  }
}

@layer components {
  @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
  @keyframes fade-out { from { opacity: 1; } to { opacity: 0; } }
  @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes zoom-in { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
  
  .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
  .animate-fade-out { animation: fade-out 0.3s ease-in forwards; }
  .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; animation-fill-mode: backwards; }
  .animate-zoom-in { animation: zoom-in 0.3s ease-out forwards; }
}

*/

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import GalleryPage from "./pages/GalleryPage";
import NoticeBoardPage from "./pages/NoticeBoardPage";
import LoginPage from "./pages/LoginPage";
import StudentProfilePage from "./pages/StudentProfilePage";
import AdminPanelPage from "./pages/AdminPanelPage";
import TeacherDashboard from "./pages/TeacherDashboard";

// The imports above are commented out because all components are in this single file.
// In your local project, you would uncomment them.

const App = () => {
  const [page, setPage] = useState("home");
  const [loggedInAs, setLoggedInAs] = useState(null);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const changePage = (pageName) => {
    if (page === pageName) return;
    setIsAnimatingOut(true);
    setTimeout(() => {
      setPage(pageName);
      window.scrollTo(0, 0);
      setIsAnimatingOut(false);
    }, 300);
  };

  const navigateTo = (pageName) => {
    setLoggedInAs(null);
    changePage(pageName);
  };

  const handleLogin = (role) => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setLoggedInAs(role);
      if (role === "student") setPage("student_profile");
      else if (role === "admin") setPage("admin_panel");
      else if (role === "teacher") setPage("teacher_dashboard");
      window.scrollTo(0, 0);
      setIsAnimatingOut(false);
    }, 300);
  };

  const renderPage = () => {
    const pageProps = {
      navigateTo,
      handleLogin,
      userType: loggedInAs,
      changePage,
    };
    switch (page) {
      case "home":
        return <HomePage {...pageProps} />;
      case "contact":
        return <ContactPage {...pageProps} />;
      case "gallery":
        return <GalleryPage {...pageProps} />;
      case "notices":
        return <NoticeBoardPage {...pageProps} />;
      case "login_student":
        return <LoginPage {...pageProps} userType="student" />;
      case "login_teacher":
        return <LoginPage {...pageProps} userType="teacher" />;
      case "login_admin":
        return <LoginPage {...pageProps} userType="admin" />;
      case "student_profile":
        return <StudentProfilePage {...pageProps} />;
      case "admin_panel":
        return <AdminPanelPage {...pageProps} />;
      case "teacher_dashboard":
        return <TeacherDashboard {...pageProps} />;
      default:
        return <HomePage {...pageProps} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fade-out { from { opacity: 1; } to { opacity: 0; } }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes zoom-in { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .animate-fade-out { animation: fade-out 0.3s ease-in forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; animation-fill-mode: backwards; }
        .animate-zoom-in { animation: zoom-in 0.3s ease-out forwards; }
      `}</style>
      <Header page={page} navigateTo={navigateTo} changePage={changePage} />
      <main
        className={`flex-grow transition-opacity duration-300 ${
          isAnimatingOut ? "animate-fade-out" : "animate-fade-in"
        }`}
      >
        {renderPage()}
      </main>
      <Footer navigateTo={navigateTo} />
    </div>
  );
};

export default App;
