import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>

      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/class">Classes</Link></li>
        <li><Link to="/assignments">Assignments</Link></li>
        <li><Link to="/notes">Notes</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;