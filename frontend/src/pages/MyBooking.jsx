import { useEffect, useState } from 'react';
import { getMyBookings, cancelBooking } from '../services/api';
export default function MyBookings() {
const [bookings, setBookings] = useState([]);
const [loading, setLoading] = useState(true);
const userId = localStorage.getItem('userId');
const loadBookings = () => {
if (userId) {
getMyBookings(userId)
.then(res => { setBookings(res.data); setLoading(false); })
.catch(() => setLoading(false));
}
};
useEffect(() => { loadBookings(); }, []);
const handleCancel = async (bookingId) => {
if (!window.confirm('Cancel this booking?')) return;
try {
await cancelBooking(bookingId);
alert('Booking cancelled!');
loadBookings(); 
} catch (err) {
alert(err.response?.data?.message || 'Cancel failed!');
}
};
if (loading) return (
<div className='text-center mt-5'>
<div className='spinner-border text-primary'></div>
</div>
);
return (
<div className='container mt-4'>
<h2 className='text-primary mb-4'>My Bookings</h2>
{bookings.length === 0 && (
<div className='alert alert-info'>No bookings yet! Start exploring hotels.</div>
)}
{bookings.map(b => (
<div key={b.id} className='card mb-3 shadow-sm'>
<div className='card-body'>
<div className='d-flex justify-content-between'>
<div>
<h5 className='text-primary'>{b.room.hotel.name}</h5>
<p className='mb-1'>Room: {b.room.roomType}</p>
<p className='mb-1'>Check-in: {b.checkIn} | Check-out: {b.checkOut}</p>
<p className='fw-bold text-success'>Rs.{b.totalAmount} total</p>
</div>
<div className='text-end'>
<span className={'badge ' + (b.status === 'CONFIRMED' ? 'bg-success' : 'bg-danger')}>
{b.status}
</span>
{b.status === 'CONFIRMED' && (
<div className='mt-2'>
<button className='btn btn-outline-danger btn-sm'
onClick={() => handleCancel(b.id)}>
Cancel
</button>
</div>
)}
</div>
</div>
</div>
</div>
))}
</div>
);
}