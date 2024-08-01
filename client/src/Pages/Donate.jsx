import React, { useState } from "react";
import { useOkto } from "okto-sdk-react";
import '/Users/anu/Desktop/Projects/okto-bounty/client/src/index.css'

const Donate = () => {
  //console.log("homepage rendered");

  const [transferResponse, setTransferResponse] = useState(null);
  const [error, setError] = useState(null);
  const { transferTokens } = useOkto();

  const [transferData, setTransferData] = useState({
    network_name: "",
    token_address: "",
    quantity: "",
    recipient_address: "",
  });

  const handleTransferTokens = async (e) => {
    e.preventDefault();
    try {
      const response = await transferTokens(transferData);
      setTransferResponse(response);
    } catch (error) {
      setError(`Failed to transfer tokens: ${error.message}`);
    }
  };

  const handleInputChange = (e) => {
    setTransferData({ ...transferData, [e.target.name]: e.target.value });
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    margin: '0 auto',
  };

  const buttonStyle = {
    margin: '5px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
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
    borderRadius:'40px'
  };

  return (
    <div className="bg-gradient-to-r from-neutral-300 to-stone-400 w-screen h-screen flex justify-center items-center" style={containerStyle}>
      <div className="glass px-20 py-8 ">
      <h1 className="mb-5 flex justify-center items-center text-2xl">Donate for good</h1>
      <form style={formStyle} onSubmit={handleTransferTokens}>
        <input
          style={inputStyle}
          type="text"
          name="network_name"
          placeholder="Network Name"
          value={transferData.network_name}
          onChange={handleInputChange}
          required
        />
        <input
          style={inputStyle}
          type="text"
          name="token_address"
          placeholder="Token Address"
          value={transferData.token_address}
          onChange={handleInputChange}
          required
        />
        <input
          style={inputStyle}
          type="text"
          name="quantity"
          placeholder="Quantity"
          value={transferData.quantity}
          onChange={handleInputChange}
          required
        />
        <input
          style={inputStyle}
          type="text"
          name="recipient_address"
          placeholder="Recipient Address"
          value={transferData.recipient_address}
          onChange={handleInputChange}
          required
        />
        <button className="my-4 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85]" type="submit">Transfer Tokens</button>
      </form>
      {transferResponse && (
        <div>
          <h2>Transfer Response:</h2>
          <pre>{`Order ID: ${transferResponse.orderId}`}</pre>

        </div>
      )}
      {error && (
        <div style={{ color: 'red' }}>
          <h2>Error:</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default Donate;
