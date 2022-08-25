import React, { useRef } from "react";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { useReactToPrint } from "react-to-print";
import { useHistory } from "react-router-dom";
export class ComponentToPrint extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			custData: props.custData,
			itemData: props.itemData,
			total: props.totalBill,
			discount:props.discount,
			payment:props.payment
		};

		// const {
		//     itemData
		// } = this.props;
		// const custData = this.props.custData;
		// for (var i = 0; i < (this.state.itemData).length; i++){
		//     this.setState({ total: this.state.total + this.state.itemData[i].sellingPrice * this.state.itemData[i].quantity });
		// }
	}
	render() {
		console.log(this.state);
		return (
			<div style={{ fontSize: "30px", margin: "20px" }}>
				<h1
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						margin: "25px 0px",
						fontWeight:"bold"
						//padding: "0px 0px 25px",
					}}
				>
					Moodi Grocery Store</h1>
					<h2 	style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						margin: "25px 0px",
						//padding: "0px 0px 25px",
					}}>233, Diamond Harbour Road
                      Kolkata-700034</h2>
					  <h2 	style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						margin: "25px 0px",
						//padding: "0px 0px 25px",
					}}>
					  9874408700           
					  </h2>
					  <p style={{ float: "right"}}>Date:{ new Date().toLocaleDateString()}</p>
				<h3> Name: {this.state.custData.Name}</h3>
				<h3> Phone No: {this.state.custData.Phone}</h3>
				<h3> Address: {this.state.custData.Address}</h3>
				<table style={{ width: "100%" }}>
					<thead>
						<th style={{ padding: "2px", fontSize: "40px" }}>S.No</th>
						<th style={{ padding: "2px", fontSize: "40px" }}>Item</th>
						<th style={{ padding: "2px", fontSize: "40px" }}>Quantity</th>
						<th style={{ padding: "2px", fontSize: "40px" }}>MRP</th>
						<th style={{ padding: "2px", fontSize: "40px" }}>Buy</th>
						<th style={{ padding: "2px", fontSize: "40px" }}>Total</th>
						<th style={{ padding: "2px", fontSize: "40px" }}>Save</th>
					</thead>
					<tbody>
						{this.state.itemData.map((item, index) => (
							<tr>
								<td style={{ padding: "2px", fontSize: "40px" }}>{item.num}</td>
								<td style={{ padding: "2px", fontSize: "40px" }}>
									{item.Company + " " + item.Name + " " + item.Weight_Volume}
								</td>
								<td style={{ padding: "2px", fontSize: "40px" }}>
									{item.Quantity}
								</td>
								<td style={{ padding: "2px", fontSize: "40px" }}>{item.MRP}</td>
								<td style={{ padding: "2px", fontSize: "40px" }}>
									{item.Selling_Price}
								</td>
								<td style={{ padding: "2px", fontSize: "40px" }}>
									{item.Selling_Price * item.Quantity}
								</td>
								<td style={{ padding: "2px", fontSize: "40px" }}>
									{item.Quantity * (item.MRP - item.Selling_Price)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<h5 >Total: {this.state.total}</h5>
				<h5 >Saved: {this.state.discount}</h5>
				<h5 >Paid: {this.state.payment}</h5>
			</div>
		);
	}
}

function BillPopup(props) {
	const { openPopup, setOpenPopup, custData, itemData, totalBill,discount,payment } = props;
	const history = useHistory();
console.log(props);
	const componentRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	return (
		<Dialog open={openPopup}>
			<DialogTitle>
				<div></div>
			</DialogTitle>
			<DialogContent>
				<ComponentToPrint
					itemData={itemData}
					totalBill={totalBill}
					custData={custData}
					ref={componentRef}
					discount={discount}
					payment={payment}
				/>
				<button onClick={handlePrint}>Print this out!</button>
				<button
					onClick={() => {
						setOpenPopup(false);
						history.push("/sellbilling");
					}}
				>
					Close
				</button>
			</DialogContent>
		</Dialog>
	);
}

export default BillPopup;
