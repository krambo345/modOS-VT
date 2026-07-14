import type { messageType } from "@kernel/shared/types";
import * as variables from "@kernel/shared/variables.ts";
import { packerLib } from "./packer.ts";
// import { terminal } from "@kernel/terminal";
import { kernel } from "@kernel/api";
async function bootstraplog(message: any, type?: messageType) {
  const manifest = document.querySelector<HTMLDivElement>(".manifest")!;
  const colors: Record<messageType, string> = {
    error: "#f00",
    warning: "#ff0",
    info: "#0ff",
    success: "#0f0",
    norm: "#fff",
  };

  manifest.insertAdjacentHTML(
    "beforeend",
    `<p style="color:${colors[type ?? "norm"]}">[bootstrap.ts] ${message}</p>`,
  );
  manifest.scrollTop = manifest.scrollHeight;
  if (type == "warning") {
    await kernel.system.sound("beep");
  }
  if (type == "error") {
    await kernel.system.sound("beep", 3);
  }
  
}
function delay(t?: number): Promise<void> {
  let d = Math.floor(Math.random() * 1000);

  if (t !== undefined) {
    d = t;
  }

  return new Promise((resolve) => setTimeout(resolve, d));
}
export async function bootstrap() {
  console.log(
    `[bootstrap.ts] Booting ${variables.osName} ${variables.osVersion}`,
  );
  const manifest = document.querySelector<HTMLDivElement>(".manifest")!;
  const display = document.querySelector<HTMLDivElement>(".display")!;

  manifest.style.display = "block";
  display.style.display = "none";
  if (manifest.style.display == "block" && display.style.display == "none") {
    await bootstraplog("Manifest initialized", "success");
    await bootstraplog("Manifest display: " + manifest.style.display, "info");
    await bootstraplog("Display display: " + display.style.display, "info");
  } else {
    await bootstraplog("Failed to initialize manifest", "error");
    await bootstraplog("Manifest display: " + manifest.style.display, "warning");
    await bootstraplog("Display display: " + display.style.display, "warning");
  }
  await bootstraplog(`bootstrapping ${variables.osName} ${variables.osVersion}`);
  let i = 1;
  while (i <= 5) {
    kernel.system.sound("beep");
    await bootstraplog(`Confirmation ${i}/5`);
    await delay(1000);
    i++;
  }
  await delay();
  await bootstraplog("Detecting browser");
  await delay();
  const browser = detectBrowser();
  function detectBrowser() {
    const userAgent = navigator.userAgent;
    if (userAgent.includes("Firefox")) {
      return "Firefox";
    } else if (userAgent.includes("Edge")) {
      return "Edge";
    } else if (userAgent.includes("Safari")) {
      return "Safari";
    } else if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
      return "Opera";
    } else if (userAgent.includes("Chrome")) {
      return "Chrome";
    } else {
      return "Unknown";
    }
  }
  await delay();
  if (browser != "Unknown") {
    await bootstraplog("Browser detected", "success");
    await bootstraplog("Browser: " + browser, "info");
  } else {
    await bootstraplog("Failed to detect known browser", "error");
    await bootstraplog("Reported browser: " + browser, "warning");
  }
  await delay();
  await bootstraplog("Testing kernel.bino API");
  const testDir = "/cache/";
  const testFile = "test.txt";
  await delay();
  await bootstraplog(
    `Making ${testDir} ` + kernel.bino.dir.make(`${testDir}`),
    "info",
  );
  await delay();
  await bootstraplog(
    `Writing ${testDir}${testFile} ` +
      kernel.bino.file.write(testDir + testFile, "test"),
    "info",
  );
  await bootstraplog(
    `Checking ${testDir}${testFile} ` +
      kernel.bino.file.check(testDir + testFile),
    "info",
  );
  await delay();
  await bootstraplog(
    `Reading ${testDir}${testFile} ` +
      kernel.bino.file.read(testDir + testFile),
    "info",
  );
  await delay();
  await bootstraplog(`Listing ${testDir} ` + kernel.bino.dir.list(testDir), "info");
  await delay();
  await bootstraplog(
    `Deleting ${testDir}${testFile} ` +
      kernel.bino.file.delete(testDir + testFile),
    "info",
  );
  await delay();
  await bootstraplog(
    `Deleting ${testDir} ` + kernel.bino.dir.delete(`${testDir}`),
    "info",
  );
  await bootstraplog(
    "If any of the values above show 'false' or any other unexpected value, please make an issue on GitHub. Thank you!",
    "warning",
  );
  await bootstraplog("Building on-memory system structure");
  await bootstraplog(`Making directory ${variables.structureCache}`, "info");
  await delay();
  kernel.bino.dir.make(variables.structureCache);
  await bootstraplog(`Making directory ${variables.structurePackages}`, "info");
  kernel.bino.dir.make(variables.structurePackages);
  await delay();
  await bootstraplog(`Making directory ${variables.structurePackagesTerminal}`, "info");
  kernel.bino.dir.make(variables.structurePackagesTerminal);
  await delay();
  await bootstraplog(`Making directory ${variables.structurePackagesFileManager}`, "info");
  kernel.bino.dir.make(variables.structurePackagesFileManager);
  await delay();
  await bootstraplog(`Making directory ${variables.structurePackagesWindowManager}`, "info");
  kernel.bino.dir.make(variables.structurePackagesWindowManager);
  await delay();
  await bootstraplog(`Making directory ${variables.structurePackagesDesktop}`, "info");
  kernel.bino.dir.make(variables.structurePackagesDesktop);
  await delay();
  await bootstraplog(`Making directory ${variables.structurePackagesBar}`, "info");
  kernel.bino.dir.make(variables.structurePackagesBar);
  await delay();
  await bootstraplog(`Making directory ${variables.structureUsr}`, "info");
  kernel.bino.dir.make(variables.structureUsr);
  await delay();
  await bootstraplog(`Making directory ${variables.structureUsrDocuments}`, "info");
  kernel.bino.dir.make(variables.structureUsrDocuments);
  await delay();
  await bootstraplog(`Making directory ${variables.structureUsrMedia}`, "info");
  kernel.bino.dir.make(variables.structureUsrMedia);
  await delay();
  await bootstraplog("Building lib");
  await delay();
  const lib = await packerLib();
  await bootstraplog("lib built ", "success");
  await bootstraplog("Writing lib.json");
  await delay(3000);
  kernel.bino.file.write(variables.libJSONloc, lib);
  await bootstraplog(`Wrote ${variables.libJSONloc}`, "success");
  await bootstraplog(
    `lib.json content: ${kernel.bino.file.read(variables.libJSONloc)}`,
    "info",
  );
  await delay(2000);
  await delay();
  await bootstraplog("Running terminal");
  await bootstraplog(
    `Bootstrap complete, welcome to ${variables.osName} ${variables.osVersion}!`,
    "success",
  );
  kernel.system.sound("tada");
  await delay(5000);
  manifest.innerHTML = ""
  manifest.style.display = "none";
  display.style.display = "block";
  if (manifest.style.display == "none" && display.style.display == "block") {
    await bootstraplog("Toggled to display", "success");
    await bootstraplog("Manifest display: " + manifest.style.display, "info");
    await bootstraplog("Display display: " + display.style.display, "info");
  } else {
    await bootstraplog("Failed to toggle to display", "error");
    await bootstraplog("Manifest display: " + manifest.style.display, "warning");
    await bootstraplog("Display display: " + display.style.display, "warning");
  }
  // await terminal(display)
}
