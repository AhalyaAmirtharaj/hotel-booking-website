import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/api';
export default function Login() {
const navigate = useNavigate();
const [form, setForm] = useState({ email: '', password: '' });
const [error, setError] = useState('');
const [loading, setLoading] = useState(false);
const handleChange = (e) => {
setForm({ ...form, [e.target.name]: e.target.value });
};
const handleSubmit = async (e) => {
e.preventDefault();
setLoading(true); setError('');
try {
const res = await loginUser(form);
localStorage.setItem('token', res.data.token);
localStorage.setItem('userId', res.data.userId);
localStorage.setItem('userName', res.data.name);
localStorage.setItem('userRole', res.data.role);
navigate('/hotels');
} catch (err) {
setError(err.response?.data?.message || 'Login failed!');
} finally { setLoading(false); }
};
return (
<div className='container mt-5'>
<div className='row justify-content-center'>
<div className='col-md-5'>
<div className='card shadow p-4'>
<h3 className='text-center text-primary mb-4'>StayEase Login</h3>
{error && <div className='alert alert-danger'>{error}</div>}
<form onSubmit={handleSubmit}>
<div className='mb-3'>
<label className='form-label'>Email</label>
<input name='email' type='email' className='form-control'
placeholder='Enter email'
value={form.email} onChange={handleChange} required />
</div>
<div className='mb-3'>
<label className='form-label'>Password</label>
<input name='password' type='password' className='form-control'
placeholder='Enter password'
value={form.password} onChange={handleChange} required />
</div>
<button type='submit' className='btn btn-primary w-100'
disabled={loading}>
{loading ? 'Logging in...' : 'Login'}
</button>
</form>
<p className='text-center mt-3'>
No account? <Link to='/register'>Register here</Link>
</p>
</div>
</div>
</div>
</div>
);
}