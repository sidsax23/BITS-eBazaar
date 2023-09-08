import react, {useEffect,useState} from 'react'
import './books_notes.css'
import Navbar from '../../Navigation_Bar/Nav_bar.jsx'
import Sidebar from '../Sidebar/sidebar.jsx'
import Header from '../../Header/header.jsx'
import {ImBook} from 'react-icons/im'
import Card from '../Card/card.jsx'
import axios from 'axios'

const Books = (props) => 
{
    const [book_items,set_book_items] = useState("")
    const [details,set_details] = useState({category:"Books/Notes",email:props.email})

    //Fetching items once, when the page loads
    useEffect(() => 
    {
        const fetchdata = async () =>
        {
            const data= await axios.post("http://localhost:8000/products/fetch_items",details)
            set_book_items(data)
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
            details.sub_category1="Books"
            details.sub_category2="Notes"
            details.sub_category3="Textbooks"
            details.sub_category4="Reference Books"
        }
        const filtered_data = await axios.post("http://localhost:8000/products/fetch_filtered_items",details)
        set_book_items(filtered_data)
    }

    return(
        <div>
            <body>
            <Header login_state={props}/>
            <center>
                <div className='books_notes_box'>
                    <h1><ImBook/> <br/>BOOKS AND NOTES</h1>
                    <p><center>At times, better than your best friend and at other times, worse than your nightmares. Such is the nature of books.</center></p>
                    <br/>
                    <div className='sidebar_items_wrap'>
                        <div className='sidebar'>
                            <Sidebar type={"Books/Notes"} email={props.email} filter={set_filter}/>    
                        </div>
                        <div className='items'>
                        {
                            
                            book_items && book_items.data.map((book_item) => 
                            (
                                <Card  item_id={book_item._id} name={book_item.name} image={book_item.image}  price={book_item.price}/>
                            ))
                        }
                        </div>
                    </div>
                </div>
            </center>
            <Navbar active_state='/Books_Notes'/>
            </body>
        </div>
    )
}

export default Books