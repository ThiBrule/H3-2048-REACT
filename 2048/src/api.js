
const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://69335884e5a9e342d2728ba2.mockapi.io/api/2048/Hetic";

export async function getLeaderboard() {
  const response = await fetch(`${BASE_URL}/leaderboard`);

  if (!response.ok) {
    throw new Error("Erreur lors du chargement du leaderboard");
  }

  return response.json(); 
}

export async function postScore(player, score) {
  const response = await fetch(`${BASE_URL}/leaderboard`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ player, score }),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de l'envoi du score");
  }

  return response.json(); 
}
