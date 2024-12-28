"use client";
import ResetPasswordImage from '@/assets/img/change_pass.jpg';
import Image from "next/image";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { Poppins } from "next/font/google";
import Link from "next/link";

// Move the font loader out of the ResetPassword function to the module scope
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ResetPassword = () => {
  return (
    <Container
      fluid
      className="min-vh-100 d-flex  justify-content-center bg-light py-5"
    >
      <Row className="w-100 d-flex justify-content-center">
        <Col lg={8} md={6} sm={8} className="mx-auto">
          <div className="card shadow-lg mt-5 border-0">
            <div className="row g-0">
              <Col lg={5} className="d-none d-lg-flex">
                <div className="d-flex justify-content-center w-100 align-items-center">
                  <Image
                    src={ResetPasswordImage}
                    alt="login"
                    width={280}
                    height={280}
                    className=" object-fit-cover rounded-start"
                  />
                </div>
              </Col>
              <Col lg={7}>
                <div className="card-body p-4">
                  <h2 className={`mb-4 ${poppins.className} fs-4`}>
                    Change Password
                  </h2>
                  <Form>
                    {/* Email input */}
                    <Form.Group controlId="formEmail" className="mb-4">
                      <Form.Label
                        className={`${poppins.className}`}
                        style={{ fontSize: "13px" }}
                      >
                        New Password
                      </Form.Label>
                      <Form.Control type="password" required />
                    </Form.Group>

                    {/* Password input */}
                    <Form.Group controlId="formPassword" className="mb-4">
                      <Form.Label
                        className={`${poppins.className}`}
                        style={{ fontSize: "13px" }}
                      >
                        Confirm Password
                      </Form.Label>
                      <Form.Control type="password" required />
                    </Form.Group>

                    {/* Forgot password link */}
                    <Row className="mb-4">
                      <Col>
                        <Link
                          href="/forgot-password"
                          className={`${poppins.className} float-end text-decoration-none text-primary`}
                          style={{ fontSize: "13px" }}
                        >
                          Forgot password?
                        </Link>
                      </Col>
                    </Row>

                    {/* Submit button */}
                    <Link
                      href="/"
                      className={`px-3 py-2 ${poppins.className} bg-primary text-white rounded-2`}
                      style={{ fontSize: "13px" }}
                    >
                      Change Password
                    </Link>
                  </Form>
                </div>
              </Col>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;
