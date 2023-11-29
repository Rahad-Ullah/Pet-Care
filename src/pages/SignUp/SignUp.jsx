import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import signUpImg from "../../assets/bg-2.jpg"
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SignUp = () => {
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const {createUser, updateUser} = useAuth()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm()

      const onSubmit = (data) => {
        console.log(data)
        createUser(data.email, data.password)
        .then(res => {
            const loggedUser = res.user;
            console.log(loggedUser)
            // update user name and photo
            updateUser(data.name, data.photo)
            .then(() => {
                // create user entry in database
                const userInfo = {
                    name: data.name, 
                    email: data.email,
                }
                axiosPublic.post('/users', userInfo)
                .then(res => {
                    if(res.data.insertedId){
                        console.log('user added to database')
                        Swal.fire({
                            title: 'Success!',
                            text: 'Sign up successful',
                            icon: 'success',
                            confirmButtonText: 'Ok'
                        })
                        navigate('/')
                        reset()
                    }
                })
            }).catch((err) => {
                console.log(err)
            });
        }) 
        .catch((err) => {
            console.log(err)
            Swal.fire({
                title: 'Error!',
                text: 'Sign up failed',
                icon: 'error',
                confirmButtonText: 'Try again'
            })
        });
    }
    
    return (
        <div className="hero min-h-screen font-poppins py-12 max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="hero-content grid grid-cols-1 lg:grid-cols-11 gap-16 p-0 justify-between items-center">
                <div className="w-full hidden md:flex justify-center items-center col-span-5">
                    <img src={signUpImg} alt="" />
                </div>

                <div className="card flex-shrink-0 col-span-6 w-full border py-10 lg:p-14">
                    <h2 className="text-4xl font-semibold text-center mb-2">Sign Up</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Your name"
                            className="input input-bordered"
                            name="name"
                            {...register("name",{ required: true, minLength: 3 })}
                        />
                        {errors.name?.type === 'required' && <span className='text-red-500 text-sm mt-1'>Name is required</span>}
                        {errors.name?.type === 'minLength' && <span className='text-red-500 text-sm mt-1'>Minimum 3 character required</span>}
                        </div>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Your email"
                            className="input input-bordered"
                            name="email"
                            {...register("email", {required: true})}
                            
                        />
                        {errors.email && <span className='text-red-500 text-sm mt-1'>Email is required</span>}
                        </div>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Photo URL</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Your Photo URL"
                            className="input input-bordered"
                            name="photo"
                            {...register("photo")}
                            
                        />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Your password"
                                className={`input input-bordered ${errors.password && 'border-red-500'}`}
                                name="password"
                                {...register("password", {required: true, 
                                    minLength: 6, 
                                    maxLength: 20,
                                    pattern: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/
                                })}
                                
                            />
                            {errors?.password?.type === 'required' && <span className='text-red-500 text-sm mt-1'>Password is required</span>}
                            {errors?.password?.type === 'minLength' && <span className='text-red-500 text-sm mt-1'>Minimum 6 character required</span>}
                            {errors?.password?.type === 'maxLength' && <span className='text-red-500 text-sm mt-1'>Maximum length 20 character</span>}
                            {errors?.password?.type === 'pattern' && <span className='text-red-500 text-sm mt-1'>At least one capital, small letter, number and special character</span>}
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary normal-case text-base">Sign Up</button>
                        </div>
                    </form>
                    <p className="text-[#737373] text-center text-sm mt-4">Already have an account? <Link to={'/auth/login'} className="text-primary font-semibold hover:btn-link">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;