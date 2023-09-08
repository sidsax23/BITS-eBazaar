import React, { useState } from 'react'
import Login_page from './Login_Page/Login_page.jsx'
import Recover_pass from './Login_Page/Recover_pass/Recover_pass.jsx'
import Sign_up from './Login_Page/Sign_up/Sign_up.jsx'
import Profile from './Header/Profile_Page/profile.jsx'
import Cycles from './Categories/Cycles/cycles.jsx'
import Vehicles from './Categories/Vehicles/vehicles.jsx'
import Books_Notes from './Categories/Books_Notes/books_notes.jsx'
import Electronics from './Categories/Electronics/electronics.jsx'
import Furniture from './Categories/Furniture/furniture.jsx'
import Misc from './Categories/Miscellaneous/miscellaneous.jsx'
import Sell_Item from './Sell_Item/sell_item.jsx'
import Product_Page from './Categories/Product_Page/product_page.jsx'
import Transactions from './Header/Transactions/transactions.jsx'
import Search_Results from './Categories/Search_Results/search_results.jsx'
import Edit_Item from './Header/Profile_Page/Edit_Item/Edit_Item.jsx'
import {Routes, BrowserRouter as Router, Route} from 'react-router-dom' /*Routes = Switch-case from C++*/
import Homepage from './Homepage/Homepage.jsx'


function App() 
{
  const [user,setloginuser] = useState({})
  return (
    <> 
    <Router>
      <Routes>
		    <Route exact path="/" element =
          {
            user && user._id ? <Homepage setloginuser={setloginuser} /> : <Login_page setloginuser={setloginuser}/>
          }
        />
        <Route exact path="/Homepage" element =
          {
            user && user._id ? <Homepage setloginuser={setloginuser} /> : <Login_page setloginuser={setloginuser}/>
          }
        />
        <Route exact path="/Login" element =
          {
            <Login_page setloginuser={setloginuser}/>
          }
        />
        <Route exact path="/My_Profile" element=
        {
          user && user._id ? <Profile setloginuser={setloginuser} email={user.email} id={user._id}/> : <Login_page setloginuser={setloginuser}/>
        }
        />
			  <Route exact path="/Sign_up" element={<Sign_up/>}/>
        <Route exact path="/Recover_pass" element={<Recover_pass/>}/>
        <Route exact path="/Cycles" element=
        {
          user && user._id ? <Cycles setloginuser={setloginuser} email={user.email}/> : <Login_page setloginuser={setloginuser}/>
        }
        />
        <Route exact path="/Vehicles" element=
        {
          user && user._id ? <Vehicles setloginuser={setloginuser} email={user.email}/> : <Login_page setloginuser={setloginuser}/>
        }
        />
        <Route exact path="/Books_Notes" element=
        {
          user && user._id ? <Books_Notes setloginuser={setloginuser} email={user.email}/> : <Login_page setloginuser={setloginuser}/>
        }
        />
        <Route exact path="/Electronics" element=
        {
          user && user._id ? <Electronics setloginuser={setloginuser} email={user.email}/> : <Login_page setloginuser={setloginuser}/>
        }
        />
        <Route exact path="/Furniture" element=
        {
          user && user._id ? <Furniture setloginuser={setloginuser} email={user.email}/> : <Login_page setloginuser={setloginuser}/>
        }
        />
        <Route exact path="/Misc" element=
        {
          user && user._id ? <Misc setloginuser={setloginuser} email={user.email}/> : <Login_page setloginuser={setloginuser}/>
        }
        />
        <Route exact path="/Miscellaneous" element=
        {
          user && user._id ? <Misc setloginuser={setloginuser} email={user.email}/> : <Login_page setloginuser={setloginuser}/>
        }
        />
        <Route exact path="/Sell_Item" element=
        {
          user && user._id ? <Sell_Item setloginuser={setloginuser} email={user.email}/> : <Login_page setloginuser={setloginuser}/>
        }
        />
        <Route exact path="/Product_Page" element =
          {
            user && user._id ? <Product_Page setloginuser={setloginuser} email={user.email} user_id={user._id}/> : <Login_page setloginuser={setloginuser}/>
          }
        />
        <Route exact path="/Transactions" element =
          {
            user && user._id ? <Transactions setloginuser={setloginuser} email={user.email} user_id={user._id}/> : <Login_page setloginuser={setloginuser}/>
          }
        />
        <Route exact path="/Search_results" element =
        {
          user && user._id ? <Search_Results setloginuser={setloginuser} email={user.email}/> : <Login_page setloginuser={setloginuser}/>
        }
        />
        <Route exact path="/Edit_Item_Details" element =
        {
          user && user._id ? <Edit_Item setloginuser={setloginuser} email={user.email}/> : <Login_page setloginuser={setloginuser}/>
        }
        />
	    </Routes>
    </Router>
    </>
  );
}

export default App