import Spinner from "react-bootstrap/Spinner";
import { ProgressBar } from "react-bootstrap";
const Loading = () => {
  return (
    <div className="loading">
      <div className="loading_container">
        <Spinner animation="border" variant="primary" className="spinner" />
      </div>
    </div>
  );
};

export default Loading;
