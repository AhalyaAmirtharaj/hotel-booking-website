import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRooms } from '../services/api';
export default function RoomList() {
const { hotelId } = useParams(); 
const [rooms, setRooms] = useState([]);
const [loading, setLoading] = useState(true);
const navigate = useNavigate();
useEffect(() => {
getRooms(hotelId)
.then(res => { setRooms(res.data); setLoading(false); })
.catch(() => setLoading(false));
}, []);
if (loading) return (
<div className='text-center mt-5'>
<div className='spinner-border text-primary'></div>
</div>
);
return (
<div className='container mt-4'>
<h2 className='text-primary mb-4'>Available Rooms</h2>
{rooms.length === 0 && (
<div className='alert alert-warning'>No rooms available!</div>
)}
<div className='row'>
{rooms.map(room => (
<div key={room.id} className='col-md-4 mb-4'>
<div className='card h-100 shadow-sm'>
<div className='card-body'>
<h5 className='card-title text-primary'>{room.roomType}</h5>
<p className='fs-5 fw-bold text-success'>Rs.{room.price}/night</p>
<p className='text-muted small'>{room.amenities}</p>
<span className='badge bg-success'>Available</span>
</div>
<div className='card-footer'>
<button className='btn btn-success w-100'
onClick={() => navigate('/book/' + room.id + '/' + room.price)}>
Book Now
</button>
</div>
</div>
</div>
))}
</div>
</div>
);
}
