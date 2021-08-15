import Container from "react-bootstrap/Container";
import GrantAssurance from "./components/GrantAssurance";
import CheckAssurance from "./components/CheckAssurance";

let domain;
if (
  process.env.NODE_ENV === "development" ||
  process.env.NODE_ENV === "production"
) {
  domain = "http://15.222.7.146:3001";
} else {
  domain = "http://localhost:3001";
}

const App = () => {
  return (
    <Container className="p-3">
      <h1 className="header">CanaCred Trust Registry</h1>
      <GrantAssurance domain={domain} />
      <CheckAssurance domain={domain} />
    </Container>
  );
};

export default App;
