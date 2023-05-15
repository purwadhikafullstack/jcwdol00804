import { useEffect, useState } from "react";
import axios from "axios";
import PageAdmin from "../../../../Components/PageAdmin";
import { API_URL } from "../../../../helper";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { GiQueenCrown } from "react-icons/gi";
import BackButtonAdmin from "../../../../Components/BackButtonAdmin";
import { useNavigate } from "react-router-dom";

const AddBranchAdmin = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [branch_id, setBranchId] = useState("");
    const [eyeOpen, setEyeOpen] = useState(false);
    const [branchList, setBranchList] = useState([]);
    const [isModal, setIsModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${API_URL}/product/get-branch-list`).then((res) => {
            setBranchList(res.data);
        });
    }, []);

    const onSubmit = async () => {
        try {
            const result = await axios.post(`${API_URL}/user/add-branch-admin`, {
                name,
                phone,
                email,
                password,
                branch_id
            });
            alert(result.data.message);
            navigate("/admin/manage-branch");
        } catch (error) {
            alert(error.response.data.message);
        };
    };

    return (
        <PageAdmin>
            <div className="items-start justify-between flex">
                <h3 className="text-gray-800 text-xl font-bold">
                    <GiQueenCrown className="inline mb-1" size={25} /> Add Branch Admin
                </h3>
                <BackButtonAdmin />
            </div>
            <div className="flex flex-col items-center pt-10">
                <div className="border-white w-[50%] rounded-md px-5 shadow-md ml-5 my-2">
                    <div className="flex justify-start my-2">
                        <label htmlFor="name" className="mr-12 pt-1">
                            Name
                        </label>
                        <input
                            className="block border w-full h-[32px] pl-2"
                            id="name"
                            name="name"
                            type="text"
                            value={name}
                            placeholder="name or username"
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                    </div>
                    <div className="flex justify-start mb-2">
                        <label htmlFor="phone" className="mr-[45px] pt-1">
                            Phone
                        </label>
                        <input
                            className="block border w-full h-[32px] pl-2"
                            id="phone"
                            name="phone"
                            type="text"
                            value={phone}
                            placeholder="phone number"
                            onChange={(e) => {
                                setPhone(e.target.value);
                            }}
                        />
                    </div>
                    <div className="flex justify-start mb-2">
                        <label htmlFor="email" className="mr-12 pt-1">
                            Email
                        </label>
                        <input
                            className="block border w-full h-[32px] ml-1 pl-2"
                            id="email"
                            name="email"
                            type="text"
                            value={email}
                            placeholder="email@mail.com"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </div>
                    <div className="flex justify-start mb-2">
                        <label htmlFor="password" className="mr-6 pt-1">
                            Password
                        </label>
                        <input
                            className="block border w-full h-[32px] pl-2"
                            id="password"
                            name="password"
                            type={eyeOpen ? "text" : "password"}
                            value={password}
                            placeholder="▪️▪️▪️▪️▪️▪️▪️▪️▪️▪️▪️▪️"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        {eyeOpen ? (
                            <AiOutlineEye
                                className="my-auto mx-1"
                                fontSize={25}
                                color="gray"
                                cursor="pointer"
                                onClick={() => setEyeOpen(!eyeOpen)}
                            />
                        ) : (
                            <AiOutlineEyeInvisible
                                className="my-auto mx-1"
                                fontSize={25}
                                color="gray"
                                cursor="pointer"
                                onClick={() => setEyeOpen(!eyeOpen)}
                            />
                        )}
                    </div>
                    <div className="flex justify-start">
                        <label htmlFor="branch_id" className="mr-[38px] pt-1 mb-2">
                            Branch
                        </label>
                        <select
                            className="block border w-full h-[32px] focus:ring-black focus:border-black truncate ml-1 pl-1"
                            value={branch_id}
                            onChange={(e) => {
                                setBranchId(e.target.value);
                            }}
                        >
                            <option value="not-selected">Select Branch</option>
                            {branchList.map((value, index) => {
                                return (
                                    <option
                                        key={index}
                                        value={value.id}
                                    >
                                        {value.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="flex justify-center">
                        {!isModal ? (
                            <button
                                type="submit"
                                className="rounded-md bg-blue-400 w-[165px] h-[32px]
                                    text-white font-[500]
                                    leading-6 shadow-md
                                    hover:opacity-50
                                    mt-4 mb-2"
                                onClick={() => setIsModal(!isModal)}
                            >
                                Add Branch Admin
                            </button>
                        ) : null}
                    </div>
                </div>
                {isModal ? (
                    <div className="container flex justify-center mx-auto">
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                            <div className="max-w-sm p-6 bg-white divide-y divide-gray-500 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-2xl">Add Branch Admin</h3>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        cursor="pointer"
                                        onClick={() => setIsModal(!isModal)}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <div className="mt-4">
                                    <p className="mb-4 text-sm mt-4 text-center">
                                        Please check Branch Admin Data before continue,<br />
                                        Are you sure you want to continue ?
                                    </p>
                                    <div className="flex flex-row justify-center">
                                        <button
                                            className="px-4 py-1 mx-2 text-white bg-red-400 rounded-md hover:opacity-50"
                                            type="submit"
                                            onClick={() => setIsModal(!isModal)}
                                        >
                                            Discard
                                        </button>
                                        <button
                                            className="px-4 py-1 mx-2 text-white bg-blue-400 rounded-md hover:opacity-50"
                                            type="submit"
                                            onClick={() => {
                                                setIsModal(!isModal);
                                                onSubmit();
                                            }
                                            }
                                        >
                                            Confirm
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </PageAdmin >
    )
}

export default AddBranchAdmin;