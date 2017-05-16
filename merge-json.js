const fs = require('fs');

const inputPath = './';
let output = '{"docs":[\n';
fs.readdir(inputPath, (err, items) => {
  if (err) { process.stderr.write(err); return; }
  const it = items.filter(file => (file.indexOf('.json') !== -1 && file !== '_bulk_docs.json'));
  it.forEach((file, index) => { 
    const buff = fs.readFileSync(file);
    if (index > 0) { output += ',\n'; }
    try { 
      output += JSON.stringify(JSON.parse(buff));
    } catch (e) {
      console.error('ERROR IN', file, 'MESSAGE', e);
    } 
  });
  output += "\n]}\n";
  process.stdout.write(output);
});

