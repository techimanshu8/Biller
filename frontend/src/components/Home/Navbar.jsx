import { MenuItems } from './MenuItems';
import '../../styles/navbar.css';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
function Navbar(props) {
    const history = useHistory();
    return (
        <nav className="NavbarItems">
            <button className="back-button" onClick={()=>history.goBack()}>Back</button>
            <h1 className="navbar-logo" style={{ fontSize: "2.2rem" }}>{ props.title}</h1>
            <ul className={'nav-menu'}>
                {MenuItems.map((item, index) => {
                    return (
                        <li key={index}>
                               <Link to={{pathname:item.url,  state: {jwt: props.jwt} }}>
                            {/* href={item.url} */}
                            <span className={item.cName} style={{fontSize:"1.2rem", fontWeight:"bold"}}  >
                                {item.title}
                            </span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
           
        </nav>
    );
}

export default Navbar;