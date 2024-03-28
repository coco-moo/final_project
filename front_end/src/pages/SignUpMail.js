import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styled/SignUp.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useSignUp from "../hooks/api/useSignUp";
import useUserIdCheck from "../hooks/api/useUserIdCheck";
import useNicknameCheck from "../hooks/api/useNicknameCheck";
import useGenderSelection from "../hooks/useGenderSelection"; // useGenderSelection 훅 가져오기

const SignUpMail = () => {
  // 커스텀 훅스
  const { userData, setUserData, signupCheck } = useSignUp();
  const { checkUserIdDuplicate, isDuplicate, setIsDuplicate } =
    useUserIdCheck();
  const { selectedGender, handleGenderButtonClick } = useGenderSelection(); // useGenderSelection 훅 사용

  const {
    isNicknameDuplicate,
    setIsNicknameDuplicate,
    checkNicknameDuplicate,
  } = useNicknameCheck();

  const submitBtn = async (event) => {
    event.preventDefault(); // Prevent default form submission
    if (
      !userData.userid ||
      !userData.userpwd ||
      !userData.email ||
      !userData.nickname
    ) {
      alert("아이디, 비밀번호, 이메일, 닉네임을 입력해주세요");
      return;
    }
    signupCheck();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  // 중복 확인 버튼 클릭 시 실행되는 함수
  const handleUserIdCheck = async () => {
    // 아이디 중복 여부 확인
    const isDuplicate = await checkUserIdDuplicate(userData.userid);
    // 중복 여부 상태 업데이트
    setIsDuplicate(isDuplicate);
  };

  const handleNicknameCheck = async () => {
    // 닉네임 중복 여부 확인
    const isNicknameDuplicate = await checkNicknameDuplicate(userData.nickname);
    // 중복 여부 상태 업데이트
    setIsNicknameDuplicate(isNicknameDuplicate);
  };

  return (
    <>
      <Header />
      <div className="yhw_container">
        <form className="yhw_signForm">
          <h4>환영합니다! 정보를 입력해주세요.</h4>
          <div className="yhw_signInputBox">
            <span className="yhw_signInputTit">아이디</span>
            <input
              type="text"
              name="userid"
              placeholder="아이디"
              value={userData.userid}
              onChange={handleChange}
            />
            <button
              className="yhw_dupCheckBtn"
              type="button"
              onClick={handleUserIdCheck}
            >
              중복확인
            </button>
          </div>
          <div className="yhw_signInputBox">
            <span className="yhw_signInputTit">비밀번호</span>
            <input
              type="password"
              name="userpwd"
              placeholder="비밀번호"
              value={userData.userpwd}
              onChange={handleChange}
            />
          </div>
          <div className="yhw_signInputBox">
            <span className="yhw_signInputTit">비밀번호 확인</span>
            <input type="password" placeholder="비밀번호 확인" required />
          </div>
          <div className="yhw_signInputBox">
            <span className="yhw_signInputTit">이메일</span>
            <input
              type="text"
              name="email"
              placeholder="이메일"
              value={userData.email}
              onChange={handleChange}
            />
          </div>
          <div className="yhw_signInputBox">
            <span className="yhw_signInputTit">닉네임</span>
            <input
              type="text"
              name="nickname"
              placeholder="닉네임"
              value={userData.nickname}
              onChange={handleChange}
            />
            <button
              className="yhw_dupCheckBtn"
              type="button"
              onClick={handleNicknameCheck}
            >
              중복확인
            </button>
          </div>
          <div className="yhw_signInputBox">
            <span className="yhw_signInputTit">나이</span>
            <input
              className="yhw_AgeInput"
              type="text"
              name="age"
              value={userData.age}
              onChange={handleChange}
            />
            <span>세</span>
          </div>
          <div className="yhw_signInputBox">
            <span className="yhw_signInputTit">성별</span>
            <div className="yhw_signGenderBtns">
              <button
                name="gender"
                value="M"
                onClick={(e) => {
                  e.preventDefault();
                  handleChange(e);
                  handleGenderButtonClick("M");
                }}
                style={{
                  backgroundColor: selectedGender === "M" ? "lightgray" : "",
                }}
              >
                남자
              </button>
              <button
                name="gender"
                value="F"
                onClick={(e) => {
                  e.preventDefault();
                  handleChange(e);
                  handleGenderButtonClick("F");
                }}
                style={{
                  backgroundColor: selectedGender === "F" ? "lightgray" : "",
                }}
              >
                여자
              </button>
            </div>
          </div>
          <div className="yhw_signUpBtnBox">
            <button type="submit" onClick={submitBtn}>
              회원가입
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default SignUpMail;
