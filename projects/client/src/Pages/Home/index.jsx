import Page from "../../Components/Page";
import BannerSection from "./Sections/BannerSection";
import CategorySection from "./Sections/CategorySection";
import FeaturedSection from "./Sections/FeaturedSection";
import { FcShop } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { changeStoreAction } from "../../Actions/store";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../helper";

const Home = () => {
  const dispatch = useDispatch();
  const [branchList, setBranchList] = useState([]);

  const { branchName } = useSelector((state) => {
    return {
      branchName: state.storeReducer.defaultStore,
    };
  });

  useEffect(() => {
    axios.get(`${API_URL}/product/get-branch-list`).then((res) => {
      setBranchList(res.data);
    });
  }, []);

  return (
    <Page navTitle="Home">
      <div className="container">
        <div className="px-5 flex flex-row items-center">
          <FcShop size={20} />
          <select
            className="bg-[#6CC51D] font-semibold text-white rounded-full px-3 ml-1"
            defaultValue={branchName}
            onChange={(e) =>
              dispatch(changeStoreAction({ defaultStore: e.target.value }))
            }
          >
            {branchList.map((val, idx) => {
              return (
                <option key={idx} value={val.name}>
                  {val.name}
                </option>
              );
            })}
          </select>
        </div>
        {/* Greeting */}
        <div className="flex flex-col text-normal text-center font-normal px-5 py-3">
          <div>Welcome to our page !</div>
        </div>
        {/* Banner */}
        <BannerSection />
        {/* Categories */}
        <CategorySection branchName={branchName} />
        {/* Featured */}
        <FeaturedSection branchName={branchName} />
      </div>
    </Page>
  );
};

export default Home;
