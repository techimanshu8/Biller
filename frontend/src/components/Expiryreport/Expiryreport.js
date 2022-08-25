import {columns} from '../Expiryreport/Table';
import DataTable from '../DataTable';
import { useState, useEffect } from "react";
import Report from "../Reports";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
const config = require("../../config/apipaths.json");
export default function Expiryreport() {
    const [data, setData] = useState([{}]);
    const [date, setDate] = useState();
    const[com,setCom]=useState("");
    const[name,setName]=useState("");
    const[wtvol,setWtvol]=useState("");
    const { currentUser } = useAuth();
    useEffect(
	 () => {
    async function fetchData() {
        await axios
            .get(config.expiry, {
                params: {
                    start:new Date(),
                    end:date
                   // ItemCode: row.itemcode,
                },
                headers: {
                    "x-auth-token": currentUser,
                },
            })
            .then((res) => {
                let i=0,temp=[];
                if(res.data!==undefined){
                for(i=0;i<res.data.length;i++)
                {
                    let t={
                        barcode:res.data[i].Barcode,
                        Expiry:res.data[i].Expiry,
                        purchase_date:res.data[i].Date,
                        quantity:res.data[i].Quantity,
                        name:"",
                        product:"",
                        wtvolume:"",
                    }
                    axios.get(config.fetchItemsbyId, {
                        params: {
                            ItemCode:res.data[i].ItemCode
                        },
                        headers: {
                            'x-auth-token':currentUser
                          }
                    })
                    .then((res) => {console.log(res);
                        if(res.data[0]!==undefined){
                    setCom(res.data[0].Company);
                    setName(res.data[0].Name);
                    setWtvol(res.data[0].Weight_Volume)}})
                    t.name=com;
                    t.product=name;
                    t.wtvolume=wtvol;
                    temp.push(t);
                }}
                
                setData(temp);
                console.log(data);
            });
        }
        fetchData();
    },
    [date,currentUser,com,name,wtvol,data]
);
    return (
        <div>        
            	<Report/> 
             <input style={{margin:"20px"}} type="date" onChange={(event)=>{
              setDate(event.target.value);}} ></input>
             <hr  className='hr-style'/>
             <DataTable title='Expiry Report' columns={columns} data={data}/>
        </div>  
    )
}
 
