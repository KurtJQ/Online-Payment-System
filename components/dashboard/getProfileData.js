"use server";

export async function getProfileData(studentId) {
  const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

  try {
    const res = await fetch(
      `${baseURL}/api/student/profile-data/${studentId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching profile data:", err);
    return null;
  }
}
