import React, { useState } from "react";
import Navbaar from "../Components/Navbaar";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    proofDocs: null,
    detailsDocs: null,
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
    setFormData({
        name: "",
        description: "",
        proofDocs: null,
        detailsDocs: null,
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-r from-rose-100 to-teal-100 w-screen h-screen ">
        <div className=" bg-red-50 border border-b-2 border-blue-600"><Navbaar /></div>
        <h1 className="mb-5 mt-2 font-bold text-xl">Register as NGO </h1>
      <form onSubmit={handleSubmit} className="glass flex flex-col items-center space-y-4 w-full max-w-md px-5 py-5">
        <label className="w-full">
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </label>
        <label className="w-full">
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </label>
        <label className="w-full">
          Proof Docs:
          <input
            type="file"
            name="proofDocs"
            onChange={handleChange}
            required
            className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </label>
        <label className="w-full">
          Details Docs:
          <input
            type="file"
            name="detailsDocs"
            onChange={handleChange}
            required
            className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </label>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-medium">Thanks for registering!</h2>
            <p className="mt-2">We will let you know whether you are verified or not in 24 hours.</p>
            <button
              onClick={handleCloseModal}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
