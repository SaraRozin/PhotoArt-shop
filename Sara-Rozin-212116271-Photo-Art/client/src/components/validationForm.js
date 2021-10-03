//Checks if the email is correct
const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
//Checks if the email and password are correct and return array whith the errors messages
export const validation = (name, value, err) => {
  switch (name) {
    case 'userName':
      err.email =
        validEmailRegex.test(value)
          ? ''
          : '!מייל לא חוקי';
      break;
    case 'userPassword':
      err.password =
        value.length < 5
          ? 'סיסמא חייבת לכלול לפחות 5 תווים'
          : '';
      break;

    default:
      break;
  }
  return err
}




