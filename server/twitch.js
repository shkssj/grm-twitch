const axios = require('axios');

const client_id = 'YOUR_CLIENT_ID';
const client_secret = 'YOUR_CLIENT_SECRET';

let accessToken = '';

async function checkTwitchLiveStatus(username, title) {
    async function getAccessToken() {
        try {
            const response = await axios.post('https://id.twitch.tv/oauth2/token', null, {
                params: {
                    client_id: client_id,
                    client_secret: client_secret,
                    grant_type: 'client_credentials',
                },
            });

            if (response.status === 200) {
                accessToken = response.data.access_token;
            }
        } catch (error) {
            console.error('Error getting access token:', error.message);
        }
    }

    async function checkStreamStatus() {
        try {
            const response = await axios.get(`https://api.twitch.tv/helix/streams?user_login=${username}`, {
                headers: {
                    'Client-ID': client_id,
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (response.status === 200 && response.data.data.length > 0) {
                const streamTitle = response.data.data[0].title;

                if (title && !streamTitle.toLowerCase().includes(title)) {
                    return 'live_not_title';
                }

                return 'live';
            } else {
                return 'notlive';
            }
        } catch (error) {
            console.error('Error checking stream status:', error.message);
            return 'error';
        }
    }

    async function runCheck() {
        if (!accessToken || accessToken === '') {
            await getAccessToken();
        }

        return await checkStreamStatus();
    }

    return runCheck();
}

exports('checkLive', checkTwitchLiveStatus)
