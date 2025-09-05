import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router"
import Input from "./Input";
import Button from "./Button";
import authSerivce from "../backend/auth";
import userservice from "../backend/user";
import { login as authlogin } from "../store/feature/authSlice";
import { useState } from "react";


const Login = () => {
        const navigate = useNavigate();
        const dispatch = useDispatch();``
        const {register, handleSubmit} = useForm();
        const [error, setError] = useState("");

        const login_user = async (data) => {
            setError("");
             
            
            const login =  await authSerivce.login(data);
            console.log(login);
            
            if(login.error) {
                setError(login.error);
            }
            else {
                const token = await login.token;
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
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-4">
                        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
                    <p className="text-gray-600">Please sign in to your account</p>
                </div>

                {/* Form */}
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
                    
                    <form onSubmit={handleSubmit(login_user)} className="space-y-6">
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
                        
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            required
                            {...register("password", {
                                required: "Password is required"
                            })}
                        />
                        
                        <Button
                            type="submit"
                            className="w-full"
                            size="lg"
                        >
                            Sign In
                        </Button>
                    </form>
                    
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <button 
                                onClick={() => navigate('/signup')}
                                className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
                            >
                                Sign up here
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;