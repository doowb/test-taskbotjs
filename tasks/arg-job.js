/**
 * The following example is from the taskbotjs example but written in typescript.
 *
 * ```js
 * // example/src/jobs/ArgJob.ts
 * import Chance from "chance";
 * import sleepAsync from "sleep-promise";
 * import { DateTime } from "luxon";
 *
 * import { Job, IDependencies, constantBackoff, RetryFunctionTimingFunction } from "@taskbotjs/client";
 *
 * import { NoDeps } from "../NoDeps";
 *
 * const chance = new Chance();
 *
 * export class ArgJob extends Job<NoDeps> {
 *   static readonly jobName: string = "taskbot.arg";
 *   static readonly maxRetries = 5;
 *   static readonly calculateNextRetry: RetryFunctionTimingFunction = constantBackoff(3);
 *
 *   async perform(arg: number): Promise<void> {
 *     const interval = Math.max(25, Math.round(chance.normal({mean: 300, dev: 250})));
 *     await sleepAsync(interval);
 *     this.logger.info({ arg}, `I have an arg: ${arg}`);
 *   }
 * }
 * ```
 */

const { Job, constantBackoff } = require('@taskbotjs/client');

class ArgJob extends Job {
  static get jobName() { return 'taskbot.arg'; }
  static get maxRetries() { return 5; }
  static get calculateNextRetry() { return constantBackoff(3); }

  async preform(arg) {
    console.error('ARG-JOB', [arg]);
    await sleep(1000);
    this.logger.info({ arg }, `I have an arg: ${arg}`);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = ArgJob;
