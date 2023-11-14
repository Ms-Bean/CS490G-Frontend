import React, {useEffect, useState} from "react";
import profile_pic from "./default-avatar-profile-icon-of-social-media-user-vector.jpg";

const ClientProfile = () => {

    const [editing ,setEditing] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [formData, setFormData] = useState({
            weight: "",
            height: "",
            experience: "",
            budget: "",
    });

    useEffect(() => {
        //fetch user's profile information

    }, [uploadSuccess])
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
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
                    <label className="lead" for="weight">Weight</label>
                    <input 
                    className="form-control mt-2" 
                    disabled={!editing} 
                    type="number" 
                    id="weight" 
                    name="weight"
                    placeholder="Weight" 
                    onChange={handleInputChange}
                    value={formData.weight}/>
                </div>
                <div class="form-group my-3">
                    <label className="lead" for="Height">Height</label>
                    <input 
                    className="form-control mt-2" 
                    disabled={!editing} 
                    type="number" 
                    id="height" 
                    name="height"
                    placeholder="Height" 
                    onChange={handleInputChange}
                    value={formData.height}/>
                </div>
                <div class="form-group my-3">
                    <label className="lead" for="experience">Experience Level</label>
                    <select disabled={!editing} className="form-select" name="experience" value={formData.experience} onChange={handleInputChange} aria-label="Default select example">
                        <option selected>Select your experience level</option>
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                    </select>
                </div>
                <div class="form-group my-3">
                    <label className="lead" for="budget">Budget Per Session</label>
                    <select disabled={!editing} className="form-select" name="budget" value={formData.budget} onChange={handleInputChange} aria-label="Default select example">
                        <option value="" disabled>
                        Select your budget
                        </option>
                        <option>$</option>
                        <option>$$</option>
                        <option>$$$</option>
                    </select>
                </div>
                <button type="submit" className={`btn btn-primary me-2 mb-3 ${!editing ? "d-none" : ""}`}>Save Changes</button>
                <button type="button" onClick={() => setEditing(false)} className={`btn btn-danger mb-3 ${!editing ? "d-none" : ""}`}>Cancel</button>
            </form>

        </div>
    )
}

export default ClientProfile;