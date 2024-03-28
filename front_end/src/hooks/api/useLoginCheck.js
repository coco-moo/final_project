import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useLoginCheck = () => {
  const [userData, setUserData] = useState({
    userid: "",
    userpwd: "",
  });
  const navigate = useNavigate();
  const loginCheck = async () => {
    try {
      const res = await fetch("/api/loginCheck", {
        method: "POST",
        body: JSON.stringify(userData),
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      console.log(data);
      if (res.status === 200) {
        navigate("/");
      } else {
        setUserData({ userid: "", userpwd: "" });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { userData, setUserData, loginCheck };
};

export default useLoginCheck;
