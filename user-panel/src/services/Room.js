import axios from "axios";

export async function addRoomCategorys(categoryName,description) {
    try{
        const body={categoryName,description}
        const url='https://localhost:7275/RoomCategories'
        const response=await axios.post(url,body)
        return response.data
      }catch(ex){
        return{status:'error',error:ex}
      }
}

export async function getRoomCategoryList() {
    try {
      const url='https://localhost:7275/RoomCategories'
      const response=await axios.get(url)
      return response.data
    } catch (ex) {
      return{status:'error',error:ex}
    }   
  }


export async function addRoom(roomNo, hotelId, categoryName, price, city,description, image,availabilty ) {
    try {
        console.log({ roomNo, hotelId, categoryName, price, city,description, image,availabilty });
      const url = 'https://localhost:7275/Room'
  
      // create body to upload the data along with an image
      const body = new FormData();
      body.append('RoomNo', roomNo);
      body.append('HotelId', hotelId);
      body.append('RoomType', categoryName);
      body.append('PricePerNight', price);
      body.append('City', city);
      body.append('Description', description);
      body.append('ImagesDto', image); 
    //   body.append('Availability', availabilty);
      body.append('Availability', availabilty === '1' || availabilty === 1 ? 'true' : 'false');

      
      // Properly log FormData
      for (let [key, value] of body.entries()) {
          console.log(key, value);
      }
  
      const response = await axios.post(url, body)
      console.log(response)
      return response.data
    } catch (ex) {
      return { status: 'error', error: ex }
    }
  }

export async function getRoomWithImgList() {
    try {
      const url='https://localhost:7275/Room/WithImg'
      const response=await axios.get(url)
      return response.data
    } catch (ex) {
      return{status:'error',error:ex}
    }
  }
