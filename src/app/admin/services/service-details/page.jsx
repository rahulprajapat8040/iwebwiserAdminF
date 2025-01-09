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

const AddServiceDetails = () => {
    const dispatch = useDispatch()
    const [selectedService, setSelectedService] = useState(null);
    const { services } = useSelector(
        (state) => state.getAllServicesFull
    );
    const { subServices } = useSelector(
        (state) => state.getSubServiceById
    );

    useEffect(() => {
        dispatch(getAllServicesFull())
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
    const [selectedSubServices, setSelectedSubServices] = useState([]);

    const handleSubServiceChange = (subServiceId) => {
        setSelectedSubServices(prev => {
            if (prev.includes(subServiceId)) {
                return prev.filter(id => id !== subServiceId);
            } else {
                return [...prev, subServiceId];
            }
        });
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
                sub_service_ids: selectedSubServices,
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
                serviceToolDescription: toolsDescription
            };

            const res = await axios.post(`${Apis.AddServiceDetails}`, serviceData);

            toast.success(res.data.message);
            // Reset all form fields
            setSelectedService(null);
            setSelectedSubServices([]);
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

            // Optionally redirect
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

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
                                            placeholder="eg: /service-slug"
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
                                                        'a11ychecker', 'advlist', 'advcode', 'advtable', 'autolink', 'checklist', 'export',
                                                        'lists', 'link', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
                                                        'powerpaste', 'fullscreen', 'formatpainter', 'insertdatetime', 'media', 'table', 'help', 'wordcount',
                                                    ],
                                                    toolbar: 'undo redo | casechange blocks | bold italic backcolor forecolor| ' +
                                                        'alignleft aligncenter alignright alignjustify | ' +
                                                        'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help'
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
                                                                'a11ychecker', 'advlist', 'advcode', 'advtable', 'autolink', 'checklist', 'export',
                                                                'lists', 'link', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
                                                                'powerpaste', 'fullscreen', 'formatpainter', 'insertdatetime', 'media', 'table', 'help', 'wordcount',
                                                            ],
                                                            toolbar: 'undo redo | casechange blocks | bold italic backcolor forecolor| ' +
                                                                'alignleft aligncenter alignright alignjustify | ' +
                                                                'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help'
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
                                                        'a11ychecker', 'advlist', 'advcode', 'advtable', 'autolink', 'checklist', 'export',
                                                        'lists', 'link', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
                                                        'powerpaste', 'fullscreen', 'formatpainter', 'insertdatetime', 'media', 'table', 'help', 'wordcount',
                                                    ],
                                                    toolbar: 'undo redo | casechange blocks | bold italic backcolor forecolor| ' +
                                                        'alignleft aligncenter alignright alignjustify | ' +
                                                        'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help'
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
                                <Form.Group className="row form-group" controlId="platformUsers">
                                    <div className="col-12 col-md-3">
                                        <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                                            Sub Services
                                        </Form.Label>
                                    </div>

                                    <div className="col-12 col-md-9 mt-0">
                                        {subServices && subServices.length > 0 ? (
                                            <Accordion>
                                                <Accordion.Item className="border" eventKey="0">
                                                    <Accordion.Header >Select Sub Services</Accordion.Header>
                                                    <Accordion.Body>
                                                        <div className="p-3">
                                                            {subServices.map((subService) => (
                                                                <Form.Check
                                                                    key={subService.id}
                                                                    type="checkbox"
                                                                    id={`subservice-${subService.id}`}
                                                                    label={subService.title}
                                                                    checked={selectedSubServices.includes(subService.id)}
                                                                    onChange={() => handleSubServiceChange(subService.id)}
                                                                    className="mb-2 p-2"
                                                                />
                                                            ))}
                                                        </div>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                        ) : (
                                            <div className="text-muted">
                                                {selectedService ? "No sub-services available" : "Please select a service first"}
                                            </div>
                                        )}
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
                                                        'a11ychecker', 'advlist', 'advcode', 'advtable', 'autolink', 'checklist', 'export',
                                                        'lists', 'link', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
                                                        'powerpaste', 'fullscreen', 'formatpainter', 'insertdatetime', 'media', 'table', 'help', 'wordcount',
                                                    ],
                                                    toolbar: 'undo redo | casechange blocks | bold italic backcolor forecolor| ' +
                                                        'alignleft aligncenter alignright alignjustify | ' +
                                                        'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help'
                                                }}
                                                onEditorChange={(content) => setServiceIndustryDescription(content)}
                                            />
                                        )}
                                    </div>
                                </Form.Group>
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
