import React, { useState, useEffect } from "react";
import { useOkto } from "okto-sdk-react";
import Navbaar from "../Components/Navbaar";
import '../index.css';

const HomePage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [portfolioData, setPortfolioData] = useState([]);
  const [wallets, setWallets] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState("userDetails");
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const { getUserDetails, getPortfolio, createWallet, orderHistory } = useOkto();

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    setLoading(true);
    setUserDetails(null);
    setPortfolioData([]);
    setWallets([]);
    setOrderStatus([]);
    try {
      const details = await getUserDetails();
      setUserDetails(details);
      setActiveSection("userDetails");
    } catch (error) {
      setError("Failed to fetch user details: Please login first");
    } finally {
      setLoading(false);
    }
  };

  const fetchPortfolio = async () => {
    setLoading(true);
    setUserDetails(null);
    setPortfolioData([]);
    setWallets([]);
    setOrderStatus([]);
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
    setUserDetails(null);
    setPortfolioData([]);
    setWallets([]);
    setOrderStatus([]);
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
    setOrderStatus([]);
    try {
      const response = await orderHistory({ order_id: orderId });
      if (response && Array.isArray(response.jobs)) {
        // Filter jobs based on the provided orderId
        const filteredStatus = response.jobs.filter(job => job.order_id === orderId);
        setOrderStatus(filteredStatus);
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

  const handleInputChange = (e) => {
    setOrderId(e.target.value); // Handle input change for orderId
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

  const filterFields = (data, fieldsToExclude) => {
    return data.map(item => {
      const filteredItem = { ...item };
      fieldsToExclude.forEach(field => delete filteredItem[field]);
      return filteredItem;
    });
  };

  const renderTable = (data) => {
    if (data.length === 0) {
      return <div>No data available</div>;
    }
    
    const filteredData = data.map(item => {
      return Object.fromEntries(Object.entries(item).filter(([key, value]) => value !== ""));
    });

    return (
      <table className="table-auto border-collapse border border-gray-400 ">
        <thead>
          <tr>
            {Object.keys(filteredData[0]).map((key) => (
              <th className="border border-black px-4 py-2" key={key}>{key.replace(/_/g, " ")}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              {Object.values(item).map((value, i) => (
                <td className="border border-black px-4 py-2" key={i}>
                  {typeof value === 'object' ? JSON.stringify(value) : value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="bg-gradient-to-r from-rose-100 to-teal-100 w-screen h-screen " style={containerStyle}>
      <div className="mb-6 bg-red-50 border border-b-2 border-blue-600"><Navbaar /></div>

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
        <div className="glass mt-5 p-6 rounded-2xl">
          <h2>User Details:</h2>
          {renderTable(filterFields([userDetails], ['freezed']))}
        </div>
      )}
      {activeSection === "portfolio" && portfolioData.length > 0 && (
        <div className="glass mt-5 p-6 rounded-2xl">
          <h2>Portfolio Data:</h2>
          {renderTable(filterFields(portfolioData, ['amount_in_inr']))}
        </div>
      )}
      {activeSection === "wallets" && wallets.length > 0 && (
        <div className="glass mt-5 p-6 rounded-2xl">
          <h2>Wallets:</h2>
          {renderTable(filterFields(wallets, ['success']))}
        </div>
      )}

      {activeSection === "checkOrder" && (
        <div className="glass mt-5 p-6 rounded-2xl">
          <h2 className="flex justify-center items-center py-3">Check Order</h2>
          <form style={formStyle} onSubmit={handleOrderCheck}>
            <input
              style={inputStyle}
              type="text"
              name="order_id"
              value={orderId}
              onChange={handleInputChange}
              placeholder="Enter Order ID"
              required
            />
            <button style={buttonStyle} className="align-middle select-none font-sans text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-5 rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85]" type="submit">
              Check Status
            </button>
          </form>
        </div>
      )}

      {activeSection === "orderResponse" && orderStatus.length > 0 && (
        <div className="glass mt-5 p-4 mx-6 rounded-2xl text-sm">
          <h2>Order Status:</h2>
          {renderTable(orderStatus)}
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
