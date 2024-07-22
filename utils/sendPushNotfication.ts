/*import admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.cert('./config/firebase-admin.json')
});

interface PushNotificationOptions {
  title: string;
  body: string;
  tokens: Array<string>;
  data?: Record<string, string>;
}

export default async ({
  title,
  body,
  tokens,
  data = {}
}: PushNotificationOptions) => {
  try {
    await admin.messaging().sendEachForMulticast({
      notification: { title, body },
      data,
      tokens
    });
  } catch (e) {
    // Do Nothing
  }
};*/

import admin from 'firebase-admin';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from config/.env
dotenv.config({ path: path.resolve(__dirname, '../config/config.env') });

const firebaseConfigBase64 = process.env.FIREBASE_CONFIG;

if (!firebaseConfigBase64) {
  throw new Error('Missing FIREBASE_CONFIG environment variable');
}

let firebaseConfig;

try {
  firebaseConfig = JSON.parse(Buffer.from(firebaseConfigBase64, 'base64').toString('utf-8'));
} catch (error) {
  throw new Error('Invalid FIREBASE_CONFIG value: ' + error.message);
}

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig)
});

interface PushNotificationOptions {
  title: string;
  body: string;
  tokens: Array<string>;
  data?: Record<string, string>;
}

export default async ({
  title,
  body,
  tokens,
  data = {}
}: PushNotificationOptions) => {
  try {
    await admin.messaging().sendEachForMulticast({
      notification: { title, body },
      data,
      tokens
    });
  } catch (e) {
    // Handle the error appropriately
    console.error('Error sending push notification:', e);
  }
};
