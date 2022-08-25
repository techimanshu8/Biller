import "../../styles/login.css";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import axios from "axios";
const config = require("../../config/apipaths.json");
export default function Register(props) {
    const  [name,setName]=useState();
    const  [email,setEmail]=useState();
    const  [password,setPassword]=useState()
    const datacall=async()=>
    {
        console.log(name,email);
        await axios
           .post(config.register,
            {
            
                   "name":name,
                   "email":email,
                   "password":password
              
           })
           .then((res) => {
               console.log(res.data.token);
               props.token(res.data.token);
           }).catch((err)=>console.log(err));
   }
    return (
        <Dialog open={props.open}>
        <DialogTitle>Register</DialogTitle>
        <DialogContent>
                
                    <div >
                        <label >Name</label>
                        <input type="text" name="" required="" onChange={(event)=>{
              setName(event.target.value);}}/>
                        {/* <label style={{marginTop : "5px"}}>Name</label> */}
                    </div>
                    <div>
                    <label >Email</label>
                        <input type="text" name="" required="" onChange={(event)=>{
              setEmail(event.target.value);}}/>
                        {/* <label style={{marginTop : "5px"}}>Email</label> */}
                    </div>
                    <div>
                    <label >Password</label>
                        <input type="password" name="" required="" onChange={(event)=>{
              setPassword(event.target.value);}}/>
                        {/* <label style={{ marginTop: "5px" }}>Password</label> */}
                    </div>
                    {/* <input type="submit" name="" value="Submit" onChange={(event)=>{console.log(name);
              setSubmit(true);}}/> */}
              <button onClick={()=>{datacall();}}>Submit</button>
               
                </DialogContent>
			</Dialog>
             
    );
}

// import axios from 'axios';
// import {
//   REGISTER_SUCCESS,
//   REGISTER_FAIL,
//   LOGIN_SUCCESS,
//   LOGIN_FAIL,
//   LOGOUT,
//   USER_LOADED,
//   LOAD_FAIL,
//   VERIFICATION_SUCCESS,
//   VERIFICATION_FAIL,
// } from '../../utils/consts';
// import setAuthToken from '../../utils/setAuthToken';
// import { setAlert } from './alert';

// export const register = (registerData) => async (dispatch) => {
//   console.log(registerData);
//   try {
//     const res = await axios.post(
//       '/api/user/register',
//       { ...registerData },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     );
//     dispatch({
//       type: REGISTER_SUCCESS,
//       payload: res.data,
//     });
//     dispatch(loadUser());
//   } catch (err) {
//     console.log(err);
//     if (!err.response.data.errors) {
//       dispatch(setAlert('Server Not Running', 'danger'));
//     } else {
//       dispatch(setAlert(err.response.data.errors.msg, 'danger'));
//     }
//     dispatch({
//       type: REGISTER_FAIL,
//     });
//   }
// };

// export const login = ({ email, password, gameId }) => async (dispatch) => {
//   try {
//     const res = await axios.post(
//       '/api/user/login',
//       { email, password, gameId },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     );
//     dispatch({
//       type: LOGIN_SUCCESS,
//       payload: res.data,
//     });
//     dispatch(loadUser());
//   } catch (err) {
//     if (!err.response.data.errors) {
//       dispatch(setAlert('Server Not Running', 'danger'));
//     } else {
//       dispatch(setAlert(err.response.data.errors.msg, 'danger'));
//     }
//     dispatch({
//       type: LOGIN_FAIL,
//     });
//   }
// };

// export const forgot = (email) => async (dispatch) => {
//   const params = { email };
//   try {
//     await axios.post('/api/user/forgot', params, {
//       headers: {
//         'content-type': 'application/json',
//       },
//     });
//     dispatch(setAlert('Check Email to verify!', 'success'));
//   } catch (err) {
//     if (!err.response.data.errors) {
//       dispatch(setAlert('Server Not Running', 'danger'));
//     } else {
//       dispatch(setAlert(err.response.data.errors.msg, 'danger'));
//     }
//   }
// };

// export const loadUser = () => async (dispatch) => {
//   if (localStorage.token) {
//     setAuthToken(localStorage.token);
//   }
//   try {
//     const res = await axios.get('/api/user/');
//     dispatch({
//       type: USER_LOADED,
//       payload: res.data,
//     });
//   } catch (err) {
//     if (!err.response.data.errors) {
//       dispatch(setAlert('Server Not Running', 'danger'));
//     } else {
//       dispatch(setAlert(err.response.data.errors.msg, 'danger'));
//     }
//     dispatch({
//       type: LOAD_FAIL,
//     });
//   }
// };

// export const verify = (id) => async (dispatch) => {
//   try {
//     const res = await axios.get(`/api/user/confirm/${id}`);
//     dispatch({
//       type: VERIFICATION_SUCCESS,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: VERIFICATION_FAIL,
//     });
//   }
// };

// export const logout = () => (dispatch) => {
//   dispatch({ type: LOGOUT });
// };