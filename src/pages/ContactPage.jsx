// MODIFIED: Import React hooks and the EmailJS library
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactPage = () => {
  // MODIFIED: Create a ref for the form element
  const form = useRef();
  
  // MODIFIED: Add state to manage submission status (e.g., success, error messages)
  const [status, setStatus] = useState("");

  const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("Sending..."); // Provide feedback that sending is in progress


        let name = form.current.user_name.value;
        let email = form.current.user_email.value;
        // let subject = form.current.subject.value;
        let message = form.current.message.value;
        // Check if credentials are set in the .env file
        if (!serviceID || !templateID || !publicKey) {
            console.error("EmailJS credentials are not set in the .env file.");
            setStatus({ status: 'error', message: 'Email service is not configured. Please contact the administrator.' });
            return;
        }

    // MODIFIED: This is the core EmailJS function
    // Replace with your actual Service ID, Template ID, and Public Key from your EmailJS account
    emailjs.send(serviceID, templateID, {
      name: name,
      message: message,
      title: "Contact Form Submission",
      email: email,
  },publicKey)
      .then(
        (result) => {
          console.log("SUCCESS!", result.text);
          setStatus("Message sent successfully!");
          form.current.reset(); // Reset the form after successful submission
        },
        (error) => {
          console.log("FAILED...", error.text);
          setStatus("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <div className="py-20 bg-slate-100 animate-fade-in-up">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-slate-800 mb-12">
          Get in Touch
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-6 text-slate-900">
              Send a Message
            </h3>
            {/* MODIFIED: Add ref and onSubmit handler to the form */}
            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-slate-700 font-medium mb-2"
                >
                  Full Name
                </label>
                {/* MODIFIED: Added 'name' attribute required by EmailJS */}
                <input
                  type="text"
                  id="name"
                  name="user_name"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-slate-700 font-medium mb-2"
                >
                  Email Address
                </label>
                {/* MODIFIED: Added 'name' attribute required by EmailJS */}
                <input
                  type="email"
                  id="email"
                  name="user_email"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-slate-700 font-medium mb-2"
                >
                  Message
                </label>
                {/* MODIFIED: Added 'name' attribute required by EmailJS */}
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors"
                ></textarea>
              </div>
              
              {/* MODIFIED: Display status message */}
              {status && (
                <p className={`text-center font-medium ${status.includes('Failed') ? 'text-red-500' : 'text-green-500'}`}>
                  {status}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-slate-800 text-white font-bold py-3 px-4 rounded-md hover:bg-slate-700 transition-all duration-300 transform hover:scale-105"
              >
                Submit
              </button>
            </form>
          </div>
          {/* ... Visit Us section remains unchanged ... */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-6 text-slate-900">
              Visit Us
            </h3>
            <div className="h-64 rounded-md overflow-hidden mb-6 shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353153164!3d-37.8172099797516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce7e0!2sVictoria%20State%20Library!5e0!3m2!1sen!2sau!4v1625549032543!5m2!1sen!2sau"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
            <p className="flex items-center text-slate-700 mb-3 text-lg">
              <MapPin className="h-6 w-6 mr-4 text-amber-500 flex-shrink-0" />
              123 Education Lane, Cityville, India
            </p>
            <p className="flex items-center text-slate-700 mb-3 text-lg">
              <Phone className="h-6 w-6 mr-4 text-amber-500 flex-shrink-0" />
              +91 12345 67890
            </p>
            <p className="flex items-center text-slate-700 text-lg">
              <Mail className="h-6 w-6 mr-4 text-amber-500 flex-shrink-0" />
              info@springdale.edu
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;