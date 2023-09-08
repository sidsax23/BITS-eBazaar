import React from 'react'
import { useLocation } from 'react-router'
import SearchIcon from '@mui/icons-material/Search';
import Header from '../../Header/header.jsx'
import Navbar from '../../Navigation_Bar/Nav_bar.jsx'
import Sidebar from '../Sidebar/sidebar.jsx'
import Card from '../Card/card.jsx'
import axios from 'axios'
import { useState, useEffect } from 'react';

const Search_results = (props) => 
{
    const location = useLocation()
    const [search_term,set_search_term] = useState(location.state.search_key)
    const [search_items,set_search_items] = useState("")
    const [search_change,set_search_change] = useState(0)
    const [details,set_details] = useState({category:"",email:props.email,search_key:search_term})

    const fetchdata = async () =>
    {
        details.search_key=search_term
        const data= await axios.post("http://localhost:8000/products/fetch_search_items",details) 
        set_search_items(data)
    }

    if(search_change==1)
    {
        fetchdata()
        set_search_change(0)
    }

    //Fetching items once, when the page loads
    useEffect(() => 
    {
        const fetchdata = async () =>
        {
            const data= await axios.post("http://localhost:8000/products/fetch_search_items",details) 
            set_search_items(data)
        }
        fetchdata();

    },[])

    

    async function set_filter(details)
    {
        if(!details.min_price)
            details.min_price=0
        if(!details.max_price)
            details.max_price=Number.MAX_VALUE
        details.search_key=search_term
        const filtered_data = await axios.post("http://localhost:8000/products/fetch_filtered_items_search",details)
        set_search_items(filtered_data)
    }

    return(
        <div>
            <body>
            <Header login_state={props} set_change={set_search_change} set_term={set_search_term}/>
            <center>
                <div className='cycles_box'>
                    <h1><SearchIcon/> <br/>SEARCH RESULTS</h1>
                    <p><center>Your favourite... um.. whatever you searched for.</center></p>
                    <br/>
                    <div className='sidebar_items_wrap'>
                        <div className='sidebar'>
                            <Sidebar type={"Search"} email={props.email} filter={set_filter}/>    
                        </div>
                        <div className='items'>
                            {
                                search_items && search_items.data.map((search_item) => 
                                (
                                    <Card  item_id={search_item._id} name={search_item.name} image={search_item.image}  price={search_item.price}/>
                                ))
                            }   
                        </div>
                    </div>
                </div>
            </center>
            <Navbar />
            </body>
        </div>
  )
}

export default Search_results