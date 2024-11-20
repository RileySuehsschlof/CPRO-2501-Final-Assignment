import "./AccDetailsPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
function logout() {
  sessionStorage.removeItem("authToken");
  window.location.href = "/login";
}
function AccDetailsPage() {
  const [accountData, setAccountData] = useState({
    name: "",
    email: "",
    shippingAddress: "",
    billingAddress: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const token = sessionStorage.getItem("authToken");
        if (!token) {
          throw new Error("No token found");
        }

        const [header, payload, signature] = token.split(".");
        const decodedPayload = JSON.parse(atob(payload));

        const axiosInstance = axios.create({
          baseURL: "http://localhost:8881",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const response = await axiosInstance.get(
          `/account/${decodedPayload.sub}`
        );
        setAccountData(response.data);
      } catch (err) {
        if (err.response) {
          setError(
            `Server Error: ${
              err.response.data.message || err.response.statusText
            }`
          );
        } else if (err.request) {
          setError("No response from server.");
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchAccountDetails();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setAccountData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <div>
      <div className="formContainer">
        <h1>Account Details</h1>
        <form className="myForm">
          <div>
            <div className="myFields">
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                type="text"
                value={accountData.name || ""}
                onChange={handleChange}
              />
            </div>
            <div className="myFields">
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="text"
                value={accountData.email || ""}
                onChange={handleChange}
              />
            </div>
            <div className="myFields">
              <label htmlFor="shippingAddress">Shipping Address:</label>
              <input
                id="shippingAddress"
                type="text"
                value={accountData.shippingAddress || ""}
                onChange={handleChange}
              />
            </div>
            <div className="myFields">
              <label htmlFor="billingAddress">Billing Address:</label>
              <input
                id="billingAddress"
                type="text"
                value={accountData.billingAddress || ""}
                onChange={handleChange}
              />
            </div>
            <div className="myFields">
              <label htmlFor="cardNumber">Card Number:</label>
              <input
                id="cardNumber"
                type="text"
                value={accountData.cardNumber || ""}
                onChange={handleChange}
              />
            </div>
            <button>Update</button>
          </div>
        </form>
        <button onClick={logout}>Log out</button>
      </div>
    </div>
  );
}

export default AccDetailsPage;
