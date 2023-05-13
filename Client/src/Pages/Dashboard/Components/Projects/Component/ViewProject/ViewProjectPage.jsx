import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";

import { Button, Input, Modal, Select, Radio, Tag } from "antd";
import { CircularProgress } from "@mui/material";

// Assets | ICONS :
import NoImage from "Assets/Images/noImage.png"
import { IoMdArrowRoundBack } from "react-icons/io"
import { GrCloudUpload, GrCloudDownload } from "react-icons/gr"

// APIs :
import { CreatProjectStepAPI, GetProjectsAPI, ProjectStepResponseAPI } from "API/project";
// Redux :
import { useSelector } from "react-redux";
// Data :
import AllSteps from "./AllSteps";

// Helper :
import CountdownTimer from "react-component-countdown-timer"
import "react-component-countdown-timer/lib/styles.scss";

// CSS :
import "./ViewProjectPage.scss";
import { toast } from "react-toastify";
import { useEffect } from "react";






const { TextArea } = Input;
export default function ViewProjectPage({ selectedProject, setCurrentPage, currentPage }) {
  let location = useLocation();
  let fileInput = useRef(null)

  const UserData = useSelector(state => state?.userData)

  const [selectedProjectData, setSelectedProjectData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [btnloading, setBtnLoading] = useState(false)
  const [submitloading, setSubmitLoading] = useState(false)
  const [reload, setReload] = useState(false)

  const [formData, setFormData] = useState({
    name: null,
    type: "",
    from: "",
    description: "",
    deadLine: ""
  })
  const [stepCreationModal, setStepCreationModal] = useState(false)

  const [submitData, setSubmitData] = useState({
    stepId: null,
    response: null,
    type: null
  })


  const enteringData = (event) => {
    console.log(event);
    let { name, value } = event?.target
    setFormData({
      ...formData,
      [name]: value
    })
  }
  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }



  const closeModal = () => {
    setStepCreationModal(false)
    setFormData({
      title: "",
      type: "",
      from: "",
      description: "",
      deadLine: ""
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


  const uploadFile = (stepId) => {
    setSubmitData({
      stepId,
      type: "document",
      response: null
    })
    fileInput.current.click()
  }
  const downloadFile = (fileUrl) => {
    // setSubmitData({
    //   stepId,
    //   type: "document",
    //   response: null
    // })
    // fileInput.current.click()
  }
  const handleUploadingFile = (event) => {
    setSubmitData({
      ...submitData,
      response: event.target.files[0]
    })
  }
  const enteringResponse = (stepId, event) => {
    let { value } = event.target;
    setSubmitData({
      stepId,
      type: "response",
      response: value
    })
  }

  const submitResponse = async () => {
    setSubmitLoading(true)
    let fData = new FormData()
    fData.append("stepId", submitData.stepId)
    fData.append("type", submitData.type)
    if (submitData.type == "document") {
      fData.append("document", submitData.response)
    } else {
      fData.append("response", submitData.response)
    }
    let res = await ProjectStepResponseAPI(selectedProject?._id, fData)
    if (res.error != null) {
      toast.error(res.error)
    } else {
      cancleSubmit()
      toast.success(res.data?.message)
      setReload(!reload)
    }
    setSubmitLoading(false)
  }
  const cancleSubmit = () => {
    setSubmitData({
      stepId: null,
      response: null,
      type: null
    })
  }


  const calculateTime = (days, startTime) => {
    if (!startTime) {
      return 0
    }
    let currentTime = new Date(startTime).getTime()
    let e = new Date(startTime)

    let date = new Date()
    e.setDate(e.getDate() + Number(days))

    let difference = e.getTime() - date.getTime()

    let drivedSeconds = difference / 1000

    console.log(e);
    return drivedSeconds
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
          <div>
            <Button style={{ width: "150px" }} className="EditPagebtn" onClick={() => setStepCreationModal(true)}>Add New Step</Button>
            <Button style={{ width: "150px" }} className="EditPagebtn" onClick={() => setCurrentPage("print")}>Print</Button>
          </div>
          <Modal title="Select Work Step" open={stepCreationModal} onOk={addNewStep} confirmLoading={btnloading} onCancel={closeModal}>
            <div className="flexColumn">
              <Select
                showSearch
                placeholder="Select a Step"
                optionFilterProp="children"
                value={formData?.name}
                onChange={(value) => handleSelectChange("name", value)}
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
                <p style={{ width: "70px" }} className="title">Ask From :</p>
                <Radio.Group onChange={enteringData} value={formData?.from} name="from">
                  {
                    ["client", "contractor", "engineer"].map((role) => {
                      return (
                        UserData?.role != role &&
                        <>
                          <Radio value={role}>{role?.toLocaleUpperCase()}</Radio>
                        </>
                      )
                    })
                  }
                </Radio.Group>
              </div>
              <div className="flexLine">
                <p style={{ width: "70px" }} className="title">Expire In :</p>
                <Select
                  showSearch
                  placeholder="Select Days"
                  // size="small"
                  value={formData?.deadLine}
                  onChange={(value) => handleSelectChange("deadLine", value)}
                  optionFilterProp="children"
                  style={{
                    width: 150,
                  }}
                  // onChange={handleChange}
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  options={
                    new Array(100).fill(0).map((value, index) => {
                      return {
                        label: `${index + 1} ${index + 1 == 1 ? "Day" : "Days"}`,
                        value: `${index + 1}`
                      }
                    })
                  }
                />
              </div>
            </div>
          </Modal>
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
                            {
                              data?.submited ?
                                data?.type == "document" ?
                                  <>
                                    <div className="uploadInput">
                                      <p> {data?.response} </p>
                                      <GrCloudDownload className="icon" onClick={() => downloadFile(data?.response)} />
                                    </div>
                                  </>
                                  :
                                  <>
                                    <div className="uploadInput">
                                      <p> Response :- </p>
                                      <Radio.Group
                                        options={[{ label: "Yess", value: "yess" }, { label: "No", value: "no" }]}
                                        value={data?.response}
                                        optionType="button"
                                        buttonStyle="solid"
                                      />
                                    </div>
                                  </>
                                :
                                data?.from?._id == UserData?._id ?
                                  data?.type == "document" ?
                                    <>
                                      <input type="file" hidden ref={fileInput} onChange={handleUploadingFile} />
                                      <div className="uploadInput">
                                        <p> {submitData?.response?.name || "SelectFile"} </p>
                                        <GrCloudUpload className="icon" onClick={() => uploadFile(data?._id)} />
                                      </div>
                                    </>
                                    :
                                    <>
                                      <div className="uploadInput">
                                        <p> Your Response </p>
                                        <Radio.Group
                                          options={[{ label: "Yess", value: "yess" }, { label: "No", value: "no" }]}
                                          onChange={(event) => enteringResponse(data?._id, event)}
                                          value={submitData?.response}
                                          optionType="button"
                                          buttonStyle="solid"
                                        />
                                      </div>
                                    </>
                                  :
                                  null
                            }
                            {
                              submitData?.stepId == data?._id &&
                              <div className="btnBox">
                                <Button size="small" className="btn" style={{ backgroundColor: "red" }} onClick={cancleSubmit}>CANCLE</Button>
                                <Button size="small" className="btn" onClick={submitResponse} loading={submitloading}>SUBMIT</Button>
                              </div>
                            }
                            <div className="status">
                              {
                                data.submited ?
                                  <Tag color="green">SUBMITED</Tag>
                                  :
                                  <Tag color="yellow">PENDING</Tag>
                              }
                            </div>
                            {
                              !data?.submited &&
                              <div className="time">
                                <CountdownTimer count={calculateTime(data?.deadLine, data?.createdAt)} showTitle size={12} direction="right" labelSize={10} />
                              </div>
                            }
                            <div className="editors">
                              <div className="by"> <p>ASK BY :-</p> <p> {data.by?.role} <br /> {data.by?.firstName} </p>  </div>
                              <div className="from"> <p>ASK FROM :-</p> <p> {data.from?.role} <br /> {data.from?.firstName} </p>  </div>
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
          <Button className="EditPagebtn Chatbtn" onClick={() => setCurrentPage("chat")}>CHAT</Button>
          <Button className="EditPagebtn Chatbtn" onClick={() => setCurrentPage("chat")}>COMPLETE</Button>
        </div>
      </div>
    </>
  );
}
