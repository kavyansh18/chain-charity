import React, { useState, useEffect } from "react";
import { useOkto } from "okto-sdk-react";
import Navbaar from "../Components/Navbaar";
import '../index.css';

const HomePage = () => {
  console.log("homepage rendered");

  const [userDetails, setUserDetails] = useState(null);
  const [portfolioData, setPortfolioData] = useState([]);
  const [wallets, setWallets] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState("userDetails");
  const [loading, setLoading] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const { getUserDetails, getPortfolio, createWallet, orderHistory } = useOkto();

  const [orderData, setOrderData] = useState({
    order_id: "",
  });

  const orderIds = ["ce217444-0a09-4fb5-b3a3-2675354781fa", "0c036ac4-eae6-40cd-9244-7472b4571371", "114beb66-596c-4911-86bb-a4f9cc8e6571", "a2087ba8-48be-4386-b2e1-3291970d4292", "aebc1df2-aaae-426b-be17-13d86900ea6b"]; 
  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    setLoading(true);
    try {
      const details = await getUserDetails();
      setUserDetails(details);
      setActiveSection("userDetails");
    } catch (error) {
      setError(`Failed to fetch user details: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchPortfolio = async () => {
    setLoading(true);
    try {
      const portfolio = await getPortfolio();
      if (portfolio && Array.isArray(portfolio.tokens)) {
        setPortfolioData(portfolio.tokens);
      } else {
        console.error("Portfolio data is not in expected format:", portfolio);
        setPortfolioData([]);
      }
      setActiveSection("portfolio");
    } catch (error) {
      setError(`Failed to fetch portfolio: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchWallets = async () => {
    setLoading(true);
    try {
      const walletsData = await createWallet();
      if (walletsData && Array.isArray(walletsData.wallets)) {
        setWallets(walletsData.wallets);
      } else {
        console.error("Wallets data is not in expected format:", walletsData);
        setWallets([]);
      }
      setActiveSection("wallets");
    } catch (error) {
      setError(`Failed to fetch wallets: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderStatus = async () => {
    setLoading(true);
    try {
      const response = await orderHistory({ order_id: selectedOrderId });
      if (response && Array.isArray(response.jobs)) {
        setOrderStatus(response.jobs);
      } else {
        console.error("Order response is not in expected format:", response);
        setOrderStatus([]);
      }
      setActiveSection("orderResponse");
    } catch (error) {
      setError(`Failed to fetch order status: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleOrderCheck = (e) => {
    e.preventDefault();
    fetchOrderStatus(); 
  };

  const handleDropdownChange = (e) => {
    setSelectedOrderId(e.target.value);
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
    width: '24rem',
    fontSize: "16px",
    borderRadius: '40px',
  };

  const renderDetails = (details) => (
    <div>
      {Object.entries(details).map(([key, value]) => (
        <div key={key}>
          <strong>{key.replace(/_/g, " ")}:</strong> {typeof value === 'object' ? JSON.stringify(value) : value}
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-gradient-to-r from-neutral-300 to-stone-400 w-screen h-screen " style={containerStyle}>
      <div className="mb-6 bg-gradient-to-b from-red-50 to-neutral-400"><Navbaar /></div>

      <div className="glass mb-6">
        <button style={buttonStyle} onClick={fetchUserDetails}>
          View User Details
        </button>
        <button style={buttonStyle} onClick={fetchPortfolio}>
          View Portfolio
        </button>
        <button style={buttonStyle} onClick={fetchWallets}>
          View Wallets
        </button>
        <button style={buttonStyle} onClick={() => setActiveSection("checkOrder")}>
          Check Order Status
        </button>
      </div>

      {loading && <div>Loading...</div>} {/* Show loading indicator when fetching */}

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

      {activeSection === "checkOrder" && (
        <div>
          <h2 className="flex justify-center items-center py-3">Check Order</h2>
          <form style={formStyle} onSubmit={handleOrderCheck}>
            <select
              style={inputStyle}
              name="order_id"
              value={selectedOrderId}
              onChange={handleDropdownChange}
              required
            >
              <option value="">Select Order ID</option>
              {orderIds.map((orderId) => (
                <option key={orderId} value={orderId}>
                  {orderId}
                </option>
              ))}
            </select>
            <button style={buttonStyle} className="align-middle select-none font-sans text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-5 rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85]" type="submit">
              Check Status
            </button>
          </form>
        </div>
      )}

      {activeSection === "orderResponse" && orderStatus.length > 0 && (
        <div>
          <h2>Order Status:</h2>
          {orderStatus.map((status, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              {renderDetails(status)}
            </div>
          ))}
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
