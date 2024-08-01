import React, { useState } from "react";
import { useOkto } from "okto-sdk-react";
import Modal from "react-modal";
import '/Users/anu/Desktop/Projects/okto-bounty/client/src/index.css'
import copy from '../assets/copy.svg'
import Navbaar from "../Components/Navbaar";

const Donate = () => {
  const [transferResponse, setTransferResponse] = useState(null);
  const [error, setError] = useState(null);
  const { transferTokens } = useOkto();
  const [orderId, setOrderId] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [copied, setCopied] = useState(false);

  const hardcodedData = {
    network_name: "POLYGON_TESTNET_AMOY",
    token_address: " ",
    recipient_address: "0x69c0ebF6408F5D50512C4106B97CdEe0A5CD900E"
  };

  const handleTransferTokens = async (e) => {
    e.preventDefault();
    try {
      const transferData = {
        ...hardcodedData,
        quantity,
      };
      const response = await transferTokens(transferData);
      setTransferResponse(response);
      setOrderId(response.orderId);
      setCopied(false); 
    } catch (error) {
      setError(`Failed to transfer tokens: ${error.message}`);
    }
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const closeModal = () => {
    setTransferResponse(null);
    setOrderId(null);
    setQuantity("");
    setCopied(false); // Reset copy state
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(orderId).then(() => {
      setCopied(true);
    }, () => {
      setCopied(false);
    });
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 auto',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '400px',
  };

  const inputStyle = {
    margin: '5px',
    padding: '10px',
    width: '27rem',
    fontSize: '16px',
    borderRadius: '40px',
  };

  return (
    <div className="bg-gradient-to-r from-neutral-300 to-stone-400 w-screen h-screen " style={containerStyle}>
      <Navbaar />
      <div className="glass px-20 py-8 mt-8">
        <h1 className="mb-5 flex justify-center items-center text-2xl">Donate for good</h1>
        <form style={formStyle} onSubmit={handleTransferTokens}>
          <input
            style={inputStyle}
            type="text"
            name="quantity"
            placeholder="Quantity"
            value={quantity}
            onChange={handleQuantityChange}
            required
          />
          <button className="my-3 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85]" type="submit">Donate</button>
        </form>
        {error && (
          <div style={{ color: 'red' }}>
            <h2>Error:</h2>
            <p>{error}</p>
          </div>
        )}
      </div>

      <Modal
        isOpen={!!transferResponse}
        onRequestClose={closeModal}
        contentLabel="Transaction Successful"
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
            width: '550px',
            textAlign: 'center',
          },
        }}
      >
        <h1>Thank you for saving lives! ❤️</h1>
        <p>Your transaction was successful.</p>
        <div className="flex justify-center items-center"> 
        <p><strong>Order ID:</strong> {orderId}</p>
        <button
          className=" p-2"
          onClick={handleCopy}
          aria-label="Copy Order ID"
        >
          {copied ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <img src={copy} alt="" />
          )}
        </button>
        </div>
        <button className="my-3 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85]" onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default Donate;
