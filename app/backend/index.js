
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Path to the claims data file
const claimsDataPath = path.join(__dirname, '../data/claims.json');

// Helper function to read claims data
const getClaimsData = () => {
    const rawData = fs.readFileSync(claimsDataPath);
    return JSON.parse(rawData);
};

// API to fetch all claims
app.get('/claims', (req, res) => {
    try {
        const claims = getClaimsData();
        res.json(claims);
    } catch (error) {
        res.status(500).json({ message: 'Error reading claims data' });
    }
});

// API to fetch a claim by claim_id
app.get('/claims/:id', (req, res) => {
    try {
        const claimId = req.params.id;
        const claims = getClaimsData();
        const claim = claims.find(c => c.claim_id === claimId);

        if (claim) {
            res.json(claim);
        } else {
            res.status(404).json({ message: 'Claim not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error reading claims data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
