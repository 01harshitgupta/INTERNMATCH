import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./components/ui/Header";
import Routes from "./Routes";

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Routes />
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
