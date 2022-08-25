import React, { useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verify } from '../../actions/register';
import { Loading } from '../elements/Loading';
import '../styles/main.css';

const Confirm = () => {
  const { token } = useParams();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.register.isAuthenticated);
  const verified = useSelector((state) => state.register.verified);

  useEffect(() => {
    if (token) dispatch(verify(token));
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (isAuthenticated === true || verified == null) return <Loading />;

  return <div>{verified ? <Redirect to="/login" /> : InavlidToken()}</div>;
};
const InavlidToken = () => <div>Invalid Token</div>;

export default Confirm;
