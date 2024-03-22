import { error } from "console";
import React from "react";
import { HeaderData } from "../pages/Home";
import cabinetData from "../cabinetData";

import Select from "react-select";
import Loading from "./Loading";
import { ProgressBar } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
interface AppProps {
  loading: boolean;
  error: string;
  headerData: HeaderData;
  getRootProps: any;
  getInputProps: any;
  uploadedFiles: any;
  showToast: boolean;
  toastData: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  tagData: any;
  documentTypeData: any;
  handleCustomSelect: (choice: any) => void;
  handleSubmit: () => void;
  // handleFileChange: (e: any) => void;
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
}

const Home = ({
  loading,
  error,
  headerData,
  getRootProps,
  getInputProps,
  uploadedFiles,
  showToast,
  toastData,
  handleChange,
  handleSelectChange,
  tagData,
  documentTypeData,
  handleCustomSelect,
  handleSubmit,
  setShowToast,
}: // handleFileChange,
AppProps) => {
  return (
    <div className="main_container">
      {loading && <Loading />}
      <div className="container-fluid">
        {/* <Toast
          setShowToast={setShowToast}
          showToast={showToast}
          toastData={toastData}
        /> */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <div>
          <h3 className="text-body text-center mt-3 mb-3">
            Document Uploader App
          </h3>
        </div>
        <div className="row">
          <main className="col-md-8 offset-md-2">
            <div className="mb-3">
              <label className="form-label">Select Document Type</label>
              <select
                value={headerData.documentType}
                name="documentType"
                className="form-select mb-3"
                onChange={handleSelectChange}
              >
                <option value="">...</option>
                {documentTypeData &&
                  documentTypeData.map((documentType: any) => (
                    <option key={documentType.id} value={documentType.id}>
                      {documentType.label}
                    </option>
                  ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Meta Data</label>
              <input
                type="text"
                name="metaData"
                onChange={handleChange}
                value={headerData.metaData}
                className="form-control mb-3"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Select Tag</label>
              <select
                value={headerData.tag}
                className="form-select mb-3"
                name="tag"
                onChange={handleSelectChange}
                required
              >
                <option value="">...</option>

                {tagData &&
                  tagData.map((item: any, index: number) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Select Cabinet</label>
              <Select
                options={cabinetData}
                className="basic-single"
                classNamePrefix="select"
                isDisabled={false}
                isLoading={false}
                isClearable={true}
                isRtl={false}
                isSearchable={true}
                name="cabinet"
                required
                onChange={(choice) => handleCustomSelect(choice)}
              />
            </div>

            <div {...getRootProps()} className="dropzone">
              <input {...getInputProps()} required />

              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn btn-primary"
            >
              Upload
            </button>
            <p>File count {uploadedFiles.length}</p>
            {uploadedFiles && uploadedFiles.length > 0 && (
              <>
                <h4 className="mt-4">Uploaded Files</h4>
                <ul className="list-group mb-3">
                  {uploadedFiles.map((file: any, index: number) => (
                    <li key={index} className="list-group-item">
                      <span className="d-flex justify-space-between">
                        {file.name} <i className="bi bi-x"></i>
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </main>
        </div>

        <footer className="row mt-5">
          <div className="col-md-8 offset-md-2">
            {/* Footer content */}
            <p>&copy; 2024 Your Company</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
