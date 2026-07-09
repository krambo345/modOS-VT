import { fs } from '@zenfs/core';
export function binoWrite(location: string, data: string) {
    fs.writeFileSync(location, data);
    return true;
}
export function binoRead(location: string) {
    return fs.readFileSync(location, 'utf8');
}
