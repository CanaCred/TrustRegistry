import React, { useState } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const CheckAssurance = ({ domain }) => {
  const headingStyle = {
    color: "white",
    backgroundColor: "#d1534f",
    padding: "10px",
  };
  const [issuerDID, setissuerDID] = useState();
  const [schemaID, setschemaID] = useState();
  const [checkResult, setCheckResult] = useState();

  const checkAssurance = async (e) => {
    e.preventDefault();
    const config = {
      method: "get",
      url: `${domain}/assurance?issuerDID=${issuerDID}&schemaID=${schemaID}`,
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
      <h5 style={headingStyle}> Check Assurance:</h5>
      <Form.Group className="mb-3" controlId="formissuerDID">
        <Form.Control
          value={issuerDID}
          onChange={(e) => setissuerDID(e.target.value)}
          placeholder="Issuer DID"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formschemaID">
        <Form.Control
          value={schemaID}
          onChange={(e) => setschemaID(e.target.value)}
          placeholder="Schema ID"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formAssuranceLevel">
        <Button variant="outline-danger" onClick={checkAssurance}>
          Submit
        </Button>{" "}
      </Form.Group>

      <Form.Control
        type="text"
        placeholder="Result: Assurance Level"
        value={
          checkResult
            ? checkResult === "loading"
              ? "Please wait..."
              : `Assurance Level: ${checkResult}`
            : null
        }
        readOnly
      />
    </Form.Group>
  );
};

export default CheckAssurance;
