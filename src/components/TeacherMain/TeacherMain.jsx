import Header from "../Header/Header";

export default function TeacherMain({ setIsLoggedIn }) {
  return (
    <div className="teacher-main">
      <Header setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
}
