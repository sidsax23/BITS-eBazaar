import React,{useState,useEffect} from 'react'
import './transaction_card.css'
import {Link} from 'react-router-dom'
import axios from 'axios'

const Offer_Card = (props) => 
{
    const [item,set_item] = useState("")
    const [user,set_user] = useState("")
    const [update,set_update]=useState(false)
    const id={id:props.param.item_id}
    useEffect(() => 
    {
        const fetch_request = async () =>
        {
            const result= await axios.post("http://localhost:8000/products/fetch_item_details",id)
            set_item(result.data)
            const result2 = await axios.post("http://localhost:8000/user/fetch_buyer_details",props.param)
            set_user(result2.data)

        }
        fetch_request();

    },[])

    if(update==false)
    {
        axios.post("http://localhost:8000/products/fetch_item_details",id).then(res =>
            {
                set_item(res.data)
                set_update(true)
                props.change_recorder(1)              
            })
    }

    const complete_transaction = () =>
    {    
        axios.post("http://localhost:8000/shopping/complete_transaction",props.param)
        set_update(false)    
    }

    const decline_transaction = () =>
    {    
        axios.post("http://localhost:8000/shopping/decline_transaction",props.param)
        set_update(false)    
    }
    
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
                  <h3>&emsp;&emsp;Inquirer Details :-</h3>
                  <p>&emsp;&emsp;&emsp;Name : {user.name}</p>
                  <p>&emsp;&emsp;&emsp;Email ID : {user.email}</p>
                  <p>&emsp;&emsp;&emsp;Contact Number : {user.phone_num}</p>
                  <p>&emsp;&emsp;&emsp;Department : {user.dept}</p>
                  <p>&emsp;&emsp;&emsp;UPI ID : {user.upi}</p>
                  <p>&emsp;&emsp;&emsp;Address : {user.address}</p>
                  <br/>
            </span>
            <center><div className={props.param.order_status!="Incomplete"||item.quantity==0 ? 'ncbtn' : 'btn'} onClick={props.param.order_status!="Incomplete"||item.quantity==0 ? null : complete_transaction}>Complete Transaction</div> &emsp;
            <div className={props.param.order_status!="Incomplete"||item.quantity==0 ? 'ncbtn' : 'btn'} onClick={props.param.order_status!="Incomplete"||item.quantity==0 ? null : decline_transaction}>Decline</div></center>

        </div>
        
    )
}

export default Offer_Card