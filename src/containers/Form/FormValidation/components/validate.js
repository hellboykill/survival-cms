/* eslint-disable */
const validate = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = "Title field shouldn’t be empty";
  }
  if (!values.content) {
    errors.content = "Content field shouldn’t be empty";
  }
  if (!values.sender) {
    errors.sender = "Sender field shouldn’t be empty";
  }
  if (!values.expirydate) {
    errors.expirydate = "Expiry date field shouldn’t be empty";
  } else if (isNaN(values.expirydate)) {
    errors.appversion = "Expiry date required number";
  }
  if (!values.minversion) {
    errors.minversion = "Min Version shouldn’t be empty";
  } else if (isNaN(values.minversion)) {
    errors.minversion = "Min Version required number";
  }
  if (!values.appversion) {
    errors.appversion = "App Version shouldn’t be empty";
  } else if (isNaN(values.appversion)) {
    errors.appversion = "App version required number";
  }
  if (!values.mailId) {
    errors.mailId = "Maid Id field shouldn’t be empty";
  } else if (values.mailId.length !== 24) {
    errors.mailId = "Mail Id not valid";
  }
  if (!values.userid) {
    errors.userid = "User Id field shouldn’t be empty";
  } else if (values.userid.length !== 24) {
    errors.userid = "User Id not valid";
  }
  if (!values.email) {
    errors.email = "Email field shouldn’t be empty";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.link) {
    errors.url = "Link field shouldn’t be empty";
  } else if (
    !/^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i.test(
      values.link
    )
  ) {
    errors.link = "Invalid Link";
  }
  // if (!values.password) {
  //   errors.password = 'Password field shouldn’t be empty';
  // } else if (values.password !== 'dragon') {
  //   errors.password = 'The password is incorrect';
  // }
  if (!values.select) {
    errors.select = "Please select the option";
  }

  return errors;
};

export default validate;
