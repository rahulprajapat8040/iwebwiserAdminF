"use client";
import { useEffect, useState } from "react";
import { Form, Button, Accordion } from "react-bootstrap";
import { useRouter, useParams } from "next/navigation";
import { Apis } from "@/utils/Apis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getAllSubServicesFull } from "@/lib/redux/features/GetAllSubServices";

const EditIndustryDetail = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = useParams();
    const [industries, setIndustries] = useState([]);
    const [selectedIndustry, setSelectedIndustry] = useState(null);
    const [heroTitle, setHeroTitle] = useState("");
    const [heroDescription, setHeroDescription] = useState("");
    const [slug, setSlug] = useState("");
    const [industryTitle, setIndustryTitle] = useState("");
    const [industryDescription, setIndustryDescription] = useState("");
    const [selectedSubServices, setSelectedSubServices] = useState([]);
    const [isClient, setIsClient] = useState(false);

    const { subServices } = useSelector((state) => state.getAllSubServicesFull);

    useEffect(() => {
        setIsClient(true);
        dispatch(getAllSubServicesFull());
    }, [dispatch]);

    useEffect(() => {
        const fetchIndustries = async () => {
            try {
                const res = await axios.get(`${Apis.getAllIndustryFull}`);
                setIndustries(res.data.data.industryData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchIndustries();
    }, []);

    useEffect(() => {
        const fetchIndustryDetail = async () => {
            try {
                const response = await axios.get(`${Apis.getIndustryDetailById}/${id}`);
                console.log(response)
                const data = response.data;
                setSlug(data?.slug);
                setSelectedIndustry(data?.industry_id);
                setSelectedSubServices(data?.sub_service_ids || []);
                setHeroTitle(data?.hero_title);
                setHeroDescription(data?.hero_description);
                setIndustryTitle(data?.industry_title);
                setIndustryDescription(data?.industry_description);
            } catch (error) {
                console.error("Error fetching industry detail:", error);
                toast.error("Error fetching industry detail");
            }
        };

        if (id) {
            fetchIndustryDetail();
        }
    }, [id]);

    const handleSubServiceChange = (subServiceId) => {
        setSelectedSubServices((prev) => {
            if (prev.includes(subServiceId)) {
                return prev.filter((id) => id !== subServiceId);
            } else {
                return [...prev, subServiceId];
            }
        });
    };

    const handleUpdateIndustryDetail = async () => {
        try {
            if (!selectedIndustry || !heroTitle || !industryTitle || !industryDescription) {
                toast.error("Please fill all required fields");
                return;
            }

            const industryData = {
                industry_id: selectedIndustry,
                sub_service_ids: selectedSubServices,
                slug: slug,
                hero_title: heroTitle,
                hero_description: heroDescription,
                industry_title: industryTitle,
                industry_description: industryDescription,
            };

            const res = await axios.put(`${Apis.updateIndustryDetail}/${id}`, industryData);
            toast.success(res.data.message);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div>
            <ToastContainer />
            <div className="dash-head">
                <div className="dash_title">
                    <div onClick={() => router.back()} className="btn d-inline-flex align-items-center gap-2">
                        <div className="d-inline-block bg-primary p-1 px-2 rounded-3" style={{ cursor: "pointer" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" height={25} viewBox="0 -968 960 960" width={25} fill="#FFFFFF">
                                <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                            </svg>
                        </div>
                        <h4 className={`main-title`}>Industry Detail</h4>
                    </div>
                </div>
            </div>

            <div className="container-fluid">
                <div className="card">
                    <div className="card-header">
                        <div className="card-title d-flex justify-content-between align-items-center">
                            <h2>Industry Detail</h2>
                        </div>
                    </div>

                    <div className="card-body px-0 px-md-5">
                        <Form className="upload-form">
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
                                        <option value={""}>select industry</option>
                                        {industries?.map((industry, index) => (
                                            <option key={index} value={industry.id}>
                                                {industry.title}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </div>
                            </Form.Group>
                            <Form.Group className="row form-group mt-1 mt-md-2">
                                <div className="col-12 col-md-3">
                                    <Form.Label className="col-form-label form-label d-flex justify-content-left justify-content-md-center">
                                        Slug
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
                                                    "a11ychecker",
                                                    "advlist",
                                                    "advcode",
                                                    "advtable",
                                                    "autolink",
                                                    "checklist",
                                                    "export",
                                                    "lists",
                                                    "link",
                                                    "charmap",
                                                    "preview",
                                                    "anchor",
                                                    "searchreplace",
                                                    "visualblocks",
                                                    "powerpaste",
                                                    "fullscreen",
                                                    "formatpainter",
                                                    "insertdatetime",
                                                    "media",
                                                    "table",
                                                    "help",
                                                    "wordcount",
                                                ],
                                                toolbar:
                                                    "undo redo | casechange blocks | bold italic backcolor forecolor| " +
                                                    "alignleft aligncenter alignright alignjustify | " +
                                                    "bullist numlist checklist outdent indent | removeformat | a11ycheck code table help",
                                            }}
                                            onEditorChange={(content) => setHeroDescription(content)}
                                        />
                                    )}
                                </div>
                            </Form.Group>
                            <Form.Group className="row form-group" controlId="subServices">
                                <div className="col-12 col-md-3">
                                    <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                                        Sub Services
                                    </Form.Label>
                                </div>
                                <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
                                    {subServices && subServices.length > 0 ? (
                                        <Accordion>
                                            <Accordion.Item className="border" eventKey="0">
                                                <Accordion.Header>Select Sub Services</Accordion.Header>
                                                <Accordion.Body style={{ overflowY: "scroll", height: "200px" }}>
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
                                        <div className="text-muted"></div>
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
                                        value={industryTitle}
                                        onChange={(e) => setIndustryTitle(e.target.value)}
                                    />
                                </div>
                            </Form.Group>
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
                                            value={industryDescription}
                                            init={{
                                                height: 250,
                                                menubar: false,
                                                plugins: [
                                                    "a11ychecker",
                                                    "advlist",
                                                    "advcode",
                                                    "advtable",
                                                    "autolink",
                                                    "checklist",
                                                    "export",
                                                    "lists",
                                                    "link",
                                                    "charmap",
                                                    "preview",
                                                    "anchor",
                                                    "searchreplace",
                                                    "visualblocks",
                                                    "powerpaste",
                                                    "fullscreen",
                                                    "formatpainter",
                                                    "insertdatetime",
                                                    "media",
                                                    "table",
                                                    "help",
                                                    "wordcount",
                                                ],
                                                toolbar:
                                                    "undo redo | casechange blocks | bold italic backcolor forecolor| " +
                                                    "alignleft aligncenter alignright alignjustify | " +
                                                    "bullist numlist checklist outdent indent | removeformat | a11ycheck code table help",
                                            }}
                                            onEditorChange={(content) => setIndustryDescription(content)}
                                        />
                                    )}
                                </div>
                            </Form.Group>
                            <div className="row">
                                <div className="col-4 col-md-3"></div>
                                <div className="col-12 col-md-8 form-button">
                                    <Button variant="secondary" type="button" className="btn form-cancel" onClick={() => router.push('/admin/industry/industry-detail-list')}>
                                        Cancel
                                    </Button>
                                    <Button variant="primary" type="button" onClick={handleUpdateIndustryDetail} className="btn form-btn">
                                        Update
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

export default EditIndustryDetail;
