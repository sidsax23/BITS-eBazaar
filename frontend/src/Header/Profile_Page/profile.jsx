import React from 'react'
import './profile.css'
import Header from '../header.jsx'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CSVLink } from 'react-csv'
import DataTable from 'react-data-table-component'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css' 

function Profile(props) 
{
    let navigate = useNavigate()

    const [user_name,set_user_name]=useState("")
    const [dummy,setdummy]=useState("")
    const [user_dept,set_dept]=useState("")
    const [user_address,set_address]=useState("")
    const [user_phone_num,set_phone_num]=useState("")
    const [user_upi,set_user_upi]=useState("")
    const [pass_copy,set_pass_copy]=useState("")

    const [popup1,set_popup1] = useState(false)
    const [inner_popup1,set_inner_popup1] = useState(false)
    const [inner_popup1_message,set_inner_popup1_message] = useState("")

    const [items,set_items]=useState([])
    const [selected_data,set_selected_data] = useState([])
    const [filtered_items,set_filtered_items] = useState([])
    const [search,set_search] = useState("")
    const [offer_counts,set_offer_counts] = useState([])

    const [Message,setmessage] = useState("")
    const [Item_message,set_Item_message] = useState("")
    const [show,setshow] = useState(false)
    const [update,set_update]=useState(false)
    const pattern = new RegExp("[6,7,8,9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]") 



    //USER PROFILE

    const [user,Setuser] = useState(
      {
        email:"",
        user_name_new:"",
        user_phone_num_new:"",
        user_address_new:"",
        user_upi_new:"",
        user_pass_new:""
      })
    const [axios_call_count,set_call_count]=useState(0)

    if(axios_call_count==0||update==false)
    {
      axios.post("http://localhost:8000/user/Profile",props).then(
        res => {
                  set_call_count(1)
                  set_update(true)
                  res.data.found ? Set_details(res) : setdummy()
               }

      )
      function Set_details(res)
      {
        set_user_name(res.data.name)
        set_dept(res.data.dept)
        set_address(res.data.address)
        set_phone_num(res.data.phone_num)
        set_user_upi(res.data.upi)
      }

    }

    const HandleChange  = e =>  /*When someone types, its an 'event', denoted and saved in 'e' here. e.target will return where and what the change was*/
    {    
        setshow(false)
        setmessage("")
        const {name,value} = e.target
        if(name=="user_pass_copy")
        {
          set_pass_copy(value);
        }
        else
        {
          Setuser({
            ...user, /* Stores the value entered by the user in the respective state variable while the rest remain as their default values ("" in this case)*/
            [name]:value /* Depending on the name of the inputbar, its value is stored in the respective state variable*/
          })
        }
       
    }

    const Save_Changes = () =>
    {
        set_update(false)
        setshow(true)
        const {email,user_name_new,user_phone_num_new,user_address_new,user_upi_new,user_pass_new} = user
        user.email=props.email
        if(!user_name_new&&!user_phone_num_new&&!user_address_new&&!user_upi_new&&!user_pass_new&&!pass_copy)
        {
            setmessage("Please enter new data")
        }
        else if(user_upi_new==user_upi&&user_upi)
        {
          setmessage("Entered UPI ID matches the existing one.")
        }
        else if(user_name_new==user_name&&user_name_new)
        {
            setmessage("Entered name matches the existing name.")
        }
        else if(user_phone_num_new==user_phone_num&&user_phone_num_new)
        {
            setmessage("Entered phone number matches the existing phone number.")
        }
        else if(user_address_new==user_address&&user_address_new)
        {
            setmessage("Entered address matches the existing address.")
        }
        else if(!pattern.test(user_phone_num_new)&&user_phone_num_new)
        {
            setmessage("Please enter a valid phone number")
        }
        else if(user.user_pass_new != pass_copy)
        {
          setmessage("Please repeat the password correctly.")
        }
        else
        {
            axios.put("http://localhost:8000/user/Update_Profile", user)
            .then( res=> {setmessage(res.data.message)} )
        }

    }



    //USER ITEMS

    const get_items = async() =>
    {
      try 
      {
        const seller_details = {
          email:props.email
        }
        const Item_ids = {
          ids:[]
        }
        const response = await axios.post("http://localhost:8000/products/fetch_my_items",seller_details)
        set_items(response.data);
        set_filtered_items(response.data);
        for(var i=0;i<response.data.length;i++)
        {
          Item_ids.ids.push(response.data[i]._id)
        }

        const result = await axios.post("http://localhost:8000/shopping/fetch_items_offer_count",Item_ids)
        set_offer_counts(result.data)
        
      } 
      catch (error) 
      {
        console.log(error); 
      }

    }

    useEffect(() => 
    {
      get_items();

    }, [])

    useEffect(() => 
    {
      const result = items.filter( (item) => {

        return item.name.toLowerCase().match(search.toLowerCase())

      })
      set_filtered_items(result)

    },[search])


  //HEADERS FOR EXPORTING DATA
  const headers = [
    {
      label:"Name",
      key : "name"
    },
    {
      label:"Category",
      key : "category"
    },
    {
      label:"Sub-Category",
      key : "sub_category"
    },
    {
      label:"Price",
      key : "price"
    },
    {
      label:"Condition",
      key : "condition"
    },
    {
      label:"Description",
      key : "description"
    },
    {
      label:"Image URL",
      key : "image"
    }]

    //DATA TO BE EXPORTED
    const csvLink = {
      filename: "Items_Data.CSV",
      headers: headers,
      data: selected_data
    }

    //DELETION
    const delete_records = async () =>
    {
      const Item_Details = {
        ids:[]
      }
      for(var i=0;i<selected_data.length;i++)
      {
        Item_Details.ids.push(selected_data[i]._id)
      }

      //Deleting Item(s)
      await axios.post("http://localhost:8000/products/Delete_Items", Item_Details).then( (res) =>
      {
        get_items();
        set_Item_message(res.data); 
      })

      //Deleting order(s) associated with item(s) to be deleted
      await axios.post("http://localhost:8000/shopping/Delete_Orders", Item_Details)

    }

    //TABLE HEADERS
    const columns =[
      {
        name:"Name",
        selector: (row) => row.name,
        sortable : true
      },
      {
        name:"Category",
        selector: (row) => row.category,
        sortable : true
      },
      {
        name:"Price",
        selector: (row) => row.price,
        sortable : true
      },
      {
        name:"Quantity",
        selector: (row) => row.quantity,
        sortable : true
      },
      {
        name:"Offers Received",
        cell: (row,index) => offer_counts[index],
        sortable : true
      },
      {
        name:"Edit",
        cell: (row) => <Link to="/Edit_Item_Details" className='small_btn' state={{Item:row}}>EDIT</Link>
      }
    ]

  

    //ACCOUNT DELETION
    const delete_account = async () =>
    { 

      await axios.delete("http://localhost:8000/products/Delete_Items?email="+props.email)
      await axios.delete("http://localhost:8000/shopping/Delete_Orders?id="+props.id)

      await axios.delete("http://localhost:8000/user/Delete_Profile?id="+props.id).then((res)=>
      {
        set_inner_popup1_message(res.data.message)
        set_inner_popup1(true)
        set_popup1(false)
     
      })

 
   
    }

    const logout = () =>
    {
      set_inner_popup1(false)
      props.setloginuser({})
      navigate("/Homepage",{replace:true})
      
    }
    
    return(
        <div>
            <body>
            <Header login_state={props}/>
              <div className='profile_box'>
                <center><h1>My Profile</h1>
                <br/>
                <div className='details'>
                  <h3>Name &emsp;: &emsp;{user_name}<br/><input type="text" name="user_name_new" placeholder="Enter New Name" className='details_input' onChange={HandleChange} value={user.user_name_new}/></h3>
                  <br/>
                  <h3>Email &emsp;: &emsp;{props.email}</h3>
                  <br/>
                  <h3>Phone Number &emsp;: &emsp;{user_phone_num}<br/><input name="user_phone_num_new" type="text" placeholder="Enter New Phone Number" className='details_input' onChange={HandleChange} value={user.user_phone_num_new}/></h3>
                  <br/>
                  <h3>Department &emsp;: &emsp;{user_dept}</h3>
                  <br/>
                  <h3>Address &emsp;: &emsp;{user_address}<br/><textarea name="user_address_new" placeholder="Enter New Address" cols="20" rows="6" className='details_input_large' onChange={HandleChange} value={user.user_address_new}/></h3>
                  <br/>
                  <h3>UPI ID &emsp;: &emsp;{user_upi}<br/><input name="user_upi_new" placeholder="Enter New UPI ID" className='details_input' onChange={HandleChange} value={user.user_upi_new}/></h3>
                  <br/>
                  <br/>
                  <h3>New Password &emsp;: &emsp;<br/><input name="user_pass_new" placeholder="Enter New Password" className='details_input' onChange={HandleChange} value={user.user_pass_new}/></h3>
                  <br/>
                  <input name="user_pass_copy" placeholder="Repeat Password" className='details_input' onChange={HandleChange} value={pass_copy}/>
                  <br/>
                  <br/>
                </div>
                <div className="ErrorMsg">{show && Message!=="Profile Updated Successfully." ? Message : ""}</div>
                <div className="SuccessMsg">{show && Message=="Profile Updated Successfully." ? Message : ""}</div>
                <div className='btn' onClick={Save_Changes}>Save</div>
                <br/>
                <br/>
                <h1>My Items</h1>
                <br/>
                <DataTable 
                  columns={columns} 
                  data={filtered_items} 
                  fixedHeader 
                  selectableRows
                  selectableRowsHighlight
                  onSelectedRowsChange={(e) => set_selected_data(e.selectedRows)}
                  highlightOnHover
                  subHeader
                  subHeaderComponent = 
                  {
                    <div>
                    <p>Search by name : &emsp; <input type="text" placeholder='Search...' className='search_bar' value={search} onChange={(e) => set_search(e.target.value)}/></p>
                    <br/>
                    </div>
                  }
                  subHeaderAlign="left"
                />
                <br/>
                <div className="ErrorMsg">{show && Item_message!=="Deletion Successfull." ? Item_message : ""}</div>
                <div className="SuccessMsg">{show && Item_message=="Deletion Successfull." ? Item_message : ""}</div>
                <CSVLink className='export_btn' {...csvLink}>Export</CSVLink>
                <div className='export_btn' onClick={delete_records}> Delete </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <div className='delete_btn' onClick={() => {set_popup1(o => !o)}}> Delete Account </div>
                <Popup open={popup1} modal closeOnDocumentClick onClose={()=>{set_popup1(false)}}>
                <center> 
                  <br/>
                  <p><center>Are you sure you want to delete your account ? This is irreversible.</center></p>
                  <br/>
                  {<div><div className='export_btn' onClick={delete_account}>Yes</div><div className='export_btn' onClick={()=>{set_popup1(false)}} >No</div></div>}
                  <br/>
                </center>
                </Popup>
                <Popup open = {inner_popup1} closeOnDocumentClick onClose={logout}>
                <center> 
                  <br/>
                  <center><div className={inner_popup1_message=='Deletion Successfull!' ? 'SuccessMsg' : 'ErrorMsg'}>{inner_popup1_message}</div></center>
                  <br/>
                  <div className='export_btn' onClick={logout}>Ok</div>
                  <br/>
                  <br/>
                </center>
                </Popup>
                <br/>
                </center>
              </div>
            </body>
        </div>
  )
}

export default Profile