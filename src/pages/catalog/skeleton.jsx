import PropTypes from "prop-types";
import ContentLoader from "react-content-loader";

const Skeleton = ({ className }) => (
  <ContentLoader
    className={className}
    speed={2}
    width={250}
    height={350}
    viewBox="0 0 250 350"
    backgroundColor="rgba(255, 255, 255, 0.7)"
    foregroundColor="rgba(255, 255, 255, 0.7)"
  >
    <rect x="2" y="5" rx="8" ry="8" width="245" height="230" />
    <rect x="2" y="320" rx="8" ry="8" width="245" height="28" />
  </ContentLoader>
);
Skeleton.propTypes = {
  className: PropTypes.string,
};

export default Skeleton;
