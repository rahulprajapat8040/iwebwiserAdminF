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

const EditServiceDetail = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = useParams();
    const [selectedService, setSelectedService] = useState(null);
    const { services } = useSelector((state) => state.getAllServicesFull);
    const { subServices } = useSelector((state) => state.getSubServiceById);

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
    const [selectedSubServices, setSelectedSubServices] = useState([]);

    useEffect(() => {
        setIsClient(true);
        dispatch(getAllServicesFull());
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
                setSelectedSubServices(data.sub_service_ids || []);
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
            } catch (error) {
                console.error("Error fetching service detail:", error);
                toast.error("Error fetching service detail");
            }
        };

        if (id) {
            fetchServiceDetail();
        }
    }, [id]);

    const handleSubServiceChange = (subServiceId) => {
        setSelectedSubServices(prev => {
            if (prev.includes(subServiceId)) {
                return prev.filter(id => id !== subServiceId);
            } else {
                return [...prev, subServiceId];
            }
        });
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
                                </Form.Group>
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

                                <Form.Group className="row form-group" controlId="subServices">
                                    <div className="col-12 col-md-3">
                                        <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                                            Sub Services
                                        </Form.Label>
                                    </div>
                                    <div className="col-12 col-md-9 mt-0">
                                        {subServices && subServices.length > 0 ? (
                                            <Accordion>
                                                <Accordion.Item className="border" eventKey="0">
                                                    <Accordion.Header>Select Sub Services</Accordion.Header>
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