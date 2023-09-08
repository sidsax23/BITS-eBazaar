import React from 'react'
import './card.css'
import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Card = ({item_id,name,image,price}) => 
{
    const id = {id:item_id}
    
    const [item,set_item]=useState("")
    useEffect(() => 
    {
        const fetch_request = async () =>
        {
            const result = await axios.post("http://localhost:8000/products/fetch_item_details",id)
            set_item(result.data)
           
        }
        fetch_request();

    },[])

    return (
        <div className='container'>
            <Link to="/Product_Page" state= {{item:item}}>
                <div className='image'>
                    <img src={image} width="250"/>
                </div>
                <p><center>{name}</center></p>
                <h3>₹ {price}</h3>
            </Link>
        </div>
    )
}

export default Card