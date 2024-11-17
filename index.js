const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Example GET route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.get('/api/getPlayerCharacter', async (req, res) => {
    const playerId = req.query.playerId;  // Get player ID from query parameter
    
    if (!playerId) {
      return res.status(400).json({ error: 'Player ID is required' });
    }
  
    try {
      // Query Firebase Firestore to get the player's character
      const docRef = db.collection('FirstCharacter').doc(playerId);
      const doc = await docRef.get();
  
      if (!doc.exists) {
        return res.status(404).json({ error: 'Player character not found' });
      }
  
      // Return the character data from Firestore
      const characterData = doc.data();
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
