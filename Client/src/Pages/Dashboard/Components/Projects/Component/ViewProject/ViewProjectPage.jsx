import React from "react";
import { Button, Input } from "antd";

// Assets | ICONS :
import NoImage from "Assets/Images/noImage.png"

// CSS :
import "./ViewProjectPage.scss";






const { TextArea } = Input;
export default function ViewProjectPage({ selectedProject }) {
  console.log("--------->", selectedProject);
  return (
    <>
      <div className="EditUserMainContainer">
        <h1 style={{ textTransform: "uppercase" }}>Project Details</h1>
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
              <img src={NoImage} alt="ERROR" />
              <div className="details">
                <h3 className="title">Client</h3>
                <div className="name">{`${selectedProject?.client?.firstName} ${selectedProject?.client?.lastName}`}</div>
              </div>
            </div>
            <div className="profile">
              <img src={NoImage} alt="ERROR" />
              <div className="details">
                <h3 className="title">Contractor</h3>
                <div className="name">{`${selectedProject?.contractor?.firstName} ${selectedProject?.contractor?.lastName}`}</div>
              </div>
            </div>
            <div className="profile">
              <img src={NoImage} alt="ERROR" />
              <div className="details">
                <h3 className="title">Engineer</h3>
                <div className="name">{`${selectedProject?.engineer?.firstName} ${selectedProject?.engineer?.lastName}`}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="EditPageButtons">
          <Button className="EditPagebtn progressbtn">Progress</Button>
          <Button className="EditPagebtn Chatbtn">Chat</Button>
        </div>
      </div>
    </>
  );
}
