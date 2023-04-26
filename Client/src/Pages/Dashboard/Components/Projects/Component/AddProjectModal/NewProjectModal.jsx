import React, { useEffect, useState } from 'react'

// MUI | ANT-D :
import { Modal, Box, Autocomplete, TextField } from '@mui/material';
import { Input, Button } from 'antd';

// Assets | Icons :
import { AiFillCloseCircle } from "react-icons/ai"

// CSS :
import "./NewProjectModal.scss"
import { GetAllContractorsAPI, GetAllEnginnersAPI } from '../../../../../../API/user';
import { CreatProjectAPI } from '../../../../../../API/project';
import { toast } from 'react-toastify';




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
const NewProjectModal = ({ openModal, closeModal }) => {

    const [allContractors, setAllContractors] = useState([])
    const [allEngineers, setAllEngineers] = useState([])
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        contractor: null,
        engineer: null
    })

    const handleInputChange = (event) => {
        let { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        })
    }
    const handleAutoCompleteChange = (value, name) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }


    const saveProject = async () => {
        let data = {
            ...formData,
            contractor: formData.contractor?._id,
            engineer: formData.engineer?._id
        }

        const res = await CreatProjectAPI(data)
        if (res.error != null) {
            toast.error(res.error.message)
        } else {
            toast.success(res.data.message)
            closeModal()
        }

    }

    const gettingAllContractors = async () => {
        const res = await GetAllContractorsAPI()
        if (res.error == null) {
            setAllContractors(res.data?.result || [])
        }
    }
    const gettingAllEnginners = async () => {
        const res = await GetAllEnginnersAPI()
        if (res.error == null) {
            setAllEngineers(res.data?.result || [])
        }
    }
    useEffect(() => {
        gettingAllContractors()
        gettingAllEnginners()
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
                    <div className="dashboardNewProjectModalContainer">
                        <div className="subHeading">
                            Add New Project
                        </div>
                        <div className="form">
                            <div className="inputBox">
                                <div className="name">Title</div>
                                <Input name='title' value={formData.title} onChange={handleInputChange} />
                            </div>
                            <div className="inputBox">
                                <div className="name">Description</div>
                                <Input.TextArea name='description' value={formData.description} onChange={handleInputChange} />
                            </div>
                            <div className="inputBox">
                                <div className="name">Contractor</div>
                                <Autocomplete
                                    id="tags-standard"
                                    sx={{
                                        // backgroundColor: "#EDEDED",
                                        border: "1px solid gray",
                                        margin: ".4rem 0 .5rem 0",
                                        padding: ".4rem",
                                        borderRadius: "5px",
                                        "& .MuiInputBase-root:before": {
                                            borderBottom: "none"
                                        },
                                        "& .MuiInputBase-root:after": {
                                            borderBottom: "none"
                                        },
                                        "& .MuiInput-underline::before": {
                                            opacity: "0"
                                        },
                                        "& .MuiSvgIcon-root": {
                                            opacity: "0"
                                        },
                                        "& .MuiChip-root": {
                                            borderRadius: ".3rem",
                                            padding: "0",
                                            backgroundColor: "#fafafa",
                                            border: "1px solid #e8e8e8",
                                            height: "30px",
                                            "& .MuiSvgIcon-root": {
                                                opacity: "1",
                                                backgroundColor: "none"
                                            }
                                        }
                                    }}
                                    // limitTags={2}
                                    // multiple
                                    value={formData.contractor}
                                    options={allContractors}
                                    getOptionLabel={(option) => option?.firstName}
                                    onChange={(event, newVal) => handleAutoCompleteChange(newVal, "contractor")}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            placeholder={"Select a Contractor"}
                                        />
                                    )}
                                />
                            </div>
                            <div className="inputBox">
                                <div className="name">Enginner</div>
                                <Autocomplete
                                    id="tags-standard"
                                    sx={{
                                        // backgroundColor: "#EDEDED",
                                        border: "1px solid gray",
                                        margin: ".4rem 0 .5rem 0",
                                        padding: ".4rem",
                                        borderRadius: "5px",
                                        "& .MuiInputBase-root:before": {
                                            borderBottom: "none"
                                        },
                                        "& .MuiInputBase-root:after": {
                                            borderBottom: "none"
                                        },
                                        "& .MuiInput-underline::before": {
                                            opacity: "0"
                                        },
                                        "& .MuiSvgIcon-root": {
                                            opacity: "0"
                                        },
                                        "& .MuiChip-root": {
                                            borderRadius: ".3rem",
                                            padding: "0",
                                            backgroundColor: "#fafafa",
                                            border: "1px solid #e8e8e8",
                                            height: "30px",
                                            "& .MuiSvgIcon-root": {
                                                opacity: "1",
                                                backgroundColor: "none"
                                            }
                                        }
                                    }}
                                    // limitTags={2}
                                    // multiple
                                    value={formData.engineer}
                                    options={allEngineers}
                                    getOptionLabel={(option) => option?.firstName}
                                    onChange={(event, newVal) => handleAutoCompleteChange(newVal, "engineer")}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            placeholder={"Select a Engineer"}
                                        />
                                    )}
                                />
                            </div>
                            <Button className='greenBtn' onClick={saveProject}> Create </Button>
                        </div>
                    </div>
                </Box >
            </Modal >
        </>
    )
}

export default NewProjectModal