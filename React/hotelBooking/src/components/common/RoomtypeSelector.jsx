import React, { useEffect, useState } from "react";
import { First } from "react-bootstrap/esm/PageItem";
import { getRoomTypes } from "../utils/ApiFunctions";

const RoomTypeSelector = ({handleRoomInputChange, newRoom}) => {
    const[roomType, setRoomTypes] = useState([])
    const[showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false)
    const[newRoomType, setNewRoomType] = useState("")
   
    useEffect(() => {
        getRoomTypes().then((data) => {
            setRoomTypes(data)
        })
    },[])

    const handleNewRoomTypeInputChange = (room) => {

        setNewRoomType(room.target.value);
    }

    const handleAddNewRoomType =() => {
        if(newRoomType !== ""){
            setRoomTypes([...roomType, newRoomType])
            setNewRoomType("")
            setShowNewRoomTypeInput(false)
        }
    } 
    
    return(

        <>
        {RoomTypeSelector.length > 0 && (

            <div>
                <select name="roomType" id="roomType" value={newRoom.roomType}
                onChange={(room) => {
                    if(room.target.value === "Add New"){
                        setShowNewRoomTypeInput(true)
                    }else{
                        handleRoomInputChange(room)
                    }
                }}
                >
                    <option value={""}> select a room type</option>
                    <option value={"Add New"}> Add New</option>
                    {roomType.map((type, index) => (
                        <option value={type} key={index}> {type}</option>
                    ))}
                </select>
                {showNewRoomTypeInput && (
                    <div className="input-group">
                        <input type="text"
                        className="form-control"
                        placeholder="Enter a new room type"
                        onChange={handleNewRoomTypeInputChange} />
                        <button className="btn btn-hotel" type="button" onClick={handleAddNewRoomType}>Add</button>
                    </div>
                )}
            </div>
        )
        }
        </>
    )
}

export default RoomTypeSelector