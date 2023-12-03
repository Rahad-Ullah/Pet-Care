import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCampaigns from "../../../hooks/useCampaigns";
import { FaEdit, FaRegPauseCircle, FaRegPlayCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const MyCampaigns = () => {
    const axiosSecure = useAxiosSecure()
    const [campaigns, refetch] = useCampaigns()
    console.log(campaigns);

    const handleStatus = (campaign) => {
        const status = campaign.status;
        axiosSecure.patch(`/campaign-status?id=${campaign._id}`, {status: !status})
        .then(res => {
            console.log(res.data)
            if(res.data.modifiedCount > 0){
                refetch()
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Campaign status updated`,
                    showConfirmButton: false,
                    timer: 1500
                    });
            }
        })
    }

    
    return (
        <div className="mx-auto p-12 bg-white">
        <div className="pb-4 flex justify-between">
            <h2 className="text-2xl text-info font-extrabold">My Campaigns</h2>
            <h2 className="text-xl text-info font-bold">Total Campaigns: {campaigns.length}</h2>
        </div>
        <div>
            {/* heading */}
            <div className="grid md:grid-cols-12 justify-between py-7 px-6 font-extrabold text-gray-700">
                <h4 className="md:col-span-1">Image</h4>
                <h4 className="md:col-span-3 ml-2">Pet name</h4>
                <h4 className="md:col-span-3">Progress</h4>
                <h4 className="md:col-span-2">Max Amount</h4>
                <h4 className="md:col-span-2">Status</h4>
                <h4 className="md:col-span-1">Action</h4>
            </div>
            {/* body */}
            <div className="font-semibold text-info">
                {
                    campaigns.map((campaign) => <div 
                        key={campaign._id}
                        className="grid md:grid-cols-12 justify-between items-center gap-2 py-6 px-6 font-medium border-t">
                        <img src={campaign.image} alt="" className="h-14 w-14 rounded-full md:col-span-1"/>
                        <h4 className="md:col-span-3 ml-2">{campaign.name}</h4>
                        <div className="md:col-span-3 pr-3">
                            <progress className="progress progress-primary md:col-span-3" value={parseInt(campaign.donatedAmount)} max={parseInt(campaign.maxAmount)}></progress>
                        </div>
                        <h4 className="md:col-span-2">{campaign.maxAmount}</h4>
                        <div className="md:col-span-2">
                            {
                                campaign.status ? <button onClick={() => handleStatus(campaign)} className="btn btn-ghost text-xl"><FaRegPauseCircle></FaRegPauseCircle></button>
                                : <button onClick={() => handleStatus(campaign)} className="btn btn-ghost text-xl"><FaRegPlayCircle></FaRegPlayCircle></button>
                            }
                        </div>
                        <div className="md:col-span-1">
                            <Link to={`/dashboard/update-campaign/${campaign._id}`} className="btn btn-ghost"><FaEdit className="text-xl"></FaEdit>
                            </Link>
                        </div>
                    </div>)
                }
            </div>
        </div>
    </div>
    );
};

export default MyCampaigns;