import Container from "react-bootstrap/Container";
import GrantAssurance from "./components/GrantAssurance";
import CheckAssurance from "./components/CheckAssurance";

const App = () => {
  return (
    <Container className="p-3">
      <h1 className="header">CanCred Trust Registry</h1>
      <GrantAssurance />
      <CheckAssurance />
    </Container>
  );
};

export default App;
