
const CategoryCard = ({categoryItem}) => {
    console.log(categoryItem)
    
    return (
        <div className="card bg-base-100 shadow-xl">
            <figure><img src={categoryItem?.image} alt="image" /></figure>
            <div className="py-6 px-6">
                <h2 className="card-title">{categoryItem?.category}</h2>
                <div className="flex justify-center">
                    <button className="btn btn-primary text-base">Learn More</button>
                </div>
            </div>
        </div>
    );
};

export default CategoryCard;