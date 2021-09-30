import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import axios from "axios";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const GrantCredential = ({ domain }) => {
  const headingStyle = {
    color: "white",
    backgroundColor: "#d1534f",
    padding: "10px",
  };
  const [verifierDID, setVerifierDID] = useState();
  const [schemaID, setschemaID] = useState();
  const [expiryDate, setExpiryDate] = useState();
  const [credentialOverlay, setCredentialOverlay] = useState();
  const [grantResult, setGrantResult] = useState();

  const grantCredential = async (e) => {
    e.preventDefault();
    const data = JSON.stringify({
      verifierDID,
      schemaID,
      expiryDate,
      credentialOverlay,
    });

    const config = {
      method: "post",
      url: `${domain}/credential`,
      headers: { "Content-Type": "application/json" },
      data,
    };
    try {
      setGrantResult("loading");
      const response = await axios(config);
      const grantResult = await response.data;
      setGrantResult(grantResult);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Form.Group>
      <h5 style={headingStyle}> Grant Credential:</h5>
      <Form.Group className="mb-3" controlId="formVerifierDID">
        <Form.Control
          value={verifierDID}
          onChange={(e) => setVerifierDID(e.target.value)}
          placeholder="Verifier DID"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formschemaID">
        <Form.Control
          value={schemaID}
          onChange={(e) => setschemaID(e.target.value)}
          placeholder="Schema ID"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formExpiryDate">
        <DatePicker
          selected={expiryDate}
          onChange={(date) => setExpiryDate(date)}
          minDate={new Date()}
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          placeholderText="  Expiry Date"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formCredentialOverlay">
        <Form.Control
          value={credentialOverlay}
          onChange={(e) => setCredentialOverlay(e.target.value)}
          placeholder="Credential Overlay"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="buttons">
        <Button variant="outline-danger" onClick={grantCredential}>
          Submit
        </Button>{" "}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Result: Transaction Hash"
          value={
            grantResult
              ? grantResult === "loading"
                ? "Please wait..."
                : `Transaction Hash:${grantResult.transactionHash}`
              : null
          }
          readOnly
        />
      </Form.Group>
    </Form.Group>
  );
};

export default GrantCredential;
