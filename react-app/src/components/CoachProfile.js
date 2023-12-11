import React, { useEffect, useState } from "react";
import profile_pic from "./static_images/default-avatar-profile-icon-of-social-media-user-vector.jpg";
import { config } from "./../utils/config";

const ClientProfile = () => {
  const [editing, setEditing] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    experience: "",
    budget: "",
  });

  useEffect(() => {
    //Fetch client profile information
    fetch(`${config.backendUrl}/get_user_profile`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let b;
        if(data.response.client_profile_info.budget === 0)
          b = '$';
        else if(data.response.client_profile_info.budget === 1)
          b = '$$';
        else if(data.response.client_profile_info.budget === 2)
          b = '$$$';
        setFormData({
          about_me: data.response.client_profile_info.about_me,
          birthday: data.response.client_profile_info.birthday ? data.response.client_profile_info.birthday.slice(0,10) : undefined,
          medical_conditions: data.response.client_profile_info.medical_conditions,
          target_weight: data.response.client_profile_info.target_weight,
          weight: data.response.client_profile_info.weight,
          height: data.response.client_profile_info.height,
          experience_level: data.response.client_profile_info.experience_level,
          budget: b,
        });
      });
    setUploadSuccess(false);
  }, [uploadSuccess, editing]);
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
    console.log(formData.about_me);
    console.log(formData.target_weight);
    try {
      console.log("Edit Account");
      console.log(formData.state);
      const response = await fetch(`${config.backendUrl}/set_user_profile`, {
        method: "POST",
        headers: {
          // Moved data to body instead of headers
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          about_me: formData.about_me,
          experience_level: formData.experience_level,
          height: formData.height,
          weight: formData.weight,
          medical_conditions: formData.medical_conditions,
          budget: formData.budget !== undefined ? formData.budget.length : undefined,
          goals: formData.goals,
          target_weight: formData.target_weight,
          birthday: formData.birthday
        }),
        credentials: "include", // Include credentials with the request
      });
      if (response.ok) {
        console.log("Edit Account Success");
      } else {
        console.error("Error occurred:", response.status);
      }
    } catch (err) {
      console.log(err);
    }
    setEditing(false);
  };

  
  const changeProfilePicture = async (e) => {
    //... code to upload picture from computer

    //... rest call to update user's profile picture

    //if upload was a success    

    setUploadSuccess(true);
  };

  const toggleEditing = () => {
    setEditing(!editing);
  };
  return (
    <div className="container my-2">
      <div className="my-3">
        <img alt="Profile Picture" className="img-thumbnail rounded-circle d-block mx-auto" src={profile_pic} />
        <div className="mt-3 me-3 d-flex justify-content-center">
          <button disabled={editing} onClick={changeProfilePicture} className="ms-3 btn btn-dark">
            Change Profile Picture
          </button>
        </div>
      </div>

      <form onSubmit={submitEdit} className="w-75 mx-auto">
        <div class="form-group my-3">
          <label for="weight">About me</label>
          <input
            className="form-control mt-1"
            disabled={!editing}
            type="test"
            id="about_me"
            name="about_me"
            placeholder="Not Set"
            onChange={handleInputChange}
            value={formData.about_me}
          />
        </div>
        <div class="form-group my-3">
          <label for="weight">Medical conditions</label>
          <input
            className="form-control mt-1"
            disabled={!editing}
            type="test"
            id="medical_conditions"
            name="medical_conditions"
            placeholder="Not Set"
            onChange={handleInputChange}
            value={formData.medical_conditions}
          />
        </div>
        <div class="form-group my-3">
          <label for="weight">Birthday</label>
          <input
            className="form-control mt-1"
            disabled={!editing}
            type="date"
            id="birthday"
            name="birthday"
            placeholder="Not Set"
            onChange={handleInputChange}
            value={formData.birthday}
          />
        </div>
        <div class="form-group my-3">
          <label for="weight">Target weight</label>
          <input
            className="form-control mt-1"
            disabled={!editing}
            type="number"
            step="any"
            id="target_weight"
            name="target_weight"
            placeholder="Not Set"
            onChange={handleInputChange}
            value={formData.target_weight}
          />
        </div>
        <div class="form-group my-3">
          <label for="weight">Weight</label>
          <input
            className="form-control mt-1"
            disabled={!editing}
            type="number"
            step="any"
            id="weight"
            name="weight"
            placeholder="Not Set"
            onChange={handleInputChange}
            value={formData.weight}
          />
        </div>
        <div class="form-group my-3">
          <label for="Height">Height</label>
          <input
            className="form-control mt-1"
            disabled={!editing}
            type="number"
            id="height"
            name="height"
            placeholder="Not Set"
            onChange={handleInputChange}
            value={formData.height}
          />
        </div>
        <div class="form-group my-3">
          <label for="experience">Experience Level</label>
          <select
            disabled={!editing}
            className="form-select mt-1"
            id="experience_level"
            name="experience_level"
            value={formData.experience_level}
            onChange={handleInputChange}
            aria-label="Default select example"
          >
            <option selected>Select your experience level</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
        <div class="form-group my-3">
          <label for="budget">Budget Per Session</label>
          <select
            disabled={!editing}
            className="form-select mt-1"
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
            aria-label="Default select example"
          >
            <option value="" disabled>
              Select your budget
            </option>
            <option>$</option>
            <option>$$</option>
            <option>$$$</option>
          </select>
        </div>
        <div className="row my-4">
          <div className="col-8">
            <button type="submit" className="btn btn-dark me-2 w-100" disabled={!editing}>
              Save Changes
            </button>
          </div>
          <div className="col-4">
            <button type="button" onClick={toggleEditing} className={`btn ${editing ? "btn-danger" : "btn-dark"} w-100`}>
              {editing ? "Cancel" : "Edit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ClientProfile;
