export const refreshAuthToken = async () => {
  // fetch the refresh token from local storage
  const refreshToken = localStorage.getItem("refreshToken");

  // send a POST request to the refresh endpoint
  try {
    const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: refreshToken,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Could not refresh token");
    }

    // the new access token is in the 'access' field of the response
    console.log("New access token:", data.access);

    // store the new access token in local storage
    localStorage.setItem("authToken", data.access);

    return data.access;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
