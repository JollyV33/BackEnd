import { useState, useEffect } from "react";
import {
  Box, Typography, TextField, Button, Stack, List, ListItem,
  ListItemText, ListItemIcon, IconButton, Checkbox, Paper,
  CircularProgress, Alert, Snackbar, Chip, Divider, Container,
  Card, CardContent, Fade
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { getTasks, createTask, updateTask, deleteTask } from "../services/api";

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => { loadTasks(); }, []);

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) { console.error(err); } 
    finally { setLoading(false); }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    try {
      const task = await createTask(newTitle);
      setTasks([task, ...tasks]);
      setNewTitle("");
      setSnackbar({ open: true, message: 'Task created!', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to create task', severity: 'error' });
    }
  };

  const handleToggle = async (task) => {
    try {
      const updated = await updateTask(task._id, { completed: !task.completed });
      setTasks(tasks.map(t => t._id === task._id ? updated : t));
    } catch (err) {
      setSnackbar({ open: true, message: 'Update failed', severity: 'error' });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(t => t._id !== id));
      setSnackbar({ open: true, message: 'Task deleted', severity: 'info' });
    } catch (err) {
      setSnackbar({ open: true, message: 'Delete failed', severity: 'error' });
    }
  };

  if (loading) return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
      <CircularProgress thickness={5} size={60} />
    </Box>
  );

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 4 }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" fontWeight="800" gutterBottom sx={{ color: 'primary.main' }}>
            My Daily Tasks
          </Typography>
          <Typography variant="body1" color="text.secondary">Stay organized and productive.</Typography>
        </Box>

        <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider', mb: 4 }}>
          <CardContent component="form" onSubmit={handleAdd}>
            <Stack direction="row" spacing={1}>
              <TextField
                fullWidth placeholder="Add a new task..."
                value={newTitle} onChange={(e) => setNewTitle(e.target.value)}
                variant="standard" InputProps={{ disableUnderline: true, sx: { fontSize: '1.1rem', px: 1 } }}
              />
              <Button type="submit" variant="contained" disabled={!newTitle.trim()} sx={{ borderRadius: 3 }} startIcon={<AddCircleIcon />}>
                Add
              </Button>
            </Stack>
          </CardContent>
        </Card>

        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip icon={<TaskAltIcon />} label={`${tasks.length} Total`} variant="outlined" />
          <Chip label={`${tasks.filter(t => t.completed).length} Done`} color="success" size="small" />
        </Stack>

        <Paper elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
          <List sx={{ p: 0 }}>
            {tasks.map((task, index) => (
              <Fade in={true} key={task._id}>
                <Box>
                  {index !== 0 && <Divider />}
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end" onClick={() => handleDelete(task._id)} sx={{ '&:hover': { color: 'error.main' } }}>
                        <DeleteOutlineIcon />
                      </IconButton>
                    }
                  >
                    <ListItemIcon>
                      <Checkbox
                        checked={task.completed} onChange={() => handleToggle(task)}
                        icon={<Box sx={{ width: 22, height: 22, border: '2px solid', borderColor: 'divider', borderRadius: '50%' }} />}
                        checkedIcon={<TaskAltIcon sx={{ fontSize: 26 }} />} color="success"
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={task.title}
                      primaryTypographyProps={{ sx: { textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? 'text.disabled' : 'text.primary' } }}
                    />
                  </ListItem>
                </Box>
              </Fade>
            ))}
          </List>
        </Paper>
      </Box>
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity} variant="filled">{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
}
export default TasksPage;