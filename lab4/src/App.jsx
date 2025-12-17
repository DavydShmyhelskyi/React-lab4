import { Routes, Route, Navigate, Link as RouterLink } from "react-router-dom";
import TodoContainer from "./components/TodoContainer";
import Home from "./components/Home";
import Lab4 from "./components/Lab4";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Box from "@mui/material/Box";
import { useTheme } from "./theme/ThemeProvider";
import "./styles/App.css";

function App() {
  const { mode, toggleTheme } = useTheme();

  return (
    <div>
      <AppBar position="fixed" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="h6" component={RouterLink} to="/" sx={{ textDecoration: "none", color: "inherit" }}>
              My Portfolio
            </Typography>
          </Box>

          <Box>
            <Button component={RouterLink} to="/" color="inherit">
              Home
            </Button>
            <Button component={RouterLink} to="/todo-list" color="inherit">
              Todo List
            </Button>
            <Button component={RouterLink} to="/lab4" color="inherit">
              Lab 4
            </Button>
            <IconButton sx={{ ml: 1 }} onClick={() => toggleTheme()} color="inherit">
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ mt: 8 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo-list" element={<TodoContainer />} />
          <Route path="/lab4" element={<Lab4 />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </div>
  );
}

export default App;
