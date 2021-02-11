import React, { useState } from 'react';
import XLSX from 'xlsx';
import { ExportCsv } from './ExportCsv';
import axios from 'axios';

function App() {
  const [fileName, fileMethod] = useState();
  const [success, successMethod] = useState();
  const [error, errorMethod] = useState();
  const [items, setItems] = useState([]);
  const submitData = (e) => {
    e.preventDefault();
    e.map((d) => {
      axios.post("http://localhost:5000/api/create", d).then(res => {
        successMethod(res);
      }).catch(err => {
        errorMethod(err);
      })
    });
  };
  const submit = (data) => {
    data.preventDefault();
    axios.post("http://localhost:5000/api/create",)
  };
  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        console.log(wb);
        resolve(data);
      };
      fileReader.onerror = (err) => {
        reject(err);
      };
    });
    promise.then((d) => {
      console.log(d);
      setItems(d);
    });
  }
  return (
    <div className="App">
      <div className="container">
        <div className="m-4">
          <div className="tile is-ancestor">
            <div className="tile is-parent">
              <article className="tile is-child notification">
                <div className="content">
                  <p className="title">Tall tile</p>
                  <div className="level">
                    <div className="level-left">
                      <div className="rows">
                        <div className="row">
                          <div className="file is-primary">
                            <label className="file-label">
                              <input className="file-input" type="file" name="resume" onChange={(e) => {
                                const file = e.target.files[0];
                                readExcel(file);
                                fileMethod(file.name);
                              }} />
                              <span className="file-cta">
                                <span className="file-icon">
                                  <i className="fas fa-upload"></i>
                                </span>
                                <span className="file-label">
                                  Click to Upload
                                </span>
                              </span>
                            </label>
                          </div>
                        </div>
                        <div className="row">
                          {fileName}
                        </div>
                        <div className="row mt-5">
                          <div className="field">
                            <p className="control has-icons-left">
                              <input className="input is-rounded" type="text" placeholder="Search"></input>
                              <span className="icon is-small is-left">
                                <i className="fas fa-search"></i>
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="level-right">
                      <ExportCsv csvData={items} fileName={fileName} />
                      <span className="ml-3"></span>
                      <button onChange={(e) => {
                        submitData(items);
                      }} className="button is-info is-rounded"><i className="fas fa-file-import"></i><span className="ml-2"></span>Import</button>
                    </div>
                  </div>
                  <div className="divider"></div>
                  <div className="scrol">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Tank Category</th>
                          <th>Tank Type</th>
                          <th>Tank Number</th>
                          <th>Manufacturer Name</th>
                          <th>Manufacturer Serial No</th>
                          <th>Build Year</th>
                          <th>Gross Weight</th>
                          <th>Tare Weight</th>
                          <th>Net Weight</th>
                          <th>Ownership Type</th>
                          <th>Ownership Date</th>
                          <th>First Hydro Test Date</th>
                          <th>Last Hydro Test Date</th>
                          <th>Next Test Date</th>
                          <th>info</th>

                        </tr>
                      </thead>
                      <tbody>
                        {items.map((d, i) => (
                          <tr key={i}>
                            <td>{i}</td>
                            <td>{d.assetTypeId}</td>
                            <td>{d.assetCategoryId}</td>
                            <td>{d.assetNumber}</td>
                            <td>{d.manufacturerName}</td>
                            <td>{d.manufacturerSerialNo}</td>
                            <td>{d.buildYear}</td>
                            <td>{d.grossWeight}</td>
                            <td>{d.tareWeight}</td>
                            <td>{d.netWeight}</td>
                            <td>{d.ownershipType}</td>
                            <td>{d.leaseId}</td>
                            <td>{d.ownershipDate}</td>
                            <td>{d.locationId}</td>
                            <td>{d.depotId}</td>
                            <td>{d.assetStatusId}</td>
                            <td>{d.firstHydroTestDate}</td>
                            <td>{d.lastHydroTestDate}</td>
                            <td>{d.nextTestDate}</td>
                            <td>{success ? success : error}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
