import React from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import AddRoom from "./components/room/AddRoom"
import ExistingRooms from "./components/room/ExistingRooms"
import Home from "./components/home/Home"
import EditRoom from "./components/room/EditRoom"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"


function App() {
  return( <>
  	<main>
				<Router>
					
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/edit-room/:roomId" element={<EditRoom />} />
						<Route path="/existing-rooms" element={<ExistingRooms />} />
            <Route path="/add-room" element={<AddRoom />} />

				</Routes>
      </Router>
    </main>
  </>
  ) 
}

export default App
