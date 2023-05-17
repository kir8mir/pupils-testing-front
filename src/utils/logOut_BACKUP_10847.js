import axios from "axios";
export default function logOut() {
  localStorage.setItem("accessToken", "");
  localStorage.setItem("role", "");
}

setInterval(() => {
  axios.get('https://medserver-p3wp.onrender.com/doctors');
}, 300000)
<<<<<<< HEAD
=======

>>>>>>> b1caca24f57c82a592903890910990145e19fd13
