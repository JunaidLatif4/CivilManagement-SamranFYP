import React, { useState, useEffect } from 'react'

// MUI | ANT-D :
import { Button } from 'antd';

// Assets | Icons :
import { GrView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";

// Components :
import Table from "./Component/table/Table"
import AddNewProject from "./Component/AddProjectModal/NewProjectModal"
// API :
import { GetAllProjectsAPI } from '../../../../API/project';
// Helpers :
import { toast } from "react-toastify";

// CSS :
import "./Projects.scss";





const Projects = () => {

    const [allProjects, setAllProjects] = useState([])

    const [showAddProjectModal, setShowAddProjectModal] = useState(false)

    const [loading, setLoading] = useState(false)
    const [reload, setReload] = useState(false)


    const closeModal = () => {
        setShowAddProjectModal(false)
        setReload(!reload)
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (_, data) => `${data?.createAt}`,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (_, data) => `${data?.title}`,

        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Contractor',
            dataIndex: 'contractor',
            key: 'contractor',
        },
        {
            title: 'Constructor',
            dataIndex: 'constructor',
            key: 'constructor',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            key: 'action',
            align: "center",
            render: (_, data) => <>
                <div className="actionBox">
                    <div className="actionBtn">
                        <GrView className='icon cursor' />
                    </div>
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
            setAllProjects(res?.data?.data?.users || [])
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
        </>
    )
}

export default Projects