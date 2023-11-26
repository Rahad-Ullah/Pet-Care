
const CategoryCard = ({category}) => {
    const {name, image, recipe} = category;
    
    return (
        <div className="card bg-base-100 shadow-xl">
            <figure><img src={image} alt="image" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default CategoryCard;