import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styled/Contact.css';

function Contact() {
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const response = await axios.get('http://localhost:3001/enquiries'); 
      setEnquiries(response.data); 
    } catch (error) {
      console.error('Error fetching enquiries:', error);
    }
  };

  const [showReplies, setShowReplies] = useState({});

  const toggleReplies = (id) => {
    setShowReplies({
      ...showReplies,
      [id]: !showReplies[id]
    });
  };

  const handleReplySubmit = async (boardKey, replyText) => {
    try {
      // POST 요청을 사용하여 답글을 서버로 전송합니다.
      await axios.post('http://localhost:3001/reply', {
        boardKey: boardKey,
        reply: replyText
      });
      console.log(`문의 ${boardKey}에 대한 답글을 성공적으로 전송했습니다.`);
    } catch (error) {
      console.error('Error submitting reply:', error);
    }
  };

  return (
    <div className='table'>
      <p className='tb-title'>문의 내용</p>
      <table className='contact-table'>
        <tbody>
          {enquiries.map(enquiry => (
            <React.Fragment key={enquiry.boardKey}>
              <tr>
                <td>{enquiry.boardKey}</td>
                <td>{enquiry.boardTitle}</td>
                <td>{enquiry.date}</td>
                <td>
                  <button className='contact-res' onClick={() => toggleReplies(enquiry.boardKey)}>
                    {showReplies[enquiry.boardKey] ? '닫기' : '답글'}
                  </button>
                </td>
              </tr>
              {showReplies[enquiry.boardKey] && (
                <tr>
                  <td colSpan="4" className='contact-detail'>
                    {enquiry.Enquiry}
                    <form onSubmit={(e) => {e.preventDefault(); handleReplySubmit(enquiry.boardKey, e.target.reply.value)}}>
                      <textarea className='replyarea' name="reply" placeholder="답글을 입력하세요" required></textarea>
                      <button type="submit">등록</button>
                    </form>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Contact;
