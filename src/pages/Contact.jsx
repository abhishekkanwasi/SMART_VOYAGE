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
            <strong>Team Members:</strong>
            <hr />
            <strong>Dhruv Singhal</strong>
            <hr />
            <strong>Abhishek</strong>
            <hr />
            <strong>Vidhi Agarwal</strong>
            <br />

            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
