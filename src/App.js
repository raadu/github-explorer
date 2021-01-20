import { useState, useEffect } from "react";
import AppStyle from "./App.module.css";
import SingleRepo from "./components/SingleRepo/SingleRepo";
import { Row, Col, Input, Typography } from "antd";
import "antd/dist/antd.css";

const { Title } = Typography;

function App() {
  const [userName, setUserName] = useState("");
  const [userRepo, setUserRepo] = useState([]);
  const [userStars, setUserStars] = useState([]);

  console.log("userRepo", userRepo);
  console.log("userStars", userStars);
  console.log("userName", userName);

  useEffect(() => {
    if (userName !== "") {
      fetch(`https://api.github.com/users/${userName}/repos`)
        .then((res) => res.json())
        .then((data) => {
          setUserRepo(data);
        });

      fetch(`https://api.github.com/users/${userName}/starred`)
        .then((res) => res.json())
        .then((data) => {
          setUserStars(data);
        });
    }
  }, [userName]);

  const searchEnter = (e) => {
    if (e.keyCode === 13) {
      setUserName(e.target.value);
    }
  };

  return (
    <div className={AppStyle.App}>
      <Row className={AppStyle.mainRow}>
        <Col span={6} className={AppStyle.leftBar}>
          Past Searches
        </Col>
        <Col span={18}>
          <Row className={AppStyle.searchRow}>
            <Col span={24} className={AppStyle.searhBar}>
              <Title level={5}>Github Explorer</Title>
              <Input
                type="text"
                placeholder="Type Username"
                onKeyDown={searchEnter}
                style={{ width: 200 }}
              />
            </Col>
          </Row>
          <Row className={AppStyle.listRow}>
            <Col span={12} className={AppStyle.ownRepo}>
              <Title level={5}>Own Repositories</Title>
              <div>test</div>
              <div>test</div><div>test</div><div>test</div>
              <div>test</div><div>test</div><div>test</div>
              <div>test</div><div>test</div><div>test</div>
              <div>test</div><div>test</div><div>test</div>
              <div>test</div><div>test</div><div>test</div>
              <div>test</div><div>test</div><div>test</div>
              <div>test</div><div>test</div><div>test</div>
              <div>test</div><div>test</div><div>test</div>
              <div>test</div><div>test</div><div>test</div>
              <div>test</div><div>test</div><div>test</div>
              <div>test</div><div>test</div><div>test</div>
            </Col>
            <Col span={12} className={AppStyle.starredRepo}>
              <Title level={5}>Repositories Starred</Title>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default App;
