const express = require('express');
const { Octokit } = require('@octokit/rest');
const path = require('path');

const app = express();
const port = 3000;

const octokit = new Octokit({
    auth: 'your-github-token'
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/repos', async (req, res) => {
    try {
        const response = await octokit.repos.listForAuthenticatedUser();
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/add-page', (req, res) => {
    const { title, content } = req.body;
    // Logic to add a new page
    res.send(`Page titled "${title}" added successfully!`);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
