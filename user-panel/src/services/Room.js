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

