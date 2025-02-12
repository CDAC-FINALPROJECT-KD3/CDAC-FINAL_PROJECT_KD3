

function UList({ id, firstName, lastName, email,mobileNo,role }) {
    return (
      <tr>
        <td>{id}</td>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{email}</td>
        <td>{mobileNo}</td>
        <td>{role}</td>
        <td><button className='btn btn-success btn-sm'>Edit</button></td>
        <td> 
        <button className='btn btn-danger btn-sm ms-2'>
          Delete
        </button>
        </td>
      </tr>
    )
  }
  
  export default UList
  