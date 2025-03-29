// src/components/dashboard/menteeDashboard.jsx
import { useLocation } from "react-router-dom";
import "./dashboard.css";

function MenteeDashboard() {
  const location = useLocation();
  const user = location.state?.user;

  // Sample mentor data (in real app this will come from backend)
  const mentor = {
    name: "Mr. John Doe",
    email: "john.doe@mentorwave.com",
    expertise: "Web Development",
  };

  // Sample tasks
  const tasks = [
    { id: 1, title: "Complete React Basics", status: "Pending" },
    { id: 2, title: "Submit Portfolio Draft", status: "In Progress" },
    { id: 3, title: "Attend Q&A Session", status: "Completed" },
  ];

  // Sample upcoming sessions
  const sessions = [
    { date: "2025-04-02", topic: "Advanced React Hooks" },
    { date: "2025-04-09", topic: "Project Review" },
  ];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Mentee Dashboard</h1>

      {user ? (
        <>
          <div className="dashboard-info">
            <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>

          <h2>Assigned Mentor</h2>
          <div className="dashboard-card">
            <p><strong>Mentor:</strong> {mentor.name}</p>
            <p><strong>Email:</strong> {mentor.email}</p>
            <p><strong>Expertise:</strong> {mentor.expertise}</p>
          </div>

          <h2>Your Tasks</h2>
          <div className="dashboard-card">
            {tasks.map((task) => (
              <p key={task.id}>
                ✅ <strong>{task.title}</strong> - {task.status}
              </p>
            ))}
          </div>

          <h2>Upcoming Sessions</h2>
          <div className="dashboard-card">
            {sessions.map((session, index) => (
              <p key={index}>
                📅 {session.date} - {session.topic}
              </p>
            ))}
          </div>
        </>
      ) : (
        <p>User data not found.</p>
      )}

      <div className="dashboard-footer">MentorWave © 2025</div>
    </div>
  );
}

export default MenteeDashboard;
