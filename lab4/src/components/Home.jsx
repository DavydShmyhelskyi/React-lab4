import { Box, Container, Typography, Grid, Avatar, Button, Paper } from "@mui/material";
import { useCallback } from "react";
import myPhoto from "./img/myPhoto.jpg";

export default function Home() {
  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <Box>
      <Box
        sx={{
          height: 300,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
<Typography
  variant="h3"
  sx={{
    color: "text.primary",
    textShadow: (theme) =>
      theme.palette.mode === "dark"
        ? "0 2px 12px rgba(0,0,0,0.8)"
        : "0 2px 12px rgba(0,0,0,0.4)",
  }}
>
  Portfolio
</Typography>

      </Box>

      <Container sx={{ py: 4 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Hello 👋 I'm
            </Typography>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Shmyhelskyi David
            </Typography>
            <Typography variant="subtitle1">.NET developer • IT specialist</Typography>
            <Box sx={{ mt: 2 }}>
              <Button variant="contained" sx={{ mr: 1 }} onClick={() => scrollToSection("Hard Skills")}>Hard Skills</Button>
              <Button variant="contained" sx={{ mr: 1 }} onClick={() => scrollToSection("Soft Skills")}>Soft Skills</Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Avatar
            alt="My Photo"
            src={myPhoto}
            sx={{ width: 160, height: 160, mx: "auto" }}
            />

          </Grid>
        </Grid>

        <Box id="About-Me" sx={{ mt: 6 }}>
          <Paper sx={{ p: 3 }} elevation={1}>
            <Typography variant="h6">About me</Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              I'm studying Computer Science at the National University of Ostroh Academy. I work with C#, ASP.NET, Entity Framework and enjoy building full-featured applications.
            </Typography>
          </Paper>
        </Box>

        <Box id="Portfolio" sx={{ mt: 4 }}>
          <Typography variant="h6">Portfolio</Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">Check my GitHub: <a href="https://github.com/DavydShmyhelskyi" target="_blank" rel="noreferrer">https://github.com/DavydShmyhelskyi</a></Typography>
          </Box>
        </Box>

        <Box id="Hard Skills" sx={{ mt: 4 }}>
  <Typography variant="h6">Hard Skills</Typography>

  <Typography variant="subtitle2" sx={{ mt: 2 }}>
    Backend
  </Typography>
  <Typography variant="body2" sx={{ mt: 0.5 }}>
    C# / .NET, ASP.NET Core, Entity Framework Core, REST API, SQL (PostgreSQL).
    Experience building RESTful APIs, working with relational databases,
    designing application architecture, and handling data access using EF Core.
    APIs tested and validated with Postman.
  </Typography>

  <Typography variant="subtitle2" sx={{ mt: 2 }}>
    Frontend
  </Typography>
  <Typography variant="body2" sx={{ mt: 0.5 }}>
    <strong>React:</strong> building UI components, managing state, and integrating
    frontend applications with backend APIs.
    <br />
    <strong>Blazor:</strong> developing interactive web interfaces using C#,
    enabling seamless frontend-backend integration within the .NET ecosystem.
  </Typography>

  <Typography variant="subtitle2" sx={{ mt: 2 }}>
    AI & Productivity
  </Typography>
  <Typography variant="body2" sx={{ mt: 0.5 }}>
    Practical use of AI tools and agents for debugging, code analysis,
    refactoring, API design, and faster problem-solving during development.
  </Typography>
</Box>

<Box id="Languages" sx={{ mt: 4 }}>
  <Typography variant="h6">Languages</Typography>
  <Typography variant="body2" sx={{ mt: 1 }}>
    Ukrainian — Native<br />
    English — Upper-Intermediate<br />
    Polish — Elementary 
  </Typography>
</Box>

<Box id="Resume" sx={{ mt: 4 }}>
  <Button
    variant="contained"
    component="a"
    href="https://drive.google.com/file/d/1JeRMymfvO30xPKnvrfzC3t29kAfSKG9G/view?usp=drive_link"
    target="_blank"
    rel="noreferrer"
  >
    View CV (PDF)
  </Button>
</Box>

<Box id="Soft Skills" sx={{ mt: 4 }}>
  <Typography variant="h6">Soft Skills</Typography>
  <Typography variant="body2" sx={{ mt: 1 }}>
    Attention to detail, strong problem-solving skills, clear communication,
    teamwork mindset, diligence, and ability to learn new technologies quickly.
  </Typography>
</Box>


        <Box component="footer" sx={{ mt: 6, py: 3, textAlign: "center", bgcolor: "background.paper" }}>
          <Typography variant="body2">© 2024 All rights reserved</Typography>
        </Box>
      </Container>
    </Box>
  );
}

