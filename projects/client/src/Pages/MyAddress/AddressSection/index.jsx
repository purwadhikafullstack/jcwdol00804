import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../helper";
import toast, { Toaster } from "react-hot-toast";

const AddressSection = () => {
  const [address, setAddress] = useState([]);

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
      toast.success(result.data.message);
      await getData();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

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
      toast.success(result.data.message);
      await getData();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col justify-center mx-20 my-10">
      <Toaster />
      <div className="flex justify-between mb-2">
        <p className="text-xl font-bold">My addresses</p>
        <Link to="/add-address">
          <button className="rounded-lg bg-blue-400 text-white text-base font-[600] shadow-md mt-1 px-2 hover:opacity-75">
            + Add address
          </button>
        </Link>
      </div>
      <div className="h-[2px] bg-slate-200 w-[100%]"></div>
      {address.length > 0 ? (
        <div className="flex flex-col justify-center">
          {address.map((address) => (
            <div
              key={address.id}
              className="block border rounded-md w-full bg-gray-100 p-3 mt-2 shadow"
            >
              <div className="font-semibold">{address.address}</div>
              <div>
                {address.city}, {address.province} {address.zipcode}
              </div>
              <div className="flex justify-between pt-6">
                {address.is_main === 1 ? (
                  <button
                    className="rounded-md bg-[#47B4CD] h-7 px-2 text-xs text-white font-semibold shadow-md"
                    disabled="disabled"
                  >
                    Your Main Address
                  </button>
                ) : (
                  <button
                    onClick={() => setMainAddress(address.id)}
                    className="rounded-md bg-[#82CD47] h-7 px-2 text-xs text-white font-semibold shadow-md hover:opacity-75"
                  >
                    Set Main Address
                  </button>
                )}
                <div className="flex justify-right">
                  <Link
                    to={`/edit-address/${address.id}`}
                    className="text-center rounded-md bg-[#3285a8] h-7 w-16 px-2 pt-[6px] mr-2 text-xs text-white font-semibold shadow-md hover:opacity-75"
                  >
                    Edit
                  </Link>
                  <button
                    className="rounded-md bg-[#CC4158] w-[60px] h-7 px-2 text-xs text-white font-semibold shadow-md hover:opacity-75"
                    onClick={() => deleteAddress(address.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center text-center border rounded-md w-full bg-gray-100 p-3 mt-5 rounded shadow">
          <div className="text-lg font-bold">You have no address</div>
          <div className="text-base font-semibold">
            Please add address below
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressSection;
