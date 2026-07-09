import { binoRead, binoWrite } from "./bino.ts";
export const kernel = {
    system : {

    },
    bino : {
        writeFile(location: string, data: string) {
            return binoWrite(location, data);
        },
        readFile(location: string) {
            return binoRead(location);
        }
    }
}