import React, { useState } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const CheckCredential = ({ domain }) => {
  const headingStyle = {
    color: "white",
    backgroundColor: "#d1534f",
    padding: "10px",
  };
  const [verifierDID, setVerifierDID] = useState();
  const [schemaID, setschemaID] = useState();
  const [checkResult, setCheckResult] = useState();

  const checkCredential = async (e) => {
    e.preventDefault();
    const config = {
      method: "get",
      url: `${domain}/credential?verifierDID=${verifierDID}&schemaID=${schemaID}`,
    };
    try {
      setCheckResult("loading");
      const response = await axios(config);
      const checkResult = await response.data;
      setCheckResult(checkResult);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form.Group>
      <h5 style={headingStyle}> Check Credential:</h5>
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
      <Form.Group className="mb-3" controlId="formCredentialOverlay">
        <Button variant="outline-danger" onClick={checkCredential}>
          Submit
        </Button>{" "}
      </Form.Group>

      <Form.Control
        type="text"
        placeholder="Result: Credential Overlay"
        value={
          checkResult
            ? checkResult === "loading"
              ? "Please wait..."
              : `Credential Overlay: ${checkResult}`
            : null
        }
        readOnly
      />
    </Form.Group>
  );
};

export default CheckCredential;
