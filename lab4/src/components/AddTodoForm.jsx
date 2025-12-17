import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

const AddTodoForm = React.memo(function AddTodoForm({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", gap: 1, mb: 2 }}>
      <TextField
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="New todo..."
        variant="outlined"
        size="small"
        fullWidth
      />
      <Button type="submit" variant="contained">
        Add
      </Button>
    </Box>
  );
});

export default AddTodoForm;
