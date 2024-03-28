import "./styled/App.css";
import { Routes, Route } from "react-router-dom";
import Address from "./pages/Address";
import BuyDetail from "./pages/BuyDetail";
import CategoryBookList from "./pages/CategoryBookLIst";
import IDPWLogin from "./pages/IDPWLogin";
import Main from "./pages/Main";
import Mypage from "./pages/Mypage";
import Purchase from "./pages/Purchase";
import PurchaseHistory from "./pages/PurchaseHistory";
import RegRequest from "./pages/RegRequest";
import SalesHistory from "./pages/SalesHistory";
import SellerInfoPage from "./pages/SellerInfoPage";
import SignUpEasy from "./pages/SignUpEasy";
import SignUpMail from "./pages/SignUpMail";
import SNSLogin from "./pages/SNSLogin";
import Admin from "./pages/Admin";
import SellerRank from "./pages/SellerRank";
import QuestionForm from "./pages/QuestionForm";
import AdminLogin from "./pages/AdminLogin";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="Address" element={<Address />}></Route>
        <Route path="BuyDetail" element={<BuyDetail />}></Route>
        <Route path="CategoryBookList" element={<CategoryBookList />}></Route>
        <Route path="IDPWLogin" element={<IDPWLogin />}></Route>
        <Route path="AdminLogin" element={<AdminLogin />}></Route>
        <Route path="Mypage" element={<Mypage />}></Route>
        <Route path="Purchase" element={<Purchase />}></Route>
        <Route path="PurchaseHistory" element={<PurchaseHistory />}></Route>
        <Route path="RegRequest" element={<RegRequest />}></Route>
        <Route path="SalesHistory" element={<SalesHistory />}></Route>
        <Route path="SellerInfoPage" element={<SellerInfoPage />}></Route>
        <Route path="SignUpEasy" element={<SignUpEasy />}></Route>
        <Route path="SignUpMail" element={<SignUpMail />}></Route>
        <Route path="SNSLogin" element={<SNSLogin />}></Route>
        <Route path="Admin" element={<Admin />}></Route>
        <Route path="SellerRank" element={<SellerRank />}></Route>
        <Route path="QuestionForm" element={<QuestionForm />}></Route>
        <Route path="Profile" element={<Profile />}></Route>
      </Routes>
    </div>
  );
}

export default App;
