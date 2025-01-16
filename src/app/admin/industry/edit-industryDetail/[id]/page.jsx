"use client";
import { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useRouter, useParams } from "next/navigation";
import { Apis } from "@/utils/Apis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getAllSubServicesFull } from "@/lib/redux/features/GetAllSubServices";
import { IoIosAdd, IoIosClose } from "react-icons/io";

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
    const [industrySolution, setIndustrySolution] = useState([{ title: "", description: "" }]);
    const [isClient, setIsClient] = useState(false);

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
                console.log("Industry detail:", response.data);
                const data = response.data;
                setSlug(data?.slug);
                setSelectedIndustry(data?.industry_id);
                setHeroTitle(data?.hero_title);
                setHeroDescription(data?.hero_description);
                setIndustryTitle(data?.industry_title);
                setIndustryDescription(data?.industry_description);
                setIndustrySolution(Array.isArray(data?.idnustrySolution
                ) ? data.idnustrySolution
                    : [{ title: "", description: "" }]);
            } catch (error) {
                console.error("Error fetching industry detail:", error);
                toast.error("Error fetching industry detail");
            }
        };

        if (id) {
            fetchIndustryDetail();
        }
    }, [id]);

    const handleIndustrySolutionChange = (index, field, value) => {
        const updatedSolution = [...industrySolution];
        updatedSolution[index][field] = value;
        setIndustrySolution(updatedSolution);
    };

    const addIndustrySolution = () => {
        setIndustrySolution([...industrySolution, { title: "", description: "" }]);
    };

    const removeIndustrySolution = (index) => {
        const updatedSolution = [...industrySolution];
        updatedSolution.splice(index, 1);
        setIndustrySolution(updatedSolution);
    };

    const handleUpdateIndustryDetail = async () => {
        try {
            if (!selectedIndustry || !heroTitle || !industryTitle || !industryDescription) {
                toast.error("Please fill all required fields");
                return;
            }

            const industryData = {
                industry_id: selectedIndustry,
                slug: slug,
                hero_title: heroTitle,
                hero_description: heroDescription,
                industry_title: industryTitle,
                industry_description: industryDescription,
                industrySolution: industrySolution,
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
            <Row>
                <Col md={6}>
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title d-flex justify-content-between align-items-center">
                                <h2>Hero Section</h2>
                            </div>
                        </div>
                        <div className="card-body">
                            <Form className="upload-form">
                                <Form.Group className="row form-group" controlId="slug">
                                    <div className="col-12 col-md-3">
                                        <Form.Label className="col-form-label form-label d-flex justify-content-start justify-content-md-center">
                                            Slug
                                        </Form.Label>
                                    </div>
                                    <div className="col-12 col-md-9 mt-0">
                                        <Form.Control
                                            type="text"
                                            value={slug}
                                            onChange={(e) => setSlug(e.target.value)}
                                            placeholder="eg:  industry-slug"
                                            required
                                            className="form-control form-control-lg form-input"
                                        />
                                    </div>
                                </Form.Group>
                                <Form.Group className="row form-group" controlId="heroTitle">
                                    <div className="col-12 col-md-3">
                                        <Form.Label className="col-form-label form-label d-flex justify-content-start justify-content-md-center">
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
                                            className="form-control form-control-lg form-input"
                                        />
                                    </div>
                                </Form.Group>
                                <Form.Group className="row form-group" controlId="heroDescription">
                                    <div className="col-12 col-md-3">
                                        <Form.Label className="col-form-label form-label d-flex justify-content-start justify-content-md-center">
                                            Hero Description
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
                            </Form>
                        </div>
                    </div>
                    <div className="card mt-3">
                        <div className="card-header">
                            <div className="card-title d-flex justify-content-between align-items-center">
                                <h2>Industry Details</h2>
                            </div>
                        </div>
                        <div className="card-body">
                            <Form className="upload-form">
                                <Form.Group className="row form-group" controlId="industryTitle">
                                    <div className="col-12 col-md-3">
                                        <Form.Label className="col-form-label form-label d-flex justify-content-start justify-content-md-center">
                                            Industry Title
                                        </Form.Label>
                                    </div>
                                    <div className="col-12 col-md-9 mt-0">
                                        <Form.Control
                                            type="text"
                                            value={industryTitle}
                                            onChange={(e) => setIndustryTitle(e.target.value)}
                                            placeholder="Industry Title..."
                                            required
                                            className="form-control form-control-lg form-input"
                                        />
                                    </div>
                                </Form.Group>
                                <Form.Group className="row form-group" controlId="industryDescription">
                                    <div className="col-12 col-md-3">
                                        <Form.Label className="col-form-label form-label d-flex justify-content-start justify-content-md-center">
                                            Industry Description
                                        </Form.Label>
                                    </div>
                                    <div className="col-12 col-md-9 mt-0">
                                        {isClient && (
                                            <Editor
                                                apiKey="an08ruvf6el10km47b0qr7vkwpoldafttauwj424r7y8y5e2"
                                                value={industryDescription}
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
                                                onEditorChange={(content) => setIndustryDescription(content)}
                                            />
                                        )}
                                    </div>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>
                </Col>
                <Col md={6}>
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title d-flex justify-content-between align-items-center">
                                <h2>Industry Solution</h2>
                            </div>
                        </div>
                        <div className="card-body">
                            <Form className="upload-form">
                                <Form.Group className="row form-group" controlId="selectedIndustry">
                                    <div className="col-12 col-md-3">
                                        <Form.Label className="col-form-label form-label d-flex justify-content-start justify-content-md-center">
                                            Industry
                                        </Form.Label>
                                    </div>
                                    <div className="col-12 col-md-9 mt-0">
                                        <Form.Select
                                            required
                                            value={selectedIndustry || ""}
                                            onChange={(e) => setSelectedIndustry(e.target.value)}
                                            className="form-control form-control-lg form-input"
                                        >
                                            <option value="">Select Industry</option>
                                            {industries?.map((industry, index) => (
                                                <option key={index} value={industry.id}>
                                                    {industry.title}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </div>
                                </Form.Group>
                                {industrySolution.map((solution, index) => (
                                    <div key={index} className="mb-4 border-bottom pb-3">
                                        <Form.Group className="row form-group">
                                            <div className="col-12 col-md-3">
                                                <Form.Label className="col-form-label form-label d-flex justify-content-start justify-content-md-center">
                                                    Title
                                                </Form.Label>
                                            </div>
                                            <div className="col-12 col-md-9 mt-0">
                                                <div className="d-flex">
                                                    <Form.Control
                                                        type="text"
                                                        value={solution.title}
                                                        onChange={(e) => handleIndustrySolutionChange(index, 'title', e.target.value)}
                                                        placeholder="Enter title..."
                                                        required
                                                        className="form-control form-control-lg form-input"
                                                    />
                                                    <Button
                                                        className="bg-transparent border-0"
                                                        onClick={index === 0 ? addIndustrySolution : () => removeIndustrySolution(index)}
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
                                            <div className="col-12 col-md-3">
                                                <Form.Label className="col-form-label form-label d-flex justify-content-start justify-content-md-center">
                                                    Description
                                                </Form.Label>
                                            </div>
                                            <div className="col-12 col-md-9 mt-0">
                                                <Form.Control
                                                    as="textarea"
                                                    value={solution.description}
                                                    onChange={(e) => handleIndustrySolutionChange(index, 'description', e.target.value)}
                                                    rows={4}
                                                    placeholder="Write your description here..."
                                                    className="form-control form-control-lg form-textbox"
                                                />
                                            </div>
                                        </Form.Group>
                                    </div>
                                ))}
                            </Form>
                        </div>
                    </div>
                </Col>
                <Col xs={12} className="my-3">
                    <div className="d-flex justify-content-center justify-content-md-end gap-3">
                        <Button variant="secondary" onClick={() => router.push('/admin/industry/industry-detail-list')} type="button" className="btn form-cancel">
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleUpdateIndustryDetail} className="btn form-btn">
                            Update
                        </Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default EditIndustryDetail;
