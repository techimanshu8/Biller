    import './Customerreturn.css';
    import { useState, useEffect } from "react";
    import { useHistory } from "react-router-dom";
    import axios from "axios";
    import {columns} from './Table';
	import { useAuth } from "../../contexts/AuthContext";
    import DataTable from '../DataTable';
	import Billing from "../Billing";
    const config = require("../../config/apipaths.json");
    export default function Customerreturn(props){
    const history = useHistory();
	const [data, setData] = useState([{}]);
	const { currentUser } = useAuth();
	useEffect(() => {
		async function fetchData() {
			await axios
				.get(config.customerDetails,{
					headers: {
					  'x-auth-token': currentUser,
					}},)
				.then((res) => {
					setData(res.data);
				});
		}
		fetchData();
	}, [currentUser]);
	const actions = [
		{
			icon: "more",
			tooltip: "Select for customer return",
			onClick: (event, rowData) => {
				history.push("/ctransactionhistory", { rowData: rowData ,jwt:props.jwt});
			},
		},
	];
	return (
		<div className='customer'>
				<Billing/>
			<DataTable
				title='Choose Customer for Return Bill'
				columns={columns}
				actions={actions}
				data={data}
			/>
		</div>
	);
}

    //     // const details=[{field:'Name'},{field:'Phone Number'},{field:'Customer ID:'},{field:'Address:'},{field:'Email ID:'},{field:'Ledger:'}];
    //     return (
    //         // <div className="customer">
    //         //     <div class="heading">
    //         //      <h1> Bill No. :001</h1>
    //         //      </div>
    //         //     <Search title='Search by Customer Name'/>
    //         //     <div className="details" >
    //         //             {details.map((item, index) => {
    //         //                         return (
    //         //                         <Input field={item.field} key={index}/>
    //         //                         )
    //         //                     })}
    //         //     </div>
    //         //     <hr className='hr-style'/>
    //         //     <DataTable title='Customer Return Billing' columns={columns}/>
    //         //     <div className="bottom"> 
    //         //        <h1>Return payment: <input type="text"></input></h1>
    //         //        <button> Generate </button>
    //         //     </div>
    //         //  </div>
    //     )
    // }
    