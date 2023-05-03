import React, { useState, useEffect } from 'react'

// MUI | ANT-D :
import { Button, Tag } from 'antd';

// Assets | Icons :
import { GrView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";

// Components :
import Table from "./Component/table/Table"
import AddNewProject from "./Component/AddProjectModal/NewProjectModal"
import AllProject from "./Component/AllProjects/AllProjects"
import ViewProjectPage from "./Component/ViewProject/ViewProjectPage"

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


    return (
        <>
            <div className="dashboardProjectContainer">
                {
                    currentPage == "all" ?
                        <AllProject allProjects={allProjects} setAllProjects={setAllProjects} currentPage={currentPage} setCurrentPage={setCurrentPage} selectedProject={selectedProject} setSelectedProject={setSelectedProject} />
                        :
                        <ViewProjectPage />
                }
            </div>
        </>
    )
}

export default Projects