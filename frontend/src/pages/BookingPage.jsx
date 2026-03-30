import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bookRoom } from '../services/api';
export default function BookingPage() {
const { roomId, price } = useParams(); 
const navigate = useNavigate();
const [form, setForm] = useState({ checkIn: '', checkOut: '' });
const [errors, setErrors] = useState({});
const [loading, setLoading] = useState(false);
const handleChange = (e) => {
setForm({ ...form, [e.target.name]: e.target.value });
};
const validate = () => {
const errs = {};
if (!form.checkIn) errs.checkIn = 'Check-in date required';
if (!form.checkOut) errs.checkOut = 'Check-out date required';
if (form.checkIn && form.checkOut && form.checkOut <= form.checkIn) {
errs.checkOut = 'Check-out must be after check-in!';
}
return errs;
};
const calculateTotal = () => {
if (!form.checkIn || !form.checkOut) return 0;
const days = Math.ceil(
(new Date(form.checkOut) - new Date(form.checkIn)) / (1000*60*60*24)
);
return days > 0 ? days * price : 0;
};
const handleSubmit = async (e) => {
e.preventDefault();
const errs = validate();
if (Object.keys(errs).length > 0) { setErrors(errs); return; }
const userId = localStorage.getItem('userId');
if (!userId) { alert('Please login first!'); navigate('/login'); return; }
setLoading(true);
try {
const res = await bookRoom({ userId, roomId, checkIn: form.checkIn, checkOut: form.checkOut });
alert('Booking confirmed! Booking ID: ' + res.data.id);
navigate('/my-bookings');
} catch (err) {
if (err.response?.status === 403) {
alert('Session expired! Please login again.');
localStorage.clear();
navigate('/login');
} else {
alert(err.response?.data?.message || 'Booking failed!');
}
} finally { setLoading(false); }
};
return (
<div className='container mt-4'>
<div className='row justify-content-center'>
<div className='col-md-6'>
<div className='card shadow p-4'>
<h3 className='text-primary mb-4'>Book Your Room</h3>
<form onSubmit={handleSubmit}>
<div className='mb-3'>
<label className='form-label fw-bold'>Check-in Date</label>
<input type='date' name='checkIn' className='form-control'
value={form.checkIn} onChange={handleChange}
min={new Date().toISOString().split('T')[0]} />
{errors.checkIn && <small className='text-danger'>{errors.checkIn}</small>}
</div>
<div className='mb-3'>
<label className='form-label fw-bold'>Check-out Date</label>
<input type='date' name='checkOut' className='form-control'
value={form.checkOut} onChange={handleChange}
min={form.checkIn} />
{errors.checkOut && <small className='text-danger'>{errors.checkOut}</small>}
</div>
{calculateTotal() > 0 && (
<div className='alert alert-info'>
<strong>Estimated Total: Rs.{calculateTotal()}</strong>
</div>
)}
<button type='submit' className='btn btn-success w-100'
disabled={loading}>
{loading ? 'Booking...' : 'Confirm Booking'}
</button>
</form>
</div>
</div>
</div>
</div>
);
}