import React, { useState } from "react";
import { useOkto } from "okto-sdk-react";

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
    maxWidth: '800px',
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
    width: '100%',
    fontSize: '16px',
  };

  return (
    <div style={containerStyle}>
      <h1>Transfer Tokens</h1>
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
        <button style={buttonStyle} type="submit">Transfer Tokens</button>
      </form>
      {transferResponse && (
        <div>
          <h2>Transfer Response:</h2>
          <p>Order ID: {transferResponse.order_id}</p>
          <pre>{JSON.stringify(transferResponse, null, 2)}</pre>
        </div>
      )}
      {error && (
        <div style={{ color: 'red' }}>
          <h2>Error:</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default Donate;
