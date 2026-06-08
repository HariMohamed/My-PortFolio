import { Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main id="main" className="page-shell">
      <div className="empty-state">
        <p className="eyebrow">404</p>
        <h1>Page not found.</h1>
        <p>The route you opened is not part of the portfolio.</p>
        <Link className="btn btn-primary" to="/">
          <Home aria-hidden="true" />
          Back home
        </Link>
      </div>
    </main>
  );
}
