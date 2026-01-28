import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";

const NotFoundPage = () => (
  <PageTransition>
    <h1>Page not found</h1>
    <p>That route does not exist. Try one of the main pages instead.</p>
    <div className="button-row">
      <Link className="button" to="/">
        Go home
      </Link>
      <Link className="button ghost" to="/work">
        View applied work
      </Link>
    </div>
  </PageTransition>
);

export default NotFoundPage;
