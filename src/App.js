import { useState, useEffect } from "react";
import AppStyle from "./App.module.css";
import SingleRepo from "./components/SingleRepo/SingleRepo";
import { Row, Col, Input, Typography } from "antd";
import "antd/dist/antd.css";

const { Title } = Typography;

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [userName, setUserName] = useState("");
  const [userRepo, setUserRepo] = useState([]);
  const [userStars, setUserStars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pastSearches, setPastSearches] = useState([]);

  console.log("userRepo", userRepo);
  console.log("userStars", userStars);
  console.log("userName", userName);
  console.log("pastSearches", pastSearches);

  useEffect(() => {
    fetch(`http://localhost:3000/git-search/search`)
      .then((res) => res.json())
      .then((data) => {
        setPastSearches(data);
      });
  }, [userName]);

  useEffect(() => {
    if (userName !== "") {
      setLoading(true);
      fetch(`https://api.github.com/users/${userName}/repos`)
        .then((res) => res.json())
        .then((data) => {
          setUserRepo(data);
        })
        .then(() => setLoading(false));

      fetch(`https://api.github.com/users/${userName}/starred`)
        .then((res) => res.json())
        .then((data) => {
          setUserStars(data);
        })
        .then(() => setLoading(false));
    }
  }, [userName]);

  const addSearchToDB = (value) => {
    // Add Search String to Database using API
    fetch("http://localhost:3000/git-search/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: value }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const searchEnter = (e) => {
    if (e.keyCode === 13) {
      setUserName(e.target.value);
      addSearchToDB(e.target.value);
    }
  };

  const getPastSearch = (searchValue) => {
    setSearchInput(searchValue);
    setUserName(searchValue);
  };

  return (
    <div className={AppStyle.App}>
      <Row className={AppStyle.mainRow}>
        <Col span={6} className={AppStyle.leftBar}>
          {pastSearches.length !== 0
            ? pastSearches.map((searchName) => {
                return (
                  <div onClick={() => getPastSearch(searchName.name)}>
                    {searchName.name}
                  </div>
                );
              })
            : null}
        </Col>
        <Col span={18} className={AppStyle.rightColumn}>
          <Row className={AppStyle.searchRow}>
            <Col span={24} className={AppStyle.searhBar}>
              <Title level={5}>Github Explorer</Title>
              <Input
                type="text"
                value={searchInput}
                placeholder="Search Github Username"
                onKeyDown={searchEnter}
                style={{ width: 200 }}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </Col>
          </Row>
          <Row className={AppStyle.listRow}>
            <Col span={12} className={AppStyle.ownRepo}>
              <Title level={5}>Own Repositories</Title>
              {userRepo.length !== 0 ? (
                userRepo.map((repo) => {
                  return <SingleRepo repo={repo} />;
                })
              ) : loading ? (
                <div>Loading...</div>
              ) : null}
            </Col>
            <Col span={12} className={AppStyle.starredRepo}>
              <Title level={5}>Repositories Starred</Title>
              {userStars.length !== 0 ? (
                userStars.map((repo) => {
                  return <SingleRepo repo={repo} />;
                })
              ) : loading ? (
                <div>Loading...</div>
              ) : null}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default App;
