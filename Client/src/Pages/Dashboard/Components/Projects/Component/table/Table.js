// React
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Modal, Table as AntdTable, Row, Col, Input } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { FaEdit, FaTrash } from "react-icons/fa";
import { BsCalendar } from "react-icons/bs";

// CSS
import "./Table.scss";


const Table = ({
    columns = [],
    rows = [],
    hasEditDeleteAction = false,
    tableLeftActiveAction = "",
    tableLeftActions = [],
    hasSearch = false,
    hasStartDate = false,
    hasEndDate = false,
    hasDropDownAction = false,
    hasRowSelection = false,
    descreaseRightActionWidth = false,
    dropDownActionList = [],
    dropDownListHanlder = (action) => console.log(action),
    endDateHandler = (date) => console.log(date),
    startDateHandler = (date) => console.log(date),
    tableLeftActionsHandler = (action) => console.log(action),
    actionHandler = (row) => console.log(row),
    searchHandler = (search) => console.log(search),
    loading
}) => {

    const { confirm } = Modal;
    const { Search } = Input;
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const HandleAction = (row) => {
        if (row && row.type === "delete") {
            confirm({
                title: 'Do you Want to delete?',
                icon: <ExclamationCircleFilled />,
                okType: "danger",
                onOk() {
                    actionHandler(row);
                },
                onCancel() {
                },
            });
            return;
        }

        actionHandler(row);
    }

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys);
        },
    };


    let tableColumns = [
        {
            title: '#',
            key: "sr",
            render: (_, record, index) => (
                <div>
                    {index + 1}
                </div>
            )
        },
        ...columns
    ];

    if (hasEditDeleteAction) {
        let index = tableColumns.length;
        tableColumns[index] =
        {
            title: 'Action', key: 'action',
            render: (_, record) => (
                <div>
                    <button className="btn" onClick={() => HandleAction({ record, type: "edit" })}>
                        <FaEdit style={{ color: "skyblue" }} size={20} />
                    </button>
                    &nbsp;
                    <button className="btn" onClick={() => HandleAction({ record, type: "delete" })}>
                        <FaTrash style={{ color: "red" }} size={20} />
                    </button>
                </div>
            ),
        }
    }

    return (
        <div className="custom-table">
            <Row align="middle" justify="start">
                <Col xs={24} sm={24} md={24} lg={24} xl={descreaseRightActionWidth ? 12: 8}>
                    <Row align="middle">
                        {
                            tableLeftActions?.map((el, i) => (
                                <Col key={i} className="custome-table-left-action">
                                    <Link to="#" onClick={() => tableLeftActionsHandler(el)} {...(el === tableLeftActiveAction ? { className: "theme-btn btn-pad table-left-active-action" } : {})}>
                                        {el}
                                    </Link>
                                </Col>
                            ))

                        }
                    </Row>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={descreaseRightActionWidth ? 12 : 16}>
                    <Row align="middle" justify="end">
                        {
                            hasDropDownAction &&
                            <Col xs={24} sm={10} md={10} lg={5} xl={5}>
                                <div className="verticaly-center">
                                    <select className="input" onChange={dropDownListHanlder}>
                                        {dropDownActionList?.map((el, i) => (
                                            <option value={el} key={i}> {el} </option>
                                        ))}
                                    </select>
                                    <BsCalendar size={30} />
                                </div>
                            </Col>
                        }
                        {
                            hasStartDate &&
                            <Col xs={24} sm={7} md={7} lg={5} xl={5}>
                                <div className="verticaly-center">
                                    <input type="text" value="2022/01/25" className="input" />
                                    <BsCalendar size={30} />
                                </div>
                            </Col>
                        }
                        {
                            hasEndDate &&
                            <Col xs={24} sm={7} md={7} lg={5} xl={5}>
                                <div className="verticaly-center">
                                    <input type="text" value="2022/01/25" className="input" />
                                    <BsCalendar size={30} />
                                </div>
                            </Col>
                        }
                        {
                            hasSearch &&
                            <Col xs={24} sm={24} md={24} lg={9} xl={9}>
                                <Search allowClear onSearch={searchHandler} placeholder="Search" enterButton="Go!" />
                            </Col>
                        }
                    </Row>
                </Col>
            </Row>
            <br />
            <AntdTable
                {...(
                    hasRowSelection ?
                        {
                            rowSelection: {
                                type: "checkbox",
                                ...rowSelection,
                                selectedRowKeys: selectedRowKeys,
                            }
                        } :
                        {}
                )}
                rowKey={recored => recored.id}
                dataSource={rows}
                columns={tableColumns}
                pagination={{ position: ["bottomCenter"] }}
                loading={loading}
            />
        </div>
    )
}

export default Table;