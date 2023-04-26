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
// API :
import { GetAllProjectsAPI } from '../../../../API/project';
// Helpers :
import { toast } from "react-toastify";

// CSS :
import "./Projects.scss";





const Projects = () => {

    const [allProjects, setAllProjects] = useState([])


    return (
        <>
            <div className="dashboardProjectContainer">
                <AllProject allProjects={allProjects} setAllProjects={setAllProjects} />
            </div>
        </>
    )
}

export default Projects