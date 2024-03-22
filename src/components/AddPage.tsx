import React from "react";
interface AppProps {
  cabinet: string;
  response: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const AddPage = ({ cabinet, handleChange, response }: AppProps) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h1 className="mt-3 mb-3 ">Add Cabinet</h1>
          <form>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Cabinet Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="please input cabinet name"
                value={cabinet}
                onChange={handleChange}
              />
            </div>
            <div>
              <button className="btn btn-primary"> Add</button>
            </div>
          </form>

          <div className="response">{response}</div>
          <button className="btn btn-primary">copy</button>
        </div>
      </div>
    </div>
  );
};

export default AddPage;
