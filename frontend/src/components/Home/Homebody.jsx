import Homecard from './Homecard';
import { Cardlist } from './Cardlist';
import '../../styles/homebody.css';

export default function Homebody(props){ 
    return (
        <div style={{ 
            position: 'relative', left: '50%', top: '50%',bottom:'20%',right:'50%',
            transform: 'translate(-50%, -50%)'
        }}>
                    {
                        Cardlist.map((item, index) => {
                            return (
                                <Homecard key = {index} jwt={props.jwt} title={item.title} idName={item.idName} cName={item.cName} url={item.url} iconClassName={item.iconClassName}/>
                            )
                        })
                    }
        </div>
    );
}
        /*<div>
            <div class="row">
                <div class="col-lg-4 col-md-12 col-md-12 features-col">
                    <i class="fas fa-check-circle"></i>
                    <h3>Billing</h3>
                </div>
                <div class="col-lg-4 col-md-12 col-md-12 features-col">
                    <i class="fas fa-bullseye"></i>
                    <h3>Elite Clientele</h3>
                </div>
                <div class="col-lg-4 col-md-12 col-md-12 features-col">
                    <i class="fas fa-heart"></i>
                    <h3>Guaranteed to work.</h3>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-4 col-md-12 col-md-12 features-col">
                <i class="fas fa-check-circle"></i>
                    <h3>Easy to use.</h3>
                </div>
                <div class="col-lg-4 col-md-12 col-md-12 features-col">
                    <i class="fas fa-bullseye"></i>
                    <h3>Elite Clientele</h3>
                </div>
                <div class="col-lg-4 col-md-12 col-md-12 features-col">
                    <i class="fas fa-heart"></i>
                    <h3>Guaranteed to work.</h3>
                </div>
            </div>
        </div>*/
        
