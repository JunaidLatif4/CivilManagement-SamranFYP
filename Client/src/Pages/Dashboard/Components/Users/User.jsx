import React, { useEffect, useState } from 'react'

// MUI | ANT-D :
import { Button } from 'antd';

// Components :
import Table from './Component/table/Table'
import ProfileModal from "../../../../Components/ProfileModal/ProfileModal"

// Assets | ICONS :
import Avater from "../../../../Assets/Images/profile.jpg";
import { RiEdit2Fill } from 'react-icons/ri';
import { BiShow } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';

// API :
import { GetAllUsersAPI } from '../../../../API/user'
// Helpers :
import { toast } from "react-toastify";

// CSS :
import './Users.scss'





const User = () => {

    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [loading, setLoading] = useState(false)

    const [selectedUser, setSelectedUser] = useState(null)
    const [showProfileModal, setShowProfileModal] = useState(false)
    const [reload, setReload] = useState(false)


    const openProfileModal = (data) => {
        if (data) {
            setSelectedUser(data)
        } else {
            setSelectedUser(null)
        }
        setShowProfileModal(true)
    }
    const closeProfileModal = () => {
        setShowProfileModal(false)
        setSelectedUser(null)
        setReload(!reload)
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (_, data) => <> <div className="avaterBox"> <img src={Avater} alt="ERROR" /> </div> </>
        },
        {
            title: 'Name',
            dataIndex: 'firstName',
            key: 'firstName',
            render: (_, data) => `${data?.firstName} ${data.lastName}`,
            sorter: (a, b) => a.firstName.localeCompare(b.firstName),

        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Role',
            dataIndex: 'type',
            key: 'type',
            sorter: (c, d) => c.type.localeCompare(d.type)
        },
        // {
        //     title: 'Status',
        //     dataIndex: 'state',
        //     key: 'state',
        //     render:(_,data) => console.log("**********************" , data),
        //     // sorter: (c, d) => c.role.localeCompare(d.role)
        // },
        {
            title: 'Actions',
            dataIndex: 'action',
            key: 'action',
            align:"center",
            render: (_, data) => <>
                <div className="actionBox">
                    <div className="actionBtn">
                        <RiEdit2Fill className='icon cursor' onClick={() => openProfileModal(data)} />
                    </div>
                    {/* <div className="actionBtn">
                        <MdDelete className='icon cursor' />
                    </div> */}
                </div>
            </>

        },

    ]


    const gettingAllUsers = async () => {
        setLoading(true)
        let res = await GetAllUsersAPI()
        if (res.error != null) {
            toast.error(res.error);
        } else {
            setData(res?.data?.data?.users || [])
            setFilteredData(res?.data?.data?.users || [])
        }
        setLoading(false)
    }
    useEffect(() => {
        gettingAllUsers()
    }, [reload])

    const searchHandler = (event) => {
        let filteredData = data.filter((a) =>
            a.name?.toLowerCase()?.includes(event) ||
            a.email?.toLowerCase()?.includes(event)
        )

        setFilteredData(filteredData)
    }

    return (

        <>
            <div className="dashboardUsersContainer">
                <div className="flexLineSpace">
                    <div className="heading">
                        Users
                    </div>
                    <Button className='greenBtn' style={{ width: "120px" }} onClick={() => openProfileModal(null)}> Add User </Button>
                </div>
                <div className="table">
                    <Table
                        loading={loading}
                        rows={filteredData}
                        columns={columns}
                        hasSearch
                        searchHandler={searchHandler}
                    />
                </div>
            </div>
            <ProfileModal openModal={showProfileModal} selectedUser={selectedUser} closeModal={closeProfileModal} />
        </>
    )
}

export default User;