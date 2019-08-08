import fs from 'fs';
import path from 'path';

const configPath = !process.env.CONFIG_PATH ? '/etc/config.json' : path.join(__dirname, '..', process.env.CONFIG_PATH);
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

export default config;
