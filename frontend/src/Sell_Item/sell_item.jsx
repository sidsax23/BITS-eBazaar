import React from 'react'
import './sell_item.css'
import Header from '../Header/header.jsx'
import { useState } from 'react'
import axios from 'axios'


function Sell_items(props) 
{
    
    const [Message,setmessage] = useState("")
    const [show,setshow] = useState(false)

    const [item,SetItem] = useState({
      name:"",
      email:"",
      category:"Cycles",
      sub_category:"",
      image:"",
      price:0,
      condition:"New",
      description:"",
      quantity:1,
  })


    const HandleChange  = e =>  /*When someone types, its an 'event', denoted and saved in 'e' here. e.target will return where and what the change was*/
    {    

        setshow(false)
        setmessage("")
        const {name,value} = e.target
        SetItem({
            ...item, /* Stores the value entered by the user in the respective state variable while the rest remain as their default values ("" in this case)*/
            [name]:value /* Depending on the name of the inputbar, its value is stored in the respective state variable*/
        })
    }
    
    function cycle_categories()
    {
        return(
          <div> 
          <select name="sub_category" className='details_input' onChange={HandleChange} value={item.sub_category}>
          <option></option>
          <option value="Geared">Geared</option>
          <option value="Non-Geared">Non-Geared</option>
          </select>
          </div>
        )
    }
    function vehicle_categories()
    {
        return(
          <div>
          <select name="sub_category" className='details_input' onChange={HandleChange} value={item.sub_category}>
          <option></option>
          <option value="Car">Car</option>
          <option value="Bike">Bike</option>
          <option value="Scooty">Scooty</option>
          <option value="Others">Others</option>
          </select>
          </div>
        )
    }
    function book_categories()
    {
        return(
          <div>
          <select name="sub_category" className='details_input' onChange={HandleChange} value={item.sub_category}>
          <option></option>
          <option value="Books">Books</option>
          <option value="Notes">Notes</option>
          <option value="Textbooks">Textbooks</option>
          <option value="Reference Books">Reference Books</option>
          </select>
          </div>
        )
    }
    function electronics_categories()
    {
        return(
          <div>
          <select name="sub_category" className='details_input' onChange={HandleChange} value={item.sub_category}>
          <option></option>
          <option value="Laptops">Laptops</option>
          <option value="Smartphones">Smartphones</option>
          <option value="Accessories">Accessories</option>
          <option value="Televisions">Televisions</option>
          <option value="Cameras">Cameras</option>
          <option value="Refrigerators">Refrigerators</option>
          <option value="Others">Others</option>
          </select>
          </div>
        )
    }
    function furniture_categories()
    {
        return(
          <div>
          <select name="sub_category" className='details_input' onChange={HandleChange} value={item.sub_category}>
          <option></option>
          <option value="Tables">Tables</option>
          <option value="Chairs">Chairs</option>
          <option value="Wardrobes">Wardrobes</option>
          <option value="Sofas">Sofas</option>
          <option value="Beds">Beds</option>
          <option value="Others">Others</option>
          </select>
          </div>
        )
    }
    function misc_categories()
    {
        return(
          <div>
          <select name="sub_category" className='details_input' onChange={HandleChange} value={item.sub_category}>
          <option></option>
          <option value="Stationery">Stationery</option>
          <option value="Utensils">Utensils</option>
          <option value="Clothes">Clothes</option>
          <option value="Others">Others</option>
          </select>
          </div>
        )
    }

    const Save_Changes = () =>
    {
        setshow(true)
        item.email=props.email
        if(item.image=="")
        {
          item.image="https://t3.ftcdn.net/jpg/03/34/83/22/360_F_334832255_IMxvzYRygjd20VlSaIAFZrQWjozQH6BQ.jpg"
        } 
        if(!item.name)
        {
            setmessage("Please enter item name")
        } 
        else if(!item.price)
        {
            setmessage("Please enter item price")
        }
        if(!item.name)
        {
            setmessage("Please enter item name")
        } 
        if(!item.sub_category)
        {
            setmessage("Please select a sub-category for your item")
        } 
        else
        {
          axios.post("http://localhost:8000/products/Sell_Item", item)
           .then(res => {setmessage(res.data.message)})
        }
        
    }

    return(
        <div>
            <body>
            <Header login_state={props}/>
              <div className='item_box'>
                <center><h1>Sell Item</h1>
                <br/>
                <div className='details'>
                  <h3>Item Name &emsp;: <br/><input type="text" name="name" placeholder="Enter Item Name" className='details_input' onChange={HandleChange} value={item.name}/></h3>
                  <br/>
                  <h3>Item Category &emsp;: <br/>
                            <select name="category" onChange={HandleChange} className='details_input' value={item.category}> 
                                <option value="Cycles" >Cycles</option>
                                <option value="Vehicles">Vehicles</option>
                                <option value="Books/Notes">Books/Notes</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Furniture">Furniture</option>
                                <option value="Miscellaneous">Miscellaneous</option>
                            </select>
                  </h3>
                  <br/>
                  <h3>Item Sub-Category &emsp;: &emsp; 
                                                {
                                                 item.category=="Cycles" ? cycle_categories() : 
                                                 item.category=="Vehicles" ? vehicle_categories() : 
                                                 item.category=="Books/Notes" ? book_categories() : 
                                                 item.category=="Electronics" ? electronics_categories() :
                                                 item.category=="Furniture" ? furniture_categories() :
                                                 item.category=="Miscellaneous" ? misc_categories() : cycle_categories()   
                                                }
                  </h3>
                  <br/>
                  <h3>Item Condition &emsp;: <br/>
                            <select name="condition" onChange={HandleChange} className='details_input' value={item.condition}> 
                                <option value="New" >New</option>
                                <option value="Like-New">Like-New</option>
                                <option value="Moderately Used">Moderately Used</option>
                                <option value="Used">Used</option>
                                <option value="Heavily Used">Heavily Used</option>
                            </select>
                  </h3>
                  <br/>
                  <h3>Item Price (in INR) &emsp;: <br/> <input name="price" type="number" placeholder="Enter Item Price" className='details_input' onChange={HandleChange} value={item.price}/></h3>
                  <br/>
                  <h3>Item Description &emsp;: <br/><textarea cols="20" rows="6" name="description" type="text" placeholder="Enter Item Description" className='details_input_large' onChange={HandleChange} value={item.description}/></h3>
                  <br/>
                  <h3>Item Image URL&emsp;: <br/><input name="image" type="text" className='details_input' onChange={HandleChange} value={item.image=="https://t3.ftcdn.net/jpg/03/34/83/22/360_F_334832255_IMxvzYRygjd20VlSaIAFZrQWjozQH6BQ.jpg"?"":item.image}/></h3>
                  <br/>
                  <h3>Item Quantity &emsp;: <br/><input name="quantity" type="number" placeholder="Enter Item Quantity" className='details_input' onChange={HandleChange} value={item.quantity}/></h3>
                  <br/>
                </div>
                <div className="ErrorMsg">{show && Message!==item.name+" Successfully Added" ? Message : ""}</div>
                <div className="SuccessMsg">{show && Message==item.name+" Successfully Added" ? Message : ""}</div>
                <div className='btn' onClick={Save_Changes}>Sell</div>
                </center>
              </div>
            </body>
        </div>
  )
}

export default Sell_items