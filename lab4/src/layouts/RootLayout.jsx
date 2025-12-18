import { Outlet, Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "../theme/ThemeProvider";
import AppRoutes from "../routes/AppRoutes";

export default function RootLayout() {
  const { mode, toggleTheme } = useTheme();

  return (
    <>
      <AppBar position="fixed" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            My Portfolio
          </Typography>

          <Box>
            <Button component={RouterLink} to="/">Home</Button>
            <Button component={RouterLink} to="/todo-list">Todo</Button>
            <Button component={RouterLink} to="/lab4">Lab 4</Button>
            <IconButton onClick={toggleTheme}>
              {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ mt: 8 }}>
        <Container maxWidth="md">
            <AppRoutes />
        </Container>
      </Box>
    </>
  );
}
