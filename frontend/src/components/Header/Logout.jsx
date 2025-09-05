import { useDispatch, useSelector } from "react-redux"
import conf from "../../conf/conf";
import { useNavigate } from "react-router";
import { logout } from "../../store/feature/authSlice";

const Logout = () => {
    
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();
     const handlelogout = async () => {
        console.log(conf.backendurl + "api");
        
        const response = await fetch(conf.backendurl+"api/" , {
            method:"POST",
            headers:{
                "Authorization": "Bearer " + token
            }
        })
        if(response.ok) {
            dispatch(logout());
            navigate("/");
        }
        else {
            console.log("Logout Failed");
              
        }
    }
    return (
        <button
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 border border-red-200 hover:border-red-500 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-sm hover:shadow-md"
            onClick={handlelogout}
        >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
        </button>
    )
}
export default Logout;