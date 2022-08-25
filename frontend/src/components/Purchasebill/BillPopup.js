import React, { useRef } from "react";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { useReactToPrint } from "react-to-print";
import "bootstrap/dist/css/bootstrap.min.css";

export class ComponentToPrint extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = { custData: props.custData, itemData: props.itemData };
		// const {
		//     itemData
		// } = this.props;
		// const custData = this.props.custData;
	}
	render() {
		return (
			<div>
				<h1>Moodi Retail Store</h1>
				<h2>Supplier Name: {this.state.custData.name}</h2>
				<table>
					<thead>
						<th>Sr. No.</th>
						<th>Item</th>
						<th>Quantity</th>
						<th>MRP</th>
					</thead>
					<tbody>
						{this.state.itemData.map((item, index) => (
							<tr>
								<td>{item.num}</td>
								<td>
									{item.Company + " " + item.Name + " " + item.Weight_Volume}
								</td>
								<td>{item.Quantity}</td>
								<td>{item.MRP}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}

function BillPopup(props) {
	const { openPopup, setOpenPopup, custData, itemData } = props;

	const componentRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	return (
		<Dialog open={openPopup}>
			<DialogTitle>
				<div>Choose Product</div>
			</DialogTitle>
			<DialogContent>
				<ComponentToPrint
					itemData={itemData}
					custData={custData}
					ref={componentRef}
				/>
				<button onClick={handlePrint}>Print this out!</button>
				<button onClick={() => setOpenPopup(false)}>Close</button>
			</DialogContent>
		</Dialog>
	);
}

export default BillPopup;
