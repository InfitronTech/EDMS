import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
interface AppProps {
  showToast: boolean;
  toastData: string;
}
function BasicExample({ showToast, toastData }: AppProps) {
  return (
    <ToastContainer className="p-3" position={"top-end"} style={{ zIndex: 1 }}>
      <Toast>
        <Toast.Header closeButton={false}>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Bootstrap</strong>
        </Toast.Header>
        <Toast.Body>{toastData}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default BasicExample;
