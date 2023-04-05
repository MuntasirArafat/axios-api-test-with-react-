import React, { useState } from "react";
import axios from "axios";

function App() {
  const [value, setValue] = useState({
    area: "",
    rate: "",
    status: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
  };

  const picker = (event) => {
    setValue({
      ...value,
      status: event.target.value,
    });
  };

  const onSubmit = () => {
    if (value.area === "") {
      alert("Please Type Area Name");
      return;
    } else if (value.rate === "") {
      alert("Please Type Rate");
      return;
    } else if (value.status === "") {
      alert("Please Select Status");
      return;
    }

    setIsLoading(true);

    const { area, rate, status } = value;

    axios
      .post("#", {
        area,
        rate,
        status,
      })
      .then((response) => {
        if (response.data === 1) {
          alert("Success");
          setValue({
            area: "",
            rate: "",
            status: "",
          });
        } else {
          alert("Failed");
        }

        setIsLoading(false);
      })
      .catch((error) => {
        alert("Error Occurred");
        setIsLoading(false);
      });
  };

  return (
    <>
      <main>
        <div className="box-head row align-items-center">
          <div className="col">
            <h2>Area Report</h2>
            <p className="flex align-items-center mt-4 label-from">
              <b className="text-primary">Dashboard</b>{" "}
              <span class="material-symbols-outlined">chevron_right</span> Add
              Area
            </p>
          </div>
          <div className="col"></div>
        </div>
        <hr />

        <form>
          <div className="card mt-4 rounded-lg">
            <h3 className="p-15">Area</h3>
            <div className="row">
              <div className="col">
                <p className="label-from">Area Name</p>
                <input
                  className="from-cotrol"
                  placeholder="Enter Area Name"
                  type="text"
                  name="area"
                  onChange={handleInputChange}
                  value={value.area}
                />
                <p className="label-from">Status</p>
                <input
                  type="text"
                  list="statusList"
                  name="status"
                  onChange={picker}
                  value={value.status}
                  autoComplete="off"
                />
                <datalist id="statusList">
                  <option value="">Select Status</option>
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </datalist>
              </div>
              <div className="col">
                <p className="label-from">Rate</p>
                <input
                  className="from-cotrol"
                  type="number"
                  placeholder="Write Here Rate"
                  name="rate"
                  onChange={handleInputChange}
                  value={value.rate}
                />
              </div>
            </div>

            <div className="mtc-20">
              <button
                className="btn btn-pramiry"
                onClick={onSubmit}
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>

        </div>

        </form>

        </main>

        </>
  );
}
 export default App;
