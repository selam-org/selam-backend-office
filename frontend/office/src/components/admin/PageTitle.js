const PageTitle = ({ title }) => {
  return <div style={pageStyle}>{title}</div>;
};

const pageStyle = {
  fontSize: 25,
  fontWeight: 600,
};

export default PageTitle;
