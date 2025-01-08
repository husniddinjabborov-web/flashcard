import { Link } from "react-router-dom";
import "../styles/NotFound.css";

function NotFound() {
  return (
    <div className="not-found">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">Oh no! Siz izlagan sahifa mavjud emas.</p>
      <Link to="/" className="not-found-link">Bosh sahifaga qaytish</Link>
    </div>
  );
}

export default NotFound;