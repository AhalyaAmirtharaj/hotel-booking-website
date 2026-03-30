import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllHotels, searchHotels } from '../services/api';
export default function HotelList() {
const [hotels, setHotels] = useState([]);
const [search, setSearch] = useState('');
const [loading, setLoading] = useState(true);
const navigate = useNavigate();

useEffect(() => {
getAllHotels()
.then(res => { setHotels(res.data); setLoading(false); })
.catch(() => setLoading(false));
}, []);

const handleSearch = async () => {
if (!search.trim()) {
const res = await getAllHotels();
setHotels(res.data);
} else {
const res = await searchHotels(search);
setHotels(res.data);
}
};
if (loading) return (
<div className='text-center mt-5'>
<div className='spinner-border text-primary'></div>
<p>Loading hotels...</p>
</div>
);
return (
<div className='container mt-4'>
<h2 className='text-primary mb-4'>Available Hotels</h2>
<div className='input-group mb-4' style={{maxWidth: '400px'}}>
<input className='form-control' placeholder='Search by location...'
value={search} onChange={e => setSearch(e.target.value)} />
<button className='btn btn-primary' onClick={handleSearch}>Search</button>
</div>
{hotels.length === 0 && <p className='text-muted'>No hotels found!</p>}
<div className='row'>
{hotels.map(hotel => (
<div key={hotel.id} className='col-md-4 mb-4'>
<div className='card h-100 shadow-sm'>
<div className='card-body'>
<h5 className='card-title text-primary'>{hotel.name}</h5>
<p className='text-muted'>{hotel.location}</p>
<p className='card-text'>{hotel.description}</p>
<p>Rating: {hotel.rating} stars</p>
<p className='text-muted small'>{hotel.amenities}</p>
</div>
<div className='card-footer'>
<button className='btn btn-primary w-100'
onClick={() => navigate('/rooms/' + hotel.id)}>
View Rooms
</button>
</div>
</div>
</div>
))}
</div>
</div>
);
}
