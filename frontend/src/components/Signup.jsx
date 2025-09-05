import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router"
import Input from "./Input";
import Button from "./Button";
import authSerivce from "../backend/auth";
import userservice from "../backend/user";
import { login as authlogin } from "../store/feature/authSlice";
import { useState } from "react";


const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
     const {register, handleSubmit} = useForm();
    const [error, setError] = useState("");

    const signup = async (data) => {
        setError("")
        console.log({...data});
        try {
            const response = await authSerivce.createAccount({...data});
            if(response.error) {
                setError(response.error);
            }
            else {
                // Login Object Cast 
                const data1 = {
                    email : data.email,
                    password : data.password
                }
                const login  = await authSerivce.login(data);

                if(login.error) {
                    setError(login.error);
                }
                else {
                    const token = login.token;
                    console.log(token);

                    const userdata = await userservice.getUser({token});
                    if(userdata.error) {
                        console.log("Error Logging in ");
                        navigate("/");
                        
                    }
                    else {
                        dispatch(authlogin({userdata,token}));
                        navigate("/dashboard");
                    }
                }

            }
        } catch (error) {
            
        }
        
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h2>
                    <p className="text-gray-600">Join us and start managing your logs efficiently</p>
                </div>

                {/* Form Card */}
                <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-gray-100">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 text-red-700 rounded-lg">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {error}
                            </div>
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit(signup)} className="space-y-6">
                        {/* Username Field */}
                        <Input 
                            label="Full Name"
                            placeholder="Enter your full name"
                            type="text"
                            required
                            {...register("username", {
                                required: "Full name is required",
                                minLength: {
                                    value: 2,
                                    message: "Name must be at least 2 characters"
                                }
                            })}
                        />
                        
                        {/* Email Field */}
                        <Input
                            label="Email Address"
                            placeholder="Enter your email"
                            type="email"
                            required
                            {...register("email", {
                                required: "Email is required",
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Please enter a valid email address",
                                }
                            })}
                        />
                        
                        {/* Password Field */}
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Create a strong password"
                            required
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters"
                                }
                            })}
                        />
                        
                       
                        
                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full"
                            size="lg"
                            variant="primary"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Create Account
                        </Button>
                        
                        
                    </form>
                    
                    {/* Login Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <button 
                                onClick={() => navigate('/login')}
                                className="font-medium text-purple-600 hover:text-purple-500 transition-colors duration-200"
                            >
                                Sign in here
                            </button>
                        </p>
                    </div>
                </div>
                
                {/* Features */}
                <div className="mt-8">
                    <div className="text-center mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Why join us?</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-lg p-3">
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <span className="text-sm text-gray-700 font-medium">Real-time log monitoring</span>
                        </div>
                        
                        <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-lg p-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <span className="text-sm text-gray-700 font-medium">Secure API access</span>
                        </div>
                        
                        <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-lg p-3">
                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <span className="text-sm text-gray-700 font-medium">Lightning fast analytics</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Signup;