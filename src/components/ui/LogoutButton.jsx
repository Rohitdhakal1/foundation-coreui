import { useNavigate } from "react-router-dom";
import Button from "./Button";

function LogoutButton({ variant = "danger" }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated");
        navigate("/login");
    };

    return (
        <Button variant={variant} onClick={handleLogout}>
            Log Out
        </Button>
    );
}

export default LogoutButton;