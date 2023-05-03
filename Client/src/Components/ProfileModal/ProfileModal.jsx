import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

// MUI | ANT-D :
import { Modal, Box } from "@mui/material"
import { Button, Input, Space, Select, message, Upload } from 'antd';

// Assets | ICONS :
import { AiFillCloseCircle } from "react-icons/ai"
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { ReactComponent as Down } from '../../Assets/Post/down.svg'
// API:
import { GetAllRolesAPI, CreateUserAPI, UpdateUserAPI, UpdateProfileAPI } from '../../API/user';
// Helpers :
import { toast } from 'react-toastify';

// CSS :
import "./ProfileModal.scss"





const defaultStyle = {
    position: 'absolute',
    top: '10%',
    left: '20%',
    right: '20%',
    bottom: '20%',
    // transform: 'translate(-50%, -50%)',
    // width: 350,
    // height: 540,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: ".5rem",
    py: 2,
    px: 2,
    zIndex: "500",
    borderColor: "var(--themeColorGreen)",
    height: "fit-content"

}
const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};
const ProfileModal = ({ openModal, closeModal, selectedUser, isprofile }) => {

    const [allRoles, setAllRoles] = useState([{ label: "Client", value: "client" }, { label: "Contractor", value: "contractor" }, { label: "Engineer", value: "engineer" }])
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        role: undefined,
        password: "",
        confirmPassword: ""
    });
    const [loading, setloading] = useState(false);

    const [imageUrl, setImageUrl] = useState(null);
    const [file, setFile] = useState(null)

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
    const handleUploadChange = (info) => {
        getBase64(info.file.originFileObj, (url) => {
            setImageUrl(url);
        });

        setFile(info?.file?.originFileObj || null)
    };
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );



    const handleRegister = async () => {
        setloading(true)


        if (formData.password) {
            if (formData.password <= 7) {
                toast.error("Password Must more than 7 characters")
                setloading(false)
                return
            } else if (formData.password != formData.confirmPassword) {
                toast.error("Confirm Password doesn't match")
                setloading(false)
                return
            }
        }

        let fData = new FormData()
        Object.keys(formData).map((key) => {
            if (key == "role") {
                fData.append(key, formData[key]?.value)
            } else {
                fData.append(key, formData[key])
            }
        })
        if (file) {
            fData.append("file", file)
        }

        let res
        if (selectedUser) {
            res = await UpdateProfileAPI(fData)
        } else {
            res = await CreateUserAPI(fData)
        }

        if (res.error != null) {
            toast.error(res.error);
        } else {
            toast.success(res.data.message);
        }
        closeModal(true)
        setloading(false)
    }

    useEffect(() => {
        if (selectedUser) {
            const filterRole = allRoles.find(val => val.value == selectedUser?.role)
            setFormData({
                firstName: selectedUser?.firstName,
                lastName: selectedUser?.lastName,
                email: selectedUser?.email,
                phone: selectedUser?.phone,
                role: filterRole ?? null,
            })

            setFile(null)
            setImageUrl(`${window.location?.customURL}/${selectedUser?.profileImage?.url}` || null)
        } else {
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                role: undefined,
                password: "",
                confirmPassword: ""
            })
            setFile(null)
            setImageUrl(null)
        }
    }, [selectedUser, openModal])


    return (
        <>
            <Modal
                open={openModal}
                onClose={closeModal}
            >
                <Box sx={defaultStyle}>
                    <div className="close" onClick={closeModal}>
                        <AiFillCloseCircle className='icon' />
                    </div>
                    <div className='profileContainer'>
                        <div autoComplete='off'>
                            <div className="wrapContainer">
                                <div className="heading">{isprofile ? "Edit Profile" : selectedUser ? "Edit User" : "Create User"} </div>
                                <div className="flexFields">
                                    {
                                        selectedUser &&
                                        <Upload
                                            listType="picture-card"
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            beforeUpload={beforeUpload}
                                            onChange={handleUploadChange}
                                        >
                                            {imageUrl ? (
                                                <div className="imgBox">
                                                    <img
                                                        src={imageUrl}
                                                        alt="avatar"
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                    />
                                                </div>
                                            ) : (
                                                uploadButton
                                            )}
                                        </Upload>
                                    }
                                    <div className="fields">
                                        <Input className='registerInput' type="text" placeholder='First Name' name="firstName" onChange={enteringFormData} value={formData?.firstName} />
                                        <Input className='registerInput' type="text" placeholder='Last Name' name="lastName" onChange={enteringFormData} value={formData?.lastName} />
                                    </div>
                                    <Input className='registerInput' type="email" placeholder='Email' name="email" onChange={enteringFormData} value={formData?.email} disabled={selectedUser ? true : false} />
                                    <Input className='registerInput' type="text" placeholder='Phone Number' name="phone" onChange={enteringFormData} value={formData?.phone} />
                                    {!isprofile && selectedUser && <input className='registerInput' type="text" placeholder='Type' name="type" onChange={enteringFormData} value={formData?.type} disabled={selectedUser ? true : false} />}
                                    <div className="fields">
                                        <Select
                                            disabled={isprofile ? true : false}
                                            onChange={handleSelectChange}
                                            value={formData.role}
                                            dropdownStyle={{ zIndex: "5000" }}
                                            placeholder="Select Role"
                                            options={allRoles}
                                        />
                                    </div>
                                    {
                                        (isprofile || !selectedUser) &&
                                        <div className="fields">
                                            <Space direction="vertical">
                                                <Input.Password placeholder="Enter Password" name='password' onChange={enteringFormData} value={formData?.password} />
                                            </Space>
                                            <Space direction="vertical">
                                                <Input.Password placeholder="Confirm Password" name='confirmPassword' onChange={enteringFormData} value={formData?.confirmPassword} />
                                            </Space>
                                        </div>
                                    }
                                    <div className="registerButton">
                                        <Button className='register' loading={loading} onClick={handleRegister} > {selectedUser ? "UPDATE" : "CREATE"} </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    )
}
export default ProfileModal