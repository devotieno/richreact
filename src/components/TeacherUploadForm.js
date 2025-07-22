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
import { uploadFile } from "../services/storage-alternative";

// TeacherUploadForm: For teachers to upload or update lessons/videos
const TeacherUploadForm = ({ lessonToEdit = null, onSuccess, onCancel, initialType }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState(lessonToEdit?.title || "");
  const [type, setType] = useState(lessonToEdit?.type || initialType || "lesson");
  const [file, setFile] = useState(null);
  const [date, setDate] = useState(lessonToEdit?.date || "");
  const [time, setTime] = useState(lessonToEdit?.time || "");
  const [externalUrl, setExternalUrl] = useState("");
  const [uploadMethod, setUploadMethod] = useState("external"); // 'external' or 'file'
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
      
      if (uploadMethod === 'external' && externalUrl) {
        // Use external URL
        fileURL = externalUrl;
      } else if (uploadMethod === 'file' && file) {
        // Upload file using alternative storage
        const result = await uploadFile(file, { category: 'lessons' });
        fileURL = result.downloadURL;
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
      setExternalUrl("");
      setUploadMethod("external");
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
      
      {/* Upload Method Selection */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Upload Method</InputLabel>
        <Select
          value={uploadMethod}
          onChange={(e) => setUploadMethod(e.target.value)}
          label="Upload Method"
        >
          <MenuItem value="external">External Link (Recommended)</MenuItem>
          <MenuItem value="file">Upload File</MenuItem>
        </Select>
      </FormControl>

      {/* External URL Input */}
      {uploadMethod === 'external' && (
        <TextField
          label="File URL (Google Drive, GitHub, etc.)"
          value={externalUrl}
          onChange={(e) => setExternalUrl(e.target.value)}
          fullWidth
          margin="normal"
          placeholder="https://drive.google.com/... or https://github.com/..."
          helperText="Upload your file to Google Drive or GitHub and paste the direct link here"
        />
      )}

      {/* File Upload Input */}
      {uploadMethod === 'file' && (
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ margin: '16px 0', width: '100%' }}
          accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.avi,.mov"
        />
      )}

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