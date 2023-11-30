import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { FiDollarSign } from "react-icons/fi";
import { MdOutlineAccessTime } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { LiaDonateSolid } from "react-icons/lia";
import { CiCalendar } from "react-icons/ci";
import { FaCalendarAlt, FaSignal } from "react-icons/fa";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../Payments/CheckOutForm";
import useAuth from "../../hooks/useAuth";


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK)

const CampaignDetails = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    const navigate = useNavigate()
    const id = useParams().id;

    const {data: campaign={}} = useQuery({
        queryKey: ['campaign', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/single-campaign?id=${id}`)
            return res.data;
        }
    })

    const {name, image, creation_date, creation_time, donatedAmount, maxAmount, lastDate, status, short_description, long_description} = campaign;


    return (
        <div className="bg-slate-50">
            <div className="py-16 w-5/6 mx-auto max-w-screen-xl">
                <span onClick={() => navigate(-1)} className="inline-flex items-center gap-1 text-xl font-bold mb-8 link link-hover"><IoIosArrowBack></IoIosArrowBack>
                Back</span>
                <div className="flex flex-col lg:flex-row justify-between gap-12 mb-12">
                    <figure className="w-full lg:w-6/12">
                        <img src={image} alt="" className="rounded-xl"/>
                    </figure>
                    <div className="flex-1 space-y-1 bg-base-100 shadow-lg p-8 pt-0 rounded-xl">
                        <div className="text-primary font-bold text-center py-5 border-b-2 border-primary mb-6">
                            Pet Information
                        </div>
                        <h1 className="text-3xl font-bold pb-2">{name}</h1>
                        <p className="flex items-center gap-2 font-bold text-slate-900"><FiDollarSign className="text-primary text-lg"></FiDollarSign>Max Amount: <span className="text-slate-500"> ${maxAmount}</span></p>
                        <p className="flex items-center gap-2 font-bold text-slate-900"><LiaDonateSolid className="text-primary text-lg"></LiaDonateSolid>Donated Amount: <span className="text-slate-500">${donatedAmount}</span></p>
                        <p className="flex items-center gap-2 font-bold text-slate-900"><CiCalendar className="text-primary text-lg"></CiCalendar>Creation Date: <span className="text-slate-500">{creation_date}</span></p>
                        <p className="flex items-center gap-2 font-bold text-slate-900"><MdOutlineAccessTime className="text-primary text-lg"></MdOutlineAccessTime>Creation Time: <span className="text-slate-500">{creation_time}</span></p>
                        <p className="flex items-center gap-2 font-bold text-slate-900"><FaSignal className="text-primary text-lg"></FaSignal>Campaign Status: <span className="text-slate-500">{status ? 'Running' : 'Closed'}</span></p>
                        <p className="flex items-center gap-2 font-bold text-slate-900"><FaCalendarAlt className="text-primary text-lg"></FaCalendarAlt>Last Date: <span className="text-slate-500">{lastDate}</span></p>
                        <div className="pt-4">
                            <p className="font-medium">{short_description}</p>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="">
                        <h3 className="text-2xl font-bold">{name} description</h3>
                        <p className="mt-4 text-info">{long_description}</p>
                    </div>
                    <div className="inline-flex mt-10 bg-base-100 rounded-xl shadow-lg">
                        {
                            user ? <button onClick={()=>document.getElementById('my_modal_5').showModal()} disabled={!status} className="btn btn-primary text-base md:px-10">Donate Now</button>
                            : <button onClick={() => navigate('/auth/login')} disabled={!status} className="btn btn-primary text-base md:px-10">Donate Now</button>
                        }
                    </div>
                </div>
                
                {/* Popup Modal */}
                <dialog id="my_modal_5" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-xl text-center">Payment Details</h3>
                    <div className="px-4 py-4">
                        <Elements stripe={stripePromise}>
                            <CheckOutForm campaign={campaign}/>
                        </Elements>
                    </div>
                    <p className="pt-2 text-sm text-center text-blue-500">Click outside to close</p>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
                </dialog>
            </div>
        </div>
    );
};

export default CampaignDetails;