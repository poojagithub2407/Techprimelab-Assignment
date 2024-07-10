
import { useAuth } from "./useAuth";
import { Outlet, Navigate } from 'react-router-dom'


function PrivateRoutes(){
     const token=useAuth()
     return token?<Outlet/>:<Navigate to='/login'/>
   }
   
   export default PrivateRoutes