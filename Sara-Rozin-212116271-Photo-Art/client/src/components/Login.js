import React, { useState, useEffect } from 'react';
import './register.css';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { register, getUser } from '../services/userService';
import { v4 as uuid } from "uuid";
import { useHistory } from "react-router-dom";
import { validation } from './validationForm';
import './login.css';

function Login(props) {
  const [userName, setUserName] = useState([])
  const [userPassword, setUerPassword] = useState([]);
  const [flag, setFlag] = useState(false);
  const history = useHistory();
  //init the errors in the state 
  const [errors, setErrors] = useState(
    {
      email: '',
      password: '',
    }
  );
  //save the type of the errors in the array 
  const handleChange = (event) => {
    const { name, value } = event.target;
    let err = errors;
    setErrors(validation(name, value, err));
  }
  //update the tate of the email
  const updateStateUserName = (event) => {
    setUserName(event.target.value);
    handleChange(event);
  }
  //update the tate of the password
  const updateStateUerPassword = (event) => {

    setUerPassword(event.target.value);
    handleChange(event);
  }
  //clear locallStorage if the user type on exit
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      localStorage.clear();
      props.updateCart()
    }
  }, [localStorage.getItem("userId")]);
  // Checks if the user exists in a database,
  // then redirects him to images page
  // otherwise redirects him to the registration page
  const onFormSubmit = e => {
    e.preventDefault();
    getUser(userName).then(res => {
      // console.log(res._id, res.id)
      if (res) {
        localStorage.setItem("userId", JSON.stringify(res._id));
        history.push("/pictures");
        props.setReload();
      } else {
        history.push("/register");
      }
    }).catch(err => console.log(err))
  };
  return (
    <>
      <div className="login">
        <MDBContainer id="mDBContainer">
          <MDBRow>
            <MDBCol md="6">
              <form className="form">
                <p className="h5 text-center mb-4">התחברות</p>
                <div className="grey-text">
                  <MDBInput name="userName" onChange={updateStateUserName} label="הכנס מייל" icon="envelope" group type="email"
                  />
                  {/* sends a error message if the email isn't valid */}
                  {errors.email &&
                    <div className='error'>{errors.email}</div>}

                  <MDBInput name="userPassword" onChange={updateStateUerPassword} getValue={value => setUerPassword(value)} label="הכנס סיסמא" icon="lock" group type="password" />
                   {/* sends a error message if the password isn't valid */}
                  {errors.password.length > 0 &&
                    <div className='error'>{errors.password}</div>}
                </div>
                <div className="text-center">
                  <MDBBtn onClick={onFormSubmit} id="loginBbtn" >התחבר</MDBBtn>
                  {/* if the user isn't exit in database redirects him to the registration page */}
                </div><p id="notRegister">?אינך רשום במערכת </p>
                <MDBBtn id="regisrterBtn" onClick={() => { history.push("/register") }}>לחץ כאן</MDBBtn>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </>
  );
}

export default Login;




