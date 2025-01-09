"use client";
import { Form, Button, Accordion } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { BsCloudUpload } from "react-icons/bs";
import { Apis } from "@/utils/Apis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImagePreview from "@/components/Modals/ImagePreview";
import { useState, useEffect } from "react";
import styles from "@/assets/css/base.module.css";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import { getAllSubServicesFull } from "@/lib/redux/features/GetAllSubServices";
import { useDispatch, useSelector } from "react-redux";

const AddIndustry = () => {
    const dispatch = useDispatch()
    const router = useRouter();
    const [industries, setIndustries] = useState([])

    const [selectedIndustry, setSelectedIndustry] = useState(null);

    const [heroTitle, setHeroTitle] = useState("");
    const [heroDescription, setHeroDescription] = useState("")
    const [slug, setSlug] = useState("")
    const [IndustryTitle, setIndustryTitle] = useState("");
    const [IndustryDescription, setIndustryDescription] = useState("");
    const [selectedSubServices, setSelectedSubServices] = useState([]);
console.log(selectedIndustry)
    const [isClient, setIsClient] = useState(false)

    console.log(selectedSubServices)

    const { subServices } = useSelector(
        (state) => state.getAllSubServicesFull
    );

    const handleSubServiceChange = (subServiceId) => {
        setSelectedSubServices(prev => {
            if (prev.includes(subServiceId)) {
                return prev.filter(id => id !== subServiceId);
            } else {
                return [...prev, subServiceId];
            }
        });
    };

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

    const handleAddIndustryDetail = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${Apis.AddIndustryDetails}`, {
                slug: slug,
                industry_id: selectedIndustry,
                hero_title: heroTitle,
                hero_description: heroDescription,
                industry_title: IndustryTitle,
                industry_description: IndustryDescription,
                sub_service_ids: selectedSubServices
            });
            toast.success(response.data.message)
            setSelectedIndustry(null)
            setSelectedSubServices([])
            setIndustryTitle("")
            setIndustryDescription("")
            setHeroTitle("")
            setHeroDescription("")
            setSlug("")
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error)
        }
    }

    useEffect(() => {
        dispatch(getAllSubServicesFull());
        setIsClient(true);
    }, []);
    return (
        <div>
            <ToastContainer />
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
                        <h4 className={`main-title`}>Industry Detail</h4>
                    </div>
                </div>
            </div>

            <div className="container-fluid">
                {/* <!-- card start here  --> */}
                <div className="card">
                    {/* <!-- card header start here  --> */}
                    <div className="card-header">
                        <div
                            className="card-title d-flex justify-content-between align-items-center"
                        >
                            <h2>Industry Detail</h2>
                        </div>
                    </div>
                    {/* <!-- card header end here  --> */}

                    <div className="card-body px-0 px-md-5">
                        <Form className="upload-form" >
                            {/* Social Title Input */}
                            <Form.Group className="row form-group mt-1 mt-md-2">
                                <div className="col-12 col-md-3">
                                    <Form.Label className="col-form-label form-label d-flex justify-content-left justify-content-md-center">
                                        Industry
                                    </Form.Label>
                                </div>
                                <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
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
                            <Form.Group className="row form-group mt-1 mt-md-2">
                                <div className="col-12 col-md-3">
                                    <Form.Label className="col-form-label form-label d-flex justify-content-left justify-content-md-center">
                                        slug
                                    </Form.Label>
                                </div>
                                <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
                                    <Form.Control
                                        type="text"
                                        placeholder="eg: /industry-slug"
                                        className="form-control form-control-lg form-input"
                                        style={{ fontSize: "13px" }}
                                        value={slug}
                                        onChange={(e) => setSlug(e.target.value)}
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group className="row form-group mt-1 mt-md-2">
                                <div className="col-12 col-md-3">
                                    <Form.Label className="col-form-label form-label d-flex justify-content-left justify-content-md-center">
                                        Hero Title
                                    </Form.Label>
                                </div>
                                <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
                                    <Form.Control
                                        type="text"
                                        placeholder="Hero Title..."
                                        className="form-control form-control-lg form-input"
                                        style={{ fontSize: "13px" }}
                                        value={heroTitle}
                                        onChange={(e) => setHeroTitle(e.target.value)}
                                    />
                                </div>
                            </Form.Group>

                            {/* Social Link Input */}
                            <Form.Group className="row form-group mt-1 mt-md-2">
                                <div className="col-12 col-md-3">
                                    <Form.Label className="col-form-label form-label d-flex justify-content-left justify-content-md-center">
                                        Hero Description
                                    </Form.Label>
                                </div>
                                <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
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
                                                    'powerpaste', 'fullscreen', 'formatpainter', 'insertdatetime', 'media', 'table', 'help', 'wordcount'
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
                                        Sub Services
                                    </Form.Label>
                                </div>

                                <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
                                    {subServices && subServices.length > 0 ? (
                                        <Accordion>
                                            <Accordion.Item className="border" eventKey="0">
                                                <Accordion.Header >Select Sub Services</Accordion.Header>
                                                <Accordion.Body style={{ overflowY: 'scroll', height: '200px' }}>
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
                                        </div>
                                    )}
                                </div>
                            </Form.Group>
                            <Form.Group className="row form-group mt-1 mt-md-2">
                                <div className="col-12 col-md-3">
                                    <Form.Label className="col-form-label form-label d-flex justify-content-left justify-content-md-center">
                                        Industry Title
                                    </Form.Label>
                                </div>
                                <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
                                    <Form.Control
                                        type="text"
                                        placeholder="Industry section title..."
                                        className="form-control form-control-lg form-input"
                                        style={{ fontSize: "13px" }}
                                        value={IndustryTitle}
                                        onChange={(e) => setIndustryTitle(e.target.value)}
                                    />
                                </div>
                            </Form.Group>

                            {/* Social Link Input */}
                            <Form.Group className="row form-group mt-1 mt-md-2">
                                <div className="col-12 col-md-3">
                                    <Form.Label className="col-form-label form-label d-flex justify-content-left justify-content-md-center">
                                        Industry Description
                                    </Form.Label>
                                </div>
                                <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
                                    {isClient && (
                                        <Editor
                                            apiKey="an08ruvf6el10km47b0qr7vkwpoldafttauwj424r7y8y5e2"
                                            value={IndustryDescription}
                                            init={{
                                                height: 250,
                                                menubar: false,
                                                plugins: [
                                                    'a11ychecker', 'advlist', 'advcode', 'advtable', 'autolink', 'checklist', 'export',
                                                    'lists', 'link', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
                                                    'powerpaste', 'fullscreen', 'formatpainter', 'insertdatetime', 'media', 'table', 'help', 'wordcount'
                                                ],
                                                toolbar: 'undo redo | casechange blocks | bold italic backcolor forecolor| ' +
                                                    'alignleft aligncenter alignright alignjustify | ' +
                                                    'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help'
                                            }}
                                            onEditorChange={(content) => setIndustryDescription(content)}
                                        />
                                    )}
                                </div>
                            </Form.Group>

                            {/* Submit Button */}
                            <div className="row">
                                <div className="col-4 col-md-3"></div>
                                <div className="col-12 col-md-8   form-button">
                                    <Button variant="secondary" type="button" className="btn form-cancel">
                                        Cancel
                                    </Button>
                                    <Button variant="primary" type="button" onClick={handleAddIndustryDetail} className="btn form-btn">
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

export default AddIndustry;
