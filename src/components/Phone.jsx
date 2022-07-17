import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button, Form, Alert } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
const Phone = () => {
    const [number, setNumber] = useState("");
    const [error, setError] = useState("");
    const { setUpRecaptcha } = useUserAuth();
    const [flag, setFlag] = useState(false);
    const [otp, setOtp] = useState("");
    const [confObj, setConfObj] = useState("");
    const navigate = useNavigate();
    const getOtp = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await setUpRecaptcha(number);
            console.log("response", response);
            setConfObj(response);
            setFlag(true);
        } catch (err) {
            setError(err.massage);
        }
        if (number === "" || number === undefined) console.log(number);
        return;
    };

    const verifyOtp = async (e) => {
        e.preventDefault();
        if (otp === "" || otp === null) return;
        try {
            setError("");
            await confObj.confirm(otp);
            navigate("/home");
        } catch (err) {
            setError(err.err.massage);
        }
    };

    return (
        <div>
            <div className="p-4 box">
                <h2 className="mb-3">Firebase phone Login</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={getOtp} style={{ display: !flag ? "block" : "none" }}>
                    <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                        <PhoneInput defaultCountry="IN" placeholder="Enter phone number" value={number} onChange={setNumber} />
                        <div id="recaptcha-container" />
                    </Form.Group>

                    <div className="btn-right mt-2">
                        <button variant="primary" type="submit">
                            {" "}
                            send otp{" "}
                        </button>
                        &nbsp;
                        <Link to="/">
                            <button variant="secondary"> cancel </button>
                        </Link>
                    </div>
                </Form>
                <Form onSubmit={verifyOtp} style={{ display: flag ? "block" : "none" }} className="mt-5">
                    <Form.Group className="mb-3" controlId="formBasicOtp">
                        <Form.Control type="text" placeholder="enter otp" onChange={(e) => setOtp(e.target.value)}></Form.Control>
                        <div id="recaptcha-container" />
                    </Form.Group>

                    <div className="btn-right mt-2">
                        <button variant="primary" type="submit">
                            {" "}
                            send otp{" "}
                        </button>
                        &nbsp;
                        <Link to="/">
                            <button variant="secondary"> cancel </button>
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Phone;
