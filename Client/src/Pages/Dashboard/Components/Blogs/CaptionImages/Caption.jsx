import React, { useState, useEffect } from 'react'

// MUI | ANT-D :
import { message, Upload, Input } from 'antd';

// Assets | ICONS :
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { ReactComponent as Down } from '../../../../../Assets/Post/down.svg'

// CSS :
import './Caption.scss'





const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};
const Caption = ({ postData, enteringPostData }) => {

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();

    const handleUploadChange = (info) => {
        setLoading(true);
        getBase64(info.file.originFileObj, (url) => {
            setImageUrl(url);
        });
        enteringPostData({
            target: {
                name: "file",
                value: info?.file?.originFileObj || null
            }
        })
        setLoading(false);
    };
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    return (
        <div className="caption-box">
            <div className="caption-heading">
                <Down className='icon' />
                Quote & Images
            </div>
            <div className="input-filed">
                <label className="form-label">write a Quote</label>
                <Input className='caption' size="medium" placeholder="Title" value={postData.quotes} name="quotes" onChange={enteringPostData} />
            </div>
            <div className="p-preview">
                <label className="form-label">Upload Image</label>
                <div className='file-preview'>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        onChange={handleUploadChange}
                    >
                        {imageUrl ? (
                            <div className="imgBox">
                                <img
                                    src={imageUrl}
                                    alt="avatar"
                                    style={{
                                        width: '100%',
                                    }}
                                />
                            </div>
                        ) : (
                            uploadButton
                        )}
                    </Upload>

                </div>
            </div>
        </div>
    )
}

export default Caption
