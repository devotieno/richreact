import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, updateDoc, doc, increment, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { toast } from 'react-toastify';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Chip,
  MenuItem
} from '@mui/material';
import { 
  Add as AddIcon,
  QuestionAnswer as QuestionIcon,
  ThumbUp as ThumbUpIcon,
  Reply as ReplyIcon,
  Person as PersonIcon
} from '@mui/icons-material';

const Community = () => {
  const { currentUser, userRole, updateUserData } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    title: '',
    content: '',
    category: 'Organic chemistry'
  });

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const q = query(collection(db, 'questions'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const questionsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQuestions(questionsList);
    } catch (error) {
      console.error('Error fetching questions:', error);
      toast.error('Failed to load questions');
    }
  };

  const handleAskQuestion = async () => {
    if (!newQuestion.title || !newQuestion.content) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      
      const questionData = {
        ...newQuestion,
        authorId: currentUser.uid,
        authorName: currentUser.displayName || currentUser.email,
        authorRole: userRole,
        createdAt: serverTimestamp(),
        likes: 0,
        answers: [],
        isResolved: false
      };

      await addDoc(collection(db, 'questions'), questionData);
      
      // Update user's question count
      await updateUserData(currentUser.uid, {
        questionsAsked: increment(1)
      });
      
      toast.success('Question posted successfully!');
      setOpenDialog(false);
      setNewQuestion({
        title: '',
        content: '',
        category: 'Organic chemistry'
      });
      
      // Refresh questions list
      fetchQuestions();
    } catch (error) {
      console.error('Error posting question:', error);
      toast.error('Failed to post question');
    } finally {
      setLoading(false);
    }
  };

  const handleLikeQuestion = async (questionId, currentLikes) => {
    try {
      await updateDoc(doc(db, 'questions', questionId), {
        likes: currentLikes + 1
      });
      
      toast.success('Question liked!');
      fetchQuestions(); // Refresh to show updated likes
    } catch (error) {
      console.error('Error liking question:', error);
      toast.error('Failed to like question');
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Unknown time';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Community Questions
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Ask Question
        </Button>
      </Box>

      {questions.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <QuestionIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No questions yet.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Be the first to ask a question and start a discussion!
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
          >
            Ask First Question
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {questions.map((question) => (
            <Grid item xs={12} key={question.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ width: 32, height: 32 }}>
                        <PersonIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2">
                          {question.authorName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {question.authorRole === 'teacher' ? 'Teacher' : 'Student'}
                        </Typography>
                      </Box>
                    </Box>
                    <Chip 
                      label={question.category} 
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </Box>
                  
                  <Typography variant="h6" gutterBottom>
                    {question.title}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {question.content}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                      {formatTimestamp(question.createdAt)}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        {question.answers?.length || 0} answers
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {question.likes || 0} likes
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
                
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<ThumbUpIcon />}
                    onClick={() => handleLikeQuestion(question.id, question.likes || 0)}
                  >
                    Like
                  </Button>
                  <Button
                    size="small"
                    startIcon={<ReplyIcon />}
                  >
                    Answer
                  </Button>
                  {question.isResolved && (
                    <Chip 
                      label="Resolved" 
                      size="small"
                      color="success"
                    />
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Ask Question Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Ask a Question</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Question Title"
            value={newQuestion.title}
            onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
            margin="normal"
            required
            placeholder="What's your question about?"
          />
          
          <TextField
            fullWidth
            label="Question Details"
            value={newQuestion.content}
            onChange={(e) => setNewQuestion({ ...newQuestion, content: e.target.value })}
            margin="normal"
            multiline
            rows={6}
            required
            placeholder="Provide more details about your question..."
          />
          
          <TextField
            fullWidth
            label="Category"
            value={newQuestion.category}
            onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value })}
            margin="normal"
            select
            required
          >
            <MenuItem value="Organic chemistry">Organic chemistry</MenuItem>
            <MenuItem value="Inorganic chemistry">Inorganic chemistry</MenuItem>
            <MenuItem value="Physical chemistry">Physical chemistry</MenuItem>
            <MenuItem value="Biochemistry">Biochemistry</MenuItem>
            <MenuItem value="Analytical chemistry">Analytical chemistry</MenuItem>
            <MenuItem value="AP chemistry">AP chemistry</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleAskQuestion} 
            variant="contained"
            disabled={loading}
          >
            {loading ? 'Posting...' : 'Post Question'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Community; 