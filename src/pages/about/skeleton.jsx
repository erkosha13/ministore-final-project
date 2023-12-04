import PropTypes from "prop-types";
import ContentLoader from "react-content-loader";

const Skeleton = ({ className }) => (
  <ContentLoader
    className={className}
    speed={2}
    width={220}
    height={270}
    viewBox="0 0 250 280"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"

  >
    <rect x="0" y="205" rx="8" ry="8" width="247" height="67" />
    <rect x="0" y="0" rx="8" ry="8" width="247" height="192" />
  </ContentLoader>
);
Skeleton.propTypes = {
  className: PropTypes.string,
};

export default Skeleton;
