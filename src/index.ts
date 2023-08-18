import { exec } from 'child_process';
import 'dotenv/config';
import fs from 'fs';
import ExpressAdapter from './infra/httpClient/ExpressAdapter';

const app = new ExpressAdapter();

app.on('post', '/submissions', async (req, res) => {
  fs.writeFileSync('test.js', req.body.code);
  const args = req.body.input.split(',');
  exec(`node -e 'require("./test.js").main(${args[0]}, ${args[1]})'`, (error, stdout) => {
    if (error) throw error;
    res.json({ success: req.body.expectedOutput === stdout.trim() });
  });
});

app.listen(3333, () => console.log('Server is running on port 3333!'));
