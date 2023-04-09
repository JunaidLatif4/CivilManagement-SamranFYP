import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import { FaFacebookF } from 'react-icons/fa';

// MUI | ANT-D :
import { Button, Input, Space, Select } from 'antd';

// Assets | ICONS :
import logo from '../../../Assets/Images/logo-old.png'
import MadrasaImage from '../../../Assets/Images/loginLogo.png'
import Google from '../../../Assets/Images/google.svg';

// API:
import { RegisterAPI } from '../../../API/auth';
// Helpers :
import { toast } from 'react-toastify';

// CSS :
import './Register.scss'





const Register = () => {
    const Navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        role: null,
        password: "",
        confirmPassword: ""
    });
    const [loading, setloading] = useState(false);

    const enteringFormData = (event) => {
        let { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        })
    };
    const handleSelectChange = (value) => {
        setFormData({
            ...formData,
            role: value
        })
    };

    const handleRegister = async () => {
        setloading(true)
        let res = await RegisterAPI({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            type: formData.role,
            password: formData.password,
            password_confirmation: formData.confirmPassword
        })
        if (res.error != null) {
            toast.error(res.error);
        } else {
            toast.success(res.data.message);
            setTimeout(() => {
                Navigate("/login")
            }, 2000);
        }
        setloading(false)
    }

    const signInFun = () => {
        Navigate('/login')
    }

    return (
        <>
            <div className='registerContainer'>
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
                        <Fade left>
                        <div className="content">
                            <div className="heading">A few more clicks to sign in to your account.
                            </div>
                            <p className="para">Manage all your Projects in one place</p>
                        </div>
                        </Fade>
                    </div>
                </div>
                <div className="rightSection">
                    <Zoom>
                    <form action="users" method='post'>
                        <div className="wrapContainer">
                            <div className="heading">Sign Up</div>
                            <p className="para">A few more clicks to sign in to your account. Manage all your e-commerce accounts in one place</p>
                            <div className="flexFields">
                                <div className="fields">
                                    <input className='registerInput' type="text" placeholder='First Name' name="firstName" onChange={enteringFormData} value={formData.firstName} />
                                    <input className='registerInput' type="text" placeholder='Last Name' name="lastName" onChange={enteringFormData} value={formData.lastName} />
                                </div>
                                <input className='registerInput' type="email" placeholder='Email' name="email" onChange={enteringFormData} value={formData.email} />
                                <input className='registerInput' type="text" placeholder='Phone Number' name="phone" onChange={enteringFormData} value={formData.phone} />
                                <div className="fields">
                                    <Select
                                        onChange={handleSelectChange}
                                        value={formData.role}
                                        placeholder="Select Role"
                                        options={[
                                            {
                                                label: 'Client',
                                                value: 'Client'
                                            },
                                            {
                                                label: 'Contractor',
                                                value: 'Contractor'
                                            },
                                            {
                                                label: 'Engineer',
                                                value: 'Engineer'
                                            },
                                        ]}
                                    />
                                </div>
                                <div className="fields">
                                    <Space direction="vertical">
                                        <Input.Password placeholder="Enter Password" name='password' onChange={enteringFormData} value={formData.password} />
                                    </Space>
                                    <Space direction="vertical">
                                        <Input.Password placeholder="Confirm Password" name='confirmPassword' onChange={enteringFormData} value={formData.confirmPassword} />
                                    </Space>
                                </div>
                                <div className="registerButton">
                                    <Button className='register' loading={loading} onClick={handleRegister} >Register</Button>
                                    <p>Already have an account? <a className='signin cursor' onClick={signInFun}>Sign In</a> </p>
                                </div>
                            </div>
                            <div className="authButton">
                                <div className="google cursor"><img src={Google} alt="" /> Sign in with Google</div>
                                <div className="fb cursor"><FaFacebookF style={{color:"#fff",fontSize:"20px"}}/> Sign in with Facebook</div>
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

export default Register
