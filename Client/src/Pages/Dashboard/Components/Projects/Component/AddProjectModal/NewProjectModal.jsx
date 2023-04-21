import React from 'react'

// MUI | ANT-D :
import { Modal, Box } from '@mui/material';

// Assets | Icons :
import { AiFillCloseCircle } from "react-icons/ai"

// CSS :
import "./NewProjectModal.scss"




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
                        <div className="form"></div>
                    </div>
                </Box >
            </Modal >
        </>
    )
}

export default NewProjectModal