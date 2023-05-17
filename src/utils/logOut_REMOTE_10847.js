import axios from "axios";
export default function logOut() {
  localStorage.setItem("accessToken", "");
  localStorage.setItem("role", "");
}

setInterval(() => {
  axios.get('https://medserver-p3wp.onrender.com/doctors');
}, 300000)

