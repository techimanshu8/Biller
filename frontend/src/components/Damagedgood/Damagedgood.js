import './Damagedgood.css';
import {columns_returnable} from './returnablegoods';
import {columns_nonreturnable} from './nonreturnablegoods';
import {useState} from 'react';
import DataTable from '../DataTable';
import Report from "../Reports";
export default   function Damagedgood() {
    const [data,setdata]=useState({
        title:'Returnable Report Table',
        columns:columns_returnable,
    });      
        return (
            <div className="Report">     
            	<Report/>      
                    <button > Enter Physical Damage</button>  
                    <button onClick={()=>setdata({...data,title:'Returnable Report Table', columns:columns_returnable,})}>Returnable</button>
                    <button onClick={()=>setdata({...data,title:'Non-Returnable Report Table',columns:columns_nonreturnable,})}>Non-Returnable</button>
                    <hr className='hr-style'/>
                    <DataTable title={data.title} columns={data.columns} />
            </div>           
        )
    }
 
