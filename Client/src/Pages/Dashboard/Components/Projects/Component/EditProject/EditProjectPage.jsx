import React from "react";
import { Button, Input } from "antd";

import "./EditProjectPage.scss";

const { TextArea } = Input;

export default function EditProjectPage() {
  return (
    <>
      <div className="EditUserMainContainer">
        <h1>Edit User</h1>
        <div className="EditUserTable">
          <div className="CommonHeadEditPage titleEditPage">
            <h3 className="CommonHeadingEditPage headingtitle">Title</h3>
            <Input placeholder="Title" />
          </div>
          <div className="CommonHeadEditPage descriptionEditPage">
            <h3 className="CommonHeadingEditPage headingDesc">Description</h3>
            <TextArea rows={3} placeholder="Description..." />
          </div>
          <div className="CommonHeadEditPage ClientEditPage">
            <h3 className="CommonHeadingEditPage headingClient">Client</h3>
            <Input placeholder="Client" />
          </div>
          <div className="CommonHeadEditPage ContractorEditPage">
            <h3 className="CommonHeadingEditPage headingContractor">
              Contractor
            </h3>
            <Input placeholder="Contractor" />
          </div>
          <div className="CommonHeadEditPage EngineerEditPage">
            <h3 className="CommonHeadingEditPage headingEngineer">Engineer</h3>
            <Input placeholder="Engineer" />
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
