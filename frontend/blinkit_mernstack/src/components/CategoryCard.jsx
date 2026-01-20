import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/category/${category.id}`}
      className="bg-white rounded-xl p-4 flex flex-col items-center hover:shadow-md transition"
    >
      <img
        src={category.image}
        alt={category.name}
        className="w-20 h-20 object-contain"
      />
      <p className="mt-2 text-sm font-medium text-center">
        {category.name}
      </p>
    </Link>
  );
};

export default CategoryCard;
