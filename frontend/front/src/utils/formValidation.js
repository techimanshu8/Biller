const validEmailRegex = RegExp(
  `^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+.)?[a-zA-Z]+.)?(simplem).in$`
);

const formValidator = ({ email, password, confirmPassword }, isAdmin, setState) => {
  let errors = [];
  if (!validEmailRegex.test(email) && isAdmin) {
    setState((prevFormData) => ({
      ...prevFormData,
      errors: {
        ...prevFormData.errors,
        email: 'Please enter valid official email ID!',
      },
    }));
    errors.push('Please enter valid official email ID!');
  } else {
    setState((prevFormData) => ({
      ...prevFormData,
      errors: {
        ...prevFormData.errors,
        email: '',
      },
    }));
  }

  if (password !== confirmPassword) {
    setState((prevFormData) => ({
      ...prevFormData,
      errors: {
        ...prevFormData.errors,
        password: 'Password do not match!',
      },
    }));
    errors.push('Password do not match!');
  }

  return errors;
};

export default formValidator;
