// Firebase Storage service for uploading and updating lesson/video files
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Upload file to Firebase Storage
export const uploadFile = async (file, path) => {
  try {
    const fileRef = ref(storage, path);
    await uploadBytes(fileRef, file);
    const fileURL = await getDownloadURL(fileRef);
    console.log(`File uploaded: ${fileURL}`);
    return fileURL;
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};

// Update file in Firebase Storage (overwrites existing file)
export const updateFile = async (file, path) => {
  return uploadFile(file, path);
}; 