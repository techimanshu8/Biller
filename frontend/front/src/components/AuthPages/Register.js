import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { register } from '../../actions/register';
import { setAlert } from '../../actions/alert';
import formValidator from '../../utils/formValidation';
import { Loading } from '../elements/Loading';

const Regiter = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    loading: false,
  });
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.register.isAuthenticated);
  const isLoading = useSelector((state) => state.register.loading);

  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let errors = formValidator(formData, false, setFormData);
    if (errors.length > 0) {
      errors.forEach((error) => dispatch(setAlert(error, 'danger')));
      return;
    } else if (formData.password === formData.confirmPassword) {
      setFormData({ ...formData, loading: true });
      dispatch(register(formData));
    }
  };

  if (isLoading === false && formData.loading)
    setFormData({ ...formData, loading: false });

  if (isAuthenticated) {
    return <Redirect to={`/home`} />;
  }

  if (formData.loading) {
    return <Loading />;
  }

  return (
    <div className="container-fluid registeration">
      <div className="col d-flex justify-content-center">
        <Form onSubmit={onSubmit} className="form-container">
          <div className="row">
            <Form.Group controlId="formName">
              <Form.Control
                className="input-field"
                type="text"
                name="name"
                placeholder="Name"
                size="lg"
                required
                onChange={onChangeHandler}
              />
            </Form.Group>
          </div>
          <div className="row">
            <Form.Group controlId="formEmail">
              <Form.Control
                className="input-field"
                type="email"
                name="email"
                placeholder="Email Address"
                size="lg"
                required
                onChange={onChangeHandler}
              />
            </Form.Group>
          </div>
          <div className="row">
            <Form.Group controlId="formPassword">
              <Form.Control
                className="input-field"
                type="password"
                name="password"
                placeholder="Password"
                size="lg"
                required
                onChange={onChangeHandler}
              />
            </Form.Group>
          </div>
          <div className="row">
            <Form.Group controlId="formConbfirmPassword">
              <Form.Control
                className="input-field"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                size="lg"
                required
                onChange={onChangeHandler}
              />
            </Form.Group>
          </div>
          <button type="submit" className="row btn btn-outline-primary">
            Register
          </button>
          <Link to={`/login`} className="row account">
            Already Have an Account?
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Regiter;
