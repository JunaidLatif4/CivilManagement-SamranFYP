import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import { FaFacebookF } from 'react-icons/fa';



// MUI | ANT-D :
import { Button, Input, Space } from 'antd';

// Assets | ICONS :
import logo from '../../../Assets/Images/logo-old.png';
import MadrasaImage from '../../../Assets/Images/loginLogo.png';
import Google from '../../../Assets/Images/google.svg';

// Redux :
import { useDispatch } from "react-redux";
import { userDataActions } from "../../../Redux/Slice/userData"

// API :
import { LoginAPI } from "../../../API/auth";
// helpers :
import { toast } from 'react-toastify';

// CSS :
import "./Login.scss";





const Login = () => {
    const Navigate = useNavigate();
    const Dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [loading, setloading] = useState(false);

    const enteringFormData = (event) => {
        let { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        })
    };

    const handleLogin = async () => {
        setloading(true)
        let res = await LoginAPI({ email: formData.email, password: formData.password })
        if (res.error != null) {
            toast.error(res.error);
        } else {
            toast.success(res.data.message);
            Dispatch(userDataActions.setUserData(res?.data?.data))
            let token = res?.data?.data?.token?.plainTextToken
            localStorage.setItem("madrasaToken", token)
            localStorage.setItem("madrasaUserData", JSON.stringify(res?.data?.data))
            setTimeout(() => {
                window.location.href = "/"
            }, 500);
        }
        setloading(false)
    }

    const registerFun = () => {
        Navigate('/register')
    }

    return (
        <>
            <div className='loginContainer'>
                <div className="leftSection">
                    <div className="loginBio">
                        <div className="logo">
                            <Fade left>
                                <img src={logo} alt="" />
                            </Fade>
                        </div>
                        <div className="madrasaLogo">
                            <Fade left>
                                <img src={MadrasaImage} alt="" />
                            </Fade>
                        </div>
                        <div className="content">
                            <Fade left>
                                <div className="heading">A few more clicks to sign in to your account.</div>
                            </Fade>
                            <Fade left>
                                <p className="para">Manage all your e-commerce accounts in one place</p>

                            </Fade>
                        </div>
                    </div>
                </div>
                <div className="rightSection">
                    <Zoom>
                        <form action="users" method='post'>
                            <div className="wrapContainer">
                                <div className="heading">Sign In</div>
                                <p className="para">A few more clicks to sign in to your account. Manage all your e-commerce accounts in one place</p>
                                <div className="flexFields">
                                    <input className='loginInput' type="text" placeholder='Email' name="email" onChange={enteringFormData} value={formData.email} />
                                    <Space direction="vertical">
                                        <Input.Password
                                            placeholder="Password"
                                            name='password'
                                            onChange={enteringFormData}
                                            value={formData.password}
                                            rules={[{ required: true, message: 'Please input your username!' }]}
                                        />
                                    </Space>
                                    <div className="rememberMe">
                                        <div className="checkbox cursor">
                                            <input type="checkbox" />
                                            <p>Remember me</p>
                                        </div>
                                        <p className='cursor'>Forgot Password?</p>
                                    </div>
                                    <div className="loginButton">
                                        <Button loading={loading} className='login' onClick={handleLogin}>Login</Button>
                                        <p>Create an account? <a className='signup cursor' onClick={registerFun}>Register</a> </p>
                                    </div>
                                </div>
                                <div className="authButton">
                                    <div className="google cursor"><img src={Google} alt="" /> Sign in with Google</div>
                                    <div className="fb cursor"><FaFacebookF style={{ color: "#fff", fontSize: "20px" }} /> Sign in with Facebook</div>
                                </div>
                                <p className='terms'>By signin up, you agree to our <a>Terms and Conditions</a> & <a>Privacy Policy</a></p>
                            </div>
                        </form>
                    </Zoom>
                </div>
            </div>
        </>
    )
}

export default Login