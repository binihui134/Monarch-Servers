const admin = require('firebase-admin');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Initialize Firebase
const serviceAccount = require('./path-to-your-service-account-file.json');  // Path to your Firebase service account JSON file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();  // Firestore reference

// Example: Testing Firebase connection
db.collection('FirstCharacter')
  .get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });
