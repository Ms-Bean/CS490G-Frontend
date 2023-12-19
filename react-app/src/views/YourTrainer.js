import React, { useEffect, useState } from "react";
import profile_pic from "../components/static_images/default-avatar-profile-icon-of-social-media-user-vector.jpg";
import { config
 } from "../utils/config";
import { Button } from "react-bootstrap";
const ClientProfile = () => {
  const [editing, setEditing] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [formData, setFormData] = useState({
    hourly_rate: "",
    experience_level: "",
    accepting_new_clients: "",
    coaching_history: "",
    paypal_link: ""
  });

  useEffect(() => {

    fetch(`${config.backendUrl}/get_coach`, {
        credentials: "include",
      })
        .then((get_coach_res) => get_coach_res.json())
        .then((coach_info) => {
            if(coach_info.length > 0)
            {
                //Fetch client profile information
                fetch(`${config.backendUrl}/get_user_profile`, {
                    credentials: "include",
                    headers: {
                        "user_id": coach_info[0].id
                    }
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
                        paypal_link: data.response.coach_profile_info.paypal_link
                    });
                    document.getElementById("pfp").src = data.response.client_profile_info.pfp_link
                    document.getElementById("trainer_name").innerHTML = "Trainer: " + coach_info[0].name;
                }); 
            }
            else
            {
                document.getElementById("wrapper").innerHTML = "<h1>You have no trainer. Go hire one before coming to this page.</h1>"
            }
            setUploadSuccess(false);
        });
  }, [uploadSuccess, editing]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    console.log(formData);
  };

  const fireCoach = () => {
    if(window.confirm("Fire your coach? (You will have to request to rehire your coach if you do this)"))
    {
        console.log("Fired");
        fetch(`${config.backendUrl}/get_coach`, {
            credentials: "include"
          })
            .then((get_coach_res) => get_coach_res.json())
            .then((coach_info) => {
                console.log(coach_info);
                let url = `${config.backendUrl}/terminate/` + coach_info[0].id;
                console.log(url);
                fetch(url, {
                    credentials: "include",
                    method: "DELETE"
                }).then((res) =>{
                    document.location.href = '/dashboard'
                })
            });
    }
  }

  const toggleEditing = () => {
    setEditing(!editing);
  };
  return (
    <div id = "wrapper" className="container my-2 col-md-5 justify-content-center">
      <h1 id="trainer_name" className="text-center"></h1>
      <div className="my-3">
        <img id="pfp" height="200" width="200" className="img-thumbnail rounded-circle d-block mx-auto" src={profile_pic} />
        <div className="mt-3 me-3 d-flex justify-content-center">
        </div>
      </div>

      <form className="w-75 mx-auto">
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
          <label for="experience">Years of experience</label>
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
          <label for="weight">Paypal link</label>
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
        <div className="row my-4 justify-content-center">
          <div className="col-8 text-center">
            <Button
            variant="danger"
                onClick={fireCoach}
                className="w-75"
            >Fire coach</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ClientProfile;