import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useSignUp = () => {
  const [userData, setUserData] = useState({
    userid: "",
    userpwd: "",
    email: "",
    nickname: "",
    age: "",
    gender: "",
    contact: "",
    grade: "",
    point: "",
  });

  const navigate = useNavigate();

  const signupCheck = async () => {
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify(userData),
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      alert(data);
      if (res.status === 200) {
        navigate("/IDPWLogin");
      } else {
        setUserData({
          userid: "",
          userpwd: "",
          email: "",
          nickname: "",
          age: "",
          gender: "",
          contact: "",
          grade: "",
          point: "",
        });
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };
  return { userData, setUserData, signupCheck };
};

export default useSignUp;
