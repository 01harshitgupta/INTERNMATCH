import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./components/ui/Header";
import Routes from "./Routes";

function App() {
  const bgRef = useRef(null);

  useEffect(() => {
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        backgroundPosition: "200% 0%",
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }
  }, []);

  return (
    <AuthProvider>
      <LanguageProvider>
        {/* Animated vibrant gradient background */}
        <div className="relative min-h-screen pt-14 overflow-x-hidden">
          <div
            ref={bgRef}
            className="fixed inset-0 -z-10 w-full h-full animate-gradient-move"
            style={{
              background: "linear-gradient(120deg, #a1c4fd, #fbc2eb 40%, #f9d423 70%, #a1c4fd 100%)",
              backgroundSize: "200% 200%",
              transition: "background-position 1s"
            }}
          />
          <Routes />
        </div>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
