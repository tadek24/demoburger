const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else {
      if (filePath.endsWith('.tsx') || filePath.endsWith('.css') || filePath.endsWith('.ts')) {
        results.push(filePath);
      }
    }
  });
  return results;
}

const dirs = ['./app', './components'];
let files = [];
dirs.forEach(d => {
  if (fs.existsSync(d)) files = files.concat(walk(d));
});

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content.replace(/\bdark:[a-zA-Z0-9\-\/\[\]\.]+/g, '');
  
  newContent = newContent.replace(/className="([^"]+)"/g, (match, p1) => {
    return 'className="' + p1.replace(/\s+/g, ' ').trim() + '"';
  });
  newContent = newContent.replace(/className=\{`([^`]+)`\}/g, (match, p1) => {
    return 'className={`' + p1.replace(/\s+/g, ' ').trim() + '`}';
  });
  newContent = newContent.replace(/className=\{\s*"([^"]+)"\s*\}/g, (match, p1) => {
    return 'className={"' + p1.replace(/\s+/g, ' ').trim() + '"}';
  });

  if (content !== newContent) {
    fs.writeFileSync(file, newContent);
    console.log('Cleaned', file);
  }
});
