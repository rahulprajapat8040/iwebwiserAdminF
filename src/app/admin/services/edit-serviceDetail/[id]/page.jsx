"use client";
import { use, useEffect, useState } from "react";
import { Form, Button, Row, Col, Accordion } from "react-bootstrap";
import styles from "@/assets/css/base.module.css";
import { getAllIndustry } from "@/lib/redux/features/GetAllIndustry";
import { useDispatch, useSelector } from "react-redux";
import { Apis } from "@/utils/Apis";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { Editor } from "@tinymce/tinymce-react";
import { getAllServicesFull } from "@/lib/redux/features/GetAllServices";
import { getSubServiceById } from "@/lib/redux/features/GetAllSubServices";
import { IoIosAdd, IoIosClose } from "react-icons/io";
import { BsCloudUpload } from "react-icons/bs";
import { getAllTechnologyFull } from "@/lib/redux/features/GetAllTechnologies";


const EditServiceDetail = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = useParams();
    const [selectedService, setSelectedService] = useState(null);
    const { services } = useSelector((state) => state.getAllServicesFull);
    const { subServices } = useSelector((state) => state.getSubServiceById);
    const { technologies } = useSelector((state) => state.getAllTechnologyFull);

    const [isClient, setIsClient] = useState(false);
    const [slug, setSlug] = useState("");
    const [heroTitle, setHeroTitle] = useState("");
    const [heroDescription, setHeroDescription] = useState("");
    const [heroBtnText, setHeroBtnText] = useState("");
    const [heroBtnLink, setHeroBtnLink] = useState("");
    const [serviceSectionTitle, setServiceSectionTitle] = useState("");
    const [serviceSectionSubTitle, setServiceSectionSubTitle] = useState("");
    const [serviceSectionDescription, setServiceSectionDescription] = useState("");
    const [serviceSectionBtnText, setServiceSectionBtnText] = useState("");
    const [serviceSectionBtnLink, setServiceSectionBtnLink] = useState("");
    const [serviceIndustryTitle, setServiceIndustryTitle] = useState("");
    const [serviceIndustryDescription, setServiceIndustryDescription] = useState("");
    const [toolsTitle, setToolsTitle] = useState("");
    const [toolsDescription, setToolsDescription] = useState("");
    const [serviceSolution, setServiceSolution] = useState([{ title: "", description: "" }]);
    const [steps, setSteps] = useState([{ title: "", description: "", image: "" }]);
    const [techSections, setTechSections] = useState([{ title: "", technologies: [] }]);

    useEffect(() => {
        setIsClient(true);
        dispatch(getAllServicesFull());
        dispatch(getAllTechnologyFull())
    }, [dispatch]);

    useEffect(() => {
        if (selectedService) {
            dispatch(getSubServiceById(selectedService));
        }
    }, [selectedService, dispatch]);

    // Fetch service detail data by ID
    useEffect(() => {
        const fetchServiceDetail = async () => {
            try {
                const response = await axios.get(`${Apis.getServiceDetailById}/${id}`);
                const data = response.data.data;
                
                // Populate form fields with existing data
                setSlug(data.slug);
                setSelectedService(data.service_id);
                setHeroTitle(data.hero_title);
                setHeroDescription(data.hero_description);
                setHeroBtnText(data.heroButtonText);
                setHeroBtnLink(data.heroButtonLink);
                setServiceSectionTitle(data.ServiceDetailTitle);
                setServiceSectionSubTitle(data.ServiceDetailSubTitle);
                setServiceSectionDescription(data.ServiceDetailDescription);
                setServiceSectionBtnText(data.ServiceDetailButtonText);
                setServiceSectionBtnLink(data.ServiceDetailButtonUrl);
                setServiceIndustryTitle(data.serviceIndustryTitle);
                setServiceIndustryDescription(data.serviceIndustryDescription);
                setToolsTitle(data.serviceToolTitle);
                setToolsDescription(data.serviceToolDescription);
                setServiceSolution(data.serviceSolution || [{ title: "", description: "" }]);
                setSteps(data.stepsWeFollow || [{ title: "", description: "", image: "" }]);
                setTechSections(data.techWeUse || [{ title: "", technologies: [] }]);
            } catch (error) {
                console.error("Error fetching service detail:", error);
                toast.error("Error fetching service detail");
            }
        };

        if (id) {
            fetchServiceDetail();
        }
    }, [id]);

    const handleServiceSolutionChange = (index, field, value) => {
        const updatedSolution = [...serviceSolution];
        updatedSolution[index][field] = value;
        setServiceSolution(updatedSolution);
    };

    const addServiceSolution = () => {
        setServiceSolution([...serviceSolution, { title: "", description: "" }]);
    };

    const removeServiceSolution = (index) => {
        const updatedSolution = [...serviceSolution];
        updatedSolution.splice(index, 1);
        setServiceSolution(updatedSolution);
    };

    const handleStepsWeFollowChange = (index, field, value) => {
        const updatedSteps = [...steps];
        updatedSteps[index][field] = value;
        setSteps(updatedSteps);
    };

    const addStepsWeFollow = () => {
        setSteps([...steps, { title: "", description: "", image: "" }]);
    };

    const removeStepsWeFollow = (index) => {
        const updatedSteps = [...steps];
        updatedSteps.splice(index, 1);
        setSteps(updatedSteps);
    };

    const handleStepImageChange = async (e, index) => {
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
            const updatedSteps = [...steps];
            updatedSteps[index].image = uploadedImageUrl;
            setSteps(updatedSteps);
            toast.success("Image uploaded successfully");
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleTechSectionChange = (index, field, value) => {
        const updatedSections = [...techSections];
        updatedSections[index][field] = value;
        setTechSections(updatedSections);
    };

    const handleTechSelection = (sectionIndex, tech) => {
        const updatedSections = [...techSections];
        const techIndex = updatedSections[sectionIndex].technologies.findIndex((t) => t.id === tech.id);
        if (techIndex > -1) {
            updatedSections[sectionIndex].technologies.splice(techIndex, 1);
        } else {
            updatedSections[sectionIndex].technologies.push(tech);
        }
        setTechSections(updatedSections);
    };

    const addTechSection = () => {
        setTechSections([...techSections, { title: "", technologies: [] }]);
    };

    const removeTechSection = (index) => {
        const updatedSections = [...techSections];
        updatedSections.splice(index, 1);
        setTechSections(updatedSections);
    };

    const handleUpdateServiceDetail = async () => {
        try {
            // Validate required fields
            if (!selectedService || !heroTitle || !serviceIndustryTitle || !serviceIndustryDescription) {
                toast.error("Please fill all required fields");
                return;
            }

            const serviceData = {
                service_id: selectedService,
                slug: slug,
                hero_title: heroTitle,
                hero_description: heroDescription,
                heroButtonText: heroBtnText,
                heroButtonLink: heroBtnLink,
                ServiceDetailTitle: serviceSectionTitle,
                ServiceDetailSubTitle: serviceSectionSubTitle,
                ServiceDetailDescription: serviceSectionDescription,
                ServiceDetailButtonText: serviceSectionBtnText,
                ServiceDetailButtonUrl: serviceSectionBtnLink,
                serviceIndustryTitle: serviceIndustryTitle,
                serviceIndustryDescription: serviceIndustryDescription,
                serviceToolTitle: toolsTitle,
                serviceToolDescription: toolsDescription,
                serviceSolution: serviceSolution,
                stepsWeFollow: steps,
                techWeUse: techSections,
            };

            const res = await axios.put(`${Apis.updateServiceDetail}/${id}`, serviceData);
            toast.success(res.data.message);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div>
            <ToastContainer />
            <Row>
                {/* Left Column */}
                <Col md={6}>
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">
                                <h2>Hero Section</h2>
                            </div>
                        </div>
                        <div className="card-body">
                            <Form className="upload-form">
                                <Form.Group className="row form-group" controlId="heroTitle">
                                    <div className="col-12 col-md-3">
                                        <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                                            Slug
                                        </Form.Label>
                                    </div>
                                    <div className="col-12 col-md-9 mt-0">
                                        <Form.Control
                                            type="text"
                                            value={slug}
                                            onChange={(e) => setSlug(e.target.value)}
                                            placeholder="eg: /service-slug"
                                            required
                                            className={`form-control form-control-lg form-input`}
                                        />
                                    </div>
                                </Form.Group>
                                <Form.Group className="row form-group" controlId="heroTitle">
                                    <div className="col-12 col-md-3">
                                        <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                                            Hero Title
                                        </Form.Label>
                                    </div>
                                    <div className="col-12 col-md-9 mt-0">
                                        <Form.Control
                                            type="text"
                                            value={heroTitle}
                                            onChange={(e) => setHeroTitle(e.target.value)}
                                            placeholder="Hero Title..."
                                            required
                                            className={`form-control form-control-lg form-input`}
                                        />
                                    </div>
                                </Form.Group>

                                <Form.Group className="row form-group" controlId="service">
                                    <div className="col-12 col-md-3">
                                        <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                                            Service
                                        </Form.Label>
                                    </div>
                                    <div className="col-12 col-md-9 mt-0">
                                        <Form.Select
                                            required
                                            value={selectedService || ""}
                                            onChange={(e) => setSelectedService(e.target.value)}
                                            className={`form-control form-control-lg form-input`}
                                        >
                                            <option value={''}>select Service</option>
                                            {services?.map((service, index) => (
                                                <option key={index} value={service.id}>
                                                    {service.title}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </div>
                                </Form.Group>

                                <Form.Group className="row form-group" controlId="heroDescription">
                                    <div className="col-12 col-md-3">
                                        <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                                            Description
                                        </Form.Label>
                                    </div>
                                    <div className="col-12 col-md-9 mt-0">
                                        {isClient && (
                                            <Editor
                                                apiKey="an08ruvf6el10km47b0qr7vkwpoldafttauwj424r7y8y5e2"
                                                value={heroDescription}
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
                                                onEditorChange={(content) => setHeroDescription(content)}
                                            />
                                        )}
                                    </div>
                                </Form.Group>

                                <Form.Group className="row form-group" controlId="heroBtnText">
                                    <div className="col-12 col-md-3">
                                        <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                                            Button Title
                                        </Form.Label>
                                    </div>
                                    <div className="col-12 col-md-9 mt-0">
                                        <Form.Control
                                            type="text"
                                            value={heroBtnText}
                                            onChange={(e) => setHeroBtnText(e.target.value)}
                                            placeholder="Hero Button Text..."
                                            required
                                            className={`form-control form-control-lg form-input`}
                                        />
                                    </div>
                                </Form.Group>

                                <Form.Group className="row form-group" controlId="heroBtnLink">
                                    <div className="col-12 col-md-3">
                                        <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                                            Button Link
                                        </Form.Label>
                                    </div>
                                    <div className="col-12 col-md-9 mt-0">
                                        <Form.Control
                                            type="text"
                                            value={heroBtnLink}
                                            onChange={(e) => setHeroBtnLink(e.target.value)}
                                            placeholder="Enter Btn Link..."
                                            required
                                            className={`form-control form-control-lg form-input`}
                                        />
                                    </div>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>

                    <div className="card mt-3">
                        <div className="card-header">
                            <div className="card-title">
                                <h2>Tools Details</h2>
                            </div>
                        </div>
                        <div className="card-body">
                            <Form className="upload-form">
                                <Form.Group className="row form-group mt-1 mt-md-2">
                                    <div className="col-12 col-md-3">
                                        <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                                            Title
                                        </Form.Label>
                                    </div>
                                    <div className="col-12 col-md-9 mt-0">
                                        <Form.Control
                                            type="text"
                                            value={toolsTitle}
                                            onChange={(e) => setToolsTitle(e.target.value)}
                                            placeholder="Enter Tools Title..."
                                            required
                                            className={`form-control form-control-lg form-input`}
                                        />
                                    </div>
                                </Form.Group>

                                <Form.Group className="row form-group">
                                    <div className="col-12 col-md-3">
                                        <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                                            Description
                                        </Form.Label>
                                    </div>
                                    <div className="col-12 col-md-9 mt-0">
                                        {isClient && (
                                            <Editor
                                                apiKey="an08ruvf6el10km47b0qr7vkwpoldafttauwj424r7y8y5e2"
                                                value={toolsDescription}
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
                                                onEditorChange={(content) => setToolsDescription(content)}
                                            />
                                        )}
                                    </div>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>

                    <div className="card mt-3">
                        <div className="card-header">
                            <div className="card-title">
                                <h2>Steps we follow</h2>
                            </div>
                        </div>
                        <div className="card-body">
                            <Form className="upload-form">
                                {steps.map((step, index) => (
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
                                                        value={step.title}
                                                        onChange={(e) => handleStepsWeFollowChange(index, 'title', e.target.value)}
                                                        placeholder="Enter title..."
                                                        required
                                                        className={`form-control form-control-lg form-input`}
                                                    />
                                                    <Button
                                                        className="bg-transparent border-0"
                                                        onClick={index === 0 ? addStepsWeFollow : () => removeStepsWeFollow(index)}
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
                                                    value={step.description}
                                                    onChange={(e) => handleStepsWeFollowChange(index, 'description', e.target.value)}
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
                                                    <Form.Control type="file" id={`userImpactImage-${index}`}
                                                        onChange={(e) => handleStepImageChange(e, index)}
                                                        hidden />
                                                    <Form.Label htmlFor={`userImpactImage-${index}`} className="form-label flex-column form-img-uploader rounded-4 d-flex align-items-center justify-content-center w-100 py-4 position-relative">
                                                        <BsCloudUpload size={40} color="gray" />
                                                        <h6 className="text-center" style={{ fontSize: "13px" }}>
                                                            Upload Image
                                                        </h6>
                                                    </Form.Label>
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </div>
                                ))}
                            </Form>
                        </div>
                    </div>
                </Col>

                {/* Right Column */}
                <Col md={6}>
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">
                                <h2>Services Details</h2>
                            </div>
                        </div>
                        <div className="card-body">
                            <Form className="upload-form">
                                <Form.Group className="row form-group" controlId="serviceSectionTitle">
                                    <div className="col-12 col-md-3">
                                        <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                                            Heading
                                        </Form.Label>
                                    </div>
                                    <div className="col-12 col-md-9 mt-0">
                                        <Form.Control
                                            type="text"
                                            value={serviceSectionTitle}
                                            onChange={(e) => setServiceSectionTitle(e.target.value)}
                                            placeholder="Service Section Title..."
                                            required
                                            className={`form-control form-control-lg form-input`}
                                        />
                                    </div>
                                </Form.Group>

                                <Form.Group className="row form-group" controlId="serviceSectionSubTitle">
                                    <div className="col-12 col-md-3">
                                        <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                                            Sub Heading
                                        </Form.Label>
                                    </div>
                                    <div className="col-12 col-md-9 mt-0">
                                        <Form.Control
                                            type="text"
                                            value={serviceSectionSubTitle}
                                            onChange={(e) => setServiceSectionSubTitle(e.target.value)}
                                            placeholder="Service Section Sub Title..."
                                            required
                                            className={`form-control form-control-lg form-input`}
                                        />
                                    </div>
                                </Form.Group>

                                <Form.Group className="row form-group" controlId="serviceSectionDescription">
                                    <div className="col-12 col-md-3">
                                        <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                                            Description
                                        </Form.Label>
                                    </div>
                                    <div className="col-12 col-md-9 mt-0">
                                        {isClient && (
                                            <Editor
                                                apiKey="an08ruvf6el10km47b0qr7vkwpoldafttauwj424r7y8y5e2"
                                                value={serviceSectionDescription}
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
                                                onEditorChange={(content) => setServiceSectionDescription(content)}
                                            />
                                        )}
                                    </div>
                                </Form.Group>

                                <Form.Group className="row form-group" controlId="serviceSectionBtnText">
                                    <div className="col-12 col-md-3">
                                        <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                                            Button Title
                                        </Form.Label>
                                    </div>
                                    <div className="col-12 col-md-9 mt-0">
                                        <Form.Control
                                            type="text"
                                            value={serviceSectionBtnText}
                                            onChange={(e) => setServiceSectionBtnText(e.target.value)}
                                            placeholder="Service Section Button Text..."
                                            required
                                            className={`form-control form-control-lg form-input`}
                                        />
                                    </div>
                                </Form.Group>

                                <Form.Group className="row form-group" controlId="serviceSectionBtnLink">
                                    <div className="col-12 col-md-3">
                                        <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                                            Button Link
                                        </Form.Label>
                                    </div>
                                    <div className="col-12 col-md-9 mt-0">
                                        <Form.Control
                                            type="text"
                                            value={serviceSectionBtnLink}
                                            onChange={(e) => setServiceSectionBtnLink(e.target.value)}
                                            placeholder="Service Section Button Link..."
                                            required
                                            className={`form-control form-control-lg form-input`}
                                        />
                                    </div>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>

                    <div className="card mt-3">
                        <div className="card-header">
                            <div className="card-title">
                                <h2>Service Industry</h2>
                            </div>
                        </div>
                        <div className="card-body">
                            <Form className="upload-form">
                                <Form.Group className="row form-group" controlId="serviceIndustryTitle">
                                    <div className="col-12 col-md-3">
                                        <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                                            Title
                                        </Form.Label>
                                    </div>
                                    <div className="col-12 col-md-9 mt-0">
                                        <Form.Control
                                            type="text"
                                            value={serviceIndustryTitle}
                                            onChange={(e) => setServiceIndustryTitle(e.target.value)}
                                            placeholder="Service Industry Title..."
                                            required
                                            className={`form-control form-control-lg form-input`}
                                        />
                                    </div>
                                </Form.Group>

                                <Form.Group className="row form-group" controlId="serviceIndustryDescription">
                                    <div className="col-12 col-md-3">
                                        <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                                            Description
                                        </Form.Label>
                                    </div>
                                    <div className="col-12 col-md-9 mt-0">
                                        {isClient && (
                                            <Editor
                                                apiKey="an08ruvf6el10km47b0qr7vkwpoldafttauwj424r7y8y5e2"
                                                value={serviceIndustryDescription}
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
                                                onEditorChange={(content) => setServiceIndustryDescription(content)}
                                            />
                                        )}
                                    </div>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>

                    <div className="card mt-3">
                        <div className="card-header">
                            <div className="card-title">
                                <h2>Service Solutions</h2>
                            </div>
                        </div>
                        <div className="card-body">
                            <Form className="upload-form">
                                {serviceSolution.map((solution, index) => (
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
                                                        value={solution.title}
                                                        onChange={(e) => handleServiceSolutionChange(index, 'title', e.target.value)}
                                                        placeholder="Enter title..."
                                                        required
                                                        className={`form-control form-control-lg form-input`}
                                                    />
                                                    <Button
                                                        className="bg-transparent border-0"
                                                        onClick={index === 0 ? addServiceSolution : () => removeServiceSolution(index)}
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
                                                    value={solution.description}
                                                    onChange={(e) => handleServiceSolutionChange(index, 'description', e.target.value)}
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

                    <div className="card mt-3">
                        <div className="card-header">
                            <div className="card-title">
                                <h2>Tech we use</h2>
                            </div>
                        </div>
                        <div className="card-body">
                            <Form className="upload-form">
                                {techSections.map((section, sectionIndex) => (
                                    <div key={sectionIndex} className="mb-4 border-bottom pb-3">
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
                                                        value={section.title}
                                                        onChange={(e) => handleTechSectionChange(sectionIndex, 'title', e.target.value)}
                                                        placeholder="Enter title..."
                                                        required
                                                        className={`form-control form-control-lg form-input`}
                                                    />
                                                    <Button
                                                        className="bg-transparent border-0"
                                                        onClick={sectionIndex === 0 ? addTechSection : () => removeTechSection(sectionIndex)}
                                                    >
                                                        {sectionIndex === 0 ? (
                                                            <IoIosAdd color="gray" size={25} />
                                                        ) : (
                                                            <IoIosClose color="gray" size={25} />
                                                        )}
                                                    </Button>
                                                </div>
                                            </div>
                                        </Form.Group>
                                        <Accordion>
                                            <Accordion.Item eventKey="0">
                                                <div style={{ height: "20px" }}>
                                                    <Accordion.Header>Technology</Accordion.Header>
                                                </div>
                                                <Accordion.Body style={{ height: "200px", overflowY: "scroll", scrollbarWidth: "thin" }}>
                                                    {technologies?.map((tech, techIndex) => (
                                                        <Form.Group key={techIndex} className="row form-group">
                                                            <div className="col-12 col-md-8 mt-0">
                                                                <Form.Check
                                                                    type="checkbox"
                                                                    checked={section.technologies.some((t) => t.id === tech.id)}
                                                                    onChange={() => handleTechSelection(sectionIndex, tech)}
                                                                    label={tech.title}
                                                                />
                                                            </div>
                                                        </Form.Group>
                                                    ))}
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </div>
                                ))}
                            </Form>
                        </div>
                    </div>
                </Col>

                {/* Submit Section */}
                <Col xs={12} className="my-3">
                    <div className="d-flex justify-content-center justify-content-md-end gap-3">
                        <Button 
                            variant="secondary" 
                            onClick={() => router.push('/admin/services/service-detail-list')} 
                            className="btn form-cancel"
                        >
                            Cancel
                        </Button>
                        <Button 
                            variant="primary" 
                            onClick={handleUpdateServiceDetail} 
                            className="btn form-btn"
                        >
                            Update
                        </Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default EditServiceDetail;