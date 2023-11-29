import React, { useState, useEffect } from "react";

const ModifyWorkoutPlan = () => {
  const [type, setType] = useState(null);
  const [view, setView] = useState(null);

    const queryString = window.location.search;

    return (
      <div>
        <h1>Select workout plan goes here</h1>
        <h2>The user to select a new workout plan for's user id is in URL parameters</h2>

        <p id="url_params">{queryString}</p>
      </div>
    )
}

export default ModifyWorkoutPlan;
