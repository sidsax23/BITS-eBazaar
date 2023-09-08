import React, {useEffect,useState} from 'react'
import Navbar from '../../Navigation_Bar/Nav_bar.jsx'
import Header from '../../Header/header.jsx'
import './product_page.css'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'

const Product_Page = (props) => 
{
    const location=useLocation()
    const item = location.state.item
    var path="";
    const [user,set_user] = useState("")
    const [quoted_price,set_quoted_price]=useState(0)
    const [Message,setmessage] = useState("")
    const [show,setshow] = useState(false)
    const [details,set_details] = useState(
      {
        item_id:"",
        seller_id:"",
        buyer_id:"",
        quote_price:0
      })

    //Fetching items once, when the page loads
    useEffect(() => 
    {
        
        const fetch_seller = async () =>
        {
            const result2 = await axios.post("http://localhost:8000/user/Profile",item)
            set_user(result2.data)
        }
        fetch_seller()
    },[])
    
    
    if(item.category=="Books/Notes")
    {
        path="/Books_Notes"
    }
    else
    {
        path="/"+item.category
    }
    


    //Saving user input
    const HandleChange  = e =>  /*When someone types, its an 'event', denoted and saved in 'e' here. e.target will return where and what the change was*/
    {    
        setshow(false)
        setmessage("")
        set_quoted_price(e.target.value)

    }

    //Sending Request
    const Request = () =>
    {
        setshow(true)
        details.item_id=item._id
        details.buyer_id=props.user_id
        details.seller_id=user.id      
        if(!quoted_price)
        {
            setmessage("Please quote a price for this item first.")
        }
        else if(quoted_price<0)
        {
            setmessage("Quoted price cannot be negative.")
        }
        else
        {
            details.quote_price=quoted_price
            axios.post("http://localhost:8000/shopping/request", details).then(res => {setmessage(res.data.message)})
        }
    }


    //Applying Filters
    return (
      <body>
      <Header login_state={props}/>
          <div className='product_box'>
          <center><h1>{item.name}</h1>
              <h3>Category : <Link to={path}>{item.category}</Link></h3>
              <h4>Sub-Category : {item.sub_category}</h4></center>
              <br/>
              <span>    
                  <img src={item.image} height="400" max-width="650" className='prod_image'/>
                  &emsp;&emsp;&emsp;<div className='req_btn' onClick={Request}>Request</div> 
                  <div>{show && Message!=="Request Sent Successfully" ? <p className="ErrorMsg">&emsp;&emsp;&emsp;{Message}</p> : ""}</div>
                  <div>{show && Message=="Request Sent Successfully" ? <p className="SuccessMsg">&emsp;&emsp;&emsp;{Message}</p> : ""}</div>
                  <br/>
                  <h2>&emsp;&emsp;Price : ₹ {item.price}</h2>
                  <h2>&emsp;&emsp;Quote Price : ₹ <input type="number" className='price_input' onChange={HandleChange}/></h2>
                  <h2>&emsp;&emsp;Condition : {item.condition}</h2>
                  <h2>&emsp;&emsp;Quantity : {item.quantity}</h2>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <h2>&emsp;&emsp;Description :<br/></h2>
                  <p>&emsp;&emsp;&emsp;{item.description}</p>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <h2>&emsp;&emsp;Seller Details :-</h2>
                  <p>&emsp;&emsp;&emsp;Name : {user.name}</p>
                  <p>&emsp;&emsp;&emsp;Department : {user.dept}</p>
                  <br/>
              </span>   
          </div>
      <Navbar />
      </body>

    )
}

export default Product_Page