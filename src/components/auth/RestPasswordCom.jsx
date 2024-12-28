"use client";
import ForgotPasswordImage from "@/assets/img/forgot-1.png";
import OtpImg from "@/assets/img/forgot.png";
import ResetPasswordImage from "@/assets/img/change_pass.jpg";
import Image from "next/image";
import { Form, Button, Row, Col, Container, Toast } from "react-bootstrap";
import { Poppins } from "next/font/google";
import { useState } from "react";
import { Apis } from "@/utils/Apis";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Move the font loader out of the Login function to the module scope
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ResetPasswordCom = () => {
  const router = useRouter();
  const [setp, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [otp, setOtp] = useState("");

  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(Apis.RequestPasswordReset, {
        username,
      });
      setStep(2);
      setOtp(response.data.data);
      toast.success("Verification Code Sent");
    } catch (error) {
      toast.error("Failed to send verification code");
    }
  };


  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (verificationCode === otp) {
      setStep(3);
      toast.success("otp verified");
    } else {
      toast.error("Verification code does not match");
    }
  };

  const handleSubmitChange = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        setErrorPassword(true);
      } else {
        const response = await axios.post(Apis.ResetPassword, {
          username,
          verificationCode,
          newPassword: password,
        });
        toast.success("Password updated successfully");
        router.push("/");
      }
    } catch (error) {
      toast.error("Failed to update password");
    }
  };

  return (
    <>
      {setp === 1 && (
        <>
          <Container
            fluid
            className="min-vh-100 d-flex  justify-content-center bg-light py-5"
          >
            <Row className="w-100 d-flex justify-content-center">
              <Col lg={8} md={6} sm={8} className="mx-auto">
                <div className="card shadow-lg mt-5 border-1 py-4">
                  <div className="row g-0">
                    <Col lg={5} className="d-none d-lg-flex">
                      <div className="d-flex justify-content-center w-100 align-items-center">
                        <Image
                          src={ForgotPasswordImage}
                          alt="forgot-password"
                          width={250}
                          height={250}
                          className=" object-fit-cover rounded-start"
                        />
                      </div>
                    </Col>
                    <Col lg={7}>
                      <div className="card-body p-4">
                        <h2 className={`mb-4 ${poppins.className} fs-4`}>
                          Forgot Password
                        </h2>
                        <Form onSubmit={handleSubmitRequest}>
                          {/* Email input */}
                          <Form.Group controlId="formUsername" className="mb-4">
                            <Form.Label
                              className={`${poppins.className}`}
                              style={{ fontSize: "13px" }}
                            >
                              Username
                            </Form.Label>
                            <Form.Control
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              type="text"
                              required
                            />
                          </Form.Group>

                          {/* Submit button */}
                          <Button
                            type="submit"
                            style={{ fontSize: "14px" }}
                          >
                            Reset Password
                          </Button>
                        </Form>
                      </div>
                    </Col>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </>
      )}
      {setp === 2 && (
        <>
          <Container
            fluid
            className="min-vh-100 d-flex  justify-content-center bg-light py-5"
          >
            <Row className="w-100 d-flex justify-content-center">
              <Col lg={8} md={6} sm={8} className="mx-auto">
                <div className="card shadow-lg mt-5 border-1 py-4">
                  <div className="row g-0">
                    <Col lg={5} className="d-none d-lg-flex">
                      <div className="d-flex justify-content-center w-100 align-items-center">
                        <Image
                          src={OtpImg}
                          alt="forgot-password"
                          width={250}
                          height={250}
                          className=" object-fit-cover rounded-start"
                        />
                      </div>
                    </Col>
                    <Col lg={7}>
                      <div className="card-body p-4">
                        <h2 className={`mb-4 ${poppins.className} fs-4`}>
                          verificationCode
                        </h2>
                        <Form onSubmit={handleOtpSubmit}>
                          {/* Email input */}
                          <Form.Group controlId="formOtp" className="mb-4">
                            <Form.Label
                              className={`${poppins.className}`}
                              style={{ fontSize: "13px" }}
                            >
                              Otp
                            </Form.Label>
                            <Form.Control
                              value={verificationCode}
                              onChange={(e) =>
                                setVerificationCode(e.target.value)
                              }
                              type="text"
                              required
                            />
                          </Form.Group>

                          {/* Submit button */}
                          <Button
                            type="submit"
                            className={`px-3 py-2 btn ${poppins.className} `}
                            style={{ fontSize: "14px" }}
                          >
                            Verify
                          </Button>
                        </Form>
                      </div>
                    </Col>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </>
      )}
      {setp === 3 && (
        <>
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
                        <Form onSubmit={handleSubmitChange}>
                          {/* Email input */}
                          <Form.Group controlId="formEmail" className="mb-4">
                            <Form.Label
                              className={`${poppins.className}`}
                              style={{ fontSize: "13px" }}
                            >
                              New Password
                            </Form.Label>
                            <Form.Control
                              onChange={(e) => setPassword(e.target.value)}
                              type="password"
                              required
                            />
                          </Form.Group>

                          {/* Password input */}
                          <Form.Group controlId="formPassword" className="mb-4">
                            <Form.Label
                              className={`${poppins.className}`}
                              style={{ fontSize: "13px" }}
                            >
                              Confirm Password
                            </Form.Label>
                            <Form.Control
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                              type="password"
                              required
                            />
                            {errorPassword && (
                              <p className="text-danger">
                                Password does not match
                              </p>
                            )}
                          </Form.Group>

                          {/* Forgot password link */}

                          {/* Submit button */}
                          <Button
                            type="submit"
                            className={`px-3 py-2 btn ${poppins.className} `}
                            style={{ fontSize: "13px" }}
                          >
                            Change Password
                          </Button>
                        </Form>
                      </div>
                    </Col>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default ResetPasswordCom;
