import { initializeApp } from 'firebase/app';
import { getRemoteConfig } from 'firebase/remote-config';

const firebaseConfig = {
  apiKey: "AIzaSyAEskbCxeUIfs0b2hAeB-xhQDujNuO8F0w",
  authDomain: "app-tasks-49c23.firebaseapp.com",
  projectId: "app-tasks-49c23",
  storageBucket: "app-tasks-49c23.firebasestorage.app",
  messagingSenderId: "430305081037",
  appId: "1:430305081037:web:8bb4cffd693b8e2ab59b84"
};

const app = initializeApp(firebaseConfig);

export const remoteConfig = getRemoteConfig(app);

remoteConfig.settings = {
    minimumFetchIntervalMillis: 0, 
    fetchTimeoutMillis: 10000 
};

remoteConfig.defaultConfig = {
    filter_enabled: false,
};
