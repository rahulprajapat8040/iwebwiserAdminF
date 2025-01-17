"use client";
import { useEffect, useState } from "react";
import { Form, Button, Row, Col, Accordion } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Apis } from "@/utils/Apis";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { Editor } from "@tinymce/tinymce-react";
import { getSubServiceById } from "@/lib/redux/features/GetAllSubServices";
import { getAllServicesFull } from "@/lib/redux/features/GetAllServices";
import { IoIosAdd, IoIosClose } from "react-icons/io";
import { getAllTechnologyFull } from "@/lib/redux/features/GetAllTechnologies";
import { BsCloudUpload } from "react-icons/bs";
import Image from "next/image";


const AddServiceDetails = () => {
    const dispatch = useDispatch()
    const [selectedService, setSelectedService] = useState(null);
    const { services } = useSelector(
        (state) => state.getAllServicesFull
    );
    const { subServices } = useSelector(
        (state) => state.getSubServiceById
    );
    const { technologies } = useSelector(
        (state) => state.getAllTechnologyFull
    )
    useEffect(() => {
        dispatch(getAllServicesFull())
        dispatch(getAllTechnologyFull())
    }, [])


    useEffect(() => {
        dispatch(getSubServiceById(selectedService));
    }, [selectedService, dispatch]);


    const [isClient, setIsClient] = useState(false)
    useEffect(() => {
        setIsClient(true)
    }, [])
    const router = useRouter();
    const [heroTitle, setHeroTitle] = useState("");
    const [heroDescription, setHeroDescription] = useState("")
    const [heroBtnText, setHeroBtnText] = useState("")
    const [heroBtnLink, setHeroBtnLink] = useState("")
    const [slug, setSlug] = useState("")

    // SERVICES BASIC INFO AND SECTION
    const [serviceSectionTitle, setServiceSectionTitle] = useState("")
    const [serviceSectionSubTitle, setServiceSectionSubTitle] = useState("")
    const [serviceSectionDescription, setServiceSectionDescription] = useState("")
    const [serviceSectionBtnText, setServiceSectionBtnText] = useState("")
    const [serviceSectionBtnLink, setServiceSectionBtnLink] = useState("")

    // SERVICE INDUSTRY 

    const [serviceIndustryTitle, setServiceIndustryTitle] = useState("")
    const [serviceIndustryDescription, setServiceIndustryDescription] = useState("")

    // TOOLS DETAILS 
    const [toolsTitle, setToolsTitle] = useState("")
    const [toolsDescription, setToolsDescription] = useState("")

    // Service Solution
    const [serviceSolution, setServiceSolution] = useState([{
        title: "",
        description: "",
    }])

    const addServiceSolution = () => {
        setServiceSolution([...serviceSolution, { title: "", description: "" }])
    }

    const removeServiceSolution = (index) => {
        const updatedSolution = [...serviceSolution]
        updatedSolution.splice(index, 1)
        setServiceSolution(updatedSolution)
    }

    const handleServiceSolutionChange = (index, field, value) => {
        const updatedSolution = [...serviceSolution]
        updatedSolution[index][field] = value
        setServiceSolution(updatedSolution)
    }

    // STEPS WE FOLLOW
    const [steps, setSteps] = useState([
        {
            title: "",
            description: "",
            image: ""
        }
    ])

    const handleStepsWeFollowChange = (index, field, value) => {
        const updatedSteps = [...steps]
        updatedSteps[index][field] = value
        setSteps(updatedSteps)
    }

    const addStepsWeFollow = () => {
        const updatedSteps = [...steps]
        updatedSteps.push({
            title: "",
            description: ""
        })
        setSteps(updatedSteps)
    }

    const removeStepsWeFollow = (index) => {
        const updatedSteps = [...steps]
        updatedSteps.splice(index, 1)
        setSteps(updatedSteps)
    }

    // Tech We Use

    const [techSections, setTechSections] = useState([{ title: "", technologies: [] }]);

    const handleTechSectionChange = (index, field, value) => {
        const updatedSections = [...techSections];
        updatedSections[index][field] = value;
        setTechSections(updatedSections);
    };


    const handleTechSelection = (sectionIndex, tech) => {
        const updatedSections = [...techSections];
        const techIndex = updatedSections[sectionIndex].technologies.findIndex((t) => t.id === tech.id);
        if (techIndex > -1) {
            updatedSections[sectionIndex].technologies.splice(techIndex, 1); // Remove if already exists
        } else {
            updatedSections[sectionIndex].technologies.push(tech); // Add if not exists
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

    // ADD CASE 
    const handleAddServiceDetail = async () => {
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
                stepsWeFollow: steps,
                serviceSolution: serviceSolution,
                techWeUse: techSections,
            };

            const res = await axios.post(`${Apis.AddServiceDetails}`, serviceData);
            toast.success(res.data.message);
            // Reset all form fields
            setSelectedService(null);
            setHeroTitle("");
            setHeroDescription("");
            setHeroBtnText("");
            setHeroBtnLink("");
            setServiceSectionTitle("");
            setServiceSectionSubTitle("");
            setServiceSectionDescription("");
            setServiceSectionBtnText("");
            setServiceSectionBtnLink("");
            setServiceIndustryTitle("");
            setServiceIndustryDescription("");
            setToolsTitle("");
            setToolsDescription("");
            setSteps([{
                title: "",
                description: "",
            }])
            setServiceSolution([{
                title: "",
                description: "",
            }])
            setTechSections([{ title: "", technologies: [] }])

            // Optionally redirect
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    const handleCancel = () => {
        router.push('/admin/case-study/list')
    }


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
            const uploadedImageUrl = response.data.url; // Extract URL from the response data
            const updatedSteps = [...steps];
            updatedSteps[index].image = uploadedImageUrl;
            setSteps(updatedSteps);
            toast.success("Case study image uploaded successfully");
        } catch (error) {
            console.error('Error uploading file:', error);
            // Handle error appropriately
        }
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
                                <h2>Hero Section</h2>
                            </div>
                        </div>
                        <div className="card-body ">
                            <Form className="upload-form">
                                <Form.Group className="row form-group" controlId="platformUsers">
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
                                            placeholder="eg:  service-slug"
                                            required
                                            className={`form-control form-control-lg form-input`}
                                        />
                                    </div>
                                </Form.Group>
                                <Form.Group className="row form-group" controlId="platformUsers">
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
                                <Form.Group className="row form-group" controlId="country">
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
                                            <option value={''} >select Service</option>
                                            {services?.map((service, index) => (
                                                <option key={index} value={service.id}>
                                                    {service.title}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </div>
                                </Form.Group>

                                {/* <Form.Group as={Row} className="mb-3" controlId="industry">
                  <div className="col-12 col-md-3">
                    <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center text-nowrap`}>
                      Industry
                    </Form.Label>
                  </div>
                  <div className="col-12 col-md-9 mt-0">
                    <select
                      required
                      id="industry"
                      value={selectedIndustry || ""}
                      onChange={(e) => setSelectedService(e.target.value)}
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
                                    <div className="col-12 col-md-3">
                                        <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center text-nowrap`}>
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

                                <Form.Group className="row form-group" controlId="platformUsers">
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
                                <Form.Group className="row form-group" controlId="platformUsers">
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
                        {/* <!-- card header start here  --> */}
                        <div className="card-header">
                            <div
                                className="card-title d-flex justify-content-between align-items-center"
                            >
                                <h2>Tools Details</h2>
                                {/* <!-- <a href="add_header.html" className="btn sub_btn">ADD</a> --> */}
                            </div>
                        </div>
                        <div className="card-body">
                            <Form className="upload-form">
                                <div className="mb-3 border-bottom pb-3">
                                    <Form.Group className="row form-group mt-1 mt-md-2">
                                        <div className="col-12 col-md-3">

                                            <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                                                Title
                                            </Form.Label>
                                        </div>
                                        <div className="col-12 col-md-9 mt-0">
                                            <div className="d-flex">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Phase Title..."
                                                    required
                                                    className={`form-control form-control-lg form-input`}
                                                    value={toolsTitle}
                                                    onChange={(e) => setToolsTitle(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </Form.Group>

                                    <Form.Group className="row form-group ">
                                        <div className="col-12 col-md-3">

                                            <Form.Label
                                                className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}
                                            >
                                                Description
                                            </Form.Label>
                                        </div>
                                        <div className="col-12 col-md-9 mt-0">
                                            <div className="d-flex">
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
                                        </div>
                                    </Form.Group>
                                </div>
                            </Form>
                        </div>
                    </div>
                    <div className="card mt-3">
                        {/* <!-- card header start here  --> */}
                        <div className="card-header">
                            <div
                                className="card-title d-flex justify-content-between align-items-center"
                            >
                                <h2>Steps we follow</h2>
                                {/* <!-- <a href="add_header.html" className="btn sub_btn">ADD</a> --> */}
                            </div>
                        </div>
                        <div className="card-body">
                            <Form className="upload-form">
                                <div className="mb-3 pb-3">


                                    {steps.map((steps, index) => (
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
                                                            value={steps.title}
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
                                                        value={steps.description}
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
                                        </div>
                                    ))}
                                </div>
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
                                <h2>Services Details</h2>
                            </div>
                        </div>
                        {/* // <!-- card header end here  --> */}
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
                                <Form.Group className="row form-group" controlId="serviceSectionTitle">
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

                                <Form.Group
                                    className="row form-group"
                                    controlId="productDescription"
                                >
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
                                <Form.Group className="row form-group" controlId="platformUsers">
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
                                            placeholder="Service Button Text..."
                                            required
                                            className={`form-control form-control-lg form-input`}
                                        />
                                    </div>
                                </Form.Group>
                                <Form.Group className="row form-group" controlId="platformUsers">
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
                                            placeholder="Enter Btn Link..."
                                            required
                                            className={`form-control form-control-lg form-input`}
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
                                <h2>Service Industry</h2>
                            </div>
                        </div>
                        <div className="card-body">
                            <Form className="upload-form">
                                <Form.Group className="row form-group mt-1 mt-md-2" controlId="productInfo">
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
                                <Form.Group className="row form-group" controlId="productInfo">
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
                        {/* <!-- card header start here  --> */}
                        <div className="card-header">
                            <div
                                className="card-title d-flex justify-content-between align-items-center"
                            >
                                <h2>Service Solutions</h2>
                                {/* <!-- <a href="add_header.html" className="btn sub_btn">ADD</a> --> */}
                            </div>
                        </div>
                        <div className="card-body">
                            <Form className="upload-form">
                                <div className="mb-3 pb-3">


                                    {serviceSolution.map((info, index) => (
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
                                                            value={serviceSolution.title}
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
                                                        value={serviceSolution.description}
                                                        onChange={(e) => handleServiceSolutionChange(index, 'description', e.target.value)}
                                                        rows={4}
                                                        placeholder="Write your description here..."
                                                        className={`form-control form-control-lg form-textbox`}
                                                    />
                                                </div>
                                            </Form.Group>
                                        </div>
                                    ))}
                                </div>
                            </Form>
                        </div>
                    </div>
                    <div className="card mt-3">
                        {/* <!-- card header start here  --> */}
                        <div className="card-header">
                            <div
                                className="card-title d-flex justify-content-between align-items-center"
                            >
                                <h2>Tech we use</h2>
                                {/* <!-- <a href="add_header.html" className="btn sub_btn">ADD</a> --> */}
                            </div>
                        </div>
                        <div className="card-body">
                            <Form className="upload-form">
                                <div className="mb-3 pb-3">
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
                                            <div>
                                                {/* Show selected technologies for the current section */}
                                                <div className="d-flex flex-wrap justify-content-center align-items-center gap-2 mb-2">
                                                    {section.technologies && section.technologies.map((tech, index) => (
                                                        <div key={index} className="d-flex bg-primary text-white p-2 rounded-2 justify-content-center align-items-center gap-2 ">
                                                            <Image
                                                                src={tech.image}
                                                                alt="technology"
                                                                width={20}
                                                                height={20}
                                                                className="object-fit-contain"
                                                            />
                                                            {tech.title}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <Accordion>
                                                <Accordion.Item eventKey="0">
                                                    <div style={{ height: "0px", borderBottom: "1px solid #e5e5e5" }}>

                                                        <Accordion.Header className="border "
                                                        >Technology</Accordion.Header>
                                                    </div>
                                                    <Accordion.Body className="mt-2 border" style={{ height: "200px", overflowY: "scroll", scrollbarWidth: "thin" }}>
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
                                </div>
                            </Form>
                        </div>
                    </div>

                    {/* Add System Phase Section */}

                </div>

                {/* Submit Section */}
                <Col xs={12} className="my-3">
                    <div className="d-flex justify-content-center justify-content-md-end gap-3">
                        <Button variant="secondary" onClick={handleCancel} type="button" className="btn form-cancel">
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleAddServiceDetail} className="btn form-btn">
                            Save
                        </Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default AddServiceDetails;
