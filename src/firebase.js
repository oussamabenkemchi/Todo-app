import Firebase from "firebase"

  const firebaseapp = Firebase.initializeApp({
    apiKey: "AIzaSyB6O85ygdfVbbv1qZE6yrwQGcJg7DiNJNY",
    authDomain: "todo-app-c0d7a.firebaseapp.com",
    projectId: "todo-app-c0d7a",
    storageBucket: "todo-app-c0d7a.appspot.com",
    messagingSenderId: "1007318431647",
    appId: "1:1007318431647:web:cb809c144addfd8875afaa",
    measurementId: "G-JXJSGMMXYZ"
  })

  const db = firebaseapp.firestore();

  export default db;