"use client"
import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios'
import { Apis } from '@/utils/Apis';
import Image from 'next/image';
import PlayStoreImg from '@/assets/img/playstore.png'
import AppleStoreImg from '@/assets/img/apple_icon.png'

const ViewCaseStudy = () => {
    // Access query parameters with useSearchParams in App Router
    const searchParams = useSearchParams();
    const [caseStudy, setCaseStudy] = useState(null);
    const id = searchParams.get('id'); // Get the 'id' from the query string
    const [activeTab, setActiveTab] = useState('about');


    const getCaseStudyById = useCallback(async () => {
        try {
            const res = await axios.get(`${Apis.getCaseStudyById}/${id}`);
            setCaseStudy(res.data.data);

        } catch (error) {
            console.log(error)
        }
    }, [id]);

    useEffect(() => {
        getCaseStudyById();
    }, [getCaseStudyById]); // Add getCaseStudyById to the dependency array

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
    };

    return (
        <>
            <div className="main-right-contaier" id="mainright-container">
                <div className="container-fluid">
                    {/* dashboard-head start here... */}
                    <div className="dash-head">
                        {/* dashboard banner title start here  */}
                        <div className="dash_title">
                            <a href="case_list.html" role="button" className="btn link-btn">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="20"
                                    viewBox="0 -960 960 960"
                                    width="20"
                                    fill="#FFFFFF"
                                >
                                    <path
                                        d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"
                                    />
                                </svg>
                            </a>
                            {/* <h2 className="text-dark ms-2">Add Header</h2> */}
                        </div>
                        {/* dashboard banner title end here  */}

                        {/* add banner breadcrumb end here  */}
                    </div>
                    {/* dashboard-head end here... */}

                    <div className="container-fluid">
                        {/* card start here  */}
                        <div className="card">
                            {/* card header start here  */}
                            <div className="card-header">
                                <div
                                    className="card-title d-flex justify-content-between align-items-center d-none"
                                >
                                    <h2 className="">Feedback List</h2>
                                </div>
                            </div>
                            {/* card header end here  */}

                            {/* card body start here  */}
                            <div className="card-body">
                                <div className="gap-3 client_info">
                                    <span className="client_logo">
                                        {caseStudy?.addCaseStudy?.image && (
                                            <Image
                                                src={caseStudy?.addCaseStudy?.image}
                                                alt='logo'
                                                width={100}
                                                height={100}
                                            />)}
                                    </span>

                                    <div className="profile-info">
                                        <h2>{caseStudy?.addCaseStudy?.productName}</h2>
                                        <p>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                height="20"
                                                viewBox="0 -960 960 960"
                                                width="20"
                                                fill="#5f6368"
                                            >
                                                <path
                                                    d="M528-432h216v-72H528v72Zm0-120h216v-72H528v72ZM192-336h288v-45q0-29-44-52t-100.5-23q-56.5 0-100 22.5T192-381v45Zm144.21-144Q366-480 387-501.21t21-51Q408-582 386.79-603t-51-21Q306-624 285-602.79t-21 51Q264-522 285.21-501t51 21ZM168-192q-29.7 0-50.85-21.16Q96-234.32 96-264.04v-432.24Q96-726 117.15-747T168-768h624q29.7 0 50.85 21.16Q864-725.68 864-695.96v432.24Q864-234 842.85-213T792-192H168Zm0-72h624v-432H168v432Zm0 0v-432 432Z"
                                                />
                                            </svg>
                                            {caseStudy?.industry?.title}
                                        </p>
                                        <p>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                height="20"
                                                viewBox="0 -960 960 960"
                                                width="20"
                                                fill="#5f6368"
                                            >
                                                <path
                                                    d="M480-307q96-79 144-151.5t48-135.1q0-86.68-53.5-142.54Q565-792 480-792t-138.5 56Q288-680 288-594.06 288-532 336-460t144 153Zm0 91Q346-317 281-410.61q-65-93.6-65-183.39 0-118.01 73.56-194 73.56-76 190.5-76t190.44 76Q744-712.01 744-594q0 89.79-65 183.39Q614-317 480-216Zm.21-312Q510-528 531-549.21t21-51Q552-630 530.79-651t-51-21Q450-672 429-650.79t-21 51Q408-570 429.21-549t51 21ZM216-96v-72h528v72H216Zm264-504Z"
                                                />
                                            </svg>
                                            {caseStudy?.addCaseStudy?.country}
                                        </p>
                                        <p>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                height="20"
                                                viewBox="0 -960 960 960"
                                                width="20"
                                                fill="#5f6368"
                                            >
                                                <path
                                                    d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z"
                                                />
                                            </svg>

                                            {caseStudy?.addCaseStudy?.platformUsers} users
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* card body end here  */}

                            {/* card footer start here  */}
                            <div className="card-footer">
                                <ul className="nav nav-pills" role="tablist">
                                    <li className="nav-item">
                                        <a
                                            className={`nav-link ${activeTab === 'about' ? 'active' : ''}`}
                                            onClick={() => handleTabChange('about')}
                                            role="button"
                                        >
                                            About
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className={`nav-link ${activeTab === 'challenges' ? 'active' : ''}`}
                                            onClick={() => handleTabChange('challenges')}
                                            role="button"
                                        >
                                            Challenges
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className={`nav-link ${activeTab === 'impact' ? 'active' : ''}`}
                                            onClick={() => handleTabChange('impact')}
                                            role="button"
                                        >
                                            Impact
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className={`nav-link ${activeTab === 'phases' ? 'active' : ''}`}
                                            onClick={() => handleTabChange('phases')}
                                            role="button"
                                        >
                                            Phases
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className={`nav-link ${activeTab === 'certificate' ? 'active' : ''}`}
                                            onClick={() => handleTabChange('certificate')}
                                            role="button"
                                        >
                                            Certificates
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className={`nav-link ${activeTab === 'apps' ? 'active' : ''}`}
                                            onClick={() => handleTabChange('apps')}
                                            role="button"
                                        >
                                            Apps
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            {/* card footer end here  */}
                        </div>
                        {/* card end here  */}

                        {/* Tab content */}
                        <div className="tab-content">
                            <div id="about" className={`container tab-pane ${activeTab === 'about' ? 'active show' : 'fade'}`}>
                                <br />
                                <div className="card">
                                    <div className="card-header border-bottom">
                                        <h3 className="tab_heading text-capitalize">{caseStudy?.addCaseStudy?.productName}</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-12 col-md-12 tab_data">
                                                <span className="text-muted slogan w-75">
                                                    <label htmlFor="quote">&quot;</label>
                                                    {caseStudy?.addCaseStudy?.slogan || "No slogan Available"}
                                                    <label htmlFor="quote">&quot;</label>
                                                </span>
                                                <p>
                                                    {caseStudy?.addCaseStudy?.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* about end here  */}

                            {/* challenges start here  */}
                            <div id="challenges" className={`container tab-pane ${activeTab === 'challenges' ? 'active show' : 'fade'}`}>
                                <br />
                                <div className="card">
                                    <div className="card-header border-bottom">
                                        <h3 className="tab_heading">Challenges</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-12 col-md-6">
                                                <div className="tab_img">
                                                    {caseStudy?.challenges?.image ? (
                                                        <Image
                                                            src={caseStudy?.challenges?.image}
                                                            width="90%"
                                                            alt="aboutImage"
                                                            className="img-fluid"
                                                        />) : "No Image Available"}
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6 tab_data">
                                                <h3>Key Challenges</h3>
                                                <p>
                                                    {caseStudy?.challenges?.challeng || "No Challenges Available"}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="row my-3">
                                            <div className="col-12 col-md-6 tab_data">
                                                <h3>Solution</h3>
                                                <p>
                                                    {caseStudy?.challenges?.solution || "No Solution Available"}
                                                </p>
                                                {/* <ul className="px-2">
                                                    <li>
                                                        Lorem ipsum dolor sit amet consectetur,
                                                        adipisicing elit. Harum quam molestias libero.
                                                    </li>
                                                    <li>
                                                        Lorem ipsum dolor sit amet consectetur,
                                                        adipisicing elit. Harum quam molestias libero.
                                                    </li>
                                                    <li>
                                                        Lorem ipsum dolor sit amet consectetur,
                                                        adipisicing elit. Harum quam molestias libero.
                                                    </li>
                                                    <li>
                                                        Lorem ipsum dolor sit amet consectetur,
                                                        adipisicing elit. Harum quam molestias libero.
                                                    </li>
                                                </ul> */}
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className="tab_img">
                                                    {caseStudy?.challenges?.image ? (
                                                        <Image
                                                            src={caseStudy?.challenges?.image}
                                                            width="90%"
                                                            alt="aboutImage"
                                                            className="img-fluid"
                                                        />) : "No Image Available"}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* challenges end here  */}

                            {/* phases start here  */}
                            <div id="phases" className={`container tab-pane ${activeTab === 'phases' ? 'active show' : 'fade'}`}>
                                <br />
                                <div className="card p-0">
                                    <div className="card-body p-0">
                                        <div className="container impact_div">
                                            <div className="col-12 border-bottom">
                                                <h2 className="tab_heading">Phases</h2>
                                            </div>
                                            {caseStudy?.system_phase?.map((phase, index) => (
                                                <div className="list_div" key={index}>
                                                    <h3 className={'btn'}>{phase.title}</h3>
                                                    <ul className="list-unstyled d-flex flex-wrap gap-4">
                                                        {phase.features.map((feature, featureIndex) => (
                                                            <li className="list-group-item" key={featureIndex}>
                                                                {feature}
                                                            </li>
                                                        ))}
                                                        {phase.features.length === 0 && (
                                                            <li className="list-group-item">No features available</li>
                                                        )}
                                                    </ul>
                                                </div>
                                            ))}
                                            {(!caseStudy?.system_phase || caseStudy?.system_phase.length === 0) && (
                                                <div className="list_div">
                                                    <p>No phases available</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* phases end here  */}

                            {/* impact start here  */}
                            <div id="impact" className={`container tab-pane ${activeTab === 'impact' ? 'active show' : 'fade'}`}>
                                <br />
                                <div className="card">
                                    <div className="card-header border-bottom">
                                        <h3 className="tab_heading">Impact</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-12 col-md-6">
                                                <div className="tab_img">
                                                    {caseStudy?.impact?.image ? (
                                                        <Image
                                                            src={caseStudy?.impact?.image}
                                                            width="90%"
                                                            alt="aboutImage"
                                                            className="img-fluid"
                                                        />) : "No Image is Available"}
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6 tab_data">
                                                <h3>Bussiness Impact</h3>
                                                <p>
                                                    {caseStudy?.impact?.businessImpact || "No Business Impact Available"}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="row my-3">
                                            <div className="col-12 col-md-6 tab_data">
                                                <h3>User Impact</h3>
                                                <p>
                                                    {caseStudy?.impact?.userImpact || "No User Impact Available"}
                                                </p>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className="tab_img">
                                                    {caseStudy?.impact?.image ? (
                                                        <Image
                                                            src={caseStudy?.impact?.image}
                                                            width="90%"
                                                            alt="aboutImage"
                                                            className="img-fluid"
                                                        />) : "No Image is Available"}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* impact end here  */}

                            {/* certificate start here  */}
                            <div id="certificate_div" className={`container tab-pane ${activeTab === 'certificate' ? 'active show' : 'fade'}`}>
                                <br />
                                <div className="card mb-3">
                                    <div className="card-header border-bottom">
                                        <h3 className="tab_heading">Certificates</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="row certificate_div">
                                            {caseStudy?.userCertificate?.certificateImage?.length > 0 ? (
                                                caseStudy.userCertificate.certificateImage.map((image, index) => (
                                                    <div className="col-12 col-md-4 mb-4 mb-lg-0 certificate_area" key={index}>
                                                        <a
                                                            href="#!"
                                                            className="certificate_img"
                                                            data-bs-toggle="modal"
                                                            data-bs-target={`#certificate-${index}`}
                                                        >
                                                            <Image
                                                                src={image}
                                                                className="img-fluid object-fit-"
                                                                style={{ height: '200px' }}                                                                
                                                                alt={`Certificate ${index + 1}`}
                                                            />
                                                        </a>
                                                        <div
                                                            className="modal fade"
                                                            id={`certificate-${index}`}
                                                            tabIndex="-1"
                                                            aria-labelledby="exampleModalLabel"
                                                            aria-hidden="true"
                                                        >
                                                            <div className="modal-dialog modal-dialog-centered">
                                                                <div className="modal-content">
                                                                    <div className="modal-header">
                                                                        <h1 className="modal-title" id="exampleModalLabel">
                                                                            Certificate-{index + 1}
                                                                        </h1>
                                                                        <button
                                                                            type="button"
                                                                            className="btn-close"
                                                                            data-bs-dismiss="modal"
                                                                            aria-label="Close"
                                                                        ></button>
                                                                    </div>
                                                                    <div className="modal-body">
                                                                        <span>
                                                                            <Image
                                                                                src={image}
                                                                                alt="image"
                                                                                width={500}
                                                                                height={500}
                                                                                className="img-fluid"
                                                                            />
                                                                        </span>
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-secondary cancel_modal my-3"
                                                                            data-bs-dismiss="modal"
                                                                        >
                                                                            Close
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>No certificates available</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* certificate end here  */}

                            {/* Apps division start here  */}
                            <div id="apps" className={`container tab-pane ${activeTab === 'apps' ? 'active show' : 'fade'}`}>
                                <br />
                                <div className="card">
                                    <div className="card-body">
                                        <div className="app_div">
                                            <a
                                                className="btn mx-2 btn-outline-primary rounded-pill"
                                                role="button"
                                            >
                                                <Image
                                                    src={PlayStoreImg}
                                                    alt="playStore"
                                                />
                                                Google Store
                                            </a>

                                            <a
                                                className="btn mx-2 btn-outline-primary rounded-pill"
                                                role="button"
                                            >
                                                <Image
                                                    src={AppleStoreImg}
                                                    alt="appleStore"
                                                />
                                                Apple Store
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Apps division end here  */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewCaseStudy;