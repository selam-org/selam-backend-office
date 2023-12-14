import { SearchOutlined } from "@ant-design/icons";
import "./styles/SearchIcon.css";

const SearchIcon = ({ className, onClick }) => {
  return (
    <button className={`search-icon ${className}`} onClick={onClick}>
      <SearchOutlined />
    </button>
  );
};

export default SearchIcon;
