'use strict';
/**
 * Example from repo using typescript.
 * Node of the imports should be necessary since those are just for typescript definitions.
 *
 * ```js
 * // example/src/NoDeps.ts
 * import Bunyan from "bunyan";
 * import { IDependencies, ClientRoot } from "@taskbotjs/client";
 *
 * export class NoDeps implements IDependencies {
 *   readonly baseLogger: Bunyan;
 *   readonly taskbot: ClientRoot;
 *
 *   constructor(baseLogger: Bunyan, taskbot: ClientRoot) {
 *     this.baseLogger = baseLogger;
 *     this.taskbot = taskbot;
 *   }
 * };
 * ```
 */

class NoDeps {
  constructor(baseLogger, clientPool) {
    this.baseLogger = baseLogger,
    this.clientPool = clientPool
  }
}

module.exports = NoDeps;
