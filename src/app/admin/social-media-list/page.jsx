"use client";
import {
  Container,
  Row,
  Col,
  Table,
  Pagination,
  Button,
  Form,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import styles from "@/assets/css/base.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getAllSocialMedia } from "@/lib/redux/features/GetAllSocialMedia";
import instagramPic from '@/assets/img/instagram.png'
import facebookPic from '@/assets/img/facebook.png'
import twitterPic from '@/assets/img/twitter.png'
import linkedinPic from '@/assets/img/linkedin.png'
import youtube from '@/assets/img/youtube.svg'
// import youtubePic from '@/assets/img/youtube.png'
import Link from "next/link";
import DeleteSocialMedia from "@/components/Modals/DeleteSocialMedia";
import axios from "axios";
import { Apis } from "@/utils/Apis";
import { FaEye } from "react-icons/fa";
import EditSocialMediaStatus from "@/components/Modals/EditSocialMediaStatus";
import { FaEyeSlash } from "react-icons/fa6";
import EditSocialMedia from "@/components/Modals/EditSocialMedia";


const SocialMediaList = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // Redux state
  const { socialData, isLoading, error, pageInfo } = useSelector(
    (state) => state.getAllSocialMedia
  );

  const Icons = {
    instagram: instagramPic,
    facebook: facebookPic,
    twitter: twitterPic,
    linkedin: linkedinPic,
    youtube: youtube,
  };

  // Component state
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [selectedSoicalMedia, setSelectedSocialMedia] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);

  // Fetch socialData
  const fetchTechnologies = () => {
    dispatch(getAllSocialMedia({ page: currentPage, limit, search }));
  };

  useEffect(() => {
    fetchTechnologies();
  }, [currentPage, limit, search]);

  const handleEditClick = (socialData) => {
    setSelectedSocialMedia(socialData);
    setShowEdit(true);
  };

  const handleDeleteClick = (socialData) => {
    setSelectedSocialMedia(socialData);
    setShowDelete(true);
  };

  const handleStatusChange = async (socialData) => {
    setSelectedSocialMedia(socialData);
    setShowStatus(true);
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Modified search handler with debouncing
  const handleSearch = (searchTerm) => {
    setSearch(searchTerm);

    // Clear previous timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Set new timeout for debouncing
    const timeoutId = setTimeout(async () => {
      if (searchTerm.trim()) {
        setIsSearching(true);
        try {
          const response = await axios.get(Apis.searchSocialMedia, {
            params: { query: searchTerm }
          });

          setSearchResults(response.data.data || []);
        }
        catch (error) {
          console.error("Search error:", error);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
        fetchTechnologies(); // Fetch all social media when search is empty
      }
    }, 500); // 500ms delay

    setSearchTimeout(timeoutId);
  };

  return (
    <>
      <EditSocialMedia
        show={showEdit}
        setShowEdit={setShowEdit}
        selectedSoicalMedia={selectedSoicalMedia}
      />
      <DeleteSocialMedia
        show={showDelete}
        setShowDelete={setShowDelete}
        selectedSoicalMedia={selectedSoicalMedia}
      />
      <EditSocialMediaStatus
        show={showStatus}
        setShowstatus={setShowStatus}
        selectedSoicalMedia={selectedSoicalMedia}
      />
      <div>
        {/* Header */}
        <Container className="container-fluid">
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
                <h4 className={`main-title`}>Social Link List</h4>
              </div>
            </div>
          </div>
          {/* Body */}
          <div className="card">
            <div className="card-header">
              <div
                className="card-title d-flex justify-content-between align-items-center"
              >
                <h2>Social Links</h2>
              </div>
            </div>
            <div className="mb-3 pe-4 d-flex align-items-center justify-content-end">
              <Form.Control
                type="search"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search social media..."
                className={`p-2 mx-2 d-none d-md-block ${styles.mdFont}`}
                style={{ width: "200px" }}
              />
            </div>
            <Row className="justify-content-center">
              <Col xs={12} md={8} lg={11} className="text-center">
                <Table responsive>
                  <thead>
                    <tr className="border-bottom">
                      <th>Image</th>
                      <th>Title</th>
                      <th>Link</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isSearching ? (
                      <tr>
                        <td colSpan="4" className="text-center">Searching...</td>
                      </tr>
                    ) : search.trim() && searchResults.length > 0 ? (
                      searchResults.map((item, index) => (
                        <tr key={index} className="border-bottom">
                          <td>
                            <Image
                              src={Icons[item.type] || null}
                              alt={item.type}
                              width={50}
                              height={50}
                              className="rounded-2 object-fit-cover"
                            />
                          </td>
                          <td>{item.type}</td>
                          <td>{item.link}</td>
                          <td>
                            <div className="d-flex align-items-center justify-content-center gap-2">
                              <div
                                className="d-flex align-items-center justify-content-center rounded-circle border-0"
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  background: "#cff4fc",
                                }}
                                onClick={() => handleEditClick(item)}
                              >
                                <CiEdit color="green" size={12} />
                              </div>
                              <div
                                className="d-flex align-items-center justify-content-center rounded-circle border-0"
                                style={{
                                  cursor: "pointer",
                                  width: "25px",
                                  height: "25px",
                                  background: "#f8d7da",
                                }}
                                onClick={() => handleDeleteClick(item)}
                              >
                                <RiDeleteBin6Line color="red" size={12} />
                              </div>
                              <div
                                className="d-flex align-items-center justify-content-center rounded-circle border-0"
                                style={{
                                  cursor: "pointer",
                                  width: "25px",
                                  height: "25px",
                                  background: "#cfe2ff",
                                }}
                                onClick={() => handleStatusChange(item)}
                              >
                                {item.active === true ? <FaEye color="blue" size={12} /> : <FaEyeSlash color="red" size={12} />}
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : search.trim() && searchResults.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center">No results found</td>
                      </tr>
                    ) : (
                      socialData.map((item, index) => (
                        <tr key={index} className="border-bottom">
                          <td>
                            <Image
                              src={Icons[item.type] || null}
                              alt={item.type}
                              width={50}
                              height={50}
                              className="rounded-2 object-fit-cover"
                            />
                          </td>
                          <td>{item.type}</td>
                          <td>{item.link}</td>
                          <td>
                            <div className="d-flex align-items-center justify-content-center gap-2">
                              <div
                                className="d-flex align-items-center justify-content-center rounded-circle border-0"
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  background: "#cff4fc",
                                }}
                                onClick={() => handleEditClick(item)}
                              >
                                <CiEdit color="green" size={12} />
                              </div>
                              <div
                                className="d-flex align-items-center justify-content-center rounded-circle border-0"
                                style={{
                                  cursor: "pointer",
                                  width: "25px",
                                  height: "25px",
                                  background: "#f8d7da",
                                }}
                                onClick={() => handleDeleteClick(item)}
                              >
                                <RiDeleteBin6Line color="red" size={12} />
                              </div>
                              <div
                                className="d-flex align-items-center justify-content-center rounded-circle border-0"
                                style={{
                                  cursor: "pointer",
                                  width: "25px",
                                  height: "25px",
                                  background: "#cfe2ff",
                                }}
                                onClick={() => handleStatusChange(item)}
                              >
                                {item.active === true ? <FaEye color="blue" size={12} /> : <FaEyeSlash color="red" size={12} />}
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>

                {/* Pagination */}
                {pageInfo && pageInfo?.totalPages >= 1 && (
                  <div className="card-footer">
                    <p>{`showing ${limit} enteris of case study`}</p>
                    <Pagination className="pagination_div">
                      <Pagination.Prev
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      />
                      {Array.from({ length: pageInfo?.totalPages }).map((_, index) => (
                        <Pagination.Item
                          key={index + 1}
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </Pagination.Item>
                      ))}
                      <Pagination.Next
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === pageInfo?.totalPages}
                      />
                    </Pagination>
                  </div>
                )}
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default SocialMediaList;
