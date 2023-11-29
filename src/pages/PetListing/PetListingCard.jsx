import { FaCalendarAlt  } from "react-icons/fa";
import { FaArrowRightLong, FaLocationDot   } from "react-icons/fa6";
import { Link } from "react-router-dom";

const PetListingCard = ({pet}) => {
    const {image, name, age, location, _id} = pet;
    return (
        <div className="p-4 border rounded-2xl shadow-[0px_8px_24px_rgba(149,157,165,0.2)] hover:shadow-[0px_48px_100px_0px_rgba(17,12,46,0.15)] transition-all">
            <figure>
                <img src={image} alt="" className="rounded-t-2xl object-cover md:h-56 lg:h-56 xl:h-72"/>
            </figure>
            <div className="flex justify-between my-4">
                <p className="flex gap-2 items-center"><FaCalendarAlt className="text-primary "></FaCalendarAlt>{age} Years</p>
                <p className="flex gap-2 items-center"><FaLocationDot className="text-primary "></FaLocationDot>{location}</p>
            </div>
            <h2 className="text-2xl font-bold text-info mt-6 mb-3">{name}</h2>
            <Link to={`/pet-details/${_id}`} className="text-primary hover:text-info font-bold flex items-center gap-2">More Details <FaArrowRightLong></FaArrowRightLong></Link>
        </div>
    );
};

export default PetListingCard;