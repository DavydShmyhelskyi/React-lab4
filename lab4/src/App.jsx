import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./theme/ThemeProvider";
import RootLayout from "./layouts/RootLayout";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <RootLayout />
      </BrowserRouter>
    </ThemeProvider>
  );
}
