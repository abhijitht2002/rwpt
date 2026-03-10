import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMeAPI } from '../../services/auth.service'
import API, { setAccessToken } from '../../api/axios'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

function OAuthSuccess() {
    const { setUser } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const finishLogin = async () => {
            try {
                const refreshRes = await API.post("/auth/refresh");

                if (refreshRes.data?.accessToken) {
                    setAccessToken(refreshRes.data.accessToken);

                    const meRes = await getMeAPI();
                    setUser(meRes.user);

                    toast.success("Login successful");
                    navigate("/dashboard");
                }
            } catch (error) {
                toast.error("Google login failed. Try again.");
                navigate("/account/login")
            }
        }

        finishLogin();
    }, [navigate, setUser])


    return (
        <div>Signing you in...</div>
    )
}

export default OAuthSuccess