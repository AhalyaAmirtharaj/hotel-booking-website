import { useNavigate } from 'react-router-dom';
export default function Home() {
const navigate = useNavigate();
const userName = localStorage.getItem('userName');
return (
<div className='container text-center mt-5'>
<h1 className='display-4 text-primary fw-bold'>StayEase Hotel Booking</h1>
<p className='lead text-muted mt-3'>Find and book your perfect hotel room!</p>
{userName && (
<p className='text-success fw-bold'>Hello, {userName}!</p>
)}
<button className='btn btn-primary btn-lg mt-4'
onClick={() => navigate('/hotels')}>
Browse Hotels
</button>
</div>
);
}
