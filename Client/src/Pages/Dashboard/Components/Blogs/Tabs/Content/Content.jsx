import React, { useState } from 'react';

// Assets | ICONS :
import { ReactComponent as Down } from '../../../../../../Assets/Post/down.svg';

// helpers :
import ReactQuill from "react-quill";

// CSS :
import './Content.scss';
import 'react-quill/dist/quill.snow.css';





const Content = ({ postData, enteringPostData }) => {

    const enteringData = (value) => {
        enteringPostData({
            target: {
                name: "content",
                value: value
            }
        })
    }

    return (
        <div className="editor-box">
            <div className="editor-heading">
                <Down className='icon' />
                Text Content
            </div>
            <div className="editor">
                <ReactQuill value={postData.content} onChange={enteringData} />
            </div>
        </div>
    )
}

export default Content
