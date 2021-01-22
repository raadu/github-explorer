import { 
  useState, 
  useEffect 
} from "react";
import AppStyle from "./App.module.css";
import SingleRepo from "./components/SingleRepo/SingleRepo";
import SearchItem from "./components/SearchItem/SearchItem";
import { 
  Row,
  Col,
  Input,
  Typography
} from "antd";
import "antd/dist/antd.css";

const { Title } = Typography;

function App() {
  // States
  const [searchInput, setSearchInput] = useState("");
  const [userName, setUserName] = useState("");
  const [userRepo, setUserRepo] = useState([]);
  const [userStars, setUserStars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pastSearches, setPastSearches] = useState([]);

  // Fetch past searches data from API
  useEffect(() => {
    fetch(`https://github-explorer-backend123.herokuapp.com/git-search/search`)
      .then((res) => res.json())
      .then((data) => {
        setPastSearches(data);
      });
  }, [userName]);

  // Fetch user repo and starred repo list
  useEffect(() => {
    if (userName !== "") {
      setLoading(true);
      fetch(`https://api.github.com/users/${userName}/repos`)
        .then((res) => res.json())
        .then((data) => {
          setUserRepo(data);
        })
        .then(() => setLoading(false))
        .catch((err) => alert("Error getting user data: ", err));

      fetch(`https://api.github.com/users/${userName}/starred`)
        .then((res) => res.json())
        .then((data) => {
          setUserStars(data);
        })
        .then(() => setLoading(false))
        .catch((err) => alert("Error getting user data: ", err));
    }
  }, [userName]);

  // Add search text to DB using API
  const addSearchToDB = (value) => {
    fetch("https://github-explorer-backend123.herokuapp.com/git-search/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: value }),
    })
      .then((res) => res.json())
  };

  // On Enter function
  const searchEnter = (e) => {
    if (e.keyCode === 13) {
      setUserName(e.target.value);
      addSearchToDB(e.target.value);
    }
  };

  // On Click search item result function
  const getPastSearch = (searchValue) => {
    setSearchInput(searchValue);
    setUserName(searchValue);
  };

  return (
    <div className={AppStyle.App}>
      <Row className={AppStyle.mainRow}>
        {/* Past Searches Left Sidebar */}
        <Col span={6} className={AppStyle.leftBar}>
          <Title level={5}>Past Searches</Title>
            {pastSearches.length !== 0
              ? pastSearches.map((searchName) => {
                  return (
                    <SearchItem
                      getPastSearch={getPastSearch}
                      searchText={searchName.name}
                    />
                  );
                })
              : null}
        </Col>
        <Col span={18} className={AppStyle.rightColumn}>
          <Row className={AppStyle.searchRow}>
          {/* Header and Search Input Area */}
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
            {/* Own Repository Column */}
            <Col span={12} className={AppStyle.ownRepo}>
              <Title level={5}>Own Repositories</Title>
              {Array.isArray(userRepo) && userRepo.length !== 0 ? (
                userRepo.map((repo) => {
                  return <SingleRepo repo={repo} />;
                })
              ) : loading ? (
                <div>Loading...</div>
              ) : null}
            </Col>
            {/* Starred Repository Column */}
            <Col span={12} className={AppStyle.starredRepo}>
              <Title level={5}>Repositories Starred</Title>
              {Array.isArray(userStars) && userStars.length !== 0 ? (
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
  ); // End of return
} // End of component

export default App;
