import React from "react";

// Assets | ICONS :
import { MdDashboard } from "react-icons/md"
import { FiUsers } from "react-icons/fi"
import { SiBloglovin } from "react-icons/si"
import { HiUserGroup } from "react-icons/hi"

// Components :
import Home from "./Components/Home/Home";
import User from "./Components/Users/User";
import Blogs from "./Components/Blogs/Blogs";
import Roles from "./Components/Roles/Roles";



const getSideBarData = ({ label, key, icon, children, element }) => {
    return {
        key,
        icon,
        children,
        label,
        element
    };
}

const routsList = [
    getSideBarData({ label: 'Dashboard', key: '/', icon: <MdDashboard />, element: <Home /> }),
    getSideBarData({ label: 'Users', key: '/users', icon: <FiUsers />, element: <User /> }),
    getSideBarData({ label: 'Roles', key: '/roles', icon: <HiUserGroup />, element: <Roles /> }),
    // getSideBarData({ label: 'Blogs', key: '/blogs', icon: <SiBloglovin />, element: <Blogs /> }),
    // getSideBarData('Team', 'sub2', <TeamOutlined />, [getSideBarData('Team 1', '6'), getSideBarData('Team 2', '8')]),
];

export default routsList;