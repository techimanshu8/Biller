import "./SellBill.css";
import Navbar from "../Home/Navbar";
import { useState, useEffect } from "react";
import { columns } from "./BillTable";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import DataTable from "../DataTable";
import BillCard from "./BillCard";
import { BillList1, BillList2 } from "./BillList";
import axios from "axios";
import Popup from "./Popup";
import BillPopup from "./BillPopup";
const config = require("../../config/apipaths.json");
export default function Bill(props) {
	const [Barcode, setBarcode] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [checked, setChecked] = useState(false);
	const [data, setData] = useState([]);
	const [mdata, setMdata] = useState([]);
	const [typeQuantity, setTypeQuantity] = useState(0.0);
	const [num, setNum] = useState(1);
	const [openPopup, setOpenPopup] = useState(false);
	const [openUnitPopup, setOpenUnitPopup] = useState(false);
	const [TotalBill, setTotalBill] = useState(0.0);
	const [TotalTax, setTotalTax] = useState(0.0);
	const [payment, setPayment] = useState(0);
	const [paymentmode, setPaymentmode] = useState("Cash");
	const [openBillPopup, setBillOpenPopup] = useState(false);
	const [tValue, setTValue] = useState({});
	const[d,setD]=useState(0);
	const { currentUser } = useAuth();
	//const [Items, setItems] = useState([]);
	const row = props.location.state.rowData;
	console.log(row);
	//const jwt = props.location.state.jwt;
	//console.log("dy");
	//console.log(row);
	function tempAlert(msg, duration) {
		var el = document.createElement("div");
		el.setAttribute(
			"style",
			"position:absolute;top:43%;left:10%;background-color:white;"
		);
		el.innerHTML = msg;
		setTimeout(function () {
			el.parentNode.removeChild(el);
		}, duration);
		document.body.appendChild(el);
	}

	const UnitsPopup = (t) => {
		setTValue(t);
		setOpenUnitPopup(true);
	};
	// const setAllData=(t)=>{
	// 	if(t.Unit=="Pieces"){
	// 		setData((data) => [...data, t]);
	// 	}else{

	// 	}
	// }

	useEffect(() => {
		//setMdata([]);

		if (props.data && props.data.length > 0) {
			setData((data) => [...data, ...props.data]);
			setTotalBill(parseFloat(props.TotalBill));
			setTotalTax(props.TotalTax);
			console.log(props.data);
			setNum(data.length);
		}
	}, [props,data]);
	useEffect(() => {
		//console.log(checked);
		if (checked === false) {
			async function fetchData2(m, t) {
				await axios
					.get(config.fetchItemsbyId, {
						params: {
							ItemCode: t.ItemCode,
						},
						headers: {
							"x-auth-token": currentUser,
						},
					})
					.then((res) => {
						//console.log(res.data);
						const r = res.data;
						console.log(r[0]);
						t.Category = r[0].Type;
						t.Company = r[0].Company;
						t.Weight_Volume = r[0].Weight_Volume;
						t.Name = r[0].Name;
						t.Unit = r[0].Unit;
						//console.log(multiple);

						if (m) {
							setMdata((mdata) => [...mdata, t]);
							//console.log(mdata);
						} else {
							if (t.Unit === "Pieces") {
								setData((data) => [...data, t]);
								setTotalBill(
									(TotalBill) => TotalBill + parseFloat(t.Selling_Price)
								);
								setTotalTax(
									(TotalTax) =>
										TotalTax +
										(parseFloat(t.Selling_Price) * parseFloat(t.gst)) / 100
								);
							} else {
								UnitsPopup(t);
							}
							setMdata([]);
						}
					})
					.catch((err) => {
						tempAlert("Product Not Found", 2000);
					});
			}
			async function fetchData() {
				if (Barcode !== "") {
					await axios
						.get(config.barcodeDetails, {
							params: {
								// UserId: "4584548524",
								Barcode: Barcode,
							},
							headers: {
								"x-auth-token": currentUser,
							},
						})
						.then((res) => {
							//console.log(res);
							const r = res.data;
							//console.log(r);
							if (res.status === 200) {
								//console.log(r);
								//console.log(r[0]);
								if (r.length === 1) {
									let t = {
										Category: "",
										Name: "",
										Company: "",
										Weight_Volume: "",
										num: "",
										Barcode: "",
										Quantity: "",
										HSN_Code: "",
										Expiry: "",
										MRP: "",
										Selling_Price: 0,
										Cost_Price:0,
										Discount: "",
										gst: 0,
										CGST: 0,
										SGST: 0,
										IGST: 0,
										ItemCode: "",
										Unit: "",
										Purchase_Date:new Date(),
									};
									//setMultiple(false);
									let found = false;
									for (let i = 0; i < data.length; i++) {
										//console.log(data[i].barcode);
										if (Barcode === data[i].Barcode) {
											found = true;
											if (data[i].Unit !== "Pieces") {
												found = false;
												setTotalBill(
													TotalBill -
														parseFloat(data[i].Selling_Price) *
															parseFloat(data[i].Quantity)
												);
												setTotalTax(
													TotalTax -
														(parseFloat(data[i].Selling_Price) *
															parseFloat(data[i].Quantity) *
															parseFloat(data[i].gst)) /
															100
												);
												data.splice(i, 1);
											} else {
												//console.log(found);
												var temp = data[i].Quantity;
												temp++;
												data[i].Quantity = temp;
												setTotalBill(
													(TotalBill) =>
														TotalBill + parseFloat(data[i].Selling_Price)
												);
												setTotalTax(
													(TotalTax) =>
														TotalTax +
														(parseFloat(data[i].Selling_Price) *
															parseFloat(data[i].gst)) /
															100
												);
											}
											break;
										}
									}
									if (!found) {
										const disc = parseFloat(
											((r[0].MRP - r[0].Selling_Price))
										).toFixed(2);
										//disc.toFixed(2);
										let exp = "N/A";
										if (r[0].Expiry) {
											exp = r[0].Expiry.substring(0, 10);
										}
										setNum(num + 1);
										let gst;
										if (r[0].IGST !== 0) {
											gst = r[0].IGST;
										} else {
											gst = r[0].CGST + r[0].SGST;
										}
										t.ItemCode = r[0].ItemCode;
										//console.log(r[0].ItemCode);
										t.num = num;
										t.Barcode = r[0].Barcode;
										t.Quantity = 1;
										t.Expiry = exp;
										t.MRP = r[0].MRP;
										t.Unit = r[0].Unit;
										t.Selling_Price = r[0].Selling_Price;
										t.Cost_Price=r[0].Cost_Price;
										//console.log(t.Selling_Price);
										t.Discount = disc;
										t.gst = gst;
										t.CGST = r[0].CGST;
										t.SGST = r[0].SGST;
										t.IGST = r[0].IGST;
										t.HSN_Code = r[0].HSN_Code;
										t.Purchase_Date=r[0].Date;
										console.log("gyfydtdyfu");
										console.log(r[0].Date);
										fetchData2(false, t);
										// category: "",
										// company: "",
										// Weight_Volume: "",

										//setTemp(t);
										//setData(temp);
										//console.log(data);
										//console.log(data);
									}
								} else {
									//setMultiple(true);
									console.log(r);
									for (let i = 0; i < r.length; i++) {
										let t = {
											Category: "",
											Name: "",
											Company: "",
											Weight_Volume: "",
											num: "",
											Barcode: "",
											Quantity: "",
											HSN_Code: "",
											Expiry: "",
											MRP: "",
											Selling_Price: 0,
											Cost_Price:0,
											Discount: "",
											gst: 0,
											CGST: 0,
											SGST: 0,
											IGST: 0,
											ItemCode: "",
											Unit: "",
											Purchase_Date:new Date(),
										};
										const disc = parseFloat(
											((r[i].MRP - r[i].Selling_Price))
										).toFixed(2);
										//disc.toFixed(2);
										let exp = "N/A";
										if (r[i].Expiry) {
											exp = r[i].Expiry.substring(0, 10);
										}
										setNum(num + 1);
										let gst;
										if (r[i].IGST !== 0) {
											gst = r[i].IGST;
										} else {
											gst = r[i].CGST + r[i].SGST;
										}
										t.ItemCode = r[i].ItemCode;
										t.num = i + 1;
										t.Barcode = r[i].Barcode;
										t.Quantity = 1;
										t.Expiry = exp;
										t.MRP = r[i].MRP;
										t.Unit = r[i].Unit;
										t.Selling_Price = r[i].Selling_Price;
										t.Cost_Price=r[i].Cost_Price;
										t.Discount = disc;
										t.gst = gst;
										t.CGST = r[i].CGST;
										t.SGST = r[i].SGST;
										t.IGST = r[i].IGST;
										t.HSN_Code = r[i].HSN_Code;
										t.Purchase_Date=r[i].Date;
										//console.log(t.Selling_Price);
										fetchData2(true, t);
										//console.log(mdata);
									}

									//console.log(temp);

									setOpenPopup(true);
									setMdata([]);
								}
							} else {
								tempAlert("Product Not Found", 2000);
							}
						})
						.catch((err) => {
							console.log(err);
							//tempAlert("Product Not Found", 2000);
						});
					// const r = resultbatch.data;
					// console.log(r);
					// ItemCode = r[0].ItemCode;

					//console.log(ItemCode);

					setBarcode("");
					//console.log(t);
				}
			}
			fetchData();
		}
	}, [Barcode, checked,TotalBill,TotalTax,currentUser,data,num]);
	//console.log(checkbox);
	//console.log(mtdata);
	const HandlePopup = (rowData) => {
		let found = false;
		for (let i = 0; i < data.length; i++) {
			//console.log(data[i].barcode);
			if (
				rowData.barcode === data[i].barcode &&
				rowData.Name === data[i].Name &&
				rowData.Weight_Volume === data[i].Weight_Volume &&
				rowData.Company === data[i].Company &&
				rowData.Selling_Price === data[i].Selling_Price
			) {
				found = true;
				//console.log(found);
				var temp = data[i].Quantity;
				console.log(TotalBill);
				temp++;
				setTotalBill(
					(TotalBill) => TotalBill + parseFloat(data[i].Selling_Price)
				);
				setTotalTax(
					(TotalTax) =>
						parseFloat(TotalTax) +
						parseFloat((data[i].Selling_Price * data[i].gst) / 100)
				);
				data[i].Quantity = temp;
				break;
			}
		}
		if (!found) {
			rowData.num = data.length + 1;
			//console.log(parseFloat(TotalBill));
			console.log(rowData.Selling_Price);

			if (rowData.Unit === "Pieces") {
				setTotalBill(
					(TotalBill) =>
						parseFloat(TotalBill) + parseFloat(rowData.Selling_Price)
				);
				setTotalTax(
					(TotalTax) =>
						parseFloat(TotalTax) +
						parseFloat((rowData.Selling_Price * rowData.gst) / 100)
				);
				setData((data) => [...data, rowData]);
			} else {
				UnitsPopup(rowData);
			}
		}
	};
	const OnChange = (event) => {
	setBarcode(event.target.value);
	};
	const OnChangePayment = (event) => {
		setPayment(event.target.value);
	};
	const OnChangePaymentMode = (mode) => {
		setPaymentmode(mode);
		//console.log(mode);
	};

	const handleCheckboxChange = (event) => {
		setChecked(event.target.checked);
	};

	const GetBill = async () => {
		let Items = [];
		console.log(data);
		//let d=0;
		data.forEach((element) => {
			//console.log(element);
         let sgst,cgst,igst,profit,sp,cp,dis=0;
		 sp=parseFloat(element.Selling_Price);
		 cp=parseFloat(element.Cost_Price);
		 profit=sp-cp;
		// console.log("Hi");
		 //console.log(element.Purchase_Date);
		 cgst=(profit *parseFloat(element.Quantity)*parseFloat(element.CGST))/100.0;
		 sgst=(profit*parseFloat(element.Quantity)*parseFloat(element.SGST))/100.0;
		 igst=(profit*parseFloat(element.Quantity)*parseFloat(element.IGST))/100.0;
		 dis+=element.Discount*element.Quantity;
			let t = {
				Company: element.Company,
				Name: element.Name,
				Weight_Volume: element.Weight_Volume,
				HSN_Code: element.HSN_Code,
				Barcode: element.Barcode,
				ItemCode: element.ItemCode,
				Quantity: element.Quantity,
				Selling_Price: element.Selling_Price,
				Purchase_Date:element.Purchase_Date,
				Unit: element.Unit,
				CGST:parseFloat(cgst),
				SGST:parseFloat(sgst),
				IGST:parseFloat(igst),
				Tax:
					(parseFloat(element.Selling_Price - element.Cost_Price) *
						parseFloat(element.gst)) /
					100,
				Net_Price:
					(parseFloat(element.Selling_Price) +
						(parseFloat(element.Selling_Price - element.Cost_Price) *
							parseFloat(element.gst)) /
							100) *
					parseFloat(element.Quantity),
			};
			setD(dis);
			//console.log(t);
			Items = [...Items, t];
		});
		if(row.Ledger===null)
		row.Ledger=0;
		const Ledger =parseFloat(row.Ledger) + parseFloat(payment) - parseFloat(TotalBill);
		//console.log(Ledger);
		//console.log(row);
		await axios
			.post(
				config.sellBilling,
				{
					Items: Items,
					Customer_Id: row.Customer_Id,
					Mode: paymentmode,
					TotalCost: TotalBill,
					TotalTax: TotalTax,
					Payment: payment,
					Ledger: Ledger,
				},
				{
					headers: {
						"x-auth-token": currentUser,
					},
				}
			)
			.then((res) => {
				if (res.status === 200) {
					//PrintBill(data,"bill",1);
					//history.psush("/");
				}
			});
		setBillOpenPopup(true);
	};

	const sleep = (time) => {
		return new Promise((resolve) => setTimeout(resolve, time));
	};

	const fetchData = async (rowData) => {
		setIsLoading(true);
		// Add a timeout to give the appearance of long load times
		await sleep(0);

		const tempData = data;
		for (let i = 0; i < tempData.length; i++) {
			if (
				tempData[i].Company === rowData.Company &&
				tempData[i].Name === rowData.Name &&
				tempData[i].Weight_Volume === rowData.Weight_Volume
			) {
				// if (tempData[i].Quantity > 1) {
					tempData[i].Quantity--;
					console.log(tempData[i]);
					setTotalBill(
						(TotalBill) => TotalBill - parseFloat(tempData[i].Selling_Price)
					);

					setTotalTax(
						(TotalTax) =>
							TotalTax -
							(parseFloat(tempData[i].Selling_Price) *
								parseFloat(tempData[i].gst)) /
								100
					);
				// } else {
				// 	setTotalBill(
				// 		(TotalBill) => TotalBill - parseFloat(tempData[i].Selling_Price)
				// 	);

				// 	setTotalTax(
				// 		(TotalTax) =>
				// 			TotalTax -
				// 			(parseFloat(tempData[i].Selling_Price) *
				// 				parseFloat(tempData[i].gst)) /
				// 				100
				// 	);
				// 	tempData.splice(i, 1);
				// }
				if(tempData[i].Quantity===0)
				tempData.splice(i, 1);
			}
		}
		setData(tempData);
		setIsLoading(false);
	};

	const fetchData1 = async (rowData) => {
		setIsLoading(true);
		// Add a timeout to give the appearance of long load times
		await sleep(0);

		const tempData = data;
		for (let i = 0; i < tempData.length; i++) {
			if (
				tempData[i].Company === rowData.Company &&
				tempData[i].Name === rowData.Name &&
				tempData[i].Weight_Volume === rowData.Weight_Volume
			) {
				setTotalBill(
					(TotalBill) =>
						TotalBill -
						parseFloat(tempData[i].Selling_Price) * tempData[i].Quantity
				);

				setTotalTax(
					(TotalTax) =>
						TotalTax -
						(parseFloat(tempData[i].Selling_Price) *
							tempData[i].Quantity *
							parseFloat(tempData[i].gst)) /
							100
				);
				tempData.splice(i, 1);
			}
		}
		setData(tempData);
		setIsLoading(false);
	};

	const OnChangeTypeQuantity = (event) => {
		setTypeQuantity(event.target.value);
	};

	const actions = [
		{
			icon: "more",
			tooltip: "Select for Billing",
			onClick: (event, rowData) => {
				if (rowData.Quantity === 1) {
					fetchData1(rowData);
				} else {
					fetchData(rowData);
				}
			},
		},
		{
			icon: "delete",
			tooltip: "Select for Billing",
			onClick: (event, rowData) => {
				fetchData1(rowData);
			},
		},
	];

	const handleUnitLabelSubmit = () => {
		const quantityVal = parseFloat(typeQuantity);
		setTotalBill(TotalBill + quantityVal * parseFloat(tValue.Selling_Price));
		setTotalTax(
			(TotalTax) =>
				parseFloat(TotalTax) +
				parseFloat(
					((tValue.Selling_Price * parseFloat(tValue.gst)) / 100) * quantityVal
				)
		);
		const tempTValue = tValue;
		tempTValue.Quantity = typeQuantity;
		setData((data) => [...data, tempTValue]);
		setOpenUnitPopup(false);
		setTValue({});
		setTypeQuantity(0.0);
	};

	const UnitLabel = () => {
		if (openUnitPopup) {
			return (
				<div>
					<label
						className='name-label-supplier'
						style={{ paddingRight: "10px" }}
					>
						Quantity Of Typed Item
					</label>
					<input
						type='text'
						value={typeQuantity}
						style={{ marginRight: "20px" }}
						onChange={OnChangeTypeQuantity}
						autoFocus
					></input>
					<button
						style={{ marginRight: "50px" }}
						onClick={handleUnitLabelSubmit}
					>
						Submit
					</button>
				</div>
			);
		} else {
			return <label />;
		}
	};

	return (
		<div className='customer'>
			<Navbar title='Sell Bill'/>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					margin: "25px 200px",
					padding: "0px 0px 25px",
				}}
			>
				{Object.keys(BillList1).map(function (keyName, keyIndex) {
					return <BillCard title={BillList1[keyName]} value={row[keyName]} />;
				})}
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					margin: "25px 0px",
					padding: "0px 0px 25px",
				}}
			>
				{Object.keys(BillList2).map(function (keyName, keyIndex) {
					return <BillCard title={BillList2[keyName]} value={row[keyName]} />;
				})}
			</div>
			<hr
				style={{
					color: "grey",
					backgroundColor: "grey",
					height: "3px",
					margin: "25px 0px 0px",
				}}
			/>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					margin: "25px 0px",
					padding: "0px 0px 25px",
				}}
			>
				<label className='name-label-supplier' style={{ paddingRight: "10px" }}>
					Barcode
				</label>
				<input
					type='text'
					value={Barcode}
					style={{ marginRight: "30px" }}
					onKeyPress={(event) =>{if(event.key==='Enter'){setChecked(false)}}}
					onChange={OnChange}
					disabled={openUnitPopup}
				></input>
				<label style={{ marginLeft: "45px", marginRight: "45px" }}>
					<input
						type='checkbox'
						checked={checked}
						onChange={handleCheckboxChange}
						style={{ marginRight: "10px" }}
					/>
					<span>Type</span>
				</label>
				{/* <input
					type='checkbox'
					defaultChecked={false}
					checked={checkbox}
					style={{ marginRight: "90px" }}
					onChange={() => {
						setCheckbox((checkbox) => !checkbox);
					}}
				></input> */}
				<label className='name-label-supplier' style={{ paddingRight: "10px" }}>
					Total
				</label>
				<input
					type='text'
					value={TotalBill}
					style={{ marginRight: "90px" }}
					disabled
				></input>
				{/* <label className='name-label-supplier' style={{ paddingRight: "10px" }}>
					Tax
				</label>
				<input
					type='text'
					value={TotalTax}
					style={{ marginRight: "90px" }}
					disabled
				></input> */}
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					margin: "25px 0px",
					padding: "0px 0px 25px",
				}}
			>
				<UnitLabel />
				<label className='name-label-supplier' style={{ paddingRight: "10px" }}>
					Payment
				</label>
				<input
					type='text'
					value={payment}
					style={{ marginRight: "90px" }}
					onChange={OnChangePayment}
				></input>
				<DropdownButton id='dropdown-basic-button' title={paymentmode}>
					<Dropdown.Item onClick={() => OnChangePaymentMode("Cash")}>
						Cash
					</Dropdown.Item>
					{/* <Dropdown.Item onClick={() => OnChangePaymentMode("Credit Card")}>
						Credit Card
					</Dropdown.Item>
					<Dropdown.Item onClick={() => OnChangePaymentMode("Debit Card")}>
						Debit Card
					</Dropdown.Item> */}
				</DropdownButton>
				{/* <label className='name-label-supplier' style={{ paddingRight: "10px" }}>
					Payment Mode
				</label>
				<input
					type='text'
					value={paymentmode}
					style={{ marginRight: "90px" }}
					onChange={OnChangePaymentMode}
				></input> */}
				<button onClick={GetBill}>Get Bill</button>
			</div>
			<hr
				style={{
					color: "grey",
					backgroundColor: "grey",
					height: "3px",
					margin: "25px 0px 0px",
				}}
			/>
			<Popup
				resdata={mdata}
				HandlePopup={HandlePopup}
				openPopup={openPopup}
				setOpenPopup={setOpenPopup}
			></Popup>
			<BillPopup
				openPopup={openBillPopup}
				setOpenPopup={setBillOpenPopup}
				itemData={data}
				custData={row}
				totalBill={TotalBill}
				discount={d}
				payment={payment}
			></BillPopup>
			<DataTable
				title='Customer Bill'
				columns={columns}
				data={data}
				actions={actions}
				isLoading={isLoading}
			/>
		</div>
	);
}
