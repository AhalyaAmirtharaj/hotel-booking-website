import axios from 'axios';
const BASE = 'http://localhost:8080/api';
const authHeader = () => ({
headers: {
Authorization: 'Bearer ' + localStorage.getItem('token')
}
});
export const registerUser = (data) => axios.post(BASE + '/auth/register', data);
export const loginUser = (data) => axios.post(BASE + '/auth/login', data);
export const getAllHotels = () => axios.get(BASE + '/hotels');
export const searchHotels = (loc) => axios.get(BASE + '/hotels/search?location=' + loc);
export const getRooms = (id) => axios.get(BASE + '/rooms/' + id);
export const bookRoom = (data) => axios.post(BASE + '/bookings', data, authHeader());
export const getMyBookings = (uid) => axios.get(BASE + '/bookings/user/' + uid, authHeader());
export const cancelBooking = (id) => axios.put(BASE + '/bookings/' + id + '/cancel', {}, authHeader());