import React, { useState } from 'react'
import './Edit_Item.css'
import Header from '../../header.jsx'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

function Edit_Item(props) 
{
    const location=useLocation()
    const Item_details = location.state.Item
    const [Item_name,set_item_name] = useState(Item_details.name)
    const [Item_category,set_item_category] = useState(Item_details.category)
    const [Item_sub_category,set_item_sub_category] = useState(Item_details.sub_category)
    const [Item_price,set_item_price] = useState(Item_details.price)
    const [Item_quantity,set_item_quantity] = useState(Item_details.quantity)
    const [Item_condition,set_item_condition] = useState(Item_details.condition)
    const [Item_description,set_item_description] = useState(Item_details.description)
    const [Item_image,set_item_image] = useState(Item_details.image)

    const [Message,setmessage] = useState("")
    const [show,setshow] = useState(false)
    const [update,set_update]=useState(false)
    const [dummy,setdummy] = useState("")
    
    const [Item,Set_Item] = useState({
        id:Item_details._id,
        name_new : "",
        category_new : "",
        sub_category_new : "",
        price_new : 0,
        quantity_new : 1,
        condition_new : "",
        description_new : "",
        image_url_new : "",
    })

    if(update==true)
    {
        const Item_id = {
            id: Item_details._id
        }
      axios.post("http://localhost:8000/product/fetch_item_details",Item_id).then(
        res => {
                  set_update(false)
                  res.data.item ? Set_details(res) : setdummy()
               }

      )
      function Set_details(res)
      {
        set_item_name(res.data.name)
        set_item_category(res.data.category)
        set_item_sub_category(res.data.sub_category)
        set_item_price(res.data.price)
        set_item_quantity(res.data.quantity)
        set_item_condition(res.data.condition)
        set_item_description(res.data.description)
        set_item_image(res.data.image)

      }

    }

    
    const HandleChange  = e =>  /*When someone types, its an 'event', denoted and saved in 'e' here. e.target will return where and what the change was*/
    {    
        setshow(false)
        setmessage("")
        const {name,value} = e.target
        Set_Item({
            ...Item, /* Stores the value entered by the user in the respective state variable while the rest remain as their default values ("" in this case)*/
            [name]:value /* Depending on the name of the inputbar, its value is stored in the respective state variable*/
          })
    }


    function cycle_categories()
    {
        return(
          <div> 
          <select name="sub_category_new" className='details_input' onChange={HandleChange} value={Item.sub_category_new}>
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
          <select name="sub_category_new" className='details_input' onChange={HandleChange} value={Item.sub_category_new}>
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
          <select name="sub_category_new" className='details_input' onChange={HandleChange} value={Item.sub_category_new}>
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
          <select name="sub_category_new" className='details_input' onChange={HandleChange} value={Item.sub_category_new}>
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
          <select name="sub_category_new" className='details_input' onChange={HandleChange} value={Item.sub_category_new}>
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
          <select name="sub_category_new" className='details_input' onChange={HandleChange} value={Item.sub_category_new}>
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

        const {name_new,category_new,sub_category_new,price_new,quantity_new,condition_new,image_url_new,description_new} = Item
        if(!name_new&&!category_new&&!sub_category_new&&!price_new&&!quantity_new&&!condition_new&&!image_url_new&&!description_new)
        {
            setmessage("Please enter new data")
        }
        else if(name_new==Item_name&&Item_name)
        {
          setmessage("Entered name matches the existing one.")
        }
        else if(category_new==Item_category&&Item_category)
        {
          setmessage("Entered category matches the existing one.")
        }
        else if(sub_category_new==Item_sub_category&&Item_sub_category)
        {
          setmessage("Entered sub-category matches the existing one.")
        }
        else if(price_new==Item_price&&Item_price)
        {
          setmessage("Entered price matches the existing one.")
        }
        else if(quantity_new==Item_quantity&&Item_quantity)
        {
          setmessage("Entered quantity matches the existing one.")
        }
        else if(condition_new==Item_condition&&Item_condition)
        {
          setmessage("Entered condition matches the existing one.")
        }
        else if(image_url_new==Item_image&&Item_image)
        {
          setmessage("Entered image URL matches the existing one.")
        }
        else if(description_new==Item_description&&Item_description)
        {
          setmessage("Entered description matches the existing one.")
        }
        else if(price_new<0)
        {
            setmessage("Price cannot be negative.")
        }
        else if(quantity_new<0)
        {
            setmessage("Quantity must be >= 0.")
        }
        else
        {
            axios.put("http://localhost:8000/products/Update_Item", Item)
            .then( res=> {setmessage(res.data.message)} )
        }
        set_update(true)
        setshow(true)

    }



    return(
        <div>
            <body>
            <Header login_state={props}/>
              <div className='profile_box'>
                <center><h1>{Item_name}</h1>
                <br/>
                <img src={Item_details.image} height="200" max-width="650"/>
                <div className='details'>
                  <h3>Name &emsp;: &emsp;{Item_name}<br/><input type="text" name="name_new" placeholder="Enter New Name" className='details_input' onChange={HandleChange} value={Item.name_new}/></h3>
                  <br/>
                  <h3>Category &emsp;: &emsp;{Item_category}
                  <br/>
                        <select name="category_new" onChange={HandleChange} className='details_input' value={Item.category_new}> 
                            <option value=""></option>
                            <option value="Cycles" >Cycles</option>
                            <option value="Vehicles">Vehicles</option>
                            <option value="Books/Notes">Books/Notes</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Furniture">Furniture</option>
                            <option value="Miscellaneous">Miscellaneous</option>
                        </select>
                  </h3>
                  <br/>
                  <h3>Sub-Category &emsp;: &emsp;{Item_sub_category}
                  <br/>
                        {
                            Item.category_new=="Cycles" ? cycle_categories() : 
                            Item.category_new=="Books/Notes" ? book_categories() : 
                            Item.category_new=="Vehicles" ? vehicle_categories() : 
                            Item.category_new=="Electronics" ? electronics_categories() :
                            Item.category_new=="Furniture" ? furniture_categories() :
                            Item.category_new=="Miscellaneous" ? misc_categories() : cycle_categories()            
                        }
                  </h3>
                  <br/>
                  <h3>Price (in INR) &emsp;: &emsp;{Item_price}<br/><input name="price_new" type="number" placeholder="Enter New Price" className='details_input' onChange={HandleChange} value={Item.price_new}/></h3>
                  <br/>
                  <h3>Quantity &emsp;: &emsp;{Item_quantity}<br/><input name="quantity_new" type="number" placeholder="Enter New Quantity" className='details_input' onChange={HandleChange} value={Item.quantity_new}/></h3>
                  <br/>
                  <h3>Condition &emsp;: &emsp;{Item_condition}<br/>
                        <select name="condition_new" onChange={HandleChange} className='details_input' value={Item.condition_new}> 
                            <option value=""></option>
                            <option value="New" >New</option>
                            <option value="Like-New">Like-New</option>
                            <option value="Moderately Used">Moderately Used</option>
                            <option value="Used">Used</option>
                            <option value="Heavily Used">Heavily Used</option>
                        </select>
                  </h3>
                  <br/>
                  <h3>Image URL &emsp;: &emsp;<br/><input name="image_url_new" placeholder="Enter New Image URL" className='details_input' onChange={HandleChange} value={Item.image_url_new}/></h3>
                  <br/>
                  <h3>Description &emsp;: &emsp;{Item_description}<br/><textarea cols="20" rows="6" name="description_new" type="text" placeholder="Enter New Description" className='details_input_large' onChange={HandleChange} value={Item.description_new}/></h3>
                  <br/>
                </div>
                <div className="ErrorMsg">{show && Message!=="Item Updated Successfully." ? Message : ""}</div>
                <div className="SuccessMsg">{show && Message=="Item Updated Successfully." ? Message : ""}</div>
                <div className='btn' onClick={Save_Changes}>Save</div>
                <br/>
                </center>
                </div>
            </body>
        </div>
  )
}

export default Edit_Item