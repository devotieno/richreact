import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getLessons } from "../services/firestore";
import { doc, updateDoc, arrayUnion, increment } from "firebase/firestore";
import { db, auth } from "../firebase";
import { Container, Card, CardContent, Typography, Button, Tabs, Tab, Box } from "@mui/material";
import { toast } from "react-toastify";
import TeacherUploadForm from "./TeacherUploadForm";
import './Tutor.css';

const Tutor = () => {
  // State for Firestore lessons
  const { user } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [tab, setTab] = useState("lesson");
  const [editingLesson, setEditingLesson] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadType, setUploadType] = useState("lesson"); // "lesson", "schedule", "video"

  const fetchLessons = async () => {
    setLoading(true);
    try {
      const data = await getLessons();
      setLessons(data);
      console.log("Fetched lessons:", data);
    } catch (error) {
      toast.error(error.message);
      console.error("Error fetching lessons:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
    // eslint-disable-next-line
  }, []);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleDownload = async (lessonId, fileURL) => {
    if (!user) {
      toast.error("Please log in to download");
      return;
    }
    try {
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        downloads: arrayUnion({ resourceId: lessonId, timestamp: new Date() }),
        "resourceUsage.totalDownloads": increment(1),
      });
      window.open(fileURL, "_blank");
      toast.success("Content downloaded!");
    } catch (error) {
      toast.error(error.message);
      console.error("Download tracking error:", error);
    }
  };

  const filteredLessons = lessons.filter((lesson) => lesson.type === tab || (tab === "lesson" && lesson.type === "schedule"));

  // Dashboard action handlers
  const handleShowForm = (type) => {
    setUploadType(type);
    setShowUploadForm(true);
    setEditingLesson(null);
  };
  const handleCloseForm = () => {
    setShowUploadForm(false);
    setEditingLesson(null);
  };

  return (
    <div className="tutor-page">
      <div className="container-tutor">
        <div className="text-section">
          <span className="badge">Professional Chemistry Tutorials</span>
          <h1>
            Master Chemistry With <br />
            <span className="highlight">Dr. Joseph Akasa</span>
          </h1>
          <p>
            With over 30 years of experience mastering all major chemistry curriculums, I bring a wealth of expertise to every lesson, ensuring students receive guidance that is both comprehensive and deeply informed. My specialization in private tutoring allows me to deliver a unique, individualized approach—tailoring each session to the specific learning needs and goals of my students. This personalized method not only simplifies complex concepts but also empowers learners at every level, from high school to university, to achieve their full potential in chemistry
          </p>
          <div className="buttons">
            <button className="primary-btn">Book a Session →</button>
            <button className="secondary-btn">View Pricing</button>
          </div>
          <div className="features-row">
            <div className="feature">
              <span className="icon" role="img" aria-label="microscope">🔬</span>
              <div>
                <strong>Qualified Expert</strong><br />
                Certified professional in Chemistry with 30+ years experience
              </div>
            </div>
            <div className="feature">
              <span className="icon" role="img" aria-label="book">📘</span>
              <div>
                <strong>Custom Curriculum</strong><br />
                Tailored to your learning needs
              </div>
            </div>
          </div>
        </div>
        <div className="image-section">
          <img src="/img/profile.jpg" alt="Tutoring session" />
          <div className="session-info">Inspiring Success One Reaction at a Time</div>
        </div>
      </div>

      {/* Teacher dashboard actions */}
      {user?.role === "teacher" && (
        <div className="dashboard-actions" style={{ margin: '32px 0 16px 0', display: 'flex', gap: 12 }}>
          <Button variant="contained" onClick={() => handleShowForm("lesson")}>Add Lesson</Button>
          <Button variant="contained" onClick={() => handleShowForm("schedule")}>Schedule Lesson</Button>
          <Button variant="contained" onClick={() => handleShowForm("video")}>Add Video</Button>
        </div>
      )}

      {/* Dynamic Lessons/Videos Section */}
      <Container role="region" aria-label="Lessons and Videos Section" sx={{ mt: 4 }}>
        {user?.role === "teacher" && showUploadForm && (
          <div style={{ marginBottom: 32 }}>
            <TeacherUploadForm
              lessonToEdit={editingLesson}
              onSuccess={() => {
                fetchLessons();
                handleCloseForm();
              }}
              onCancel={handleCloseForm}
              initialType={uploadType}
              key={editingLesson?.id || uploadType || "new"}
            />
          </div>
        )}
        <Tabs value={tab} onChange={handleTabChange} aria-label="Lesson type tabs">
          <Tab label="Upcoming Lessons" value="lesson" aria-label="View upcoming lessons" />
          <Tab label="Videos" value="video" aria-label="View videos" />
        </Tabs>
        <h3>{tab === "lesson" ? "Upcoming Lessons" : "Videos"}</h3>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : filteredLessons.length === 0 ? (
          <Typography>No {tab}s available</Typography>
        ) : null}
        <Box display="flex" flexWrap="wrap" gap={2}>
          {filteredLessons.map((lesson) => (
            <Card key={lesson.id} sx={{ minWidth: 275, flex: '1 1 300px', mt: 2 }} role="article" aria-label={`Lesson: ${lesson.title}`}>
              <CardContent>
                <Typography variant="h6">{lesson.title}</Typography>
                <Typography color="textSecondary">Type: {lesson.type}</Typography>
                {lesson.fileURL && (
                  <Button
                    variant="contained"
                    onClick={() => handleDownload(lesson.id, lesson.fileURL)}
                    sx={{ mt: 1, backgroundColor: '#022f57' }}
                    aria-label={`Download ${lesson.title}`}
                  >
                    Download
                  </Button>
                )}
                {user?.role === "teacher" && (
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setEditingLesson(lesson);
                      setShowUploadForm(true);
                      setUploadType(lesson.type);
                    }}
                    sx={{ mt: 1, ml: 1 }}
                    aria-label={`Edit ${lesson.title}`}
                  >
                    Edit
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </div>
  );
};

export default Tutor; 