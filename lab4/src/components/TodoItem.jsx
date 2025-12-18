import React, { useState, memo, useCallback } from "react";
import { ListItem, ListItemSecondaryAction, IconButton, Checkbox, TextField, Typography, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

const TodoItem = memo(({ todo, onToggle, onDelete, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.todo);

  const handleSave = useCallback(() => {
    if (!title.trim()) return;
    onSave(todo.id, title);
    setIsEditing(false);
  }, [title, onSave, todo.id]);

  return (
    <ListItem divider>


      {isEditing ? (
        <Box sx={{ flex: 1, display: "flex", gap: 1 }}>
          <Checkbox checked={todo.completed} onChange={() => onToggle(todo.id)} />
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            autoFocus
            fullWidth
            size="small"
          />
          <IconButton onClick={handleSave} color="primary" aria-label="save">
            <SaveIcon />
          </IconButton>
          <IconButton onClick={() => setIsEditing(false)} color="inherit" aria-label="cancel">
            <CancelIcon />
          </IconButton>
        </Box>
      ) : (
        <>
          <Typography sx={{ textDecoration: todo.completed ? "line-through" : "none", flex: 1 }}>
          <Checkbox checked={todo.completed} onChange={() => onToggle(todo.id)} />
            {todo.todo}
          </Typography>
          <ListItemSecondaryAction>
            <IconButton edge="end" onClick={() => setIsEditing(true)} aria-label="edit">
              <EditIcon />
            </IconButton>
            <IconButton edge="end" onClick={() => onDelete(todo.id)} aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </>
      )}
    </ListItem>
  );
});

export default TodoItem;
