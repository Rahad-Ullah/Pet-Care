import useCategories from "../../../hooks/useCategories";
import CategoryCard from "./CategoryCard";

const Category = () => {
    const categories = useCategories()
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-16">
            {
                categories[0].map(category => <CategoryCard
                    key={category._id}
                    category={category}
                ></CategoryCard>)
            }
        </div>
    );
};

export default Category;