import React, { useState, useEffect } from 'react'

// MUI | ANT-D :
import { Button, Tag } from 'antd';

// Assets | Icons :
import { GrView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";

// Components :
import Table from "../table/Table"
import AddNewProject from "../AddProjectModal/NewProjectModal"
// API :
import { GetAllProjectsAPI } from '../../../../../../API/project';
// Helpers :
import { toast } from "react-toastify";

// CSS :
import "./AllProjects.scss";





const Projects = ({allProjects , setAllProjects  }) => {

    const [showAddProjectModal, setShowAddProjectModal] = useState(false)

    const [loading, setLoading] = useState(false)
    const [reload, setReload] = useState(false)


    const closeModal = () => {
        setShowAddProjectModal(false)
        setReload(!reload)
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
        </>
    )
}

export default Projects