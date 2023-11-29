
import { useFormik } from "formik";
import * as Yup from 'yup';
import DashboardBack from "../../../components/DashboardBack";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";

const AddPet = () => {
    const axiosPublic = useAxiosPublic()
    
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
                name: values.name,
                category: values.category,
                image: values.image,
                adopterName: values.user?.displayName,
                adopterEmail: values.user?.email,
                phone: values.values.phone,
                address: values.values.address,
                requestDate: values.today, 
            }
            axiosPublic.post(`/adoption`, requestData)
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
        <div>
            <div>
                <DashboardBack></DashboardBack>
                <h1 className="font-bold text-info text-2xl mb-10">Add a pet</h1>
            </div>
            <div className="bg-base-100 shadow-sm p-6 rounded-lg">
            <form onSubmit={formik.handleSubmit} className="space-y-1">
                <div className="">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your pet name" 
                        className="input input-bordered"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        />
                        {formik.touched.name && formik.errors.name ? (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
                        ) : null}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Age</span>
                        </label>
                        <input
                        id="age"
                        name="age"
                        type="text"
                        placeholder="Your pet age" 
                        className="input input-bordered"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.age}
                        />
                        {formik.touched.age && formik.errors.age ? (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.age}</div>
                        ) : null}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Location</span>
                        </label>
                        <input
                        id="location"
                        name="location"
                        type="text"
                        placeholder="Your location" 
                        className="input input-bordered"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.location}
                        />
                        {formik.touched.location && formik.errors.location ? (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.location}</div>
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
            </div>
        </div>
    );
};

export default AddPet;