import * as bino from "@kernel/bino";
function apiLog(message: string) {
  console.log(`[api.ts] ${message}`);
}
let blockade = false;
export const kernel = {
  system: {
    async sound(sound: string, times?: number) {
      if (!blockade) {
        try {
          const url = `media/${sound}.mp3`;
          apiLog(`Attempting to play audio ${url}`);
          var s = new Audio(url);

          s.loop = false;
          var t = times ?? 1;
          for (let i = 0; i < t; i++) {
            s.currentTime = 0;

            await new Promise<void>((resolve, reject) => {
              s.onended = () => resolve();
              s.onerror = () => reject(new Error("Failed to play audio"));

              s.play().catch(reject);
            });
          }
        } catch (err) {
          blockade = true;
          console.error(`Unexpected problem or blockade occured. Toggled blockade mode, you should not see this message again. Error: ${err}. If you wish to get the full experience of modOS, please fix the problem by removing an adblocker, or resolving the external factor.`);
          return `Unexpected problem or blockade occured. Toggled blockade mode, you should not see this message again. Error: ${err}`;
        }
      }
    },
  },
  bino: {
    file: {
      write(path: string, data: string) {
        if (bino.binoWrite(path, data)) {
          apiLog(`made file ${path}`);
          return true;
        }
      },
      read(path: string) {
        if (bino.binoCheck(path)) {
          apiLog(`read file ${path}`);
          return bino.binoRead(path);
        } else {
          apiLog(`file ${path} not found`);
        }
      },
      check(path: string) {
        apiLog(`checked ${path}`);
        return bino.binoCheck(path);
      },
      delete(path: string) {
        if (bino.binoCheck(path)) {
          bino.binoDelete(path);
          apiLog(`deleted file path`);
          return true;
        } else {
          apiLog(`file ${path} not found`);
          return false;
        }
      },
    },
    dir: {
      make(path: string) {
        bino.binoDirWrite(path);
        apiLog(`made directory ${path}`);
        return true;
      },
      list(path: string) {
        if (bino.binoCheck(path)) {
          apiLog(`listed directory ${path}`);
          return bino.binoDirContents(path);
        } else {
          apiLog(`directory ${path} not found`);
        }
      },
      delete(path: string) {
        if (bino.binoCheck(path)) {
          bino.binoDirDelete(path);
          apiLog(`deleted directory ${path}`);
          return true;
        } else {
          console.log(`directory ${path} not found`);
          return false;
        }
      },
    },
  },
};
