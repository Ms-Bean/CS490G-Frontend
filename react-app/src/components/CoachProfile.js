import React, { useEffect, useState } from "react";
import profile_pic from "./static_images/default-avatar-profile-icon-of-social-media-user-vector.jpg";

const ClientProfile = () => {
  const [editing, setEditing] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [formData, setFormData] = useState({
    experience: "",
    cost_per_session: "",
    availability: "",
  });

  useEffect(() => {
    //fetch user's profile information
  }, [uploadSuccess, editing]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let parsedValue = value;
    if (name === "cost_per_session") {
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
          <label for="experience">Experience</label>
          <input
            className="form-control mt-1"
            disabled={!editing}
            type="text"
            id="experience"
            name="experience"
            placeholder="Not Set"
            onChange={handleInputChange}
            value={formData.experience}
          />
        </div>
        <div class="form-group my-3">
          <label for="cost_per_session">Cost Per Session</label>
          <input
            className="form-control mt-1"
            disabled={!editing}
            type="number"
            id="cost_per_session"
            name="cost_per_session"
            placeholder="Not Set"
            onChange={handleInputChange}
            value={formData.cost_per_session}
          />
        </div>
        <div class="form-group my-3">
          <label for="availability">Availability</label>
          <input
            className="form-control mt-1"
            disabled={!editing}
            type="text"
            id="availability"
            name="availability"
            placeholder="Not Set"
            onChange={handleInputChange}
            value={formData.availability}
          />
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
        </div>{" "}
      </form>
    </div>
  );
};

export default ClientProfile;
