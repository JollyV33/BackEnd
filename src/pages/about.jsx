import { Typography, Box, Paper } from "@mui/material";

function About() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>About This Project</Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="body1" paragraph>
          This application demonstrates a complete decoupled architecture. The frontend 
          is a Single Page Application (SPA) while the backend is a RESTful API.
        </Typography>
        <Typography variant="h6" gutterBottom>Core Features:</Typography>
        <ul>
          <li><Typography variant="body1">Persistent storage via NeDB local files</Typography></li>
          <li><Typography variant="body1">Modern UI components from Material UI 7</Typography></li>
          <li><Typography variant="body1">Client-side routing with React Router 7</Typography></li>
          <li><Typography variant="body1">Asynchronous API handling with Fetch</Typography></li>
        </ul>
      </Paper>
    </Box>
  );
}

export default About;