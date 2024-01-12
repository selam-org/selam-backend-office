import { DoubleRightOutlined } from "@ant-design/icons";
import "../styles/NavBar.css";

const NavBarToolTip = ({ toolTips = [], header }) => {
  return (
    <div className={`nav-bar-tool-container nav-item-tool-tip`}>
      <div className="nav-bar-tool-header-container">
        <div className="nav-bar-tool-header">{header}</div>
      </div>
      {toolTips.map((ToolTip) => ToolTip)}
    </div>
  );
};

export function NavBarToolTipItem({ label }) {
  return (
    <div className="tool-tip-item">
      <DoubleRightOutlined className="tool-tip-icon" />
      <span className="tool-tip-item-label">{label}</span>
    </div>
  );
}

export default NavBarToolTip;
