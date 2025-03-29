// src/components/dashboard/mentorDashboard.jsx
import { useLocation } from "react-router-dom";
import "./dashboard.css";

function MentorDashboard() {
  const location = useLocation();
  const user = location.state?.user;

  // Sample mentee data
  const mentees = [
    { name: "Aman Sharma", progress: "75%" },
    { name: "Priya Verma", progress: "60%" },
    { name: "Rahul Gupta", progress: "85%" },
  ];

  // Sample session schedule
  const schedule = [
    { date: "2025-04-05", time: "5:00 PM", mentee: "Aman Sharma" },
    { date: "2025-04-06", time: "3:00 PM", mentee: "Priya Verma" },
    { date: "2025-04-08", time: "4:30 PM", mentee: "Rahul Gupta" },
  ];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Mentor Dashboard</h1>
      {user ? (
        <>
          <div className="dashboard-info">
            <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>

          <div className="dashboard-section">
            <h2>Mentees</h2>
            <ul>
              {mentees.map((mentee, index) => (
                <li key={index}>{mentee.name} - Progress: {mentee.progress}</li>
              ))}
            </ul>
          </div>

          <div className="dashboard-section">
            <h2>Upcoming Sessions</h2>
            <ul>
              {schedule.map((session, index) => (
                <li key={index}>{session.date} at {session.time} with {session.mentee}</li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <p>User data not found.</p>
      )}
      <div className="dashboard-footer">Mentoring © 2025</div>
    </div>
  );
}

export default MentorDashboard;
