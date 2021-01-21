import { Typography } from "antd";
import SearchItemStyle from "./SearchItem.module.css";

const { Text } = Typography;

const SearchItem = ({searchText, getPastSearch}) => {
  return (
    <Text 
        code 
        className={SearchItemStyle.textItem}
        onClick={() => getPastSearch(searchText)}
    >
        {searchText}
    </Text>
  );
};

export default SearchItem;
