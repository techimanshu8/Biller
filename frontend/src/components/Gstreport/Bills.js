import {columns1,columns2} from './Table';
import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from '../DataTable';
import { useAuth } from "../../contexts/AuthContext";
import { Input } from '@material-ui/core';
import Report from "../Reports";
const config = require("../../config/apipaths.json");
export default function Gstreport() {
     const [selldata,setSelldata] = useState([]);
     const [purdata,setPurdata] = useState([]);
     const [date1, setDate1] = useState([]);
	 const [date2, setDate2] = useState([]);
	 const { currentUser } = useAuth();
     useEffect(() => {
		async function fetchData() {
		await axios
			.get(config.getgst, {
				params: {
                    date1:date1,
					date2:date2
				},
				headers: {
					'x-auth-token':currentUser
				  }
			})
			.then((res) => {
                setSelldata(res.data[0]);
                setPurdata(res.data[1]);
			});}
			fetchData();
	}, [date1,date2,currentUser]);
    return (
        <div className="Report">
				<Report/>
				<label style={{margin:"20px"}}>From</label>
                <Input type='date' onChange={(event)=>{
                  setDate1(event.target.value);}}></Input>
			    <label style={{margin:"20px"}}>to</label>
			    <Input type='date' onChange={(event)=>{
                  setDate2(event.target.value);}}></Input>
          <DataTable title='Sell Report' columns={columns1} data={selldata}/>
		  <DataTable title='Purchase Report' columns={columns2} data={purdata}/>
        </div>
    )
}

 
