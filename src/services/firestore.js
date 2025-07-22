// Firestore service for resources and lessons management
import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
// Removed unused imports: addDoc, Timestamp

// Collection references
export const resourcesCollection = collection(db, "resources");
export const lessonsCollection = collection(db, "lessons");

// Schemas (for reference/documentation)
export const resourcesSchema = {
  title: "string",
  type: "string", // ebook, pdf, note, paper, syllabus, exam, examinerReport
  fileURL: "string", // Firebase Storage URL
  createdAt: "timestamp",
  accessRole: "string", // both (for students and teachers)
};

export const lessonsSchema = {
  title: "string",
  type: "string", // lesson, video
  fileURL: "string", // Firebase Storage URL
  teacherId: "string",
  createdAt: "timestamp",
};



// Fetch resources by type
export const getResourcesByType = async (type) => {
  try {
    const q = query(resourcesCollection, where("type", "==", type));
    const querySnapshot = await getDocs(q);
    const resources = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log(`Fetched ${type} resources:`, resources);
    return resources;
  } catch (error) {
    console.error(`Error fetching ${type} resources:`, error);
    throw error;
  }
};

// Fetch all lessons
export const getLessons = async () => {
  try {
    const querySnapshot = await getDocs(lessonsCollection);
    const lessons = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log("Fetched lessons:", lessons);
    return lessons;
  } catch (error) {
    console.error("Error fetching lessons:", error);
    throw error;
  }
}; 