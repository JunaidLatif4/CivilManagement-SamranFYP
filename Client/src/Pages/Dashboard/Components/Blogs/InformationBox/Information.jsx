import React, { useState } from 'react'

// MUI | ANT-D :
import { Select, DatePicker } from 'antd';

// CSS :
import './Information.scss'





const Infomation = ({ postData, enteringPostData }) => {

    return (
        <div className='blogForm'>
            {/* <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Written By</label>
                <Select
                    defaultValue="lucy"
                    onChange={handleChange}
                    options={[
                        {
                            options: [
                                {
                                    label: 'Jack',
                                    value: 'jack',
                                },
                                {
                                    label: 'Lucy',
                                    value: 'lucy',
                                },
                            ],
                        },
                    ]}
                />

            </div> */}
            {/* <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Post Date</label>
                <DatePicker onChange={onChange} />
            </div> */}
            <div className="mb-3">
                <label className="form-label">Categories</label>
                <Select
                    mode="tags"
                    placeholder="Category"
                    value={postData.categories}
                    onChange={(value) => enteringPostData({ target: { name: "categories", value: value } })}
                    style={{
                        width: '100%',
                    }}
                    dropdownStyle={{ display: "none" }}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Tags</label>
                <Select
                    mode="tags"
                    placeholder="Tag"
                    value={postData.tags}
                    onChange={(value) => enteringPostData({ target: { name: "tags", value: value } })}
                    style={{
                        width: '100%',
                    }}
                    dropdownStyle={{ display: "none" }}
                />
            </div>
            {/* <div className="mb-3">
                <label className="form-label">Published</label>
                <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                </label>

            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Show Author Name</label>
                <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                </label>
            </div> */}
        </div>
    )
}

export default Infomation
