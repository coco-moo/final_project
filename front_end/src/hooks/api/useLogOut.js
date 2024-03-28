import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

const useLogOut = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      // Perform Google logout
      await googleLogout();

      // Perform server logout
      const res = await fetch("/api/logout", {
        method: "GET",
        credentials: "include",
      });

      // Handle response
      const data = await res.json();
      // alert(data);
      console.log(data);

      // Check status and handle logout
      if (res.status === 200) {
        navigate("/");
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return { logout };
};

export default useLogOut;
