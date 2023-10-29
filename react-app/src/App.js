import './App.css';
import React from "react";
let url="http://localhost:3500/"
const RegisterField = () => {
  async function send_request(email, password, username, first_name, last_name, message_box_id) {
    try
    {
      const response = await fetch(url + "insert_user/", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "email": email,
          "password": password,
          "username": username,
          "first_name": first_name,
          "last_name": last_name,
        }
      });
      let data = response;
      let data_json = JSON.parse(await response.text());
      document.getElementById(message_box_id).innerHTML=data_json.message;
      if(data.status !== 200)
      {
        document.getElementById(message_box_id).setAttribute("class", "alert alert-danger message-box");
      }
      else
      {
        document.getElementById("message-box").setAttribute("class", "alert alert-success message-box")
      }
    } catch(err)
    {
      document.getElementById(message_box_id).innerHTML="The backend is down right now. Please try again later.";
      document.getElementById(message_box_id).setAttribute("class", "alert alert-danger message-box");
    }

}
  function handleSubmit(e)
  {
    e.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let username = document.getElementById("username").value;
    let first_name = document.getElementById("first_name").value;
    let last_name = document.getElementById("last_name").value;

    send_request(email, password, username, first_name, last_name, "message-box");
  }
  return (
    <div className="container mt-5">
      <div className="row">
          <div className="col-sm-4 form-background">
            <div className="mb-3 mt-3">
                <input type="text" className="form-control" id="first_name" placeholder="First name" name="first_name"/>
            </div>
            <div className="mb-3 mt-3">
                <input type="text" className="form-control" id="last_name" placeholder="Last name" name="last_name"/>
            </div>
            <div className="mb-3 mt-3">
                <input type="username" className="form-control" id="username" placeholder="Username" name="username"/>
            </div>
            <div className="mb-3 mt-3">
                <input type="text" className="form-control" id="email" placeholder="Email" name="email"/>
            </div>
            <div className="mb-3">
                <input type="text" className="form-control" id="password" placeholder="Password" name="password"/>
            </div>
            <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
          </div>
          <div className="col-sm-4 form-background">
              <div className="container mt-5">
                  <p>Please enter your email, and choose a username and password here to create an account</p>
              </div>
          </div>
      </div>
    </div>
  )
}
const RegisterPage = () =>{
  return (
    <>
      <div className="container-fluid">
      <nav className="navbar navbar-expand-sm bg-light navbar-light">
      <div className="container-fluid">
        <h1>Moxi</h1>
        <ul className="navbar-nav">
        <li className="nav-item">
            <a className="nav-link" href="/">Home</a>
        </li>
        <li className="nav-item" href="/">
            <a className="nav-link active" href="/">sample_2</a>
        </li>
        <li className="nav-item" href="/">
            <a className="nav-link disabled" href="/">Non-existent page</a>
        </li>
        </ul>
      </div>
      </nav>
        <div className="alert alert-success message-box" id="message-box"></div>
        <div className="mt-4 p-5 bg-primary text-white rounded">
          <h1>Create account</h1> 
          <p>This is the exercise and coaching app Moxi. You can create an account below.</p> 
        </div>
      </div>
      <RegisterField />
    </>
  )
}
const App = () => {
  return (
    <div className="App">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" 
integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" 
crossOrigin="anonymous"/>

      <RegisterPage/>
    </div>
  );
}

export default App;
