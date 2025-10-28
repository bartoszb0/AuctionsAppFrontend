import "./LoadingIndicator.css";
/**
 * Displays a simple spinning loader.
 * Used across components to indicate loading state.
 */
const LoadingIndicator = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
};

export default LoadingIndicator;
