/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { symlinkSync, rmSync, existsSync } from "fs";
import { join } from "path";

const pathToVanillaNodeModules = join(__dirname, "..", "test", "vanilla", "node_modules");
const pathToNodeModules = join(__dirname, "..", "..", "node_modules");
const moduleName = "react-form-exercise";
const pathToDist = join(__dirname, "..", "..", "dist");

function link() {
    if (!existsSync(pathToDist)) {
        return;
    }
    if (existsSync(join(pathToVanillaNodeModules, moduleName))) {
        rmSync(join(pathToVanillaNodeModules, moduleName), { "recursive": true, "force": true });
    }
    symlinkSync(join(pathToDist), join(pathToVanillaNodeModules, moduleName), "dir");
    rmSync(join(pathToVanillaNodeModules, "react"), { "force": true, "recursive": true });
    symlinkSync(join(pathToNodeModules, "react"), join(pathToVanillaNodeModules, "react"), "dir");
}

link();
