import './Admin.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserInfo() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/customers');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  return (
    <div className='table'>
      <p className='tb-title'>회원 정보</p>
      <table className='userinfo-table'>
        <thead>
          <tr>
            <th className='date'>번호</th>
            <th className='count'>아이디</th>
            <th className='cost'>닉네임</th>
            <th className='email'>이메일</th>
            <th className='nick'>연락처</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.custKey}>
              <td>{customer.custKey}</td>
              <td>{customer.userid}</td>
              <td>{customer.nickname}</td>
              <td>{customer.email}</td>
              <td>{customer.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserInfo;
