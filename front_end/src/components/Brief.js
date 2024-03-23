import '../styled/Admin.css';

function Brief() {
  return(
    <div className='table'>
      <p className='tb-title'>일자별 주문 요약(주문 승인건)</p>
      <table className='brief-table'>
        <thead>
          <tr>
            <th className='date'>일자</th>
            <th className='count'>주문수</th>
            <th className='cost'>매출액</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2024-03-15</td>
            <td>1</td>
            <td>20000</td>
          </tr>
          <tr>
            <td>2024-03-15</td>
            <td>1</td>
            <td>20000</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Brief
