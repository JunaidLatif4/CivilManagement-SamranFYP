import React from "react";
import { useLocation } from "react-router-dom";

import { Button, Input } from "antd";

// Assets | ICONS :
import NoImage from "Assets/Images/noImage.png"
import { IoMdArrowRoundBack } from "react-icons/io"

// CSS :
import "./ViewProjectPage.scss";
import { useEffect } from "react";






const { TextArea } = Input;
export default function ViewProjectPage({ selectedProject, setCurrentPage , currentPage }) {
  let location = useLocation();

  // useEffect(() => {
  //   alert("sdfsdf")
  //   window.scrollTo(0, 0)
  // }, [currentPage])

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
            <Input placeholder="Title" disabled value={selectedProject?.title} />
          </div>
          <div className="flexColumn">
            <h3 className="headingDesc">Description</h3>
            <TextArea rows={3} placeholder="Description..." disabled value={selectedProject?.description} />
          </div>
          <div className="profileBox">
            <div className="profile">
              <img src={selectedProject?.client?.profileImage?.url ? `${window.location?.customURL}/${selectedProject?.client?.profileImage?.url}` : NoImage} alt="ERROR" />
              <div className="details">
                <h3 className="title">Client</h3>
                <div className="name">{`${selectedProject?.client?.firstName} ${selectedProject?.client?.lastName}`}</div>
              </div>
            </div>
            <div className="profile">
              <img src={selectedProject?.contractor?.profileImage?.url ? `${window.location?.customURL}/${selectedProject?.contractor?.profileImage?.url}` : NoImage} alt="ERROR" />
              <div className="details">
                <h3 className="title">Contractor</h3>
                <div className="name">{`${selectedProject?.contractor?.firstName} ${selectedProject?.contractor?.lastName}`}</div>
              </div>
            </div>
            <div className="profile">
              <img src={selectedProject?.engineer?.profileImage?.url ? `${window.location?.customURL}/${selectedProject?.engineer?.profileImage?.url}` : NoImage} alt="ERROR" />
              <div className="details">
                <h3 className="title">Engineer</h3>
                <div className="name">{`${selectedProject?.engineer?.firstName} ${selectedProject?.engineer?.lastName}`}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="EditPageButtons">
          <Button className="EditPagebtn progressbtn">Progress</Button>
          <Button className="EditPagebtn Chatbtn" onClick={() => setCurrentPage("chat")}>Chat</Button>
        </div>
      </div>
    </>
  );
}
