import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { RootState } from "../store/store";

type ProtectedRouteProps = {
  path?: string;
  children: React.ReactNode;
};

const ProtectedRoute = ({ path = "/", children }: ProtectedRouteProps) => {
  const token = useSelector((state: RootState) => state.session.token);
  if (!token) {
    return <Navigate to={`/login?redirect-to=${path}`} replace />;
  }

  return children;
};

export default ProtectedRoute;
