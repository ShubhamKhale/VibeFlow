import React, { useRef } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { SongProvider } from "./context/SongContext";

// Extend the HTMLElement type to include _reactRootContainer
interface HTMLElementWithRoot extends HTMLElement {
  _reactRootContainer?: any;
}

const MainApp = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  return (
    <React.StrictMode>
      <SongProvider audioRef={audioRef}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SongProvider>
    </React.StrictMode>
  );
};

const rootElement = document.getElementById("root") as HTMLElementWithRoot | null;
if (rootElement && !rootElement._reactRootContainer) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<MainApp />);
}
