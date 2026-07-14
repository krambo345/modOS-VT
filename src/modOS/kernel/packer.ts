import { getPackages } from "./firebase/firestore";
import { kernel } from "@kernel/api"

export async function packerLib() {
    const lib = await getPackages();
    kernel.bino.file.write("/cache/lib.json", JSON.stringify(lib))
    return JSON.stringify(lib);
}
export async function packerBuild(appID:string, rep?:URL) {
    
}