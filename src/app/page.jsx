"use client";
import loginImage from "@/assets/img/login.jpg";
import Image from "next/image";
import { Form, Button, Row, Col, Container, Toast } from "react-bootstrap";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { Apis } from "@/utils/Apis";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {toast, ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(Apis.login, {
        username,
        password,
      });
      Cookies.set("admin", response.data.data?.accessToken, {
        expires: 50,
      });
      router.push("/admin/dashboard");
    } catch (error) {
      toast.error('Invalid username or password')
    }
  };

  return (
    <Container
      fluid
      className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5"
    >
      <ToastContainer/>
      <Row className="w-100 d-flex justify-content-center">
        <Col lg={8} md={6} sm={8} className="mx-auto">
          <div className="card shadow-lg border-0">
            <div className="row g-0">
              <Col lg={5} className="d-none d-lg-flex">
                <div className="d-flex justify-content-center w-100 align-items-center">
                  <Image
                    src={loginImage}
                    alt="login"
                    width={250}
                    height={250}
                    className=" object-fit-cover rounded-start"
                  />
                </div>
              </Col>
              <Col lg={7}>
                <div className="card-body p-4">
                  <h2 className={`mb-4 ${poppins.className} fs-4`}>Sign-in</h2>
                  <Form onSubmit={handleSubmit}>
                    {/* Email input */}
                    <Form.Group controlId="formEmail" className="mb-4">
                      <Form.Label
                        className={`${poppins.className}`}
                        style={{ fontSize: "13px" }}
                      >
                        Username
                      </Form.Label>
                      <Form.Control
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </Form.Group>

                    {/* Password input */}
                    <Form.Group controlId="formPassword" className="mb-4">
                      <Form.Label
                        className={`${poppins.className}`}
                        style={{ fontSize: "13px" }}
                      >
                        Password
                      </Form.Label>
                      <Form.Control
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
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
                    <Button
                      type="submit"
                      className={`px-3 py-1 btn `}
                    >
                      Sign In
                    </Button>
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

export default Login;
