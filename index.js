const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Example GET route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Example GET request for an API
app.get('/api/example', (req, res) => {
  const response = {
    message: 'This is an example GET request',
    status: 'success',
    data: {
      key: 'value'
    }
  };
  res.json(response);  // Sends a JSON response
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
