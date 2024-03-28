import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styled/Profile.css";
import Header from "../components/Header";
import MyPageSide from "../components/MypageSide";
import DateInquiry from "../components/DateInquiry";
import PurInfoBox from "../components/PurInfoBox";
import Footer from "../components/Footer";

const PurchaseHistory = () => {
  return (
    <>
      <Header />
      <div className="lcm_container">
        <div className="lcm_purHistCont">
          <div className="lcm_MypageSideAdd">
            <MyPageSide />
          </div>

          <div className="lcm_purHistMainCont">
            <div className="lcm_purHistTopCont">
              <b>로그인 정보</b>

              {/* <DateInquiry /> 날짜 조회 컴포넌트 일단 대충 만들어둠 */}
            </div>
            <div className="lcm_purHistContentsBox">
              {/* 구매 정보 표시 */}

              <ul className="lcm_purHistLists">
                {/* <li>아이디</li> */}
                <li>
                  <div>아이디</div>
                  <div className="lcm_purHistBtns">
                    <button>변경</button>
                    {/* 후기 작성 완료 시 버튼 비활성화 기능 추가할 예정 */}
                  </div>
                </li>
                {/* <div className="lcm_smTitle">비밀번호</div> */}
                <li>
                  <div>비밀번호</div>
                  <div className="lcm_purHistBtns">
                    <button>변경</button>
                    {/* 후기 작성 완료 시 버튼 비활성화 기능 추가할 예정 */}
                  </div>
                </li>
              </ul>
            </div>
            <div className="lcm_purHistContentsBox">
              <div className="lcm_purHistTopCont">
                <b>개인 정보</b>
                {/* <DateInquiry /> 날짜 조회 컴포넌트 일단 대충 만들어둠 */}
              </div>
              {/* 구매 정보 표시 */}
              <ul className="lcm_purHistLists">
                <li>
                  <div>휴대폰 번호</div>
                  <div className="lcm_purHistBtns">
                    <button>변경</button>
                    {/* 후기 작성 완료 시 버튼 비활성화 기능 추가할 예정 */}
                  </div>
                </li>
                <li>
                  <div>배송지</div>
                  <div className="lcm_purHistBtns">
                    <button>+ 새 배송지 추가</button>
                    <span>
                      <button>수정</button>
                      <button>삭제</button>
                    </span>
                    {/* 후기 작성 완료 시 버튼 비활성화 기능 추가할 예정 */}
                  </div>
                </li>
              </ul>
            </div>
            {/* <ul>
                {purchaseData.map((purchase) => (
                  <li key={purchase.id}>
                    {purchase.productName} - {purchase.price}
                  </li>
                ))}
              </ul> */}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PurchaseHistory;
