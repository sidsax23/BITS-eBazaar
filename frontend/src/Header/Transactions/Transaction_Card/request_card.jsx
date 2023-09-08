import React,{useState,useEffect} from 'react'
import './transaction_card.css'
import axios from 'axios'

const Request_Card = (props) => 
{
    const [item,set_item] = useState("")
    const [user,set_user] = useState("")
    const id={id:props.param.item_id}
    useEffect(() => 
    {
        const fetch_requests = async () =>
        {
            const result= await axios.post("http://localhost:8000/products/fetch_item_details",id)
            set_item(result.data)
        }
        fetch_requests();

    },[])

    const fetchuser = async () =>
    {
        const result = await axios.post("http://localhost:8000/user/Profile",item)
        set_user(result.data)
    }
    fetchuser()

    
    return (

        <div className='request_container'>
            <span>
                <img src={item.image} height="100" max-width="200" className='prod_image'/> 
                  <p>&emsp;&emsp;Name : {item.name}</p>
                  <p>&emsp;&emsp;Price : ₹ {item.price} &emsp;&emsp;Quote Price : ₹ {props.param.quote_price} &emsp;&emsp;Condition : {item.condition}</p>
                  <div className={props.param.order_status=="Complete"? "SuccessMsg" : "ErrorMsg"}>&emsp;&emsp;Order Status : {props.param.order_status}</div>
                  <br/>
                  <p>&emsp;&emsp;Description :</p>
                  <p>&emsp;&emsp;&emsp;{item.description}</p>
                  <br/>
                  <h3>&emsp;&emsp;Seller Details :-</h3>
                  <p>&emsp;&emsp;&emsp;Name : {user.name}</p>
                  <p>&emsp;&emsp;&emsp;Email ID : {item.email}</p>
                  <p>&emsp;&emsp;&emsp;Contact Number : {user.phone_num}</p>
                  <p>&emsp;&emsp;&emsp;Department : {user.dept}</p>
                  <p>&emsp;&emsp;&emsp;UPI ID : {user.upi}</p>
                  <p>&emsp;&emsp;&emsp;Address : {user.address}</p>
            </span>
        </div>
        
    )
}

export default Request_Card