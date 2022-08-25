import Navbar from "./Navbar";
import Homebody from "./Homebody";
import Login from "../Login/Login";
import { useState } from "react";
import Register from "../Login/register";
function Home(props) {
	//     const [openr,setOpenr] = useState(true);
	//    const [openl,setOpenl] = useState(true);
	const [jwt, setJwt] = useState("");
	const token = (t) => {
		setJwt(t);
		setDisplay({ ...display, data: <div></div> });
	};
	//    const closer=()=>{setDisplay({...display,data:<div></div>})}
	//    const closel=()=>{setDisplay({...display,data:<div></div>})}
	const click = () => {
		setDisplay({
			...display,
			data: <Register open={jwt === ""} token={token} />,
		});
	};
	const [display, setDisplay] = useState({
		data: <Login fn={click} open={jwt === ""} token={token} />,
	});
	//    useEffect(() => {
	//    if(jwt!="")
	//             setDisplay({...display,data:<div></div>});
	//    },[]);

	return (
		<div>
			<Navbar title='Moodi Retail Store' jwt={jwt} />
			<Homebody jwt={jwt} />

			{/* {display.data} */}
		</div>
	);
}

export default Home;
