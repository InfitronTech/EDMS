import React, { useCallback } from "react";
import Homepage from "../components/Home";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { toast } from "react-toastify";
// import { tagData } from "../cabinetData";

export interface HeaderData {
  documentType: string;
  metaData: string;
  tag: string;
  cabinet: string;
}
interface TagData {
  id: number;
  label: string;
}
interface DocumentTypeData {
  label: number;
  id: string;
}
interface File {
  lastModified: number;
  name: string;
  path: string;
  size: number;
  type: string;
  webkitRelativePath?: string;
}
interface TagData {
  id: number;
  label: string;
}
const Home = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [toastData, setToastData] = React.useState("");
  const [headerData, setHeaderData] = React.useState<HeaderData>(
    {} as HeaderData
  );
  const [tagData, setTagData] = React.useState<any>();
  const [documentTypeData, SetDocumentTypeData] = React.useState();
  const [showToast, setShowToast] = React.useState(false);
  const [error, setError] = React.useState("");
  const [uploadedFiles, setUploadedFiles] = React.useState<any>([]);
  const getAuthHeaders = () => {
    const username = "Vincent";
    const password = "support01";
    const auth = "Basic " + btoa(username + ":" + password);

    const headers = new Headers();
    headers.append("content-type", "application/json");
    headers.append("Authorization", auth);
    headers.append(
      "Cookie",
      "csrftoken=Z6EN3szkZiqEo5Dap43bxXQDMwhDfBZwdTMqBarcvxjmQHyM1gcQQgDGGZ8p6TIa"
    );

    return headers;
  };

  const fileHeaders = () => {
    const username = "Vincent";
    const password = "support01";
    const auth = "Basic " + btoa(username + ":" + password);

    const headers = new Headers();
    headers.append("Authorization", auth);
    headers.append(
      "Cookie",
      "csrftoken=Z6EN3szkZiqEo5Dap43bxXQDMwhDfBZwdTMqBarcvxjmQHyM1gcQQgDGGZ8p6TIa"
    );

    return headers;
  };
  const onDrop = useCallback(
    (acceptedFiles: any) => {
      setUploadedFiles([...uploadedFiles, ...acceptedFiles]);
    },
    [uploadedFiles]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  console.log(headerData.metaData);
  // api calls
  const base_url = "http://192.168.100.36";
  const headers = getAuthHeaders();

  // get documentType tag and metaData
  React.useEffect(() => {
    //document types
    const fetchDocumentTypes = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://192.168.100.36/api/v4/document_types/",
          {
            method: "GET",
            headers: getAuthHeaders(),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch document types");
        }
        const data = await response.json();
        SetDocumentTypeData(data.results);
      } catch (error: any) {
        setError(error.message);
      }
    };

    //tags
    const fetchTags = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://192.168.100.36/api/v4/tags/", {
          method: "GET",
          headers: getAuthHeaders(),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch tags");
        }
        const data = await response.json();

        setTagData(data.results);
      } catch (error: any) {
        setError(error.message);
      }
    };
    fetchDocumentTypes();
    fetchTags();
    setLoading(false);
  }, []);
  // const [selectedFile, setSelectedFile] = React.useState<any>({});
  // console.log(selectedFile);

  // // Function to handle file selection
  // const handleFileChange = (e: any) => {
  //   setSelectedFile(e.target.files[0]);
  // };

  //
  // handle Form change
  console.log(headerData);
  const handleSubmit = async () => {
    // first api call is for

    // first api call
    // documentType:headerData.documentType
    // label: uploadedFiles[i].name
    for (let i = 0; i < uploadedFiles.length; i++) {
      setLoading(true);
      fetch(`http://192.168.100.36/api/v4/documents/`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          document_type_id: headerData.documentType,
          label: uploadedFiles[i].name,
        }),
      })
        .then(async (res) => {
          const response = await res.json();
          const id = response.id;
          console.log(1);
          fetch(`http://192.168.100.36/api/v4/documents/${id}/metadata/`, {
            headers: getAuthHeaders(),
            method: "POST",
            body: JSON.stringify({
              metadata_type_id: 5,
              value: headerData.metaData,
            }),
          })
            .then(async (res) => {
              console.log(2);

              fetch(
                `http://192.168.100.36/api/v4/documents/${id}/tags/attach/`,
                {
                  method: "POST",
                  headers: getAuthHeaders(),
                  body: JSON.stringify({ tag: headerData.tag }),
                }
              )
                .then(async (res) => {
                  if (res.status === 200) {
                    console.log(3);
                  }
                  //28300
                  fetch(
                    `http://192.168.100.36/api/v4/cabinets/${headerData.cabinet}/documents/add/`,
                    {
                      method: "POST",
                      headers: getAuthHeaders(),
                      body: JSON.stringify({ document: id }),
                    }
                  )
                    .then(async (res) => {
                      if (res.status == 200) {
                        console.log(4);
                        const formData = new FormData();
                        formData.append("action_name", "replace");
                        formData.append("file_new", uploadedFiles[i]);

                        fetch(
                          `http://192.168.100.36/api/v4/documents/${id}/files/`,
                          {
                            headers: fileHeaders(),
                            body: formData,
                            method: "POST",
                          }
                        )
                          .then((res) => {
                            console.log("i was completed");
                            if (res.status == 202) {
                              console.log(5);
                              setLoading(false);

                              toast("Upload was Successful!", {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                              });
                              setUploadedFiles([]);
                            }
                          })
                          .catch((err) => {
                            console.error(err.message);
                            setLoading(false);
                            toast("Server error", {
                              position: "top-right",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "light",
                            });
                          });
                      }
                    })
                    .catch((err) => console.log(err.message));
                })
                .catch((err) => console.log(err.message));
            })
            .catch((err) => console.error(err.message));

          //fourth Api Call
          // fifth api call
        })
        .catch((err) => console.error(err.message));
      // second api call
    }
  };

  // third API call

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setHeaderData({
      ...headerData,
      [name]: value,
    });
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setHeaderData({
      ...headerData,
      [name]: value,
    });
  };
  const handleCustomSelect = (choice: any) => {
    setHeaderData({
      ...headerData,
      cabinet: choice.id,
    });
  };
  return (
    <Homepage
      loading={loading}
      error={error}
      headerData={headerData}
      getRootProps={getRootProps}
      getInputProps={getInputProps}
      uploadedFiles={uploadedFiles}
      showToast={showToast}
      toastData={toastData}
      handleChange={handleChange}
      handleSelectChange={handleSelectChange}
      tagData={tagData}
      documentTypeData={documentTypeData}
      handleCustomSelect={handleCustomSelect}
      handleSubmit={handleSubmit}
      setShowToast={setShowToast}
      // handleFileChange={handleFileChange}
    />
  );
};

export default Home;
