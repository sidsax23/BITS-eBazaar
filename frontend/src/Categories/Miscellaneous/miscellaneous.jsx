import react, {useEffect,useState} from 'react'
import './miscellaneous.css'
import Navbar from '../../Navigation_Bar/Nav_bar.jsx'
import Sidebar from '../Sidebar/sidebar.jsx'
import Header from '../../Header/header.jsx'
import {VscSymbolMisc} from 'react-icons/vsc'
import Card from '../Card/card.jsx'
import axios from 'axios'

const Miscellaneous = (props) => 
{
    const [misc_items,set_misc_items] = useState("")
    const [details,set_details] = useState({category:"Miscellaneous",email:props.email})

    //Fetching items once, when the page loads
    useEffect(() => 
    {
        const fetchdata = async () =>
        {
            const data= await axios.post("http://localhost:8000/products/fetch_items",details)
            set_misc_items(data)
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
            details.sub_category1="Stationery"
            details.sub_category2="Utensils"
            details.sub_category3="Clothes"
            details.sub_category4="Others"
        }
        const filtered_data = await axios.post("http://localhost:8000/products/fetch_filtered_items",details)
        set_misc_items(filtered_data)
    }

    return(
        <div>
            <body>
            <Header login_state={props}/>
            <center>
                <div className='misc_items_box'>
                    <h1><VscSymbolMisc/> <br/>MISCELLANEOUS ITEMS</h1>
                    <p><center>Just your usual run-of-the-mill unique stuff.</center></p>
                    <br/>
                    <div className='sidebar_items_wrap'>
                        <div className='sidebar'>
                            <Sidebar type={"Miscellaneous"} email={props.email} filter={set_filter}/>    
                        </div>
                        <div className='items'>
                        {
                            
                            misc_items && misc_items.data.map((misc_item) => 
                            (
                                <Card  item_id={misc_item._id} name={misc_item.name} image={misc_item.image}  price={misc_item.price}/>
                            ))
                        }
                        </div>
                    </div>
                </div>
            </center>
            <Navbar active_state='/Misc'/>
            </body>
        </div>
    )
}

export default Miscellaneous