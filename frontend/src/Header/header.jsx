import react from 'react'
import './header.css'
import Logo from './Assets/Transparent_Logo.png'
import {CgProfile} from 'react-icons/cg'
import {BiShoppingBag} from 'react-icons/bi'
import SearchIcon from '@mui/icons-material/Search';
import {Link} from 'react-router-dom'
import { useState } from 'react'

const Header = (props) => 
{
    const [search_term,set_search_term]=useState("")
    
    const HandleChange  = e =>  /*When someone types, its an 'event', denoted and saved in 'e' here. e.target will return where and what the change was*/
    {    
        set_search_term(e.target.value)
        try{
            props.set_change(1)
            props.set_term(e.target.value)
        }
        catch(err){}
    }



    return(
        <div>
            <header>
                <Link to='/'><img src={Logo} alt='Logo' className='logo_mini'/></Link>
                <Link to='/' className='Name'>BITS e-Bazaar</Link>
                <input type="search" className='search_bar' placeholder="What's on your mind ?" onChange={HandleChange}/>
                <Link to={search_term ? '/Search_results' : null} refresh="true" state={{search_key:search_term}}><SearchIcon className='search_btn' /></Link>
                <Link to='/Sell_Item' className='sell_btn'>Sell</Link>
                <div className='Profile_Page_Button'>
                    <Link to='/My_Profile'><CgProfile className='icon' size={50} /></Link>
                </div>
                <div className='Cart_Button'>
                    <Link to='/Transactions'><BiShoppingBag className='icon' size={50} /></Link>
                </div>
                <div className="logout_btn" onClick={() => props.login_state.setloginuser({})}>Logout</div>
            </header>
        </div>

    )
}

export default Header