import { useAuth } from "./useAuth";
import { useLocalStorage } from "./useLocalStorage";

export const useLogout = () => {

    const {dispatch} = useAuth();
    const {removeItem} = useLocalStorage();

    const logout = async () => {
        const response = await fetch("http://localhost:3500/logout", {
            method: "POST",
            credentials: "include",
        });
        if (response.ok) {
            //remove user from storages
            removeItem('user');

            //dispatch logout
            dispatch({type : 'LOGOUT'})
            return true;
        } else {
            console.error("Error occurred during logout:", response.status);
            return false;
        }
    };

    return {logout};
}