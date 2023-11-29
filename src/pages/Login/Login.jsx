import Swal from "sweetalert2";
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from 'react-simple-captcha';
import useAuth from "../../hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from 'react-icons/fc';
import loginImg from "../../assets/bg-2.jpg"
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Login = () => {
    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState(null)
    const captchaRef = useRef()
    const navigate = useNavigate()
    const location = useLocation()
    const axiosPublic = useAxiosPublic()
    const {signIn, googleSignIn} = useAuth()


    useEffect( () => {
        loadCaptchaEnginge(6); 
    } , [])

    const handleCaptcha = () => {
        const userInput = captchaRef.current.value;
        if(validateCaptcha(userInput)){
            setDisabled(false)
            setError('success')
        }
        else{
            setDisabled(true)
            setError('Captcha does not matched')
        }
    }


    const handleLogin = (event) => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)

        // signIn
        signIn(email, password)
        .then((result) => {
            console.log(result.user)
            Swal.fire({
              title: 'Success!',
              text: 'Login successful',
              icon: 'success',
              confirmButtonText: 'Ok'
            })
            navigate(location?.state?.from?.pathname || '/')
        })
        .catch((err) => {
          console.log(err)
          Swal.fire({
            title: 'Login Failed!',
            text: 'Invalid Email or Password',
            icon: 'error',
            confirmButtonText: 'Try again'
          })
        });
    }


    const handleGoogleSignIn = () => {
        googleSignIn()
        .then(res => {
            console.log(res)
            // send user to server
            const userInfo = {
                name: res.user?.displayName,
                email: res.user?.email,
            }
            axiosPublic.post('/users', userInfo)
            .then(res => {
                console.log(res.data)
                Swal.fire({
                    title: 'Success!',
                    text: 'Login successful',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
                navigate(location?.state?.from?.pathname || '/')
            })
            .catch(err => {
                console.log(err)
                Swal.fire({
                    title: 'Login Failed!',
                    text: 'Invalid Email or Password',
                    icon: 'error',
                    confirmButtonText: 'Try again'
                  })
            })
        })
      }

    
    return (
        <>
        {/* <HelmetDynamic
            title={'Login'}
        ></HelmetDynamic> */}
        <div className="hero min-h-screen font-poppins py-8 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="hero-content grid grid-cols-1 lg:grid-cols-11 gap-16 justify-between items-center">
            <div className="w-full flex justify-center items-center lg:col-span-5">
                <img src={loginImg} alt="" className=""/>
            </div>
    
            <div className="card flex-shrink-0 lg:col-span-6 w-full border py-10 lg:p-14">
                <h2 className="text-4xl font-semibold text-accent text-center mb-2">Login</h2>
                <form onSubmit={handleLogin} className="card-body">
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Email</span>
                    </label>
                    <input
                        type="email"
                        placeholder="Your email"
                        className="input input-bordered"
                        name="email"
                        required
                    />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Confirm Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Your password"
                            className="input input-bordered"
                            name="password"
                            required
                        />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">
                            Forgot password?
                            </a>
                        </label>
                    </div>
                    {/* Load reCAPTCHA */}
                    <div className="form-control">
                        <label className="label">
                            <LoadCanvasTemplate />
                        </label>
                        <input
                            type="text"
                            ref={captchaRef}
                            onChange={() => setError(null)}
                            placeholder="Enter Captcha"
                            className="input input-bordered"
                            name="captcha"
                            // required
                        />
                        {error === 'success' && <p className="text-green-600
                         text-sm mt-1">Captcha matched</p>}
                        {error !== 'success' && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    </div>
                    <div className="form-control mt-6 space-y-3">
                        <button disabled={!disabled} onClick={handleCaptcha} className="btn btn-neutral normal-case text-base">Validate Captcha</button>
                        <button disabled={disabled} className="btn btn-primary normal-case text-base">Login</button>
                    </div>
                </form>
                <div className="divider px-8 mb-8">OR</div>
                <div className="flex justify-center gap-4 px-8">
                    <button onClick={handleGoogleSignIn} className="btn btn-primary btn-outline normal-case text-base w-full "><FcGoogle className="text-xl"></FcGoogle>Google</button>
                </div>
                <p className="text-[#737373] text-center text-sm mt-10">Not have an account? <Link to={'/auth/sign-up'} className="text-primary font-semibold hover:btn-link">Sign Up</Link></p>
            </div>
            </div>
        </div>
    </>
    );
};

export default Login;