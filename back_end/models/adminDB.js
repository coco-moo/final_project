const express = require("express"); // npm i express | yarn add express
const cors    = require("cors");    // npm i cors | yarn add cors
const mysql   = require("mysql");   // npm i mysql | yarn add mysql
const app     = express();
const port    = 3001; // 포트번호 설정

const { error } = require('console')
const connection = mysql.createConnection({
  host : 'localhost',
  port : '3306',
  user : 'root',
  password : '1234',
  database : 'bookdb'
});

app.use(express.json())

app.use(cors({
  origin: "*",                // 출처 허용 옵션
  credentials: true,          // 응답 헤더에 Access-Control-Allow-Credentials 추가
  optionsSuccessStatus: 200,  // 응답 상태 200으로 설정
}))

// post 요청 시 값을 객체로 바꿔줌
app.use(express.urlencoded({ extended: true })) 

// app.get('/books', (req, res) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   const sql = 'select * from buyerBook'
//   connection.query(sql, (error, data) => {
//     if(error) return res.json(error);
//     return res.json(data)
//   })
// })

app.get('/enquiries', (req, res) => {
  const sql = 'select * from enquiry'
  connection.query(sql, (error, data) => {
    if(error) return res.json(error);
    return res.json(data)
  })
})

app.get('/customers', (req, res) => {
  const sql = 'select * from customers'
  connection.query(sql, (error, data) => {
    if(error) return res.json(error);
    return res.json(data)
  })
})

app.get('/buyerbook', (req, res) => {
  const sql = 'select * from buyerbook'
  connection.query(sql, (error, data) => {
    if(error) return res.json(error);
    return res.json(data)
  })
})

app.get('/customers/:custKey', (req, res) => {
  const custKey = req.params.custKey;
  const sql = `SELECT * FROM customers WHERE custKey = ${custKey}`;
  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching customer:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ error: 'Customer not found' });
      } else {
        res.json(results[0]); // 첫 번째 고객 정보 반환
      }
    }
  });
});

// contact.js에서 받은 문의답글 서버에 저장
app.post('/reply', (req, res) => {
  const { boardKey, reply } = req.body;
  const adminKey = 1; // 관리자키 임의로 1로 지정
  const date = new Date().toISOString(); // 현재 날짜 및 시간

  // reply 테이블에 새로운 답글을 추가
  const sql = `INSERT INTO reply (boardKey, adminKey, date, reply) VALUES (?, ?, ?, ?)`;
  connection.query(sql, [boardKey, adminKey, date, reply], (error, results) => {
    if (error) {
      console.error('Error submitting reply:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json({ message: 'Reply submitted successfully' });
    }
  });
});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})