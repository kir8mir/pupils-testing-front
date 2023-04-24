export default function logOut() {
  localStorage.setItem("accessToken", "");
  localStorage.setItem("role", "");
}
