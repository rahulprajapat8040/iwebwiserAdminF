'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import DefaultImage from '@/assets/img/image.jpg';
import { getAdmin } from '@/lib/redux/features/GetAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { Apis } from '@/utils/Apis';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CgCamera } from 'react-icons/cg';
import { BsCamera } from 'react-icons/bs';


export default function Profile() {
    const dispatch = useDispatch();
    const { admin, isLoading, error } = useSelector((state) => state.admin);

    // Set state for name and email after admin data is available
    useEffect(() => {
        if (admin) {
            setName(admin.username || '');  // Fallback to an empty string if undefined
            setEmail(admin.email || '');    // Fallback to an empty string if undefined
        }
    }, [admin]);

    const updateAdmin = async (e) => {
        e.preventDefault();
        // Update admin data
        try {
            const response = await axios.put(`${Apis.updateAdmin}/${admin?.id}`, {
                username: name,
                email: email,
            })
            toast.success("Admin updated successfully");
            dispatch(getAdmin());
        } catch (error) {
            console.log(error);

        }
    }

    const updatePassword = async (e) => {
        e.preventDefault();
        // Update admin password

        try {
            if (newPassword !== confirmPassword) {
                toast.error("Passwords do not match");
                return;
            }
            const response = await axios.put(`${Apis.updateAdmin}/${admin?.id}`, {
                password: newPassword,
            })
            toast.success("Password updated successfully");
            setNewPassword('');
            setConfirmPassword('');
            dispatch(getAdmin());
        } catch (error) {
            console.log(error);
        }
    }

    const uploadMedia = async (e) => {
        e.preventDefault();
        // Upload profile picture
        try {
            const formData = new FormData();
            formData.append('file', e.target.files[0]);
            const response = await axios.post(Apis.uploadFile, formData);
            if (response) {
                const res = await axios.put(`${Apis.updateProfilepic}/${admin?.id}`, {
                    image: response.data.url
                })
                dispatch(getAdmin());
                toast.success("Profile picture updated successfully");
            }
        } catch (error) {
            toast.error("Failed to upload profile picture");
        }
    }

    // Initialize state with fallback empty values (to avoid undefined)
    const [name, setName] = useState(admin?.username || '');  // default to empty string if admin is not available yet
    const [email, setEmail] = useState(admin?.email || '');    // default to empty string if admin is not available yet
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [activeBox, setActiveBox] = useState(''); // Track active section ('edit' or 'pass')

    // Toggle between edit and password sections
    const toggleBox = (box) => {
        setActiveBox((prevBox) => (prevBox === box ? '' : box));
    };

    return (
        <div className="container-fluid">
            <ToastContainer />
            <div className="card">
                <div className="card-body">
                    <div className="d-flex align-items-start w-100 admin_info">

                        <span className="admin_logo position-relative ">
                            <label
                                htmlFor="file"
                                className="position-absolute w-100 h-100 d-flex showOnHover align-items-center justify-content-center"
                                style={{
                                    cursor: 'pointer'
                                }}
                            >

                                <BsCamera color='white' size={30} />
                            </label>
                            <input
                                type="file"
                                id="file"
                                hidden
                                className="d-none"
                                onChange={uploadMedia} />
                            <Image
                                src={admin?.image || DefaultImage}
                                alt="admin"
                                width={100}
                                height={100}
                                className="img-fluid imageScale object-fit-cover"
                            />
                        </span>
                        <div className="profile-info py-2 ms-3">
                            <h2>{admin?.username || "Admin Name"}</h2>
                            <p>
                                <svg xmlns="http://www.w3.org/2000/svg" height={20} viewBox="0 -960 960 960" width={20} fill="#5f6368">
                                    <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
                                </svg>
                                {admin?.email || "admin@example.com"}
                            </p>
                        </div>
                        <div className="d-flex action_btn ms-auto">
                            <a href="#editBox" role="button" className="p-2" onClick={() => toggleBox('edit')}>
                                <svg xmlns="http://www.w3.org/2000/svg" height={16} viewBox="0 -960 960 960" width={16} fill="#0029ff">
                                    <path d="M80 0v-160h800V0H80Zm160-320h56l312-311-29-29-28-28-311 312v56Zm-80 80v-170l448-447q11-11 25.5-17t30.5-6q16 0 31 6t27 18l55 56q12 11 17.5 26t5.5 31q0 15-5.5 29.5T777-687L330-240H160Zm560-504-56-56 56 56ZM608-631l-29-29-28-28 57 57Z" />
                                </svg>
                            </a>
                            <a href="#passBox" role="button" className="p-2" onClick={() => toggleBox('pass')}>
                                <svg xmlns="http://www.w3.org/2000/svg" height={16} viewBox="0 -960 960 960" width={16} fill="#0029ff">
                                    <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480h80q0 66 25 124.5t68.5 102q43.5 43.5 102 69T480-159q134 0 227-93t93-227q0-134-93-227t-227-93q-89 0-161.5 43.5T204-640h116v80H80v-240h80v80q55-73 138-116.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-80-240q-17 0-28.5-11.5T360-360v-120q0-17 11.5-28.5T400-520v-40q0-33 23.5-56.5T480-640q33 0 56.5 23.5T560-560v40q17 0 28.5 11.5T600-480v120q0 17-11.5 28.5T560-320H400Zm40-200h80v-40q0-17-11.5-28.5T480-600q-17 0-28.5 11.5T440-560v40Z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Profile Section */}
            <div className={`row mx-1 my-4`} id="editBox">
                <div className="card">
                    <div className="card-header">
                        <div className="card-title d-flex justify-content-between align-items-center">
                            <h2>Edit Profile</h2>
                        </div>
                    </div>
                    <div className="card-body">
                        <form className="upload-form mt-0" onSubmit={updateAdmin}>
                            <div className="row form-group align-items-center">
                                <div className="col-12 col-md-3">
                                    <label htmlFor="inputName" className="col-form-label form-label">Name</label>
                                </div>
                                <div className="col-12 col-md-8 mt-0">
                                    <input
                                        type="text"
                                        id="inputName"
                                        className="form-control form-control-lg form-input"
                                        placeholder="Enter New Name..."
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row form-group align-items-center">
                                <div className="col-12 col-md-3">
                                    <label htmlFor="inputEmail" className="col-form-label form-label">Email</label>
                                </div>
                                <div className="col-12 col-md-8 mt-0">
                                    <input
                                        type="text"
                                        id="inputEmail"
                                        className="form-control form-control-lg form-input"
                                        placeholder="Enter New Email..."
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row align-items-center">
                                <div className="col-4 col-md-3"></div>
                                <div className="col-8 col-md-9">
                                    <input
                                        type="submit"
                                        className="btn form-btn"
                                        value="EDIT"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Change Password Section */}
            <div className={`row mx-1 my-4`} id="passBox">
                <div className="card">
                    <div className="card-header">
                        <div className="card-title d-flex justify-content-between align-items-center">
                            <h2>Change Password</h2>
                        </div>
                    </div>
                    <div className="card-body">
                        <form className="upload-form" onSubmit={updatePassword}>
                            <div className="row form-group">
                                <div className="col-12 col-md-3">
                                    <label htmlFor="newPassword" className="col-form-label form-label">New Password</label>
                                </div>
                                <div className="col-12 col-md-8">
                                    <input
                                        type="password"
                                        id="newPassword"
                                        className="form-control form-control-lg form-input"
                                        placeholder="Enter New Password..."
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                        autoComplete="new-password"
                                    />
                                </div>
                            </div>
                            <div className="row form-group">
                                <div className="col-12 col-md-3">
                                    <label htmlFor="confirmPass" className="col-form-label form-label">Confirm Password</label>
                                </div>
                                <div className="col-12 col-md-8">
                                    <input
                                        type="password"
                                        id="confirmPass"
                                        className="form-control form-control-lg form-input"
                                        placeholder="Confirm New Password..."
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row align-items-center">
                                <div className="col-4 col-md-3"></div>
                                <div className="col-8 col-md-9">
                                    <input
                                        type="submit"
                                        className="btn form-btn"
                                        value="CHANGE"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
