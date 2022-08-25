import Navbar from "./Home/Navbar";
import { useHistory } from "react-router-dom";
const currDate = new Date().toLocaleDateString();
const currTime = new Date().toLocaleTimeString();
export default function Billing() {
	const history = useHistory();
	return (
		<div>
			<Navbar title='Billing' />
			<div style={{ marginLeft: "10px", marginRight: "10px" }}>
				<button onClick={()=>history.push("/sellbilling",{})}>
					Sell Bill
				</button>
				<button onClick={()=>history.push("/purchasebilling",{})}>
					Purchase Bill
				</button>
				<button	onClick={() =>history.push("/customerreturn",{})}>
					Customer Return Bill
				</button>
				<button onClick={() =>history.push("/supplierreturn",{})}>
					Damaged Goods Return Bill
				</button>
				<div style={{ float: "right", marginTop: "10px", marginRight: "10px" }}>
					Date : {currDate} ,Time: {currTime}
				</div>
				<hr className='hr-style' />
			</div>
		</div>
	);
}
