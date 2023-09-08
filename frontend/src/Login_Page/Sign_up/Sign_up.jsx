import React, {useState} from 'react'
import '../Login_page.css'
import Logo from '../Assets/Transparent_Logo.png'
import {Link} from 'react-router-dom'
import './Sign_up.css'
import axios from 'axios' //For calling API (to call Back-end)


function Sign_up() 
{
    // Message
    const [Message,setmessage] = useState("")
    const pattern= new RegExp("[6-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]")

    /* Tracking states */
    const [user,Setuser] = useState({
        name:"",
        email:"",
        password:"",
        pass_copy:"",
        dept:"",
        phone_num:"",
        address:"",
    })

    //Value of Message variable and the corresponding action depending on input 
    const [show,setshow] = useState(false)

    /* Saving entered values */
    const HandleChange  = e => /*When someone types, its an 'event', denoted and saved in 'e' here. e.target will return where and what the change was*/
    {    
        setshow(false) /*Error Message (i.e. var Message) and show are reset everytime we modify any inputbar */
        setmessage("")
        const {name,value} = e.target
        Setuser({
            ...user, /* Stores the value entered by the user in the respective state variable while the rest remain as their default values ("" in this case)*/
            [name]:value /* Depending on the name of the inputbar, its value is stored in the respective state variable*/
        })

    }


    const SignUp = () => 
    {
        setshow(true)
        const {name,email,password,pass_copy,dept,phone_num,address} = user
        if(!name)
        {
            setmessage("Please enter your name")
        } 
        else if(!email)
        {
            setmessage("Please enter username (BITS email ID)")
        }
        else if(!password)
        {
            setmessage("Please enter password")
        }
        else if(!pass_copy)
        {
            setmessage("Please re-enter password")
        }
        else if(!dept)
        {
            setmessage("Please choose your department")
        }
        else if(!phone_num)
        {
            setmessage("Please enter your phone number")
        }
        else if(!address)
        {
            setmessage("Please enter your address")
        }
        else if(!pattern.test(phone_num))
        {
            setmessage("Please enter a valid phone number")
        }
        else if(!email.endsWith("@pilani.bits-pilani.ac.in"))
        {
            setmessage("Please enter a valid BITS Email ID")
        }
        else if(password!==pass_copy)
        {
            setmessage("Both passwords must match")
        }
        else
        {
           axios.post("http://localhost:8000/user/Sign_up", user)
           .then(res => {setmessage(res.data.message)})
        }


    }


    return (
        /*Parent div (REACT returns only 1 parent div) */
        <div className='bg_image'>
        <center>
            <img src={Logo} alt="Logo" width="200rem" className="logo"/>
            <span className='central_title'>BITS e-Bazaar</span>
        <div className='login_box'>
        <h1>Please Enter Details</h1>
        <form> 
            <label>
                Name : <input 
                            type="text" 
                            name="name" 
                            value={user.name} 
                            onChange={HandleChange} 
                            className="inputbar" 
                            placeholder='Please enter your full name'
                        />
            </label> 
            <label> 
                Username : <input 
                                type="email" 
                                name="email" 
                                pattern=".+@pilani.bits-pilani.ac.in"
                                value={user.email} 
                                onChange={HandleChange} 
                                className="inputbar" 
                                placeholder='Please enter your BITS Email ID'
                            />
            </label>         
            <label>
                Password : <input 
                                type="text" 
                                name="password" 
                                value={user.password} 
                                onChange={HandleChange} 
                                className="inputbar" 
                                placeholder='Please enter password'
                            />
            </label>
            <label>
                Repeat Password : <input 
                                        type="password" 
                                        name="pass_copy" 
                                        value={user.pass_copy} 
                                        onChange={HandleChange} 
                                        className="inputbar" 
                                        placeholder='Please re-enter the same password'
                                    />
            </label>
            <label>
                Department : <br/> 
                            <select name="dept" value={user.dept} onChange={HandleChange} className='inputbar'> 
                                <option value="Biological Sciences" >Biological Sciences</option>
                                <option value="Chemical Engineering">Chemical Engineering</option>
                                <option value="Chemistry">Chemistry</option>
                                <option value="Civil Engineering">Civil Engineering</option>
                                <option value="Computer Science and Information Systems">Computer Science & Information Systems</option>
                                <option value="Economics and Finance">Economics and Finance</option>
                                <option value="Electrical and Electronics Engineering">Electrical & Electronics Engineering</option>
                                <option value="Humanities and Social Sciences">Humanities & Social Sciences</option>
                                <option value="Mathematics">Mathematics</option>
                                <option value="Mechanical Engineering">Mechanical Engineering</option>
                                <option value="Pharmacy">Pharmacy</option>
                                <option value="Physics">Physics</option>
                            </select>
            </label> 
            <label>
                Phone Number : <input 
                            type="text" 
                            name="phone_num" 
                            value={user.phone_num} 
                            onChange={HandleChange} 
                            className="inputbar" 
                            placeholder='Please enter your phone number'
                        />
            </label> 
            <label>
                Address : <br/>
                        <textarea  
                            name="address" 
                            value={user.address} 
                            rows="6"
                            onChange={HandleChange} 
                            className="inputbar_large" 
                            placeholder='Please enter your address'
                        />
            </label> 
            <center>Please note that you CANNOT EDIT your email and department later on.</center>
            <br/>
            <div className="ErrorMsg">{show && Message!=="Account Successfully Created" ? Message : ""}</div> {/*Only when show is true, Message will be shown. It is false by default and on change (wrt to any input bar it again becomes false). Becomes true on clicking the button*/}
            <div className="SuccessMsg">{show && Message==="Account Successfully Created" ? Message : ""}</div>
            <center><div className='btn' onClick={SignUp}>Create Account</div></center>
            <center><div>Already have an account ? <Link to='/Login'>Login</Link></div></center>
        </form>
        </div>
        </center>
        </div>
    
    )
}

export default Sign_up