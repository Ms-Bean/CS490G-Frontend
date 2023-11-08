import React, {useState, useEffect} from "react";
import profile_pic from "./default-avatar-profile-icon-of-social-media-user-vector.jpg"

let tempFormData = {
    first_name : "Luffy",
    last_name : "Monkey",
    email : "monkeyDluffy@gmail.com",
    address : "123 wano street"
}

const EditAccountForm = () => {
    const [editing ,setEditing] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [formData, setFormData] = useState({
        first_name : "",
        last_name : "",
        username: "",
        email : "",
        address : "",
        city: "",
        state: "",
        phone_number: "",
    });

    useEffect(() => {
        //Fetch user's information
        fetch("http://localhost:3500/get_user_account_info", {
            credentials: "include",
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("DATA:")
            console.log(data);
            setFormData({
                first_name : data.response.first_name,
                last_name : data.response.last_name,
                username: data.response.username,
                email : data.response.email,
                address : data.response.address,
                city: data.response.city,
                state: data.response.state,
                phone_number: data.response.phone_number
            });
        });
        setUploadSuccess(false);
        console.log("in use effect")
    }, [uploadSuccess])

    const handleInputChange = (e) => {
        const {name, value} = e.target;

        setFormData({ ...formData, [name]: value });

        console.log(formData);
    }

    const submitEdit = () => {
        //rest call to update user's information
        //... some code here

        setEditing(false);
    }

    const changeProfilePicture = () => {
        //... code to upload picture from computer

        //... rest call to update user's profile picture

        //if upload was a success
        setUploadSuccess(true);
    }

    return (
        <div className="container">
            <div className="my-2">
                <img className="img-thumbnail" src={profile_pic}/>
                <button disabled={editing} onClick={changeProfilePicture} className="ms-3 btn btn-light">Change Profile Picture</button>
            </div>


            <button disabled={editing} onClick={() => {setEditing(true)}} className="btn btn-secondary mt-2">Edit</button>
            <form onSubmit={submitEdit}>
                <div class="form-group my-3">
                    <label className="lead" for="username">Username</label>
                    <input 
                    className="form-control mt-2"
                    disabled={!editing} 
                    type="text"  
                    id="first_name" 
                    name="first_name"
                    placeholder="Username" 
                    onChange={handleInputChange} 
                    value={formData.username}/>
                </div>
                <div class="form-group my-3">
                    <label className="lead" for="first_name">First Name</label>
                    <input 
                    className="form-control mt-2" 
                    disabled={!editing} 
                    type="text" 
                    id="first_name" 
                    name="first_name"
                    placeholder="First Name" 
                    onChange={handleInputChange}
                    value={formData.first_name}/>
                </div>
                <div class="form-group my-3">
                    <label className="lead" for="last_name">Last Name</label>
                    <input 
                    className="form-control mt-2" 
                    disabled={!editing} 
                    type="text" 
                    id="last_name" 
                    name="last_name"
                    placeholder="Last Name" 
                    onChange={handleInputChange}
                    value={formData.last_name}/>
                </div>
                <div class="form-group my-3">
                    <label className="lead" for="email">Email</label>
                    <input
                    className="form-control mt-2" 
                    disabled={!editing} 
                    type="email" 
                    id="email" 
                    name="email"
                    placeholder="Email" 
                    onChange={handleInputChange}
                    value={formData.email}/>
                </div>
                <div class="form-group my-3">
                    <label className="lead" for="address">Phone number</label>
                    <input 
                    className="form-control mt-2" 
                    disabled={!editing} 
                    type="text" 
                    id="phone_number"
                    name="phone_number"
                    placeholder="Phone number" 
                    onChange={handleInputChange}
                    value={formData.phone_number}/>
                </div>
                <div class="form-group my-3">
                    <label className="lead" for="address">Address</label>
                    <input 
                    className="form-control mt-2" 
                    disabled={!editing} 
                    type="text" 
                    id="address"
                    name="address"
                    placeholder="Address" 
                    onChange={handleInputChange}
                    value={formData.address}/>
                </div>
                <div class="form-group my-3">
                    <label className="lead" for="city">City</label>
                    <input 
                    className="form-control mt-2" 
                    disabled={!editing} 
                    type="text" 
                    id="city"
                    name="city"
                    placeholder="City" 
                    onChange={handleInputChange}
                    value={formData.city}/>
                </div>
                <div class="form-group my-3">
                    <label className="lead" for="address">State</label>
                    <input 
                    className="form-control mt-2" 
                    disabled={!editing} 
                    type="text" 
                    id="state"
                    name="state"
                    placeholder="State" 
                    onChange={handleInputChange}
                    value={formData.state}/>
                </div>
                <button type="submit" className={`btn btn-primary me-2 mb-3 ${!editing ? "d-none" : ""}`}>Submit</button>
                <button onClick={() => setEditing(false)} className={`btn btn-danger mb-3 ${!editing ? "d-none" : ""}`}>Cancel</button>
            </form>
        </div>
    )
}

export default EditAccountForm;