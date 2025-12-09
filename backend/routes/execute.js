const express = require('express');
const axios = require('axios');

const router = express.Router();

router.post('/', async (req, res) => {
  const { code, language } = req.body;

  const languageMap = {
    javascript: 'nodejs',
    python: 'python3',
    java: 'java',
    cpp: 'cpp17',
    c: 'c',
    go: 'go',
    ruby: 'ruby',
    // Add more as needed
  };

  const jdoodleLang = languageMap[language] || 'nodejs';

  try {
    const response = await axios.post('https://api.jdoodle.com/v1/execute', {
      script: code,
      language: jdoodleLang,
      versionIndex: '0',
      clientId: process.env.JDOODLE_CLIENT_ID,
      clientSecret: process.env.JDOODLE_CLIENT_SECRET
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Execution failed', details: err.message });
  }
});

module.exports = router;