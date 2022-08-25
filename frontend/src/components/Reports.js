import Navbar from "./Home/Navbar";
import { useHistory } from "react-router-dom";
const currDate = new Date().toLocaleDateString();
const currTime = new Date().toLocaleTimeString();
export default function Report() {
	const history = useHistory();
	return (
		<div>
			<Navbar title='Reports' />
			<div style={{ marginLeft: "10px", marginRight: "10px" }}>
				<button onClick={() =>history.push("/generalreport",{})}>
					General Report
				</button>
				<button onClick={() =>history.push("/gstreport",{})}>
					GST Report
				</button>
				<button onClick={() =>history.push("/bills",{})}>
					Bills
				</button>
				<button	onClick={() => history.push("/expiryreport",{})}>
					Expiry Report
				</button>
				<button onClick={() => history.push("/damagedgoodreport",{})} disabled>
					Damaged Goods
				</button>
				<div style={{ float: "right", marginTop: "10px", marginRight: "10px" }}>
						Date : {currDate} ,Time: {currTime}
				</div>
				<hr className='hr-style' />
			</div>
		</div>
	);
}
