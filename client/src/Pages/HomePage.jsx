import React, { useState } from "react";
import { useOkto } from "okto-sdk-react";

const HomePage = () => {
  console.log("homepage rendered");

  const [userDetails, setUserDetails] = useState(null);
  const [portfolioData, setPortfolioData] = useState([]);
  const [wallets, setWallets] = useState([]);
  const [orderResponse, setOrderResponse] = useState(null);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const { getUserDetails, getPortfolio, createWallet, orderHistory } = useOkto();

  const [orderData, setOrderData] = useState({
    order_id: "",
  });

  const fetchUserDetails = async () => {
    try {
      const details = await getUserDetails();
      setUserDetails(details);
      setActiveSection("userDetails");
    } catch (error) {
      setError(`Failed to fetch user details: ${error.message}`);
    }
  };

  const fetchPortfolio = async () => {
    try {
      const portfolio = await getPortfolio();
      // Adjust to handle data structure
      if (portfolio && Array.isArray(portfolio.tokens)) {
        setPortfolioData(portfolio.tokens);
      } else {
        console.error("Portfolio data is not in expected format:", portfolio);
        setPortfolioData([]);
      }
      setActiveSection("portfolio");
    } catch (error) {
      setError(`Failed to fetch portfolio: ${error.message}`);
    }
  };

  const fetchWallets = async () => {
    try {
      const walletsData = await createWallet();
      // Adjust to handle data structure
      if (walletsData && Array.isArray(walletsData.wallets)) {
        setWallets(walletsData.wallets);
      } else {
        console.error("Wallets data is not in expected format:", walletsData);
        setWallets([]);
      }
      setActiveSection("wallets");
    } catch (error) {
      setError(`Failed to fetch wallets: ${error.message}`);
    }
  };

  const handleOrderCheck = async (e) => {
    e.preventDefault();
    try {
      const response = await orderHistory(orderData);
      setOrderResponse(response);
      setActiveSection("orderResponse");
    } catch (error) {
      setError(`Failed to fetch order status: ${error.message}`);
    }
  };

  const handleInputChangeOrders = (e) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
  };

  const buttonStyle = {
    margin: "5px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: "400px",
  };

  const inputStyle = {
    margin: "5px",
    padding: "10px",
    width: "100%",
    fontSize: "16px",
  };

  const renderDetails = (details) => (
    <div>
      {Object.entries(details).map(([key, value]) => (
        <div key={key}>
          <strong>{key.replace(/_/g, " ")}:</strong> {value}
        </div>
      ))}
    </div>
  );

  return (
    <div style={containerStyle}>
      <h1>Home Page</h1>

      <div>
        <button style={buttonStyle} onClick={fetchUserDetails}>
          View User Details
        </button>
        <button style={buttonStyle} onClick={fetchPortfolio}>
          View Portfolio
        </button>
        <button style={buttonStyle} onClick={fetchWallets}>
          View Wallets
        </button>
      </div>

      {activeSection === "userDetails" && userDetails && (
        <div>
          <h2>User Details:</h2>
          {renderDetails(userDetails)}
        </div>
      )}
      {activeSection === "portfolio" && portfolioData.length > 0 && (
        <div>
          <h2>Portfolio Data:</h2>
          {portfolioData.map((item, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              {renderDetails(item)}
            </div>
          ))}
        </div>
      )}
      {activeSection === "wallets" && wallets.length > 0 && (
        <div>
          <h2>Wallets:</h2>
          {wallets.map((wallet, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              {renderDetails(wallet)}
            </div>
          ))}
        </div>
      )}

      <h2>Check Order</h2>
      <form style={formStyle} onSubmit={handleOrderCheck}>
        <input
          style={inputStyle}
          type="text"
          name="order_id"
          placeholder="Order Id"
          value={orderData.order_id}
          onChange={handleInputChangeOrders}
          required
        />
        <button style={buttonStyle} type="submit">
          Check Status
        </button>
      </form>

      {activeSection === "orderResponse" && orderResponse && (
        <div>
          <h2>Order Status:</h2>
          {renderDetails(orderResponse)}
        </div>
      )}

      {error && (
        <div style={{ color: "red" }}>
          <h2>Error:</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
