import ContentLoader from "react-content-loader";

const SkeletonCatalog = () => (
  <ContentLoader
    speed={2}
    width={210}
    height={262}
    viewBox="0 0 210 262"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="220" rx="8" ry="8" width="210" height="20" />
    <rect x="0" y="0" rx="8" ry="8" width="210" height="210" />
  </ContentLoader>
);

export default SkeletonCatalog;
