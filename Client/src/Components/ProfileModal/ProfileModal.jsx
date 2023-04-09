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
import { GetAllRolesAPI, CreateUserAPI, UpdateUserAPI } from '../../API/user';
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

    const [allRoles, setAllRoles] = useState([])
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        roles: undefined,
        password: "",
        confirmPassword: ""
    });
    const [selectedRole, setSelectedRole] = useState(null)
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
            roles: value
        })
        setSelectedRole(value)
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

        let res
        if (selectedUser) {
            res = await UpdateUserAPI({
                id: selectedUser?.id,
                firstName: formData.firstName,
                lastName: formData.lastName,
                phone: formData.phone,
                password: formData.password,
                password_confirmation: formData.confirmPassword,
                roles: formData.roles
            })
        } else {
            let fData = new FormData()
            Object.keys(formData).map((key) => {
                fData.append(key, formData[key])
            })
            fData.append("avatar", file)
            fData.append("type", "0")

            res = await CreateUserAPI(fData)
        }

        if (res.error != null) {
            toast.error(res.error);
        } else {
            toast.success(res.data.message);
        }
        closeModal()
        setloading(false)
    }

    useEffect(() => {
        if (selectedUser) {
            setFormData({
                firstName: selectedUser?.firstName,
                lastName: selectedUser?.lastName,
                email: selectedUser?.email,
                phone: selectedUser?.phone,
                type: selectedUser?.type,
                roles: selectedUser?.roles[0]?.id,
            })
            setSelectedRole(selectedUser?.roles[0]?.id)

            setFile(null)
            setImageUrl(null)
        } else {
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                roles: undefined,
                password: "",
                confirmPassword: ""
            })
            setFile(null)
            setImageUrl(null)
        }
    }, [selectedUser, openModal])

    const gettingAllRoles = async () => {
        let res = await GetAllRolesAPI()
        if (res.error != null) {
            toast.error(res.error);
        } else {
            let rolesData = res?.data?.data || null
            let process = rolesData?.roles?.map((role) => {
                return {
                    label: role?.name,
                    value: role?.id
                }
            })
            await Promise.all(process)
            setAllRoles(process)
        }
    }
    useEffect(() => {
        gettingAllRoles()
    }, [])
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
                                        !selectedUser &&
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
                                        <input className='registerInput' type="text" placeholder='First Name' name="firstName" onChange={enteringFormData} value={formData?.firstName} />
                                        <input className='registerInput' type="text" placeholder='Last Name' name="lastName" onChange={enteringFormData} value={formData?.lastName} />
                                    </div>
                                    <input className='registerInput' type="email" placeholder='Email' name="email" onChange={enteringFormData} value={formData?.email} disabled={selectedUser ? true : false} />
                                    <input className='registerInput' type="text" placeholder='Phone Number' name="phone" onChange={enteringFormData} value={formData?.phone} />
                                    {!isprofile && selectedUser && <input className='registerInput' type="text" placeholder='Type' name="type" onChange={enteringFormData} value={formData?.type} disabled={selectedUser ? true : false} />}
                                    <div className="fields">
                                        <Select
                                            disabled={isprofile ? true : false}
                                            onChange={handleSelectChange}
                                            value={selectedRole}
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