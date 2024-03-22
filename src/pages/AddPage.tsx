import React from "react";
import AddPageComponent from "../components/AddPage";

const AddPage = () => {
  const [cabinet, setCabinet] = React.useState("");

  const [response, setResponse] = React.useState(
    "{id: 23432: name: 'barnabas Omodara'}"
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCabinet(e.target.value);
  };
  const base_url = "http://192.168.100.36/api/v4/";
  const headers = () => {
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
  const handleAdd = () => {
    // fetch(`${base_url}`, {
    //   method: "POST",
    //   headers: headers(),
    //   body: JSON.stringify({ cabinet }),
    // }).then((res) => {
    // });
  };

  return (
    <AddPageComponent
      cabinet={cabinet}
      handleChange={handleChange}
      response={response}
    />
  );
};

export default AddPage;
