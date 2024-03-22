import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";

interface AppProps {
  showToast: boolean;
  toastData: string;
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
}
const DismissibleExample = ({
  showToast,
  setShowToast,
  toastData,
}: AppProps) => {
  const closeShow = () => {
    setShowToast(false);
  };
  return (
    <Row className="mt-3 ">
      <Col md={6} className="mb-2  align-right">
        <Toast show={showToast} onClose={closeShow} delay={3000}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">File Upload</strong>
          </Toast.Header>
          <Toast.Body>{toastData}</Toast.Body>
        </Toast>
      </Col>
    </Row>
  );
};

export default DismissibleExample;
