import "../css/profile/getProfile.css";
import NavBarProfile from "../components/profilecomponents/NavBarProfile";
import BooksUserProfile from "../components/profilecomponents/BooksUserProfile";

const MyProfile = () => {
  return (
    <div className="container-all-myprofile">
      <div className="container-header-profile">
        <NavBarProfile />
      </div>

      <div className="cards-profile-container">
        <BooksUserProfile />
      </div>
    </div>
  );
};

export default MyProfile;
