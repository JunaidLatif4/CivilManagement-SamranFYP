import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import { Button, Input, Modal, Select, Radio } from "antd";
import { CircularProgress } from "@mui/material";

// Assets | ICONS :
import NoImage from "Assets/Images/noImage.png"
import { IoMdArrowRoundBack } from "react-icons/io"
import { GrCloudUpload } from "react-icons/gr"

// APIs :
import { CreatProjectStepAPI, GetProjectsAPI } from "API/project";
// Redux :
import { useSelector } from "react-redux";
// Data :
import AllSteps from "./AllSteps";

// CSS :
import "./ViewProjectPage.scss";
import { toast } from "react-toastify";
import { useEffect } from "react";






const { TextArea } = Input;
export default function ViewProjectPage({ selectedProject, setCurrentPage, currentPage }) {
  let location = useLocation();

  const UserData = useSelector(state => state?.userData)

  const [selectedProjectData, setSelectedProjectData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [btnloading, setBtnLoading] = useState(false)
  const [reload, setReload] = useState(false)

  const [formData, setFormData] = useState({
    name: null,
    type: "",
    reviewer: "",
    description: "",
    deadline: ""
  })
  const [stepCreationModal, setStepCreationModal] = useState(false)


  const enteringData = (event) => {
    console.log(event);
    let { name, value } = event?.target
    setFormData({
      ...formData,
      [name]: value
    })
  }
  const handleSelectChange = (event) => {
    setFormData({
      ...formData,
      name: event
    })
  }



  const closeModal = () => {
    setStepCreationModal(false)
    setFormData({
      title: "",
      type: "",
      reviewer: "",
      description: "",
      deadline: ""
    })
  }
  const addNewStep = async () => {
    setBtnLoading(true)
    let res = await CreatProjectStepAPI(selectedProjectData?._id, { ...formData })
    if (res.error != null) {
      toast.error(res.error)
    } else {
      closeModal()
      setReload(!reload)
    }
    setBtnLoading(false)
  }

  const gettingStepData = async () => {
    setLoading(true)
    let res = await GetProjectsAPI(selectedProject?._id)
    if (res.error != null) {
      toast.error(res.error)
    } else {
      setSelectedProjectData(res.data?.result)
    }
    setLoading(false)
  }
  useEffect(() => {
    gettingStepData()
  }, [reload])
  console.log("-----------------999999999999> ", selectedProjectData);
  return (
    <>
      <div className="EditUserMainContainer">
        <div className="flexLine">
          <IoMdArrowRoundBack onClick={() => setCurrentPage("all")} style={{ fontSize: "2rem", cursor: "pointer" }} />
          <h1 style={{ textTransform: "uppercase" }}>Project Details</h1>
        </div>
        <div className="form">
          <div className="flexColumn">
            <h3 className="headingtitle">Title</h3>
            <Input placeholder="Title" disabled value={selectedProjectData?.title} />
          </div>
          <div className="flexColumn">
            <h3 className="headingDesc">Description</h3>
            <TextArea rows={3} placeholder="Description..." disabled value={selectedProjectData?.description} />
          </div>
          <div className="profileBox">
            <div className="profile">
              <img src={selectedProjectData?.client?.profileImage?.url ? `${window.location?.customURL}/${selectedProjectData?.client?.profileImage?.url}` : NoImage} alt="ERROR" />
              <div className="details">
                <h3 className="title">Client</h3>
                <div className="name">{`${selectedProjectData?.client?.firstName} ${selectedProjectData?.client?.lastName}`}</div>
              </div>
            </div>
            <div className="profile">
              <img src={selectedProjectData?.contractor?.profileImage?.url ? `${window.location?.customURL}/${selectedProjectData?.contractor?.profileImage?.url}` : NoImage} alt="ERROR" />
              <div className="details">
                <h3 className="title">Contractor</h3>
                <div className="name">{`${selectedProjectData?.contractor?.firstName} ${selectedProjectData?.contractor?.lastName}`}</div>
              </div>
            </div>
            <div className="profile">
              <img src={selectedProjectData?.engineer?.profileImage?.url ? `${window.location?.customURL}/${selectedProjectData?.engineer?.profileImage?.url}` : NoImage} alt="ERROR" />
              <div className="details">
                <h3 className="title">Engineer</h3>
                <div className="name">{`${selectedProjectData?.engineer?.firstName} ${selectedProjectData?.engineer?.lastName}`}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flexLineSpace">
          <div className="heading">Progress Details</div>
          {UserData?.role == "client" &&
            <>
              <Button style={{ width: "150px" }} className="EditPagebtn" onClick={() => setStepCreationModal(true)}>Add New Step</Button>
              <Modal title="Select Work Step" open={stepCreationModal} onOk={addNewStep} confirmLoading={btnloading} onCancel={closeModal}>
                <div className="flexColumn">
                  <Select
                    showSearch
                    placeholder="Select a Step"
                    optionFilterProp="children"
                    onChange={handleSelectChange}
                    // onSearch={onSearch}
                    value={formData?.name}
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={AllSteps}
                  />
                  <TextArea rows={2} placeholder="Description" maxLength={50} onChange={enteringData} value={formData?.description} name="description" />
                  <div className="flexLine">
                    <p style={{ width: "70px" }} className="title">Type :</p>
                    <Radio.Group onChange={enteringData} value={formData?.type} name="type">
                      <Radio value={"document"}>Document</Radio>
                      <Radio value={"confirmation"}>Confirmation</Radio>
                    </Radio.Group>
                  </div>
                  <div className="flexLine">
                    <p style={{ width: "70px" }} className="title">Reviewer :</p>
                    <Radio.Group onChange={enteringData} value={formData?.reviewer} name="reviewer">
                      <Radio value={"clent"}>Client</Radio>
                      <Radio value={"contractor"}>Contractor</Radio>
                    </Radio.Group>
                  </div>
                </div>
              </Modal>
            </>
          }
        </div>
        <div className="progressDetails">
          {
            loading ?
              <div className="progreesBox">
                <CircularProgress className="progress" />
              </div>
              :
              selectedProjectData?.progress && selectedProjectData?.progress.length >= 1 ?
                <div className="workCardBox">
                  {
                    selectedProjectData?.progress?.map((data) => {
                      return (
                        <>
                          <div className="workCard">
                            <div className="subHeading name">{data?.name}</div>
                            <div className="description">{data?.description}</div>
                            <div className="uploadInput">
                              <p>SelectFile</p>
                              <GrCloudUpload className="icon" />
                            </div>
                            <div className="btnBox">
                              <Button size="small" className="btn" style={{ backgroundColor: "red" }}>CANCLE</Button>
                              <Button size="small" className="btn">SUBMIT</Button>
                            </div>
                          </div>
                        </>
                      )
                    })
                  }
                </div>

                :
                <>
                  <div className="progreesBox">
                    No Progress Found
                  </div>
                </>
          }
        </div>
        <div className="EditPageButtons">
          <Button className="EditPagebtn progressbtn">Progress</Button>
          <Button className="EditPagebtn Chatbtn" onClick={() => setCurrentPage("chat")}>Chat</Button>
        </div>
      </div>
    </>
  );
}
