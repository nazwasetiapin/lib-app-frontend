import { useEffect, useState } from "react";
import Login from "./pages/Login";
import api from "./services/api";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    api.get("/me")
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!user) return <Login />;

  return (
    <div style={{ padding: "40px" }}>
      <h1>Dashboard</h1>
      <p>Halo, {user.name}</p>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          setUser(null);
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default App;
