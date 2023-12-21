import React, { useState, useEffect } from "react";
import profile_pic from "./static_images/default-avatar-profile-icon-of-social-media-user-vector.jpg";
import { useEditAccount } from "../hooks/useEditAccount";
import { State } from "country-state-city";
import { config } from "./../utils/config";

const EditAccountForm = () => {
  const states = State.getStatesOfCountry("US");
  const [editing, setEditing] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const { editaccount } = useEditAccount();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    phone_number: "",
  });

  useEffect(() => {
    //Fetch user's information
    fetch(`${config.backendUrl}/get_user_account_info`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          first_name: data.response.first_name,
          last_name: data.response.last_name,
          username: data.response.username,
          email: data.response.email,
          street_address: data.response.street_address,
          city: data.response.city,
          state: data.response.state,
          zip_code: data.response.zip_code,
          phone_number: data.response.phone_number,
        });
      });
    setUploadSuccess(false);
  }, [uploadSuccess, editing]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    console.log(formData);
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    await editaccount(formData);
    setEditing(false);
  };

  const toggleEditing = () => {
    setEditing(!editing);
  };

  return (
    <div className="container">


      <form onSubmit={submitEdit} className="mx-auto">
        <div class="form-group my-3">
          <label  for="username">
            Username
          </label>
          <input
            className="form-control mt-1"
            disabled={!editing}
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            onChange={handleInputChange}
            value={formData.username}
          />
        </div>
        <div class="form-group my-3">
          <label  for="first_name">
            First Name
          </label>
          <input
            className="form-control mt-1"
            disabled={!editing}
            type="text"
            id="first_name"
            name="first_name"
            placeholder="First Name"
            onChange={handleInputChange}
            value={formData.first_name}
          />
        </div>
        <div class="form-group my-3">
          <label  for="last_name">
            Last Name
          </label>
          <input
            className="form-control mt-1"
            disabled={!editing}
            type="text"
            id="last_name"
            name="last_name"
            placeholder="Last Name"
            onChange={handleInputChange}
            value={formData.last_name}
          />
        </div>
        <div class="form-group my-3">
          <label  for="email">
            Email
          </label>
          <input
            className="form-control mt-1"
            disabled={!editing}
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            onChange={handleInputChange}
            value={formData.email}
          />
        </div>
        <div class="form-group my-3">
          <label  for="phone_number">
            Phone Number
          </label>
          <input
            className="form-control mt-1"
            disabled={!editing}
            type="text"
            id="phone_number"
            name="phone_number"
            placeholder=""
            onChange={handleInputChange}
            value={formData.phone_number}
          />
        </div>
        <div class="form-group my-3">
          <label  for="street_address">
            Street Address
          </label>
          <input
            className="form-control mt-1"
            disabled={!editing}
            type="text"
            id="street_address"
            name="street_address"
            placeholder=""
            onChange={handleInputChange}
            value={formData.street_address}
          />
        </div>
        <div class="form-group my-3">
          <label  for="city">
            City
          </label>
          <input
            className="form-control mt-1"
            disabled={!editing}
            type="text"
            id="city"
            name="city"
            placeholder=""
            onChange={handleInputChange}
            value={formData.city}
          />
        </div>
        <div className="form-group my-3">
          <label  htmlFor="state">
            State
          </label>
          <select
            className="form-control mt-1"
            disabled={!editing}
            id="state"
            name="state"
            onChange={handleInputChange}
            value={formData.state}
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        <div class="form-group my-3">
          <label  for="street_address">
            ZIP Code
          </label>
          <input
            className="form-control mt-1"
            disabled={!editing}
            type="text"
            id="zip_code"
            name="zip_code"
            placeholder=""
            onChange={handleInputChange}
            value={formData.zip_code}
          />
        </div>
        <div className="row mt-4">
          <div className="col-9">
            <button type="submit" className="btn btn-dark me-2 w-100" disabled={!editing}>
              Save Changes
            </button>
          </div>
          <div className="col-3">
            <button type="button" onClick={toggleEditing} className={`btn ${editing ? "btn-danger" : "btn-dark"} w-100`}>
              {editing ? "Cancel" : "Edit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditAccountForm;
