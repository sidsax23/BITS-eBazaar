import react, {useEffect,useState} from 'react'
import './electronics.css'
import Navbar from '../../Navigation_Bar/Nav_bar.jsx'
import Sidebar from '../Sidebar/sidebar.jsx'
import Header from '../../Header/header.jsx'
import {MdOutlineComputer} from 'react-icons/md'
import Card from '../Card/card.jsx'
import axios from 'axios'

const Electronics = (props) => 
{
    const [electronics_items,set_electronics_items] = useState("")
    const [details,set_details] = useState({category:"Electronics",email:props.email})

    //Fetching items once, when the page loads
    useEffect(() => 
    {
        const fetchdata = async () =>
        {
            const data= await axios.post("http://localhost:8000/products/fetch_items",details)
            set_electronics_items(data)
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
        if(!details.sub_category1&&!details.sub_category2&&!details.sub_category3&&!details.sub_category4&&!details.sub_category5&&!details.sub_category6&&!details.sub_category7)
        {
            details.sub_category1="Laptops"
            details.sub_category2="Smartphones"
            details.sub_category3="Accessories"
            details.sub_category4="Televisions"
            details.sub_category5="Cameras"
            details.sub_category6="Refrigerators"
            details.sub_category7="Others"
        }
        const filtered_data = await axios.post("http://localhost:8000/products/fetch_filtered_items",details)
        set_electronics_items(filtered_data)

    }


    return(
        <div>
            <body>
            <Header login_state={props}/>
            <center>
                <div className='electronics_box'>
                    <h1><MdOutlineComputer/> <br/>ELECTRONICS</h1>
                    <p><center>Also popularly known as "your life".</center></p>
                    <br/>
                    <div className='sidebar_items_wrap'>
                        <div className='sidebar'>
                            <Sidebar type={"Electronics"} email={props.email} filter={set_filter}/>    
                        </div>
                        <div className='items'>
                            {
                            
                                electronics_items && electronics_items.data.map((electronics_item) => 
                                (
                                    <Card  item_id={electronics_item._id} name={electronics_item.name} image={electronics_item.image}  price={electronics_item.price}/>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </center>
            <Navbar active_state='/Electronics'/>
            </body>
        </div>
    )
}

export default Electronics