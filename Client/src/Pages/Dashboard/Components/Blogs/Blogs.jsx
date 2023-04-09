import React, { useState, useEffect } from 'react'

// MUI | ANT-D :
import { Popover, Input, Button } from 'antd';

// Components
import AllBlogs from "./AllBlogs/AllBlogs"
import EditBlog from "./EditBlog"

// Assets | ICONS :
import { ReactComponent as Save } from '../../../../Assets/Post/save.svg'

// API :
import { CreatBlogsAPI } from '../../../../API/blogs';
// Helpres :
import { toast } from "react-toastify";

// CSS :
import './Blogs.scss'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";





const Blog = () => {

    const [page, setPage] = useState("all")

    return (
        <>
            <div className="dashboardBlogsContainer">
                {
                    page == "all" ?
                        <AllBlogs page={page} setPage={setPage} />
                        :
                        <EditBlog />

                }
            </div>
        </>
    )
}

export default Blog
