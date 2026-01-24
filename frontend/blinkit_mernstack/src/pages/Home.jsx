import React from 'react'
import categories from "../data/categories";
import CategoryCard from "../components/CategoryCard";

const Home =() =>{
  return(
     <div className="max-w-7xl mx-auto px-4 py-6">

      {/* Heading */}
      <h2 className="text-lg font-semibold mb-4">
        Shop by Category
      </h2>

      {/* Categories Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
        {categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>

    </div>
  );
};
  

export default Home

