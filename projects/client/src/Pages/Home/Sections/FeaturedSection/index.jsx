import FeaturedComponent from "../../Components/FeaturedComponent";
import { Link } from "react-router-dom";

const FeaturedSection = ({ branchName }) => {
  return (
    <div className="flex flex-col text-base text-left font-bold px-5 py-2">
      <div className="flex justify-between">
        <div>Featured products</div>
        <Link to={"/product-list"}>
          <div className="underline hover:text-[#82CD47]">All products</div>
        </Link>
      </div>
      <FeaturedComponent branchName={branchName} />
    </div>
  );
};

export default FeaturedSection;
