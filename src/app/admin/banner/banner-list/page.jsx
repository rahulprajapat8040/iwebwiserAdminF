"use client";
import {
  Container,
  Row,
  Col,
  Table,
  Pagination,
  Button,
  Badge,
  Form,
} from "react-bootstrap";
import { IoMdArrowBack, IoMdEye } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "@/assets/css/base.module.css";
import { getAllBanner } from "@/lib/redux/features/GetBanner";
import Image from "next/image";
import ViewBanner from "@/components/Modals/ViewBanner";
import EditBanner from "@/components/Modals/EditBanner";
import { Apis } from "@/utils/Apis";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import DeleteBanner from "@/components/Modals/DeleteBanner";

const BannerList = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);

  const { banners, isLoading, error } = useSelector(
    (state) => state.getAllBanner
  );
  // const [bannersData, setBannersData] = useState(banners);

  useEffect(() => {
    dispatch(getAllBanner());
  }, [dispatch]);

  // const [currentPage, setCurrentPage] = useState(pageInfo?.pageNumber || 1);
  const [pageSize] = useState(10); // You can customize this as needed
  // Fetch Banners based on pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleViewClick = (Banner) => {
    setSelectedBanner(Banner);
    setShowView(true);
  };

  const handleEditClick = (Banner) => {
    setSelectedBanner(Banner);
    setShowEdit(true);
  };

  const handleDeleteClick = (Banner) => {
    setSelectedBanner(Banner);
    setShowDelete(true);
  };
  return (
    <div>
      <ToastContainer />
      <ViewBanner
        show={showView}
        setShowView={setShowView}
        selectedBanner={selectedBanner}
      />
      <EditBanner
        show={showEdit}
        setShowEdit={setShowEdit}
        selectedBanner={selectedBanner}
      />
      <DeleteBanner
        show={showDelete}
        setShowDelete={setShowDelete}
        selectedBanner={selectedBanner}
      />
      {/* Header Banner */}
      <Container className="container-fluid ">
      <div className="dash-head">
          <div className="dash_title">
            <div onClick={() => router.back()} className=" d-inline-flex align-items-center gap-2" style={{cursor: "pointer"}}>   
              <div className="d-inline-block bg-primary p-1 px-2 rounded-3" style={{ cursor: "pointer" }}>
                <svg xmlns="http://www.w3.org/2000/svg" height={25} viewBox="0 -968 960 960" width={25} fill="#FFFFFF">
                  <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                </svg>
              </div>
              <h4 className={`main-title ${styles.xlFont}`}>Banner List</h4>
            </div>
          </div>
        </div>

        <div className="card">
          {/* Body Banner */}
          <div className="card-header">


          <div className="card-title d-flex justify-content-between align-items-center">
                <h2>Banner List</h2>
              </div>
          </div>
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={11} className="text-center">
              <Table responsive style={{ overflowX: "auto" }}>
                <thead>
                  <tr className="border-bottom py-1">
                    <th>Image</th>
                    <th>Title </th>
                    <th>Description </th>
                    <th>Button Link </th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-bottom">
                    <td>
                      {banners.image && banners.image !== null ? (
                        <video
                          src={banners.image || null}
                          width={80}
                          height={50}
                          className="rounded-2 object-fit-cover"
                          autoPlay
                        >
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <Image
                          src={banners.image || null}
                          alt="banners"
                          width={80}
                          height={50}
                          className="rounded-2 object-fit-cover"
                        />
                      )}
                    </td>
                    <td>{banners.title ? banners.title.slice(0, 20) + "..." : "No Title"}</td>
                    <td>
                      {banners.description ? banners.description.slice(0, 20) + "..." : "No Description"}
                    </td>
                    <td>{banners.button_link ? banners.button_link.slice(0, 20) + "..." : "No Button Link"}</td>
                    <td>
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <div
                          className={` d-flex align-items-center justify-content-center rounded-circle border-0 ${styles.bgPrimarySubset}`}
                          style={{ width: "25px", height: "25px" }}
                          onClick={() => handleViewClick(banners)}
                        >
                          <IoMdEye color="blue" size={12} />
                        </div>
                        <div
                          className={` d-flex align-items-center justify-content-center rounded-circle border-0 `}
                          style={{
                            width: "25px",
                            height: "25px",
                            background: "#cff4fc",
                          }}
                          onClick={() => handleEditClick(banners)}
                        >
                          <CiEdit color="green" size={12} />
                        </div>
                        <div
                          className={` d-flex align-items-center justify-content-center rounded-circle border-0 `}
                          style={{
                            cursor: "pointer",
                            width: "25px",
                            height: "25px",
                            background: "#f8d7da",
                          }}
                          onClick={() => handleDeleteClick(banners)}
                        >
                          <RiDeleteBin6Line color="red" size={12} />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>

              {/* Pagination Banner */}
              {/* {pageInfo && pageInfo.totalPage > 1 && (
              <Pagination>
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />

                {[...Array(pageInfo.totalPage)].map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}

                <Pagination.Next
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === pageInfo.totalPage}
                />
              </Pagination>
            )} */}
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default BannerList;
