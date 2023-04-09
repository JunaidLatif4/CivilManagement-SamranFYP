import React, { useState, useEffect } from 'react'
// MUI | ANT-D :
import { Modal, Box, CircularProgress } from "@mui/material"
import { Switch } from 'antd';

// Assets | ICONS :
import { AiFillCloseCircle } from "react-icons/ai"


import { useNavigate } from 'react-router-dom';

// MUI | ANT-D :
import { Button, Input, Space, Select } from 'antd';

// API:
import { GetAllPermissionsAPI, CreateRoleAPI, UpdateRoleAPI } from '../../../../../../API/user';
// Helpers :
import { toast } from 'react-toastify';



// CSS :
import "./ShowPermissionModal.scss"
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
    borderColor: "var(--themeColorGreen)",
    height: "fit-content",
}







const ShowPermissionModal = ({ openModal, closeModel, selectedRole }) => {


    const [allPermissions, setAllPermissions] = useState([])
    const [loading, setLoading] = useState(false)
    const [rolesLoading, setRolesLoading] = useState(false)


    const [formData, setFormData] = useState({
        name: "",
        permissions: []
    });

    const enteringFormData = (event) => {
        let { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        })
    };
    const onSwitchChange = async (event) => {
        let { id, checked } = event;

        let process = allPermissions?.map((data) => {
            if (data?.id == id) {
                return {
                    ...data,
                    checked: checked
                }
            } else {
                return data
            }
        })
        await Promise.all(process)
        setAllPermissions(process)

        let updatedFormDataPermissions
        if (formData.permissions.includes(id)) {
            updatedFormDataPermissions = formData.permissions.filter(val => val != id)
        } else {
            updatedFormDataPermissions = [
                ...formData.permissions,
                id
            ]
        }

        setFormData({
            ...formData,
            permissions: updatedFormDataPermissions
        })

    }

    const submit = async () => {
        setLoading(true)

        let res
        if (selectedRole) {
            res = await UpdateRoleAPI({
                id: selectedRole?.id,
                name: formData.name,
                permissions: formData?.permissions
            })
        } else {
            res = await CreateRoleAPI({
                name: formData.name,
                permissions: formData?.permissions
            })
        }
        if (res?.error != null) {
            toast.error(res.error)
        } else {
            toast.success(res.data.message)
        }
        closeModel()
        setLoading(false)

    }

    useEffect(() => {
        if (selectedRole) {
            setFormData({
                name: selectedRole?.name,
                permissions: selectedRole?.permissions
            })
        } else {
            setFormData({
                name: "",
                permissions: []
            })
        }
    }, [])

    const gettingAllRoles = async () => {
        setRolesLoading(true)
        let res = await GetAllPermissionsAPI()
        if (res.error != null) {
            toast.error(res.error);
        } else {
            let rolesData = res?.data || null


            if (selectedRole) {
                let filteredPermissions = selectedRole?.permissions?.map(val => val?.id)
                await Promise.all(filteredPermissions)

                setFormData({
                    name: selectedRole?.name,
                    permissions: filteredPermissions
                })

                let process = allPermissions?.map((data) => {
                    if (filteredPermissions?.includes(data?.id)) {
                        return {
                            ...data,
                            checked: true
                        }
                    } else {
                        return {
                            ...data,
                            checked: false
                        }
                    }
                })

                await Promise.all(process)
                setAllPermissions(process)

            } else {
                setFormData({
                    name: "",
                    permissions: []
                })
                let process = rolesData?.data?.map((data) => {
                    return {
                        ...data,
                        checked: false
                    }
                })
                await Promise.all(process)
                setAllPermissions(process)
            }

        }
        setRolesLoading(false)
    }
    useEffect(() => {
        gettingAllRoles()
    }, [selectedRole, openModal])
    return (
        <>
            <Modal
                open={openModal}
                onClose={closeModel}
            >
                <Box sx={defaultStyle}>
                    <div className="close" onClick={closeModel}>
                        <AiFillCloseCircle className='icon' />
                    </div>
                    <div className="permissionsContainer">
                        <div className="heading"> {selectedRole ? "Edit Role" : "Create New Role"} </div>
                        <div className="permissions">
                            <input type="text" className='registerInput' placeholder='User' value={formData?.name} name="name" onChange={enteringFormData} />
                            <div className="heading">Permisson:</div>
                            {
                                rolesLoading ?
                                    <>
                                        <div className="progreesBox">
                                            <CircularProgress className='progress' />
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className="flexPermissions">
                                            {

                                                allPermissions.map((data, index) => {
                                                    return (
                                                        <div className="permission" key={data?.id}>
                                                            <Switch checked={data?.checked} onChange={(checked) => onSwitchChange({ checked, id: data?.id })} />
                                                            <div className="roles">{data.name}</div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </>
                            }

                            <div className="roleButton">
                                <Button className='greenButton' loading={loading} onClick={submit}>{selectedRole ? "UPDATE" : "SAVE"}</Button>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    )
}
export default ShowPermissionModal