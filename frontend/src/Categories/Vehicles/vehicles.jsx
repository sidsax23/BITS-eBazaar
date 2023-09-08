import react, {useEffect,useState} from 'react'
import './vehicles.css'
import Navbar from '../../Navigation_Bar/Nav_bar.jsx'
import Sidebar from '../Sidebar/sidebar.jsx'
import Header from '../../Header/header.jsx'
import {FaCar} from 'react-icons/fa'
import Card from '../Card/card.jsx'
import axios from 'axios'

const Vehicles = (props) => 
{
    const [vehicle_items,set_vehicle_items] = useState("")
    const [details,set_details] = useState({category:"Vehicles",email:props.email})

    //Fetching items once, when the page loads
    useEffect(() => 
    {
        const fetchdata = async () =>
        {
            const data= await axios.post("http://localhost:8000/products/fetch_items",details)
            set_vehicle_items(data)
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
        if(!details.sub_category1&&!details.sub_category2&&!details.sub_category3&&!details.sub_category4)
        {
            details.sub_category1="Car"
            details.sub_category2="Bike"
            details.sub_category3="Scooty"
            details.sub_category4="Others"
        }
        const filtered_data = await axios.post("http://localhost:8000/products/fetch_filtered_items",details)
        set_vehicle_items(filtered_data)
    }

    return(
        <div>
            <body>
            <Header login_state={props}/>
            <center>
                <div className='vehicles_box'>
                    <h1><FaCar/> <br/>VEHICLES</h1>
                    <p><center>The crème de la crème of personal transportation. Health and environment are overrated (Note : Not endorsed by BITS e-Bazaar. Only its 4 developers.) </center></p>
                    <br/>
                    <div className='sidebar_items_wrap'>
                        <div className='sidebar'>
                            <Sidebar type={"Vehicles"} email={props.email} filter={set_filter}/>    
                        </div>
                        <div className='items'>
                            {
                                vehicle_items && vehicle_items.data.map((vehicle_item) => 
                                (
                                    <Card  item_id={vehicle_item._id} name={vehicle_item.name} image={vehicle_item.image}  price={vehicle_item.price}/>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </center>
            <Navbar active_state='/Vehicles'/>
            </body>
        </div>
    )
}

export default Vehicles