import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { getHotelList } from '../services/Hotel'
import AdminNavbar from '../components/AdminNavbar'
import { addRoom, getRoomCategoryList } from '../services/Room'

function AddRoom() {
  const [roomCategories, setRoomCategories] = useState([])
  const [hotels, setHotels] = useState([])

  const [roomNo, setRoomNo] = useState('')
  const [description, setDescription] = useState('')
  const [availabilty, setAvailability] = useState('')
  const [price, setPrice] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [hotelId, setHotelId] = useState('')
  const [city,setCity]=useState('')
  const [image, setImage] = useState(null)

  const navigate = useNavigate()

  const loadCategoriesAndHotels = async () => {
    const hotelsResult = await getHotelList()
    console.log(hotelsResult)
    // if (hotelsResult['status'] == 'success')
    if (hotelsResult.length > 0) {
      setHotels(hotelsResult);
    }

    const categoriesResult = await getRoomCategoryList()
    console.log(categoriesResult)
    // if (categoriesResult['status'] == 'success')
    if (categoriesResult.length > 0) {
      setRoomCategories(categoriesResult);    
    }
    console.log(roomCategories)
    console.log(hotels)
  }

  useEffect(() => {
    loadCategoriesAndHotels()
  }, [])

  const onSave = async () => {
    if (roomNo.length == 0) {
      toast.warn('Please enter RoomNo')
    } else if (description.length == 0) {
      toast.warn('Please enter description')
    } else if (availabilty.length == 0) {
      toast.warn('Please enter availabilty')
    } else if (price.length == 0) {
      toast.warn('Please enter price')
    } else if (categoryName.length == 0) {
      toast.warn('Please select categoryName')
    } else if (hotelId.length == 0) {
      toast.warn('Please select hotel')
    }else if (city.length == 0) {
      toast.warn('Please select City')
    }
     else if (!image) {
      toast.warn('Please select image')
    } else {
      console.log({ roomNo, hotelId, categoryName, price, city,description, image,availabilty });

      const result = await addRoom(roomNo, hotelId, categoryName, price, city,description, image,availabilty );
      if (result['status'] == 'success') {
        toast.success('Successfully added a Room')
        navigate(-1)
      } else {
        toast.error(result['error'])
      }
    }
  }

  const onCancel = () => {
    navigate(-1)
  }

  return (
    <div>
     <AdminNavbar />
      <div className='container'>
        <h2 className='header'>Add Rooms</h2>

        <div className='row'>
          <div className='col'>
            <div className='mb-3'>
              <label htmlFor=''>RoomNo</label>
              <input
                onChange={(e) => setRoomNo(e.target.value)}
                type='number'
                className='form-control'
              />
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col'>
            <div className='mb-3'>
              <label htmlFor=''>Room Category/Type</label>
              <select
                onChange={(e) => setCategoryName(e.target.value)}
                className='form-control'
              >
                {roomCategories.map((category) => {
                  return (
                    <option value={category['categoryName']}>{category['categoryName']}</option>
                  )
                })}
              </select>
            </div>
          </div>

          <div className='col'>
            <div className='mb-3'>
              <label htmlFor=''>Hotel</label>
              <select
                onChange={(e) => setHotelId(e.target.value)}
                className='form-control'
              >
                {hotels.map((hotel) => {
                  return <option value={hotel['id']}>{hotel['hotel_Name']}</option>
                })}
              </select>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col'>
            <div className='mb-3'>
              <label htmlFor=''>Availability</label>
              <select
                onChange={(e) => setAvailability(e.target.value)}
                className='form-control'
              >
                <option value="">Select Availability</option>
                <option value="1">Available</option>
                <option value="0">Not Available</option>
              </select>
            </div>
          </div>
          <div className='col'>
            <div className='mb-3'>
              <label htmlFor=''>Price</label>
              <input
                onChange={(e) => setPrice(e.target.value)}
                type='number'
                className='form-control'
              />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
          <div className='mb-3'>
              <label htmlFor=''>City</label>
              <select
                onChange={(e) => setCity(e.target.value)}
                className='form-control'
              >
                {hotels.map((hotel) => {
                  return <option value={hotel['city']}>{hotel['city']}</option>
                })}
              </select>
              </div>
            </div>
          </div>
        <div className='row'>
          <div className='col'>
            <div className='mb-3'>
              <label htmlFor=''>Description</label>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                rows='3'
                className='form-control'
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="">Image</label>
              <input
                onChange={(e) => {
                  // get the first image selected by user
                  setImage(e.target.files[0]);
                }}
                type="file"
                className="form-control"
                accept="image/*"
              />
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col'>
            <button onClick={onSave} className='btn btn-success'>
              Save
            </button>
            <button onClick={onCancel} className='btn btn-danger ms-3'>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddRoom
