"use client";
import { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import styles from "@/assets/css/base.module.css";
import { BsCloudUpload } from "react-icons/bs";
import { IoIosAdd, IoIosClose } from "react-icons/io";
import { getAllIndustry } from "@/lib/redux/features/GetAllIndustry";
import { useDispatch, useSelector } from "react-redux";
import { Apis } from "@/utils/Apis";
import axios from "axios";
import { CountryCode } from "@/utils/CountryCode";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
const AddCaseStudy = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  // const [buttonLinks, setButtonLinks] = useState([""]);
  const [phases, setPhases] = useState([{ title: "", features: [""] }]);
  const [industries, setIndustries] = useState([])

  const fetchIndustries = async () => {
    try {
      const res = await axios.get(`${Apis.getAllIndustryFull}`);
      setIndustries(res.data.data.industryData)
    } catch (error) {
      console.log(res)
    }

  }

  useEffect(() => {
    fetchIndustries()
  }, [])


  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [caseStudy, setCaseStudy] = useState({
    productName: "",
    productSlogan: "",
    description: "",
    country: "",
    platformUsers: "",
    downloads: "",
    buttonLinks: [""],
    image: "",
  });
  const [userCertificate, setUserCertificate] = useState({
    certificateImage: []  // Initialize certificateImage as an empty array
  });
  const [Challenges, setChallenges] = useState({
    challeng: "",
    solution: "",
    image: "",
  });
  const [addImpact, setAddImpact] = useState({
    title: "",
    businessImpact: "",
    userImpact: "",
    image: "",
  });

  // Handlers for updating buttonLinks in caseStudy
  const addButtonLink = () => {
    setCaseStudy((prevCaseStudy) => ({
      ...prevCaseStudy,
      buttonLinks: [...prevCaseStudy.buttonLinks, ""],
    }));
  };

  const removeButtonLink = (index) => {
    setCaseStudy((prevCaseStudy) => {
      const updatedLinks = [...prevCaseStudy.buttonLinks];
      updatedLinks.splice(index, 1);
      return {
        ...prevCaseStudy,
        buttonLinks: updatedLinks,
      };
    });
  };

  const handleButtonLinkChange = (index, value) => {
    setCaseStudy((prevCaseStudy) => {
      const updatedLinks = [...prevCaseStudy.buttonLinks];
      updatedLinks[index] = value;
      return {
        ...prevCaseStudy,
        buttonLinks: updatedLinks,
      };
    });
  };
  // Handlers for adding/removing phases
  const addPhase = () => {
    setPhases([...phases, { title: "", features: [""] }]);
  };

  const removePhase = (index) => {
    const updatedPhases = [...phases];
    updatedPhases.splice(index, 1);
    setPhases(updatedPhases);
  };

  const handlePhaseChange = (index, field, value) => {
    const updatedPhases = [...phases];
    updatedPhases[index][field] = value;
    setPhases(updatedPhases);
  };

  // Handlers for features within a phase
  const addFeature = (phaseIndex) => {
    const updatedPhases = [...phases];
    updatedPhases[phaseIndex].features.push("");
    setPhases(updatedPhases);
  };

  const removeFeature = (phaseIndex, featureIndex) => {
    const updatedPhases = [...phases];
    updatedPhases[phaseIndex].features.splice(featureIndex, 1);
    setPhases(updatedPhases);
  };

  const handleFeatureChange = (phaseIndex, featureIndex, value) => {
    const updatedPhases = [...phases];
    updatedPhases[phaseIndex].features[featureIndex] = value;
    setPhases(updatedPhases);
  };

  // HANDLE UPLOAD CERTIFICATE IMAGES  
  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (files.length === 0) return;

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append('file', file, file.name);
    });

    try {
      const response = await axios.post(`${Apis.uploadFile}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const uploadedImageUrls = response.data.map(item => item.url); // Extract URLs from the response data array
      setUserCertificate((prevUserCertificate) => ({
        ...prevUserCertificate,
        certificateImage: [
          ...prevUserCertificate.certificateImage,  // Preserve existing images
          ...uploadedImageUrls,  // Add the new uploaded image URLs
        ],
      }));
      toast.success("Certificate image uploaded successfully");

    } catch (error) {
      console.error('Error uploading files:', error);
      // Handle error appropriately
    }
  };

  // HANDLE UPLOAD CASE STUDY IMAGES
  const handleCaseFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${Apis.uploadFile}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const uploadedImageUrl = response.data.url; // Extract URL from the response data
      setCaseStudy((prevCaseStudy) => ({
        ...prevCaseStudy,
        image: uploadedImageUrl,
      }));
      toast.success("Case study image uploaded successfully");

    } catch (error) {
      console.error('Error uploading file:', error);
      // Handle error appropriately
    }
  }

  // HANDLE UPLOAD CAHLLENGES IMAGE 
  const handleChallengesFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${Apis.uploadFile}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const uploadedImageUrl = response.data.url; // Extract URL from the response data
      setChallenges((prevChallenges) => ({
        ...prevChallenges,
        image: uploadedImageUrl,
      }));
      toast.success("Challenges image uploaded successfully");

    } catch (error) {
      console.error('Error uploading file:', error);
      // Handle error appropriately
    }
  }

  // HANDLE UPLOAD ADD IMPACT IMAGE
  const handleAddImpactFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${Apis.uploadFile}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const uploadedImageUrl = response.data.url; // Extract URL from the response data
      setAddImpact((prevAddImpact) => ({
        ...prevAddImpact,
        image: uploadedImageUrl,
      }));
      toast.success("Add Impact image uploaded successfully");

    } catch (error) {
      console.error('Error uploading file:', error);
      // Handle error appropriately
    }
  }

  // ADD CASE 
  const handleAddCase = async () => {
    try {
      const res = await axios.post(`${Apis.addCase}`, {
        addCaseStudy: caseStudy,
        userCertificate: userCertificate,
        challenges: Challenges,
        impact: addImpact,
        system_phase: phases,
        industryId: selectedIndustry,

      })
      toast.success(res.data.message)
      setCaseStudy(null)
      setUserCertificate(null)
      setChallenges(null)
      setAddImpact(null)
      setPhases(null)
      setSelectedIndustry(null)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCancel = () => {
    router.push('/admin/case-study/list')
  }

  return (
    <div>
      <ToastContainer />
      <Row>
        {/* Add Case Study Section */}
        <Col md={6}>
          <div className={`card`}>
            <div className="card-header">
              <div
                className="card-title d-flex justify-content-between align-items-center"
              >
                <h2>Add Case Study</h2>
              </div>
            </div>
            <div className="card-body px-4">
              <Form className="upload-form">
                <Form.Group className="mb-3 row form-group mt-1 mt-md-2" controlId="caseTitle">
                  <Form.Label
                    column
                    md={3}
                    className={`col-form-label text-nowrap form-label d-flex justify-content-start justify-content-md-center`}
                  >
                    Product Name
                  </Form.Label>
                  <div className="col-12 col-md-8 mt-0">
                    <Form.Control
                      type="text"
                      placeholder="Enter Case Title..."
                      className={`form-control form-control-lg form-input`}
                      value={caseStudy.productName}
                      onChange={(e) =>
                        setCaseStudy((prevCaseStudy) => ({
                          ...prevCaseStudy,
                          productName: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                </Form.Group>

                <Form.Group as={Row} className="row form-group" controlId="productSlogan">
                  <div className="col-12 col-md-4">

                    <Form.Label
                      className={`col-form-label form-label d-flex justify-content-start justify-content-md-center text-nowrap`}
                    >
                      Product Slogan
                    </Form.Label>
                  </div>
                  <div className="col-12 col-md-8 mt-0">
                    <Form.Control
                      type="text"
                      value={caseStudy.productSlogan}
                      onChange={(e) => setCaseStudy((prevCaseStudy) => ({
                        ...prevCaseStudy,
                        productSlogan: e.target.value
                      }))}
                      placeholder="Enter Product Slogan..."
                      required
                      className={`form-control form-control-lg form-input`}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="row form-group" controlId="country">
                  <div className="col-12 col-md-4">
                    <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                      Industry
                    </Form.Label>
                  </div>
                  <div className="col-12 col-md-8 mt-0">
                    <Form.Select
                      required
                      value={selectedIndustry || ""}
                      onChange={(e) => setSelectedIndustry(e.target.value)}
                      className={`form-control form-control-lg form-input`}
                    >
                      <option value={''} >select industry</option>
                      {industries?.map((indusry, index) => (
                        <option key={index} value={indusry.id}>
                          {indusry.title}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                </Form.Group>

                {/* <Form.Group as={Row} className="mb-3" controlId="industry">
                  <div className="col-12 col-md-4">
                    <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center text-nowrap`}>
                      Industry
                    </Form.Label>
                  </div>
                  <div className="col-12 col-md-8 mt-0">
                    <select
                      required
                      id="industry"
                      value={selectedIndustry || ""}
                      onChange={(e) => setSelectedIndustry(e.target.value)}
                      className="form-control form-control-lg form-input"
                    >
                      {industries.map((indusry, index) => (
                        <option key={index} value={indusry.id}>
                          {indusry.title}
                        </option>
                      ))}{" "}
                    </select>
                  </div>
                </Form.Group> */}

                <Form.Group className="row form-group" controlId="description">
                  <div className="col-12 col-md-4">
                    <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center text-nowrap`}>
                      Description
                    </Form.Label>
                  </div>
                  <div className="col-12 col-md-8 mt-0">
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={caseStudy.description}
                      onChange={(e) => setCaseStudy((prevCaseStudy) => ({
                        ...prevCaseStudy,
                        description: e.target.value
                      }))}
                      placeholder="Write your description here..."
                      className={`form-control form-control-lg form-textbox`}
                    />
                  </div>
                </Form.Group>

                <Form.Group className="row form-group" controlId="country">
                  <div className="col-12 col-md-4">
                    <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                      Country
                    </Form.Label>
                  </div>
                  <div className="col-12 col-md-8 mt-0">
                    <Form.Select
                      required
                      value={caseStudy.country}
                      onChange={(e) => setCaseStudy((prevCaseStudy) => ({
                        ...prevCaseStudy,
                        country: e.target.value
                      }))}
                      className={`form-control form-control-lg form-input`}
                    >
                      {CountryCode.map((country) => (
                        <option key={country.code} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                </Form.Group>

                <Form.Group className="row form-group" controlId="platformUsers">
                  <div className="col-12 col-md-4">
                    <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                      Platform Users
                    </Form.Label>
                  </div>

                  <div className="col-12 col-md-8 mt-0">
                    <Form.Control
                      type="text"
                      value={caseStudy.platformUsers}
                      onChange={(e) => setCaseStudy((prevCaseStudy) => ({
                        ...prevCaseStudy,
                        platformUsers: e.target.value
                      }))}
                      placeholder="Enter Number of Users..."
                      required
                      className={`form-control form-control-lg form-input`}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="row form-group" controlId="platformUsers">
                  <div className="col-12 col-md-4">
                    <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                      Downloads
                    </Form.Label>
                  </div>

                  <div className="col-12 col-md-8 mt-0">
                    <Form.Control
                      type="text"
                      value={caseStudy.downloads}
                      onChange={(e) => setCaseStudy((prevCaseStudy) => ({
                        ...prevCaseStudy,
                        downloads: e.target.value
                      }))}
                      placeholder="Enter Number of Users..."
                      required
                      className={`form-control form-control-lg form-input`}
                    />
                  </div>
                </Form.Group>

                <Form.Group className="row form-group" controlId="btnLink">
                  <div className="col-12 col-md-4">
                    <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                      Button Link
                    </Form.Label>
                  </div>
                  <div className="col-12 col-md-8 mt-0">
                    {caseStudy.buttonLinks.map((link, index) => (
                      <div key={index} className="d-flex mb-2">
                        <Form.Control
                          type="text"
                          placeholder="Enter Link..."
                          required
                          className={`form-control form-control-lg form-input`}
                          value={link}
                          onChange={(e) =>
                            handleButtonLinkChange(index, e.target.value)
                          }
                        />
                        <Button
                          className="bg-transparent border-0"
                          onClick={
                            index === 0
                              ? addButtonLink // Add button always on the first field
                              : () => removeButtonLink(index) // Close button for other fields
                          }
                        >
                          {index === 0 ? (
                            <IoIosAdd color="gray" size={25} />
                          ) : (
                            <IoIosClose color="gray" size={25} />
                          )}
                        </Button>
                      </div>
                    ))}
                  </div>
                </Form.Group>

                <Form.Group
                  className="row form-group"
                  controlId=" uploadImage"
                >
                  <div className="col-12 col-md-4">
                    <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                      Upload Image
                    </Form.Label>
                  </div>
                  <div className="col-12 col-md-8 mt-0">
                    <div className="upload-input">
                      <Form.Control type="file" onChange={handleCaseFileChange} hidden />
                      <Form.Label className="form-label form-img-uploader rounded-4 d-flex flex-column align-items-center justify-content-center w-100 py-4 position-relative">
                        <BsCloudUpload size={40} color="gray" />
                        <h6
                          className="text-center "
                          style={{ fontSize: "13px" }}
                        >
                          Upload Image
                        </h6>
                      </Form.Label>
                    </div>
                  </div>
                </Form.Group>
              </Form>
            </div>
          </div>
          <div
            className={`card`}
          >
            <div className="card-header">

              <div
                className="card-title d-flex justify-content-between align-items-center"
              >
                <h2>Add User Certificate</h2>
              </div>
            </div>
            <div className="card-body">
              <Form className="upload-form">

                <Form.Group className="row form-group">
                  <div className="col-12 col-md-4">

                    <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                      Upload certificate
                    </Form.Label>
                  </div>
                  <div className="col-12 col-md-8 mt-0">
                    <div className="upload-input">
                      <Form.Control id="userCertificate"
                        type="file" multiple onChange={handleFileChange}
                        hidden />
                      <Form.Label
                        htmlFor="userCertificate"
                        className="form-label flex-column form-img-uploader rounded-4 d-flex align-items-center justify-content-center w-100 py-4 position-relative"
                      >
                        <BsCloudUpload size={40} color="gray" />
                        <h6 className="text-center " style={{ fontSize: "13px" }}>
                          Upload Image
                        </h6>
                      </Form.Label>
                    </div>
                  </div>
                </Form.Group>
              </Form>
            </div>
          </div>
        </Col>

        {/* Add Product Info Section */}
        <div className="col-12 col-md-6 mt-3 mt-md-0">
          <div
            className={`card`}
          >
            {/* card header start here   */}
            <div className="card-header">
              <div
                className="card-title d-flex justify-content-between align-items-center"
              >
                <h2>Add Challenges</h2>
              </div>
            </div>
            {/* // <!-- card header end here  --> */}
            <div className="card-body">
              <Form className="upload-form">
                <Form.Group className="row form-group" controlId="productInfo">
                  <div className="col-12 col-md-4">

                    <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                      Challenge
                    </Form.Label>
                  </div>
                  <div className="col-12 col-md-8 mt-0">
                    <Form.Control
                      as="textarea"
                      rows={4}
                      cols={30}
                      value={Challenges.challeng}
                      onChange={(e) => setChallenges((prevChallenges) => ({
                        ...prevChallenges,
                        challeng: e.target.value
                      }))}
                      placeholder="write your description here..."
                      required
                      className={`form-control form-control-lg form-textbox`}
                    />
                  </div>
                </Form.Group>

                <Form.Group
                  className="row form-group"
                  controlId="productDescription"
                >
                  <div className="col-12 col-md-4">
                    <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                      Solution
                    </Form.Label>
                  </div>
                  <div className="col-12 col-md-8 mt-0">
                    <Form.Control
                      as="textarea"
                      value={Challenges.solution}
                      onChange={(e) => setChallenges((prevChallenges) => ({
                        ...prevChallenges,
                        solution: e.target.value
                      }))}
                      rows={4}
                      placeholder="Write your description here..."
                      className={`form-control form-control-lg form-textbox`}
                    />
                  </div>
                </Form.Group>

                <Form.Group className="row form-group">
                  <div className="col-12 col-md-4">
                    <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                      Challenges Image
                    </Form.Label>
                  </div>
                  <div className="col-12 col-md-8 mt-0">
                    <div className="upload-input">
                      <Form.Control id="solutionImage"
                        onChange={handleChallengesFileChange}
                        type="file" hidden />
                      <Form.Label htmlFor="solutionImage" className="form-label form-img-uploader rounded-4 d-flex flex-column align-items-center justify-content-center w-100 py-4 position-relative">
                        <BsCloudUpload size={40} color="gray" />
                        <h6
                          className="text-center "
                          style={{ fontSize: "13px" }}
                        >
                          Upload Image
                        </h6>
                      </Form.Label>
                    </div>
                  </div>
                </Form.Group>
              </Form>
            </div>
          </div>
          <div className="card">
            {/* <!-- card header start here  --> */}
            <div className="card-header">
              <div
                className="card-title d-flex justify-content-between align-items-center"
              >
                <h2>Add Impact</h2>
              </div>
            </div>
            <div className="card-body">
              <Form className="upload-form">
                <Form.Group className="row form-group mt-1 mt-md-2" controlId="productInfo">
                  <div className="col-12 col-md-4">

                    <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                      Title
                    </Form.Label>
                  </div>
                  <div className="col-12 col-md-8 mt-0">
                    <Form.Control
                      type="text"
                      value={addImpact.title}
                      onChange={(e) => setAddImpact((prevAddImpact) => ({
                        ...prevAddImpact,
                        title: e.target.value
                      }))}
                      placeholder="write your description here..."
                      required
                      className={`form-control form-control-lg form-input`}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="row form-group" controlId="productInfo">
                  <div className="col-12 col-md-4">

                    <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                      Bussiness Impact
                    </Form.Label>
                  </div>
                  <div className="col-12 col-md-8 mt-0">
                    <Form.Control
                      as="textarea"
                      value={addImpact.businessImpact}
                      onChange={(e) => setAddImpact((prevAddImpact) => ({
                        ...prevAddImpact,
                        businessImpact: e.target.value
                      }))}
                      rows={4}
                      placeholder="write your description here..."
                      required
                      className={`form-control form-control-lg form-textbox`}
                    />
                  </div>
                </Form.Group>

                <Form.Group
                  className="row form-group"
                  controlId="productDescription"
                >
                  <div
                    className="col-12 col-md-4"
                  >

                    <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                      User Impact
                    </Form.Label>
                  </div>
                  <div className="col-12 col-md-8 mt-0">
                    <Form.Control
                      as="textarea"
                      value={addImpact.userImpact}
                      onChange={(e) => setAddImpact((prevAddImpact) => ({
                        ...prevAddImpact,
                        userImpact: e.target.value
                      }))}
                      rows={4}
                      placeholder="Write your description here..."
                      className={`form-control form-control-lg form-textbox`}
                    />
                  </div>
                </Form.Group>

                <Form.Group className="row form-group">
                  <div className="col-12 col-md-4">

                    <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                      Impact Image
                    </Form.Label>
                  </div>
                  <div className="col-12 col-md-8 mt-0">
                    <div className="form-group mb-20 upload-input">
                      <Form.Control type="file" id="userImpactImage"
                        onChange={handleAddImpactFileChange}
                        hidden />
                      <Form.Label htmlFor="userImpactImage" className="form-label flex-column form-img-uploader rounded-4 d-flex align-items-center justify-content-center w-100 py-4 position-relative">
                        <BsCloudUpload size={40} color="gray" />
                        <h6
                          className="text-center "
                          style={{ fontSize: "13px" }}
                        >
                          Upload Image
                        </h6>
                      </Form.Label>
                    </div>
                  </div>
                </Form.Group>
              </Form>
            </div>
          </div>

          {/* Add System Phase Section */}
          <div className="card mt-3">
            {/* <!-- card header start here  --> */}
            <div className="card-header">
              <div
                className="card-title d-flex justify-content-between align-items-center"
              >
                <h2>Add System Phase</h2>
                {/* <!-- <a href="add_header.html" className="btn sub_btn">ADD</a> --> */}
              </div>
            </div>
            <div className="card-body">
              <Form className="upload-form">
                {phases.map((phase, phaseIndex) => (
                  <div key={phaseIndex} className="mb-4 border-bottom pb-3">
                    <Form.Group className="row form-group mt-1 mt-md-2">
                      <div className="col-12 col-md-4">

                        <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                          Phase Title
                        </Form.Label>
                      </div>
                      <div className="col-12 col-md-8 mt-0">
                        <div className="d-flex">
                          <Form.Control
                            type="text"
                            placeholder="Enter Phase Title..."
                            required
                            className={`form-control form-control-lg form-input`}
                            value={phase.title}
                            onChange={(e) =>
                              handlePhaseChange(
                                phaseIndex,
                                "title",
                                e.target.value
                              )
                            }
                          />
                          <Button
                            className="bg-transparent border-0"
                            onClick={
                              phaseIndex === 0
                                ? addPhase // Add button only for the first phase
                                : () => removePhase(phaseIndex) // Close button for others
                            }
                          >
                            {phaseIndex === 0 ? (
                              <IoIosAdd color="gray" size={25} />
                            ) : (
                              <IoIosClose color="gray" size={25} />
                            )}
                          </Button>
                        </div>
                      </div>
                    </Form.Group>

                    {phase.features.map((feature, featureIndex) => (
                      <Form.Group key={featureIndex} className="row form-group ">
                        <div className="col-12 col-md-4">

                          <Form.Label
                            className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}
                          >
                            Phase Feature
                          </Form.Label>
                        </div>
                        <div className="col-12 col-md-8 mt-0">
                          <div className="d-flex">
                            <Form.Control
                              type="text"
                              placeholder="Enter Phase Feature..."
                              required
                              className={`form-control form-control-lg form-input`}
                              value={feature}
                              onChange={(e) =>
                                handleFeatureChange(
                                  phaseIndex,
                                  featureIndex,
                                  e.target.value
                                )
                              }
                            />
                            <Button
                              className="bg-transparent border-0"
                              onClick={
                                featureIndex === 0
                                  ? () => addFeature(phaseIndex)
                                  : () =>
                                    removeFeature(phaseIndex, featureIndex) // Close button for others
                              }
                            >
                              {featureIndex === 0 ? (
                                <IoIosAdd color="gray" size={25} />
                              ) : (
                                <IoIosClose color="gray" size={25} />
                              )}
                            </Button>
                          </div>
                        </div>
                      </Form.Group>
                    ))}
                  </div>
                ))}
              </Form>
            </div>
          </div>
        </div>

        {/* Submit Section */}
        <Col xs={12} className="my-3">
          <div className="d-flex justify-content-center justify-content-md-end gap-3">
            <Button variant="secondary" onClick={handleCancel} type="button" className="btn form-cancel">
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddCase} className="btn form-btn">
              Save
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AddCaseStudy;
