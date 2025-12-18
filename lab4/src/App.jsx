import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./theme/ThemeProvider";
import RootLayout from "./layouts/RootLayout";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <RootLayout>
          <AppRoutes />
        </RootLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
} 
