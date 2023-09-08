import React from 'react'
import './Nav_bar.css'
import {Link} from 'react-router-dom'
import {BsBicycle} from 'react-icons/bs'
import {FaCar} from 'react-icons/fa'
import {ImBook} from 'react-icons/im'
import {MdOutlineComputer,MdChair} from 'react-icons/md'
import {VscSymbolMisc} from 'react-icons/vsc'
import {AiFillHome} from 'react-icons/ai'
import {useState} from 'react'

/* Navigation bar at the bottom of the screen */
const Nav = (props) => 
{
  const [ActiveNav, SetActiveNav] = useState(props.active_state) /* REACT Hook (Using this we will make that section active where the user currently is) */
  /* ActiveNav is updated every time we click on one of the options of the NavBar  */
 
  return (
    
    <nav> 
      <Link to="/Cycles" title="Cycles" onClick={() => SetActiveNav('/Cycles')} className={ActiveNav === "/Cycles" ? 'active' : ''}><BsBicycle/></Link> 
      <Link to="/Vehicles" title="Vehicles" onClick={() => SetActiveNav('/Vehicles')} className={ActiveNav === "/Vehicles" ? 'active' : ''}><FaCar/></Link>
      <Link to="/Books_Notes" title="Books/Notes" onClick={() => SetActiveNav('/Books_Notes')} className={ActiveNav === "/Books_Notes" ? 'active' : ''}><ImBook/></Link>
      <Link to="/" title="Home" onClick={() => SetActiveNav('/')} className={ActiveNav === "/" ? 'active' : ''}><AiFillHome/></Link>
      <Link to="/Electronics" title="Electronics" onClick={() => SetActiveNav('/Electronics')} className={ActiveNav === "/Electronics" ? 'active' : ''}><MdOutlineComputer/></Link>
      <Link to="/Furniture" title="Furniture" onClick={() => SetActiveNav('/Furniture')} className={ActiveNav === "/Furniture" ? 'active' : ''}><MdChair/></Link>
      <Link to="/Misc" title="Miscellaneous" onClick={() => SetActiveNav('/Misc')} className={ActiveNav === "/Misc" ? 'active' : ''}><VscSymbolMisc/></Link>
    </nav>
  )
}

export default Nav