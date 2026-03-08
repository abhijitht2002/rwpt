import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function OAuthFailure() {
    const navigate = useNavigate()

    useEffect(() => {
        toast.error("Google login failed. Try again.");
        navigate("/account/login");
    }, [navigate]);

    return <div>Redirecting...</div>
}

export default OAuthFailure;