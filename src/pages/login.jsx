import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    // Simple Email Regex Validation search online specially for regex used by email to check its validity myself 
    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            newErrors.email = "Email is required.";
        } else if (!emailRegex.test(email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (!password) {
            newErrors.password = "Password is required.";
        } else if (password.length < 4) {
            newErrors.password = "Password must be at least 4 characters.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            localStorage.setItem("isAuthenticated", "true");
            navigate("/dashboard");
        }, 600);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white border border-gray-200 rounded-lg p-6 w-full max-w-sm shadow-sm space-y-4">
                <h1 className="text-2xl font-bold text-gray-800 text-center">Login</h1>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <Input
                            type="email"
                            label="Email"
                            placeholder="admin@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && (
                            <p className="text-xs text-red-600 font-medium mt-1">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <Input
                            type="password"
                            label="Password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && (
                            <p className="text-xs text-red-600 font-medium mt-1">{errors.password}</p>
                        )}
                    </div>

                    <Button type="submit" isLoading={isLoading} className="w-full">
                        Sign In
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Login;