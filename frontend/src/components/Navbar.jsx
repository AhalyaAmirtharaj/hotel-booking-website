import { Link, useNavigate } from 'react-router-dom';
export default function Navbar() {
const navigate = useNavigate();
const userName = localStorage.getItem('userName');
const handleLogout = () => {
localStorage.clear();
navigate('/login');
};
return (
<nav className='navbar navbar-expand-lg navbar-dark bg-primary px-4'>
<Link className='navbar-brand fw-bold' to='/hotels'>
StayEase
</Link>
<div className='ms-auto d-flex align-items-center gap-2'>
<Link className='btn btn-outline-light btn-sm' to='/hotels'>
Hotels
</Link>
{userName ? (
<>
<span className='badge bg-warning text-dark'>
Hi, {userName}!
</span>
<Link className='btn btn-outline-light btn-sm' to='/my-bookings'>
My Bookings
</Link>
<button className='btn btn-danger btn-sm' onClick={handleLogout}>
Logout
</button>
</>
) : (
<>
<Link className='btn btn-outline-light btn-sm' to='/login'>Login</Link>
<Link className='btn btn-warning btn-sm' to='/register'>Register</Link>
</>
)}
</div>
</nav>
);
}