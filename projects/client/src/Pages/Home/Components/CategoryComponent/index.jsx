import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../../helper";
import img from "../../../../Assets/default.png";

const CategoryComponent = ({ branchName }) => {
  const [categoryList, setCategoryList] = useState([]);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/product/categories?branch_name=${branchName}`
      );
      setCategoryList(data.data);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line
  }, [branchName]);

  return (
    <div className="flex flex-row flex-wrap justify-center py-2">
      {categoryList.map((category) => {
        return (
          <Link
            key={category.category_id}
            to={`/product-list`}
            state={{ from: category.category_id }}
          >
            <div className="box-content rounded h-16 w-16 bg-white text-xs text-center mx-2 my-2">
              <img className="h-15 w-15 mx-auto my-2" src={img} alt="img" />
              <div className="text-gray-500 text-center mt-2">
                {category.category_id}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default CategoryComponent;
