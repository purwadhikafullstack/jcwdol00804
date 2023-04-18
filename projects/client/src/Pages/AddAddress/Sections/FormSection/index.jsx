import axios from "axios";
import { API_URL } from "../../../../helper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FormSection = () => {
  const navigate = useNavigate();
  // Data to API
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");

  // Data to Select Cities by Province
  const [provinceData, setProvinceData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);

  // Configure ^
  const getProvince = async () => {
    try {
      const result = await axios.get(`${API_URL}/cities-data/get-province`);
      setProvinceData(result.data);
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  const getCities = async (value) => {
    try {
      const result = await axios.post(`${API_URL}/cities-data/get-cities`, {
        province: value,
      });
      setCitiesData(result.data);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  // Send Datas to API
  const onSubmit = async () => {
    try {
      const token = localStorage.getItem("xmart_login");
      const result = await axios.post(
        `${API_URL}/address/add-address`,
        {
          address,
          province,
          city,
          zipcode,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(result.data.message);
      navigate("/my-address");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    getProvince();
  }, []);

  return (
    <div className="flex flex-col justify-center mx-20 my-10">
      <div className="text-xl font-bold">Add Address</div>
      <div className="w-full mt-5">
        {/* Province */}
        <div className="">
          <label htmlFor="province" className="text-base font-semibold">
            Province
          </label>
          <select
            value={province}
            onChange={(e) => {
              getCities(e.target.value);
              setProvince(e.target.value);
            }}
            className="block border-[#82CD47] border rounded-md w-full h-[35px] px-2 my-2"
          >
            <option>Select Province</option>
            {provinceData.map((value) => {
              return (
                <option value={value.province} key={value.province}>
                  {value.province}
                </option>
              );
            })}
          </select>
        </div>
        {/* City */}
        <div className="mt-2">
          <label htmlFor="city" className="text-base font-semibold">
            City
          </label>
          <select
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
            className="block border-[#82CD47] border rounded-md w-full h-[35px] px-2 my-2"
          >
            <option>Select City</option>
            {citiesData.map((value) => {
              return (
                <option value={value.name} key={value.name}>
                  {value.name}
                </option>
              );
            })}
          </select>
        </div>
        {/* Address */}
        <div className="mt-2">
          <label htmlFor="address" className="text-base font-semibold mt-2">
            Address
          </label>
          <textarea
            className="block border-[#82CD47] border rounded-md w-full h-[115px] px-[12px] py-[12px] my-2 text-left"
            id="address"
            name="address"
            type="text"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        {/* Zip code */}
        <div className="mt-2">
          <label htmlFor="zipcode" className="text-base font-semibold">
            Zip Code
          </label>
          <input
            className="block border-[#82CD47] border rounded-md w-full h-[35px] px-[12px] my-2"
            id="zipcode"
            name="zipcode"
            type="text"
            onChange={(e) => {
              setZipcode(e.target.value);
            }}
          />
        </div>
        {/* Button Add */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="rounded-full bg-[#82CD47] w-8/12 h-[38px] text-white text-[22px] font-[600] leading-6 shadow-md disabled:opacity-50 my-5"
            onClick={onSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormSection;
