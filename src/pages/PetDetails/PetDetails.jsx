import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoLocationOutline, IoPawOutline } from "react-icons/io5";
import { BsCalendarDate } from "react-icons/bs";
import { MdOutlineAccessTime } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { useFormik } from "formik";
import * as Yup from 'yup';
import useAuth from "../../hooks/useAuth";
import useDate from "../../hooks/useDate";
import toast, { Toaster } from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PetDetails = () => {
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const petId = useParams().id;
    const {user} = useAuth()

    const {data: pet={}} = useQuery({
        queryKey: ['pet', petId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/pet?id=${petId}`)
            return res.data;
        }
    })
    const {name, age, category, image, location, short_description, long_description, adoption_date, adoption_time, userEmail, userName} = pet;

    const today = useDate()

    const formik = useFormik({
        initialValues: {
          name: '',
          email: '',
          phone: '',
          address: '',
        },
        validationSchema: Yup.object({
          phone: Yup.string()
            .min(8, 'Must be 8 characters or more')
            .max(15, 'Must be 15 characters or less')
            .required('Phone is required'),
          address: Yup.string()
            .min(3, 'Must be 3 characters or more')
            .max(30, 'Must be 30 characters or less')
            .required('Address is required'),
        }),
        onSubmit: values => {
            const requestData = {
                name: name,
                category: category,
                image: image,
                adopterName: user?.displayName,
                adopterEmail: user?.email,
                phone: values.phone,
                address: values.address,
                masterName: userName,
                masterEmail: userEmail,
                requestDate: today, 
            }
            axiosPublic.post(`/adoptions`, requestData)
            .then(res => {
                if(res.data.message === 'success'){
                    toast.success('Request saved');
                } else{
                    toast.error('Request already taken');
                }
            })
        },
      });

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
                        <p className="flex items-center gap-2 font-bold text-slate-900"><IoPawOutline className="text-primary text-lg"></IoPawOutline>Category: <span className="text-slate-500">{category}</span></p>
                        <p className="flex items-center gap-2 font-bold text-slate-900"><FaRegCalendarAlt className="text-primary text-lg"></FaRegCalendarAlt>Age: <span className="text-slate-500">{age} Years</span></p>
                        <p className="flex items-center gap-2 font-bold text-slate-900"><IoLocationOutline className="text-primary text-lg"></IoLocationOutline>Location: <span className="text-slate-500">{location}</span></p>
                        <p className="flex items-center gap-2 font-bold text-slate-900"><BsCalendarDate className="text-primary"></BsCalendarDate>Listed Date: <span className="text-slate-500">{adoption_date}</span></p>
                        <p className="flex items-center gap-2 font-bold text-slate-900"><MdOutlineAccessTime className="text-primary text-lg"></MdOutlineAccessTime>Listed Time: <span className="text-slate-500">{adoption_time}</span></p>
                        <div className="pt-4">
                            <p className="font-medium">{short_description}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-between gap-20">
                    <div className="max-w-screen-sm">
                        <h3 className="text-2xl font-bold">{name} description</h3>
                        <p className="mt-4 text-info">{long_description}</p>
                    </div>
                    <div className="flex-1 lg:max-w-sm bg-base-100 p-10 rounded-xl shadow-lg">
                        <button onClick={()=>document.getElementById('my_modal_5').showModal()} className="btn btn-primary text-base w-full">Apply to adopt</button>
                    </div>
                </div>
                {/* Popup Modal */}
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <form onSubmit={formik.handleSubmit} className="modal-box space-y-1">
                    <h3 className="font-bold text-xl text-center">Apply For Adoption</h3>
                    <div className="md:px-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Your name" 
                            className="input input-bordered"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={user?.displayName}
                            disabled
                            />
                            {formik.touched.name && formik.errors.name ? (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
                            ) : null}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Your email" 
                            className="input input-bordered"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={user?.email}
                            disabled
                            />
                            {formik.touched.email && formik.errors.email ? (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Phone</span>
                            </label>
                            <input
                            id="phone"
                            name="phone"
                            type="text"
                            placeholder="Your phone" 
                            className="input input-bordered"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phone}
                            />
                            {formik.touched.phone && formik.errors.phone ? (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.phone}</div>
                            ) : null}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Address</span>
                            </label>
                            <input
                            id="address"
                            name="address"
                            type="text"
                            placeholder="Your address" 
                            className="input input-bordered"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.address}
                            />
                            {formik.touched.address && formik.errors.address ? (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.address}</div>
                            ) : null}
                        </div>
                    </div>
                    <div className="modal-action flex justify-center pt-4">
                        <button className="btn btn-primary md:text-base" type="submit">Submit</button>
                    </div>
                </form>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
                <Toaster position="top-center"></Toaster>
                </dialog>
            </div>
        </div>
    );
};

export default PetDetails;