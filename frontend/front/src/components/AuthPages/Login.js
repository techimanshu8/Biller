import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { login } from '../../actions/register';
import { Loading } from '../elements/Loading';

const Login = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    loading: false,
  });
  const isAuthenticated = useSelector((state) => state.register.isAuthenticated);
  const loading = useSelector((state) => state.register.loading);
  const dispatch = useDispatch();
  const onChangeHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    setFormData({ ...formData, loading: true });
    dispatch(login(formData));
  };

  if (loading && formData.loading) {
    return <Loading />;
  }

  if (isAuthenticated) {
    return <Redirect to={`/home`} />;
  }

  return (
    <div className="container-fluid login">
      <div className="col d-flex justify-content-center">
        <Form className="form-container" onSubmit={onSubmit}>
          <Form.Group controlId="formEmail">
            <Form.Control
              className="row input-field"
              type="email"
              name="email"
              placeholder="Your Email Address"
              size="lg"
              required
              onChange={onChangeHandler}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Control
              className="row input-field"
              type="password"
              name="password"
              placeholder="Your Password"
              size="lg"
              required
              onChange={onChangeHandler}
            />
          </Form.Group>
          <button type="submit" className="row btn btn-outline-primary">
            SIGN IN
          </button>
          <Link to={`/register`} className="row account">
            New to the Page?
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Login;
