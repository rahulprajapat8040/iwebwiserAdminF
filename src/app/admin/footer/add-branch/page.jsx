"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { Apis } from "@/utils/Apis";
import { CountryCode } from "@/utils/CountryCode";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBranch = () => {


  // ALL COUNTRIES API END

  const [branchTitle, setBranchTitle] = useState("");
  const [branchAddress, setBranchAddress] = useState("");
  const [branchCity, setBranchCity] = useState("");
  const [branchState, setBranchState] = useState("");
  const [branchZipCode, setBranchZipCode] = useState("");
  const [branchCountry, setBracnhCountry] = useState("");
  const [page, setPage] = useState("");

  // Update the index whenever the branch type changes

  const handleCreateBranch = async (e) => {

    e.preventDefault();
    try {
      const response = await axios.post(Apis.createBranch, {
        title: branchTitle,
        address: branchAddress,
        city: branchCity,
        state: branchState,
        zip_code: branchZipCode,
        country: branchCountry,
        pageId: page
      });
      toast.success(response.data.message)
      setBranchTitle('')
      setBranchAddress('')
      setBranchCity('')
      setBranchState('')
      setBranchZipCode('')
      setBracnhCountry('')
      setPage('')
    } catch (error) {
      console.log(error)
    }
  }

  const router = useRouter();

  return (
    <div>
      {/* Header Section */}
      <div className="dash-head">
        <div className="dash_title">
          <div onClick={() => router.back()} className="btn  d-inline-flex align-items-center gap-2">

            <div

              className="d-inline-block bg-primary p-1 px-2 rounded-3"
              style={{ cursor: "pointer" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height={25}
                viewBox="0 -968 960 960"
                width={25}
                fill="#FFFFFF"
              >
                <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
              </svg>
            </div>
            <h4 className={`main-title`}>Add Branch</h4>
          </div>
        </div>
      </div>

      {/* Body Section */}
      <div className="container-fluid">
        <div className="card">
          {/* <!-- card header start here  --> */}
          <div className="card-header">
            <div
              className="card-title d-flex justify-content-between align-items-center"
            >
              <h2>Add Branch</h2>
            </div>
          </div>
          <div className="card-body px-0 px-md-5">
            <Form className="upload-form">
              <>
                <Form.Group className="row form-group mt-1 mt-md-2">
                  <div className="col-12 col-md-3">
                    <Form.Label className={`col-form-label form-label d-flex justify-content-left justify-content-md-center`}>
                      Branch Title
                    </Form.Label>
                  </div>
                  <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
                    <Form.Control
                      type="text"
                      placeholder="Enter Branch Name"
                      className={`form-control form-control-lg form-input`}
                      value={branchTitle}
                      onChange={(e) => setBranchTitle(e.target.value)}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="row form-group mt-1 mt-md-2">
                  <div className="col-12 col-md-3">
                    <Form.Label className={`col-form-label form-label d-flex justify-content-left justify-content-md-center`}>
                      Address
                    </Form.Label>
                  </div>
                  <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
                    <Form.Control
                      type="text"
                      placeholder="Enter Branch Address"
                      className={`form-control form-control-lg form-input`}
                      value={branchAddress}
                      onChange={(e) => setBranchAddress(e.target.value)}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="row form-group mt-1 mt-md-2">
                  <div className="col-12 col-md-3">
                    <Form.Label className={`col-form-label form-label d-flex justify-content-left justify-content-md-center`}>
                      City
                    </Form.Label>
                  </div>
                  <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
                    <Form.Control
                      type="text"
                      placeholder="Enter Branch Address"
                      className={`form-control form-control-lg form-input`}
                      value={branchCity}
                      onChange={(e) => setBranchCity(e.target.value)}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="row form-group mt-1 mt-md-2">
                  <div className="col-12 col-md-3">
                    <Form.Label className={`col-form-label form-label d-flex justify-content-left justify-content-md-center`}>
                      State/Province
                    </Form.Label>
                  </div>
                  <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
                    <Form.Control
                      type="text"
                      placeholder="Enter Branch Address"
                      className={`form-control form-control-lg form-input`}
                      value={branchState}
                      onChange={(e) => setBranchState(e.target.value)}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="row form-group mt-1 mt-md-2">
                  <div className="col-12 col-md-3">
                    <Form.Label className={`col-form-label form-label d-flex justify-content-left justify-content-md-center`}>
                      Zip-Code
                    </Form.Label>
                  </div>
                  <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
                    <Form.Control
                      type="text"
                      placeholder="Enter Branch Address"
                      className={`form-control form-control-lg form-input`}
                      value={branchZipCode}
                      onChange={(e) => setBranchZipCode(e.target.value)}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="row form-group mt-1 mt-md-2">
                  <div className="col-12 col-md-3">
                    <Form.Label className={`col-form-label form-label d-flex justify-content-left justify-content-md-center`}>
                      Country/region
                    </Form.Label>
                  </div>
                  <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
                    <Form.Select
                      type="text"
                      placeholder="Enter Branch Address"
                      className={`form-control form-control-lg form-input`}
                      value={branchCountry}
                      onChange={(e) => setBracnhCountry(e.target.value)}
                    >
                      {CountryCode.map((country) => (
                        <option key={country.code} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                </Form.Group>
                <Form.Group className="row form-group mt-1 mt-md-2">
                  <div className="col-12 col-md-3">
                    <Form.Label className={`col-form-label form-label d-flex justify-content-left justify-content-md-center`}>
                      Page Select
                    </Form.Label>
                  </div>
                  <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
                    <Form.Select
                      value={page || ""}
                      onChange={(e) => setPage(e.target.value)}
                      className={`form-control form-control-lg form-input`}
                    >
                      <option value="">Select Page</option>
                      <option value="global">Globle</option>
                      <option value="local">Local</option>
                    </Form.Select>
                  </div>
                </Form.Group>
              </>

              {/* Submit Button */}
              <div className="row">
                <div className="col-4 col-md-3"></div>
                <div className="col-12 col-md-9 form-button">
                  <Button variant="secondary" type="button" className="btn form-cancel">
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateBranch}
                    variant="primary"
                    className="btn form-btn"
                  >
                    Save
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBranch;
