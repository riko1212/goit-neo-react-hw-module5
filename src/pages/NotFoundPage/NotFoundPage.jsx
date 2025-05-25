import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <p>There is nothing here. Please, go back to Home page.</p>
      <Link to="/">Home</Link>
    </>
  );
};

export default NotFoundPage;
