import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { addDoc, updateDoc, doc } from "firebase/firestore";
import {
  TextField,
  Button,
  Container,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { toast } from "react-toastify";
import { lessonsCollection } from "../services/firestore";
import { uploadFile } from "../services/storage";

// TeacherUploadForm: For teachers to upload or update lessons/videos
const TeacherUploadForm = ({ lessonToEdit = null, onSuccess, onCancel, initialType }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState(lessonToEdit?.title || "");
  const [type, setType] = useState(lessonToEdit?.type || initialType || "lesson");
  const [file, setFile] = useState(null);
  const [date, setDate] = useState(lessonToEdit?.date || "");
  const [time, setTime] = useState(lessonToEdit?.time || "");
  const [info, setInfo] = useState(lessonToEdit?.info || "");

  const handleSubmit = async () => {
    if (!user || user.role !== "teacher") {
      toast.error("Only teachers can upload content");
      return;
    }
    if (!title) {
      toast.error("Title is required");
      return;
    }
    try {
      let fileURL = lessonToEdit?.fileURL;
      if (file) {
        fileURL = await uploadFile(file, `lessons/${file.name}`);
      }
      const lessonData = {
        title,
        type,
        fileURL,
        teacherId: user.uid,
        createdAt: new Date(),
        ...(type === 'lesson' || type === 'schedule' ? { date, time, info } : {})
      };
      if (lessonToEdit) {
        // Update existing lesson
        await updateDoc(doc(lessonsCollection, lessonToEdit.id), lessonData);
        toast.success("Content updated successfully!");
      } else {
        // Create new lesson
        await addDoc(lessonsCollection, lessonData);
        toast.success("Content uploaded successfully!");
      }
      setTitle("");
      setType("lesson");
      setFile(null);
      setDate("");
      setTime("");
      setInfo("");
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error(error.message);
      console.error("Upload error:", error);
    }
  };

  return (
    <Container maxWidth="sm" role="region" aria-label="Teacher Upload Form">
      <h2>{lessonToEdit ? "Update Content" : "Upload Content"}</h2>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
        aria-label="Content title"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Type</InputLabel>
        <Select
          value={type}
          onChange={(e) => setType(e.target.value)}
          label="Type"
          aria-label="Content type"
        >
          <MenuItem value="lesson">Upcoming Lesson</MenuItem>
          <MenuItem value="schedule">Schedule Session</MenuItem>
          <MenuItem value="video">Video</MenuItem>
        </Select>
      </FormControl>
      {(type === 'lesson' || type === 'schedule') && (
        <>
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Time"
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Additional Info"
            value={info}
            onChange={e => setInfo(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={2}
          />
        </>
      )}
      <input
        id="lesson-file"
        name="lesson-file"
        type="file"
        accept=".pdf,.mp4"
        onChange={(e) => setFile(e.target.files[0])}
        aria-label="Upload file"
      />
      <label htmlFor="lesson-file" style={{ display: 'block', marginTop: 8 }}>Choose File</label>
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={!title}
        sx={{ mt: 2 }}
        aria-label={lessonToEdit ? "Update content" : "Upload content"}
      >
        {lessonToEdit ? "Update" : "Upload"}
      </Button>
     {lessonToEdit && (
       <Button
         variant="outlined"
         color="secondary"
         onClick={onCancel}
         sx={{ mt: 2, ml: 2 }}
         aria-label="Cancel edit"
       >
         Cancel
       </Button>
     )}
    </Container>
  );
};

export default TeacherUploadForm; 