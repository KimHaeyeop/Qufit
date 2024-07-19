const APPLICATION_SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;

export async function getToken(roomName: string, participantName: string) {
    const response = await fetch(APPLICATION_SERVER_URL + 'api/video/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            roomName: roomName,
            participantName: participantName,
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(`Failed to get token: ${error.errorMessage}`);
    }

    const data = await response.json();
    return data.token;
}
