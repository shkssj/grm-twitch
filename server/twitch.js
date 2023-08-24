const client_id = 'YOUR_CLIENT_ID'
const client_secret = 'YOUR_CLIENT_SECRET'

let accessToken = '';
async function checkTwitchLiveStatus(username, title) {
    async function getAccessToken() {
      const response = await fetch(`https://id.twitch.tv/oauth2/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: client_id,
          client_secret: client_secret,
          grant_type: 'client_credentials',
        }),
      });
  
      const data = await response.json();
  
      if (response.status === 200) {
        accessToken = data.access_token
      }
    }
  
    async function checkStreamStatus() {
      const response = await fetch(`https://api.twitch.tv/helix/streams?user_login=${username}`, {
        headers: {
          'Client-ID': client_id,
          'Authorization': `Bearer ${accessToken}`,
        },
      });
  
      const data = await response.json();
  
      if (response.status === 200 && data.data.length > 0) {
        const streamTitle = data.data[0].title;

        if(title && !streamTitle.includes(title)) return 'live_not_title'

        return 'live'
      } else {
        return 'notlive';
      }
    }
  
    async function runCheck() {
      if (!accessToken || accessToken == '') {
        await getAccessToken();
      }
  
      return await checkStreamStatus();
    }
  
    return runCheck();
  }

exports('checkLive', checkTwitchLiveStatus)