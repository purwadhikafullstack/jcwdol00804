import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../helper";
import PageAdmin from "../../../Components/PageAdmin";
import { AiFillDelete } from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs";
import { FaTrashRestore } from "react-icons/fa";
import { FcShop } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

const ManageCategory = () => {
    const { branch_name } = useSelector((state) => {
        return {
            branch_name: state.userReducer.branch_name,
        };
    });
    const [categoryList, setCategoryList] = useState([]);
    const [name, setName] = useState("");

    const getCategories = async () => {
        try {
            const token = localStorage.getItem("xmart_login");
            const { data } = await axios.get(
                `${API_URL}/category/get-categories`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            );
            setCategoryList(data.data);
        } catch (error) {
            alert(error.response.data.message);
        };
    };

    useEffect(() => {
        getCategories();
        // eslint-disable-next-line
    }, []);

    const onSubmit = async () => {
        try {
            const token = localStorage.getItem("xmart_login");
            const result = await axios.post(`${API_URL}/category/add-category`,
                {
                    name
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success(result.data.message);
            getCategories();
            setName("");
        } catch (error) {
            toast.error(error.response.data.message);
        };
    };

    const handleDelete = async (id) => {
        try {
            const result = await axios.patch(`${API_URL}/category/delete-category/${id}`);
            toast.error(result.data.message);
            getCategories();
        } catch (error) {
            toast.error(error.response.data.message);
        };
    };

    const handleRestore = async (id) => {
        try {
            const result = await axios.patch(`${API_URL}/category/restore-category/${id}`);
            toast.success(result.data.message);
            getCategories();
        } catch (error) {
            toast.error(error.response.data.message);
        };
    };

    return (
        <PageAdmin>
            <div className="items-start justify-between flex">
                <Toaster />
                <h3 className="text-gray-800 text-xl font-bold">
                    <FcShop className="inline mb-1" size={25} /> {branch_name} Category List
                </h3>
                <p className="flex my-auto">
                    <input
                        className="block border rounded-lg mx-2 my-auto h-10 pl-2"
                        id="name"
                        name="name"
                        type="text"
                        value={name}
                        placeholder="category name..."
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                    <button
                        className="inline-block px-4 py-2 text-white duration-150 font-medium bg-emerald-700 rounded-lg hover:bg-emerald-600 active:bg-emerald-700"
                        onClick={onSubmit}
                    >
                        <BsPlusLg className="inline mb-1" /> Add category
                    </button>
                </p>
            </div>
            <div className="mt-8 shadow-sm border rounded-lg overflow-visible">
                <table className="w-full table-auto text-sm text-left ">
                    <thead className="bg-gray-100 text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 px-6">Image</th>
                            <th className="py-3 px-6 text-center">Name</th>
                            <th className="py-3 px-6 text-center">Status</th>
                            <th className="py-3 px-2 text-center">Delete/Restore</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {categoryList.map((value) => (
                            <tr
                                key={value.id}
                            >
                                <td className="flex items-center py-3 px-5">
                                    <Link
                                        to={`/admin/manage-category/${value.id}`}

                                    >
                                        <img
                                            src={
                                                value.category_img
                                                    ? `http://localhost:8000/${value.category_img}`
                                                    : "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"
                                            }
                                            alt={value.name}
                                            className={`w-10 h-10 rounded-md mr-2 ${value.category_img && "cursor-pointer"
                                                }`}
                                        />
                                    </Link>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    {value.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    {value.is_delete === 0 ? (
                                        <p className="text-blue-500">Active</p>
                                    ) : (
                                        <p className="text-red-500">Deleted</p>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    {value.is_delete === 0 ? (
                                        <button
                                            onClick={() =>
                                                handleDelete(value.id)
                                            }
                                        >
                                            <AiFillDelete
                                                size={20}
                                                cursor="pointer"
                                                className="mx-auto text-red-500 hover:opacity-50"
                                            />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() =>
                                                handleRestore(value.id)
                                            }
                                        >
                                            <FaTrashRestore
                                                size={16}
                                                cursor="pointer"
                                                className="mx-auto text-blue-500 hover:opacity-50"
                                            />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </PageAdmin>
    );
};

export default ManageCategory;

// Modal for confirmation will be add soon