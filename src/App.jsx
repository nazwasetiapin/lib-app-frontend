import { useEffect, useState } from "react";
import api from "./services/api";

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    api.get("/ping")
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch((err) => {
        console.error(err);
        setMessage("Gagal connect ke API");
      });
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>React + Laravel API Test</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
