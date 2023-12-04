import ContentLoader from "react-content-loader";

const SkeletonPagination = () => (
  <ContentLoader
    speed={2}
    width={210}
    height={298}
    viewBox="0 0 210 298"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="220" rx="8" ry="8" width="200" height="20" />
    <rect x="0" y="-1" rx="8" ry="8" width="200" height="210" />
    <rect x="0" y="250" rx="8" ry="8" width="84" height="18" />
  </ContentLoader>
);

export default SkeletonPagination;
