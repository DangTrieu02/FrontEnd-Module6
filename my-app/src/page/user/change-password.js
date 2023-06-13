// ChangePasswordModal.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Modal, Button } from 'react-bootstrap';

const ChangePasswordSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Old Password is required'),
    newPassword: Yup.string()
        .min(6, 'New Password must be at least 6 characters')
        .required('New Password is required'),
    confirmNewPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm New Password is required'),
});

export default function ChangePasswordModal() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = React.useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleSubmit = async (values) => {
        try {
            const currentUser = JSON.parse(localStorage.getItem('user'));
            if (!currentUser) {
                throw new Error('No user found');
            }
            await axios.put(
                `http://localhost:3001/users/change-password/${currentUser.idUser}`,
                values
            );
            await Swal.fire('Success', 'Password changed successfully!', 'success');
            navigate('/home');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <button type="button" className="btn btn-b-n ml-2" onClick={handleShow}>
                Change Password
            </button>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            currentPassword: '',
                            newPassword: '',
                            confirmNewPassword: '',
                        }}
                        validationSchema={ChangePasswordSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form>
                            <div className="mb-3">
                                <label htmlFor="currentPassword" className="form-label">
                                    Current Password:
                                </label>
                                <Field
                                    type="password"
                                    id="currentPassword"
                                    name="currentPassword"
                                    className="form-control"
                                />
                                <ErrorMessage
                                    name="currentPassword"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="newPassword" className="form-label">
                                    New Password:
                                </label>
                                <Field
                                    type="password"
                                    id="newPassword"
                                    name="newPassword"
                                    className="form-control"
                                />
                                <ErrorMessage
                                    name="newPassword"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirmNewPassword" className="form-label">
                                    Confirm New Password:
                                </label>
                                <Field
                                    type="password"
                                    id="confirmNewPassword"
                                    name="confirmNewPassword"
                                    className="form-control"
                                />
                                <ErrorMessage
                                    name="confirmNewPassword"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>
                            <Button variant="primary" type="submit">
                                Change Password
                            </Button>
                        </Form>
                    </Formik>
                </Modal.Body>
            </Modal>
        </div>
    );
}
