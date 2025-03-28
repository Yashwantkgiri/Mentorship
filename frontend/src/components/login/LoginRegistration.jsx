import { useState } from "react";
import Registration from "./Registration";
import Login from "./Login";

function LoginRegistration() {
    const [showRegister, setShowRegister] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const toggleRegister = () => setShowRegister(!showRegister);

    return (
        <>
            {showRegister ? (
                <Registration
                    handleRegister={toggleRegister}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                />
            ) : (
                <Login
                    handleRegister={toggleRegister}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                />
            )}
        </>
    );
}

export default LoginRegistration;
