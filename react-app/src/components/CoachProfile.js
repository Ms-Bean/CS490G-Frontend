import React, { useEffect, useState } from "react";
import Select from "react-select";
import { config } from "../utils/config";

const ClientProfile = () => {
  const [editing, setEditing] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [formData, setFormData] = useState({
    hourly_rate: "",
    experience_level: "",
    accepting_new_clients: "",
    coaching_history: "",
    paypal_link: "",
    goals: [],
  });

  const [goalsList, setGoalsList] = useState([]);
  const [goalsOptions, setGoalsOptions] = useState([]);

  useEffect(() => {
    //Fetch client profile information
    fetch(`${config.backendUrl}/get_user_profile`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFormData({
          hourly_rate: data.response.coach_profile_info.hourly_rate,
          availability: data.response.coach_profile_info.availability,
          experience_level: data.response.coach_profile_info.experience_level,
          accepting_new_clients: data.response.coach_profile_info.accepting_new_clients,
          coaching_history: data.response.coach_profile_info.coaching_history,
          paypal_link: data.response.coach_profile_info.paypal_link,
          goals: data.response.coach_profile_info.goals,
        });
      });
    setUploadSuccess(false);

    fetch(`${config.backendUrl}/goals`)
      .then((res) => res.json())
      .then((data) => {
        const formattedGoals = data.map((goal) => ({ label: goal.name, value: goal.goal_id }));
        setGoalsOptions(formattedGoals);
      })
      .catch((err) => console.error("Error fetching goals:", err));
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
    console.log(formData.birthday);
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
          hourly_rate: formData.hourly_rate,
          coaching_experience_level: formData.experience_level,
          accepting_new_clients: formData.accepting_new_clients,
          coaching_history: formData.coaching_history,
          availability: formData.availability,
          paypal_link: formData.paypal_link,
          goals: formData.goals,
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

  const handleGoalsChange = (selectedOptions) => {
    const selectedGoals = selectedOptions.map((option) => option.value);
    setFormData({
      ...formData,
      goals: selectedGoals,
    });
  };

  const toggleEditing = () => {
    setEditing(!editing);
  };

  return (
    <div className="container my-2">
      <form onSubmit={submitEdit} className="w-75 mx-auto">
        <div class="form-group my-3">
          <label for="weight">Hourly Rate</label>
          <input
            className="form-control mt-1"
            disabled={!editing}
            type="number"
            step="any"
            id="hourly_rate"
            name="hourly_rate"
            placeholder="Not Set"
            onChange={handleInputChange}
            value={formData.hourly_rate}
          />
        </div>
        <div class="form-group my-3">
          <label for="weight">Availability</label>
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
        <div class="form-group my-3">
          <label for="weight">Coaching History</label>
          <input
            className="form-control mt-1"
            disabled={!editing}
            type="text"
            id="coaching_history"
            name="coaching_history"
            placeholder="Not Set"
            onChange={handleInputChange}
            value={formData.coaching_history}
          />
        </div>
        <div class="form-group my-3">
          <label for="experience">Years of Experience</label>
          <input
            disabled={!editing}
            className="form-select mt-1"
            id="experience_level"
            name="experience_level"
            type="number"
            value={formData.experience_level}
            onChange={handleInputChange}
            aria-label="Default select example"
          />
        </div>
        <div class="form-group my-3">
          <label for="weight">Paypal Link</label>
          <input
            className="form-control mt-1"
            disabled={!editing}
            type="text"
            id="paypal_link"
            name="paypal_link"
            placeholder="Not Set"
            onChange={handleInputChange}
            value={formData.paypal_link}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="goals">Coaching Goals</label>
          <Select
            isMulti
            name="goals"
            options={goalsOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleGoalsChange}
            value={goalsOptions.filter((option) => formData.goals.includes(option.value))}
            isDisabled={!editing}
          />
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
