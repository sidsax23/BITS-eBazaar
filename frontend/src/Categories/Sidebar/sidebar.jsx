import react,{useState} from 'react'
import './sidebar.css'


//SIDEBAR
function Sidebar(props) 
{ 
    const [item_cat,set_item_cat] = useState("Cycles")
    const [item_filters,Set_filters] = useState(
        {
          category: props.type,
          search_key:"",
          email:props.email,
          min_price:0,
          max_price:Number.MAX_VALUE,
          condition1:"",
          condition2:"",
          condition3:"",
          condition4:"",
          condition5:"",
          sub_category1:"",
          sub_category2:"",
          sub_category3:"",
          sub_category4:"",
          sub_category5:"",
          sub_category6:"",
          sub_category7:""
        })
    
    //CATEGORIES
    function cycle_categories()
    {
        return(
            <div>
                <input type="checkbox" id="GC" className='checkbox' onChange={HandleChange_Sub_Category_Cycle}/><label for="GC" className='checkbox'> Geared</label>
                <br/>
                <input type="checkbox" id="NGC" className='checkbox' onChange={HandleChange_Sub_Category_Cycle}/><label for="NGC" className='checkbox'> Non-Geared</label>
                <br/>
            </div>
        )
    }
    function vehicle_categories()
    {
        return(
            <div>
                <input type="checkbox" id="CV" className='checkbox' onChange={HandleChange_Sub_Category_Vehicle}/><label for="CV" className='checkbox'> Car</label>
                <br/>
                <input type="checkbox" id="BV" className='checkbox' onChange={HandleChange_Sub_Category_Vehicle}/><label for="BV" className='checkbox'> Bike</label>
                <br/>
                <input type="checkbox" id="SV" className='checkbox' onChange={HandleChange_Sub_Category_Vehicle}/><label for="SV" className='checkbox'> Scooty</label>
                <br/>
                <input type="checkbox" id="OV" className='checkbox' onChange={HandleChange_Sub_Category_Vehicle}/><label for="OV" className='checkbox'> Others</label>
                <br/>
            </div>
        )
    }
    function book_categories()
    {
        return(
            <div>
                <input type="checkbox" id="BB" className='checkbox' onChange={HandleChange_Sub_Category_Books}/><label for="BB" className='checkbox'> Books</label>
                <br/>
                <input type="checkbox" id="NB" className='checkbox' onChange={HandleChange_Sub_Category_Books}/><label for="NB" className='checkbox'> Notes</label>
                <br/>
                <input type="checkbox" id="TBB" className='checkbox' onChange={HandleChange_Sub_Category_Books}/><label for="TBB" className='checkbox'> Textbooks</label>
                <br/>
                <input type="checkbox" id="RBB" className='checkbox' onChange={HandleChange_Sub_Category_Books}/><label for="RBB" className='checkbox'> Reference Books</label>
                <br/>
            </div>
        )
    }
    function electronics_categories()
    {
        return(
            <div>
                <input type="checkbox" id="LE" className='checkbox' onChange={HandleChange_Sub_Category_Electronics}/><label for="LE" className='checkbox'> Laptops</label>
                <br/>
                <input type="checkbox" id="SE" className='checkbox' onChange={HandleChange_Sub_Category_Electronics}/><label for="SE" className='checkbox'> Smartphones</label>
                <br/>
                <input type="checkbox" id="AE" className='checkbox' onChange={HandleChange_Sub_Category_Electronics}/><label for="AE" className='checkbox'> Accessories</label>
                <br/>
                <input type="checkbox" id="TE" className='checkbox' onChange={HandleChange_Sub_Category_Electronics}/><label for="TE" className='checkbox'> Televisions</label>
                <br/>
                <input type="checkbox" id="CE" className='checkbox' onChange={HandleChange_Sub_Category_Electronics}/><label for="CE" className='checkbox'> Cameras</label>
                <br/>
                <input type="checkbox" id="RE" className='checkbox' onChange={HandleChange_Sub_Category_Electronics}/><label for="RE" className='checkbox'> Refrigerators</label>
                <br/>
                <input type="checkbox" id="OE" className='checkbox' onChange={HandleChange_Sub_Category_Electronics}/><label for="OE" className='checkbox'> Others</label>
                <br/>
            </div>
        )
    }
    
    function furniture_categories()
    {
        return(
            <div>
                <input type="checkbox" id="TF" className='checkbox' onChange={HandleChange_Sub_Category_Furniture}/><label for="TF" className='checkbox'> Tables</label>
                <br/>
                <input type="checkbox" id="CF" className='checkbox' onChange={HandleChange_Sub_Category_Furniture}/><label for="CF" className='checkbox'> Chairs</label>
                <br/>
                <input type="checkbox" id="WF" className='checkbox' onChange={HandleChange_Sub_Category_Furniture}/><label for="WF" className='checkbox'> Wardrobes</label>
                <br/>
                <input type="checkbox" id="SF" className='checkbox' onChange={HandleChange_Sub_Category_Furniture}/><label for="SF" className='checkbox'> Sofas</label>
                <br/>
                <input type="checkbox" id="BF" className='checkbox' onChange={HandleChange_Sub_Category_Furniture}/><label for="BF" className='checkbox'> Beds</label>
                <br/>
                <input type="checkbox" id="OF" className='checkbox' onChange={HandleChange_Sub_Category_Furniture}/><label for="OF" className='checkbox'> Others</label>
                <br/>
            </div>
        )
    }
    
    function misc_categories()
    {
        return(
            <div>
                <input type="checkbox" id="SM" className='checkbox' onChange={HandleChange_Sub_Category_Misc}/><label for="SM" className='checkbox'> Stationery</label>
                <br/>
                <input type="checkbox" id="UM" className='checkbox' onChange={HandleChange_Sub_Category_Misc}/><label for="UM" className='checkbox'> Utensils</label>
                <br/>
                <input type="checkbox" id="CM" className='checkbox' onChange={HandleChange_Sub_Category_Misc}/><label for="CM" className='checkbox'> Clothes</label>
                <br/>
                <input type="checkbox" id="OM" className='checkbox' onChange={HandleChange_Sub_Category_Misc}/><label for="OM" className='checkbox'> Others</label>
                <br/>
            </div>
        )
    }

    function all_categories()
    {
        return(
        <div>
            <select name="category" onChange={HandleChange_category} className='price' value={item_cat}> 
                <option value="Cycles" >Cycles</option>
                <option value="Vehicles">Vehicles</option>
                <option value="Books/Notes">Books/Notes</option>
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                <option value="Miscellaneous">Miscellaneous</option>
            </select>
            <p> Item Sub-Category</p>
            <div className='filter_criteria'>
            {
                item_cat=="Cycles" ? 
                    cycle_categories() : 
                item_cat=="Vehicles" ?
                    vehicle_categories() :
                item_cat=="Books/Notes" ?
                    book_categories() :
                item_cat=="Electronics" ?
                    electronics_categories() :
                item_cat=="Furniture" ?
                    furniture_categories() :
                item_cat=="Miscellaneous" ?
                    misc_categories() : 
                alert("Error")
            }
            </div>
        </div>
        

        )
    }

    const HandleChange_category  = e =>  /*When someone types, its an 'event', denoted and saved in 'e' here. e.target will return where and what the change was*/
    {    
        set_item_cat(e.target.value)
        item_filters.category=e.target.value
    }
    
    const HandleChange  = e =>  /*When someone types, its an 'event', denoted and saved in 'e' here. e.target will return where and what the change was*/
    {    
        const {name,value} = e.target
        Set_filters({
            ...item_filters, /* Stores the value entered by the user in the respective state variable while the rest remain as their default values ("" in this case)*/
            [name]:value /* Depending on the name of the inputbar, its value is stored in the respective state variable*/
        })
        
    }
        
    const HandleChange_Condition  = () =>
    {    
        if(document.getElementById("NC").checked==true)
        {
            item_filters.condition1="New"
        }
        if(document.getElementById("NC").checked==false)
        {
            item_filters.condition1=""
        }
        if(document.getElementById("LNC").checked==true)
        {
            item_filters.condition2="Like-New"
        }
        if(document.getElementById("LNC").checked==false)
        {
            item_filters.condition2=""
        }
        if(document.getElementById("MUC").checked==true)
        {
            item_filters.condition3="Moderately Used"
        }
        if(document.getElementById("MUC").checked==false)
        {
            item_filters.condition3=""
        }
        if(document.getElementById("UC").checked==true)
        {
            item_filters.condition4="Used"
        }
        if(document.getElementById("UC").checked==false)
        {
            item_filters.condition4=""
        }
        if(document.getElementById("HUC").checked==true)
        {
            item_filters.condition5="Heavily Used"
        } 
        if(document.getElementById("HUC").checked==false)
        {
            item_filters.condition5=""
        }
    }


    const HandleChange_Sub_Category_Cycle  = () =>
    {    

        // Cycles
        if(document.getElementById("GC").checked==true)
        {
            item_filters.sub_category1="Geared"
        }
        if(document.getElementById("GC").checked==false)
        {
            item_filters.sub_category1=""
        }
        if(document.getElementById("NGC").checked==true)
        {
            item_filters.sub_category2="Non-Geared"
        }
        if(document.getElementById("NGC").checked==false)
        {
            item_filters.sub_category2=""
        }
    }

    const HandleChange_Sub_Category_Vehicle  = () =>
    { 

        // Vehicles
        if(document.getElementById("CV").checked==true)
        {
            item_filters.sub_category1="Car"
        }
        if(document.getElementById("CV").checked==false)
        {
            item_filters.sub_category1=""
        }
        if(document.getElementById("BV").checked==true)
        {
            item_filters.sub_category2="Bike"
        }
        if(document.getElementById("BV").checked==false)
        {
            item_filters.sub_category2=""
        }
        if(document.getElementById("SV").checked==true)
        {
            item_filters.sub_category3="Scooty"
        }
        if(document.getElementById("SV").checked==false)
        {
            item_filters.sub_category3=""
        }
        if(document.getElementById("OV").checked==true)
        {
            item_filters.sub_category4="Others"
        }
        if(document.getElementById("OV").checked==false)
        {
            item_filters.sub_category4=""
        }
    }

    const HandleChange_Sub_Category_Books = () =>
    { 
        // Books
        if(document.getElementById("BB").checked==true)
        {
            item_filters.sub_category1="Books"
        }
        if(document.getElementById("BB").checked==false)
        {
            item_filters.sub_category1=""
        }
        if(document.getElementById("NB").checked==true)
        {
            item_filters.sub_category2="Notes"
        }
        if(document.getElementById("NB").checked==false)
        {
            item_filters.sub_category2=""
        }
        if(document.getElementById("TBB").checked==true)
        {
            item_filters.sub_category3="Textbooks"
        }
        if(document.getElementById("TBB").checked==false)
        {
            item_filters.sub_category3=""
        }
        if(document.getElementById("RBB").checked==true)
        {
            item_filters.sub_category4="Reference Books"
        }
        if(document.getElementById("RBB").checked==false)
        {
            item_filters.sub_category4=""
        }
    }

    const HandleChange_Sub_Category_Electronics = () =>
    { 

        // Electronics
        if(document.getElementById("LE").checked==true)
        {
            item_filters.sub_category1="Laptops"
        }
        if(document.getElementById("LE").checked==false)
        {
            item_filters.sub_category1=""
        }
        if(document.getElementById("SE").checked==true)
        {
            item_filters.sub_category2="Smartphones"
        }
        if(document.getElementById("SE").checked==false)
        {
            item_filters.sub_category2=""
        }
        if(document.getElementById("AE").checked==true)
        {
            item_filters.sub_category3="Accessories"
        }
        if(document.getElementById("AE").checked==false)
        {
            item_filters.sub_category3=""
        }
        if(document.getElementById("TE").checked==true)
        {
            item_filters.sub_category4="Televisions"
        }
        if(document.getElementById("TE").checked==false)
        {
            item_filters.sub_category4=""
        }
        if(document.getElementById("CE").checked==true)
        {
            item_filters.sub_category5="Cameras"
        }
        if(document.getElementById("CE").checked==false)
        {
            item_filters.sub_category5=""
        }
        if(document.getElementById("RE").checked==true)
        {
            item_filters.sub_category6="Refrigerators"
        }
        if(document.getElementById("RE").checked==false)
        {
            item_filters.sub_category6=""
        }
        if(document.getElementById("OE").checked==true)
        {
            item_filters.sub_category7="Others"
        }
        if(document.getElementById("OE").checked==false)
        {
            item_filters.sub_category7=""
        }
    }

    const HandleChange_Sub_Category_Furniture = () =>
    { 

        // Furniture
        if(document.getElementById("TF").checked==true)
        {
            item_filters.sub_category1="Tables"
        }
        if(document.getElementById("TF").checked==false)
        {
            item_filters.sub_category1=""
        }
        if(document.getElementById("CF").checked==true)
        {
            item_filters.sub_category2="Chairs"
        }
        if(document.getElementById("CF").checked==false)
        {
            item_filters.sub_category2=""
        }
        if(document.getElementById("WF").checked==true)
        {
            item_filters.sub_category3="Wardrobes"
        }
        if(document.getElementById("WF").checked==false)
        {
            item_filters.sub_category3=""
        }
        if(document.getElementById("SF").checked==true)
        {
            item_filters.sub_category4="Sofas"
        }
        if(document.getElementById("SF").checked==false)
        {
            item_filters.sub_category4=""
        }
        if(document.getElementById("BF").checked==true)
        {
            item_filters.sub_category5="Beds"
        }
        if(document.getElementById("BF").checked==false)
        {
            item_filters.sub_category5=""
        }
        if(document.getElementById("OF").checked==true)
        {
            item_filters.sub_category6="Others"
        }
        if(document.getElementById("OF").checked==false)
        {
            item_filters.sub_category6=""
        }
    }

    const HandleChange_Sub_Category_Misc = () =>
    { 
        // Miscellaneous
        if(document.getElementById("SM").checked==true)
        {
            item_filters.sub_category1="Stationery"
        }
        if(document.getElementById("SM").checked==false)
        {
            item_filters.sub_category1=""
        }
        if(document.getElementById("UM").checked==true)
        {
            item_filters.sub_category2="Utensils"
        }
        if(document.getElementById("UM").checked==false)
        {
            item_filters.sub_category2=""
        }
        if(document.getElementById("CM").checked==true)
        {
            item_filters.sub_category3="Clothes"
        }
        if(document.getElementById("CM").checked==false)
        {
            item_filters.sub_category3=""
        }
        if(document.getElementById("OM").checked==true)
        {
            item_filters.sub_category4="Others"
        }
        if(document.getElementById("OM").checked==false)
        {
            item_filters.sub_category4=""
        }

    }




        



  return (
    <div className='sidebar'>   
        <br/>
       <h2>FILTERS</h2>
       <br/>
       <p>  &emsp;Price Range</p>
       <input type="text" className="price" name='min_price' placeholder='Minimum Price (>=)' value={item_filters.min_price==0 ? "" : item_filters.min_price} onChange={HandleChange}/>
       <input type="text" className="price" name='max_price' placeholder='Maximum Price (<=)' value={item_filters.max_price==Number.MAX_VALUE ? "" : item_filters.max_price} onChange={HandleChange}/>
       <br/>
       <br/>
       <p>  &emsp;{props.type!="Search" ? "Item Sub-Category" : "Item Category"}</p>
       <div className='filter_criteria'>
        {
                props.type=="Cycles" ? 
                    cycle_categories() : 
                props.type=="Vehicles" ?
                    vehicle_categories() :
                props.type=="Books/Notes" ?
                    book_categories() :
                props.type=="Electronics" ?
                    electronics_categories() :
                props.type=="Furniture" ?
                    furniture_categories() :
                props.type=="Miscellaneous" ?
                    misc_categories() : 
                props.type=="Search" ? 
                    all_categories():
                alert("Error")
        }
        </div>
        <br/>
        <p>  &emsp;Item Condition</p>
        <div className='filter_criteria'>
            <input type="checkbox" id="NC" className='checkbox' value="New" onChange={HandleChange_Condition}/><label for="NC" className='checkbox'> New</label>
            <br/>
            <input type="checkbox" id="LNC" className='checkbox' value="Like-New" onChange={HandleChange_Condition}/><label for="LNC" className='checkbox'> Like New</label>
            <br/>
            <input type="checkbox" id="MUC" className='checkbox' value="Moderately Used" onChange={HandleChange_Condition}/><label for="MUC" className='checkbox'> Moderately Used</label>
            <br/>
            <input type="checkbox" id="UC" className='checkbox' value="Used" onChange={HandleChange_Condition}/><label for="UC" className='checkbox'> Used</label>
            <br/>
            <input type="checkbox" id="HUC" className='checkbox' value="Heavily Used" onChange={HandleChange_Condition}/><label for="HUC" className='checkbox'> Heavily Used</label>
            <br/>
        </div>
        <br/>
        <div className='btn' onClick={()=>props.filter(item_filters)}>Apply Filters</div>
        <br/>
        <br/>
    </div>
  )
}

export default Sidebar