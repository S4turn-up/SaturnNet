// firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, ref, onValue, push, set, onDisconnect } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDeJObdaKwdCg-Q5AJ8KebIs72ohle-tmc",
  authDomain: "saturnnet-31e73.firebaseapp.com",
  databaseURL: "https://saturnnet-31e73-default-rtdb.firebaseio.com",
  projectId: "saturnnet-31e73",
  storageBucket: "saturnnet-31e73.firebasestorage.app",
  messagingSenderId: "24870112509",
  appId: "1:24870112509:web:818de0d12ee340ad630294"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, onValue, push, set, onDisconnect };