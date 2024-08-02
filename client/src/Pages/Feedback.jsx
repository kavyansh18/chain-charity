import React, { useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import Navbaar from "../Components/Navbaar";
import '../index.css'

const Feedback = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const onSubmit = (data) => {
    // Handle form submission logic
    console.log(data);

    setModalIsOpen(true);

    reset();
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-r from-rose-100 to-teal-100  min-h-screen">
      <div className=" bg-red-50 border border-b-2 border-blue-600"><Navbaar /></div>
      <h1 className="text-2xl font-bold mb-6">Want to hear you!</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full glass max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <input
            id="name"
            type="text"
            placeholder="Name"
            {...register("name", { required: "Name is required" })}
            className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-500"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div className="mb-4">
          <input
            id="number"
            type="tel"
            placeholder="Number"
            {...register("number", { required: "Number is required" })}
            className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-500"
          />
          {errors.number && <p className="text-red-500 text-sm mt-1">{errors.number.message}</p>}
        </div>

        <div className="mb-4">
          <input
            id="email"
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-500"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <textarea
            id="feedback"
            placeholder="Feedback"
            {...register("feedback", { required: "Feedback is required" })}
            className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-500"
          />
          {errors.feedback && <p className="text-red-500 text-sm mt-1">{errors.feedback.message}</p>}
        </div>

        <button type="submit" className="w-full bg-slate-700 text-white py-3 rounded-lg shadow-md hover:bg-green-600 transition duration-300">Submit</button>
      </form>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Feedback Submitted"
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            borderRadius: '10px',
            width: '400px',
            textAlign: 'center',
            backgroundColor: 'white',
          },
        }}
      >
        <h2 className="text-xl font-semibold mb-4">Thank You for Your Feedback!</h2>
        <p className="mb-4">We appreciate your time and input. Your feedback helps us improve.</p>
        <button onClick={closeModal} className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition duration-300">Close</button>
      </Modal>
    </div>
  );
};

export default Feedback;
