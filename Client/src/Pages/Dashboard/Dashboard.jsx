import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'

// MUI | ANT-D :
import { Layout, Menu } from "antd"

// Asstets | ICONS :
import Logo from "../../Assets/Images/logo.png"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"

// Components :
import Navbar from '../../Components/Navbar/Navbar'

// Routes :
import RoutesList from "./DashboardRouts"
import { useSelector } from 'react-redux'
import { socket } from 'Utils/sockets'

// CSS :
import './Dashboard.scss';




const { Sider } = Layout;
const Dashboard = () => {
    const Navigate = useNavigate()
    const Location = useLocation()

    let selectedRoutes = [Location.pathname.split("/dashboard")[1] ? Location.pathname.split("/dashboard")[1] : "/"]
    let UserData = useSelector(state => state.userData)

    const [collapsed, setCollapsed] = useState(false);

    const handleMenuClick = (menu) => {
        let path = menu?.key;
        Navigate("/dashboard" + path)
    }

    useEffect(() => {
        socket.emit("joinUserRoom", UserData?._id);
        socket.emit("checkUnreadMessage", UserData?._id, UserData?.role);
        socket.on("unreadMessageStatus", (result) => {
            // setUnreadMessageDot(result);
        });
    }, []);

    useEffect(() => {
        socket.on("newMessage", () => {
            socket.emit("checkUnreadMessage", UserData?._id, UserData?.role);
        });
        socket.on("allMessageRead", () => {
            socket.emit("checkUnreadMessage", UserData?._id, UserData?.role);
        });
        socket.on("ping", () => {
            console.log("ping received");
            socket.emit("pong", { beat: 1 });
        });
    }, []);

    return (
        <>
            <Navbar />
            <div className="dashboardContainer">
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} width="250" className="sider" trigger={<> <div className="trig">{collapsed ? <FaAngleRight /> : <FaAngleLeft />}</div> </>}>
                    <div className="logoBox">
                        <img style={collapsed ? { width: "40px" } : {}} src={Logo} alt="ERROR" />
                    </div>
                    <Menu mode="inline" items={RoutesList} onClick={handleMenuClick} selectedKeys={selectedRoutes} />
                </Sider>
                <div className="rightContainer">
                    <Routes>
                        {
                            RoutesList && RoutesList.map((item) => {
                                return (
                                    <Route path={item.key} element={item.element} />
                                )
                            })
                        }
                    </Routes>
                </div>
            </div>
        </>
    )
}

export default Dashboard;