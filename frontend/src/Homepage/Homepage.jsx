import react from 'react'
import './Homepage.css'
import Navbar from '../Navigation_Bar/Nav_bar.jsx'
import Header from '../Header/header.jsx'

const Homepage = (props) => 
{
    return(
        <div>
            <Header login_state={props}/>
            <center>
                <div className='lander'>
                    <h1>Welcome to BITS e-Bazaar!</h1>
                    <br/>
                    <p>
                        BITS e-Bazaar is an online portal to enable the purchasing and/or selling of old or new goods 
                        of various categories including cycles, books/notes, electronics, furniture and more within the BITS Pilani 
                        campus by its residents. 
                   </p>
                    <br/>
                    <h2> HAPPY SHOPPING! </h2>
                </div>
            </center>
            <Navbar active_state='/'/>
        </div>
    )
}

export default Homepage