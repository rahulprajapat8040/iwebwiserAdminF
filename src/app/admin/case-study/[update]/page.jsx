"use client";
import { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import styles from "@/assets/css/base.module.css";
import { BsCloudUpload } from "react-icons/bs";
import { IoIosAdd, IoIosClose, IoIosCloseCircleOutline } from "react-icons/io";
import { getAllIndustry } from "@/lib/redux/features/GetAllIndustry";
import { useDispatch, useSelector } from "react-redux";
import { Apis } from "@/utils/Apis";
import axios from "axios";
import { CountryCode } from "@/utils/CountryCode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Editor } from "@tinymce/tinymce-react";

const UpdateCaseStudy = () => {
    const router = useRouter();
    const { update: id } = useParams();
    const dispatch = useDispatch();
    const [phases, setPhases] = useState([{ title: "", features: [""] }]);
    const [industries, setIndustries] = useState([])
    const [isClient, setIsClient] = useState(false);
    const [additionalInfo, setAdditionalInfo] = useState([
        { title: '', description: '' }
    ]);
    const [slug, setSlug] = useState('');

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
        short_description: "",
        full_description: "",
        country: "",
        platformUsers: "",
        downloads: "",
        buttonLinks: [""],
        image: "",
        mainImage: "",
    });

    console.log(caseStudy.productName)
    const [userCertificate, setUserCertificate] = useState({
        certificateImage: []
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

    useEffect(() => {
        dispatch(getAllIndustry());
        if (id) {
            fetchCaseStudyById(id);
        }
    }, [id, dispatch]);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const fetchCaseStudyById = async (id) => {
        try {
            const response = await axios.get(`${Apis.getCaseStudyById}/${id}`);
            const data = response.data.data;
            setCaseStudy(data.addCaseStudy);
            setUserCertificate(data.userCertificate);
            setChallenges(data.challenges);
            setAddImpact(data.impact);
            setPhases(data.system_phase);
            setSelectedIndustry(data.industryId);
            setSlug(data.slug);
            setAdditionalInfo(data.addtional_information || [{ title: '', description: '' }]);
        } catch (error) {
            console.error("Error fetching case study:", error);
        }
    };

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
            const uploadedImageUrls = response.data.map(item => item.url);
            setUserCertificate((prevUserCertificate) => ({
                ...prevUserCertificate,
                certificateImage: [
                    ...prevUserCertificate.certificateImage,
                    ...uploadedImageUrls,
                ],
            }));
            toast.success("Certificate image uploaded successfully");

        } catch (error) {
            console.error('Error uploading files:', error);
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
            const uploadedImageUrl = response.data.url;
            setCaseStudy((prevCaseStudy) => ({
                ...prevCaseStudy,
                image: uploadedImageUrl,
            }));
            console.log(response)
            toast.success("Case study image uploaded successfully");

        } catch (error) {
            console.error('Error uploading file:', error);
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

    // HANDLE UPLOAD CHALLENGES IMAGE 
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
            const uploadedImageUrl = response.data.url;
            setChallenges((prevChallenges) => ({
                ...prevChallenges,
                image: uploadedImageUrl,
            }));
            toast.success("Challenges image uploaded successfully");

        } catch (error) {
            console.error('Error uploading file:', error);
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
            const uploadedImageUrl = response.data.url;
            setAddImpact((prevAddImpact) => ({
                ...prevAddImpact,
                image: uploadedImageUrl,
            }));
            toast.success("Add Impact image uploaded successfully");

        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }

    const removeCertificateImage = (index) => {
        setUserCertificate((prevUserCertificate) => {
            const updatedImages = [...prevUserCertificate.certificateImage];
            updatedImages.splice(index, 1);
            return {
                ...prevUserCertificate,
                certificateImage: updatedImages,
            };
        });
    };

    const removeCaseStudyImage = () => {
        setCaseStudy((prevCaseStudy) => ({
            ...prevCaseStudy,
            image: "",
        }));
    };

    const removeMainImage = () => {
        setCaseStudy((prevCaseStudy) => ({
            ...prevCaseStudy,
            mainImage: "",
        }));
    };

    const removeChallengesImage = () => {
        setChallenges((prevChallenges) => ({
            ...prevChallenges,
            image: "",
        }));
    };

    const removeAddImpactImage = () => {
        setAddImpact((prevAddImpact) => ({
            ...prevAddImpact,
            image: "",
        }));
    };

    // UPDATE CASE 
    const handleUpdateCase = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`${Apis.updateCaseStudy}/${id}`, {
                slug: slug,
                addCaseStudy: caseStudy,
                userCertificate: userCertificate,
                challenges: Challenges,
                impact: addImpact,
                system_phase: phases,
                industryId: selectedIndustry,
                addtional_information: additionalInfo
            });
            toast.success(res.data.message);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <ToastContainer />
            <Row>
                {/* Update Case Study Section */}
                <Col md={6}>
                    <div className={`card`}>
                        <div className="card-header">
                            <div className="card-title d-flex justify-content-between align-items-center">
                                <h2>Add Case Study</h2>
                            </div>
                        </div>
                        <div className="card-body px-4">
                            <Form className="upload-form" >
                                <Form.Group className="mb-3 row form-group mt-1 mt-md-2" controlId="caseTitle">
                                    <Form.Label column md={3} className={`col-form-label text-nowrap form-label d-flex justify-content-start justify-content-md-center`}>
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
                                        <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center text-nowrap`}>
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
                                            {industries.map((indusry, index) => (
                                                <option key={index} value={indusry.id}>
                                                    {indusry.title}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </div>
                                </Form.Group>

                                <Form.Group className="row form-group" controlId="slug">
                                    <div className="col-12 col-md-4">
                                        <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                                            Slug
                                        </Form.Label>
                                    </div>
                                    <div className="col-12 col-md-8 mt-0">
                                        <Form.Control
                                            type="text"
                                            placeholder="eg: my-case"
                                            className={`form-control form-control-lg form-input`}
                                            value={slug}
                                            onChange={(e) => setSlug(e.target.value)}
                                            required
                                        />
                                    </div>
                                </Form.Group>

                                <Form.Group className="row form-group" controlId="short_description">
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

                                <Form.Group className="row form-group" controlId="full_description">
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
                                                            ? addButtonLink
                                                            : () => removeButtonLink(index)
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

                                <Form.Group className="row form-group" controlId="uploadImage">
                                    <div className="col-12 col-md-4">
                                        <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                                            Upload Image
                                        </Form.Label>
                                    </div>
                                    <div className="col-12 col-md-8 mt-0 position-relative">
                                        <div className="upload-input z-3">
                                            <Form.Control type="file" onChange={handleCaseFileChange} hidden />
                                            <Form.Label className="form-label z-3 h-100 form-img-uploader rounded-4 d-flex flex-column align-items-center justify-content-center w-100 py-4 position-relative" style={{ zIndex: '2', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                                <BsCloudUpload size={40} color="white" />
                                                <h6 className="text-center text-white " style={{ fontSize: "13px" }}>
                                                    Upload Image
                                                </h6>
                                            </Form.Label>
                                        </div>
                                        <div className="d-flex mt-1 justify-center w-100 top-0 position-absolute -z-2">
                                            {caseStudy.image && (
                                                <div className="mb-2 position-relative d-flex justify-content-center align-items-center w-100 h-100 " >
                                                    <Image src={caseStudy.image} alt="Case Study Image" width={100} height={100} className="object-fit-contain" style={{ width: '50%', }} />
                                                    <IoIosCloseCircleOutline
                                                        size={20}
                                                        color="red"
                                                        className="position-absolute"
                                                        style={{ top: 0, right: 1, cursor: "pointer" }}
                                                        onClick={removeCaseStudyImage}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Form.Group>
                                <Form.Group className="row form-group" controlId="uploadMainImage">
                                    <div className="col-12 col-md-4">
                                        <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                                            Main Image
                                        </Form.Label>
                                    </div>
                                    <div className="col-12 col-md-8 mt-0 position-relative">
                                        <div className="upload-input z-3">
                                            <Form.Control type="file" onChange={handleMainImageChange} hidden />
                                            <Form.Label className="form-label z-3 h-100 form-img-uploader rounded-4 d-flex flex-column align-items-center justify-content-center w-100 py-4 position-relative" style={{ zIndex: '2', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                                <BsCloudUpload size={40} color="white" />
                                                <h6 className="text-center text-white " style={{ fontSize: "13px" }}>
                                                    Upload Image
                                                </h6>
                                            </Form.Label>
                                        </div>
                                        <div className="d-flex mt-1 justify-center w-100 top-0 position-absolute -z-2">
                                            {caseStudy.mainImage && (
                                                <div className="mb-2 position-relative d-flex justify-content-center align-items-center w-100 h-100 " >
                                                    <Image src={caseStudy.mainImage} alt="Case Study Image" width={100} height={100} className="object-fit-contain" style={{ width: '50%', }} />
                                                    <IoIosCloseCircleOutline
                                                        size={20}
                                                        color="red"
                                                        className="position-absolute"
                                                        style={{ top: 0, right: 1, cursor: "pointer" }}
                                                        onClick={removeMainImage}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>
                    <div className={`card`}>
                        <div className="card-header">
                            <div className="card-title d-flex justify-content-between align-items-center">
                                <h2>Add User Certificate</h2>
                            </div>
                        </div>
                        <div className="card-body">
                            <Form className="upload-form">
                                <div className="d-flex justify-content-center gap-3">
                                    {userCertificate.certificateImage.map((image, index) => (
                                        <div key={index} className="mb-1 position-relative d-flex">
                                            <Image src={image} alt={`certificate-${index}`} width={100} height={100} className="object-fit-cover" />
                                            <IoIosCloseCircleOutline
                                                size={20}
                                                color="red"
                                                className="position-absolute"
                                                style={{ top: 0, right: '2px', cursor: "pointer" }}
                                                onClick={() => removeCertificateImage(index)}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <Form.Group className="row form-group">
                                    <div className="col-12 col-md-4">
                                        <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                                            Upload certificate
                                        </Form.Label>
                                    </div>
                                    <div className="col-12 col-md-8 mt-0">
                                        <div className="upload-input">
                                            <Form.Control id="userCertificate" type="file" multiple onChange={handleFileChange} hidden />
                                            <Form.Label htmlFor="userCertificate" className="form-label flex-column form-img-uploader rounded-4 d-flex align-items-center justify-content-center w-100 py-4 position-relative">
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
                            <div className="card-title d-flex justify-content-between align-items-center">
                                <h2>Add Additional Info</h2>
                            </div>
                        </div>
                        <div className="card-body">
                            <Form className="upload-form">
                                {additionalInfo?.map((info, index) => (
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
                    <div className={`card`}>
                        {/* card header start here   */}
                        <div className="card-header">
                            <div className="card-title d-flex justify-content-between align-items-center">
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

                                <Form.Group className="row form-group" controlId="productDescription">
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
                                    <div className="col-12 col-md-8 mt-0 position-relative">
                                        <div className="upload-input">
                                            <Form.Control id="solutionImage" onChange={handleChallengesFileChange} type="file" hidden />
                                            <Form.Label htmlFor="solutionImage" className="form-label form-img-uploader rounded-4 d-flex flex-column align-items-center justify-content-center w-100 py-4 position-relative" style={{ zIndex: 2, background: 'rgba(0,0,0,0.3' }}>
                                                <BsCloudUpload size={40} color="white" />
                                                <h6 className="text-center text-white" style={{ fontSize: "13px" }}>
                                                    Upload Image
                                                </h6>
                                            </Form.Label>
                                        </div>
                                        <div className="d-flex  justify-center w-100 h-100 top-0 position-absolute -z-2">
                                            {Challenges.image && (
                                                <div className=" position-relative w-100 h-100 d-flex justify-content-center align-items-center">
                                                    <Image src={Challenges.image} alt="challenges" width={100} height={100} className="object-fit-contain" style={{ width: '30%' }} />
                                                    <IoIosCloseCircleOutline
                                                        size={20}
                                                        color="red"
                                                        className="position-absolute"
                                                        style={{ top: 0, right: 0, cursor: "pointer" }}
                                                        onClick={removeChallengesImage}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>
                    <div className="card">
                        {/* <!-- card header start here  --> */}
                        <div className="card-header">
                            <div className="card-title d-flex justify-content-between align-items-center">
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

                                <Form.Group className="row form-group" controlId="productDescription">
                                    <div className="col-12 col-md-4">
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
                                            Upload Image
                                        </Form.Label>
                                    </div>
                                    <div className="col-12 col-md-8 position-relative mt-0 ">
                                        <div className="form-group mb-20  w-100 upload-input">
                                            <Form.Control type="file" id="userImpactImage" onChange={handleAddImpactFileChange} hidden />
                                            <Form.Label htmlFor="userImpactImage" className="form-label h-100 flex-column form-img-uploader rounded-4 d-flex align-items-center justify-content-center w-100 py-4 position-relative" style={{ zIndex: 2, background: 'rgba(0,0,0,0.5)' }}>
                                                <BsCloudUpload size={40} color="white" />
                                                <h6 className="text-center text-white" style={{ fontSize: "13px" }}>
                                                    Upload Image
                                                </h6>
                                            </Form.Label>
                                        </div>
                                        <div className="d-flex mt-1 justify-center w-100 top-0 position-absolute -z-2">
                                            {addImpact.image && (
                                                <div className="mb-2 position-relative w-100 h-100 d-flex justify-content-center align-items-center">
                                                    <Image src={addImpact.image} alt="add-impact" className="object-fit-contain" width={100} height={100} style={{ width: '80%' }} />
                                                    <IoIosCloseCircleOutline
                                                        size={20}
                                                        color="red"
                                                        className="position-absolute"
                                                        style={{ top: 0, right: 0, cursor: "pointer" }}
                                                        onClick={removeAddImpactImage}
                                                    />
                                                </div>
                                            )}
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
                            <div className="card-title d-flex justify-content-between align-items-center">
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
                                                                ? addPhase
                                                                : () => removePhase(phaseIndex)
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
                                                    <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
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
                                                                        removeFeature(phaseIndex, featureIndex)
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
                        <Button variant="secondary" onClick={() => router.push('/admin/case-study/list')} type="button" className="btn form-cancel">
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleUpdateCase} className="btn form-btn">
                            Save
                        </Button>
                    </div>
                </Col>
            </Row>
        </div >
    );
};

export default UpdateCaseStudy;
