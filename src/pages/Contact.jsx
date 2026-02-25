import { useState } from "react";
import { Typography, TextField, Button, Box, Paper, Stack, Alert } from "@mui/material";

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>Contact Us</Typography>
      {submitted ? (
        <Alert severity="success">Message sent! We'll get back to you soon.</Alert>
      ) : (
        <Paper sx={{ p: 3 }} component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField label="Name" fullWidth required />
            <TextField label="Email" type="email" fullWidth required />
            <TextField label="Message" multiline rows={4} fullWidth required />
            <Button type="submit" variant="contained" size="large">Send Message</Button>
          </Stack>
        </Paper>
      )}
    </Box>
  );
}

export default Contact;