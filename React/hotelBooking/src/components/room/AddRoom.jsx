import React, { useState } from "react";
import { AddRoom } from "../utils/ApiFunctions";
import RoomTypeSelector from "../common/RoomTypeSelector";

const AddRoom1 = () => {
    const [newRoom, setNewRoom] = useState({
        photo: null,
        roomType: "",
        roomPrice: ""
    });

    const [imagePreview, setImagePreview] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessages, setErrorMessages] = useState("");

    const handleRoomInputChange = (event) => {
        const name = event.target.name;
        let value = event.target.value;

        if (name === "roomPrice") {
            value = isNaN(value) ? "" : Number(value);
        }

        setNewRoom({ ...newRoom, [name]: value });
    };

    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        setNewRoom({ ...newRoom, photo: selectedImage });
        setImagePreview(URL.createObjectURL(selectedImage));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const success = await AddRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice);
            if (success !== undefined) {
                setSuccessMessage("A new room was added to the database");
                setNewRoom({ photo: null, roomType: "", roomPrice: "" });
                setImagePreview("");
                setErrorMessages("");
            } else {
                setErrorMessages("Error adding room");
            }
        } catch (error) {
            setErrorMessages(error.message);
        }
    };

    return (
        <>
            <section className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <h2 className="mt-5 mb-2">Add a New Room</h2>

                        {successMessage && <div className="alert alert-success">{successMessage}</div>}
                        {errorMessages && <div className="alert alert-danger">{errorMessages}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="roomType" className="form-label">Room Type</label>
                                <RoomTypeSelector
                                    handleRoomInputChange={handleRoomInputChange}
                                    newRoom={newRoom}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="roomPrice" className="form-label">Room Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    required
                                    id="roomPrice"
                                    name="roomPrice"
                                    value={newRoom.roomPrice}
                                    onChange={handleRoomInputChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="photo" className="form-label">Room Photo</label>
                                <input
                                    id="photo"
                                    name="photo"
                                    type="file"
                                    className="form-control"
                                    onChange={handleImageChange}
                                />
                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        alt="Preview Room Photo"
                                        style={{ maxWidth: "400px", maxHeight: "400px" }}
                                        className="mb-3"
                                    />
                                )}
                            </div>

                            <div className="d-grid d-md-flex mt-2">
                                <button className="btn btn-outline-primary ml-5">
                                    Save Room
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AddRoom1;
