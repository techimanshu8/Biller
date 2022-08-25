import Navbar from "../Home/Navbar";
import DataTable from '../DataTable';
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import {columns} from './TableColumns';
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
const config = require("../../config/apipaths.json");
export default function Notification(props) {
    const [data,setData]=useState([]);
    const [open,setOpen]=useState(false);
    const [limit,setLimit]=useState(5);
    const [itemcode,setItemcode]=useState("");
    const { currentUser } = useAuth();
    useEffect(() => {
        async function fetchData() {
		await axios
			.get(config.notif,{
				headers: {
				  'x-auth-token':currentUser
				}},)
			.then((res) => {
                console.log(res);
                setData(res.data);
            });}
            fetchData();
        }, [open,currentUser]);
        const actions=[
            {
                icon:"edit",
                tooltip: "Select for Limit Update",
                onClick:(event,rowData)=>{
                    console.log(rowData);
                    setItemcode(rowData._id);
                    setOpen(true);
                }
            }
        ];
        const OK=()=>{
            console.log(itemcode);
             axios
			.get(config.notiflimit,{
                params: {
                    ItemCode:itemcode,
                    limit:limit
                },
				headers: {
				  'x-auth-token':currentUser
				}},)
			.then((res) => {
                console.log(res,"Hi");
                setOpen(false);
            });
        };
    return(
        <div>
        <Navbar title='Notifications' />
        <DataTable  title='Diminishing Items' columns={columns} data={data} actions={actions}/>
        <Dialog open={open}>
				<DialogTitle>
				Change Notification Limit of Quantity
				</DialogTitle>
				<DialogContent>
					<label>New Limit</label>
					<input onChange={(event)=>{setLimit(event.target.value)}}></input>
					<button onClick={OK}>OK</button>
					<button onClick={() => {setOpen(false);}}>
						Cancel
					</button>
				</DialogContent>
			</Dialog>
        </div>
    );
}
