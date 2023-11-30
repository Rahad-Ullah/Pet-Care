import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaCheckCircle  } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { MdOutlineRemoveCircle } from "react-icons/md";

const AdoptionRequests = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()

    const {data: requests=[], refetch} = useQuery({
        queryKey: ['requests'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/adoptions/${user.email}`)
            return res.data;
        }
    })
    console.log(requests)

    const handleAccept = (request) => {
        axiosSecure.patch(`/adoptions?id=${request._id}&name=${request.name}&masterEmail=${request.masterEmail}`)
        .then(res => {
            console.log(res.data)
            if(res.data.modifiedCount > 0){
                refetch()
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Request has accepted`,
                    showConfirmButton: false,
                    timer: 1500
                    });
            }
        })
    }

    const handleReject = (request) => {
        // axiosSecure.patch(`/adoptions?id=${request._id}`)
        // .then(res => {
        //     console.log(res.data)
        //     if(res.data.modifiedCount > 0){
        //         refetch()
        //         Swal.fire({
        //             position: "center",
        //             icon: "success",
        //             title: `Request has accepted`,
        //             showConfirmButton: false,
        //             timer: 1500
        //             });
        //     }
        // })
    }

    
    return (
        <div className="mx-auto p-12 px-8 bg-white">
        <div className="pb-4 flex justify-between">
            <h2 className="text-2xl text-info font-extrabold">My Campaigns</h2>
            <h2 className="text-xl text-info font-bold">Total Campaigns: {requests.length}</h2>
        </div>
        <div>
            {/* heading */}
            <div className="grid md:grid-cols-12 justify-between py-7 px-6 font-extrabold text-gray-700">
                <h4 className="md:col-span-1">Pet</h4>
                <h4 className="md:col-span-2 ml-1">Adopter Name</h4>
                <h4 className="md:col-span-2">Location</h4>
                <h4 className="md:col-span-2">Phone</h4>
                <h4 className="md:col-span-3">Email</h4>
                <h4 className="md:col-span-1">Accept</h4>
                <h4 className="md:col-span-1">Reject</h4>
            </div>
            {/* body */}
            <div className="font-semibold text-info">
                {
                    requests.map((request) => <div 
                        key={request._id}
                        className="grid md:grid-cols-12 justify-between items-center gap-2 py-6 px-6 font-medium border-t">
                        <img src={request?.image} alt="" className="h-14 w-14 rounded-full md:col-span-1"/>
                        <h4 className="md:col-span-2 ml-1">{request?.adopterName}</h4>
                        <h4 className="md:col-span-2">{request?.address}</h4>
                        <h4 className="md:col-span-2">{request?.phone}</h4>
                        <h4 className="md:col-span-3">{request?.adopterEmail}</h4>
                        <div className="md:col-span-1">
                            {
                                request.status === 'accepted' ? <p className="font-bold">{'Accepted'}</p>
                                : <button onClick={() => handleAccept(request)} className="btn btn-ghost text-xl"><FaCheckCircle></FaCheckCircle></button>
                            }
                        </div>
                        <button onClick={() => handleReject(request)} className="btn btn-ghost md:col-span-1"><MdOutlineRemoveCircle  className="text-2xl"></MdOutlineRemoveCircle>
                        </button>
                    </div>)
                }
            </div>
        </div>
    </div>
    );
};

export default AdoptionRequests;