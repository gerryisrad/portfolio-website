'use server';

import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcryptjs';

const CONFIG_FILE = path.join(process.cwd(), 'admin-auth.json');

export async function isRegistered() {
    try {
        await fs.access(CONFIG_FILE);
        return true;
    } catch {
        return false;
    }
}

export async function register(username, password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const data = JSON.stringify({ username, hash });
    await fs.writeFile(CONFIG_FILE, data, 'utf-8');
    return true;
}

export async function verifyCredentials(username, password) {
    try {
        const data = await fs.readFile(CONFIG_FILE, 'utf-8');
        const config = JSON.parse(data);

        if (config.username !== username) return false;

        const isValid = await bcrypt.compare(password, config.hash);
        return isValid;
    } catch (error) {
        console.error('Auth verification failed:', error);
        return false;
    }
}
