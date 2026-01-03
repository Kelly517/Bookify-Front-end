import React from 'react'
import '../css/profile/getProfile.css';
import NavBarVisitProfile from '../components/profilecomponents/visituserprofile/NavBarVisitProfile';
import BookUserVisitProfile from '../components/profilecomponents/visituserprofile/BookUserVisitProfile';


const UserProfile = () => {
  return (
    <div className='container-all-myprofile'>
      <div className="container-header-profile">
      <NavBarVisitProfile /> 
      </div>
      <div className="cards-profile-container">
        <BookUserVisitProfile />
      </div>
      
    </div>
  )
}

export default UserProfile
