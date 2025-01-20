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
import { Editor } from "@tinymce/tinymce-react";
const AddCaseStudy = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  // const [buttonLinks, setButtonLinks] = useState([""]);
  const [additionalInfo, setAdditionalInfo] = useState([
    { title: '', description: '' }
  ]);

  // METAS TAGS STATE

  const [metas, setMetas] = useState("")

  const [phases, setPhases] = useState([{ title: "", features: [""] }]);
  const [industries, setIndustries] = useState([])

  const fetchIndustries = async () => {
    try {
      const res = await axios.get(`${Apis.getAllIndustryFull}`);
      setIndustries(res.data.data.industryData)
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    fetchIndustries()
  }, [])

  const [slug, setSlug] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [caseStudy, setCaseStudy] = useState({
    productName: "",
    productSlogan: "",
    short_description: "",
    full_description: "",
    country: "",
    platformUsers: "",
    downloads: "",
    buttonLinks: [""],
    image: "",
    imageAlt: "",
    mainImage: "",
    mainImageAlt: ""
  });
  const [userCertificate, setUserCertificate] = useState({
    certificateImage: []  // Initialize certificateImage as an empty array
  });
  const [Challenges, setChallenges] = useState({
    challeng: "",
    solution: "",
    image: "",
    alt: ""
  });
  const [addImpact, setAddImpact] = useState({
    businessImpact: "",
    userImpact: "",
    image: "",
    alt: ""
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

  // Add handlers for additional info
  const addAdditionalInfo = () => {
    setAdditionalInfo([...additionalInfo, { title: '', description: '' }]);
  };

  const removeAdditionalInfo = (index) => {
    const updatedInfo = [...additionalInfo];
    updatedInfo.splice(index, 1);
    setAdditionalInfo(updatedInfo);
  };

  const handleAdditionalInfoChange = (index, field, value) => {
    const updatedInfo = [...additionalInfo];
    updatedInfo[index][field] = value;
    setAdditionalInfo(updatedInfo);
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
  const handleMainImageChange = async (e) => {
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
        mainImage: uploadedImageUrl,
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
        slug: slug,
        addCaseStudy: caseStudy,
        userCertificate: userCertificate,
        challenges: Challenges,
        impact: addImpact,
        system_phase: phases,
        industryId: selectedIndustry,
        addtional_information: additionalInfo,  // Now sending array of additional info
        metas: metas
      })
      toast.success(res.data.message)
      setSlug("")
      setCaseStudy({
        productName: "",
        productSlogan: "",
        short_description: "",
        full_description: "",
        country: "",
        platformUsers: "",
        downloads: "",
        buttonLinks: [""],
        image: "",
        mainImage: "",
        imageAlt: "",
        mainImageAlt: ""
      })
      setUserCertificate()
      setChallenges({
        challeng: "",
        solution: "",
        image: "",
        alt: ""
      })
      setAddImpact({
        businessImpact: "",
        userImpact: "",
        image: "",
        alt: ""
      })
      setPhases([{ title: "", features: [""] }])
      setSelectedIndustry("")
      setAdditionalInfo([{ title: '', description: '' }])
      setMetas("")
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
                <Form.Group className="mb-3 row form-group mt-1 mt-md-2" controlId="caseSlug">
                  <Form.Label
                    column
                    md={3}
                    className={`col-form-label text-nowrap form-label d-flex justify-content-start justify-content-md-center`}
                  >
                    Slug
                  </Form.Label>
                  <div className="col-12 col-md-8 mt-0">
                    <Form.Control
                      type="text"
                      placeholder="eg:  my-case"
                      className={`form-control form-control-lg form-input`}
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      required
                    />
                  </div>
                </Form.Group>
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
                      Short Description
                    </Form.Label>
                  </div>
                  <div className="col-12 col-md-8 mt-0">
                    {isClient && (
                      <Editor
                        apiKey="an08ruvf6el10km47b0qr7vkwpoldafttauwj424r7y8y5e2"
                        value={caseStudy.short_description}
                        init={{
                          height: 250,
                          menubar: false,
                          plugins: [
                            'autolink',
                            'lists', 'link', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
                            'fullscreen', 'insertdatetime', 'media', 'table', 'help', 'wordcount',
                          ],
                          toolbar: 'undo redo | casechange blocks | bold italic backcolor forecolor| ' +
                            'alignleft aligncenter alignright alignjustify | ' +
                            'bullist numlist  outdent indent | removeformat |  code table help'
                        }}
                        onEditorChange={(content) => setCaseStudy((prevCaseStudy) => ({
                          ...prevCaseStudy,
                          short_description: content
                        }))}
                      />
                    )}
                  </div>
                </Form.Group>
                <Form.Group className="row form-group" controlId="description">
                  <div className="col-12 col-md-4">
                    <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center text-nowrap`}>
                      Full Description
                    </Form.Label>
                  </div>
                  <div className="col-12 col-md-8 mt-0">
                    {isClient && (
                      <Editor
                        apiKey="an08ruvf6el10km47b0qr7vkwpoldafttauwj424r7y8y5e2"
                        value={caseStudy.full_description}
                        init={{
                          height: 250,
                          menubar: false,
                          plugins: [
                            'autolink',
                            'lists', 'link', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
                            'fullscreen', 'insertdatetime', 'media', 'table', 'help', 'wordcount',
                          ],
                          toolbar: 'undo redo | casechange blocks | bold italic backcolor forecolor| ' +
                            'alignleft aligncenter alignright alignjustify | ' +
                            'bullist numlist  outdent indent | removeformat |  code table help'
                        }}
                        onEditorChange={(content) => setCaseStudy((prevCaseStudy) => ({
                          ...prevCaseStudy,
                          full_description: content
                        }))}
                      />
                    )}
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
                <Form.Group className="mb-3 row form-group mt-1 mt-md-2" controlId="imageAlt">
                  <Form.Label
                    column
                    md={3}
                    className={`col-form-label text-nowrap form-label d-flex justify-content-start justify-content-md-center`}
                  >
                    Image Alt
                  </Form.Label>
                  <div className="col-12 col-md-8 mt-0">
                    <Form.Control
                      type="text"
                      placeholder="Image Alt"
                      className={`form-control form-control-lg form-input`}
                      value={caseStudy.imageAlt}
                      onChange={(e) =>
                        setCaseStudy((prevCaseStudy) => ({
                          ...prevCaseStudy,
                          imageAlt: e.target.value,
                        }))
                      }
                    />
                  </div>
                </Form.Group>
                <Form.Group
                  className="row form-group"
                  controlId=" uploadMainImage"
                >
                  <div className="col-12 col-md-4">
                    <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                      Main Image
                    </Form.Label>
                  </div>
                  <div className="col-12 col-md-8 mt-0">
                    <div className="upload-input">
                      <Form.Control type="file" onChange={handleMainImageChange} hidden />
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
                <Form.Group className="mb-3 row form-group mt-1 mt-md-2" controlId="main-img-alt">
                  <Form.Label
                    column
                    md={3}
                    className={`col-form-label text-nowrap form-label d-flex justify-content-start justify-content-md-center`}
                  >
                    Main ImageAlt
                  </Form.Label>
                  <div className="col-12 col-md-8 mt-0">
                    <Form.Control
                      type="text"
                      placeholder="Main Image Alt"
                      className={`form-control form-control-lg form-input`}
                      value={caseStudy.mainImageAlt}
                      onChange={(e) =>
                        setCaseStudy((prevCaseStudy) => ({
                          ...prevCaseStudy,
                          mainImageAlt: e.target.value,
                        }))
                      }
                      required
                    />
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
          <div className="card">
            <div className="card-header">
              <div
                className="card-title d-flex justify-content-between align-items-center"
              >
                <h2>Add Additional Info</h2>
              </div>
            </div>
            {/* // <!-- card header end here  --> */}
            <div className="card-body">
              <Form className="upload-form">
                {additionalInfo.map((info, index) => (
                  <div key={index} className="mb-4 border-bottom pb-3">
                    <Form.Group className="row form-group">
                      <div className="col-12 col-md-4">
                        <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                          Title
                        </Form.Label>
                      </div>
                      <div className="col-12 col-md-8 mt-0">
                        <div className="d-flex">
                          <Form.Control
                            type="text"
                            value={info.title}
                            onChange={(e) => handleAdditionalInfoChange(index, 'title', e.target.value)}
                            placeholder="Enter title..."
                            required
                            className={`form-control form-control-lg form-input`}
                          />
                          <Button
                            className="bg-transparent border-0"
                            onClick={index === 0 ? addAdditionalInfo : () => removeAdditionalInfo(index)}
                          >
                            {index === 0 ? (
                              <IoIosAdd color="gray" size={25} />
                            ) : (
                              <IoIosClose color="gray" size={25} />
                            )}
                          </Button>
                        </div>
                      </div>
                    </Form.Group>

                    <Form.Group className="row form-group mt-3">
                      <div className="col-12 col-md-4">
                        <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                          Description
                        </Form.Label>
                      </div>
                      <div className="col-12 col-md-8 mt-0">
                        <Form.Control
                          as="textarea"
                          value={info.description}
                          onChange={(e) => handleAdditionalInfoChange(index, 'description', e.target.value)}
                          rows={4}
                          placeholder="Write your description here..."
                          className={`form-control form-control-lg form-textbox`}
                        />
                      </div>
                    </Form.Group>
                  </div>
                ))}
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
                    {isClient && (
                      <Editor
                        apiKey="an08ruvf6el10km47b0qr7vkwpoldafttauwj424r7y8y5e2"
                        value={Challenges.challeng}
                        init={{
                          height: 250,
                          menubar: false,
                          plugins: [
                            'autolink',
                            'lists', 'link', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
                            'fullscreen', 'insertdatetime', 'media', 'table', 'help', 'wordcount',
                          ],
                          toolbar: 'undo redo | casechange blocks | bold italic backcolor forecolor| ' +
                            'alignleft aligncenter alignright alignjustify | ' +
                            'bullist numlist  outdent indent | removeformat |  code table help'
                        }}
                        onEditorChange={(content) => setChallenges((prevChallenges) => ({
                          ...prevChallenges,
                          challeng: content
                        }))}
                      />
                    )}
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
                    {isClient && (
                      <Editor
                        apiKey="an08ruvf6el10km47b0qr7vkwpoldafttauwj424r7y8y5e2"
                        value={Challenges.solution}
                        init={{
                          height: 250,
                          menubar: false,
                          plugins: [
                            'autolink',
                            'lists', 'link', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
                            'fullscreen', 'insertdatetime', 'media', 'table', 'help', 'wordcount',
                          ],
                          toolbar: 'undo redo | casechange blocks | bold italic backcolor forecolor| ' +
                            'alignleft aligncenter alignright alignjustify | ' +
                            'bullist numlist  outdent indent | removeformat |  code table help'
                        }}
                        onEditorChange={(content) => setChallenges((prevChallenges) => ({
                          ...prevChallenges,
                          solution: content
                        }))}
                      />
                    )}
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
                <Form.Group className="mb-3 row form-group mt-1 mt-md-2" controlId="challeng-alt">
                  <Form.Label
                    column
                    md={3}
                    className={`col-form-label text-nowrap form-label d-flex justify-content-start justify-content-md-center`}
                  >
                    Image Alt
                  </Form.Label>
                  <div className="col-12 col-md-8 mt-0">
                    <Form.Control
                      type="text"
                      placeholder="Image Alt"
                      className={`form-control form-control-lg form-input`}
                      value={Challenges.alt}
                      onChange={(e) =>
                        setChallenges((prevCaseStudy) => ({
                          ...prevCaseStudy,
                          alt: e.target.value,
                        }))
                      }
                    />
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
                <Form.Group className="row form-group" controlId="productInfo">
                  <div className="col-12 col-md-4">

                    <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                      Bussiness Impact
                    </Form.Label>
                  </div>
                  <div className="col-12 col-md-8 mt-0">
                    {isClient && (
                      <Editor
                        apiKey="an08ruvf6el10km47b0qr7vkwpoldafttauwj424r7y8y5e2"
                        value={addImpact.businessImpact}
                        init={{
                          height: 250,
                          menubar: false,
                          plugins: [
                            'autolink',
                            'lists', 'link', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
                            'fullscreen', 'insertdatetime', 'media', 'table', 'help', 'wordcount',
                          ],
                          toolbar: 'undo redo | casechange blocks | bold italic backcolor forecolor| ' +
                            'alignleft aligncenter alignright alignjustify | ' +
                            'bullist numlist  outdent indent | removeformat |  code table help'
                        }}
                        onEditorChange={(content) => setAddImpact((prevAddImpact) => ({
                          ...prevAddImpact,
                          businessImpact: content
                        }))}
                      />
                    )}
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
                    {isClient && (
                      <Editor
                        apiKey="an08ruvf6el10km47b0qr7vkwpoldafttauwj424r7y8y5e2"
                        value={addImpact.userImpact}
                        init={{
                          height: 250,
                          menubar: false,
                          plugins: [
                            'autolink',
                            'lists', 'link', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
                            'fullscreen', 'insertdatetime', 'media', 'table', 'help', 'wordcount',
                          ],
                          toolbar: 'undo redo | casechange blocks | bold italic backcolor forecolor| ' +
                            'alignleft aligncenter alignright alignjustify | ' +
                            'bullist numlist  outdent indent | removeformat |  code table help'
                        }}
                        onEditorChange={(content) => setAddImpact((prevAddImpact) => ({
                          ...prevAddImpact,
                          userImpact: content
                        }))}
                      />
                    )}
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
                <Form.Group className="mb-3 row form-group mt-1 mt-md-2" controlId="impact-alt">
                  <Form.Label
                    column
                    md={3}
                    className={`col-form-label text-nowrap form-label d-flex justify-content-start justify-content-md-center`}
                  >
                    Image Alt
                  </Form.Label>
                  <div className="col-12 col-md-8 mt-0">
                    <Form.Control
                      type="text"
                      placeholder="Image Alt"
                      className={`form-control form-control-lg form-input`}
                      value={addImpact.alt}
                      onChange={(e) =>
                        setAddImpact((prevCaseStudy) => ({
                          ...prevCaseStudy,
                          alt: e.target.value,
                        }))
                      }
                    />
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
          <div className="card mt-3">
            {/* <!-- card header start here  --> */}
            <div className="card-header">
              <div
                className="card-title d-flex justify-content-between align-items-center"
              >
                <h2>Metas</h2>
                {/* <!-- <a href="add_header.html" className="btn sub_btn">ADD</a> --> */}
              </div>
            </div>
            <div className="card-body">
              <Form className="upload-form">
                <div className="mb-3 pb-3">


                  <div className="mb-4 border-bottom pb-3">
                    <Form.Group className="row form-group mt-3">
                      <div className="col-12 col-md-4">
                        <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                          Meta Tags
                        </Form.Label>
                      </div>
                      <div className="col-12 col-md-8 mt-0">
                        <Form.Control
                          as="textarea"
                          rows={4}
                          value={metas}
                          onChange={(e) => setMetas(e.target.value)}
                          placeholder="Write Meta tags here..."
                          className={`form-control form-control-lg form-textbox`}
                        />
                      </div>
                    </Form.Group>
                  </div>
                </div>
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
