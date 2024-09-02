const express = require('express');
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: 'upload/' });  
const { mergepdf } = require('./mergepdf');  // Correctly importing mergepdf
const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use('/static', express.static('public'));

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/index.html'));
});

// Handle PDF merging
app.post('/merge', upload.array('pdfs', 12), async (req, res) => {
  console.log(req.files);

  // Merge the first two PDFs
  await mergepdf(
    path.join(__dirname, req.files[0].path), 
    path.join(__dirname, req.files[1].path)
  );

  // Redirect to the merged PDF
  res.redirect('http://localhost:3000/static/merged.pdf');
});

// Start the server on port 3000
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

