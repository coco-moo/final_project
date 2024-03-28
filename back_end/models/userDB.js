// userDB.js

const db = require("../database/db.js"); // 데이터베이스 연결 설정
const bcrypt = require("bcrypt");

// 사용자를 DB에 등록하는 함수
exports.signUp = (data) => {
  return new Promise((resolve, reject) => {
    db.query(
      // 사용자 정보를 customers 테이블에 삽입
      `INSERT INTO customers (userid, userpwd, email, nickname, age, gender) VALUES (?,?,?,?,?,?) `,
      // `INSERT INTO customers (userid, userpwd, email, nickname, age, gender, contact, grade, point) VALUES (?,?,?,?,?,?,?,?,?) `,
      [
        data[0],
        data[1],
        data[2],
        data[3],
        data[4],
        data[5],
        // data[6],
        // data[7],
        // data[8],
      ],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// 특정 사용자를 가져오는 함수
exports.getUser = (userid) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM customers where userid = ?`,
      userid,
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// 특정 닉네임을 가진 사용자를 가져오는 함수
exports.getNickname = (nickname) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM customers where nickname = ?`,
      nickname,
      (err, result) => {
        if (err) reject(err);
        else resolve(result); // 결과가 배열 형태로 반환되므로 첫 번째 요소만 반환합니다.
      }
    );
  });
};

// 특정 이메일을 가진 사용자를 가져오는 함수
exports.getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM customers WHERE email = ?`,
      email,
      (err, result) => {
        if (err) reject(err);
        else resolve(result[0]); // 결과가 배열 형태로 반환되므로 첫 번째 요소만 반환합니다.
      }
    );
  });
};

// 사용자 이메일 중복을 확인하는 함수
exports.checkEmailDuplicate = async (req, res) => {
  const { email } = req.body;

  try {
    // 해당 이메일로 사용자 정보를 가져옴
    const getUserByEmail = await exports.getUserByEmail(email);
    if (getUserByEmail) {
      // 이미 존재하는 이메일이면 409 상태 코드와 메시지를 반환
      res.status(409).json("중복된 이메일입니다.");
    } else {
      // 존재하지 않는 이메일이면 200 상태 코드와 메시지를 반환
      res.status(200).json("사용 가능한 이메일입니다.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

// 사용자 아이디 중복을 확인하는 함수
exports.checkUserIdDuplicate = async (req, res) => {
  const { userid } = req.body;

  try {
    // 해당 아이디로 사용자 정보를 가져옴
    const getUserByUserId = await exports.getUser(userid);
    if (getUserByUserId.length > 0) {
      // 이미 존재하는 아이디이면 409 상태 코드와 메시지를 반환
      res.status(409).json("중복된 아이디입니다.");
    } else {
      // 존재하지 않는 아이디이면 200 상태 코드와 메시지를 반환
      res.status(200).json("사용 가능한 아이디입니다.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

// // 사용자 nickname 중복을 확인하는 함수
exports.checkNicknameDuplicate = async (req, res) => {
  const { nickname } = req.body;
  try {
    // 해당 아이디로 사용자 정보를 가져옴
    const getUserByNickname = await exports.getNickname(nickname);

    if (getUserByNickname.length > 0) {
      // 이미 존재하는 아이디이면 409 상태 코드와 메시지를 반환
      res.status(409).json("중복된 닉네임입니다.");
    } else {
      // 존재하지 않는 아이디이면 200 상태 코드와 메시지를 반환
      res.status(200).json("사용 가능한 닉네임입니다.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

// 입력된 비밀번호와 해시된 비밀번호를 비교하는 함수
const hashCompare = async (inputValue, hash) => {
  try {
    const isMatch = await bcrypt.compare(inputValue, hash);
    if (isMatch) return true;
    else return false;
  } catch (err) {
    console.error(err);
    return err;
  }
};

// 사용자 로그인을 확인하는 함수
exports.loginCheck = async (req, res) => {
  const { userid, userpwd } = req.body;

  try {
    // 해당 사용자 정보 가져옴
    const getUser = await exports.getUser(userid);
    if (!getUser.length) {
      res.status(401).json("존재하지 않는 아이디입니다.");
      return;
    }
    // 해시된 비밀번호를 문자열로 변환
    const blobToStr = Buffer.from(getUser[0].userpwd).toString();
    // 입력된 비밀번호와 해시된 비밀번호를 비교
    const isMatch = await hashCompare(userpwd, blobToStr);

    if (!isMatch) {
      // 비밀번호가 일치하지 않으면 401 상태 코드와 메시지를 반환
      res.status(401).json("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 로그인 성공 시 세션에 사용자 정보 저장
    // req.session.userid = userid;
    req.session.user = getUser[0]; // 필요한 경우 사용자 정보의 일부만 저장 가능
    res.status(200).json({
      message: "로그인 성공",
      user: req.session.user.custKey, // 세션에 저장된 사용자 정보를 응답으로 반환
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

exports.checkSession = (req, res) => {
  const userID = req.session.user.custKey;
  // const userID = req.session.user.custKey;
  console.log(userID);
  if (userID) {
    res.send({ loggedIn: true, loginUser: userID });
  } else {
    res.send({ loggedIn: false });
  }
};

exports.logout = (req, res) => {
  // 세션에서 사용자 정보 삭제
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).json("로그아웃 실패");
      return;
    } else {
      res.status(200).json({
        message: "로그아웃 성공",
      });
    }
  });
};
