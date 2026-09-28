import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Please enter email and password");
            return;
        }

        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white border border-gray-200 rounded-lg p-6 w-full max-w-sm shadow-sm">
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Login</h1>

                <form onSubmit={handleLogin} className="space-y-4">
                    <Input
                        type="email"
                        label="Email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                        type="password"
                        label="Password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded transition-colors mt-2"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;