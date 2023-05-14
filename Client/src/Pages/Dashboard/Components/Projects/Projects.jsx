import React, { useState, useEffect } from 'react';

// MUI | ANT-D :
import { Button, Tag } from 'antd';

// Assets | Icons :
import { GrView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";

// Components :
import Table from "./Component/table/Table";
import AddNewProject from "./Component/AddProjectModal/NewProjectModal";
import AllProject from "./Component/AllProjects/AllProjects";
import ViewProjectPage from "./Component/ViewProject/ViewProjectPage";
import ChatApp from "../ChatApp/index";
import PDFPrint from "./Component/PDFPrint/Print";

// API :
import { GetAllProjectsAPI } from '../../../../API/project';
// Helpers :
import { toast } from "react-toastify";

// CSS :
import "./Projects.scss";





const Projects = () => {

    const [allProjects, setAllProjects] = useState([])
    const [currentPage, setCurrentPage] = useState("all")
    const [selectedProject, setSelectedProject] = useState(null)


    const closeModel = () => {
        setCurrentPage("all")
        setSelectedProject(null)

    }

    return (
        <>
            <div className="dashboardProjectContainer">
                {
                    currentPage == "all" ?
                        <AllProject allProjects={allProjects} setAllProjects={setAllProjects} currentPage={currentPage} setCurrentPage={setCurrentPage} selectedProject={selectedProject} setSelectedProject={setSelectedProject} />
                        : currentPage == "chat" ?
                            <ChatApp openModal={currentPage == "chat" ? true : false} selectProject={selectedProject} closeModal={closeModel} />
                            : currentPage == "view" ?
                                <ViewProjectPage selectedProject={selectedProject} setCurrentPage={setCurrentPage} currentPage={currentPage} closeViewPage={closeModel} />
                                : currentPage == "print" ?
                                    <PDFPrint selectedProject={selectedProject} setCurrentPage={setCurrentPage} />
                                    :
                                    null
                }
            </div>
        </>
    )
}

export default Projects