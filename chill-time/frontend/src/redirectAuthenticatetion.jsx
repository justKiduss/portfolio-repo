import {Navigate} from "react-router-dom";
import useAuth from "./hooks/useAuth";

const RedirectAuthenticatedUser=({children})=>{
    const {user}=useAuth();
    console.log(user);
    if(user){
        return <Navigate to="/" replace/>;
    }
    return children;
}
export default  RedirectAuthenticatedUser;