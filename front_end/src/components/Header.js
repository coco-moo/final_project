import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "../styled/Header.css";
import { FaSearch } from "react-icons/fa";
import useLogOut from "../hooks/api/useLogOut";
import styled from "styled-components";


const LogoutContainer = styled.div`
  cursor: pointer;
`

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // useNavigate 훅
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { logout } = useLogOut(); // 로그아웃 훅 사용

  useEffect(() => {
    // 로그인 상태 확인
    const isLoggedIn = checkLoginStatus();
    setIsLoggedIn(isLoggedIn); // false / true
  });

  function checkLoginStatus() {
    // 쿠키 확인
    const cookieName = `connect.sid`;
    const cookieExists = document.cookie.includes(cookieName);

    // 세션 스토리지 확인
    const userId = sessionStorage.getItem('id');

    // 쿠키나 세션 스토리지 중 하나라도 존재하면 로그인 상태로 판단
    return cookieExists || userId !== null;
  }


  const handleItemClick = (event) => {
    const items = document.querySelectorAll(".sbk-menu-item");
    items.forEach((item) => item.classList.remove("active"));
    event.target.classList.add("active");
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchTerm.trim() !== "") {
      if (location.pathname === "/") {
        navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      } else {
        navigate(`${location.pathname}/search?q=${encodeURIComponent(searchTerm)}`);
      }
    }
  };

  const handleEnterKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchSubmit();
    }
  }


  return (
    <div>
      <div className="sbk-header-wrapper">
        <div className="sbk-li-container">
          <dl>
            <dt>
              <NavLink
                to="/QuestionForm"
                className="sbk-menu-item"
                activeClassName="active"
                onClick={handleItemClick}
              >
                고객센터
              </NavLink>
            </dt>
            <dt>
              <NavLink
                to="/mypage"
                className="sbk-menu-item"
                activeClassName="active"
                onClick={handleItemClick}
              >
                마이페이지
              </NavLink>
            </dt>
            <dt>
              {isLoggedIn ? (
                <LogoutContainer onClick={logout} >
                  <span>로그아웃</span>
                </LogoutContainer>
              ) : (
                <NavLink
                  to="/SNSlogin"
                  className="sbk-menu-item"
                  activeClassName="active"
                  onClick={handleItemClick}
                >
                  로그인/회원가입
                </NavLink>
              )}
            </dt>
          </dl>
        </div>

        <div className="sbk-menu-container">
          <div className="sbk-logo-wrapper">
            <NavLink to="/" className="sbk-logo-link">
              <img
                className="sbk-logo-image"
                alt="로고이미지"
                src="img/logo.png"
              />
            </NavLink>
          </div>

          <div className="sbk-search-container">
            <FaSearch className="sbk-search-icon" />
            <input
              type="text"
              className="sbk-search-input"
              placeholder="  검색어를 입력하세요"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleEnterKeyDown}
            />
            <button className="sbk-search-button" onClick={handleSearchSubmit}>검색</button>
          </div>
        </div>

        <div className="sbk-nav-container">
          <dl>
            <dt>
              <NavLink
                to="/economics"
                className="sbk-menu-item"
                activeClassName="active"
                onClick={handleItemClick}
              >
                경제/경영
              </NavLink>
            </dt>
            <dt>
              <NavLink
                to="/novels"
                className="sbk-menu-item"
                activeClassName="active"
                onClick={handleItemClick}
              >
                소설/시/희곡
              </NavLink>
            </dt>
            <dt>
              <NavLink
                to="/comics"
                className="sbk-menu-item"
                activeClassName="active"
                onClick={handleItemClick}
              >
                만화
              </NavLink>
            </dt>
            <dt>
              <NavLink
                to="/arts"
                className="sbk-menu-item"
                activeClassName="active"
                onClick={handleItemClick}
              >
                예체능
              </NavLink>
            </dt>
            <dt>
              <NavLink
                to="/science"
                className="sbk-menu-item"
                activeClassName="active"
                onClick={handleItemClick}
              >
                과학
              </NavLink>
            </dt>
            <dt>
              <NavLink
                to="/essays"
                className="sbk-menu-item"
                activeClassName="active"
                onClick={handleItemClick}
              >
                에세이
              </NavLink>
            </dt>
          </dl>
        </div>
      </div>
      <hr className="sbk-header-hr" />
    </div>
  );
};

export default Header;
