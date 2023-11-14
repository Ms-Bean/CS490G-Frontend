import React, {useEffect, useState} from "react";
import profile_pic from "./static_images/default-avatar-profile-icon-of-social-media-user-vector.jpg";

const ClientProfile = () => {

    const [editing ,setEditing] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [formData, setFormData] = useState({
        experience: "",
        cost_per_session: "",
        availability: "",
      });

    useEffect(() => {
        //fetch user's profile information

    }, [uploadSuccess, editing])
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let parsedValue = value;
        if (name === 'cost_per_session') {
          parsedValue = value ? parseFloat(value) : ""; // Parse field as a float if it's not empty
    
        }
        setFormData({
          ...formData,
          [name]: parsedValue,
        });
        console.log(formData);
    };

    const submitEdit = async (e) => {
        e.preventDefault();
        //rest call to edit user's profile
        
        setEditing(false);
    };

    return (
        <div className="container my-2">
            
            <div className="my-2">
                <img className="img-thumbnail rounded d-block mx-auto" src={profile_pic}/>
            </div>

            <form onSubmit={submitEdit} className="w-75 mx-auto">
            <button type="button" disabled={editing} onClick={() => {setEditing(true)}} className="btn btn-secondary mt-2">Edit</button>
                <div class="form-group my-3">
                    <label className="lead" for="experience">Experience</label>
                    <input 
                    className="form-control mt-2" 
                    disabled={!editing} 
                    type="text" 
                    id="experience" 
                    name="experience"
                    placeholder="experience" 
                    onChange={handleInputChange}
                    value={formData.experience}/>
                </div>
                <div class="form-group my-3">
                    <label className="lead" for="cost_per_session">Cost Per Session</label>
                    <input 
                    className="form-control mt-2" 
                    disabled={!editing} 
                    type="number" 
                    id="cost_per_session" 
                    name="cost_per_session"
                    placeholder="cost_per_session" 
                    onChange={handleInputChange}
                    value={formData.cost_per_session}/>
                </div>
                <div class="form-group my-3">
                    <label className="lead" for="availability">Availability</label>
                    <input 
                    className="form-control mt-2" 
                    disabled={!editing} 
                    type="text" 
                    id="availability" 
                    name="availability"
                    placeholder="availability" 
                    onChange={handleInputChange}
                    value={formData.availability}/>
                </div>
                <button type="submit" className={`btn btn-primary me-2 mb-3 ${!editing ? "d-none" : ""}`}>Save Changes</button>
                <button type="button" onClick={() => setEditing(false)} className={`btn btn-danger mb-3 ${!editing ? "d-none" : ""}`}>Cancel</button>
            </form>

        </div>
    )
}

export default ClientProfile;