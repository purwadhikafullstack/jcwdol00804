import CategoryComponent from "../../Components/CategoryComponent";

const CategorySection = ({ branchName }) => {
  return (
    <div className="flex flex-col text-base text-left font-bold px-5 py-2">
      <div>Categories</div>
      <CategoryComponent branchName={branchName} />
    </div>
  );
};

export default CategorySection;
