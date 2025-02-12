import { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { getUserList } from "../services/User";
import UList from "../components/UserList";

function UserList() {
    const [userList,setUserList]=useState([]);

    const onLoadUserList=async()=>{
        const result = await getUserList();
        console.log(result);
        setUserList(result);
    }

    useEffect(() => {
        // load all categories when this component is loaded on the screen
        onLoadUserList()
      }, [])

  return (
    <div>
      <AdminNavbar />
      <center>
        <h2>User Detail List</h2>
      </center>
    <div className="container">
      <table className="table  table-hover">
        <thead>
          <tr>
            <th>Id</th>
            <th>firstName</th>
            <th>LastName</th>
            <th>Email</th>
            <th>MobileNo</th>
            <th>Role</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((ul) => {
              return (
                <UList
                  id={ul.id}
                  firstName={ul.firstName}
                  lastName={ul.lastName}
                  email={ul.email}
                  mobileNo={ul.mobileNo}
                  role={ul.role}
                />
              )
            })}
        </tbody>
      </table>
      </div>
    </div>
  );
}
export default UserList;
