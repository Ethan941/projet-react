import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const today = new Date();
      const month = today.getMonth() + 1;
      const day = today.getDate();
      const apiUrl = `https://fr.wikipedia.org/api/rest_v1/feed/onthisday/events/${month}/${day}`;

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des événements.");
        }
        const data = await response.json();
        console.log("Données de l'API :", data); // Debug

        if (!data.events || data.events.length === 0) {
          throw new Error("Aucun événement trouvé.");
        }

        setEvents(data.events.slice(0, 5)); // Limite à 5 événements
      } catch (error) {
        console.error("Erreur attrapée :", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="container">
      <h1>📜 Événements Historiques du {new Date().toLocaleDateString()}</h1>
      {loading && <p>Chargement des événements...</p>}
      {error && <p className="error">❌ {error}</p>}
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            <strong>{event.year} :</strong> {event.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
