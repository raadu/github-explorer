import { Fragment } from "react";
import { Card } from "antd";

const SingleRepo = ({ repo, key }) => {
  return (
    <Fragment>
      <Card
        size="small"
        title={
          <a 
            href={repo.html_url} 
            target="_blank"
            rel="noreferrer"
          >
            {repo.full_name}
          </a>
        }
      >
        <p>{repo.description}</p>
      </Card>
    </Fragment>
  );
};

export default SingleRepo;
