import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"


const ProtectedRoute = ({ children ,authentication = true}) => {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
     const token = useSelector((state) => state.auth.token);

    
    const authStatus = useSelector(state => state.auth.isAuthenticated)

   
    

    useEffect(() => {

        if(authentication && authStatus !== authentication){
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])

  return loader ? <h1>Loading...</h1> : <>{children}</>
}
export default ProtectedRoute;