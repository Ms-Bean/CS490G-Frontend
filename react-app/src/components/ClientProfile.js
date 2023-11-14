import React, { useEffect, useState } from "react";
import profile_pic from "./static_images/default-avatar-profile-icon-of-social-media-user-vector.jpg";

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
    //fetch user's profile information
  }, [uploadSuccess]);

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

  const toggleEditing = () => {
    setEditing(!editing);
  };

  return (
    <div className="container my-2">
      <div className="my-2">
        <img className="img-thumbnail rounded-circle d-block mx-auto" src={profile_pic} />
      </div>

      <form onSubmit={submitEdit} className="w-75 mx-auto">
        <div class="form-group my-3">
          <label for="weight">Weight</label>
          <input
            className="form-control mt-1"
            disabled={!editing}
            type="number"
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
        <div class="form-group my-2">
          <label for="experience">Experience Level</label>
          <select
            disabled={!editing}
            className="form-select mt-1"
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            aria-label="Default select example"
          >
            <option selected>Select your experience level</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
        <div class="form-group my-2">
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
        <div className="row mt-4">
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
