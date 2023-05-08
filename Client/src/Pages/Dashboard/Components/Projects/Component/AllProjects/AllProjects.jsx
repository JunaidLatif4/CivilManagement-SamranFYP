import React, { useState, useEffect } from 'react'

// MUI | ANT-D :
import { Button, Tag, Modal, Tooltip } from 'antd';

// Assets | Icons :
import { GrView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { HiInformationCircle } from "react-icons/hi";

// Components :
import Table from "../table/Table"
import AddNewProject from "../AddProjectModal/NewProjectModal"

// API :
import { GetAllProjectsAPI, ProjectInviteResponseAPI } from '../../../../../../API/project';
// Redux :
import { useSelector } from 'react-redux';
// Helpers :
import { toast } from "react-toastify";

// CSS :
import "./AllProjects.scss";





const Projects = ({ allProjects, setAllProjects, currentPage, setCurrentPage, selectedProject, setSelectedProject }) => {
    let UserData = useSelector(state => state?.userData)

    const [showAddProjectModal, setShowAddProjectModal] = useState(false)
    const [showInviteModal, setShowInviteModal] = useState(false)

    const [loading, setLoading] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)
    const [reload, setReload] = useState(false)


    const viewProject = (data) => {
        setSelectedProject(data)
        setCurrentPage("view")
    }
    const viewInviteModal = (data) => {
        setSelectedProject(data)
        setShowInviteModal(true)
    }

    const closeModal = () => {
        setShowAddProjectModal(false)
        setShowInviteModal(false)
        setSelectedProject(null)
        setReload(!reload)
    }


    const handleInviteResponse = async (value) => {
        setBtnLoading(true)
        let res = await ProjectInviteResponseAPI({ projectId: selectedProject?._id, value })
        if (res.error != null) {
            toast.error(res.error)
        } else {
            toast.success(res.data.message)
            closeModal()
        }
        setBtnLoading(false)
    }



    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (_, data) => `${data?.createdAt?.slice(0, 10)}`,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (_, data) => `${data?.title}`,

        },
        // {
        //     title: 'Email',
        //     dataIndex: 'email',
        //     key: 'email',
        // },
        {
            title: 'Contractor',
            dataIndex: 'contractor',
            key: 'contractor',
            render: (_, data) => `${data.contractor.firstName} ${data.contractor.lastName}`
        },
        {
            title: 'Engineer',
            dataIndex: 'engineer',
            key: 'engineer',
            render: (_, data) => `${data.engineer.firstName} ${data.engineer.lastName}`
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_, data) => <Tag className='tableTag' color='purple'> {data?.status} </Tag>
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            key: 'action',
            align: "center",
            render: (_, data) => <>
                <div className="actionBox">
                    {
                        data?.status == "pending" ?
                            UserData?.role != "client" ?
                                <>
                                    <div className="actionBtn cursor" onClick={() => viewInviteModal(data)}>
                                        <HiInformationCircle className='icon' />
                                    </div>
                                </>
                                :
                                <Tooltip title={`ProjetInvitation is Pending By ${!data?.acceptedBy?.includes("client") ? "CLIENT" : ""} ${!data?.acceptedBy?.includes("contractor") ? "CONTRACTOR" : ""}`}>
                                    <div style={{ cursor: "no-drop" }} className="actionBtn cursor">
                                        <GrView className='icon' />
                                    </div>
                                </Tooltip>
                            :
                            <div className="actionBtn cursor" onClick={() => viewProject(data)}>
                                <GrView className='icon' />
                            </div>

                    }
                    <div className="actionBtn">
                        <MdDelete className='icon cursor' />
                    </div>
                </div>
            </>

        },

    ]


    const gettingAllProjects = async () => {
        setLoading(true)
        let res = await GetAllProjectsAPI()
        if (res.error != null) {
            toast.error(res.error);
        } else {
            setAllProjects(res?.data?.result || [])
        }
        setLoading(false)
    }
    useEffect(() => {
        gettingAllProjects()
    }, [reload])

    return (
        <>
            <div className="dashboardProjectContainer">
                <div className="flexLineSpace">
                    <div className="heading">
                        Projects
                    </div>
                    <Button className='greenBtn' style={{ width: "120px" }} onClick={() => setShowAddProjectModal(true)}> Add Project </Button>
                </div>
                <div className="table">
                    <Table
                        loading={loading}
                        rows={allProjects}
                        columns={columns}
                    />
                </div>
            </div>
            <AddNewProject openModal={showAddProjectModal} closeModal={closeModal} />
            <Modal
                open={showInviteModal}
                title={<><div className="heading">Project Invitation</div></>}
                onOk={() => handleInviteResponse("accept")}
                onCancel={closeModal}
                centered
                footer={[
                    <Button key="back" onClick={closeModal}>
                        Cancel
                    </Button>,
                    ...(
                        selectedProject?.acceptedBy?.includes(UserData?.role) ?
                            []
                            :
                            [
                                <Button style={{ backgroundColor: "red", color: "white" }} loading={btnLoading} onClick={() => handleInviteResponse("reject")}>
                                    Decline
                                </Button>,
                                <Button
                                    style={{ backgroundColor: "var(--themeColor)", color: "white" }}
                                    loading={btnLoading}
                                    onClick={() => handleInviteResponse("accept")}
                                >
                                    Accept
                                </Button>
                            ]
                    )
                ]}
            >
                <div className="flexLine">
                    <div className="subHeading">Project Name :- </div>
                    <p> {selectedProject?.title} </p>
                </div>
                <div className="flexLine">
                    <div className="subHeading">Invited By :- </div>
                    <p> {selectedProject?.client?.firstName} {selectedProject?.client?.lastName} </p>
                </div>
                <div className="flexLine">
                    <div className="subHeading">Pending From :- </div>
                    <p> {["client", "contractor"].map(val => selectedProject?.acceptedBy.includes(val) ? null : val).join(",")}  </p>
                </div>
                <div className="flexLine">
                    <div className="subHeading">Status :- </div>
                    <p> {selectedProject?.acceptedBy?.includes(UserData?.role) ? "Accepted" : "Pending"} </p>
                </div>
            </Modal>
        </>
    )
}

export default Projects