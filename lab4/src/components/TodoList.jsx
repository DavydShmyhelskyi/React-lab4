import TodoItem from "./TodoItem";
import React, { memo } from "react";
import { Box, TextField, List, Typography, Button, ButtonGroup, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const TodoList = memo(function TodoList({
  isLoading,
  error,
  todoIds,
  getTodoById,
  onDelete,
  onToggle,
  onSave,
  searchTerm,
  setSearchTerm,
  currentPage,
  goToNextPage,
  goToPrevPage,
  totalTodos,
  limitPerPage,
  setLimitPerPage,
}) {
  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      <TextField
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search todos..."
        fullWidth
        sx={{ mb: 2 }}
      />

      {todoIds.length === 0 && <Typography>No todos found.</Typography>}

      <List>
        {todoIds.map((id) => {
          const todo = getTodoById(id);
          if (!todo) return null;
          return (
            <TodoItem key={id} todo={todo} onToggle={onToggle} onDelete={onDelete} onSave={onSave} />
          );
        })}
      </List>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
        <ButtonGroup variant="outlined">
          <Button onClick={goToPrevPage} disabled={currentPage === 1}>Previous</Button>
          <Button onClick={goToNextPage} disabled={currentPage * limitPerPage >= totalTodos}>Next</Button>
        </ButtonGroup>

        <Typography>Page {currentPage} | Total: {totalTodos}</Typography>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="items-per-page-label">Items</InputLabel>
          <Select
            labelId="items-per-page-label"
            value={limitPerPage}
            label="Items"
            onChange={(e) => setLimitPerPage(Number(e.target.value))}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
});

export default TodoList;
