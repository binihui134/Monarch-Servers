const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceacc.json');  // Path to your Firebase service account JSON file

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://monarch-6a366-default-rtdb.firebaseio.com"
});

const db = admin.database();  // Reference to the Realtime Database


// Example GET route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.get('/api/getPlayerCharacter', async (req, res) => {
    const userId = req.query.userId;  // Get userId from query parameter
  
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
  
    try {
      // Reference to the FirstCharacter data in the user's node
      const userRef = db.ref('PlayerData/' + userId + '_Data/FirstCharacter');
      
      // Get the user's character data
      const snapshot = await userRef.once('value');
      
      if (!snapshot.exists()) {
        return res.status(404).json({ error: 'User character not found' });
      }
  
      // Retrieve the character data from the snapshot
      const characterData = snapshot.val();
      
      // Return the character data as JSON
      return res.json({ character: characterData });
    } catch (error) {
      console.error('Error retrieving character data:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
