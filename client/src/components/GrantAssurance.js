import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import axios from "axios";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const GrantAssurance = ({ domain }) => {
  const headingStyle = {
    color: "white",
    backgroundColor: "#d1534f",
    padding: "10px",
  };
  const [issuerDID, setissuerDID] = useState();
  const [schemaID, setschemaID] = useState();
  const [expiryDate, setExpiryDate] = useState();
  const [assuranceLevel, setAssuranceLevel] = useState();
  const [grantResult, setGrantResult] = useState();

  const grantAssurance = async (e) => {
    e.preventDefault();
    const data = JSON.stringify({
      issuerDID,
      schemaID,
      expiryDate,
      assuranceLevel,
    });

    const config = {
      method: "post",
      url: `${domain}/assurance`,
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
      <h5 style={headingStyle}> Grant Assurance:</h5>
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
      <Form.Group className="mb-3" controlId="formAssuranceLevel">
        <Form.Control
          value={assuranceLevel}
          onChange={(e) => setAssuranceLevel(e.target.value)}
          placeholder="Assurance Level"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="buttons">
        <Button variant="outline-danger" onClick={grantAssurance}>
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

export default GrantAssurance;
