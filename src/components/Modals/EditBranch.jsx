import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Apis } from "@/utils/Apis";
import { useDispatch } from "react-redux";
import { getAllBranch } from "@/lib/redux/features/GetAllBranch";
import { CountryCode } from "@/utils/CountryCode";
import styles from "@/assets/css/base.module.css";

const EditBranch = ({ show, setShowEdit, selectedBranch }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedBranch) {
      setTitle(selectedBranch?.title || "");
      setAdress(selectedBranch?.address || "");
      setCity(selectedBranch?.city || "");
      setState(selectedBranch?.state || "");
      setZipCode(selectedBranch?.zip_code || "");
      setCountry(selectedBranch?.country || "");
      setPageId(selectedBranch?.pageId || "");
    }
  }, [selectedBranch]);

  const [title, setTitle] = useState(selectedBranch?.title);
  const [address, setAdress] = useState(selectedBranch?.address);
  const [city, setCity] = useState(selectedBranch?.city);
  const [state, setState] = useState(selectedBranch?.state);
  const [zipCode, setZipCode] = useState(selectedBranch?.zip_code);
  const [country, setCountry] = useState(selectedBranch?.country);
  const [pageId, setPageId] = useState(selectedBranch?.pageId);

  // Update branch
  const updateBranch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${Apis.updateBranch}/${selectedBranch?.id}`,
        {
          title: title,
          address: address,
          city: city,
          state: state,
          zip_code: zipCode,
          country: country,
          pageId: pageId,
        }
      );
      dispatch(getAllBranch({ page: 1, limit: 10, showAll: false }));
      setShowEdit(false); // Close the modal after successful update
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal size="md" centered show={show} onHide={() => setShowEdit(!show)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Branch</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pb-5">
        <Form className="pb-5 pt-4">
          {/* Branch Title */}
          <Row className="mb-4 align-items-center">
            <Col md={4} xs={12}>
              <Form.Label className={`m-0 ${styles.mdFont}`}>Branch Title</Form.Label>
            </Col>
            <Col md={8} xs={12}>
              <Form.Control
                type="text"
                placeholder="Enter Branch Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`p-2 ${styles.mdFont}`}
                required
              />
            </Col>
          </Row>

          {/* Address */}
          <Row className="mb-4 align-items-center">
            <Col md={4} xs={12}>
              <Form.Label className={`m-0 ${styles.mdFont}`}>Address</Form.Label>
            </Col>
            <Col md={8} xs={12}>
              <Form.Control
                type="text"
                placeholder="Enter Branch Address"
                value={address}
                onChange={(e) => setAdress(e.target.value)}
                className={`p-2 ${styles.mdFont}`}
                required
              />
            </Col>
          </Row>

          {/* City */}
          <Row className="mb-4 align-items-center">
            <Col md={4} xs={12}>
              <Form.Label className={`m-0 ${styles.mdFont}`}>City</Form.Label>
            </Col>
            <Col md={8} xs={12}>
              <Form.Control
                type="text"
                placeholder="Enter Branch City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={`p-2 ${styles.mdFont}`}
                required
              />
            </Col>
          </Row>

          {/* State/Province */}
          <Row className="mb-4 align-items-center">
            <Col md={4} xs={12}>
              <Form.Label className={`m-0 ${styles.mdFont}`}>State/Province</Form.Label>
            </Col>
            <Col md={8} xs={12}>
              <Form.Control
                type="text"
                placeholder="Enter Branch State"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className={`p-2 ${styles.mdFont}`}
                required
              />
            </Col>
          </Row>

          {/* Zip Code */}
          <Row className="mb-4 align-items-center">
            <Col md={4} xs={12}>
              <Form.Label className={`m-0 ${styles.mdFont}`}>Zip-code</Form.Label>
            </Col>
            <Col md={8} xs={12}>
              <Form.Control
                type="text"
                placeholder="Enter Branch Zip Code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className={`p-2 ${styles.mdFont}`}
                required
              />
            </Col>
          </Row>

          {/* Country */}
          <Row className="mb-4 align-items-center">
            <Col md={4} xs={12}>
              <Form.Label className={`m-0 ${styles.mdFont}`}>Country</Form.Label>
            </Col>
            <Col md={8} xs={12}>
              <Form.Select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className={`p-2 ${styles.mdFont}`}
                required
              >
                {CountryCode.map((country) => (
                  <option key={country.code} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>

          {/* Page Select */}
          <Row className="mb-4 align-items-center">
            <Col md={4} xs={12}>
              <Form.Label className={`m-0 ${styles.mdFont}`}>Page Select</Form.Label>
            </Col>
            <Col md={8} xs={12}>
              <Form.Select
                value={pageId || ""}
                onChange={(e) => setPageId(e.target.value)}
                className={`p-2 ${styles.mdFont}`}
                required
              >
                <option value="">Select Page</option>
                <option value="global">Global</option>
                <option value="local">Local</option>
              </Form.Select>
            </Col>
          </Row>
        </Form>

        {/* Buttons */}
        <div className="d-flex justify-content-center gap-2">
          <Button type="button" className="btn btn-secondary" onClick={() => setShowEdit(false)}>
            Close
          </Button>
          <Button type="button" className="btn bg-primary" onClick={updateBranch}>
            Save
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditBranch;
