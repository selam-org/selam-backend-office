const PageTitle = ({ title }) => {
  return <span style={pageStyle}>{title}</span>;
};

const pageStyle = {
  fontSize: 25,
  fontWeight: 600,
};

export default PageTitle;
