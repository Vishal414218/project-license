// License middleware for Express
// Checks remote JSON (GitHub) for license status

const axios = require('axios');

// Replace with your actual GitHub raw URL
const LICENSE_STATUS_URL = 'https://raw.githubusercontent.com/Vishal414218/project-license/main/status.json';

async function checkLicense(req, res, next) {
  try {
    const response = await axios.get(LICENSE_STATUS_URL, { timeout: 5000 });
    console.log('License check response:', response.data);
    if (response.data && response.data.status === 'ACTIVE') {
      return next();
    } else {
      console.error('License disabled or invalid:', response.data);
      return res.status(403).json({ error: 'Your website is hacked by Mr.hacker' });
    }
  } catch (err) {
    console.error('License check failed:', err.message);
    // Fail-safe: block if cannot verify
    return res.status(403).json({ error: 'Your website is hacked by Mr.hacker' });
  }
}

module.exports = checkLicense;
