// import { BrowserRouter as Router } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Title from "../components/Title";
import PurchaseRequest from "../components/PurchaseRequest";
import RecentBooks from "../components/RecentBooks";

const recentBooks = [
  { title: "눈물꽃소년", image: "img/book.png" },
  { title: "스무살을 가장 존중한다", image: "img/book2.png" },
  { title: "직장상사악령퇴치부", image: "img/book3.png" },
  { title: "로기완을 만났다", image: "img/book4.png" },
  { title: "우리할아버지", image: "img/book5.png" },
  { title: "Book 6", image: "img/book.png" },
  { title: "Book 7", image: "img/book.png" },
  { title: "Book 8", image: "img/book.png" },
  { title: "Book 9", image: "img/book.png" },
  { title: "Book 10", image: "img/book.png" },
];
const checkSession = async () => {
  try {
    const response = await fetch("/api/checkSession", {
      method: "GET",
      credentials: "include", // 쿠키를 전송하기 위해 credentials 옵션을 include로 설정합니다.
    });

    if (response.ok) {
      const data = await response.json();
      console.log("세션 상태 확인 결과:", data);
      if (data.loggedIn) {
        console.log("사용자가 로그인 중입니다.");
        // 로그인 중인 경우 해당 사용자 정보를 이용하여 로그인 상태를 처리합니다.
      } else {
        console.log("사용자가 로그아웃 상태입니다.");
        // 로그아웃 상태인 경우 처리합니다.
      }
    } else {
      console.error("세션 상태 확인 실패:", response.statusText);
      // 요청이 실패한 경우 처리합니다.
    }
  } catch (error) {
    console.error("세션 상태 확인 실패:", error.message);
    // 예외가 발생한 경우 처리합니다.
  }
};

function Main() {
  return (
    <div className="App">
      <button onClick={checkSession}>세션확인</button>
      <Header />
      <Title />
      <RecentBooks books={recentBooks} titleText="최근 구매 희망 도서" />
      <RecentBooks books={recentBooks} titleText="최근 판매 도서" />
      <PurchaseRequest />
      <Footer />
    </div>
  );
}

export default Main;
