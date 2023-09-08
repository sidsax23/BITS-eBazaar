import React, {useEffect,useState} from 'react'
import './cycles.css'
import Navbar from '../../Navigation_Bar/Nav_bar.jsx'
import Sidebar from '../Sidebar/sidebar.jsx'
import Header from '../../Header/header.jsx'
import {BsBicycle} from 'react-icons/bs'
import Card from '../Card/card.jsx'
import axios from 'axios'

function Cycles(props)
{
    const [cycle_items,set_cycle_items] = useState("")
    const [details,set_details] = useState({category:"Cycles",email:props.email})

    //Fetching items once, when the page loads
    useEffect(() => 
    {
        const fetchdata = async () =>
        {
            const data= await axios.post("http://localhost:8000/products/fetch_items",details)
            set_cycle_items(data)
        }
        fetchdata();

    },[])

    //Applying Filters
    async function set_filter(details)
    {
        if(!details.min_price)
            details.min_price=0
        if(!details.max_price)
            details.max_price=Number.MAX_VALUE
        if(!details.condition1&&!details.condition2&&!details.condition3&&!details.condition4&&!details.condition5)
        {
            details.condition1="New"
            details.condition2="Like-New"
            details.condition3="Moderately Used"
            details.condition4="Used"
            details.condition5="Heavily Used"
        }
        if(!details.sub_category1&&!details.sub_category2)
        {
            details.sub_category1="Geared"
            details.sub_category2="Non-Geared"
        }
        const filtered_data = await axios.post("http://localhost:8000/products/fetch_filtered_items",details)
        set_cycle_items(filtered_data)

    }

    return(
        <div>
            <body>
            <Header login_state={props}/>
            <center>
                <div className='cycles_box'>
                    <h1><BsBicycle/> <br/>CYCLES</h1>
                    <p><center>Your favourite 2-wheeled mode of transporation. Assuming you're health and environment conscious, of course.</center></p>
                    <br/>
                    <div className='sidebar_items_wrap'>
                        <div className='sidebar'>
                            <Sidebar type={"Cycles"} email={props.email} filter={set_filter} />    
                        </div>
                        <div className='items'>
                            {
                                cycle_items && cycle_items.data.map((cycle_item) => 
                                (
                                    <Card  item_id={cycle_item._id} name={cycle_item.name} image={cycle_item.image}  price={cycle_item.price}/>
                                ))
                            }   
                        </div>
                    </div>
                </div>
            </center>
            <Navbar active_state='/Cycles'/>
            </body>
        </div>
    )
}

export default Cycles