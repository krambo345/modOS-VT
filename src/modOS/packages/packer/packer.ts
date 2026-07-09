import { getPackages } from "../../kernel/firebase/firestore";

export async function packerLib() {
    const lib = await getPackages();
    return lib;
}
export async function packerBuildSystem() {

}