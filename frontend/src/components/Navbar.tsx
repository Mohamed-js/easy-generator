import { NavLink, useNavigate } from "react-router";
import Icon from "../assets/icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { logout } from "../store/sessionSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  const token = useSelector((state: RootState) => state.session.token);

  return (
    <nav className="flex justify-between items-center">
      <NavLink to="/">
        <img src={Icon} />
      </NavLink>
      <VisitorActions token={token} />
      <AuthenticatedUserActions token={token} />
    </nav>
  );
};

export default Navbar;

const VisitorActions = ({ token }: { token: string | null }) => {
  return (
    <>
      {!token && (
        <div className="flex gap-2 items-center">
          <NavLink to="/login">Login</NavLink>
          {" | "}
          <NavLink to="/signup">Join Us</NavLink>
        </div>
      )}
    </>
  );
};

const AuthenticatedUserActions = ({ token }: { token: string | null }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <>
      {token && (
        <div className="flex gap-2 items-center">
          <NavLink to="/profile">Profile</NavLink>
          {" | "}
          <button
            className="cursor-pointer text-indigo-500"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
};
