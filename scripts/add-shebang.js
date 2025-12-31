const fs = require('fs');
const path = require('path');

const cliPath = path.join(__dirname, '..', 'dist', 'cli.js');

if (fs.existsSync(cliPath)) {
  const content = fs.readFileSync(cliPath, 'utf8');
  if (!content.startsWith('#!/usr/bin/env node')) {
    fs.writeFileSync(cliPath, '#!/usr/bin/env node\n' + content);
    // Make it executable on Unix systems
    try {
      fs.chmodSync(cliPath, 0o755);
    } catch (err) {
      // Ignore chmod errors on Windows
    }
  }
}

