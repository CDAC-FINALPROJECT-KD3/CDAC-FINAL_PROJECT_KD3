import axios from 'axios';

  export async function addHotel(hotel_Name,address,city,description,rating,image) {
    try {
      const url = 'https://localhost:7275/Hotels'
  
      // create body to upload the data along with an image
      const body = new FormData();
      body.append('Hotel_Name', hotel_Name); // Match C# DTO field
      body.append('Address', address);
      body.append('City', city);
      body.append('Description', description);
      body.append('Ratings', rating); // Ensure correct case
      body.append('ImagesDto', image); // FIXED: Backend expects "ImagesDto"

  
      const response = await axios.post(url, body)
      return response.data
    } catch (ex) {
      return { status: 'error', error: ex }
    }
  }
  
  