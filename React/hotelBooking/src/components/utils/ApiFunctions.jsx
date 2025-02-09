import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:9192",
});

/* Add a new room to the database */
export async function AddRoom(photo, roomType, roomPrice) {
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("roomType", roomType);
    formData.append("roomPrice", roomPrice);

    try {
        const response = await api.post("/rooms/add/new-room", formData);
        return response.status === 201;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error adding room");
    }
}

/* Fetch room types from the server */
export async function getRoomTypes() {
    try {
        const response = await api.get("/rooms/room-types");
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error fetching room types");
    }
}
