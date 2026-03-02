import { createContext, useContext, useState } from "react";
import { getMeAPI, loginAPI, logoutAPI } from "../services/auth.service";
import { useEffect } from "react";
import API, { setAccessToken } from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Try refresh (cookie)
        const refreshRes = await API.post("/auth/refresh");

        if (refreshRes.data?.accessToken) {
          setAccessToken(refreshRes.data.accessToken);

          // Now safely fetch user
          const meRes = await getMeAPI();
          setUser(meRes.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        setAccessToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (formdata) => {
    setLoading(true);
    try {
      const res = await loginAPI(formdata);
      console.log(res);

      setUser(res.user);
      return { success: true, message: res.message };
    } catch (err) {
      console.log(err);

      return { success: false, message: err.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await logoutAPI();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
