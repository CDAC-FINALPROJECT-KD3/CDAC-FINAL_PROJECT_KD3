import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import { useState } from "react";
import { toast } from "react-toastify";
import { addRoomCategorys } from "../services/Room";

function AddRoomCategory() {
    const[categoryName,setCategoryName]=useState('')
    const[description,setDescription]=useState('')

    const navigate = useNavigate();

    const  onSave = async () => {
        if(categoryName.length==0){
            toast.error("please Enter Room Category")
        }else if(description.length==0){
            toast.warn("Please Enter Room Description")
        }
        else{
            const result=await addRoomCategorys(categoryName,description);

            if (result["status"] == "success") {
                toast.success("Successfully added a RoomCategory");
                navigate(-1);
            } else {
              toast.error(result["error"]);
            }
        }
    };

    const onCancel = () => {
        navigate(-1);
      };
  return (
    <div>
      <AdminNavbar />
      <div className="container">
        <h3>HotelCategory</h3>
        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="">Room Category Name</label>
              <input
                onChange={(e) => setCategoryName(e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="col">
            <div className="mb-3">
              <label htmlFor="">Description</label>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                rows="2"
                className="form-control"
              />
            </div>
          </div>
          <div className="row">
          <div className="col">
            <button onClick={onSave} className="btn btn-success">
              Save
            </button>
            <button onClick={onCancel} className="btn btn-danger ms-3">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddRoomCategory;
