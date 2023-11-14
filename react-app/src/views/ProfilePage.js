import React, {useState, useEffect} from "react";
import ClientProfile from "../components/ClientProfile";
import CoachProfile from "../components/CoachProfile";

const ProfilePage = () => {

    const [type, setType] = useState(null);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const response = await fetch("http://localhost:3500/get_role", {
                method: "GET",
                credentials: "include",
            });
            if (!response.ok) {
            throw new Error('Error: ' + response.statusText);
            }
            const data = await response.json();
            setType(data.message);
            return data.message;
            } catch (error) {
                console.error('Error fetching user role:', error);
                throw error;
            }
            };

        fetchUserRole();
    }, []);

    return (
        <div className="mt-2 container border rounded shadow">
            {type === "client" && 
            <>
                <div className="d-flex justify-content-center">
                    <h1 className="m-2">Member Profile</h1>
                </div>
                <ClientProfile/>
            </>}
            {type == "coach" && 
            <>
                <div className="d-flex justify-content-center">
                    <h1 className="m-2">Trainer Profile</h1>
                </div>
                <CoachProfile/>
            </>}
        </div>
    )
}

export default ProfilePage;