import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../helper";

const AddressSection = () => {
  // Fetching Data from API
  const [address, setAddress] = useState([]);

  // Get Data from API
  const getData = async () => {
    try {
      const token = localStorage.getItem("xmart_login");
      const result = await axios.get(`${API_URL}/address/my-address`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAddress(result.data);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Soft Delete an Address
  const deleteAddress = async (id) => {
    try {
      const result = await axios.put(`${API_URL}/address/delete/${id}`);
      setAddress((prevAddress) => {
        return prevAddress.map((address) => {
          if (address.id === id) {
            return {
              ...address,
              is_delete: 1,
            };
          } else {
            return address;
          }
        });
      });
      alert(result.data.message);
      await getData();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  // Set an Address to Main Address
  const setMainAddress = async (id) => {
    try {
      const token = localStorage.getItem("xmart_login");
      const result = await axios.put(
        `${API_URL}/address/set-main/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAddress((prevAddress) => {
        return prevAddress.map((address) => {
          if (address.id === id) {
            return {
              ...address,
              is_main: 1,
            };
          } else {
            return address;
          }
        });
      });
      alert(result.data.message);
      await getData();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col justify-center mx-20 my-10">
      <div className="text-xl font-bold">My Addresses</div>
      {address.length > 0 ? (
        // Conditions if address is not empty
        <div className="flex flex-col justify-center">
          {/* Fetching Data */}
          {address.map((address) => (
            <div
              key={address.id}
              className="block border rounded-md w-full bg-gray-100 p-3 mt-5 shadow"
            >
              <div className="font-semibold">{address.address}</div>
              <div>
                {address.city}, {address.province} {address.zipcode}
              </div>
              <div className="flex justify-between pt-6">
                {/* Main Address Button */}
                {address.is_main === 1 ? (
                  // Conditions the button if address is_main
                  <button
                    className="rounded-md bg-[#47B4CD] h-7 px-2 text-xs text-white font-semibold shadow-md"
                    disabled="disabled"
                  >
                    Your Main Address
                  </button>
                ) : (
                  // Conditions the button if address not is_main
                  <button
                    onClick={() => setMainAddress(address.id)}
                    className="rounded-md bg-[#82CD47] h-7 px-2 text-xs text-white font-semibold shadow-md"
                  >
                    Set Main Address
                  </button>
                )}
                {/* Delete Address Button */}
                <button
                  onClick={() => deleteAddress(address.id)}
                  className="rounded-md bg-[#CC4158] w-[60px] h-7 px-2 text-xs text-white font-semibold shadow-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Conditions if address is empty
        <div className="flex flex-col justify-center text-center border rounded-md w-full bg-gray-100 p-3 mt-5 rounded shadow">
          <div className="text-lg font-bold">You have no address</div>
          <div className="text-base font-semibold">
            Please add address below
          </div>
        </div>
      )}
      {/* Route to /add-address */}
      <Link to="/add-address">
        <div className="flex justify-center">
          <button className="rounded-full bg-[#82CD47] w-8/12 h-[38px] text-white text-[22px] font-[600] shadow-md my-5">
            Add Address
          </button>
        </div>
      </Link>
    </div>
  );
};

export default AddressSection;
