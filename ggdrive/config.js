const { google } = require('googleapis');
const CLIENT_ID = '976247298318-klrij7583k3josmpnkafk6v39e8mtj1j.apps.googleusercontent.com';
const CLIENT_SECRET = 'DGyGCYqaB0FG6zhwe0HinCDc';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '1//04DvLtzVSdwSECgYIARAAGAQSNwF-L9Irrf6IgbEotmWBY67dLltr4NFaXMF-NyXYIMvIutX8Rw5dbdAVb3qke-VIGI9-Q-qt2c8';

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
});

module.exports={
    drive
}