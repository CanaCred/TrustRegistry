import Container from "react-bootstrap/Container";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import GrantAssurance from "./components/GrantAssurance";
import CheckAssurance from "./components/CheckAssurance";
import GrantCredential from "./components/GrantCredential";
import CheckCredential from "./components/CheckCredential";

let domain;
// if (
//   process.env.NODE_ENV === "development" ||
//   process.env.NODE_ENV === "production"
// ) {
//   domain = "http://15.222.7.146:3001";
// } else {
domain = "http://localhost:3001";
// }

const App = () => {
  return (
    <Container className="p-3">
      <h1 className="header">CanaCred Trust Registry</h1>
      <Tabs
        defaultActiveKey="issuer"
        id="uncontrolled-tab-example"
        className="mb-3 myTabs"
      >
        <Tab eventKey="issuer" title="Issuer">
          <GrantAssurance domain={domain} />
          <CheckAssurance domain={domain} />
        </Tab>
        <Tab eventKey="verifier" title="Verifier">
          <GrantCredential domain={domain} />
          <CheckCredential domain={domain} />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default App;
