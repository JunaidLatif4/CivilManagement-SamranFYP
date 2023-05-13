import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@progress/kendo-react-buttons';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import { Table, Tag } from 'antd';

import 'hammerjs';


import './Print.scss';



const Print = ({ selectedProject, setCurrentPage }) => {
    const pdfExportComponent = useRef(null);
    let Navigate = useNavigate()

    const handleExportWithComponent = (event) => {
        pdfExportComponent.current.save();
    }


    console.log(selectedProject);
    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (_, data) => `${data?.createdAt?.slice(0, 10)}`,
        },
        {
            title: 'Step Name',
            dataIndex: 'title',
            key: 'title',
            render: (_, data) => `${data?.name}`,

        },
        // {
        //     title: 'Email',
        //     dataIndex: 'email',
        //     key: 'email',
        // },
        {
            title: 'BY',
            dataIndex: 'client',
            key: 'client',
            render: (_, data) => `${data.by?.firstName} ${data.by?.lastName}`
        },
        {
            title: 'FROM',
            dataIndex: 'contractor',
            key: 'contractor',
            render: (_, data) => `${data.from?.firstName} ${data.from?.lastName}`
        },
        {
            title: 'Response',
            dataIndex: 'status',
            key: 'status',
            render: (_, data) => <Tag className='tableTag' color='purple' style={{ overflow: "hidden" }}> {data?.response} </Tag>
        },
    ]


    return (
        selectedProject &&
        <>
            <div className='invoice-template_container'>
                <div className="export_btn">
                    <Button className='btn' onClick={handleExportWithComponent}>Export</Button>
                </div>
                <div className="page-container hidden-on-narrow">
                    <PDFExport ref={pdfExportComponent}>
                        <div className={`pdf-page size-a4`}>
                            <div className="inner-page">
                                <div className="pdf-header">
                                    <span className="company-logo">
                                        {/* <InvoSvg/> Blauer See Delikatessen */}
                                        PROJECT REPORT
                                    </span>
                                    {/* <span className="invoice-number">#{selectedProject.invoiceNumber}</span> */}
                                </div>
                                <div className="pdf-footer">
                                    <div>
                                        Project ID: {selectedProject._id?.slice(-10)}<br />
                                        Project Start Date: {`0${new Date(selectedProject.createdAt).getDate()}`.slice(-2)}.{`0${new Date(selectedProject.createdAt).getMonth() + 1}`.slice(-2)}.{`${new Date(selectedProject.createdAt).getFullYear()}`}
                                    </div>
                                    <p style={{ fontStyle: "italic", color: "#26a69a" }}>
                                        {selectedProject.description}
                                    </p>
                                </div>
                                <div className="addresses">
                                    <div className="for">
                                        <h2 style={{ textAlign: "center" }}>{selectedProject?.title}</h2>
                                        <div className="f_data" style={{ margin: "1rem" }}>
                                            <p><b> Client :- </b> <i> {selectedProject?.client?.firstName} {selectedProject?.client?.lastName} </i> </p>
                                            <p><b> Contractor :- </b> <i> {selectedProject?.contractor?.firstName} {selectedProject?.contractor?.lastName} </i> </p>
                                            <p><b> Engineer :- </b> <i> {selectedProject?.engineer?.firstName} {selectedProject?.engineer?.lastName} </i> </p>
                                        </div>

                                    </div>
                                </div>
                                <h4 style={{ marginTop: "2rem" }}> Project Progress Steps </h4>
                                <div class="template-table" style={{ marginTop: ".5rem" }}>
                                    <Table
                                        columns={columns}
                                        dataSource={selectedProject?.progress}
                                        pagination={{ pageSize: 5 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </PDFExport>
                </div>
            </div>
        </>
    );
}

export default Print;