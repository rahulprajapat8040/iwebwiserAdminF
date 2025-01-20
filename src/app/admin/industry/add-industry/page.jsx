"use client";
import { Form, Button } from "react-bootstrap";
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

const AddIndustry = () => {
  const router = useRouter();
  const [IndustryTitle, setIndustryTitle] = useState("");
  const [IndustryDescription, setIndustryDescription] = useState("");
  const [IndustryButtonLink, setIndustryButtonLink] = useState("");
  const [IndustryImage, setIndustryImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(false);
  const [alt, setAlt] = useState('')
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // HANDLE IMAGE UPLOAD

  const handleMedia = async (e) => {
    try {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      const res = await axios.post(Apis.uploadFile, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIndustryImage(res.data.url);
      toast.success("Image Uploaded Successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // HANDLE INDUSTRY ADD

  const handleAddIndustry = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(Apis.createIndustry, {
        title: IndustryTitle,
        description: IndustryDescription,
        button_link: IndustryButtonLink,
        image: IndustryImage,
        alt: alt
      });
      toast.success(response.data.message);
      // Clear the input fields and increment the index for the next branch
      setIndustryTitle("");
      setIndustryDescription("");
      setIndustryButtonLink("");
      setIndustryImage(null);
      setAlt("")
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      <ToastContainer />
      {imagePreview && (
        <ImagePreview image={IndustryImage} setImagePreview={setImagePreview} />
      )}
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
            <h4 className={`main-title`}>Add Industry</h4>
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
              <h2>Add Industry</h2>
            </div>
          </div>
          {/* <!-- card header end here  --> */}

          <div className="card-body px-0 px-md-5">
            <Form onSubmit={handleAddIndustry} className="upload-form">
              {/* Social Title Input */}
              <Form.Group className="row form-group mt-1 mt-md-2">
                <div className="col-12 col-md-3">
                  <Form.Label className="col-form-label form-label d-flex justify-content-left justify-content-md-center">
                    Industry Title
                  </Form.Label>
                </div>
                <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
                  <Form.Control
                    type="text"
                    placeholder="Enter Industry Title"
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
              {/* Social Link Input */}
              <Form.Group className="row form-group mt-1 mt-md-2">
                <div className="col-12 col-md-3">
                  <Form.Label className="col-form-label form-label d-flex justify-content-left justify-content-md-center">
                    Button Link
                  </Form.Label>
                </div>
                <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
                  <Form.Control
                    type="text"
                    placeholder="Enter Button Link..."
                    className="form-control form-control-lg form-input"
                    style={{ fontSize: "13px" }}
                    value={IndustryButtonLink}
                    onChange={(e) => setIndustryButtonLink(e.target.value)}
                  />
                </div>
              </Form.Group>

              <Form.Group className="row form-group mt-1 mt-md-2">
                <div className="col-12 col-md-3">
                  <Form.Label className={`col-form-label form-label d-flex justify-content-left justify-content-md-center`}>
                    Upload Image
                  </Form.Label>
                </div>
                <div className="col-12 col-md-8 mt-0 me-0 me-md-5">

                  <div
                    className="form-control form-control-lg d-flex flex-column justify-content-center form-input"
                    style={{ height: "150px" }}
                  >
                    <Form.Label
                      className="d-flex flex-column align-items-center justify-content-center"
                      style={{ cursor: "pointer" }}
                      htmlFor="IndustryImage"
                    >
                      <BsCloudUpload size={40} color="gray" />
                      <h6 className={`text-center py-3 ${styles.smFont}`}>
                        Upload Image
                      </h6>
                    </Form.Label>
                    {IndustryImage && (
                      <h6
                        className={`text-center   text-primary ${styles.mdFont}`}
                        style={{ cursor: "pointer" }}
                        onClick={() => setImagePreview(true)}
                      >
                        click to preview
                      </h6>
                    )}
                  </div>
                </div>
                <Form.Control
                  id="IndustryImage"
                  hidden
                  type="file"
                  onChange={handleMedia}
                  className="flex-grow-1 p-2"
                />
              </Form.Group>
              <Form.Group className="row form-group mt-1 mt-md-2">
                <div className="col-12 col-md-3">
                  <Form.Label className="col-form-label form-label d-flex justify-content-left justify-content-md-center">
                    Image Alt
                  </Form.Label>
                </div>
                <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
                  <Form.Control
                    type="text"
                    placeholder="Enter Industry Title"
                    className="form-control form-control-lg form-input"
                    style={{ fontSize: "13px" }}
                    value={alt}
                    onChange={(e) => setAlt(e.target.value)}
                  />
                </div>
              </Form.Group>
              {/* Submit Button */}
              <div className="row">
                <div className="col-4 col-md-3"></div>
                <div className="col-12 col-md-8   form-button">
                  <Button variant="secondary" type="button" className="btn form-cancel">
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit" className="btn form-btn">
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
