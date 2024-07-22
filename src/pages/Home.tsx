import React from "react";
import { Row, Col } from "antd";
import Main from "../components/Main";
import Posts from "../components/Posts";

const Home: React.FC = () => {
  return (
    <Row className="full-screen-bg" justify="center">
      <Col span={24} lg={{ span: 12 }} className="full-height">
        <Main />
        <Posts />
      </Col>
    </Row>
  );
};

export default Home;
