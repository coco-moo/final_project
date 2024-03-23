import logo from './logo.png';
import '../styled/Admin.css';


function Admin() {
  return(
  <div className='container'>
    <header className='header'>
  <img src={logo} className="App-logo" alt="logo" />
  <a href='https://www.naver.com' className='back-main'>돌아가기</a>
  </header>
  <div className='contents'>
    <p className='admintitle'>관리자 페이지</p>
  </div>
  </div>
  )
}

export default Admin
