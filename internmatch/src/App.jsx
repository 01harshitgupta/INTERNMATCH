import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./components/ui/Header";
import Routes from "./Routes";

function App() {
  return (
    <AuthProvider>
      {/* LanguageProvider wraps the app to provide i18n context */}
      <LanguageProvider>
        {/* Routes will access both Auth and Language contexts */}
        <Routes />
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
