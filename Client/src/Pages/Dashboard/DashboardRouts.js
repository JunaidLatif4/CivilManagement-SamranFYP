import React from "react";

// Assets | ICONS :
import { MdDashboard } from "react-icons/md"
import { FiUsers } from "react-icons/fi"
import { SiBloglovin } from "react-icons/si"
import { HiUserGroup } from "react-icons/hi"
import { AiOutlineFundProjectionScreen } from "react-icons/ai";

// Components :
import Home from "./Components/Home/Home";
import User from "./Components/Users/User";
import Projects from "./Components/Projects/Projects";
import EditProjectPage from "./Components/Projects/Component/EditProject/EditProjectPage";



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
    getSideBarData({ label: 'Projects', key: '/project', icon: <AiOutlineFundProjectionScreen />, element: <Projects /> }),
    getSideBarData({ label: 'EditProject', key: '/editproject', icon: <AiOutlineFundProjectionScreen />, element: <EditProjectPage /> }),
    // getSideBarData({ label: 'Blogs', key: '/blogs', icon: <SiBloglovin />, element: <Blogs /> }),
    // getSideBarData('Team', 'sub2', <TeamOutlined />, [getSideBarData('Team 1', '6'), getSideBarData('Team 2', '8')]),
];

export default routsList;