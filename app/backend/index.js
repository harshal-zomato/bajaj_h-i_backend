
const express = require('express');
const cors = require('cors');
const claimsData = require('../data/data');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// API to fetch all claims
app.get('/claims', (req, res) => {
    res.json(claimsData);
});

// API to fetch a claim by claim_id
app.get('/claims/:id', (req, res) => {
    const claimId = req.params.id;
    const claim = claimsData.find(c => c.claim_id === claimId);

    if (claim) {
        res.json(claim);
    } else {
        res.status(404).json({ message: 'Claim not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
