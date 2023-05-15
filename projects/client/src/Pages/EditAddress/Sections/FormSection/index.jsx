import axios from "axios";
import { API_URL } from "../../../../helper";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const FormSection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [addressDetail, setAddressDetail] = useState([]);
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [provinceData, setProvinceData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);

  const getProvince = async () => {
    try {
      const result = await axios.get(`${API_URL}/cities-data/get-province`);
      setProvinceData(result.data)
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

  const getAddress = async () => {
    try {
      const result = await axios.get(`${API_URL}/address/my-address/${id}`);
      setAddressDetail(result.data);
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  const onSubmit = async () => {
    try {
      const token = localStorage.getItem("xmart_login");
      const result = await axios.patch(
        `${API_URL}/address/edit-address/${id}`,
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
      toast.success(result.data.message);
      setIsSubmit(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getProvince();
    getAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col justify-center mx-20 my-10">
      <Toaster />
      <div className="text-xl font-bold mb-2">Edit address</div>
      <div className="h-[2px] bg-slate-200 w-[100%]"></div>
      {/* Province */}
      {addressDetail.map((data) => {
        return (
          <div
            key={data.id}
            className="w-full"
          >
            <div className="mt-2">
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
                    <option
                      key={value.province}
                      value={value.province}
                    >
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
                    <option
                      key={value.name}
                      value={value.name}
                    >
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
                placeholder={data.address}
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
                placeholder={data.zipcode}
                onChange={(e) => {
                  setZipcode(e.target.value);
                }}
              />
            </div>
            {/* Button Add */}
            <div className="flex justify-center">
              {!isSubmit ? (
                <button
                  type="submit"
                  className="rounded-full bg-[#82CD47] w-8/12 h-[38px] text-white mt-6 text-[22px] font-[600] leading-6 shadow-md my-10 hover:opacity-75"
                  onClick={onSubmit}
                >
                  Submit
                </button>
              ) : (
                <button
                  className="rounded-full bg-[#82CD47] w-8/12 h-[38px] text-white mt-6 text-[22px] font-[600] leading-6 shadow-md my-10 hover:opacity-75"
                  onClick={() => navigate("/my-address")}
                >
                  Back
                </button>
              )}
            </div>
          </div>
        )
      })}
    </div>
  );
};

export default FormSection;
