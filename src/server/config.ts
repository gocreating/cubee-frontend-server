import fs from 'fs';
import path from 'path';
import { ApplicationConfig } from 'cubee-server';

const configPath = !process.env.CONFIG_PATH ? '/etc/config.json' : path.join(__dirname, '..', process.env.CONFIG_PATH);
const config: ApplicationConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));

export default config;
