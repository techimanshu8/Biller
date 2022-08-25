import {columns1,columns2} from '../Gstreport/GstTable';
import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from '../DataTable';
import { useAuth } from "../../contexts/AuthContext";
import { Input } from '@material-ui/core';
import Report from "../Reports";
const config = require("../../config/apipaths.json");
export default function Gstreport() {
     const [data1, setData1] = useState([]);
     const [data2, setData2] = useState([]);
     const [date1, setDate1] = useState();
	 const [date2, setDate2] = useState();
	 const { currentUser } = useAuth();
     useEffect(() => {
         const fetchData=async()=>{
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
                console.log(res);
                if(date1!==undefined&&date2!==undefined){
                console.log(res.data[0]);
                let i=0,j=0,temp=[];
                if(res.data[0]!==undefined)
                for(i=0;i<res.data[0].length;i++)
                for(j=0;j<res.data[0][i].Items.length;j++)
                {
                    let r=res.data[0][i].Items;
                    console.log(r);
                    let t={
                        Name:r[j].Name,
                        Company:r[j].Company,
                        WtVol:r[j].Weight_Volume,
                        Quantity:r[j].Quantity,
                        Date:res.data[0][i].Date,
                        Bill_Id:res.data[0][i].Bill_Id,
                        Barcode:r[j].Barcode,
                        HSN_Code:r[j].HSN_Code,
                        CGST:r[j].CGST,
                        SGST:r[j].SGST,
                        IGST:r[j].IGST
                    }
                    temp.push(t);
                }
                setData1(temp);
                temp=[];
                //console.log(data1);
                if(res.data[1]!==undefined)
                for(i=0;i<res.data[1].length;i++)
                for(j=0;j<res.data[1][i].Items.length;j++)
                {
                    let r=res.data[1][i].Items;
                    console.log(r);
                    let t={
                        Name:r[j].Name,
                        Company:r[j].Company,
                        WtVol:r[j].Weight_Volume,
                        Quantity:r[j].Quantity,
                        Date:res.data[1][i].Date,
                        Bill_Id:res.data[1][i].Bill_Id,
                        Barcode:r[j].Barcode,
                        HSN_Code:r[j].HSN_Code,
                       CGST:r[j].CGST,
                       SGST:r[j].SGST,
                       IGST:r[j].IGST
                    }
                    temp.push(t);
                }
                setData2(temp);
            }
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
          <DataTable title='Sell Report' columns={columns1} data={data1}/>
		  <DataTable title='Purchase Report' columns={columns2} data={data2}/>
        </div>
    )
}
