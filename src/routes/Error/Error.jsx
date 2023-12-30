import { useRouteError } from "react-router-dom";
import "./Error.css";

export default function Error() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <p>Lo sentimos esa página no existe</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
