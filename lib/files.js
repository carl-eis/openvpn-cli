import * as fs from 'fs';
import * as path from 'path';

export const getCurrentDirectoryBase = () => {
    return path.basename(process.cwd());
}

export const directoryExists = (filePath) => {
    return fs.existsSync(filePath);
}
