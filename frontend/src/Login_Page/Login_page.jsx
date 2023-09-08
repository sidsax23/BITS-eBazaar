import React,{useState, useEffect} from 'react'
import './Login_page.css'
import Logo from './Assets/Transparent_Logo.png'
import {Link} from 'react-router-dom'
import '../index.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


function Login_page(props) 
{
    let navigate = useNavigate()
    /* Storing Message */
    const [Message,setmessage] = useState("")

    /* Tracking states */
    const [user,Setuser] = useState({
        email:"",
        pass:"",
    })

 

    //Value of Message variable and the corresponding action depending on input 
    const [show,setshow] = useState(false)

    /* Saving entered values */
    const HandleChange  = e =>  /*When someone types, its an 'event', denoted and saved in 'e' here. e.target will return where and what the change was*/
    {    
        setshow(false)
        setmessage("")
        const {name,value} = e.target
        Setuser({
            ...user, /* Stores the value entered by the user in the respective state variable while the rest remain as their default values ("" in this case)*/
            [name]:value /* Depending on the name of the inputbar, its value is stored in the respective state variable*/
        })
    }

    const login = () => 
    {
        setshow(true)
        const {email,pass} = user
        if(!email)
        {
            setmessage("Please enter username (BITS email ID)")
        }
        else if(!pass)
        {
            setmessage("Please enter password")
        }
        else if(!email.endsWith("@pilani.bits-pilani.ac.in"))
        {
            setmessage("Please enter a valid BITS ID")
        }
        else
        {
            axios.post("http://localhost:8000/user/Login", user)
            .then(res=> {
                            setmessage(res.data.message)
                            props.setloginuser(res.data.user)
                            navigate("/Homepage",{replace:true})
                        })
        }
    }

    
    

    return (
        <div className='bg_image'>
        <center>
            <img src={Logo} alt="Logo" className="logo"/>
            <span className='central_title'>BITS e-Bazaar</span>
            <div className='login_box'>
            <h1 color='black'>LOGIN</h1>
            <form>
                <label>
                    Username : <input
                                     className='inputbar'
                                     name="email"
                                     pattern=".+@pilani.bits-pilani.ac.in"
                                     value={user.email} 
                                     onChange={HandleChange}
                                     type="email" 
                                     placeholder='Please enter your BITS Email ID'
                                />
                </label>         
                <label>
                    Password : <input 
                                     className='inputbar'
                                     name="pass" 
                                     value={user.pass} 
                                     onChange={HandleChange} 
                                     type="password"
                                     placeholder='Please enter password'
                                />
                </label>
                <div className="ErrorMsg">{show && Message!=="Login Successful" ? Message : ""}</div> {/*Only when show is true, Message will be shown. It is false by default and on change (wrt to any input bar it again becomes false). Becomes true on clicking the button*/}
                <center><div className='btn' onClick={login}>Login</div></center>
                <center>Don't have an account yet ? <Link to='/Sign_up'>Sign up</Link>
                <br/>
                <Link to='/Recover_pass'>Forgot password ?</Link></center>
            </form>

            </div>
        </center>
        </div>

    )
}

export default Login_page