import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { setAlert } from '../../actions/alert';
import { forgot } from '../../actions/register';

const Forgot = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: '' });
  const isAuthenticated = useSelector((state) => state.register.isAuthenticated);

  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }

  const onChangeHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      dispatch(setAlert('Please Enter Email', 'danger'));
      return;
    } else {
      dispatch(forgot(formData.email));
      history.push('/login');
    }
  };

  return (
    <Form className="container" onSubmit={onSubmit}>
      <h1 className="text-center heading">Change Password!</h1>
      <Form.Group controlId="formEmail">
        <Form.Label>Enter Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="example@example.com"
          onChange={onChangeHandler}
        />
      </Form.Group>
      <Button variant="primary forgot-btn" type="submit">
        Reset Password
      </Button>
    </Form>
  );
};

export default Forgot;
