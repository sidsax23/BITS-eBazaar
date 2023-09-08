import React from 'react'
import Header from '../header.jsx'
import Request_Card from './Transaction_Card/request_card.jsx'
import Offer_Card from './Transaction_Card/offer_card.jsx'
import './transactions.css'
import axios from 'axios'
import { useState,useEffect } from 'react'

const Transactions = (props) => 
{

    const [request_items,set_request_items] = useState("")
    const [offer_items,set_offer_items] = useState("")
    const [transaction_change,set_transaction_change] = useState(0)
    
    useEffect(() => 
    {
        const fetch_requests = async () =>
        {
            const data= await axios.post("http://localhost:8000/shopping/fetch_requests",props)
            set_request_items(data)
        }
        fetch_requests();
        const fetch_offers = async () =>
        {
            const data= await axios.post("http://localhost:8000/shopping/fetch_offers",props)
            set_offer_items(data)
        }
        fetch_offers();

    },[])

    if(transaction_change==1)
    {
        axios.post("http://localhost:8000/shopping/fetch_offers",props).then(res=>
        {
            set_offer_items(res)
            set_transaction_change(0)
        })
    }

    const transaction_change_recorder = (change_value) =>
    {
        set_transaction_change(change_value)
    }


  return (
    <div>
        <body>
        <Header login_state={props}/>
          <div className='profile_box'>
            <center><h1>Requests</h1>
            <br/>
            <div className='requests_details'>
            {
                request_items && request_items.data.map((request_item) => 
                (
                    <Request_Card param={request_item}/>                    
                ))               
            }
            </div>
            <br/>
            <br/>
            <h1>Offers</h1>
            <br/>
            <div className='requests_details'>
            {
                offer_items && offer_items.data.map((offer_item) => 
                (
                    <Offer_Card param={offer_item} email={props.email} change_recorder={transaction_change_recorder}/>                      
                ))   
            }
            </div>
            </center>
          </div>
        </body>
    </div>
  )
}

export default Transactions   