import { Avatar, Typography, Input, Divider } from "antd";
import React, { useState } from "react";
import CreateModal from "./CreateModal";
import FilterTimeline from "./FilterTimeline";
import backgroundImage from "../Assests/Background.jpg";
import profileImage from "../Assests/profilepic.jpg";

const Main: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState("");
  const [background, setBackground] = useState(backgroundImage);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setModalVisible(true);
    }
  };

  return (
    <div>
      <div className="mainProfile">
        <div className="mainAvatar">
          <Avatar
            size={{ xs: 50, sm: 62, md: 90, lg: 100, xl: 120, xxl: 200 }}
            src={profileImage}
            alt="Profile"
          />
        </div>
      </div>
      <Typography.Title
        level={1}
        style={{ textAlign: "center", marginTop: "90px" }}
      >
        {"Name"}
      </Typography.Title>
      <Divider>TimeLine</Divider>
      <div className="mainButton">
        <CreateModal />
        <FilterTimeline />
      </div>
    </div>
  );
};

export default Main;
