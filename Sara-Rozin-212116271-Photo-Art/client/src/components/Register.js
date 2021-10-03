import React, { useState } from 'react';
import './register.css';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { register } from '../services/userService';
import { v4 as uuid } from "uuid";
import { useHistory } from "react-router-dom";
import { validation } from './validationForm';
import "./register.css"

function Register() {
  const [userName, setUserName] = useState([])
  const [userPassword, setUerPassword] = useState([])
  const [userPasswordConfirm, setUserPasswordConfirm] = useState([])
  const history = useHistory();
  const changeHandler = (event) => {
    setUserName(event.target.value);
  };
  //init the errors in the state 
  const [errors, setErrors] = useState(
    {
      email: '',
      password: '',
      passwordConfirm: ''
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
  const updateStateUserPassword = (event) => {
    setUerPassword(event.target.value);
    handleChange(event);
  }
  //Checks if the user entered the data correctly 
  //then redirects him to the login page 
  //otherwise send him an error message
  const onFormSubmit = e => {
    setUserPasswordConfirm(e.target.value);
    if (
      userName.length > 0 &&
      userPassword === userPasswordConfirm
    ) {
      register({ id: uuid(), userEmail: userName, userPassword: userPassword })
    } else {
      errors.passwordConfirm = 'וודא שוב את הסיסמה';
      setErrors(errors)
    }
    if (!errors.passwordConfirm.length) {
      history.push("/login");
    }
  };
  return (
    <>
      <div className="login" id="register">
        <MDBContainer id="mDBContainer">
          <MDBRow>
            <MDBCol md="6">
              <form>
                <p className="h5 text-center mb-4">הרשמה</p>
                <div className="grey-text">
                  <MDBInput name="userName" onChange={updateStateUserName} getValue={value => setUserName(value)} label="הכנס מייל" icon="envelope" group type="email" validate error="wrong"
                    success="right" />
                  {/* sends a error message if the email isn't valid */}
                  {errors.email &&
                    <div className='error'>{errors.email}</div>}
                  <MDBInput name="userPassword" onChange={updateStateUserPassword} getValue={value => setUerPassword(value)} label="הכנס סיסמא" icon="lock" group type="password" validate />
                  {errors.password.length > 0 &&
                    <div className='error'>
                      {/* sends a error message if the password isn't valid */}
                      {errors.password}</div>}
                  <MDBInput name="userPasswordConfirm" getValue={value => setUserPasswordConfirm(value)} label="וודא את הסיסמא" icon="exclamation-triangle" group type="password"
                  />
                  {/* sends a error message if the user didn't confirm the password correct */}
                  {errors.passwordConfirm.length > 0 &&
                    <div className='error'>{errors.passwordConfirm}</div>}
                </div>
                <div className="text-center">
                  <MDBBtn id="registerBtn" type="submit" onClick={onFormSubmit} color="primary">הרשמה</MDBBtn>
                  {errors.passwordConfirm.length > 0 &&
                    <p className='error'>{errors.passwordConfirm}</p>
                  }
                </div>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </>
  );
}

export default Register;




