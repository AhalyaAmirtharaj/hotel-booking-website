import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import HotelList from './pages/HotelList';
import RoomList from './pages/RoomList';
import BookingPage from './pages/BookingPage';
import MyBooking from './pages/MyBooking';
export default function App() {
return (
<Router>
<Navbar /> 
<Routes>
<Route path='/' element={<Home />} />
<Route path='/home' element={<Home />} />
<Route path='/register' element={<Register />} />
<Route path='/login' element={<Login />} />
<Route path='/hotels' element={<HotelList />} />
<Route path='/rooms/:hotelId' element={<RoomList />} />
<Route path='/book/:roomId/:price' element={
<PrivateRoute><BookingPage /></PrivateRoute>
} />
<Route path='/my-bookings' element={
<PrivateRoute><MyBooking /></PrivateRoute>
} />
</Routes>
</Router>
);
}