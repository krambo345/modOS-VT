import type { messageType } from "@kernel/shared/types";
import { osName, osVersion } from "@kernel/shared/variables.ts";
import { packerLib } from "../packages/packer/packer.ts";
import { terms } from "@kernel/terms";
import { kernel } from "@kernel/api"
export async function bootstrap() {
    console.log(`Booting ${osName} ${osVersion}...`);
    const manifest = document.querySelector<HTMLDivElement>(".manifest")!;
    const display = document.querySelector<HTMLDivElement>(".display")!;
    
    manifest.style.display = "block";
    display.style.display = "none";
    if (manifest.style.display == "block" && display.style.display == "none") {
        bootstraplog("Manifest initialized", "success");
        bootstraplog("Manifest display: " + manifest.style.display, "info");
        bootstraplog("Display display: " + display.style.display, "info");
    }
    else{
        bootstraplog("Failed to initialize manifest", "error");
        bootstraplog("Manifest display: " + manifest.style.display, "warning");
        bootstraplog("Display display: " + display.style.display, "warning");
    }
    bootstraplog("Detecting browser...");
    const browser = detectBrowser();
    function detectBrowser() {
        const userAgent = navigator.userAgent;
        if (userAgent.includes("Firefox")) {
            return "Firefox";
        } else if (userAgent.includes("Chrome")) {
            return "Chrome";
        } else if (userAgent.includes("Safari")) {
            return "Safari";
        } else if (userAgent.includes("Edge")) {
            return "Edge";
        } else if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
            return "Opera";
        } else {
            return "Unknown";
        }
    }
    if (browser != "Unknown") {
        bootstraplog("Browser detected...", "success");
        bootstraplog("Browser: " + browser, "info");
    } else {
        bootstraplog("Failed to detect known browser", "error");
        bootstraplog("Reported browser: " + browser, "warning");
    }
    bootstraplog("building lib...");
    const lib = await packerLib();
    bootstraplog("lib built. ", "success");
    bootstraplog("Package count: " + lib.length, "info");
    bootstraplog("Initializing system packages...");
    
    bootstraplog("Running terms...");
    terms();
    bootstraplog(`Bootstrap complete, welcome to ${osName} ${osVersion}!`, "success");
    // manifest.style.display = "none";
    // display.style.display = "block";
    if (manifest.style.display == "none" && display.style.display == "block") {
        bootstraplog("Toggled to display...", "success");
        bootstraplog("Manifest display: " + manifest.style.display, "info");
        bootstraplog("Display display: " + display.style.display, "info");
    }
    else{
        bootstraplog("Failed to toggle to display", "error");
        bootstraplog("Manifest display: " + manifest.style.display, "warning");
        bootstraplog("Display display: " + display.style.display, "warning");
    }
    function bootstraplog(message: string, type?: messageType) {
    const colors: Record<messageType, string> = {
        error: "#f00",
        warning: "#ff0",
        info: "#0ff",
        success: "#0f0",
        norm: "#fff",
    };

    manifest.insertAdjacentHTML(
        "beforeend",
        `<p style="color:${colors[type ?? "norm"]}">[bootstrap.ts] ${message}</p>`
    );
}
    }
