import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styled/PurInfoBox.css";

const PurInfoBox = ({ bookData }) => {  // 구매하기페이지(Purchase)와 구매내역페이지(PurchaseHistory)에서 사용됨
  const navigate = useNavigate();

  const convey = () => {
    navigate("/SellerInfoPage", {
      //판매자 정보 페이지로 이동
      state: {
        custKey: bookData.sellerKey,
      },
    });
  };
  // console.log(bookData)

  return (
    <div className="yhw_purInfoBox">
      <Link to="/detail">
        <img src={bookData.itemImg} alt="상품이미지" />
      </Link>
      <div className="yhw_purInfoTxt">
        <div className="yhw_purInfoTxtTop">
          <b>{bookData.itemTitle}</b>
          <span className="yhw_purInfoWriterPub">
            {bookData.author} | {bookData.publisher}
          </span>
          <span
            className="yhw_purInfoSeller"
            title="판매자 정보 보기"
            onClick={convey}
          >
            판매자: {bookData.seller}
          </span>
        </div>
        <div className="yhw_purInfoTxtBottom">
          <div className="yhw_purInfoStat">
            <span>상태 등급</span>
            <b>최상</b>
          </div>
          <div className="yhw_purInfoPrice">
            <span>판매 입찰가</span>
            <b>12,000원</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurInfoBox;
