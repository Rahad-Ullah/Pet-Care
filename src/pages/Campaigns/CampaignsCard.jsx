import { FaDonate  } from "react-icons/fa";
import { FaArrowRightLong, FaHandHoldingDollar } from "react-icons/fa6";
import { Link } from "react-router-dom";

const CampaignsCard = ({pet}) => {
    const {image, name, maxAmount, donatedAmount, _id} = pet;
    return (
        <div className="p-4 border rounded-2xl shadow-[0px_8px_24px_rgba(149,157,165,0.2)] hover:shadow-[0px_48px_100px_0px_rgba(17,12,46,0.15)] transition-all">
            <figure>
                <img src={image} alt="" className="rounded-t-2xl object-cover md:h-56 lg:h-56 xl:h-72"/>
            </figure>
            <div className="px-2">
            <h2 className="text-2xl font-bold text-info mt-6 mb-3">{name}</h2>
            <div className="my-4 space-y-1">
                <p className="flex gap-2 items-center"><FaHandHoldingDollar className="text-primary "></FaHandHoldingDollar>Maximum Amount: {maxAmount} $</p>
                <p className="flex gap-2 items-center"><FaDonate className="text-primary "></FaDonate>Donated Amount: {donatedAmount} $</p>
            </div>
            <Link to={`/campaign-details/${_id}`} className="text-primary hover:text-info font-bold flex items-center gap-2">More Details <FaArrowRightLong></FaArrowRightLong></Link>
            </div>
        </div>
    );
};

export default CampaignsCard;