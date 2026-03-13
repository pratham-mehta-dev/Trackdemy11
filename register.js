<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBTrsH5WK3biSxIN1EYHvNxMVnpm_NNmmU",
    authDomain: "trackdemy-de31e.firebaseapp.com",
    projectId: "trackdemy-de31e",
    storageBucket: "trackdemy-de31e.firebasestorage.app",
    messagingSenderId: "582191736119",
    appId: "1:582191736119:web:c92b8af05a697f24e266b2",
    measurementId: "G-VCB41K0YMT"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>