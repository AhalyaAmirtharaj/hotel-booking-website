import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/api';
export default function Register() {
const navigate = useNavigate();
const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
const [error, setError] = useState('');
const [loading, setLoading] = useState(false);
const handleChange = (e) => {
setForm({ ...form, [e.target.name]: e.target.value });
};
const handleSubmit = async (e) => {
e.preventDefault(); 
setLoading(true);
setError('');
try {
const res = await registerUser(form);
// save JWT token and user info in browser
localStorage.setItem('token', res.data.token);
localStorage.setItem('userId', res.data.userId);
localStorage.setItem('userName', res.data.name);
localStorage.setItem('userRole', res.data.role);
alert('Welcome ' + res.data.name + '! Account created!');
navigate('/hotels');
} catch (err) {
setError(err.response?.data?.message || 'Registration failed!');
} finally {
setLoading(false);
}
};
return (
<div className='container mt-5'>
<div className='row justify-content-center'>
<div className='col-md-5'>
<div className='card shadow p-4'>
<h3 className='text-center text-primary mb-4'>Create Account</h3>
{error && <div className='alert alert-danger'>{error}</div>}
<form onSubmit={handleSubmit}>
<div className='mb-3'>
<label className='form-label'>Full Name</label>
<input name='name' className='form-control'
placeholder='Enter your name'
value={form.name} onChange={handleChange} required />
</div>
<div className='mb-3'>
<label className='form-label'>Email</label>
<input name='email' type='email' className='form-control'
placeholder='Enter email'
value={form.email} onChange={handleChange} required />
</div>
<div className='mb-3'>
<label className='form-label'>Password</label>
<input name='password' type='password' className='form-control'
placeholder='Min 6 characters'
value={form.password} onChange={handleChange} required />
</div>
<div className='mb-3'>
<label className='form-label'>Phone Number</label>
<input name='phone' className='form-control'
placeholder='10 digit number'
value={form.phone} onChange={handleChange} required />
</div>
<button type='submit' className='btn btn-primary w-100'
disabled={loading}>
{loading ? 'Creating...' : 'Register'}
</button>
</form>
<p className='text-center mt-3'>
Already have account? <Link to='/login'>Login here</Link>
</p>
</div>
</div>
</div>
</div>
);
}