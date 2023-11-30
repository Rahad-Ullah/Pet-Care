import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { RiRefund2Line } from "react-icons/ri";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const MyDonations = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()

    const {data: donations=[], refetch} = useQuery({
        queryKey: ['donations'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donations/${user.email}`)
            return res.data;
        }
    })

    const handleRefund = (donation) => {
        axiosSecure.delete(`/donations/${donation._id}`)
        .then(res => {
            console.log(res.data)
            if(res.data.deletedCount > 0){
                refetch()
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Donation has been refund`,
                    showConfirmButton: false,
                    timer: 1500
                    });
            }
        })
    }

    
    return (
        <div className="mx-auto p-12 bg-white">
        <div className="pb-4 flex justify-between">
            <h2 className="text-2xl text-info font-extrabold">My Donations</h2>
            <h2 className="text-xl text-info font-bold">Total Donations: {donations.length}</h2>
        </div>
        <div>
            {/* heading */}
            <div className="grid md:grid-cols-12 justify-between py-7 px-6 font-extrabold text-gray-700">
                <h4 className="md:col-span-2">Image</h4>
                <h4 className="md:col-span-5 ml-2">Pet name</h4>
                <h4 className="md:col-span-3">Amount</h4>
                <h4 className="md:col-span-2">Refund</h4>
            </div>
            {/* body */}
            <div className="font-semibold text-info">
                {
                    donations.map((donation) => <div 
                        key={donation._id}
                        className="grid md:grid-cols-12 justify-between items-center gap-2 py-6 px-6 font-medium border-t">
                        <img src={donation?.image} alt="" className="h-14 w-14 rounded-full md:col-span-2"/>
                        <h4 className="md:col-span-5 ml-2">{donation?.name}</h4>
                        <h4 className="md:col-span-3">${donation?.amount}</h4>
                        <div className="md:col-span-2">
                        <button onClick={() => handleRefund(donation)} className="btn btn-primary text-2xl"><RiRefund2Line></RiRefund2Line></button>
                        </div>
                    </div>)
                }
            </div>
        </div>
    </div>
    );
};

export default MyDonations;