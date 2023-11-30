import useCategories from "../../../hooks/useCategories";
import CategoryCard from "./CategoryCard";

const Category = () => {
    const categories = useCategories()
    console.log(categories)
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-16">
            {
                categories.map((category, index) => <CategoryCard
                    key={index}
                    category={category}
                ></CategoryCard>)
            }
        </div>
    );
};

export default Category;