const BASE_URL =
  "https://69335884e5a9e342d2728ba2.mockapi.io/api/2048/Hetic";

  
export async function postScore(name, score) {
  try {
    const response = await fetch(`${BASE_URL}/leaderboard`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        score,
        date: new Date().toISOString(),
      }),
    });

    return await response.json();
  } catch (error) {
    console.error("Erreur POST score :", error);
  }
}


export async function getLeaderboard() {
  try {
    const response = await fetch(`${BASE_URL}/leaderboard`);
    return await response.json();
  } catch (error) {
    console.error("Erreur GET leaderboard :", error);
    return [];
  }
}
