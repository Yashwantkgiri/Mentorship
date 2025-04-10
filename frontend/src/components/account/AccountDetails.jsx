import React from "react";

const AccountDetails = ({ details = {}, avatar }) => {
  return (
    <div className="ui segment">
      <div className="ui inverted segment">
        <h1 className="ui centered header">
          Welcome to MentorWave {details?.userName || "User"}!
        </h1>
      </div>

      {/* parent container */}
      <div className="flex container custom-container" style={{ backgroundColor: "#F7F3FE" }}>
        
        {/* first column */}
        <div className="custom-column">
          <div className="image-bio">
            <img
              className="ui fluid circular image"
              id="mentee-image"
              src={avatar || "https://via.placeholder.com/150"}
              alt="Avatar"
            />
            <h2 className="ui header">About Me</h2>
            <div className="ui padded segment">
              <p className="ui text">{details?.menteeBio || "No bio provided."}</p>
            </div>
            <div className="ui fluid buttons">
              <button className="ui primary button">Browse Available Mentors</button>
              <div className="or"></div>
              <button className="ui positive button">Schedule a Meeting</button>
            </div>
          </div>
        </div>

        {/* second column */}
        <div className="custom-column">
          <div className="info">
            <h4>Username: <span className="custom-account-container">{details?.userName}</span></h4>
            <h4>Email: <span className="custom-account-container">thismentor@gmail.com</span></h4>
            <h4>Profession: <span className="custom-account-container">{details?.profession}</span></h4>
            <h4>My Mentoring Goals: <span className="custom-account-container">{details?.menteeGoal}</span></h4>
            <h4>My Mentor Preferences
              <ul className="custom-account-container">
                <li>{details?.mentorPreference}</li>
              </ul>
            </h4>
            <h4>My Meetings: <span className="custom-account-container">No Scheduled Meetings Available</span></h4>
            <h4>My Socials:</h4>
            <div className="ui segment">
              <i className="large blue twitter icon" aria-label="Twitter"></i>
              <i className="large blue facebook icon" aria-label="Facebook"></i>
              <i className="large github icon" aria-label="GitHub"></i>
            </div>
            <button className="ui fluid button"><i className="sun outline grey icon"></i>Customize Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
