import react, {useEffect,useState} from 'react'
import './furniture.css'
import Navbar from '../../Navigation_Bar/Nav_bar.jsx'
import Sidebar from '../Sidebar/sidebar.jsx'
import Header from '../../Header/header.jsx'
import {MdChair} from 'react-icons/md'
import Card from '../Card/card.jsx'
import axios from 'axios'

const Furniture = (props) => 
{
    const [furniture_items,set_furniture_items] = useState("")
    const [details,set_details] = useState({category:"Furniture",email:props.email})

    //Fetching items once, when the page loads
    useEffect(() => 
    {
        const fetchdata = async () =>
        {
            const data= await axios.post("http://localhost:8000/products/fetch_items",details)
            set_furniture_items(data)
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
        if(!details.sub_category1&&!details.sub_category2&&!details.sub_category3&&!details.sub_category4&&!details.sub_category5&&!details.sub_category6)
        {
            details.sub_category1="Tables"
            details.sub_category2="Chairs"
            details.sub_category3="Wardrobes"
            details.sub_category4="Sofas"
            details.sub_category5="Beds"
            details.sub_category6="Others"
        }
        const filtered_data = await axios.post("http://localhost:8000/products/fetch_filtered_items",details)
        set_furniture_items(filtered_data)

    }

    return(
        <div>
            <body>
            <Header login_state={props}/>
            <center>
                <div className='furniture_box'>
                    <h1><MdChair/> <br/>FURNITURE</h1>
                    <p><center>What's a property without furniture? Usually for sale.</center></p>
                    <br/>
                    <div className='sidebar_items_wrap'>
                        <div className='sidebar'>
                            <Sidebar type={"Furniture"} email={props.email} filter={set_filter}/>    
                        </div>
                        <div className='items'>
                        {   
                            furniture_items && furniture_items.data.map((furniture_item) => 
                            (
                                <Card  item_id={furniture_item._id} name={furniture_item.name} image={furniture_item.image}  price={furniture_item.price}/>
                            ))
                        }
                        </div>
                    </div>
                </div>
            </center>
            <Navbar active_state='/Furniture'/>
            </body>
        </div>
    )
}

export default Furniture