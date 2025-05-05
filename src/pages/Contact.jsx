import React from "react";
import Navbar from "../components/Navbar";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Contact Information
        </h2>
        <div className="mb-6 text-lg">
          <div className="mb-4">
            <strong>College:</strong> DIT University, Dehradun
          </div>
          <div className="mb-4">
            <strong>Vidhi Aggarwal</strong>
            <br />
            Phone: 9876543210
            <br />
            Email: vidhi.aggarwal@dituniversity.edu.in
          </div>
          <div className="mb-4">
            <strong>Dhruv Singhal</strong>
            <br />
            Phone: 8765432109
            <br />
            Email: dhruv.singhal@dituniversity.edu.in
          </div>
          <div className="mb-4">
            <strong>Abhishek</strong>
            <br />
            Phone: 7654321098
            <br />
            Email: abhishek@dituniversity.edu.in
          </div>
        </div>
        <div className="mt-6 text-center text-gray-400 text-sm">
          This is a demo contact page. The above contact details are for
          demonstration purposes only.
        </div>
      </div>
    </div>
  );
}
