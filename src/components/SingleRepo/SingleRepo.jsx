import { Fragment } from "react";
import { Card } from "antd";

const SingleRepo = ({ repo }) => {
  return (
    <Fragment>
      <Card 
        size="small" 
        title={repo.full_name}
    >
      <p>{repo.description}</p>
    </Card>
    </Fragment>
  );
};

export default SingleRepo;
