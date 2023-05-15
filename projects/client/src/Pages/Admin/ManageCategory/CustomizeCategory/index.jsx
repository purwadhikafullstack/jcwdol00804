import { useEffect, useState } from "react";
import axios from "axios";
import PageAdmin from "../../../../Components/PageAdmin";
import { useParams } from "react-router-dom";
import { API_URL } from "../../../../helper";
import { useSelector } from "react-redux";
import { FcShop } from "react-icons/fc";
import BackButtonAdmin from "../../../../Components/BackButtonAdmin";
import toast, { Toaster } from "react-hot-toast";

const CustomizeCategory = () => {
    const { branch_name } = useSelector((state) => {
        return {
            branch_name: state.userReducer.branch_name,
        };
    });
    const { id } = useParams();
    const [name, setName] = useState("");
    const [detail, setDetail] = useState([]);
    const [image, setImage] = useState(null);

    const getDetail = async () => {
        try {
            const result = await axios.get(`${API_URL}/category/category-detail/${id}`);
            setDetail(result.data[0]);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    useEffect(() => {
        getDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSave = async () => {
        try {
            const formData = new FormData();
            formData.append("images", image);
            const result = await axios.patch(
                `${API_URL}/category/upload-category/${id}`,
                formData
            )
            toast.success(result.data.message);
            getDetail();
            formData.reset();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const handleEdit = async () => {
        try {
            const token = localStorage.getItem("xmart_login");
            const result = await axios.patch(
                `${API_URL}/category/edit-category/${id}`,
                { name },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success(result.data.message)
            getDetail();
            setName("");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <PageAdmin>
            <div className="items-start justify-between flex">
                <Toaster />
                <h3 className="text-gray-800 text-xl font-bold">
                    <FcShop className="inline mb-1" size={25} /> {branch_name} Category List
                </h3>
                <BackButtonAdmin />
            </div>
            <div className="flex justify-center w-full pt-10">
                <div className="flex flex-col w-[50%] items-center">
                    <div className="flex flex-col items-center">
                        <img
                            src={
                                detail.category_img
                                    ? `http://localhost:8000/${detail.category_img}`
                                    : "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"
                            }
                            alt={detail.name}
                            className={`w-40 h-40 rounded-md ${detail.category_img}`}
                        />
                    </div>
                    <div className="flex justify-center text-xl font-bold my-2">
                        {detail.name}
                    </div>
                    <div className="flex flex-col items-center border shadow-md rounded-lg mx-2 my-5 px-2 py-2">
                        <div className="my-2">
                            <p className="flex justify-center my-2">
                                <label htmlFor="images" className="my-auto mr-5">
                                    Image
                                </label>
                                <input
                                    className="block border w-full cursor-pointer"
                                    id="images"
                                    name="images"
                                    type="file"
                                    onChange={(e) => {
                                        setImage(e.target.files[0]);
                                    }}
                                />
                                <button
                                    type="submit"
                                    className="rounded-md bg-blue-400 w-40
                                    text-white font-[500]
                                    leading-6 shadow-md
                                    hover:opacity-50
                                    ml-5"
                                    onClick={handleSave}
                                >
                                    Save
                                </button>
                            </p>
                            <p className="flex justify-center my-2">
                                <label htmlFor="name" className="my-auto mr-[22px]">
                                    Name
                                </label>
                                <input
                                    className="block border w-full h-[30px] pl-2"
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={name}
                                    placeholder={detail.name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                />
                                <button
                                    type="submit"
                                    className="rounded-md bg-blue-400 w-40
                                text-white font-[500]
                                leading-6 shadow-md
                                hover:opacity-50
                                ml-5"
                                    onClick={handleEdit}
                                >
                                    Edit
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </PageAdmin >
    )
}

export default CustomizeCategory;