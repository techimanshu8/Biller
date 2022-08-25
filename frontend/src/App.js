import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home.jsx";
import Supplier from "./components/Supplier/Supplier";
import Customer from "./components/Customer/Customer";
import Transaction from "./components/Customer/transactionHistary";
import Batches from "./components/GeneralReport/Batches";
import Sell from "./components/SellBill/Bill";
import Sellbill from "./components/SellBill/SellBill";
import Purchasebill from "./components/Purchasebill/Purchasebill";
import Purchase from "./components/Purchasebill/Bill";
import CustomerTransactionHistory from "./components/Customer/TransactionHistory";
import SupplierTransactionHistory from "./components/Supplier/TransactionHistory";
import Notification from "./components/Notification/Notification.js";
import Customerreturn from "./components/Customerreturn/Customerreturn.js";
import Damagedgoodsreturnbill from "./components/Damagedgoodsreturnbill/Damagedgoodsreturnbill.js";
import GeneralReport from "./components/GeneralReport/GeneralReport";
import Gstreport from "./components/Gstreport/GST";
import Bills from "./components/Gstreport/Bills"
import ExpiryReport from "./components/Expiryreport/Expiryreport";
import Damagedgood from "./components/Damagedgood/Damagedgood";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Report from "./components/Reports";
export default function App() {
	return (
		<Router>
			<div className='App'>
				<section>
					<AuthProvider>
						<Switch>
							<Route exact path='/login' component={Login} />
							<PrivateRoute exact path='/' component={Home} />
							<PrivateRoute exact path='/customer' component={Customer} />
							<PrivateRoute exact path='/supplier' component={Supplier} />
							<PrivateRoute exact path='/reports' component={Report} />
							<PrivateRoute exact path='/sellbilling' component={Sellbill} />
							<PrivateRoute exact path='/purchasebilling' component={ Purchasebill} />
							<PrivateRoute exact path='/customerreturn' component={Customerreturn} />
							<PrivateRoute exact path='/supplierreturn' component={Damagedgoodsreturnbill } />
							<PrivateRoute exact path='/batches' component={Batches} />
							<PrivateRoute exact path='/sellbill' component={Sell} />
							<PrivateRoute exact	path='/purchasebill' component={Purchase}/>
							<PrivateRoute exact	path='/ctransactionhistory'	component={CustomerTransactionHistory}/>
							<PrivateRoute exact	path='/stransactionhistory'	component={SupplierTransactionHistory}/>
							<PrivateRoute exact	path='/notification' component={Notification}/>
							<PrivateRoute exact path='/getbill' component={Transaction} />
							<PrivateRoute exact path='/generalreport' component={GeneralReport} />
							<PrivateRoute exact path='/gstreport' component={Gstreport}/>
							<PrivateRoute exact path='/bills' component={Bills} />
							<PrivateRoute exact path='/expiryreport' component={ExpiryReport} />
							<PrivateRoute exact path='/damagedgoodreport' component={Damagedgood} />
						</Switch>
					</AuthProvider>
				</section>
			</div>
		</Router>
	);
}
