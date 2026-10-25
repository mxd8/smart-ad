var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");

// ../node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure = class extends PerformanceEntry {
  
  entryType = "measure";
};
var PerformanceResourceTiming = class extends PerformanceEntry {
  
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList = class {
  
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance = class {
  
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver = class {
  
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// ../node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
if (!("__unenv__" in performance)) {
  const proto = Performance.prototype;
  for (const key of Object.getOwnPropertyNames(proto)) {
    if (key !== "constructor" && !(key in performance)) {
      const desc = Object.getOwnPropertyDescriptor(proto, key);
      if (desc) {
        Object.defineProperty(performance, key, desc);
      }
    }
  }
}
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// ../node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";

// ../node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {
}, { __unenv__: true });

// ../node_modules/unenv/dist/runtime/node/console.mjs
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;

// ../node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole = globalThis["console"];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
var console_default = workerdConsole;

// ../node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
globalThis.console = console_default;

// ../node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now2 = Date.now();
  const seconds = Math.trunc(now2 / 1e3);
  const nanos = now2 % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// ../node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// ../node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream = class {
  
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};

// ../node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream = class {
  
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir3, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count3, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};

// ../node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION = "22.14.0";

// ../node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class _Process extends EventEmitter {
  
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};

// ../node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var workerdProcess = getBuiltinModule("node:process");
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess.nextTick
});
var { exit, features, platform } = workerdProcess;
var {
  _channel,
  _debugEnd,
  _debugProcess,
  _disconnect,
  _events,
  _eventsCount,
  _exiting,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _handleQueue,
  _kill,
  _linkedBinding,
  _maxListeners,
  _pendingMessage,
  _preload_modules,
  _rawDebug,
  _send,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  arch,
  argv,
  argv0,
  assert: assert2,
  availableMemory,
  binding,
  channel,
  chdir,
  config,
  connected,
  constrainedMemory,
  cpuUsage,
  cwd,
  debugPort,
  disconnect,
  dlopen,
  domain,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exitCode,
  finalization,
  getActiveResourcesInfo,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getMaxListeners,
  getuid,
  hasUncaughtExceptionCaptureCallback,
  hrtime: hrtime3,
  initgroups,
  kill,
  listenerCount,
  listeners,
  loadEnvFile,
  mainModule,
  memoryUsage,
  moduleLoadList,
  nextTick,
  off,
  on,
  once,
  openStdin,
  permission,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  reallyExit,
  ref,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  send,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setMaxListeners,
  setSourceMapsEnabled,
  setuid,
  setUncaughtExceptionCaptureCallback,
  sourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  throwDeprecation,
  title,
  traceDeprecation,
  umask,
  unref,
  uptime,
  version,
  versions
} = unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// ../node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// _utils/http.js
function likeEscape(value) {
  return String(value).replace(/[\\%_]/g, (char) => `\\${char}`);
}
__name(likeEscape, "likeEscape");
function jsonResponse(body, { status: status4 = 200, headers = {} } = {}) {
  return new Response(JSON.stringify(body), {
    status: status4,
    headers: { ...headers, "Content-Type": "application/json; charset=utf-8" }
  });
}
__name(jsonResponse, "jsonResponse");
function textResponse(body, { status: status4 = 200, headers = {} } = {}) {
  return new Response(body, {
    status: status4,
    headers: { ...headers, "Content-Type": "text/plain; charset=utf-8" }
  });
}
__name(textResponse, "textResponse");
async function readJson(context2) {
  try {
    const value = await context2.request.json();
    return typeof value === "object" && value !== null ? { ok: true, value } : { ok: false, value: null };
  } catch {
    return { ok: false, value: null };
  }
}
__name(readJson, "readJson");
function badRequest(error3) {
  return jsonResponse({ success: false, error: error3 }, { status: 400 });
}
__name(badRequest, "badRequest");
function notFound(error3 = "\u89C4\u5219\u4E0D\u5B58\u5728") {
  return jsonResponse({ success: false, error: error3 }, { status: 404 });
}
__name(notFound, "notFound");
function unauthorized(error3 = "\u672A\u901A\u8FC7\u9274\u6743") {
  return jsonResponse(
    { success: false, error: error3 },
    { status: 401, headers: { "Cache-Control": "no-store" } }
  );
}
__name(unauthorized, "unauthorized");
function methodNotAllowed(method, allow) {
  return jsonResponse(
    { success: false, error: `\u4E0D\u652F\u6301\u7684\u65B9\u6CD5\uFF1A${method}` },
    { status: 405, headers: { Allow: allow } }
  );
}
__name(methodNotAllowed, "methodNotAllowed");
function errorResponse(tag, method, pathname, error3) {
  const detail = error3?.stack ?? error3?.message;
  console.error(`[${tag}] ${method} ${pathname} \u5904\u7406\u5931\u8D25: ${detail}`);
  const status4 = error3?.name === "ConfigError" ? 400 : Number.isInteger(error3?.status) && error3.status >= 400 && error3.status < 500 ? error3.status : 500;
  return jsonResponse({ success: false, error: error3?.message }, { status: status4 });
}
__name(errorResponse, "errorResponse");

// _utils/auth.js
var HIT_TOKEN_VAR = "PANEL_HIT_TOKEN";
var HEADER_AUTHORIZATION = "authorization";
var HEADER_PANEL_TOKEN = "x-panel-token";
var BEARER_PREFIX = "Bearer ";
var NO_TOKEN_WARNING = '299 warn-1 "write-auth-not-configured"';
function configuredHitToken(env2) {
  return String(env2[HIT_TOKEN_VAR] ?? "").trim();
}
__name(configuredHitToken, "configuredHitToken");
function splitTokenList(raw) {
  return String(raw ?? "").split(",").map((part) => part.trim()).filter((part) => part.length > 0);
}
__name(splitTokenList, "splitTokenList");
function anyConfiguredToken(env2) {
  return splitTokenList(configuredHitToken(env2));
}
__name(anyConfiguredToken, "anyConfiguredToken");
function timingSafeEqual(a, b) {
  const left = String(a);
  const right = String(b);
  const length = Math.max(left.length, right.length);
  let diff = left.length === right.length ? 0 : 1;
  for (let i = 0; i < length; i += 1) {
    diff |= (left.charCodeAt(i) || 0) ^ (right.charCodeAt(i) || 0);
  }
  return diff === 0;
}
__name(timingSafeEqual, "timingSafeEqual");
function isAnyTokenMatch(configuredTokens, supplied) {
  const value = String(supplied ?? "");
  return configuredTokens.some((token) => timingSafeEqual(token, value));
}
__name(isAnyTokenMatch, "isAnyTokenMatch");
function extractToken(request) {
  const authorization = request.headers.get(HEADER_AUTHORIZATION);
  if (authorization) {
    if (authorization.startsWith(BEARER_PREFIX)) {
      return authorization.slice(BEARER_PREFIX.length).trim();
    }
    return authorization.trim();
  }
  return (request.headers.get(HEADER_PANEL_TOKEN) || "").trim();
}
__name(extractToken, "extractToken");
function extractUrlOrHeaderToken(context2) {
  const fromQuery = new URL(context2.request.url).searchParams.get("token");
  return fromQuery && fromQuery.trim() || extractToken(context2.request);
}
__name(extractUrlOrHeaderToken, "extractUrlOrHeaderToken");
function requireHitToken(env2, supplied) {
  const tokens = anyConfiguredToken(env2);
  if (!tokens.length) {
    console.warn("[auth] \u4E0A\u62A5\u63A5\u53E3\u672A\u914D\u7F6E\u4EE4\u724C\uFF08PANEL_HIT_TOKEN\uFF09\uFF0C\u5DF2\u62D2\u7EDD");
    return jsonResponse(
      {
        success: false,
        error: "\u4E0A\u62A5\u63A5\u53E3\u672A\u914D\u7F6E\u4EE4\u724C\uFF1A\u53EF\u5728 Cloudflare \u73AF\u5883\u53D8\u91CF\u914D\u7F6E PANEL_HIT_TOKEN\uFF0C\u6216\u8BA9\u5BA2\u6237\u7AEF\u643A\u5E26 X-Final-Key \u7528\u6237\u5BC6\u94A5\uFF08Surge \u7AEF\u51ED FINAL_UID \u81EA\u52A8\u53D6\u94A5\uFF09"
      },
      { status: 401, headers: { "Cache-Control": "no-store" } }
    );
  }
  const value = supplied == null ? "" : String(supplied).trim();
  if (!isAnyTokenMatch(tokens, value)) {
    console.warn("[auth] \u4E0A\u62A5\u63A5\u53E3\u9274\u6743\u5931\u8D25");
    return jsonResponse(
      { success: false, error: "\u4E0A\u62A5\u63A5\u53E3\u9274\u6743\u5931\u8D25\uFF1A\u4EE4\u724C\u4E0D\u5339\u914D" },
      { status: 401, headers: { "Cache-Control": "no-store" } }
    );
  }
  return null;
}
__name(requireHitToken, "requireHitToken");
function warningHeadersIfOpen(env2) {
  return anyConfiguredToken(env2).length ? {} : { Warning: NO_TOKEN_WARNING };
}
__name(warningHeadersIfOpen, "warningHeadersIfOpen");

// _utils/fetch-retry.js
var RETRYABLE_STATUSES = [408, 425, 429, 500, 502, 503, 504];
function isRetryableStatus(status4) {
  return RETRYABLE_STATUSES.includes(Number(status4));
}
__name(isRetryableStatus, "isRetryableStatus");
function isRetryableNetworkError(error3) {
  const name = error3?.name ?? "";
  if (name === "TimeoutError" || name === "AbortError") return true;
  const message = String(error3?.message ?? "").toLowerCase();
  return [
    "network",
    "fetch failed",
    "connection",
    "timed out",
    "temporarily unavailable",
    "try again"
  ].some((needle) => message.includes(needle));
}
__name(isRetryableNetworkError, "isRetryableNetworkError");
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
__name(sleep, "sleep");
async function fetchWithRetry(url, init = {}, { timeoutMs, maxAttempts = 3, baseDelayMs = 300, totalBudgetMs = 0, onRetry = null } = {}) {
  if (!Number.isFinite(Number(timeoutMs)) || Number(timeoutMs) <= 0) {
    throw new Error("fetchWithRetry \u9700\u8981 timeoutMs\uFF08\u5355\u6B21\u8D85\u65F6\u6BEB\u79D2\uFF09");
  }
  const startedAt = Date.now();
  const attempts = Math.max(1, Math.floor(Number(maxAttempts) || 3));
  let attempt = 0;
  let lastResponse = null;
  let lastError = null;
  while (attempt < attempts) {
    attempt += 1;
    let effectiveTimeout = Number(timeoutMs);
    if (totalBudgetMs > 0) {
      const remaining = totalBudgetMs - (Date.now() - startedAt);
      if (remaining <= 0) break;
      effectiveTimeout = Math.max(500, Math.min(effectiveTimeout, remaining));
    }
    try {
      const response = await fetch(url, {
        ...init,
        signal: AbortSignal.timeout(effectiveTimeout)
      });
      if (!isRetryableStatus(response.status) || attempt >= attempts) return response;
      lastResponse = response;
      lastError = null;
      onRetry?.({ attempt, status: response.status, kind: "status" });
    } catch (error3) {
      lastError = error3;
      lastResponse = null;
      if (attempt >= attempts || !isRetryableNetworkError(error3)) {
        error3.attempts = attempt;
        throw error3;
      }
      onRetry?.({ attempt, kind: "network", name: error3?.name, message: error3?.message });
    }
    await sleep(baseDelayMs * attempt);
  }
  if (lastResponse) return lastResponse;
  if (lastError) {
    lastError.attempts = attempt;
    throw lastError;
  }
  const exhausted = new Error("\u91CD\u8BD5\u9884\u7B97\u8017\u5C3D\uFF1A\u672A\u6536\u5230\u4EFB\u4F55\u54CD\u5E94");
  exhausted.attempts = attempt;
  throw exhausted;
}
__name(fetchWithRetry, "fetchWithRetry");

// _utils/turso.js
var REQUIRED_VARS = ["TURSO_API_URL", "TURSO_AUTH_TOKEN"];
var TURSO_TIMEOUT_MS = 1e4;
var CONFIG_ERROR_MSG = "\u8BF7\u5148\u5728 Pages \u63A7\u5236\u53F0\u7684 Environment Variables \u4E2D\u914D\u7F6E TURSO_API_URL \u548C TURSO_AUTH_TOKEN";
var ConfigError = class extends Error {
  
  constructor(message) {
    super(message);
    this.name = "ConfigError";
  }
};
function redactUrl(url) {
  try {
    return new URL(url).host || url;
  } catch {
    return "\uFF08\u65E0\u6CD5\u89E3\u6790\uFF09";
  }
}
__name(redactUrl, "redactUrl");
function getTursoConfig(env2) {
  const url = String(env2.TURSO_API_URL ?? "").trim();
  const authToken = String(env2.TURSO_AUTH_TOKEN ?? "").trim();
  const missing = REQUIRED_VARS.filter((name) => !String(env2[name] ?? "").trim()).join(", ");
  if (missing) {
    console.warn(`[turso] \u7F3A\u5C11\u73AF\u5883\u53D8\u91CF\uFF1A${missing}`);
    return null;
  }
  if (url.startsWith("libsql://")) {
    throw new ConfigError(
      "TURSO_API_URL \u4E0D\u80FD\u7528 libsql:// \u534F\u8BAE\uFF08Workers \u65E0\u6CD5\u89E3\u6790\uFF09\uFF0C\u8BF7\u6539\u4E3A https:// \u5F62\u5F0F"
    );
  }
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    throw new ConfigError(`TURSO_API_URL \u4E0D\u662F\u5408\u6CD5\u5730\u5740\uFF1A${redactUrl(url)}`);
  }
  if (parsed.protocol !== "https:") {
    throw new ConfigError(`TURSO_API_URL \u5FC5\u987B\u662F https:// \u5F00\u5934\uFF0C\u5F53\u524D\u4E3A ${parsed.protocol}`);
  }
  return { url, authToken };
}
__name(getTursoConfig, "getTursoConfig");
async function executeTursoBatch(config2, statements) {
  const payloadBody = JSON.stringify({
    statements: statements.map((statement) => ({
      q: statement.sql,
      params: statement.params ?? []
    })),
    serializable: true
  });
  const retryable = isBatchRetryable(statements);
  const response = retryable ? await fetchWithRetry(
    config2.url,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config2.authToken}`,
        "Content-Type": "application/json"
      },
      body: payloadBody
    },
    {
      timeoutMs: TURSO_TIMEOUT_MS,
      maxAttempts: 3,
      baseDelayMs: 400,
      onRetry: /* @__PURE__ */ __name((info3) => console.warn("[turso] \u53EF\u91CD\u8BD5\u7684\u5931\u8D25\uFF0C\u51C6\u5907\u91CD\u8BD5", info3), "onRetry")
    }
  ) : await fetch(config2.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config2.authToken}`,
      "Content-Type": "application/json"
    },
    body: payloadBody,
    signal: AbortSignal.timeout(TURSO_TIMEOUT_MS)
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok || payload?.error) {
    throw new Error(`Turso \u8BF7\u6C42\u5931\u8D25\uFF1A${payload?.error ?? response.status}`);
  }
  if (!Array.isArray(payload) || payload.length !== statements.length) {
    throw new Error("Turso \u8FD4\u56DE\u4E86\u610F\u5916\u683C\u5F0F\uFF1A\u7ED3\u679C\u6570\u91CF\u4E0E\u8BED\u53E5\u6570\u91CF\u4E0D\u4E00\u81F4");
  }
  const failed = payload.find((statement) => statement.error);
  if (failed) {
    throw new Error(`Turso \u6267\u884C\u5931\u8D25\uFF1A${failed.error}`);
  }
  return payload;
}
__name(executeTursoBatch, "executeTursoBatch");
function isBatchRetryable(statements) {
  return (Array.isArray(statements) ? statements : []).every((statement) => {
    const sql = String(statement?.sql ?? "");
    if (/^\s*(select|with|pragma)\b/i.test(sql)) return true;
    if (!/\bon conflict\b/i.test(sql)) return false;
    return !/\+\s*excluded\.|excluded\.[a-z_]+\s*\+/i.test(sql);
  });
}
__name(isBatchRetryable, "isBatchRetryable");

// _utils/db/contract.js
var DB_ERROR_KINDS = ["connection", "timeout", "auth", "syntax", "constraint", "unknown"];
var DbError = class extends Error {
  
  constructor(message, kind = "unknown", { cause } = {}) {
    super(message);
    this.name = "DbError";
    this.kind = DB_ERROR_KINDS.includes(kind) ? kind : "unknown";
    this.constraintTarget = null;
    this.cause = cause;
  }
};
var DB_ERROR_LABELS = {
  connection: "\u8FDE\u63A5\u7C7B\uFF08\u5730\u5740\u4E0D\u53EF\u8FBE\u6216\u670D\u52A1\u7AEF\u5F02\u5E38\uFF09",
  timeout: "\u8D85\u65F6\u7C7B\uFF08\u54CD\u5E94\u8D85\u8FC7\u65F6\u9650\uFF09",
  auth: "\u9274\u6743\u7C7B\uFF08\u4EE4\u724C\u88AB\u62D2\u7EDD\uFF09",
  syntax: "\u8BED\u6CD5\u7C7B\uFF08SQL \u6216\u8868\u7ED3\u6784\u4E0D\u5339\u914D\uFF09",
  constraint: "\u7EA6\u675F\u7C7B\uFF08\u552F\u4E00\u952E\u51B2\u7A81\u6216\u5916\u952E\u5931\u8D25\uFF09",
  unknown: "\u672A\u77E5\u9519\u8BEF"
};
function classifyError(error3) {
  if (error3 instanceof DbError) return error3.kind;
  const text = String(error3?.message ?? "") + " " + String(error3?.name ?? "");
  if (/abort|timeout|timed?\s?out/i.test(text)) return "timeout";
  if (/401|403|unauthorized|forbidden|jwt|authentication/i.test(text)) return "auth";
  if (/unique constraint|constraint fail/i.test(text)) return "constraint";
  if (/syntax error|no such (table|column|function)|ambiguous column/i.test(text))
    return "syntax";
  if (/fetch failed|network|econnrefused|enotfound|econnreset|socket|dns|5\d\d|internal error/i.test(
    text
  ))
    return "connection";
  return "unknown";
}
__name(classifyError, "classifyError");
function parseConstraintTarget(message) {
  const match2 = String(message || "").match(/UNIQUE constraint failed:\s*([\w.]+\.[\w.]+)/i);
  return match2 ? match2[1] : null;
}
__name(parseConstraintTarget, "parseConstraintTarget");
function asDbError(error3) {
  if (error3 instanceof DbError) return error3;
  if (error3?.name === "ConfigError") return error3;
  const wrapped = new DbError(error3?.message || "\u6570\u636E\u5E93\u64CD\u4F5C\u5931\u8D25", classifyError(error3), {
    cause: error3
  });
  if (wrapped.kind === "constraint")
    wrapped.constraintTarget = parseConstraintTarget(error3?.message);
  return wrapped;
}
__name(asDbError, "asDbError");
function constraintTargetOf(error3) {
  if (error3 instanceof DbError) return error3.constraintTarget;
  const target = parseConstraintTarget(error3?.message);
  return /unique constraint/i.test(String(error3?.message ?? "")) ? target : null;
}
__name(constraintTargetOf, "constraintTargetOf");
var DEFAULT_MAX_BATCH_SIZE = 250;

// _utils/db/ddl.js
var DB_SCHEMA_VERSION = 20;
var DB_META_TABLE = "db_meta";
var HEALTH_PROBE_TABLE = "health_probe";
var HEARTBEATS_TABLE = "client_heartbeats";
var DEVICES_TABLE = "devices";
var USERS_TABLE = "users";
var USER_GROUPS_TABLE = "user_groups";
var USER_ROLES_TABLE = "user_roles";
var AUTH_SESSIONS_TABLE = "auth_sessions";
var USER_CHANNELS_TABLE = "user_channels";
var DOMAIN_QUERIES_TABLE = "domain_queries";
var DOMAIN_SUMMARY_TABLE = "domain_summary";
var RULE_OVERRIDES_TABLE = "rule_overrides";
var TURSO_DATABASES_TABLE = "turso_databases";
var HEALTH_PROBE_SCHEMA = `CREATE TABLE IF NOT EXISTS ${HEALTH_PROBE_TABLE} (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  marker TEXT NOT NULL UNIQUE,
  payload TEXT NOT NULL,
  created_at TEXT NOT NULL
);`.trim();
var HEARTBEATS_TABLE_DDL = `CREATE TABLE IF NOT EXISTS ${HEARTBEATS_TABLE} (
  client_id TEXT PRIMARY KEY,
  panel_version TEXT NOT NULL DEFAULT '',
  logger_version TEXT NOT NULL DEFAULT '',
  last_seen TEXT NOT NULL,
  updated_at TEXT NOT NULL
);`.trim();
var HEARTBEATS_INDEX_DDL = `CREATE INDEX IF NOT EXISTS idx_${HEARTBEATS_TABLE}_seen ON ${HEARTBEATS_TABLE}(updated_at);`.trim();
var HEARTBEATS_SCHEMA = `${HEARTBEATS_TABLE_DDL}
${HEARTBEATS_INDEX_DDL}`;
var DEVICES_TABLE_DDL = `CREATE TABLE IF NOT EXISTS ${DEVICES_TABLE} (
  device_id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  username TEXT NOT NULL DEFAULT '',
  ip TEXT NOT NULL DEFAULT '',
  panel_version TEXT NOT NULL DEFAULT '',
  logger_version TEXT NOT NULL DEFAULT '',
  config_status TEXT NOT NULL DEFAULT 'failed',
  refresh_seconds INTEGER NOT NULL DEFAULT 0,
  last_online_time TEXT NOT NULL DEFAULT '',
  first_seen TEXT NOT NULL DEFAULT '',
  updated_at TEXT NOT NULL,
  device_type TEXT NOT NULL DEFAULT '',
  platform_params TEXT NOT NULL DEFAULT '',
  resources TEXT NOT NULL DEFAULT ''
);`.trim();
var DEVICES_INDEX_DDL = `CREATE INDEX IF NOT EXISTS idx_${DEVICES_TABLE}_online ON ${DEVICES_TABLE}(last_online_time);`.trim();
var DEVICES_SCHEMA = `${DEVICES_TABLE_DDL}
${DEVICES_INDEX_DDL}`;
var USER_GROUPS_TABLE_DDL = `CREATE TABLE IF NOT EXISTS ${USER_GROUPS_TABLE} (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  permissions TEXT NOT NULL DEFAULT '{}',
  -- v12\uFF1A1 = \u7CFB\u7EDF\u9ED8\u8BA4\u7EC4\uFF08\u8D85\u7EA7\u7BA1\u7406\u5458 / \u666E\u901A\u7528\u6237 / \u6E38\u5BA2 / \u7981\u7528\uFF09\u2014\u2014\u4E0D\u53EF\u5220\u9664\uFF0C
  --     \u540D\u5B57\u56FA\u5B9A\uFF0C\u6743\u9650\u4E0E\u666E\u901A\u7EC4\u4E00\u6837\u53EF\u914D\uFF08\u65B0\u7528\u6237\u52A0\u5165\u65F6\u7684\u9ED8\u8BA4\u529F\u80FD\u9650\u5236\uFF09
  is_system INTEGER NOT NULL DEFAULT 0,
  -- v20\uFF1A\u7EC4\u7EE7\u627F\uFF08T33-6 #137\uFF0Cepic AC-2\uFF09\u2014\u2014\u7236\u7EC4\uFF1B\u6743\u9650\u5408\u5E76\u5E8F\u300C\u7956\u5148\u7EC4\u2190\u672C\u7EC4\u2190\u89D2\u8272\u2190\u7528\u6237\u300D\uFF0C
  --     \u5199\u5165\u4FA7\u6821\u9A8C\u81EA\u73AF / \u73AF / \u6DF1\u5EA6\u4E0A\u9650\uFF08\u89C1 _utils/users/groups.js\uFF09
  parent_id INTEGER REFERENCES ${USER_GROUPS_TABLE}(id),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);`.trim();
var USER_GROUPS_PARENT_INDEX_DDL = `CREATE INDEX IF NOT EXISTS idx_user_groups_parent ON ${USER_GROUPS_TABLE}(parent_id);`.trim();
var FEATURE_ENTITLEMENTS_TABLE = "feature_entitlements";
var FEATURE_ENTITLEMENTS_TABLE_DDL = `CREATE TABLE IF NOT EXISTS ${FEATURE_ENTITLEMENTS_TABLE} (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  subject_type TEXT NOT NULL CHECK (subject_type IN ('user','group','role')),
  subject_id INTEGER NOT NULL,
  feature TEXT NOT NULL,
  quota_total INTEGER NOT NULL DEFAULT 0,
  quota_used INTEGER NOT NULL DEFAULT 0,
  window_key TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE (subject_type, subject_id, feature, window_key)
);`.trim();
var FEATURE_ENTITLEMENTS_SCHEMA = FEATURE_ENTITLEMENTS_TABLE_DDL;
var FEATURE_ENTITLEMENTS_INDEX_DDL = `CREATE INDEX IF NOT EXISTS idx_feature_entitlements_subject ON ${FEATURE_ENTITLEMENTS_TABLE}(subject_type, subject_id);`.trim();
var USER_ROLES_TABLE_DDL = `CREATE TABLE IF NOT EXISTS ${USER_ROLES_TABLE} (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  permissions TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);`.trim();
var AUDIT_LOGS_TABLE = "audit_logs";
var AUDIT_LOGS_TABLE_DDL = `CREATE TABLE IF NOT EXISTS ${AUDIT_LOGS_TABLE} (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  actor_id INTEGER,
  actor_label TEXT NOT NULL DEFAULT '',
  action TEXT NOT NULL,
  object_type TEXT NOT NULL DEFAULT '',
  object_id TEXT NOT NULL DEFAULT '',
  object_label TEXT NOT NULL DEFAULT '',
  summary TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL
);`.trim();
var AUDIT_LOGS_INDEX_DDL = `CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON ${AUDIT_LOGS_TABLE}(created_at DESC);`.trim();
var FEATURE_ROLLOUTS_TABLE = "feature_rollouts";
var FEATURE_ROLLOUTS_TABLE_DDL = `CREATE TABLE IF NOT EXISTS ${FEATURE_ROLLOUTS_TABLE} (
  feature TEXT PRIMARY KEY,
  config TEXT NOT NULL,
  updated_at TEXT NOT NULL
);`.trim();
var FEATURE_ROLLOUTS_SCHEMA = FEATURE_ROLLOUTS_TABLE_DDL;
var EXPORT_POLICIES_TABLE = "export_policies";
var EXPORT_POLICIES_TABLE_DDL = `CREATE TABLE IF NOT EXISTS ${EXPORT_POLICIES_TABLE} (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  policy_key TEXT NOT NULL UNIQUE,
  label TEXT NOT NULL DEFAULT '',
  emoji TEXT NOT NULL DEFAULT '',
  is_builtin INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0,
  gist_enabled INTEGER NOT NULL DEFAULT 0,
  gist_url TEXT NOT NULL DEFAULT '',
  sync_minutes INTEGER NOT NULL DEFAULT 0,
  group_name TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);`.trim();
var EXPORT_POLICIES_INDEX_DDL = `CREATE INDEX IF NOT EXISTS idx_${EXPORT_POLICIES_TABLE}_sort ON ${EXPORT_POLICIES_TABLE}(sort_order, id);`.trim();
var USERS_TABLE_DDL = `CREATE TABLE IF NOT EXISTS ${USERS_TABLE} (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL DEFAULT '',
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  group_id INTEGER,
  status TEXT NOT NULL DEFAULT 'active',
  permissions TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  last_login_at TEXT NOT NULL DEFAULT '',
  user_key_hash TEXT NOT NULL DEFAULT '',
  user_key_preview TEXT NOT NULL DEFAULT '',
  user_key_created_at TEXT NOT NULL DEFAULT '',
  user_key_last_used_at TEXT NOT NULL DEFAULT '',
  uid TEXT NOT NULL DEFAULT '',
  key_quota_total INTEGER NOT NULL DEFAULT 0,
  key_quota_used INTEGER NOT NULL DEFAULT 0,
  key_issued_at TEXT NOT NULL DEFAULT '',
  key_issue_secret TEXT NOT NULL DEFAULT '',
  -- v14\uFF1A1 = \u5185\u7F6E\u8D26\u53F7\uFF08\u9996\u6B21\u521D\u59CB\u5316\u7BA1\u7406\u5458\u540E\u81EA\u52A8\u79CD\u5165\u7684 test \u8C03\u8BD5\u8D26\u53F7\uFF09\u2014\u2014
  --     \u4E0E\u666E\u901A\u6CE8\u518C\u7528\u6237\u540C\u6743\u540C\u53EF\u7F16\u8F91\uFF0C\u552F\u4E00\u5DEE\u5F02\u662F\u4E0D\u53EF\u5220\u9664
  is_builtin INTEGER NOT NULL DEFAULT 0
);`.trim();
var AUTH_SESSIONS_TABLE_DDL = `CREATE TABLE IF NOT EXISTS ${AUTH_SESSIONS_TABLE} (
  token_hash TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  last_used_at TEXT NOT NULL,
  user_agent TEXT NOT NULL DEFAULT ''
);`.trim();
var AUTH_INDEX_STATEMENTS = [
  `CREATE INDEX IF NOT EXISTS idx_${AUTH_SESSIONS_TABLE}_user ON ${AUTH_SESSIONS_TABLE}(user_id)`,
  `CREATE INDEX IF NOT EXISTS idx_${AUTH_SESSIONS_TABLE}_expires ON ${AUTH_SESSIONS_TABLE}(expires_at)`,
  `CREATE INDEX IF NOT EXISTS idx_${USERS_TABLE}_group ON ${USERS_TABLE}(group_id)`,
  // v9：UID 唯一性（部分索引，空串 = 未设置不参与唯一约束）
  `CREATE UNIQUE INDEX IF NOT EXISTS idx_${USERS_TABLE}_uid ON ${USERS_TABLE}(uid) WHERE uid != ''`,
  // v10：user_key_hash 查询索引——findUserByKeyHash 在每次密钥鉴权都执行，
  // 用户量不大时全表扫描也能忍，但索引的写入成本为零、读取收益是确定的
  `CREATE INDEX IF NOT EXISTS idx_${USERS_TABLE}_key_hash ON ${USERS_TABLE}(user_key_hash)`
];
var AUTH_SCHEMA = [
  USER_GROUPS_TABLE_DDL,
  USERS_TABLE_DDL,
  AUTH_SESSIONS_TABLE_DDL,
  USER_ROLES_TABLE_DDL,
  ...AUTH_INDEX_STATEMENTS
].join("\n");
var USER_CHANNELS_TABLE_DDL = `CREATE TABLE IF NOT EXISTS ${USER_CHANNELS_TABLE} (
  channel_id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  client_id TEXT NOT NULL DEFAULT '',
  device_id TEXT NOT NULL DEFAULT '',
  client_version TEXT NOT NULL DEFAULT '',
  ip TEXT NOT NULL DEFAULT '',
  user_agent TEXT NOT NULL DEFAULT '',
  refresh_seconds INTEGER NOT NULL DEFAULT 0,
  last_active_time TEXT NOT NULL DEFAULT '',
  connected_at TEXT NOT NULL DEFAULT '',
  updated_at TEXT NOT NULL DEFAULT ''
);`.trim();
var USER_CHANNELS_INDEX_STATEMENTS = [
  `CREATE INDEX IF NOT EXISTS idx_${USER_CHANNELS_TABLE}_user ON ${USER_CHANNELS_TABLE}(user_id)`,
  `CREATE INDEX IF NOT EXISTS idx_${USER_CHANNELS_TABLE}_active ON ${USER_CHANNELS_TABLE}(last_active_time)`
];
var USER_CHANNELS_SCHEMA = [
  USER_CHANNELS_TABLE_DDL,
  ...USER_CHANNELS_INDEX_STATEMENTS
].join("\n");
var RULE_OVERRIDES_TABLE_DDL = `CREATE TABLE IF NOT EXISTS ${RULE_OVERRIDES_TABLE} (
  hostname TEXT PRIMARY KEY,
  policy TEXT NOT NULL DEFAULT '',
  comment TEXT NOT NULL DEFAULT '',
  updated_at TEXT NOT NULL DEFAULT ''
);`.trim();
var TURSO_DATABASES_TABLE_DDL = `CREATE TABLE IF NOT EXISTS ${TURSO_DATABASES_TABLE} (
  name TEXT PRIMARY KEY,
  hostname TEXT NOT NULL DEFAULT '',
  region TEXT NOT NULL DEFAULT '',
  group_name TEXT NOT NULL DEFAULT '',
  token TEXT NOT NULL DEFAULT '',
  token_authorization TEXT NOT NULL DEFAULT 'full-access',
  note TEXT NOT NULL DEFAULT '',
  initialized INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT '',
  updated_at TEXT NOT NULL DEFAULT ''
);`.trim();
var DOMAIN_QUERIES_TABLE_DDL = `CREATE TABLE IF NOT EXISTS ${DOMAIN_QUERIES_TABLE} (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  domain TEXT NOT NULL,
  action TEXT NOT NULL,
  confidence REAL NOT NULL DEFAULT 0,
  model_name TEXT NOT NULL DEFAULT '',
  comment TEXT NOT NULL DEFAULT '',
  kind TEXT NOT NULL DEFAULT 'ai',
  created_at TEXT NOT NULL
);`.trim();
var DOMAIN_SUMMARY_TABLE_DDL = `CREATE TABLE IF NOT EXISTS ${DOMAIN_SUMMARY_TABLE} (
  domain TEXT PRIMARY KEY,
  best_action TEXT NOT NULL DEFAULT '',
  direct_votes INTEGER NOT NULL DEFAULT 0,
  proxy_votes INTEGER NOT NULL DEFAULT 0,
  reject_votes INTEGER NOT NULL DEFAULT 0,
  avg_confidence REAL NOT NULL DEFAULT 0,
  last_checked_at TEXT NOT NULL DEFAULT '',
  cooldown_days INTEGER NOT NULL DEFAULT 7,
  latest_comment TEXT NOT NULL DEFAULT '',
  pinned_comment TEXT NOT NULL DEFAULT '',
  pinned_kind TEXT NOT NULL DEFAULT ''
);`.trim();
var DOMAIN_INDEX_STATEMENTS = [
  `CREATE INDEX IF NOT EXISTS idx_${DOMAIN_QUERIES_TABLE}_domain ON ${DOMAIN_QUERIES_TABLE}(domain)`,
  `CREATE INDEX IF NOT EXISTS idx_${DOMAIN_QUERIES_TABLE}_time ON ${DOMAIN_QUERIES_TABLE}(created_at)`,
  // v10：票数聚合按 domain 过滤后还要按 kind='ai' 过滤，复合索引让聚合只扫 ai 子集
  `CREATE INDEX IF NOT EXISTS idx_${DOMAIN_QUERIES_TABLE}_kind_domain ON ${DOMAIN_QUERIES_TABLE}(kind, domain)`,
  `CREATE INDEX IF NOT EXISTS idx_${DOMAIN_SUMMARY_TABLE}_checked ON ${DOMAIN_SUMMARY_TABLE}(last_checked_at)`
];
var DOMAIN_VERDICT_SCHEMA = [
  DOMAIN_QUERIES_TABLE_DDL,
  DOMAIN_SUMMARY_TABLE_DDL,
  ...DOMAIN_INDEX_STATEMENTS
].join("\n");
var DEVICES_TYPE_COLUMN_DDL = [
  `ALTER TABLE ${DEVICES_TABLE} ADD COLUMN device_type TEXT NOT NULL DEFAULT ''`,
  `ALTER TABLE ${DEVICES_TABLE} ADD COLUMN platform_params TEXT NOT NULL DEFAULT ''`
];
var DEVICES_TYPE_INDEX_DDL = `CREATE INDEX IF NOT EXISTS idx_${DEVICES_TABLE}_type ON ${DEVICES_TABLE}(device_type);`.trim();
var DB_META_SCHEMA = `CREATE TABLE IF NOT EXISTS ${DB_META_TABLE} (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);`.trim();
var BASE_DDL = [
  `CREATE TABLE IF NOT EXISTS surge_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    hostname TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'DOMAIN-SUFFIX',
    value TEXT NOT NULL DEFAULT '',
    params TEXT NOT NULL DEFAULT '',
    source TEXT NOT NULL DEFAULT '',
    ip TEXT NOT NULL DEFAULT '',
    username TEXT NOT NULL DEFAULT '',
    first_time TEXT NOT NULL DEFAULT '',
    time TEXT NOT NULL,
    count INTEGER NOT NULL DEFAULT 1,
    manual_edited INTEGER NOT NULL DEFAULT 0,
    ai_processed INTEGER NOT NULL DEFAULT 0,
    match_key TEXT NOT NULL DEFAULT ''
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS uniq_surge_logs_hostname ON surge_logs(hostname)`,
  `CREATE INDEX IF NOT EXISTS idx_surge_logs_time ON surge_logs(time)`,
  `CREATE INDEX IF NOT EXISTS idx_surge_logs_type ON surge_logs(type)`,
  `CREATE INDEX IF NOT EXISTS idx_surge_logs_source ON surge_logs(source)`,
  `CREATE INDEX IF NOT EXISTS idx_surge_logs_username ON surge_logs(username)`,
  // v10：判定键（value 非空 ? value : hostname）索引——判定候选 / 汇总 JOIN /
  // 策略回写三处 CASE 表达式此前无法走索引，逐域名全表扫描（审计 P2-12 / P2-21）
  `CREATE INDEX IF NOT EXISTS idx_surge_logs_match_key ON surge_logs(match_key)`,
  `CREATE TABLE IF NOT EXISTS app_prefs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    setting_key TEXT NOT NULL,
    setting_value TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    UNIQUE(user_id, setting_key)
  )`,
  `CREATE INDEX IF NOT EXISTS idx_app_prefs_user ON app_prefs(user_id)`,
  `CREATE TABLE IF NOT EXISTS rules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    domain TEXT NOT NULL,
    action TEXT NOT NULL,
    remark TEXT
  )`,
  `CREATE INDEX IF NOT EXISTS idx_rules_domain ON rules(domain)`,
  `CREATE TABLE IF NOT EXISTS subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT NOT NULL,
    name TEXT NOT NULL DEFAULT '',
    -- v12\uFF1A\u6BCF\u6761\u8BA2\u9605\u5355\u72EC\u7684\u7B56\u7565\u2014\u2014URL \u89C4\u5219\u8BA2\u9605\u89E3\u6790\u65F6\u53EF\u6307\u5B9A\uFF0C
    --     \u7A7A = \u667A\u80FD\u8BC6\u522B\uFF08\u4FDD\u7559\u8BA2\u9605\u5404\u884C\u81EA\u5E26\u7B56\u7565\uFF09
    policy TEXT NOT NULL DEFAULT '',
    rule_count INTEGER NOT NULL DEFAULT 0,
    last_status TEXT NOT NULL DEFAULT '',
    last_fetched_at TEXT NOT NULL DEFAULT '',
    updated_at TEXT NOT NULL,
    UNIQUE(url)
  )`,
  `CREATE INDEX IF NOT EXISTS idx_subscriptions_time ON subscriptions(updated_at)`,
  DB_META_SCHEMA,
  HEALTH_PROBE_SCHEMA,
  HEARTBEATS_TABLE_DDL,
  HEARTBEATS_INDEX_DDL,
  DEVICES_TABLE_DDL,
  DEVICES_INDEX_DDL,
  DEVICES_TYPE_INDEX_DDL,
  USER_GROUPS_TABLE_DDL,
  USERS_TABLE_DDL,
  AUTH_SESSIONS_TABLE_DDL,
  ...AUTH_INDEX_STATEMENTS,
  USER_CHANNELS_TABLE_DDL,
  ...USER_CHANNELS_INDEX_STATEMENTS,
  DOMAIN_QUERIES_TABLE_DDL,
  DOMAIN_SUMMARY_TABLE_DDL,
  ...DOMAIN_INDEX_STATEMENTS,
  RULE_OVERRIDES_TABLE_DDL,
  TURSO_DATABASES_TABLE_DDL,
  EXPORT_POLICIES_TABLE_DDL,
  EXPORT_POLICIES_INDEX_DDL,
  USER_ROLES_TABLE_DDL,
  AUDIT_LOGS_TABLE_DDL,
  AUDIT_LOGS_INDEX_DDL,
  FEATURE_ROLLOUTS_TABLE_DDL,
  USER_GROUPS_PARENT_INDEX_DDL,
  FEATURE_ENTITLEMENTS_TABLE_DDL,
  FEATURE_ENTITLEMENTS_INDEX_DDL
];
var MIGRATION_STEPS = {
  1: [DB_META_SCHEMA, HEALTH_PROBE_SCHEMA, HEARTBEATS_TABLE_DDL, HEARTBEATS_INDEX_DDL],
  2: [
    `ALTER TABLE surge_logs ADD COLUMN ip TEXT NOT NULL DEFAULT ''`,
    `ALTER TABLE surge_logs ADD COLUMN username TEXT NOT NULL DEFAULT ''`,
    `CREATE INDEX IF NOT EXISTS idx_surge_logs_username ON surge_logs(username)`,
    DEVICES_TABLE_DDL,
    DEVICES_INDEX_DDL
  ],
  3: [
    // v3：AI 分流调度所需标记。manual_edited = ✏️ 快速编辑过（手动调整，AI 不改写其策略）；
    // ai_processed = AI 已处理过（防止自动化每轮重复分析同一条规则）
    `ALTER TABLE surge_logs ADD COLUMN manual_edited INTEGER NOT NULL DEFAULT 0`,
    `ALTER TABLE surge_logs ADD COLUMN ai_processed INTEGER NOT NULL DEFAULT 0`
  ],
  4: [
    // v4：多用户权限体系三表 + 设备类型多维度列（设备五类型 profile 适配）。
    // devices 的 device_type / platform_params 用 ALTER 补列：v3 旧库的 devices 表
    // 由 DEVICES_TABLE_DDL（v4 起含新列）CREATE IF NOT EXISTS 建的，列不存在必须补。
    ...DEVICES_TYPE_COLUMN_DDL,
    DEVICES_TYPE_INDEX_DDL,
    USER_GROUPS_TABLE_DDL,
    USERS_TABLE_DDL,
    AUTH_SESSIONS_TABLE_DDL,
    ...AUTH_INDEX_STATEMENTS
  ],
  5: [
    // v5：AI 分流判定双表 —— domain_queries 历史流水 + domain_summary 汇总
    //（票数 / 最高方案 / 平均置信度 / 动态冷却）。全新库走 BASE_DDL，历史库从这里补建。
    DOMAIN_QUERIES_TABLE_DDL,
    DOMAIN_SUMMARY_TABLE_DDL,
    ...DOMAIN_INDEX_STATEMENTS
  ],
  6: [
    // v6：用户凭证与用户级连接 —— users 补 user_key_* 四列（Key 只存 SHA-256），
    // 新表 user_channels 记录账号的客户端通道（版本 / IP / 最后活跃）。
    // 存量用户 user_key_hash = '' 视为「未签发 Key」，界面提供一键生成；
    // users 四列对全新库已在 USERS_TABLE_DDL 里，ALTER 对旧库幂等（duplicate column 容忍）。
    `ALTER TABLE ${USERS_TABLE} ADD COLUMN user_key_hash TEXT NOT NULL DEFAULT ''`,
    `ALTER TABLE ${USERS_TABLE} ADD COLUMN user_key_preview TEXT NOT NULL DEFAULT ''`,
    `ALTER TABLE ${USERS_TABLE} ADD COLUMN user_key_created_at TEXT NOT NULL DEFAULT ''`,
    `ALTER TABLE ${USERS_TABLE} ADD COLUMN user_key_last_used_at TEXT NOT NULL DEFAULT ''`,
    USER_CHANNELS_TABLE_DDL,
    ...USER_CHANNELS_INDEX_STATEMENTS
  ],
  7: [
    // v7：规则表「策略 / 注释」物理字段下线，改由 AI 判定与置顶覆盖动态展示。
    // 迁移语义（单条 SQL，Turso 管道约束）：
    //   · manual_edited = 1 的行（用户亲手编辑过）与「没有 AI 汇总」的行（粘贴 / FINAL /
    //     从未被判定）把现有 policy 搬进 rule_overrides，避免字段删除后丢策略；
    //   · manual 行的注释一并搬入（AI 补的注释本就留在 domain_summary.latest_comment）；
    //   · 其余行（有 AI 汇总且非手动）策略本就来自 AI 回写，随物理列一起下线。
    RULE_OVERRIDES_TABLE_DDL,
    `INSERT INTO ${RULE_OVERRIDES_TABLE} (hostname, policy, comment, updated_at)
     SELECT s.hostname, s.policy,
            CASE WHEN s.manual_edited = 1 THEN COALESCE(s.comment, '') ELSE '' END,
            ''
       FROM surge_logs s
       WHERE s.manual_edited = 1
          OR NOT EXISTS (
            SELECT 1 FROM domain_summary d
             WHERE d.domain = (CASE WHEN TRIM(COALESCE(s.value, '')) = '' THEN s.hostname ELSE s.value END)
          )
       ON CONFLICT(hostname) DO UPDATE SET
         policy = excluded.policy,
         comment = CASE WHEN excluded.comment != '' THEN excluded.comment ELSE ${RULE_OVERRIDES_TABLE}.comment END`,
    // 建了索引的列不能 DROP：surge_logs 的索引都不涉及 policy / comment，可直接删。
    // DROP COLUMN 对全新库（BASE_DDL 已无这两列）报 no such column，migrateLegacy 容忍。
    `ALTER TABLE surge_logs DROP COLUMN policy`,
    `ALTER TABLE surge_logs DROP COLUMN comment`,
    TURSO_DATABASES_TABLE_DDL
  ],
  8: [
    // v8：置顶注释迁移进「AI 查询记录历史」—— domain_queries 补 kind 列区分
    // 记录来源（ai = 真实判定 / manual = 用户手写 / preset = 添加域名时自动插入），
    // domain_summary 补 pinned_comment / pinned_kind 展示指针。存量行的 kind 经
    // DEFAULT 'ai' 回填，汇总表两列默认空串，无需数据搬迁。
    `ALTER TABLE ${DOMAIN_QUERIES_TABLE} ADD COLUMN kind TEXT NOT NULL DEFAULT 'ai'`,
    `ALTER TABLE ${DOMAIN_SUMMARY_TABLE} ADD COLUMN pinned_comment TEXT NOT NULL DEFAULT ''`,
    `ALTER TABLE ${DOMAIN_SUMMARY_TABLE} ADD COLUMN pinned_kind TEXT NOT NULL DEFAULT ''`
  ],
  9: [
    // v9：动态 UID 凭证下发 —— users 补 uid（简便 ID，Surge 模组参数 FINAL_UID 填它
    // 自动换取用户密钥）与 key_quota_total / key_quota_used（固定调用额度，默认 10 次，
    // 耗尽凭证自动失效，管理员重置后恢复）。存量用户 uid = username 回填（用户名本就
    // 是唯一简便 ID），取钥按 uid 命中无需任何额外配置。uid 的唯一索引用部分索引
    // （WHERE uid != ''）：SQLite 唯一索引对多个空串会冲突，空串表示「未设置」。
    `ALTER TABLE ${USERS_TABLE} ADD COLUMN uid TEXT NOT NULL DEFAULT ''`,
    `ALTER TABLE ${USERS_TABLE} ADD COLUMN key_quota_total INTEGER NOT NULL DEFAULT 10`,
    `ALTER TABLE ${USERS_TABLE} ADD COLUMN key_quota_used INTEGER NOT NULL DEFAULT 0`,
    `UPDATE ${USERS_TABLE} SET uid = username WHERE uid = '' AND username != ''`,
    `CREATE UNIQUE INDEX IF NOT EXISTS idx_${USERS_TABLE}_uid ON ${USERS_TABLE}(uid) WHERE uid != ''`
  ],
  10: [
    // v10（2026-10-19 全栈审计落地）：索引补全 + 判定键列 + 取钥节流与二因子 + 额度语义。
    // 全部语句幂等（ALTER 的 duplicate column 由 tolerantExecute 容忍，CREATE INDEX 带
    // IF NOT EXISTS，UPDATE 全表一次），已提前手工执行过的库再来一次也安全。
    // 1) users.user_key_hash 查询索引（每次密钥鉴权都执行的查找）
    `CREATE INDEX IF NOT EXISTS idx_${USERS_TABLE}_key_hash ON ${USERS_TABLE}(user_key_hash)`,
    // 2) surge_logs.match_key 判定键列（value 非空 ? value : hostname）：回填一次，
    //    其后由 hit / edit / batch 三个写入点维护；读取端（判定候选 JOIN、汇总 JOIN、
    //    策略回写）改用本列，消除三处 CASE 表达式无法走索引的全表扫描（P2-12 / P2-21）
    `ALTER TABLE surge_logs ADD COLUMN match_key TEXT NOT NULL DEFAULT ''`,
    `UPDATE surge_logs SET match_key = CASE WHEN TRIM(COALESCE(value, '')) = '' THEN hostname ELSE value END`,
    `CREATE INDEX IF NOT EXISTS idx_surge_logs_match_key ON surge_logs(match_key)`,
    // 3) users 取钥节流时间戳（UID 取钥 60 秒轮换节流，跨 isolate 生效）与取钥二因子
    //    密钥（KEY_ISSUE_REQUIRE_SECRET=1 时启用，空 = 未启用，兼容单因子流程）（P1-1）
    `ALTER TABLE ${USERS_TABLE} ADD COLUMN key_issued_at TEXT NOT NULL DEFAULT ''`,
    `ALTER TABLE ${USERS_TABLE} ADD COLUMN key_issue_secret TEXT NOT NULL DEFAULT ''`,
    // 4) 额度语义改为「0 = 不限」（P1-2）：默认 10 次在心跳节奏下必然耗尽。只迁移
    //    「默认值且从未消耗」的行——管理员显式设过、已有消耗的额度保留原值
    `UPDATE ${USERS_TABLE} SET key_quota_total = 0 WHERE key_quota_total = 10 AND key_quota_used = 0`,
    // 5) domain_queries(kind, domain) 复合索引：票数聚合只扫 ai 子集
    `CREATE INDEX IF NOT EXISTS idx_${DOMAIN_QUERIES_TABLE}_kind_domain ON ${DOMAIN_QUERIES_TABLE}(kind, domain)`
  ],
  11: [
    // v11：外部资源订阅快照列——Surge 面板刷新时经本地 HTTP API（/v1/external_resources）
    // 盘点本机的外部资源（导出规则集 / 脚本），把「订阅了哪些策略 + 各自 updatedAt +
    // 服务端修订号」随心跳头（X-Final-Resources）上报，服务端快照入库。
    // 网页「用户与设备」据此展示每台设备的订阅状态与更新状态（最新 / 需要更新）。
    // 快照为整体覆盖写入（最新一次盘点为准），不做键级合并。
    `ALTER TABLE ${DEVICES_TABLE} ADD COLUMN resources TEXT NOT NULL DEFAULT ''`
  ],
  12: [
    // v12：用户组系统默认项 + 导出动态策略 + 订阅独立策略。
    // 1) user_groups.is_system：四个系统默认组（超级管理员 / 普通用户 / 游客未登录 / 禁用）
    //    作为标准起点，不可删除、名字固定，权限照常可配。
    // 2) export_policies：固定订阅地址的策略按钮从「写死 PROXY / DIRECT / REJECT」
    //    改为数据驱动——REJECT 是唯一内置（不可删），其余可删可加（自定义策略组）。
    // 3) subscriptions.policy：URL 规则订阅解析时可为每条订阅单独指定策略，
    //    填充进批量编辑框时作为默认策略覆盖（未写策略的行生效）。
    // 种子一律 INSERT OR IGNORE：全新库走 BASE_DDL 不经这里，运行时另有兜底种子
    //（users.js / export-policies 路由各自幂等补种），两条路径都安全。
    `ALTER TABLE ${USER_GROUPS_TABLE} ADD COLUMN is_system INTEGER NOT NULL DEFAULT 0`,
    `INSERT OR IGNORE INTO ${USER_GROUPS_TABLE} (name, description, permissions, is_system, created_at, updated_at)
      VALUES ('\u8D85\u7EA7\u7BA1\u7406\u5458 (Admin)', '\u7CFB\u7EDF\u9ED8\u8BA4\u7EC4\uFF1A\u8D85\u7EA7\u7BA1\u7406\u5458\u7684\u9ED8\u8BA4\u6743\u9650\u57FA\u7EBF', '{}', 1, datetime('now'), datetime('now'))`,
    `INSERT OR IGNORE INTO ${USER_GROUPS_TABLE} (name, description, permissions, is_system, created_at, updated_at)
      VALUES ('\u666E\u901A\u7528\u6237 (Regular User)', '\u7CFB\u7EDF\u9ED8\u8BA4\u7EC4\uFF1A\u666E\u901A\u7528\u6237\u7684\u9ED8\u8BA4\u6743\u9650\u57FA\u7EBF', '{}', 1, datetime('now'), datetime('now'))`,
    `INSERT OR IGNORE INTO ${USER_GROUPS_TABLE} (name, description, permissions, is_system, created_at, updated_at)
      VALUES ('\u6E38\u5BA2 / \u672A\u767B\u5F55 (Guest)', '\u7CFB\u7EDF\u9ED8\u8BA4\u7EC4\uFF1A\u6E38\u5BA2\u4E0E\u672A\u767B\u5F55\u8EAB\u4EFD\u7684\u529F\u80FD\u57FA\u7EBF', '{}', 1, datetime('now'), datetime('now'))`,
    `INSERT OR IGNORE INTO ${USER_GROUPS_TABLE} (name, description, permissions, is_system, created_at, updated_at)
      VALUES ('\u7981\u7528', '\u7CFB\u7EDF\u9ED8\u8BA4\u7EC4\uFF1A\u53D7\u9650\u8EAB\u4EFD\u7684\u9ED8\u8BA4\u6743\u9650\uFF08\u7981\u7528\u5199\u64CD\u4F5C\uFF09', '{"features":{"logs.write":"deny","rules.batch":"deny","rules.quickedit":"deny"}}', 1, datetime('now'), datetime('now'))`,
    EXPORT_POLICIES_TABLE_DDL,
    EXPORT_POLICIES_INDEX_DDL,
    `INSERT OR IGNORE INTO ${EXPORT_POLICIES_TABLE} (policy_key, label, emoji, is_builtin, sort_order, created_at, updated_at)
      VALUES ('REJECT', 'REJECT', '\u{1F534}', 1, 0, datetime('now'), datetime('now'))`,
    `INSERT OR IGNORE INTO ${EXPORT_POLICIES_TABLE} (policy_key, label, emoji, is_builtin, sort_order, created_at, updated_at)
      VALUES ('PROXY', 'PROXY', '\u{1F310}', 0, 1, datetime('now'), datetime('now'))`,
    `INSERT OR IGNORE INTO ${EXPORT_POLICIES_TABLE} (policy_key, label, emoji, is_builtin, sort_order, created_at, updated_at)
      VALUES ('DIRECT', 'DIRECT', '\u{1F7E2}', 0, 2, datetime('now'), datetime('now'))`,
    `ALTER TABLE subscriptions ADD COLUMN policy TEXT NOT NULL DEFAULT ''`
  ],
  13: [
    // v13：自定义角色表——users.role 从硬编码枚举（admin | user）扩展为
    // 「内置 admin / user + 本表自定义角色名」。角色级 permissions 在鉴权判定时
    // 按「组 ← 角色 ← 用户」合并（auth/policy.js）；超级管理员自适应全开不受影响。
    // 内置角色不落表（路由层合成，不可增删改），旧库补建空表即完成迁移。
    USER_ROLES_TABLE_DDL
  ],
  14: [
    // v14：内置测试账号（v1.27）——users 补 is_builtin 列。首次初始化管理员后自动
    // 种入内置调试账号（角色 test、用户组 test，均内置），与普通注册用户同权同可
    // 编辑，唯一差异是不可删除（路由层按 is_builtin 拒绝 DELETE）；v1.34 起口令为
    // 一次性随机生成（明文仅随种入当次响应发放），不再使用源码固定口令。
    // 账号本身的种子走运行时幂等补种（users.js ensureBuiltinTestUser），不进迁移。
    `ALTER TABLE ${USERS_TABLE} ADD COLUMN is_builtin INTEGER NOT NULL DEFAULT 0`
  ],
  15: [
    // v15：Gist 定时联动（v1.29 T15 / 工单 #48）——export_policies 补三列：
    //   gist_enabled  「上传至 Gist」开关（勾选后复制地址切到 Gist Raw 链接）；
    //   gist_url      外部连接地址（上传成功回写 Raw 链接，或手填他机分享的外链，
    //                 触发刷新按 merge 语义拉取最新内容）；
    //   sync_minutes  定时频率（分钟，0 = 关闭定时）。
    // Gist Token 不落库：只随请求中转（x-gist-token 头 / body），走代理接口上送。
    `ALTER TABLE ${EXPORT_POLICIES_TABLE} ADD COLUMN gist_enabled INTEGER NOT NULL DEFAULT 0`,
    `ALTER TABLE ${EXPORT_POLICIES_TABLE} ADD COLUMN gist_url TEXT NOT NULL DEFAULT ''`,
    `ALTER TABLE ${EXPORT_POLICIES_TABLE} ADD COLUMN sync_minutes INTEGER NOT NULL DEFAULT 0`
  ],
  16: [
    // v16：策略组属性扩展（v1.31）——export_policies 补两列：
    //   group_name  策略分组名（首页策略组按它归组展示「分组名 + 策略组」，空 = 不分组）；
    //   icon        策略组图标地址（https 图标 URL；面板内置图标包
    //               ligeicon.json 自动解析后按名挑选，回填完整 URL）。
    `ALTER TABLE ${EXPORT_POLICIES_TABLE} ADD COLUMN group_name TEXT NOT NULL DEFAULT ''`,
    `ALTER TABLE ${EXPORT_POLICIES_TABLE} ADD COLUMN icon TEXT NOT NULL DEFAULT ''`
  ],
  17: [
    // v17：内置资产下线（T33 #117 第一片）——内置 test 账号与 'test' 系统组停止
    // 种入（种入侧已移除，全新部署不再出现）后的存量处置，数据一律保留：
    //   · role='test' 的存量账号默认禁用（status='disabled'，登录路径另有公开
    //     口令封堵双保险；管理员可改角色后重新启用）；
    //   · 'test' 系统组摘掉 is_system 保护，降为可删除的普通组（成员关系保留）。
    `UPDATE ${USERS_TABLE} SET status = 'disabled' WHERE role = 'test' AND status = 'active'`,
    `UPDATE ${USER_GROUPS_TABLE} SET is_system = 0 WHERE name = 'test' AND is_system = 1`
  ],
  18: [
    // v18：权限变更审计日志（T33-2 #133，epic AC-8）——用户/角色/组的增删改与
    // 权限变更落审计（摘要级：操作者/动作/对象/变更摘要，无明文口令与令牌）。
    // 全新库走 BASE_DDL 不经这里。
    AUDIT_LOGS_TABLE_DDL,
    AUDIT_LOGS_INDEX_DDL
  ],
  19: [
    // v19：特性灰度配置（T33-5 #136，epic AC-5）——三档目标（白名单/用户组/百分比）
    // 的 feature 级放量配置，判定并入 evaluateFeature 链（显式规则之后、默认之前）。
    FEATURE_ROLLOUTS_TABLE_DDL
  ],
  20: [
    // v20：RBAC 实体扩容（T33-6 #137，epic AC-2）——组继承（parent_id + 索引，
    // 存量组全部 NULL = 无父，数据不丢）与功能配额实体表（消费归 T33-7）。
    `ALTER TABLE ${USER_GROUPS_TABLE} ADD COLUMN parent_id INTEGER REFERENCES ${USER_GROUPS_TABLE}(id)`,
    USER_GROUPS_PARENT_INDEX_DDL,
    FEATURE_ENTITLEMENTS_TABLE_DDL,
    FEATURE_ENTITLEMENTS_INDEX_DDL
  ]
};
var LEGACY_MIGRATIONS = [`ALTER TABLE surge_logs ADD COLUMN first_time TEXT NOT NULL DEFAULT ''`];
var CORE_TABLES = [
  "surge_logs",
  "app_prefs",
  "subscriptions",
  "devices",
  "user_groups",
  "users",
  "auth_sessions",
  "user_channels",
  "domain_queries",
  "domain_summary",
  "rule_overrides",
  "turso_databases",
  "user_roles",
  "audit_logs",
  "feature_rollouts",
  "feature_entitlements"
];
async function detectMissingTables(db) {
  try {
    const rows = await db.execute(`SELECT name FROM sqlite_master WHERE type = 'table'`);
    const have = new Set(rows.map((row) => String(row.name)));
    return CORE_TABLES.filter((table3) => !have.has(table3));
  } catch {
    return [...CORE_TABLES];
  }
}
__name(detectMissingTables, "detectMissingTables");
async function repairSchema(db) {
  const missing = await detectMissingTables(db);
  if (!missing.length) {
    return { repaired: [], schemaVersion: await readSchemaVersion(db) };
  }
  await db.batch(BASE_DDL.map((sql) => ({ sql })));
  await writeSchemaVersion(db, DB_SCHEMA_VERSION);
  return { repaired: missing, schemaVersion: DB_SCHEMA_VERSION };
}
__name(repairSchema, "repairSchema");
async function tableExists(db, table3) {
  const rows = await db.execute(
    `SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?`,
    [table3]
  );
  return rows.length > 0;
}
__name(tableExists, "tableExists");
async function readSchemaVersion(db) {
  try {
    const rows = await db.execute(
      `SELECT value FROM ${DB_META_TABLE} WHERE key = 'schema_version'`
    );
    const value = Number(rows[0]?.value);
    return Number.isFinite(value) ? value : null;
  } catch (error3) {
    const text = String(error3?.message ?? "");
    if (/no such table/i.test(text)) return null;
    throw asDbError(error3);
  }
}
__name(readSchemaVersion, "readSchemaVersion");
async function writeSchemaVersion(db, version2) {
  await db.batch([
    {
      sql: `INSERT INTO ${DB_META_TABLE} (key, value) VALUES ('schema_version', ?)
            ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
      params: [String(version2)]
    }
  ]);
}
__name(writeSchemaVersion, "writeSchemaVersion");
async function tolerantExecute(db, sql) {
  try {
    await db.execute(sql);
  } catch (error3) {
    const text = String(error3?.message ?? "");
    if (!/table.*does not exist|no such table/i.test(text) && !/duplicate column name/i.test(text) && // v7 的 DROP COLUMN 在「列已被删过 / 建表时就没有」时也视为已完成
    !/no such column/i.test(text) && !/cannot drop/i.test(text)) {
      throw asDbError(error3);
    }
  }
}
__name(tolerantExecute, "tolerantExecute");
async function migrateLegacy(db) {
  for (const sql of LEGACY_MIGRATIONS) {
    await tolerantExecute(db, sql);
  }
  for (let target = 1; target <= DB_SCHEMA_VERSION; target += 1) {
    for (const sql of MIGRATION_STEPS[target] ?? []) {
      await tolerantExecute(db, sql);
    }
  }
}
__name(migrateLegacy, "migrateLegacy");
async function ensureSchema(db) {
  if (db._schemaReady) return;
  await db.batch([{ sql: DB_META_SCHEMA }]);
  const version2 = await readSchemaVersion(db);
  if (version2 == null) {
    if (await tableExists(db, "surge_logs")) {
      await migrateLegacy(db);
    } else {
      await db.batch(BASE_DDL.map((sql) => ({ sql })));
    }
    await writeSchemaVersion(db, DB_SCHEMA_VERSION);
  } else if (version2 < DB_SCHEMA_VERSION) {
    for (let target = version2 + 1; target <= DB_SCHEMA_VERSION; target += 1) {
      const steps = MIGRATION_STEPS[target] ?? [];
      if (steps.length) await db.batch(steps.map((sql) => ({ sql })));
      await writeSchemaVersion(db, target);
    }
  } else if (version2 > DB_SCHEMA_VERSION) {
    console.warn(
      `[db] \u6570\u636E\u5E93 schema \u7248\u672C (${version2}) \u6BD4\u4EE3\u7801\u671F\u671B (${DB_SCHEMA_VERSION}) \u65B0\uFF0C\u8BF7\u5347\u7EA7\u670D\u52A1\u7AEF\u90E8\u7F72`
    );
    db._schemaReady = true;
    return;
  }
  if ((await detectMissingTables(db)).length) {
    await repairSchema(db);
  }
  db._schemaReady = true;
}
__name(ensureSchema, "ensureSchema");
async function describeSchemaState(db, table3, requiredColumns) {
  try {
    if (!await tableExists(db, table3)) {
      return { ok: false, detail: `\u7F3A\u5C11\u6570\u636E\u8868 ${table3}` };
    }
    const columns = new Set(
      (await db.execute(`PRAGMA table_info(${table3})`)).map((row) => String(row.name))
    );
    const missing = requiredColumns.filter((col) => !columns.has(col));
    if (missing.length) {
      return { ok: false, detail: `\u8868 ${table3} \u7F3A\u5C11\u5217\uFF1A${missing.join(", ")}` };
    }
    return { ok: true, detail: `${table3} \u8868\u4E0E\u5FC5\u9700\u5217\u9F50\u5168` };
  } catch (error3) {
    return { ok: false, detail: `\u8868\u7ED3\u6784\u68C0\u67E5\u5931\u8D25\uFF1A${error3?.message ?? error3}` };
  }
}
__name(describeSchemaState, "describeSchemaState");

// _utils/auth/rollouts.js
var CACHE_TTL_MS = 3e4;
var cache = null;
var LIMITS = { whitelist: 100, groups: 50 };
function fnv1a(text) {
  let hash = 2166136261;
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}
__name(fnv1a, "fnv1a");
function rolloutBucket(username, feature) {
  return fnv1a(`${feature}:${String(username ?? "")}`) % 1e4 / 100;
}
__name(rolloutBucket, "rolloutBucket");
async function readRolloutConfigs(db) {
  if (cache && Date.now() - cache.at < CACHE_TTL_MS) return cache.value;
  const value = /* @__PURE__ */ new Map();
  try {
    const rows = await db.execute(`SELECT feature, config FROM ${FEATURE_ROLLOUTS_TABLE}`);
    for (const row of rows) {
      try {
        value.set(String(row.feature), JSON.parse(String(row.config ?? "{}")));
      } catch {
      }
    }
  } catch {
  }
  cache = { at: Date.now(), value };
  return value;
}
__name(readRolloutConfigs, "readRolloutConfigs");
function invalidateRolloutCache() {
  cache = null;
}
__name(invalidateRolloutCache, "invalidateRolloutCache");
async function readRollout(db, feature) {
  const configs = await readRolloutConfigs(db);
  return configs.get(feature) ?? null;
}
__name(readRollout, "readRollout");
async function listRollouts(db) {
  const rows = await db.execute(
    `SELECT feature, config, updated_at FROM ${FEATURE_ROLLOUTS_TABLE} ORDER BY feature`
  );
  return rows.map((row) => {
    let config2 = {};
    try {
      config2 = JSON.parse(String(row.config ?? "{}"));
    } catch {
    }
    return { feature: String(row.feature), config: config2, updatedAt: String(row.updated_at ?? "") };
  });
}
__name(listRollouts, "listRollouts");
async function writeRollout(db, feature, config2) {
  const now2 = (/* @__PURE__ */ new Date()).toISOString();
  await db.batch([
    {
      sql: `INSERT INTO ${FEATURE_ROLLOUTS_TABLE} (feature, config, updated_at)
          VALUES (?, ?, ?)
          ON CONFLICT(feature) DO UPDATE SET config = excluded.config, updated_at = excluded.updated_at`,
      params: [feature, JSON.stringify(config2), now2]
    }
  ]);
  invalidateRolloutCache();
  return { feature, config: config2, updatedAt: now2 };
}
__name(writeRollout, "writeRollout");
async function deleteRollout(db, feature) {
  const result = await db.batch([
    { sql: `DELETE FROM ${FEATURE_ROLLOUTS_TABLE} WHERE feature = ?`, params: [feature] }
  ]);
  invalidateRolloutCache();
  const first = Array.isArray(result) ? result[0] : result;
  return Number(first?.changes ?? first?.meta?.changes ?? 0) > 0;
}
__name(deleteRollout, "deleteRollout");
function validateRolloutConfig(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { ok: false, error: "\u914D\u7F6E\u5FC5\u987B\u662F\u5BF9\u8C61" };
  }
  const known = ["whitelist", "groups", "percentage"];
  const unknown = Object.keys(input).filter((key) => !known.includes(key));
  if (unknown.length) return { ok: false, error: `\u672A\u77E5\u914D\u7F6E\u952E\uFF1A${unknown.join(", ")}` };
  if (!known.some((key) => key in input)) {
    return { ok: false, error: "\u81F3\u5C11\u63D0\u4F9B whitelist / groups / percentage \u4E4B\u4E00" };
  }
  const normalizeList = /* @__PURE__ */ __name((value, limit, label) => {
    if (value === void 0) return void 0;
    if (!Array.isArray(value)) return { error: `${label} \u5FC5\u987B\u662F\u5B57\u7B26\u4E32\u6570\u7EC4` };
    const seen = /* @__PURE__ */ new Set();
    const out = [];
    for (const item of value) {
      const name = String(item ?? "").trim();
      if (!name) continue;
      if (name.length > 64) return { error: `${label} \u6761\u76EE\u8FC7\u957F\uFF08\u226464 \u5B57\u7B26\uFF09` };
      if (!seen.has(name)) {
        seen.add(name);
        out.push(name);
      }
    }
    if (out.length > limit) return { error: `${label} \u81F3\u591A ${limit} \u6761` };
    return { value: out };
  }, "normalizeList");
  const whitelist = normalizeList(input.whitelist, LIMITS.whitelist, "\u767D\u540D\u5355");
  if (whitelist?.error) return { ok: false, error: whitelist.error };
  const groups = normalizeList(input.groups, LIMITS.groups, "\u7528\u6237\u7EC4");
  if (groups?.error) return { ok: false, error: groups.error };
  let percentage;
  if (input.percentage !== void 0) {
    percentage = Number(input.percentage);
    if (!Number.isFinite(percentage) || percentage < 0 || percentage > 100) {
      return { ok: false, error: "percentage \u5FC5\u987B\u662F 0\u2013100 \u7684\u6570\u5B57" };
    }
    percentage = Math.round(percentage * 100) / 100;
  }
  const config2 = {};
  if (whitelist?.value) config2.whitelist = whitelist.value;
  if (groups?.value) config2.groups = groups.value;
  if (percentage !== void 0) config2.percentage = percentage;
  return { ok: true, config: config2 };
}
__name(validateRolloutConfig, "validateRolloutConfig");
function evaluateRollout(config2, principal, feature) {
  if (!config2 || typeof config2 !== "object") return null;
  const user = principal?.user;
  const username = String(user?.username ?? "").trim();
  if (!username) return null;
  if (Array.isArray(config2.whitelist)) {
    const uid = String(user?.uid ?? "");
    const id = String(user?.id ?? "");
    const hit = config2.whitelist.some((entry) => {
      const name = String(entry).trim();
      return name === username || uid && name === uid || id && name === id;
    });
    if (hit) return { allowed: true, reason: "rollout-whitelist" };
  }
  const groupName = String(principal?.group?.name ?? "").trim();
  if (groupName && Array.isArray(config2.groups)) {
    if (config2.groups.some((entry) => String(entry).trim() === groupName)) {
      return { allowed: true, reason: "rollout-group" };
    }
  }
  const percentage = Number(config2.percentage);
  if (Number.isFinite(percentage) && percentage > 0) {
    if (rolloutBucket(username, feature) < percentage) {
      return { allowed: true, reason: "rollout-percentage" };
    }
  }
  return { allowed: false, reason: "rollout-excluded" };
}
__name(evaluateRollout, "evaluateRollout");
async function rolloutVerdict(db, principal, feature) {
  if (!db || !principal || principal.type !== "user") return null;
  const config2 = await readRollout(db, feature);
  return evaluateRollout(config2, principal, feature);
}
__name(rolloutVerdict, "rolloutVerdict");
async function rolloutsTableReady(db) {
  try {
    await db.execute(`SELECT 1 FROM ${FEATURE_ROLLOUTS_TABLE} LIMIT 1`);
    return true;
  } catch {
    return false;
  }
}
__name(rolloutsTableReady, "rolloutsTableReady");

// _utils/auth/policy.js
var NO_STORE = { "Cache-Control": "no-store" };
var FEATURES = {
  "logs.write": "\u89C4\u5219\u5199\u64CD\u4F5C\uFF08\u66F4\u65B0 / \u5220\u9664 / \u6279\u91CF / \u6E05\u7A7A\uFF09",
  "logs.view": "\u62A5\u9519\u4E0E\u65E5\u5FD7\u67E5\u770B\uFF08\u9519\u8BEF\u8BE6\u60C5\u4E0E\u9519\u8BEF\u65E5\u5FD7\u5F39\u7A97\uFF09",
  "logs.clean": "\u6E05\u7406\u5DE5\u5177\uFF08\u5220\u9664\u8BB0\u5F55 / \u6279\u91CF\u6E05\u9664\u6CE8\u91CA\uFF09",
  "danger.zone": "\u9AD8\u5371\u64CD\u4F5C\uFF08\u4E00\u952E\u6E05\u7A7A\u6570\u636E\u5E93\uFF09",
  "rules.batch": "\u6279\u91CF\u6DFB\u52A0\u89C4\u5219",
  "rules.quickedit": "\u5FEB\u901F\u7F16\u8F91\u89C4\u5219\uFF08\u66F4\u65B0 / \u5220\u9664 / \u6392\u9664\uFF09",
  "export.filter": "\u7B56\u7565\u7EC4\uFF08\u8BA2\u9605\u5730\u5740 / \u7B56\u7565\u6E05\u5355\u4E0E\u8FC7\u6EE4\u8BBE\u7F6E\uFF09",
  "subscribe.manage": "\u8BA2\u9605\u89E3\u6790\u4E0E\u7BA1\u7406",
  "duty.view": "\u7528\u6237\u503C\u73ED\u770B\u677F",
  "usage.cloudflare": "Cloudflare \u7528\u91CF",
  "devices.view": "\u7528\u6237\u4E0E\u8BBE\u5907\u8BE6\u60C5\uFF08\u8BBE\u5907\u660E\u7EC6 / \u8D26\u53F7\u4FE1\u606F / \u79BB\u7EBF\u6B8B\u7559\u6E05\u7406\uFF09",
  "health.check": "\u914D\u7F6E\u68C0\u6D4B\uFF08\u57FA\u7840 / \u6DF1\u5EA6\u68C0\u6D4B\u4E0E\u8BCA\u65AD\u62A5\u544A\uFF09",
  "sync.gist": "\u4E91\u540C\u6B65\u4E0E Gist \u5907\u4EFD\uFF08\u914D\u7F6E / \u4E0A\u4F20 / \u8FD8\u539F\uFF09",
  "ai.status": "AI \u961F\u5217\u4E0E\u8FD0\u884C\u72B6\u6001\uFF08\u542B\u5237\u65B0 / \u91CD\u7F6E\u5224\u5B9A\u6C47\u603B\uFF09",
  "ai.prompt": "AI \u5206\u6D41\u63D0\u793A\u8BCD",
  "ai.config": "AI \u8D26\u53F7\u4E0E\u6A21\u578B\uFF08\u8FDE\u63A5 / \u4E2D\u8F6C\u7AD9 / \u6A21\u578B\u6C60\uFF09",
  "ai.schedule": "\u81EA\u52A8\u5316\u8C03\u5EA6",
  "ai.runtime": "AI \u8FD0\u884C\u72B6\u6001\uFF08\u8D26\u53F7\u4E0E\u6A21\u578B\u5C42\u7EA7\u6811\uFF09",
  "ai.page.judge": "\u6574\u9875 AI \u5224\u5B9A",
  "ai.page.history": "\u5237\u65B0\u6574\u9875\u5386\u53F2",
  "ai.run": "AI \u81EA\u52A8\u5206\u6D41\u6267\u884C",
  "turso.manage": "Turso \u6570\u636E\u5E93\u7BA1\u7406\uFF08\u4EC5\u7BA1\u7406\u5458\u6709\u6548\uFF09",
  "setup.wizard": "\u5B89\u88C5 / \u8BBE\u7F6E\u5411\u5BFC",
  "users.manage": "\u7528\u6237\u4E0E\u6743\u9650\u7BA1\u7406\uFF08\u4EC5\u7BA1\u7406\u5458\u6709\u6548\uFF09"
};
var FEATURE_DEFAULTS = Object.freeze({
  "logs.view": "deny",
  "logs.clean": "deny",
  "danger.zone": "deny",
  "rules.batch": "deny",
  "rules.quickedit": "deny",
  "export.filter": "deny",
  "subscribe.manage": "deny",
  "duty.view": "deny",
  "usage.cloudflare": "deny",
  "devices.view": "deny",
  "health.check": "deny",
  "sync.gist": "deny",
  "ai.status": "deny",
  "ai.prompt": "deny",
  "ai.config": "deny",
  "ai.schedule": "deny",
  "ai.runtime": "deny",
  "turso.manage": "deny",
  "setup.wizard": "deny"
});
var featurePolicies = /* @__PURE__ */ new Map();
function mergedFeatures(principal) {
  let groupFeatures = {};
  for (const ancestor of principal?.group?.ancestors ?? []) {
    groupFeatures = { ...groupFeatures, ...ancestor?.permissions?.features ?? {} };
  }
  return {
    ...groupFeatures,
    ...principal?.group?.permissions?.features ?? {},
    ...principal?.user?.rolePermissions?.features ?? {},
    ...principal?.user?.permissions?.features ?? {}
  };
}
__name(mergedFeatures, "mergedFeatures");
function featureDefault(feature) {
  return FEATURE_DEFAULTS[feature] === "deny" ? "deny" : "allow";
}
__name(featureDefault, "featureDefault");
async function evaluateFeature(principal, feature, context2 = {}) {
  if (!principal) return { allowed: false, reason: "anonymous" };
  if (principal.type === "token") return { allowed: true, reason: "legacy-token" };
  if (principal.type === "anonymous-legacy") return { allowed: true, reason: "legacy-anonymous" };
  if (principal.user?.role === "admin") return { allowed: true, reason: "admin" };
  const dynamic = featurePolicies.get(feature);
  if (dynamic) {
    const verdict = await dynamic(principal, feature, context2);
    if (verdict && typeof verdict === "object" && typeof verdict.allowed === "boolean") {
      return verdict;
    }
  }
  const rule = mergedFeatures(principal)[feature];
  if (rule === "deny") return { allowed: false, reason: "permission-deny" };
  if (rule === "allow") return { allowed: true, reason: "permission-allow" };
  const rollout = await rolloutVerdict(context2?.db, principal, feature);
  if (rollout) return rollout;
  if (featureDefault(feature) === "deny") return { allowed: false, reason: "default-deny" };
  return { allowed: true, reason: "default" };
}
__name(evaluateFeature, "evaluateFeature");
async function evaluateAllFeatures(principal, context2 = {}) {
  const access = {};
  for (const feature of Object.keys(FEATURES)) {
    access[feature] = (await evaluateFeature(principal, feature, context2)).allowed;
  }
  return access;
}
__name(evaluateAllFeatures, "evaluateAllFeatures");
async function requireFeature(principal, feature, context2 = {}) {
  const verdict = await evaluateFeature(principal, feature, context2);
  if (verdict.allowed) return null;
  return jsonResponse(
    {
      success: false,
      error: `\u529F\u80FD\u5DF2\u88AB\u9650\u5236\uFF1A${FEATURES[feature] ?? feature}\uFF08${verdict.reason}\uFF09\u3002\u8BF7\u8054\u7CFB\u7BA1\u7406\u5458\u8C03\u6574\u7528\u6237\u6216\u7528\u6237\u7EC4\u7684\u529F\u80FD\u6743\u9650\u3002`
    },
    { status: 403, headers: NO_STORE }
  );
}
__name(requireFeature, "requireFeature");

// _utils/users/core.js
var USER_STATUSES = ["active", "disabled"];
var BUILTIN_ROLES = [
  {
    name: "admin",
    builtin: true,
    permissions: {},
    description: "\u8D85\u7EA7\u7BA1\u7406\u5458\uFF1A\u6743\u9650\u81EA\u9002\u5E94\u5168\u5F00\uFF08\u542B\u672A\u6765\u65B0\u589E\u529F\u80FD\uFF09\uFF0C\u65E0\u9700\u914D\u7F6E"
  },
  {
    name: "user",
    builtin: true,
    permissions: {},
    description: "\u666E\u901A\u7528\u6237\uFF1A\u9ED8\u8BA4\u53D7\u9650\uFF0C\u6309\u7EC4 / \u89D2\u8272 / \u7528\u6237\u914D\u7F6E\u653E\u884C"
  }
  // T33 #117：'test' 内置角色退役——不再合成、不可再赋值（validateRole 拒绝），
  // 存量 role='test' 行由 v17 迁移默认禁用，展示分支（用户清单 / 芯片）保留
];
var USERNAME_PATTERN = /^[a-zA-Z0-9_-]{2,32}$/;
var ACCOUNT_PATTERN = /^[\u4e00-\u9fa5A-Za-z0-9_-]{2,32}$/;
var MAX_DISPLAY_NAME = 32;
var DEFAULT_KEY_QUOTA = 0;
var MAX_KEY_QUOTA = 1e6;
var USER_LIST_COLUMNS = `id, username, uid, display_name, role, group_id, status, permissions, created_at, updated_at, last_login_at, user_key_preview, user_key_created_at, user_key_last_used_at, key_quota_total, key_quota_used, key_issued_at, key_issue_secret, is_builtin`;
function validateRoleName(name) {
  const value = String(name ?? "").trim();
  if (!ACCOUNT_PATTERN.test(value)) return "\u89D2\u8272\u540D\u9700 2-32 \u4F4D\u4E2D\u6587\u3001\u82F1\u6587\u3001\u6570\u5B57\u3001\u4E0B\u5212\u7EBF\u6216\u8FDE\u5B57\u7B26";
  if (BUILTIN_ROLES.some((role) => role.name === value))
    return `\u300C${value}\u300D\u662F\u5185\u7F6E\u89D2\u8272\uFF0C\u4E0D\u53EF\u5360\u7528`;
  return "";
}
__name(validateRoleName, "validateRoleName");
function keyQuotaView(total, used) {
  const safeTotal = Number.isFinite(Number(total)) && Number(total) >= 0 ? Math.floor(Number(total)) : DEFAULT_KEY_QUOTA;
  const safeUsed = Number.isFinite(Number(used)) && Number(used) >= 0 ? Math.floor(Number(used)) : 0;
  if (safeTotal <= 0) return { total: 0, used: safeUsed, remaining: -1 };
  return { total: safeTotal, used: safeUsed, remaining: Math.max(0, safeTotal - safeUsed) };
}
__name(keyQuotaView, "keyQuotaView");
function validateUsername(username) {
  const value = String(username ?? "").trim();
  if (!ACCOUNT_PATTERN.test(value)) return "\u8D26\u53F7\u9700 2-32 \u4F4D\u4E2D\u6587\u3001\u82F1\u6587\u3001\u6570\u5B57\u3001\u4E0B\u5212\u7EBF\u6216\u8FDE\u5B57\u7B26";
  return "";
}
__name(validateUsername, "validateUsername");
function validateUid(uid) {
  const value = String(uid ?? "").trim();
  if (!USERNAME_PATTERN.test(value)) return "UID \u9700 2-32 \u4F4D\u5B57\u6BCD\u3001\u6570\u5B57\u3001\u4E0B\u5212\u7EBF\u6216\u8FDE\u5B57\u7B26";
  return "";
}
__name(validateUid, "validateUid");
function cleanDisplayName(value) {
  return String(value ?? "").trim().slice(0, MAX_DISPLAY_NAME);
}
__name(cleanDisplayName, "cleanDisplayName");
function parsePermissions(raw) {
  try {
    const parsed = JSON.parse(String(raw ?? "{}"));
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}
__name(parsePermissions, "parsePermissions");
function normalizeFeatures(value) {
  const source = value && typeof value === "object" && !Array.isArray(value) ? value : {};
  const features2 = {};
  for (const [key, rule] of Object.entries(source)) {
    if (typeof key === "string" && key.length > 0 && key.length <= 64 && (rule === "allow" || rule === "deny")) {
      features2[key] = rule;
    }
  }
  return features2;
}
__name(normalizeFeatures, "normalizeFeatures");
function sanitizeUserRow(row) {
  return {
    id: Number(row.id),
    username: String(row.username ?? ""),
    uid: String(row.uid ?? ""),
    displayName: String(row.display_name ?? ""),
    role: String(row.role ?? "user"),
    groupId: row.group_id == null ? null : Number(row.group_id),
    status: String(row.status ?? "active"),
    permissions: parsePermissions(row.permissions),
    createdAt: String(row.created_at ?? ""),
    updatedAt: String(row.updated_at ?? ""),
    lastLoginAt: String(row.last_login_at ?? ""),
    userKeyPreview: String(row.user_key_preview ?? ""),
    userKeyCreatedAt: String(row.user_key_created_at ?? ""),
    userKeyLastUsedAt: String(row.user_key_last_used_at ?? ""),
    // 调用额度（v9）：remaining = total - used（下限 0，防脏数据出负数）
    keyQuota: keyQuotaView(row.key_quota_total, row.key_quota_used),
    // v1.27 内置测试账号：与普通用户同权同可编辑，唯一差异是不可删除
    isBuiltin: Boolean(Number(row.is_builtin ?? 0))
  };
}
__name(sanitizeUserRow, "sanitizeUserRow");
function sanitizeGroupRow(row) {
  return {
    id: Number(row.id),
    name: String(row.name ?? ""),
    description: String(row.description ?? ""),
    permissions: parsePermissions(row.permissions),
    // v12：系统默认组（超级管理员 / 普通用户 / 游客 / 禁用）不可删除
    isSystem: Boolean(Number(row.is_system ?? 0)),
    // v20 组继承（T33-6 #137）：父组 ID；旧列 / 脏引用按无父处理（resolve 侧安全终止）
    parentId: row.parent_id == null || Number.isNaN(Number(row.parent_id)) ? null : Number(row.parent_id),
    createdAt: String(row.created_at ?? ""),
    updatedAt: String(row.updated_at ?? "")
  };
}
__name(sanitizeGroupRow, "sanitizeGroupRow");
function sanitizeRoleRow(row) {
  return {
    id: Number(row.id),
    name: String(row.name ?? ""),
    description: String(row.description ?? ""),
    permissions: parsePermissions(row.permissions),
    builtin: false,
    createdAt: String(row.created_at ?? ""),
    updatedAt: String(row.updated_at ?? "")
  };
}
__name(sanitizeRoleRow, "sanitizeRoleRow");

// _utils/users/accounts.js
async function countUsers(db) {
  const rows = await db.execute(`SELECT COUNT(*) AS n FROM ${USERS_TABLE}`);
  return Number(rows[0]?.n ?? 0);
}
__name(countUsers, "countUsers");
async function hasAnyUser(db) {
  return await countUsers(db) > 0;
}
__name(hasAnyUser, "hasAnyUser");
async function countActiveAdmins(db) {
  const rows = await db.execute(
    `SELECT COUNT(*) AS n FROM ${USERS_TABLE} WHERE role = 'admin' AND status = 'active'`
  );
  return Number(rows[0]?.n ?? 0);
}
__name(countActiveAdmins, "countActiveAdmins");
function isActiveAdmin(role, status4) {
  return role === "admin" && status4 === "active";
}
__name(isActiveAdmin, "isActiveAdmin");
async function singleAdminViolation(db, direction, verb = "\u64CD\u4F5C") {
  const admins = await countActiveAdmins(db);
  if (direction === "add" && admins >= 1) return "\u7CFB\u7EDF\u4EC5\u5141\u8BB8\u4E00\u4F4D\u8D85\u7EA7\u7BA1\u7406\u5458\uFF1A\u5DF2\u5B58\u5728\u8D85\u7EA7\u7BA1\u7406\u5458\u8D26\u53F7";
  if (direction === "remove" && admins <= 1) return `\u4E0D\u80FD${verb}\u6700\u540E\u4E00\u4E2A\u53EF\u7528\u7BA1\u7406\u5458`;
  return null;
}
__name(singleAdminViolation, "singleAdminViolation");
async function listUsers(db) {
  const rows = await db.execute(
    `SELECT ${USER_LIST_COLUMNS} FROM ${USERS_TABLE} ORDER BY id ASC`
  );
  return rows.map(sanitizeUserRow);
}
__name(listUsers, "listUsers");
async function getUserById(db, id) {
  const rows = await db.execute(
    `SELECT ${USER_LIST_COLUMNS}, password_hash FROM ${USERS_TABLE} WHERE id = ?`,
    [id]
  );
  return rows[0] ?? null;
}
__name(getUserById, "getUserById");
async function getUserByUsername(db, username) {
  const rows = await db.execute(
    `SELECT ${USER_LIST_COLUMNS}, password_hash FROM ${USERS_TABLE} WHERE username = ?`,
    [String(username ?? "").trim()]
  );
  return rows[0] ?? null;
}
__name(getUserByUsername, "getUserByUsername");
async function getUserByUid(db, uid) {
  const rows = await db.execute(
    `SELECT ${USER_LIST_COLUMNS}, password_hash FROM ${USERS_TABLE}
     WHERE uid = ? AND uid != ''`,
    [String(uid ?? "").trim()]
  );
  return rows[0] ?? null;
}
__name(getUserByUid, "getUserByUid");
async function findUserByKeyHash(db, keyHash) {
  if (!keyHash) return null;
  const rows = await db.execute(
    `SELECT u.id, u.username, u.uid, u.display_name, u.role, u.group_id, u.status, u.permissions,
            u.user_key_hash, u.user_key_preview, u.user_key_created_at, u.user_key_last_used_at,
            u.key_quota_total, u.key_quota_used,
            g.permissions AS group_permissions, g.name AS group_name, g.parent_id AS group_parent_id,
            r.permissions AS role_permissions
     FROM ${USERS_TABLE} u LEFT JOIN ${USER_GROUPS_TABLE} g ON g.id = u.group_id
     LEFT JOIN ${USER_ROLES_TABLE} r ON r.name = u.role
     WHERE u.user_key_hash = ?`,
    [String(keyHash ?? "")]
  );
  const row = rows[0];
  if (!row) return null;
  if (!String(row.user_key_hash ?? "")) return null;
  if (String(row.status ?? "active") !== "active") return { disabled: true };
  return {
    id: Number(row.id),
    username: String(row.username ?? ""),
    uid: String(row.uid ?? ""),
    displayName: String(row.display_name ?? ""),
    role: String(row.role ?? "user"),
    groupId: row.group_id == null ? null : Number(row.group_id),
    status: String(row.status ?? "active"),
    permissions: parsePermissions(row.permissions),
    // v1.25 角色权限：users.role 命中自定义角色行时带出（builtin admin / user 无行 = null）
    rolePermissions: parsePermissions(row.role_permissions),
    group: row.group_id != null ? {
      id: Number(row.group_id),
      name: String(row.group_name ?? ""),
      permissions: parsePermissions(row.group_permissions),
      parentId: row.group_parent_id == null ? null : Number(row.group_parent_id)
    } : null,
    userKey: {
      preview: String(row.user_key_preview ?? ""),
      createdAt: String(row.user_key_created_at ?? ""),
      lastUsedAt: String(row.user_key_last_used_at ?? "")
    },
    // 剩余额度随身份返回：principal 层据此拦截耗尽凭证（key-exhausted）
    keyQuota: keyQuotaView(row.key_quota_total, row.key_quota_used)
  };
}
__name(findUserByKeyHash, "findUserByKeyHash");
async function createUser(db, {
  username,
  passwordHash,
  role = "user",
  groupId = null,
  displayName = "",
  permissions = "{}",
  uid = null
}) {
  const now2 = (/* @__PURE__ */ new Date()).toISOString();
  const effectiveUid = uid === null || uid === void 0 ? username : String(uid).trim();
  await db.batch([
    {
      sql: `INSERT INTO ${USERS_TABLE} (username, uid, display_name, password_hash, role, group_id, status, permissions, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, 'active', ?, ?, ?)`,
      params: [
        username,
        effectiveUid,
        cleanDisplayName(displayName),
        passwordHash,
        role,
        groupId,
        permissions,
        now2,
        now2
      ]
    }
  ]);
  const row = await getUserByUsername(db, username);
  return sanitizeUserRow(row);
}
__name(createUser, "createUser");
async function updateUser(db, id, patch) {
  const sets = [];
  const params = [];
  if (patch.username !== void 0) {
    sets.push("username = ?");
    params.push(String(patch.username).trim());
  }
  if (patch.passwordHash !== void 0) {
    sets.push("password_hash = ?");
    params.push(patch.passwordHash);
  }
  if (patch.displayName !== void 0) {
    sets.push("display_name = ?");
    params.push(cleanDisplayName(patch.displayName));
  }
  if (patch.role !== void 0) {
    sets.push("role = ?");
    params.push(patch.role);
  }
  if (patch.groupId !== void 0) {
    sets.push("group_id = ?");
    params.push(patch.groupId);
  }
  if (patch.status !== void 0) {
    sets.push("status = ?");
    params.push(patch.status);
  }
  if (patch.permissions !== void 0) {
    sets.push("permissions = ?");
    params.push(patch.permissions);
  }
  if (patch.uid !== void 0) {
    sets.push("uid = ?");
    params.push(String(patch.uid).trim());
  }
  if (!sets.length) return sanitizeUserRow(await getUserById(db, id));
  sets.push("updated_at = ?");
  params.push((/* @__PURE__ */ new Date()).toISOString());
  params.push(id);
  await db.batch([{ sql: `UPDATE ${USERS_TABLE} SET ${sets.join(", ")} WHERE id = ?`, params }]);
  const row = await getUserById(db, id);
  return row ? sanitizeUserRow(row) : null;
}
__name(updateUser, "updateUser");
async function deleteUser(db, id) {
  await db.batch([
    { sql: `DELETE FROM auth_sessions WHERE user_id = ?`, params: [id] },
    { sql: `DELETE FROM ${USER_CHANNELS_TABLE} WHERE user_id = ?`, params: [id] },
    { sql: `DELETE FROM ${USERS_TABLE} WHERE id = ?`, params: [id] }
  ]);
}
__name(deleteUser, "deleteUser");
async function markUserLogin(db, userId) {
  try {
    await db.execute(`UPDATE ${USERS_TABLE} SET last_login_at = ? WHERE id = ?`, [
      (/* @__PURE__ */ new Date()).toISOString(),
      userId
    ]);
  } catch {
  }
}
__name(markUserLogin, "markUserLogin");

// _utils/users/key-quota.js
async function setUserKey(db, userId, { keyHash, preview }) {
  const now2 = (/* @__PURE__ */ new Date()).toISOString();
  await db.batch([
    {
      sql: `UPDATE ${USERS_TABLE} SET user_key_hash = ?, user_key_preview = ?, user_key_created_at = ?, updated_at = ? WHERE id = ?`,
      params: [String(keyHash ?? ""), String(preview ?? ""), now2, now2, userId]
    }
  ]);
}
__name(setUserKey, "setUserKey");
async function markKeyIssued(db, userId, at = (/* @__PURE__ */ new Date()).toISOString()) {
  await db.execute(`UPDATE ${USERS_TABLE} SET key_issued_at = ? WHERE id = ?`, [
    String(at),
    userId
  ]);
}
__name(markKeyIssued, "markKeyIssued");
async function touchUserKeyUse(db, userId) {
  try {
    await db.execute(`UPDATE ${USERS_TABLE} SET user_key_last_used_at = ? WHERE id = ?`, [
      (/* @__PURE__ */ new Date()).toISOString(),
      userId
    ]);
  } catch {
  }
}
__name(touchUserKeyUse, "touchUserKeyUse");
async function consumeUserKeyQuota(db, userId) {
  const results = await db.batch([
    {
      sql: `UPDATE ${USERS_TABLE} SET key_quota_used = key_quota_used + 1
            WHERE id = ? AND key_quota_used < key_quota_total`,
      params: [userId]
    }
  ]);
  return Number(results[0]?.changes ?? 0) > 0;
}
__name(consumeUserKeyQuota, "consumeUserKeyQuota");
async function resetUserQuota(db, userId, { total } = {}) {
  const now2 = (/* @__PURE__ */ new Date()).toISOString();
  const statements = [
    {
      sql: `UPDATE ${USERS_TABLE} SET key_quota_used = 0,
            key_quota_total = COALESCE(?, key_quota_total), updated_at = ? WHERE id = ?`,
      params: [total ?? null, now2, userId]
    }
  ];
  await db.batch(statements);
  const row = await getUserById(db, userId);
  return row ? sanitizeUserRow(row) : null;
}
__name(resetUserQuota, "resetUserQuota");

// _utils/users/users-bulk.js
async function listUsernamesByPrefix(db, prefix) {
  const rows = await db.execute(
    `SELECT username FROM ${USERS_TABLE} WHERE username LIKE ? ESCAPE '\\'`,
    [`${likeEscape(prefix)}%`]
  );
  return rows.map((row) => String(row.username ?? ""));
}
__name(listUsernamesByPrefix, "listUsernamesByPrefix");
async function createUsersBulk(db, rows) {
  const now2 = (/* @__PURE__ */ new Date()).toISOString();
  const statements = rows.map((row) => ({
    sql: `INSERT INTO ${USERS_TABLE} (username, uid, display_name, password_hash, role, group_id, status, permissions, created_at, updated_at, user_key_hash, user_key_preview, user_key_created_at)
          VALUES (?, ?, ?, ?, ?, ?, 'active', ?, ?, ?, ?, ?, ?)`,
    params: [
      row.username,
      row.username,
      cleanDisplayName(row.displayName),
      row.passwordHash,
      row.role,
      row.groupId,
      row.permissions,
      now2,
      now2,
      row.keyHash,
      row.keyPreview,
      now2
    ]
  }));
  const chunkSize = Math.max(1, Number(db.maxBatchSize) || 50);
  for (let start = 0; start < statements.length; start += chunkSize) {
    await db.batch(statements.slice(start, start + chunkSize));
  }
}
__name(createUsersBulk, "createUsersBulk");
async function listUsersByUsernames(db, usernames) {
  const names = [...new Set(usernames.map((name) => String(name)))];
  if (!names.length) return [];
  const rows = [];
  const chunkSize = 90;
  for (let start = 0; start < names.length; start += chunkSize) {
    const chunk = names.slice(start, start + chunkSize);
    const result = await db.execute(
      `SELECT ${USER_LIST_COLUMNS} FROM ${USERS_TABLE} WHERE username IN (${chunk.map(() => "?").join(", ")})`,
      chunk
    );
    rows.push(...result);
  }
  return rows.map(sanitizeUserRow);
}
__name(listUsersByUsernames, "listUsersByUsernames");

// _utils/users/groups.js
var SYSTEM_GROUPS = [
  {
    name: "\u8D85\u7EA7\u7BA1\u7406\u5458 (Admin)",
    description: "\u7CFB\u7EDF\u9ED8\u8BA4\u7EC4\uFF1A\u8D85\u7EA7\u7BA1\u7406\u5458\u7684\u9ED8\u8BA4\u6743\u9650\u57FA\u7EBF",
    features: {}
  },
  {
    name: "\u666E\u901A\u7528\u6237 (Regular User)",
    description: "\u7CFB\u7EDF\u9ED8\u8BA4\u7EC4\uFF1A\u666E\u901A\u7528\u6237\u7684\u9ED8\u8BA4\u6743\u9650\u57FA\u7EBF",
    features: {}
  },
  {
    name: "\u6E38\u5BA2 / \u672A\u767B\u5F55 (Guest)",
    description: "\u7CFB\u7EDF\u9ED8\u8BA4\u7EC4\uFF1A\u6E38\u5BA2\u4E0E\u672A\u767B\u5F55\u8EAB\u4EFD\u7684\u529F\u80FD\u57FA\u7EBF",
    features: {}
  },
  {
    name: "\u7981\u7528",
    description: "\u7CFB\u7EDF\u9ED8\u8BA4\u7EC4\uFF1A\u53D7\u9650\u8EAB\u4EFD\u7684\u9ED8\u8BA4\u6743\u9650\uFF08\u7981\u7528\u5199\u64CD\u4F5C\uFF09",
    features: { "logs.write": "deny", "rules.batch": "deny", "rules.quickedit": "deny" }
  }
  // T33 #117：'test' 系统组退役——全新部署不再种入；存量组由 v17 迁移摘掉
  // is_system 保护降为可删普通组（成员关系与数据保留，不丢数据）
];
var systemGroupsSeeded = false;
async function ensureSystemGroups(db) {
  if (systemGroupsSeeded) return;
  systemGroupsSeeded = true;
  try {
    const existing = new Set((await listGroupsRaw(db)).map((group3) => group3.name));
    const missing = SYSTEM_GROUPS.filter((group3) => !existing.has(group3.name));
    if (!missing.length) return;
    const now2 = (/* @__PURE__ */ new Date()).toISOString();
    await db.batch(
      missing.map((group3) => ({
        sql: `INSERT OR IGNORE INTO ${USER_GROUPS_TABLE} (name, description, permissions, is_system, created_at, updated_at)
            VALUES (?, ?, ?, 1, ?, ?)`,
        params: [
          group3.name,
          group3.description,
          JSON.stringify({ features: group3.features }),
          now2,
          now2
        ]
      }))
    );
  } catch {
    systemGroupsSeeded = false;
  }
}
__name(ensureSystemGroups, "ensureSystemGroups");
var MAX_GROUP_DEPTH = 5;
async function groupSubtreeHeight(db, groupId) {
  let frontier = [Number(groupId)];
  const seen = new Set(frontier);
  let height = 0;
  while (frontier.length && height < MAX_GROUP_DEPTH) {
    const placeholders = frontier.map(() => "?").join(", ");
    const rows = await db.execute(
      `SELECT id FROM ${USER_GROUPS_TABLE} WHERE parent_id IN (${placeholders})`,
      frontier
    );
    const next = rows.map((row) => Number(row.id)).filter((id) => !seen.has(id));
    for (const id of next) seen.add(id);
    frontier = next;
    if (frontier.length) height += 1;
  }
  return height;
}
__name(groupSubtreeHeight, "groupSubtreeHeight");
async function validateGroupParent(db, groupId, parentId) {
  if (parentId === null || parentId === void 0 || parentId === "") return null;
  const pid2 = Number(parentId);
  if (!Number.isInteger(pid2) || pid2 < 1) return "\u7236\u7EC4 ID \u65E0\u6548";
  if (groupId != null && pid2 === Number(groupId)) return "\u4E0D\u80FD\u628A\u7EC4\u8BBE\u4E3A\u81EA\u5DF1\u7684\u7236\u7EC4";
  let current = await getGroupById(db, pid2);
  if (!current) return `\u7236\u7EC4\u4E0D\u5B58\u5728\uFF1A${pid2}`;
  let depth = 1;
  const seen = /* @__PURE__ */ new Set([pid2]);
  while (current?.parentId != null) {
    if (groupId != null && Number(current.parentId) === Number(groupId)) {
      return "\u68C0\u6D4B\u5230\u7EC4\u7EE7\u627F\u73AF";
    }
    if (seen.has(Number(current.parentId))) return "\u68C0\u6D4B\u5230\u7EC4\u7EE7\u627F\u73AF";
    seen.add(Number(current.parentId));
    depth += 1;
    if (depth > MAX_GROUP_DEPTH) {
      return `\u7EC4\u7EE7\u627F\u6DF1\u5EA6\u8D85\u8FC7\u4E0A\u9650\uFF08${MAX_GROUP_DEPTH} \u5C42\uFF09`;
    }
    current = await getGroupById(db, current.parentId);
    if (!current) break;
  }
  if (groupId != null) {
    const subtree = await groupSubtreeHeight(db, groupId);
    if (depth + subtree > MAX_GROUP_DEPTH) {
      return `\u7EC4\u7EE7\u627F\u6DF1\u5EA6\u8D85\u8FC7\u4E0A\u9650\uFF08${MAX_GROUP_DEPTH} \u5C42\uFF09\uFF1A\u542B\u5B50\u6811\u5C06\u8FBE ${depth + subtree} \u5C42`;
    }
  }
  return null;
}
__name(validateGroupParent, "validateGroupParent");
async function getGroupAncestors(db, groupId) {
  const chain = [];
  const seen = /* @__PURE__ */ new Set();
  let currentId = groupId;
  while (currentId != null && !seen.has(currentId) && chain.length <= MAX_GROUP_DEPTH) {
    seen.add(currentId);
    const group3 = await getGroupById(db, currentId);
    if (!group3) break;
    chain.push(group3);
    currentId = group3.parentId;
  }
  return chain.slice(1).reverse();
}
__name(getGroupAncestors, "getGroupAncestors");
async function listGroups(db) {
  await ensureSystemGroups(db);
  return listGroupsRaw(db);
}
__name(listGroups, "listGroups");
async function listGroupsRaw(db) {
  const rows = await db.execute(
    // 系统默认组恒排最前：标准起点永远在列表头部（旧库补种的 id 也靠后）
    `SELECT id, name, description, permissions, is_system, parent_id, created_at, updated_at
     FROM ${USER_GROUPS_TABLE} ORDER BY is_system DESC, id ASC`
  );
  return rows.map(sanitizeGroupRow);
}
__name(listGroupsRaw, "listGroupsRaw");
async function getGroupById(db, id) {
  const rows = await db.execute(
    `SELECT id, name, description, permissions, is_system, parent_id, created_at, updated_at FROM ${USER_GROUPS_TABLE} WHERE id = ?`,
    [id]
  );
  const row = rows[0];
  return row ? sanitizeGroupRow(row) : null;
}
__name(getGroupById, "getGroupById");
async function createGroup(db, { name, description = "", permissions = "{}", parentId = null }) {
  const now2 = (/* @__PURE__ */ new Date()).toISOString();
  await db.batch([
    {
      sql: `INSERT INTO ${USER_GROUPS_TABLE} (name, description, permissions, parent_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)`,
      params: [
        String(name).trim(),
        String(description ?? "").trim().slice(0, 128),
        permissions,
        parentId == null || parentId === "" ? null : Number(parentId),
        now2,
        now2
      ]
    }
  ]);
  const rows = await db.execute(
    `SELECT id, name, description, permissions, is_system, parent_id, created_at, updated_at FROM ${USER_GROUPS_TABLE} WHERE name = ?`,
    [String(name).trim()]
  );
  return sanitizeGroupRow(rows[0]);
}
__name(createGroup, "createGroup");
async function updateGroup(db, id, { name, description, permissions, parentId }) {
  const sets = [];
  const params = [];
  if (name !== void 0) {
    sets.push("name = ?");
    params.push(String(name).trim());
  }
  if (description !== void 0) {
    sets.push("description = ?");
    params.push(String(description).trim().slice(0, 128));
  }
  if (permissions !== void 0) {
    sets.push("permissions = ?");
    params.push(permissions);
  }
  if (parentId !== void 0) {
    sets.push("parent_id = ?");
    params.push(parentId == null || parentId === "" ? null : Number(parentId));
  }
  if (sets.length) {
    sets.push("updated_at = ?");
    params.push((/* @__PURE__ */ new Date()).toISOString());
    params.push(id);
    await db.batch([
      { sql: `UPDATE ${USER_GROUPS_TABLE} SET ${sets.join(", ")} WHERE id = ?`, params }
    ]);
  }
  return getGroupById(db, id);
}
__name(updateGroup, "updateGroup");
async function deleteGroup(db, id) {
  await db.batch([
    {
      sql: `UPDATE ${USERS_TABLE} SET group_id = NULL, updated_at = ? WHERE group_id = ?`,
      params: [(/* @__PURE__ */ new Date()).toISOString(), id]
    },
    {
      sql: `UPDATE ${USER_GROUPS_TABLE} SET parent_id = NULL, updated_at = ? WHERE parent_id = ?`,
      params: [(/* @__PURE__ */ new Date()).toISOString(), id]
    },
    { sql: `DELETE FROM ${USER_GROUPS_TABLE} WHERE id = ?`, params: [id] }
  ]);
}
__name(deleteGroup, "deleteGroup");
async function countGroupMembers(db, groupId) {
  const rows = await db.execute(`SELECT COUNT(*) AS n FROM ${USERS_TABLE} WHERE group_id = ?`, [
    groupId
  ]);
  return Number(rows[0]?.n ?? 0);
}
__name(countGroupMembers, "countGroupMembers");
async function listGroupMemberCounts(db) {
  const rows = await db.execute(
    `SELECT group_id, COUNT(*) AS n FROM ${USERS_TABLE} WHERE group_id IS NOT NULL GROUP BY group_id`
  );
  return new Map(rows.map((row) => [Number(row.group_id), Number(row.n) || 0]));
}
__name(listGroupMemberCounts, "listGroupMemberCounts");

// _utils/auth/password.js
var PBKDF2_ALGO = "SHA-256";
var PBKDF2_ITERATIONS = 1e5;
var SALT_BYTES = 16;
var HASH_BYTES = 32;
var PREFIX = "pbkdf2-sha256";
function validatePasswordStrength(password) {
  const value = String(password ?? "");
  if (value.length < 6) return "\u5BC6\u7801\u81F3\u5C11 6 \u4F4D";
  if (value.length > 128) return "\u5BC6\u7801\u6700\u957F 128 \u4F4D";
  return "";
}
__name(validatePasswordStrength, "validatePasswordStrength");
function bytesToBase64(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}
__name(bytesToBase64, "bytesToBase64");
function base64ToBytes(value) {
  const binary = atob(String(value ?? ""));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}
__name(base64ToBytes, "base64ToBytes");
async function derive(password, salt, iterations) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(String(password)),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  return crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations, hash: PBKDF2_ALGO },
    key,
    HASH_BYTES * 8
  );
}
__name(derive, "derive");
async function hashPassword(password) {
  const salt = new Uint8Array(SALT_BYTES);
  crypto.getRandomValues(salt);
  const bits = await derive(password, salt, PBKDF2_ITERATIONS);
  return `${PREFIX}$${PBKDF2_ITERATIONS}$${bytesToBase64(salt)}$${bytesToBase64(new Uint8Array(bits))}`;
}
__name(hashPassword, "hashPassword");
async function verifyPassword(password, stored) {
  const parts = String(stored ?? "").split("$");
  if (parts.length !== 4 || parts[0] !== PREFIX) return false;
  const iterations = Number(parts[1]);
  if (!Number.isInteger(iterations) || iterations < 1 || iterations > 1e7) return false;
  let salt;
  let expected;
  try {
    salt = base64ToBytes(parts[2]);
    expected = base64ToBytes(parts[3]);
  } catch {
    return false;
  }
  const bits = await derive(password, salt, iterations);
  const actual = new Uint8Array(bits);
  if (actual.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < actual.length; i += 1) diff |= actual[i] ^ expected[i];
  return diff === 0;
}
__name(verifyPassword, "verifyPassword");

// _utils/users/bootstrap.js
var BUILTIN_TEST_ACCOUNT = Object.freeze({
  username: "test"
});
var LEGACY_BUILTIN_TEST_PASSWORD = "test123";
function isLegacyBuiltinCredential(row, password) {
  return String(row?.username ?? "") === BUILTIN_TEST_ACCOUNT.username && String(row?.role ?? "") === "test" && password === LEGACY_BUILTIN_TEST_PASSWORD;
}
__name(isLegacyBuiltinCredential, "isLegacyBuiltinCredential");
function generateBuiltinPassword() {
  const bytes = new Uint8Array(12);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}
__name(generateBuiltinPassword, "generateBuiltinPassword");
var builtinTestChecked = false;
async function ensureBuiltinTestUser(db) {
  if (builtinTestChecked) return null;
  builtinTestChecked = true;
  try {
    const legacy = await db.execute(
      `SELECT id, password_hash FROM ${USERS_TABLE} WHERE username = ? AND role = 'test' LIMIT 1`,
      [BUILTIN_TEST_ACCOUNT.username]
    );
    if (legacy.length && await verifyPassword(LEGACY_BUILTIN_TEST_PASSWORD, legacy[0].password_hash)) {
      const password = generateBuiltinPassword();
      await db.batch([
        {
          sql: `UPDATE ${USERS_TABLE} SET password_hash = ?, updated_at = ? WHERE id = ?`,
          params: [await hashPassword(password), (/* @__PURE__ */ new Date()).toISOString(), legacy[0].id]
        }
      ]);
      return { username: BUILTIN_TEST_ACCOUNT.username, password };
    }
    return null;
  } catch {
    builtinTestChecked = false;
    return null;
  }
}
__name(ensureBuiltinTestUser, "ensureBuiltinTestUser");

// _utils/users/roles.js
async function listRoles(db) {
  const builtinNames = BUILTIN_ROLES.map((role) => role.name);
  const quoted = builtinNames.map((name) => `'${name.replace(/'/g, "''")}'`).join(", ");
  const rows = await db.execute(
    `SELECT r.id, r.name, r.description, r.permissions, r.created_at, r.updated_at,
            (SELECT COUNT(*) FROM ${USERS_TABLE} u WHERE u.role = r.name) AS user_count
     FROM ${USER_ROLES_TABLE} r ORDER BY r.id ASC`
  );
  const usage3 = await db.execute(
    `SELECT role, COUNT(*) AS n FROM ${USERS_TABLE} WHERE role IN (${quoted}) GROUP BY role`
  );
  const builtinCounts = new Map(usage3.map((row) => [String(row.role), Number(row.n) || 0]));
  return [
    ...BUILTIN_ROLES.map((role) => ({ ...role, userCount: builtinCounts.get(role.name) || 0 })),
    ...rows.filter((row) => !builtinNames.includes(String(row.name ?? ""))).map((row) => ({ ...sanitizeRoleRow(row), userCount: Number(row.user_count) || 0 }))
  ];
}
__name(listRoles, "listRoles");
async function getRoleByName(db, name) {
  const rows = await db.execute(
    `SELECT id, name, description, permissions, created_at, updated_at FROM ${USER_ROLES_TABLE} WHERE name = ?`,
    [String(name ?? "").trim()]
  );
  return rows[0] ? sanitizeRoleRow(rows[0]) : null;
}
__name(getRoleByName, "getRoleByName");
async function getRoleById(db, id) {
  const rows = await db.execute(
    `SELECT id, name, description, permissions, created_at, updated_at FROM ${USER_ROLES_TABLE} WHERE id = ?`,
    [Number(id)]
  );
  return rows[0] ? sanitizeRoleRow(rows[0]) : null;
}
__name(getRoleById, "getRoleById");
async function createRole(db, { name, description = "", permissions = "{}" }) {
  const now2 = (/* @__PURE__ */ new Date()).toISOString();
  await db.batch([
    {
      sql: `INSERT INTO ${USER_ROLES_TABLE} (name, description, permissions, created_at, updated_at) VALUES (?, ?, ?, ?, ?)`,
      params: [
        String(name).trim(),
        String(description ?? "").trim().slice(0, 128),
        permissions,
        now2,
        now2
      ]
    }
  ]);
  return getRoleByName(db, name);
}
__name(createRole, "createRole");
async function updateRole(db, id, { name, description, permissions }) {
  const before = name !== void 0 ? await getRoleById(db, id) : null;
  const sets = [];
  const params = [];
  if (name !== void 0) {
    sets.push("name = ?");
    params.push(String(name).trim());
  }
  if (description !== void 0) {
    sets.push("description = ?");
    params.push(String(description).trim().slice(0, 128));
  }
  if (permissions !== void 0) {
    sets.push("permissions = ?");
    params.push(permissions);
  }
  if (sets.length) {
    sets.push("updated_at = ?");
    params.push((/* @__PURE__ */ new Date()).toISOString());
    params.push(Number(id));
    await db.batch([
      { sql: `UPDATE ${USER_ROLES_TABLE} SET ${sets.join(", ")} WHERE id = ?`, params }
    ]);
  }
  const renamed = name !== void 0 ? String(name).trim() : "";
  if (before && before.name !== renamed) {
    await db.batch([
      {
        sql: `UPDATE ${USERS_TABLE} SET role = ?, updated_at = ? WHERE role = ?`,
        params: [renamed, (/* @__PURE__ */ new Date()).toISOString(), before.name]
      }
    ]);
  }
  return getRoleById(db, id);
}
__name(updateRole, "updateRole");
async function deleteRole(db, id) {
  const role = await getRoleById(db, id);
  if (!role) return { deleted: 0, demotedUsers: 0 };
  const demoted = await db.batch([
    {
      sql: `UPDATE ${USERS_TABLE} SET role = 'user', updated_at = ? WHERE role = ?`,
      params: [(/* @__PURE__ */ new Date()).toISOString(), role.name]
    }
  ]);
  await db.batch([{ sql: `DELETE FROM ${USER_ROLES_TABLE} WHERE id = ?`, params: [Number(id)] }]);
  return { deleted: 1, demotedUsers: Number(demoted[0]?.changes ?? 0) };
}
__name(deleteRole, "deleteRole");
async function validateRoleValue(db, role) {
  const value = String(role ?? "");
  if (BUILTIN_ROLES.some((item) => item.name === value)) return "";
  const existing = await getRoleByName(db, value);
  if (existing) return "";
  return `\u89D2\u8272\u5FC5\u987B\u662F\uFF1A${BUILTIN_ROLES.map((item) => item.name).join(" / ")} \u6216\u5DF2\u521B\u5EFA\u7684\u81EA\u5B9A\u4E49\u89D2\u8272`;
}
__name(validateRoleValue, "validateRoleValue");

// _utils/users/audit.js
function auditActorFrom(principal) {
  if (!principal) return { actorId: null, actorLabel: "system" };
  if (principal.type === "user") {
    return {
      actorId: principal.user?.id ?? null,
      actorLabel: String(principal.user?.username ?? "unknown")
    };
  }
  if (principal.type === "token") return { actorId: null, actorLabel: "\u7BA1\u7406\u4EE4\u724C" };
  if (principal.type === "anonymous-legacy") return { actorId: null, actorLabel: "\u65E7\u90E8\u7F72\u56DE\u843D" };
  return { actorId: null, actorLabel: "system" };
}
__name(auditActorFrom, "auditActorFrom");
async function recordAudit(db, actor, action, objectType, objectId, objectLabel, summary) {
  const { actorId, actorLabel } = auditActorFrom(actor);
  try {
    await db.batch([
      {
        sql: `INSERT INTO ${AUDIT_LOGS_TABLE} (actor_id, actor_label, action, object_type, object_id, object_label, summary, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        params: [
          actorId,
          actorLabel,
          String(action ?? ""),
          String(objectType ?? ""),
          String(objectId ?? ""),
          String(objectLabel ?? ""),
          String(summary ?? ""),
          (/* @__PURE__ */ new Date()).toISOString()
        ]
      }
    ]);
  } catch (error3) {
    console.warn("[audit] \u5BA1\u8BA1\u5199\u5165\u5931\u8D25", action, objectType, error3?.message ?? error3);
  }
}
__name(recordAudit, "recordAudit");
async function listAuditLogs(db, limit = 100) {
  const bounded = Math.min(Math.max(Number(limit) || 100, 1), 500);
  return db.execute(
    `SELECT id, actor_id, actor_label, action, object_type, object_id, object_label, summary, created_at
     FROM ${AUDIT_LOGS_TABLE} ORDER BY id DESC LIMIT ?`,
    [bounded]
  );
}
__name(listAuditLogs, "listAuditLogs");

// _utils/auth/sessions.js
var SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1e3;
var MAX_USER_AGENT_LENGTH = 200;
var hex = /* @__PURE__ */ __name((bytes) => Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join(""), "hex");
async function sha256Hex(text) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(String(text)));
  return hex(new Uint8Array(digest));
}
__name(sha256Hex, "sha256Hex");
async function createSession(db, userId, { userAgent = "" } = {}) {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  const token = hex(bytes);
  const tokenHash = await sha256Hex(token);
  const now2 = /* @__PURE__ */ new Date();
  const expiresAt = new Date(now2.getTime() + SESSION_TTL_MS).toISOString();
  await db.batch([
    {
      sql: `INSERT INTO ${AUTH_SESSIONS_TABLE} (token_hash, user_id, created_at, expires_at, last_used_at, user_agent)
            VALUES (?, ?, ?, ?, ?, ?)`,
      params: [
        tokenHash,
        userId,
        now2.toISOString(),
        expiresAt,
        now2.toISOString(),
        String(userAgent ?? "").slice(0, MAX_USER_AGENT_LENGTH)
      ]
    }
  ]);
  return { token, tokenHash, expiresAt };
}
__name(createSession, "createSession");
async function findLiveSession(db, token, nowMs = Date.now()) {
  if (!token) return null;
  const tokenHash = await sha256Hex(token);
  const rows = await db.execute(
    `SELECT s.token_hash, s.user_id, s.expires_at, s.created_at, s.user_agent,
            u.id AS u_id, u.username, u.display_name, u.role, u.group_id, u.status, u.permissions,
           u.uid,
            g.permissions AS group_permissions, g.name AS group_name, g.parent_id AS group_parent_id,
            r.permissions AS role_permissions
     FROM ${AUTH_SESSIONS_TABLE} s JOIN users u ON u.id = s.user_id
     LEFT JOIN user_groups g ON g.id = u.group_id
     LEFT JOIN ${USER_ROLES_TABLE} r ON r.name = u.role
     WHERE s.token_hash = ?`,
    [tokenHash]
  );
  const row = rows[0];
  if (!row) return null;
  if (Date.parse(String(row.expires_at)) <= nowMs) {
    await purgeExpired(db).catch(() => {
    });
    return null;
  }
  return row;
}
__name(findLiveSession, "findLiveSession");
async function deleteSession(db, token) {
  if (!token) return;
  const tokenHash = await sha256Hex(token);
  await db.execute(`DELETE FROM ${AUTH_SESSIONS_TABLE} WHERE token_hash = ?`, [tokenHash]);
}
__name(deleteSession, "deleteSession");
async function deleteUserSessions(db, userId) {
  await db.execute(`DELETE FROM ${AUTH_SESSIONS_TABLE} WHERE user_id = ?`, [userId]);
}
__name(deleteUserSessions, "deleteUserSessions");
async function purgeExpired(db) {
  await db.execute(`DELETE FROM ${AUTH_SESSIONS_TABLE} WHERE expires_at <= ?`, [
    (/* @__PURE__ */ new Date()).toISOString()
  ]);
}
__name(purgeExpired, "purgeExpired");
async function touchSession(db, tokenHash) {
  try {
    await db.execute(
      `UPDATE ${AUTH_SESSIONS_TABLE} SET last_used_at = ? WHERE token_hash = ?`,
      [(/* @__PURE__ */ new Date()).toISOString(), tokenHash]
    );
  } catch {
  }
}
__name(touchSession, "touchSession");

// _utils/rate-limit.js
var buckets = /* @__PURE__ */ new Map();
var MAX_BUCKETS = 5e3;
function pruneExpired(windowMs, nowMs) {
  for (const [key, entry] of buckets) {
    if (nowMs - entry.at >= windowMs) buckets.delete(key);
  }
  return buckets.size;
}
__name(pruneExpired, "pruneExpired");
function hitRateLimit(key, limit, windowMs, nowMs = Date.now()) {
  const gateKey = String(key ?? "");
  const entry = buckets.get(gateKey);
  if (!entry || nowMs - entry.at >= windowMs) {
    if (!entry && buckets.size >= MAX_BUCKETS && pruneExpired(windowMs, nowMs) >= MAX_BUCKETS) {
      return { allowed: false, retryAfterMs: windowMs };
    }
    buckets.set(gateKey, { count: 1, at: nowMs });
    return { allowed: true, count: 1 };
  }
  entry.count += 1;
  if (entry.count > limit) {
    return { allowed: false, retryAfterMs: Math.max(1, entry.at + windowMs - nowMs) };
  }
  return { allowed: true, count: entry.count };
}
__name(hitRateLimit, "hitRateLimit");
function peekRateLimit(key, windowMs, nowMs = Date.now()) {
  const gateKey = String(key ?? "");
  const entry = buckets.get(gateKey);
  if (!entry) return 0;
  if (nowMs - entry.at >= windowMs) {
    buckets.delete(gateKey);
    return 0;
  }
  return entry.count;
}
__name(peekRateLimit, "peekRateLimit");
function clearRateLimit(key) {
  buckets.delete(String(key ?? ""));
}
__name(clearRateLimit, "clearRateLimit");
function tooManyRequests(errorText, retryAfterMs) {
  const seconds = Math.max(1, Math.ceil((retryAfterMs || 6e4) / 1e3));
  return new Response(JSON.stringify({ success: false, error: errorText }), {
    status: 429,
    headers: { "Cache-Control": "no-store", "Retry-After": String(seconds) }
  });
}
__name(tooManyRequests, "tooManyRequests");

// _utils/auth/user-key.js
var USER_KEY_PREFIX = "fk_";
var KEY_BODY_BYTES = 24;
var PREVIEW_HEAD = 4;
var PREVIEW_TAIL = 4;
var BASE32_ALPHABET = "0123456789abcdefghjkmnpqrstvwxyz";
function bytesToBase32(bytes) {
  let bits = 0;
  let value = 0;
  let output = "";
  for (const byte of bytes) {
    value = value << 8 | byte;
    bits += 8;
    while (bits >= 5) {
      output += BASE32_ALPHABET[value >>> bits - 5 & 31];
      bits -= 5;
    }
  }
  if (bits > 0) output += BASE32_ALPHABET[value << 5 - bits & 31];
  return output;
}
__name(bytesToBase32, "bytesToBase32");
function generateUserKey() {
  const bytes = new Uint8Array(KEY_BODY_BYTES);
  crypto.getRandomValues(bytes);
  return `${USER_KEY_PREFIX}${bytesToBase32(bytes)}`;
}
__name(generateUserKey, "generateUserKey");
function hashUserKey(key) {
  return sha256Hex(String(key ?? "").trim());
}
__name(hashUserKey, "hashUserKey");
function userKeyPreview(key) {
  const text = String(key ?? "");
  if (text.length <= PREVIEW_HEAD + PREVIEW_TAIL) return text;
  return `${text.slice(0, PREVIEW_HEAD)}\u2026${text.slice(-PREVIEW_TAIL)}`;
}
__name(userKeyPreview, "userKeyPreview");
function generateUserPassword() {
  const groups = [
    "abcdefghjkmnpqrstuvwxyz",
    "ABCDEFGHJKMNPQRSTUVWXYZ",
    "23456789",
    "!@#$%^&*-_=+"
  ];
  const all = groups.join("");
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  const chars = groups.map((group3, index) => group3[bytes[index] % group3.length]);
  for (let i = groups.length; i < bytes.length; i += 1) {
    chars.push(all[bytes[i] % all.length]);
  }
  for (let i = chars.length - 1; i > 0; i -= 1) {
    const j = bytes[i] % (i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join("");
}
__name(generateUserPassword, "generateUserPassword");
function generateUsernameSuffix(length = 4) {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => BASE32_ALPHABET[byte % 32]).join("");
}
__name(generateUsernameSuffix, "generateUsernameSuffix");
var KEY_FAIL_WINDOW_MS = 60 * 1e3;
var KEY_FAIL_LIMIT = 5;
function keyFailGateKey(ip, key) {
  return `key-fail:${ip || "*"}|${String(key ?? "").slice(0, 64)}`;
}
__name(keyFailGateKey, "keyFailGateKey");
function isKeyAuthRateLimited(ip, key, nowMs = Date.now()) {
  return peekRateLimit(keyFailGateKey(ip, key), KEY_FAIL_WINDOW_MS, nowMs) >= KEY_FAIL_LIMIT;
}
__name(isKeyAuthRateLimited, "isKeyAuthRateLimited");
function noteKeyAuthFailure(ip, key, nowMs = Date.now()) {
  hitRateLimit(keyFailGateKey(ip, key), KEY_FAIL_LIMIT, KEY_FAIL_WINDOW_MS, nowMs);
}
__name(noteKeyAuthFailure, "noteKeyAuthFailure");
function noteKeyAuthSuccess(ip, key) {
  clearRateLimit(keyFailGateKey(ip, key));
}
__name(noteKeyAuthSuccess, "noteKeyAuthSuccess");

// _utils/surge-rule/types.js
var RULE_TYPES = /* @__PURE__ */ new Map([
  // 域名
  ["DOMAIN", true],
  ["DOMAIN-SUFFIX", true],
  ["DOMAIN-KEYWORD", true],
  ["DOMAIN-WILDCARD", true],
  ["DOMAIN-SET", true],
  // IP
  ["IP-CIDR", true],
  ["IP-CIDR6", true],
  ["GEOIP", true],
  ["IP-ASN", true],
  // HTTP
  ["USER-AGENT", true],
  ["URL-REGEX", true],
  // 进程
  ["PROCESS-NAME", true],
  // 端口 / 客户端属性
  ["DEST-PORT", true],
  ["SRC-PORT", true],
  ["IN-PORT", true],
  ["SRC-IP", true],
  ["DEVICE-NAME", true],
  ["MAC-ADDRESS", true],
  // 协议与网络
  ["PROTOCOL", true],
  ["HOSTNAME-TYPE", true],
  ["SUBNET", true],
  ["CELLULAR-RADIO", true],
  ["CELLULAR-CARRIER", true],
  // 逻辑规则
  ["AND", true],
  ["OR", true],
  ["NOT", true],
  // 脚本与规则集
  ["SCRIPT", true],
  ["RULE-SET", true],
  // 最终规则：没有值
  ["FINAL", false]
]);
var ALL_RULE_TYPES = Array.from(RULE_TYPES.keys());
var SURGE_POLICIES = ["PROXY", "DIRECT", "REJECT"];

// _utils/surge-rule/params.js
var FLAG_PARAMS = /* @__PURE__ */ new Set([
  "no-resolve",
  "dns-failed",
  "extended-matching",
  "pre-matching",
  "requires-resolve"
]);
var KV_PARAMS = /* @__PURE__ */ new Set([
  "notification-text",
  "notification-interval",
  "update-interval",
  "always-capture"
]);
var RULE_PARAMS = [...FLAG_PARAMS, ...KV_PARAMS];
var FLAG_PARAM_NAMES = [...FLAG_PARAMS];
var KV_PARAM_NAMES = [...KV_PARAMS];
function isFlagParam(name) {
  return FLAG_PARAMS.has(
    String(name || "").trim().toLowerCase()
  );
}
__name(isFlagParam, "isFlagParam");
function isRuleParamSegment(text) {
  const raw = String(text || "").trim();
  if (!raw) return false;
  const name = (raw.split("=")[0] || "").trim().toLowerCase();
  return FLAG_PARAMS.has(name) || KV_PARAMS.has(name);
}
__name(isRuleParamSegment, "isRuleParamSegment");

// _utils/surge-rule/policy.js
function isPolicyName(value) {
  const text = String(value || "").trim();
  if (!text) return false;
  if (text.toUpperCase() === "FINAL") return false;
  if (isRuleParamSegment(text)) return false;
  if (/^device:/i.test(text)) return /^[Dd][Ee][Vv][Ii][Cc][Ee]:[\w.-]+$/.test(text);
  return /^[A-Za-z0-9][A-Za-z0-9_.-]*$/.test(text);
}
__name(isPolicyName, "isPolicyName");
function normalizePolicy(policy, fallback = "PROXY") {
  const text = String(policy || "").trim();
  if (!isPolicyName(text)) return fallback;
  if (/^device:/i.test(text)) return `DEVICE:${text.slice(text.indexOf(":") + 1)}`;
  return text.toUpperCase();
}
__name(normalizePolicy, "normalizePolicy");

// _utils/surge-rule/ip.js
var IPV4_OCTET_RE = /^(\d{1,3})$/;
function isIpOctet(text) {
  if (!IPV4_OCTET_RE.test(text)) return false;
  return Number(text) <= 255;
}
__name(isIpOctet, "isIpOctet");
function isIPv4(value) {
  const parts = String(value).split(".");
  return parts.length === 4 && parts.every((part) => isIpOctet(part));
}
__name(isIPv4, "isIPv4");
function isIPv6(value) {
  const text = String(value);
  if (isIPv4(text)) return false;
  if (!text.includes(":")) return false;
  if (/\.\d{1,3}(\.\d{1,3}){3}$/.test(text)) return true;
  return /([0-9a-fA-F]{1,4}:){1,7}[0-9a-fA-F]{1,4}|::/.test(text);
}
__name(isIPv6, "isIPv6");
function isIntegerPrefix(text) {
  return /^\d+$/.test(text) && Number.isInteger(Number(text));
}
__name(isIntegerPrefix, "isIntegerPrefix");
function isCidr(value) {
  const text = String(value || "");
  const slash = text.lastIndexOf("/");
  if (slash <= 0) return false;
  const address = text.slice(0, slash);
  const prefixText = text.slice(slash + 1);
  if (!isIntegerPrefix(prefixText)) return false;
  const prefix = Number(prefixText);
  const maxPrefix = address.includes(":") ? 128 : 32;
  return prefix <= maxPrefix;
}
__name(isCidr, "isCidr");
function isValidIpLiteral(value) {
  const text = String(value || "").trim();
  if (!text) return false;
  return isCidr(text) || isIPv4(text) || isIPv6(text);
}
__name(isValidIpLiteral, "isValidIpLiteral");
function isInvalidIpLiteral(value) {
  const text = String(value || "").trim();
  if (!text) return false;
  if (/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(text) && !isValidIpLiteral(text)) return true;
  const slash = text.lastIndexOf("/");
  if (slash > 0) {
    const address = text.slice(0, slash);
    const prefixText = text.slice(slash + 1);
    if (/^\d+$/.test(prefixText)) {
      const prefix = Number(prefixText);
      const maxPrefix = address.includes(":") ? 128 : 32;
      if (prefix > maxPrefix) return true;
    }
  }
  return false;
}
__name(isInvalidIpLiteral, "isInvalidIpLiteral");
function canonicalIp(typeName, value) {
  const text = String(value ?? "").trim();
  if (typeName !== "IP-CIDR" && typeName !== "IP-CIDR6") {
    return { type: typeName, value: text };
  }
  if (!text) return { type: typeName, value: text };
  const slash = text.lastIndexOf("/");
  if (slash > 0 && /^\d+$/.test(text.slice(slash + 1))) return { type: typeName, value: text };
  return text.includes(":") ? { type: "IP-CIDR6", value: `${text}/128` } : { type: "IP-CIDR", value: `${text}/32` };
}
__name(canonicalIp, "canonicalIp");

// _utils/surge-rule/host.js
function isHostnameLike(value) {
  const text = String(value || "").trim();
  if (!text) return false;
  if (isIPv4(text) || isIPv6(text)) return true;
  if (text.includes(":")) return true;
  if (text.startsWith(".") || text.startsWith("*") || text.includes('"') || text.includes("'"))
    return false;
  return /^[A-Za-z0-9_-][A-Za-z0-9_-]*(?:\.[A-Za-z0-9_-]+)*$/.test(text) || isCidr(text);
}
__name(isHostnameLike, "isHostnameLike");
function inferHostType(value) {
  const text = String(value ?? "").trim();
  if (!text) return "DOMAIN-SUFFIX";
  if (text.includes(":")) return "IP-CIDR6";
  if (isIPv4(text) || text.includes("/")) return "IP-CIDR";
  return "DOMAIN-SUFFIX";
}
__name(inferHostType, "inferHostType");

// _utils/surge-rule/text.js
function splitRespectingQuotes(text, separator = ",") {
  const parts = [];
  let current = "";
  let quote = "";
  for (const char of text) {
    if (quote) {
      current += char;
      if (char === quote) quote = "";
      continue;
    }
    if (char === '"' || char === "'") {
      quote = char;
      current += char;
      continue;
    }
    if (char === separator) {
      parts.push(current);
      current = "";
      continue;
    }
    current += char;
  }
  parts.push(current);
  return parts.map((part) => part.trim());
}
__name(splitRespectingQuotes, "splitRespectingQuotes");
function stripQuotes(value) {
  const text = String(value ?? "").trim();
  if (text.length >= 2 && (text[0] === '"' && text.endsWith('"') || text[0] === "'" && text.endsWith("'"))) {
    return text.slice(1, -1);
  }
  return text;
}
__name(stripQuotes, "stripQuotes");
function scanCommentStart(text) {
  let quote = "";
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (quote) {
      if (char === quote) quote = "";
      continue;
    }
    if (char === '"' || char === "'") {
      quote = char;
      continue;
    }
    if (char === "/" && text[i + 1] === "/") return i;
    if (char === "#" || char === ";") return i;
  }
  return -1;
}
__name(scanCommentStart, "scanCommentStart");
function formatValue(typeName, value) {
  const text = String(value ?? "");
  return typeName === "URL-REGEX" || text.includes(",") ? `"${text}"` : text;
}
__name(formatValue, "formatValue");

// _utils/surge-rule/parse.js
function parseRuleParams(rawParams) {
  const params = {};
  for (const raw of rawParams) {
    const part = String(raw || "").trim();
    if (!part) continue;
    const eq = part.indexOf("=");
    const name = (eq >= 0 ? part.slice(0, eq) : part).trim().toLowerCase();
    const flag = FLAG_PARAMS.has(name);
    const validName = flag || KV_PARAMS.has(name) || /^[a-z0-9_-]+$/.test(name);
    if (!validName) continue;
    params[name] = flag ? null : eq >= 0 ? part.slice(eq + 1).trim() : "";
  }
  return params;
}
__name(parseRuleParams, "parseRuleParams");
function parseBarePart(bare, comment) {
  if (bare.toUpperCase() === "FINAL") {
    return {
      type: "FINAL",
      value: "",
      policy: "PROXY",
      params: {},
      comment,
      invalid: false,
      policySpecified: false
    };
  }
  if (isHostnameLike(bare)) {
    return {
      type: inferHostType(bare),
      value: bare,
      policy: "PROXY",
      params: {},
      comment,
      invalid: false,
      policySpecified: false
    };
  }
  return null;
}
__name(parseBarePart, "parseBarePart");
function parseDoublePart(parts, comment) {
  const [candidate, second] = parts;
  const typeUpper = String(candidate).trim().toUpperCase();
  if (RULE_TYPES.has(typeUpper) && typeUpper !== "FINAL" && isHostnameLike(second)) {
    return {
      type: typeUpper,
      value: second,
      policy: "",
      params: {},
      comment,
      invalid: false,
      policySpecified: false
    };
  }
  const type = inferHostType(candidate);
  const base = { type, value: candidate, comment, invalid: false };
  if (isRuleParamSegment(second) && isHostnameLike(candidate)) {
    return {
      ...base,
      policy: normalizePolicy("PROXY"),
      params: parseRuleParams([second]),
      policySpecified: false
    };
  }
  if (isPolicyName(second) && isHostnameLike(candidate)) {
    return { ...base, policy: normalizePolicy(second), params: {}, policySpecified: true };
  }
  return null;
}
__name(parseDoublePart, "parseDoublePart");
function parseMultiPart(parts, comment) {
  const type = String(parts[0]).trim().toUpperCase();
  if (!RULE_TYPES.has(type)) {
    return {
      type,
      value: String(parts[1] ?? "").trim(),
      policy: String(parts[2] ?? "").trim(),
      params: {},
      comment,
      invalid: true
    };
  }
  if (type === "FINAL") {
    const finalPolicy = String(parts[1] ?? "").trim();
    return {
      type: "FINAL",
      value: "",
      policy: normalizePolicy(finalPolicy),
      params: parseRuleParams(parts.slice(2)),
      comment,
      invalid: false,
      policySpecified: isPolicyName(finalPolicy)
    };
  }
  return parseTypedPart(type, parts, comment);
}
__name(parseMultiPart, "parseMultiPart");
function parseTypedPart(type, parts, comment) {
  const value = String(parts[1] ?? "").trim();
  const rawPolicy = String(parts[2] ?? "").trim();
  const specified = isPolicyName(rawPolicy);
  const policy = specified ? normalizePolicy(rawPolicy) : normalizePolicy("PROXY");
  const rawParams = parts.slice(3);
  if (!value) {
    return {
      type,
      value,
      policy,
      params: {},
      comment,
      invalid: true,
      policySpecified: specified
    };
  }
  const allParams = [...isRuleParamSegment(rawPolicy) ? [rawPolicy] : [], ...rawParams];
  return {
    type,
    value,
    policy,
    params: parseRuleParams(allParams),
    comment,
    invalid: false,
    policySpecified: specified
  };
}
__name(parseTypedPart, "parseTypedPart");
function parseRuleLine(line) {
  if (!line) return null;
  let text = String(line).trim();
  if (!text || /^[#;]/.test(text)) return null;
  let comment = "";
  const quotePos = scanCommentStart(text);
  if (quotePos > 0) {
    comment = text.slice(quotePos).trim().replace(/^\/\/|#|;/, "").trim();
    text = text.slice(0, quotePos).trim();
  }
  if (!text) return null;
  const parts = splitRespectingQuotes(text).map((part) => stripQuotes(part));
  if (parts.length < 1) return null;
  if (parts.length === 1) return parseBarePart(parts[0], comment);
  if (parts.length === 2) return parseDoublePart(parts, comment);
  return parseMultiPart(parts, comment);
}
__name(parseRuleLine, "parseRuleLine");

// _utils/surge-rule/format.js
function formatRuleItem({ type, value = "", policy, params = {}, comment = "" } = {}) {
  const typeName = String(type || "").trim().toUpperCase() || "DOMAIN-SUFFIX";
  const needsValue = RULE_TYPES.get(typeName);
  const { type: finalType, value: normalizedValue } = canonicalIp(typeName, value);
  const parts = needsValue ? [finalType, formatValue(finalType, normalizedValue), String(policy || "PROXY")] : [finalType, String(policy || "PROXY")];
  for (const [name, paramValue] of Object.entries(params || {})) {
    parts.push(paramValue == null || paramValue === "" ? name : `${name}=${paramValue}`);
  }
  const body = parts.join(",");
  return comment && String(comment).trim() ? `${body} // ${String(comment).trim()}` : body;
}
__name(formatRuleItem, "formatRuleItem");
function joinRuleLines(lines, emptyText = "# \u6682\u65E0\u7B26\u5408\u6761\u4EF6\u7684\u89C4\u5219") {
  return lines.length > 0 ? lines.join("\n") : emptyText;
}
__name(joinRuleLines, "joinRuleLines");
function formatRule(target, policy, comment) {
  const targetText = String(target || "").trim();
  const validPolicy = isPolicyName(policy) ? String(policy).trim().toUpperCase() : "PROXY";
  let type;
  let value;
  if (!targetText) {
    type = "DOMAIN-SUFFIX";
    value = "";
  } else if (targetText.includes("/")) {
    type = targetText.includes(":") ? "IP-CIDR6" : "IP-CIDR";
    value = targetText;
  } else if (isIPv4(targetText)) {
    type = "IP-CIDR";
    value = `${targetText}/32`;
  } else if (isIPv6(targetText)) {
    type = "IP-CIDR6";
    value = `${targetText}/128`;
  } else {
    type = "DOMAIN-SUFFIX";
    value = targetText;
  }
  return formatRuleItem({ type, value, policy: validPolicy, comment });
}
__name(formatRule, "formatRule");

// _utils/logs/schema.js
var LOGS_TABLE = "surge_logs";
var WRITE_COLUMNS = "hostname, type, value, params, source, ip, username, first_time, time, count, match_key";
var BATCH_CHUNK_SIZE = 100;
var BATCH_MAX_LINES = 5e3;
var BATCH_REQUEST_MAX_LINES = 1e3;
var MAX_PARAM_LENGTH = 1024;
var MAX_SOURCE_LENGTH = 128;
var MAX_IP_LENGTH = 64;
var MAX_USERNAME_LENGTH = 64;
var FINAL_KEY = "FINAL";
var LOGS_SCHEMA = BASE_DDL.filter((sql) => /surge_logs/i.test(sql)).join(";\n\n") + ";";
function safeCount(value) {
  return Math.max(1, Number(value) || 1);
}
__name(safeCount, "safeCount");
function nowIso() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
__name(nowIso, "nowIso");

// _utils/logs/codec.js
function encodeParams(params = {}) {
  const entries = [];
  for (const [name, raw] of Object.entries(params || {})) {
    const key = String(name || "").trim().toLowerCase();
    if (!key) continue;
    if (!RULE_PARAMS.includes(key)) continue;
    const flag = isFlagParam(key);
    const valueText = flag ? "" : String(raw ?? "").trim();
    if (!flag && !valueText) continue;
    entries.push(flag ? key : `${key}=${valueText}`);
  }
  return entries.join(",").slice(0, MAX_PARAM_LENGTH);
}
__name(encodeParams, "encodeParams");
function decodeParams(text) {
  const out = {};
  const raw = String(text || "").trim();
  if (!raw) return out;
  for (const part of raw.split(",")) {
    const item = part.trim();
    if (!item) continue;
    const eq = item.indexOf("=");
    const key = (eq >= 0 ? item.slice(0, eq) : item).trim().toLowerCase();
    if (!key) continue;
    out[key] = isFlagParam(key) ? null : eq >= 0 ? item.slice(eq + 1).trim() : "";
  }
  return out;
}
__name(decodeParams, "decodeParams");
function parseParamsText(text) {
  const parsed = {};
  for (const part of String(text || "").split(",")) {
    const item = part.trim();
    if (!item) continue;
    const eq = item.indexOf("=");
    const key = (eq >= 0 ? item.slice(0, eq) : item).trim().toLowerCase();
    if (!key) continue;
    parsed[key] = isFlagParam(key) ? null : eq >= 0 ? item.slice(eq + 1).trim() : "";
  }
  return parsed;
}
__name(parseParamsText, "parseParamsText");
function normalizeParamsObject(params) {
  if (!params || typeof params !== "object" || Array.isArray(params)) return {};
  return decodeParams(encodeParams(params));
}
__name(normalizeParamsObject, "normalizeParamsObject");

// _utils/logs/normalize.js
function normalizeRulePolicy(policy) {
  return normalizePolicy(policy, "PROXY");
}
__name(normalizeRulePolicy, "normalizeRulePolicy");
function normalizeRuleType(type) {
  const text = String(type ?? "").trim().toUpperCase();
  return RULE_TYPES.has(text) ? text : "DOMAIN-SUFFIX";
}
__name(normalizeRuleType, "normalizeRuleType");
function normalizeSource(source) {
  return String(source ?? "").replace(/\s+/g, " ").trim().slice(0, MAX_SOURCE_LENGTH);
}
__name(normalizeSource, "normalizeSource");
function normalizeIp(ip) {
  let text = String(ip ?? "").trim();
  if (!text) return "";
  if (text.startsWith("[") && text.includes("]")) text = text.slice(1, text.indexOf("]"));
  else if (/^(\d{1,3}\.){3}\d{1,3}:\d+$/.test(text)) text = text.split(":")[0];
  return text.slice(0, MAX_IP_LENGTH);
}
__name(normalizeIp, "normalizeIp");
function normalizeUsername(username) {
  return String(username ?? "").replace(/\s+/g, " ").trim().slice(0, MAX_USERNAME_LENGTH);
}
__name(normalizeUsername, "normalizeUsername");
function normalizeLogRow(row) {
  const type = normalizeRuleType(row.type);
  const value = row.value == null ? "" : String(row.value);
  const hostname = String(row.hostname ?? "").trim() || value;
  const overridePolicy = row.override_policy == null ? "" : String(row.override_policy);
  const overrideComment = row.override_comment == null ? "" : String(row.override_comment).trim();
  const pinnedComment = row.pinned_comment == null ? "" : String(row.pinned_comment).trim();
  const pinnedKind = String(row.pinned_kind ?? "").trim();
  const aiBest = row.ai_best == null ? "" : String(row.ai_best);
  const effectivePolicy = normalizeRulePolicy(overridePolicy || aiBest || "PROXY");
  const hasAiVotes = (Number(row.ai_direct) || 0) + (Number(row.ai_proxy) || 0) + (Number(row.ai_reject) || 0) > 0;
  const policySource = overridePolicy ? "override" : aiBest ? hasAiVotes ? "ai" : "preset" : "default";
  const comment = overrideComment || pinnedComment;
  const commentKind = overrideComment ? "override" : pinnedComment ? pinnedKind || "manual" : "";
  return {
    id: row.id,
    hostname,
    type,
    value,
    /** 生效策略（置顶覆盖 → AI 最高方案 → PROXY）：导出与展示统一用它 */
    policy: effectivePolicy,
    /** 策略来源：override = ✋ 置顶 / ai = AI 判定 / default = 默认 PROXY */
    policy_source: policySource,
    params: decodeParams(row.params),
    /** 置顶注释（手动写的或添加域名时自动生成的；为空时前端回退展示 AI 注释） */
    comment,
    /** 置顶注释来源：override = v7 旧列 / manual = 用户手写 / preset = 添加时自动插入 */
    comment_kind: commentKind,
    source: row.source == null ? "" : String(row.source),
    ip: row.ip == null ? "" : String(row.ip),
    username: row.username == null ? "" : String(row.username),
    first_time: row.first_time == null ? "" : String(row.first_time),
    time: String(row.time ?? ""),
    count: safeCount(row.count),
    /** ✋ 手动管理（快速编辑保存 / 「手动管理该规则并保存」置位）：AI 调度优先但不改写其策略 */
    manual_edited: Number(row.manual_edited) ? 1 : 0,
    /** AI 已处理过：自动化调度跳过 */
    ai_processed: Number(row.ai_processed) ? 1 : 0,
    /**
     * AI 判定汇总（v1.6.0，LEFT JOIN domain_summary 带出；无判定记录时为 null）：
     * best_action / 三向票数 / 平均置信度 / 冷却天数 / 最后判定时间 / 最新注释
     */
    ai: row.ai_best == null ? null : {
      best_action: String(row.ai_best ?? ""),
      direct_votes: Number(row.ai_direct) || 0,
      proxy_votes: Number(row.ai_proxy) || 0,
      reject_votes: Number(row.ai_reject) || 0,
      avg_confidence: Number(row.ai_confidence) || 0,
      last_checked_at: String(row.ai_checked_at ?? ""),
      cooldown_days: Number(row.ai_cooldown_days) || 0,
      latest_comment: String(row.ai_comment ?? "")
    }
  };
}
__name(normalizeLogRow, "normalizeLogRow");

// _utils/device-profiles.js
var DEVICE_TYPE = {
  SURGE_IOS: "surge-ios",
  SURGE_MAC: "surge-mac",
  SURGE_IPAD: "surge-ipad",
  ROUTER_PLUGIN: "router-plugin",
  API_CLIENT: "api-client"
};
var MAX_PARAM_LENGTH2 = 64;
var DEVICE_PROFILES = {
  [DEVICE_TYPE.SURGE_IOS]: {
    code: "A",
    label: "Surge iOS",
    versionDetection: true,
    panelExpected: true,
    tracked: ["panel", "logger"]
  },
  [DEVICE_TYPE.SURGE_MAC]: {
    code: "B",
    label: "Surge Mac",
    versionDetection: true,
    panelExpected: true,
    tracked: ["panel", "logger"]
  },
  [DEVICE_TYPE.SURGE_IPAD]: {
    code: "C",
    label: "Surge iPad",
    versionDetection: true,
    panelExpected: true,
    tracked: ["panel", "logger"]
  },
  [DEVICE_TYPE.ROUTER_PLUGIN]: {
    code: "D",
    label: "\u8DEF\u7531\u5668\u63D2\u4EF6",
    versionDetection: true,
    panelExpected: false,
    tracked: ["logger"]
  },
  [DEVICE_TYPE.API_CLIENT]: {
    code: "E",
    label: "\u7EAF API",
    versionDetection: false,
    panelExpected: false,
    tracked: []
  }
};
var cleanParam = /* @__PURE__ */ __name((value) => String(value ?? "").trim().slice(0, MAX_PARAM_LENGTH2), "cleanParam");
function inferFromDeviceName(deviceName) {
  const name = String(deviceName ?? "").toLowerCase();
  if (!name) return "";
  if (name.includes("ipad")) return DEVICE_TYPE.SURGE_IPAD;
  if (name.includes("iphone")) return DEVICE_TYPE.SURGE_IOS;
  if (name.includes("mac") || name.includes("macbook") || name.includes("imac"))
    return DEVICE_TYPE.SURGE_MAC;
  return "";
}
__name(inferFromDeviceName, "inferFromDeviceName");
function inferFromUserAgent(userAgent) {
  const ua = String(userAgent ?? "").toLowerCase();
  if (!ua) return "";
  if (/openwrt|padavan|merlin|asuswrt|miwifi|router|curl\/|python-requests|okhttp/.test(ua)) {
    return DEVICE_TYPE.ROUTER_PLUGIN;
  }
  return "";
}
__name(inferFromUserAgent, "inferFromUserAgent");
function resolveDeviceType(request, body = {}) {
  const explicit = cleanParam(body?.deviceType);
  if (explicit && DEVICE_PROFILES[explicit]) return explicit;
  const headerPlatform = cleanParam(request.headers.get("x-final-platform"));
  if (headerPlatform && DEVICE_PROFILES[headerPlatform]) return headerPlatform;
  const byName = inferFromDeviceName(request.headers.get("x-final-device") || body?.source);
  if (byName) return byName;
  const byUa = inferFromUserAgent(request.headers.get("user-agent"));
  if (byUa) return DEVICE_TYPE.ROUTER_PLUGIN;
  const hasDeviceContext = request.headers.get("x-final-client") || request.headers.get("x-final-device") || request.headers.get("x-final-user");
  if (hasDeviceContext) return "";
  return DEVICE_TYPE.API_CLIENT;
}
__name(resolveDeviceType, "resolveDeviceType");
function collectPlatformParams(request, body = {}, deviceType = "") {
  const header = /* @__PURE__ */ __name((name) => cleanParam(request.headers.get(name)), "header");
  const fromBody = /* @__PURE__ */ __name((key) => cleanParam(body?.[key]), "fromBody");
  const pick2 = /* @__PURE__ */ __name((headerName, bodyKey) => fromBody(bodyKey) || header(headerName), "pick");
  const params = {
    platform: deviceType,
    systemVersion: pick2("x-final-system", "systemVersion"),
    surgeVersion: pick2("x-final-surge-version", "surgeVersion"),
    surgeBuild: pick2("x-final-surge-build", "surgeBuild"),
    pluginVersion: pick2("x-final-plugin-version", "pluginVersion"),
    model: pick2("x-final-device", "source") || fromBody("model")
  };
  for (const key of Object.keys(params)) {
    if (!params[key]) delete params[key];
  }
  return params;
}
__name(collectPlatformParams, "collectPlatformParams");
function versionInputsFor(deviceType, { panelVersion = "", loggerVersion = "", platformParams = {} } = {}) {
  const profile3 = DEVICE_PROFILES[deviceType];
  if (!profile3 || !profile3.versionDetection) return null;
  if (deviceType === DEVICE_TYPE.ROUTER_PLUGIN) {
    return {
      panelVersion: "",
      loggerVersion: loggerVersion || platformParams.pluginVersion || ""
    };
  }
  return { panelVersion, loggerVersion };
}
__name(versionInputsFor, "versionInputsFor");
function serializePlatformParams(params) {
  try {
    return JSON.stringify(params ?? {}).slice(0, 1024);
  } catch {
    return "";
  }
}
__name(serializePlatformParams, "serializePlatformParams");
function parsePlatformParams(raw) {
  try {
    const parsed = JSON.parse(String(raw ?? "{}"));
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}
__name(parsePlatformParams, "parsePlatformParams");
function normalizeDeviceType(value) {
  const key = String(value ?? "").trim();
  return DEVICE_PROFILES[key] ? key : "";
}
__name(normalizeDeviceType, "normalizeDeviceType");

// _utils/build-meta.js
var BUILD_LABEL = "1.34.0 (f98dbc3)";
var COMPONENT_VERSIONS = { panel: "1.34.0", logger: "1.34.0", sgmodule: "1.34.0" };
var PANEL_ORIGIN = "https://final-axx.pages.dev";

// _utils/devices/version.js
var DEVICE_CONFIG_STATUS = { LATEST: "latest", OUTDATED: "outdated", FAILED: "failed" };
function parseSemver(value) {
  const match2 = String(value ?? "").trim().match(/^(\d+)\.(\d+)\.(\d+)/);
  if (!match2) return null;
  return { major: Number(match2[1]), minor: Number(match2[2]), patch: Number(match2[3]) };
}
__name(parseSemver, "parseSemver");
function compareSemver(a, b) {
  const left = parseSemver(a);
  const right = parseSemver(b);
  if (!left || !right) return null;
  if (left.major !== right.major) return left.major < right.major ? -1 : 1;
  if (left.minor !== right.minor) return left.minor < right.minor ? -1 : 1;
  if (left.patch !== right.patch) return left.patch < right.patch ? -1 : 1;
  return 0;
}
__name(compareSemver, "compareSemver");
function versionLevel(client, server) {
  const order = compareSemver(client, server);
  if (order === null) return "unknown";
  if (order === 0) return "ok";
  if (order > 0) return "ahead";
  const clientMajor = parseSemver(client).major;
  const serverMajor = parseSemver(server).major;
  return clientMajor < serverMajor ? "major-behind" : "minor-behind";
}
__name(versionLevel, "versionLevel");
function configStatusFromVersions(panelVersion, loggerVersion, components = COMPONENT_VERSIONS) {
  const statuses = [];
  for (const [reported, expected] of [
    [panelVersion, components.panel],
    [loggerVersion, components.logger]
  ]) {
    if (!reported) continue;
    const order = compareSemver(reported, expected || "");
    statuses.push(
      order === null || order < 0 ? DEVICE_CONFIG_STATUS.OUTDATED : DEVICE_CONFIG_STATUS.LATEST
    );
  }
  if (!statuses.length) return DEVICE_CONFIG_STATUS.FAILED;
  if (statuses.includes(DEVICE_CONFIG_STATUS.OUTDATED)) return DEVICE_CONFIG_STATUS.OUTDATED;
  return DEVICE_CONFIG_STATUS.LATEST;
}
__name(configStatusFromVersions, "configStatusFromVersions");

// _utils/devices/resources.js
var EXTERNAL_RESOURCES_MIN = { ios: "5.23.0", macos: "6.10.0" };
var MAX_RESOURCES_LENGTH = 2048;
function resourceCapability(system, surgeVersion, deviceType = "") {
  if (deviceType === DEVICE_TYPE.ROUTER_PLUGIN || deviceType === DEVICE_TYPE.API_CLIENT)
    return "nonsurge";
  const sys = String(system ?? "").toLowerCase();
  let minimum = "";
  if (sys.indexOf("ipados") === 0 || sys.indexOf("ios") === 0)
    minimum = EXTERNAL_RESOURCES_MIN.ios;
  else if (sys.indexOf("macos") === 0 || sys.indexOf("os x") === 0)
    minimum = EXTERNAL_RESOURCES_MIN.macos;
  if (!minimum) return "unknown";
  const order = compareSemver(surgeVersion, minimum);
  if (order === null) return "unknown";
  return order < 0 ? "outdated" : "supported";
}
__name(resourceCapability, "resourceCapability");
function parseResourceSnapshot(raw) {
  let parsed;
  try {
    parsed = JSON.parse(String(raw ?? ""));
  } catch {
    return null;
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
  const snapshot = {
    cap: String(parsed.cap ?? "").slice(0, 32),
    policies: {},
    scripts: {},
    at: Math.max(0, Math.floor(Number(parsed.at) || 0))
  };
  const clampEntry = /* @__PURE__ */ __name((value) => ({
    updatedAt: Math.max(0, Math.floor(Number(value?.updatedAt) || 0)),
    revision: Math.max(0, Math.floor(Number(value?.revision) || 0))
  }), "clampEntry");
  for (const [key, value] of Object.entries(parsed.policies ?? {})) {
    if (!/^[a-z]{3,12}$/.test(key) || Object.keys(snapshot.policies).length >= 8) break;
    snapshot.policies[key] = clampEntry(value);
  }
  for (const [key, value] of Object.entries(parsed.scripts ?? {})) {
    if (!/^[a-z]{3,12}$/.test(key) || Object.keys(snapshot.scripts).length >= 8) break;
    snapshot.scripts[key] = {
      updatedAt: Math.max(0, Math.floor(Number(value?.updatedAt) || 0))
    };
  }
  if (!snapshot.cap && !Object.keys(snapshot.policies).length && !Object.keys(snapshot.scripts).length)
    return null;
  return snapshot;
}
__name(parseResourceSnapshot, "parseResourceSnapshot");
function serializeResourceSnapshot(snapshot) {
  if (!snapshot) return "";
  try {
    return JSON.stringify(snapshot).slice(0, MAX_RESOURCES_LENGTH);
  } catch {
    return "";
  }
}
__name(serializeResourceSnapshot, "serializeResourceSnapshot");
function resourceStatusFromSnapshot(snapshot, capability, currentRevisions = {}) {
  if (capability !== "supported")
    return { subscriptions: {}, resourceStatus: "", stalePolicies: [] };
  if (!snapshot) return { subscriptions: {}, resourceStatus: "unknown", stalePolicies: [] };
  const subscriptions = { proxy: false, direct: false, reject: false };
  const stalePolicies = [];
  for (const [policy, entry] of Object.entries(snapshot.policies ?? {})) {
    const subscribed = Number(entry?.updatedAt) > 0;
    subscriptions[policy] = subscribed;
    if (!subscribed) continue;
    const current = Number(currentRevisions[policy]?.n);
    if (Number.isFinite(current) && current > 0 && Number(entry.revision) < current) {
      stalePolicies.push(policy);
    }
  }
  const subscribedAny = Object.values(subscriptions).some(Boolean);
  return {
    subscriptions,
    resourceStatus: !subscribedAny ? "unknown" : stalePolicies.length ? "outdated" : "latest",
    stalePolicies
  };
}
__name(resourceStatusFromSnapshot, "resourceStatusFromSnapshot");

// _utils/devices/core.js
var MAX_DEVICE_ID_LENGTH = 96;
var MAX_VERSION_LENGTH = 32;
var DEVICE_OFFLINE_FLOOR_MS = 5 * 60 * 1e3;
var DEVICE_OFFLINE_DEFAULT_MS = 20 * 60 * 1e3;
function clientIp(request) {
  const cf = String(request.headers.get("cf-connecting-ip") ?? "").trim();
  if (cf) return normalizeIp(cf);
  const forwarded = String(request.headers.get("x-forwarded-for") ?? "").trim();
  return normalizeIp(forwarded.split(",")[0] || "");
}
__name(clientIp, "clientIp");
var cleanHeader = /* @__PURE__ */ __name((request, name) => String(request.headers.get(name) ?? "").trim().slice(0, MAX_VERSION_LENGTH), "cleanHeader");
function parseDeviceHeaders(request) {
  const cleanParam2 = /* @__PURE__ */ __name((name) => String(request.headers.get(name) ?? "").trim().slice(0, MAX_VERSION_LENGTH), "cleanParam");
  return {
    clientId: cleanHeader(request, "x-final-client").slice(0, MAX_DEVICE_ID_LENGTH),
    name: normalizeSource(request.headers.get("x-final-device")),
    username: normalizeUsername(request.headers.get("x-final-user")),
    panelVersion: cleanHeader(request, "x-final-version"),
    loggerVersion: cleanHeader(request, "x-final-logger"),
    refreshSeconds: Math.max(
      0,
      Math.floor(Number(request.headers.get("x-final-refresh")) || 0)
    ),
    deviceType: cleanParam2("x-final-platform"),
    systemVersion: cleanParam2("x-final-system"),
    surgeVersion: cleanParam2("x-final-surge-version"),
    surgeBuild: cleanParam2("x-final-surge-build"),
    pluginVersion: cleanParam2("x-final-plugin-version"),
    resourcesRaw: String(request.headers.get("x-final-resources") ?? "").trim().slice(0, MAX_RESOURCES_LENGTH)
  };
}
__name(parseDeviceHeaders, "parseDeviceHeaders");
function buildDeviceId({ clientId = "", name = "", username = "", ip = "" } = {}) {
  if (clientId) return `client:${clientId}`.slice(0, MAX_DEVICE_ID_LENGTH);
  const account = normalizeUsername(username);
  if (account) return `user:${account}`.slice(0, MAX_DEVICE_ID_LENGTH);
  const triple = [normalizeSource(name), normalizeIp(ip)].map((part) => part || "*").join("|");
  return `dev:${triple}`.slice(0, MAX_DEVICE_ID_LENGTH);
}
__name(buildDeviceId, "buildDeviceId");
function collapseByIdentity(devices) {
  const keep = [];
  const keyed = /* @__PURE__ */ new Map();
  const withClient = /* @__PURE__ */ new Set();
  for (const device of devices) {
    const key = identityKey(device);
    if (device.deviceId.startsWith("client:")) {
      keep.push(device);
      withClient.add(key);
      continue;
    }
    if (!keyed.has(key)) keyed.set(key, device);
  }
  for (const [key, device] of keyed) {
    if (!withClient.has(key)) keep.push(device);
  }
  return keep;
}
__name(collapseByIdentity, "collapseByIdentity");
function identityKey(device) {
  const account = String(device.username ?? "").trim().toLowerCase();
  const model = String(device.name ?? "").trim().toLowerCase();
  return account ? `user:${account}` : model ? `dev:${model}` : `dev:${device.deviceId}`;
}
__name(identityKey, "identityKey");
function offlineWindowMs(refreshSeconds) {
  const reported = Math.floor(Number(refreshSeconds) || 0);
  if (reported <= 0) return DEVICE_OFFLINE_DEFAULT_MS;
  return Math.max(DEVICE_OFFLINE_FLOOR_MS, reported * 2 * 1e3);
}
__name(offlineWindowMs, "offlineWindowMs");
function isDeviceOnline(lastOnlineIso, refreshSeconds = 0, nowMs = Date.now()) {
  const stamp = Date.parse(String(lastOnlineIso ?? ""));
  if (!Number.isFinite(stamp)) return false;
  return nowMs - stamp < offlineWindowMs(refreshSeconds);
}
__name(isDeviceOnline, "isDeviceOnline");
function deviceAlert(device) {
  const profile3 = DEVICE_PROFILES[device.deviceType] ?? null;
  if (!device.online) {
    return {
      deviceId: device.deviceId,
      name: device.name || device.ip || device.deviceId,
      username: device.username,
      type: "offline",
      level: "secondary",
      message: "\u8BBE\u5907\u79BB\u7EBF"
    };
  }
  if (device.configStatus === DEVICE_CONFIG_STATUS.OUTDATED && profile3?.versionDetection !== false) {
    return {
      deviceId: device.deviceId,
      name: device.name || device.ip || device.deviceId,
      username: device.username,
      type: "outdated",
      level: "warning",
      message: "\u914D\u7F6E\u8FC7\u671F\uFF1A\u7EC4\u4EF6\u7248\u672C\u843D\u540E\u4E8E\u670D\u52A1\u7AEF\uFF0C\u8BF7\u66F4\u65B0\u6A21\u5757\u5E76\u91CD\u65B0\u53E6\u5B58\u6355\u83B7\u811A\u672C"
    };
  }
  if (device.configStatus === DEVICE_CONFIG_STATUS.FAILED && profile3?.versionDetection !== false) {
    return {
      deviceId: device.deviceId,
      name: device.name || device.ip || device.deviceId,
      username: device.username,
      type: "failed",
      level: "danger",
      message: "\u914D\u7F6E\u6821\u9A8C\u5931\u8D25\uFF1A\u8BBE\u5907\u672A\u4E0A\u62A5\u7EC4\u4EF6\u7248\u672C\uFF0C\u65E0\u6CD5\u786E\u8BA4\u914D\u7F6E\u662F\u5426\u6700\u65B0"
    };
  }
  if (device.resourceStatus === "outdated" && (device.stalePolicies ?? []).length) {
    return {
      deviceId: device.deviceId,
      name: device.name || device.ip || device.deviceId,
      username: device.username,
      type: "resource-outdated",
      level: "warning",
      message: `\u8BA2\u9605\u8D44\u6E90\u5F85\u66F4\u65B0\uFF1A${(device.stalePolicies ?? []).join(" / ")} \u89C4\u5219\u843D\u540E\u4E8E\u670D\u52A1\u7AEF\u7248\u672C\uFF0C\u9762\u677F\u5237\u65B0\u65F6\u5C06\u81EA\u52A8\u540C\u6B65`
    };
  }
  return null;
}
__name(deviceAlert, "deviceAlert");
function deviceSummary(devices) {
  const alerts = [];
  for (const device of devices) {
    const alert = deviceAlert(device);
    if (alert) alerts.push(alert);
  }
  const levelOrder = { danger: 0, warning: 1, secondary: 2 };
  alerts.sort((a, b) => (levelOrder[a.level] ?? 3) - (levelOrder[b.level] ?? 3));
  return {
    total: devices.length,
    online: devices.filter((device) => device.online).length,
    alertCount: alerts.length,
    alerts
  };
}
__name(deviceSummary, "deviceSummary");
function selectCleanupTargets(devices, { mode = "unbound", olderThanDays = 30, boundUsernames = [] } = {}) {
  const bound = new Set(
    boundUsernames.map(
      (name) => String(name ?? "").trim().toLowerCase()
    )
  );
  if (mode === "duplicates") {
    const keepIds = new Set(collapseByIdentity(devices).map((device) => device.deviceId));
    return devices.filter((device) => !device.online && !keepIds.has(device.deviceId));
  }
  if (mode === "older") {
    const days = Math.max(1, Math.floor(Number(olderThanDays) || 30));
    const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1e3).toISOString();
    return devices.filter((device) => device.lastOnlineTime && device.lastOnlineTime < cutoff);
  }
  if (mode === "offline") {
    return devices.filter((device) => !device.online);
  }
  return devices.filter(
    (device) => !device.online && (!device.username || !bound.has(device.username.toLowerCase()))
  );
}
__name(selectCleanupTargets, "selectCleanupTargets");

// _utils/devices/rows.js
function normalizeDeviceRow(row, nowMs, currentRevisions = {}) {
  const name = String(row.name ?? "");
  const username = String(row.username ?? "");
  const ip = String(row.ip ?? "");
  const refreshSeconds = Math.max(0, Math.floor(Number(row.refresh_seconds) || 0));
  const lastOnlineTime = String(row.last_online_time ?? "");
  const deviceType = String(row.device_type ?? "");
  const profile3 = DEVICE_PROFILES[deviceType] ?? null;
  const platformParams = parsePlatformParams(row.platform_params);
  const snapshot = parseResourceSnapshot(row.resources);
  const resourceCap = resourceCapability(
    platformParams.systemVersion,
    platformParams.surgeVersion,
    deviceType
  );
  const { subscriptions, resourceStatus, stalePolicies } = resourceStatusFromSnapshot(
    snapshot,
    resourceCap,
    currentRevisions
  );
  return {
    deviceId: String(row.device_id ?? ""),
    name,
    username,
    ip,
    panelVersion: String(row.panel_version ?? ""),
    loggerVersion: String(row.logger_version ?? ""),
    configStatus: String(row.config_status ?? DEVICE_CONFIG_STATUS.FAILED),
    refreshSeconds,
    lastOnlineTime,
    firstSeen: String(row.first_seen ?? ""),
    updatedAt: String(row.updated_at ?? ""),
    online: isDeviceOnline(lastOnlineTime, refreshSeconds, nowMs),
    offlineAfterMs: offlineWindowMs(refreshSeconds),
    deviceType,
    typeCode: profile3?.code ?? "",
    typeLabel: profile3?.label ?? (deviceType ? deviceType : "\u672A\u6807\u6CE8"),
    versionDetection: profile3?.versionDetection ?? true,
    platformParams,
    resourceCap,
    resourceSnapshot: snapshot,
    subscriptions,
    resourceStatus,
    stalePolicies
  };
}
__name(normalizeDeviceRow, "normalizeDeviceRow");

// _utils/devices/store.js
async function touchDevice(db, {
  clientId = "",
  name = "",
  username = "",
  ip = "",
  panelVersion = "",
  loggerVersion = "",
  refreshSeconds = 0,
  deviceType = "",
  platformParams = null,
  resources = null
} = {}) {
  const deviceId = buildDeviceId({ clientId, name, username, ip });
  if (!deviceId || deviceId === "dev:*|*|*") return null;
  const now2 = (/* @__PURE__ */ new Date()).toISOString();
  const cleanVersion = /* @__PURE__ */ __name((value) => String(value ?? "").trim().slice(0, MAX_VERSION_LENGTH), "cleanVersion");
  const input = {
    panelVersion: cleanVersion(panelVersion),
    loggerVersion: cleanVersion(loggerVersion),
    type: normalizeDeviceType(deviceType),
    platformParams
  };
  const previous = await readPreviousTouch(db, deviceId);
  const merged = mergeTouchInput(input, previous, serializeResourceSnapshot(resources));
  await upsertDeviceRow(db, {
    deviceId,
    name: normalizeSource(name),
    username: normalizeUsername(username),
    ip: normalizeIp(ip),
    refresh: Math.max(0, Math.floor(Number(refreshSeconds) || 0)),
    now: now2,
    ...merged
  });
  return { deviceId, configStatus: merged.status };
}
__name(touchDevice, "touchDevice");
async function readPreviousTouch(db, deviceId) {
  let previous = {
    panel_version: "",
    logger_version: "",
    device_type: "",
    platform_params: "",
    resources: ""
  };
  try {
    const [row] = await db.execute(
      `SELECT panel_version, logger_version, device_type, platform_params, resources FROM ${DEVICES_TABLE} WHERE device_id = ?`,
      [deviceId]
    );
    if (row) {
      previous = {
        panel_version: String(row.panel_version ?? ""),
        logger_version: String(row.logger_version ?? ""),
        device_type: String(row.device_type ?? ""),
        platform_params: String(row.platform_params ?? ""),
        resources: String(row.resources ?? "")
      };
    }
  } catch {
  }
  return previous;
}
__name(readPreviousTouch, "readPreviousTouch");
function mergeTouchInput(input, previous, incomingResources) {
  const mergedPanel = input.panelVersion || previous.panel_version;
  const mergedLogger = input.loggerVersion || previous.logger_version;
  const mergedType = input.type || previous.device_type;
  const mergedParams = {
    ...parsePlatformParams(previous.platform_params),
    ...input.platformParams ?? {}
  };
  const effectiveLogger = mergedLogger || (mergedType === DEVICE_TYPE.ROUTER_PLUGIN ? String(mergedParams.pluginVersion ?? "") : "");
  const inputs = versionInputsFor(mergedType, {
    panelVersion: mergedPanel,
    loggerVersion: effectiveLogger,
    platformParams: mergedParams
  });
  const status4 = inputs ? configStatusFromVersions(inputs.panelVersion, inputs.loggerVersion) : DEVICE_CONFIG_STATUS.LATEST;
  return {
    mergedPanel,
    effectiveLogger,
    mergedType,
    mergedParams,
    status: status4,
    incomingResources,
    previousResources: previous.resources
  };
}
__name(mergeTouchInput, "mergeTouchInput");
async function upsertDeviceRow(db, row) {
  await db.batch([
    {
      sql: `INSERT INTO ${DEVICES_TABLE} (device_id, name, username, ip, panel_version, logger_version, config_status, refresh_seconds, last_online_time, first_seen, updated_at, device_type, platform_params, resources)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(device_id) DO UPDATE SET
              name = CASE WHEN excluded.name != '' THEN excluded.name ELSE ${DEVICES_TABLE}.name END,
              username = CASE WHEN excluded.username != '' THEN excluded.username ELSE ${DEVICES_TABLE}.username END,
              ip = CASE WHEN excluded.ip != '' THEN excluded.ip ELSE ${DEVICES_TABLE}.ip END,
              panel_version = CASE WHEN excluded.panel_version != '' THEN excluded.panel_version ELSE ${DEVICES_TABLE}.panel_version END,
              logger_version = CASE WHEN excluded.logger_version != '' THEN excluded.logger_version ELSE ${DEVICES_TABLE}.logger_version END,
              config_status = excluded.config_status,
              refresh_seconds = CASE WHEN excluded.refresh_seconds > 0 THEN excluded.refresh_seconds ELSE ${DEVICES_TABLE}.refresh_seconds END,
              last_online_time = excluded.last_online_time,
              updated_at = excluded.updated_at,
              device_type = CASE WHEN excluded.device_type != '' THEN excluded.device_type ELSE ${DEVICES_TABLE}.device_type END,
              platform_params = excluded.platform_params,
              resources = CASE WHEN excluded.resources != '' THEN excluded.resources ELSE ${DEVICES_TABLE}.resources END`,
      params: [
        row.deviceId,
        row.name,
        row.username,
        row.ip,
        row.mergedPanel,
        row.effectiveLogger,
        row.status,
        row.refresh,
        row.now,
        row.now,
        row.now,
        row.mergedType,
        serializePlatformParams(row.mergedParams),
        row.incomingResources || row.previousResources
      ]
    }
  ]);
}
__name(upsertDeviceRow, "upsertDeviceRow");
async function listDevices(db, { limit = 100, deviceType = "", username = "", collapse = true, exportVersions = null } = {}) {
  const nowMs = Date.now();
  const filters = [];
  const params = [];
  if (deviceType) {
    filters.push("device_type = ?");
    params.push(normalizeDeviceType(deviceType));
  }
  if (username) {
    filters.push("username = ?");
    params.push(normalizeUsername(username));
  }
  const where = filters.length ? `WHERE ${filters.join(" AND ")}` : "";
  params.push(Math.max(1, Math.min(Number(limit) || 100, 500)));
  const rows = await db.execute(
    `SELECT device_id, name, username, ip, panel_version, logger_version, config_status, refresh_seconds, last_online_time, first_seen, updated_at, device_type, platform_params, resources
     FROM ${DEVICES_TABLE} ${where} ORDER BY last_online_time DESC LIMIT ?`,
    params
  );
  const revisions = exportVersions ?? {};
  const devices = rows.map((row) => normalizeDeviceRow(row, nowMs, revisions));
  return collapse ? collapseByIdentity(devices) : devices;
}
__name(listDevices, "listDevices");
async function getDevicesReport(db, { limit = 100, deviceType = "", username = "", devices = null, exportVersions = null } = {}) {
  const rows = devices ?? await listDevices(db, { limit, deviceType, username, exportVersions });
  return { devices: rows, deviceSummary: deviceSummary(rows) };
}
__name(getDevicesReport, "getDevicesReport");
async function deleteDevicesByIds(db, deviceIds) {
  const ids = [...new Set((deviceIds ?? []).map((id) => String(id)).filter(Boolean))];
  const deleted = [];
  for (let start = 0; start < ids.length; start += 50) {
    const chunk = ids.slice(start, start + 50);
    await db.batch([
      {
        sql: `DELETE FROM ${DEVICES_TABLE} WHERE device_id IN (${chunk.map(() => "?").join(", ")})`,
        params: chunk
      }
    ]);
    deleted.push(...chunk);
  }
  return deleted;
}
__name(deleteDevicesByIds, "deleteDevicesByIds");

// _utils/user-channels.js
var MAX_UA_LENGTH = 200;
async function buildChannelId({ clientId, ip, userAgent }) {
  const uaDigest = (await sha256Hex(String(userAgent ?? ""))).slice(0, 12);
  return [clientId || "*", ip || "*", uaDigest].join("|");
}
__name(buildChannelId, "buildChannelId");
async function upsertUserChannel(db, {
  userId,
  clientId = "",
  username = "",
  ip = "",
  userAgent = "",
  clientVersion = "",
  refreshSeconds = 0
} = {}) {
  if (!userId) return null;
  const channelId = await buildChannelId({ clientId, ip, userAgent });
  const now2 = (/* @__PURE__ */ new Date()).toISOString();
  const version2 = String(clientVersion ?? "").trim().slice(0, 32);
  const cleanClientId = String(clientId ?? "").trim().slice(0, 96);
  const cleanIp = normalizeIp(ip);
  const cleanUa = String(userAgent ?? "").trim().slice(0, MAX_UA_LENGTH);
  const refresh = Math.max(0, Math.floor(Number(refreshSeconds) || 0));
  try {
    const [row] = await db.execute(
      `SELECT client_version FROM ${USER_CHANNELS_TABLE} WHERE channel_id = ?`,
      [channelId]
    );
    const mergedVersion = version2 || String(row?.client_version ?? "");
    await db.batch([
      {
        sql: `INSERT INTO ${USER_CHANNELS_TABLE} (channel_id, user_id, client_id, device_id, client_version, ip, user_agent, refresh_seconds, last_active_time, connected_at, updated_at)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
              ON CONFLICT(channel_id) DO UPDATE SET
                user_id = excluded.user_id,
                client_id = excluded.client_id,
                device_id = excluded.device_id,
                client_version = excluded.client_version,
                ip = CASE WHEN excluded.ip != '' THEN excluded.ip ELSE ${USER_CHANNELS_TABLE}.ip END,
                user_agent = excluded.user_agent,
                refresh_seconds = CASE WHEN excluded.refresh_seconds > 0 THEN excluded.refresh_seconds ELSE ${USER_CHANNELS_TABLE}.refresh_seconds END,
                last_active_time = excluded.last_active_time,
                updated_at = excluded.updated_at`,
        params: [
          channelId,
          userId,
          cleanClientId,
          // 设备标识与 devices 注册表同一把尺（clientId → 账号）：通道的 device_id
          // 从此能和设备行对上，不再按 IP 各算一套
          buildDeviceId({ clientId: cleanClientId, username, ip: cleanIp }),
          mergedVersion,
          cleanIp,
          cleanUa,
          refresh,
          now2,
          now2,
          now2
        ]
      }
    ]);
    return { channelId, clientVersion: mergedVersion };
  } catch {
    return null;
  }
}
__name(upsertUserChannel, "upsertUserChannel");
function normalizeChannelRow(row, nowMs) {
  const lastActiveTime = String(row.last_active_time ?? "");
  const refreshSeconds = Math.max(0, Math.floor(Number(row.refresh_seconds) || 0));
  return {
    channelId: String(row.channel_id ?? ""),
    clientId: String(row.client_id ?? ""),
    deviceId: String(row.device_id ?? ""),
    clientVersion: String(row.client_version ?? ""),
    ip: String(row.ip ?? ""),
    userAgent: String(row.user_agent ?? ""),
    lastActiveTime,
    connectedAt: String(row.connected_at ?? ""),
    online: isDeviceOnline(lastActiveTime, refreshSeconds, nowMs),
    offlineAfterMs: offlineWindowMs(refreshSeconds)
  };
}
__name(normalizeChannelRow, "normalizeChannelRow");
async function listUserChannels(db, userId, { limit = 50 } = {}) {
  const nowMs = Date.now();
  const rows = await db.execute(
    `SELECT channel_id, user_id, client_id, device_id, client_version, ip, user_agent, refresh_seconds, last_active_time, connected_at, updated_at
     FROM ${USER_CHANNELS_TABLE} WHERE user_id = ? ORDER BY last_active_time DESC LIMIT ?`,
    [userId, Math.max(1, Math.min(Number(limit) || 50, 200))]
  );
  return rows.map((row) => normalizeChannelRow(row, nowMs));
}
__name(listUserChannels, "listUserChannels");
async function deleteUserChannels(db, userId) {
  await db.execute(`DELETE FROM ${USER_CHANNELS_TABLE} WHERE user_id = ?`, [userId]);
}
__name(deleteUserChannels, "deleteUserChannels");

// _utils/auth/principal-resolve.js
var URL_TOKEN_PATHS = /* @__PURE__ */ new Set(["/api/logger/hit", "/api/logger/hits", "/api/ai/run"]);
var URL_TOKEN_PREFIXES = ["/api/trigger/"];
function allowUrlToken(request) {
  try {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, "");
    if (path === "/api/health") return url.searchParams.get("mode") === "deep";
    return URL_TOKEN_PATHS.has(path) || URL_TOKEN_PREFIXES.some((prefix) => `${path}/`.startsWith(prefix));
  } catch {
    return false;
  }
}
__name(allowUrlToken, "allowUrlToken");
var authStateCache = { enabled: null, at: 0 };
var AUTH_CACHE_TTL_MS = 5 * 1e3;
function invalidateAuthStateCache() {
  authStateCache = { enabled: null, at: 0 };
}
__name(invalidateAuthStateCache, "invalidateAuthStateCache");
function deferBackgroundWrite(context2, promise) {
  const tracked = Promise.resolve(promise).catch(() => {
  });
  if (context2?.waitUntil) {
    try {
      context2.waitUntil(tracked);
    } catch {
    }
  }
  return tracked;
}
__name(deferBackgroundWrite, "deferBackgroundWrite");
async function isAuthEnabled(db, nowMs = Date.now()) {
  if (authStateCache.enabled !== null && nowMs - authStateCache.at < AUTH_CACHE_TTL_MS) {
    return authStateCache.enabled;
  }
  const enabled = await hasAnyUser(db);
  authStateCache = { enabled, at: nowMs };
  return enabled;
}
__name(isAuthEnabled, "isAuthEnabled");
async function sessionPrincipal(db, token, context2 = null) {
  if (!token) return null;
  const row = await findLiveSession(db, token);
  if (!row) return null;
  if (String(row.status ?? "active") !== "active") return null;
  deferBackgroundWrite(context2, touchSession(db, row.token_hash));
  const principal = {
    type: "user",
    user: {
      id: Number(row.u_id),
      username: String(row.username ?? ""),
      displayName: String(row.display_name ?? ""),
      uid: String(row.uid ?? ""),
      role: String(row.role ?? "user"),
      groupId: row.group_id == null ? null : Number(row.group_id),
      status: String(row.status ?? "active"),
      permissions: parsePermissions(row.permissions),
      // v1.25 角色权限：users.role 命中自定义角色行时带出（builtin 无行 = 空对象）
      rolePermissions: parsePermissions(row.role_permissions)
    },
    group: row.group_id != null ? {
      id: Number(row.group_id),
      name: String(row.group_name ?? ""),
      permissions: parsePermissions(row.group_permissions),
      parentId: row.group_parent_id == null ? null : Number(row.group_parent_id)
    } : null,
    session: { tokenHash: row.token_hash, expiresAt: String(row.expires_at ?? "") }
  };
  await attachGroupAncestors(db, principal);
  return principal;
}
__name(sessionPrincipal, "sessionPrincipal");
async function userKeyPrincipal(env2, db, request, context2 = null) {
  const key = String(request.headers.get("x-final-key") ?? "").trim();
  if (!key) return null;
  const ip = clientIp(request);
  if (isKeyAuthRateLimited(ip, key)) {
    return { type: "invalid-key", code: "key-rate-limited", via: "user-key" };
  }
  const matched = await findUserByKeyHash(db, await hashUserKey(key));
  if (!matched) {
    noteKeyAuthFailure(ip, key);
    return { type: "invalid-key", code: "key-invalid", via: "user-key" };
  }
  if (matched.disabled) {
    noteKeyAuthFailure(ip, key);
    return { type: "invalid-key", code: "user-disabled", via: "user-key" };
  }
  const quota = matched.keyQuota;
  if (quota.total > 0 && (quota.remaining <= 0 || !await consumeUserKeyQuota(db, matched.id))) {
    return { type: "invalid-key", code: "key-exhausted", via: "user-key" };
  }
  noteKeyAuthSuccess(ip, key);
  deferBackgroundWrite(context2, touchUserKeyUse(db, matched.id));
  const device = parseDeviceHeaders(request);
  const clientVersion = device.panelVersion || device.loggerVersion;
  await deferBackgroundWrite(
    context2,
    upsertUserChannel(db, {
      userId: matched.id,
      clientId: device.clientId,
      username: matched.username,
      ip,
      userAgent: request.headers.get("user-agent") ?? "",
      clientVersion,
      refreshSeconds: device.refreshSeconds
    })
  );
  const principal = {
    type: "user",
    user: {
      id: matched.id,
      username: matched.username,
      // uid 随身份透传（T33-7 #138）：灰度白名单 uid 形态在密钥通道同款命中
      uid: String(matched.uid ?? ""),
      displayName: matched.displayName,
      role: matched.role,
      groupId: matched.groupId,
      status: matched.status,
      permissions: matched.permissions,
      rolePermissions: matched.rolePermissions ?? {}
    },
    group: matched.group,
    via: "user-key",
    session: null,
    // 额度随身份透传：/stats 据此在耗尽前带回预警（审计 P1-2 方案 C）
    keyQuota: matched.keyQuota
  };
  await attachGroupAncestors(db, principal);
  return principal;
}
__name(userKeyPrincipal, "userKeyPrincipal");
async function attachGroupAncestors(db, principal) {
  const group3 = principal?.group;
  if (!group3) return principal;
  if (group3.parentId == null) {
    group3.ancestors = [];
    return principal;
  }
  group3.ancestors = await getGroupAncestors(db, group3.id);
  return principal;
}
__name(attachGroupAncestors, "attachGroupAncestors");
async function resolvePrincipal(env2, db, request, token, context2 = null) {
  const session = await sessionPrincipal(db, token, context2);
  if (session) return session;
  const keyed = await userKeyPrincipal(env2, db, request, context2);
  if (keyed) return keyed;
  const supplied = String(token ?? "");
  const hitTokens = splitTokenList(configuredHitToken(env2));
  if (hitTokens.length && isAnyTokenMatch(hitTokens, supplied)) {
    return { type: "token", role: "report", via: "hit-token" };
  }
  return null;
}
__name(resolvePrincipal, "resolvePrincipal");
function isPrincipalAdmin(principal) {
  if (!principal) return false;
  if (principal.via === "user-key") return false;
  return principal.type === "user" && principal.user?.role === "admin";
}
__name(isPrincipalAdmin, "isPrincipalAdmin");

// _utils/auth/principal.js
var NO_STORE2 = { "Cache-Control": "no-store" };
function invalidKeyResponse(principal) {
  const messages = {
    "key-invalid": "\u5BC6\u94A5\u65E0\u6548\uFF1AX-Final-Key \u4E0D\u5339\u914D\u4EFB\u4F55\u7528\u6237\uFF0C\u8BF7\u5230\u9762\u677F\u300C\u7528\u6237\u300D\u9875\u6838\u5BF9\u6216\u91CD\u65B0\u751F\u6210",
    "user-disabled": "\u5BC6\u94A5\u5BF9\u5E94\u7684\u8D26\u53F7\u5DF2\u88AB\u7981\u7528\uFF1A\u8BF7\u8054\u7CFB\u7BA1\u7406\u5458",
    "key-rate-limited": "\u5BC6\u94A5\u9274\u6743\u5931\u8D25\u6B21\u6570\u8FC7\u591A\uFF1A\u8BF7 1 \u5206\u949F\u540E\u91CD\u8BD5\uFF08\u8FDE\u7EED\u5931\u8D25\u4F1A\u89E6\u53D1\u9650\u901F\uFF09",
    "key-exhausted": "\u8C03\u7528\u989D\u5EA6\u5DF2\u7528\u5B8C\uFF1A\u5BC6\u94A5\u81EA\u52A8\u5931\u6548\u3002\u8BF7\u8054\u7CFB\u7BA1\u7406\u5458\u5728\u300C\u7528\u6237\u300D\u9875\u91CD\u7F6E\u989D\u5EA6\uFF08\u91CD\u7F6E\u540E\u539F\u5BC6\u94A5\u6062\u590D\u53EF\u7528\uFF0C\u65E0\u9700\u66F4\u6362\uFF09"
  };
  const status4 = principal.code === "key-rate-limited" ? 429 : principal.code === "user-disabled" || principal.code === "key-exhausted" ? 403 : 401;
  return jsonResponse(
    { success: false, code: principal.code, error: messages[principal.code] ?? "\u5BC6\u94A5\u9274\u6743\u5931\u8D25" },
    { status: status4, headers: NO_STORE2 }
  );
}
__name(invalidKeyResponse, "invalidKeyResponse");
function denyMutation(authEnabled) {
  return jsonResponse(
    {
      success: false,
      error: authEnabled ? "\u5DF2\u542F\u7528\u591A\u7528\u6237\u9274\u6743\uFF1A\u7981\u6B62\u533F\u540D\u6DFB\u52A0\u6570\u636E\uFF0C\u8BF7\u5148\u767B\u5F55\u8D26\u53F7\uFF0C\u6216\u5728\u8BF7\u6C42\u5934\u643A\u5E26 X-Final-Key \u7528\u6237\u5BC6\u94A5\uFF08\u300C\u7528\u6237\u300D\u9875\u53EF\u751F\u6210 / \u91CD\u7F6E\uFF09" : "\u672A\u901A\u8FC7\u5199\u64CD\u4F5C\u9274\u6743\uFF1A\u8BF7\u5148\u5728\u300C\u7528\u6237\u300D\u9875\u521D\u59CB\u5316\u591A\u7528\u6237\u4F53\u7CFB\u5E76\u4F7F\u7528\u7528\u6237\u5BC6\u94A5\uFF08X-Final-Key\uFF09\u9274\u6743"
    },
    { status: 401, headers: NO_STORE2 }
  );
}
__name(denyMutation, "denyMutation");
async function requireMutationAuth(env2, db, request, context2) {
  const supplied = extractToken(request) || (allowUrlToken(request) ? extractUrlOrHeaderToken(context2) : "");
  const principal = await resolvePrincipal(env2, db, request, supplied, context2);
  if (principal && principal.type === "user") {
    return { ok: true, principal };
  }
  if (principal?.type === "invalid-key") {
    return { ok: false, response: invalidKeyResponse(principal) };
  }
  const authEnabled = await isAuthEnabled(db);
  if (authEnabled) {
    if (principal?.role === "report") {
      return {
        ok: false,
        response: jsonResponse(
          {
            success: false,
            error: "\u4E0A\u62A5\u4EE4\u724C\u4EC5\u9650\u6570\u636E\u4E0A\u62A5\uFF0C\u4E0D\u80FD\u6267\u884C\u9762\u677F\u5199\u64CD\u4F5C\uFF1A\u8BF7\u767B\u5F55\u8D26\u53F7\u6216\u643A\u5E26 X-Final-Key \u7528\u6237\u5BC6\u94A5"
          },
          { status: 403, headers: NO_STORE2 }
        )
      };
    }
    return { ok: false, response: denyMutation(true) };
  }
  if (!await hasAnyUser(db)) {
    return { ok: true, principal: { type: "anonymous-legacy" } };
  }
  return { ok: false, response: denyMutation(true) };
}
__name(requireMutationAuth, "requireMutationAuth");
async function requireReportAuth(env2, db, context2) {
  const supplied = extractUrlOrHeaderToken(context2) || extractToken(context2.request);
  const principal = await resolvePrincipal(env2, db, context2.request, supplied, context2);
  if (principal?.type === "user") return { ok: true, principal };
  if (principal?.type === "invalid-key") {
    return { ok: false, principal, response: invalidKeyResponse(principal) };
  }
  if (anyConfiguredToken(env2).length) {
    const denied = requireHitToken(env2, supplied);
    if (denied) return { ok: false, response: denied };
    return { ok: true, principal: { type: "token", role: "report", via: "hit-token" } };
  }
  const authEnabled = await isAuthEnabled(db);
  if (!authEnabled && !await hasAnyUser(db)) {
    return { ok: true, principal: { type: "anonymous-legacy" } };
  }
  return { ok: false, response: denyMutation(true) };
}
__name(requireReportAuth, "requireReportAuth");
async function requireAdminAuth(env2, db, request, context2) {
  const supplied = extractToken(request);
  const principal = await resolvePrincipal(env2, db, request, supplied, context2);
  if (isPrincipalAdmin(principal)) return { ok: true, principal };
  if (principal?.type === "invalid-key") {
    return { ok: false, response: invalidKeyResponse(principal) };
  }
  const authEnabled = await isAuthEnabled(db);
  return {
    ok: false,
    response: jsonResponse(
      {
        success: false,
        error: principal?.via === "user-key" ? "\u7528\u6237\u5BC6\u94A5\u4E0D\u80FD\u8BBF\u95EE\u7BA1\u7406\u9762\uFF1A\u8BF7\u7528\u8D26\u53F7\u5BC6\u7801\u767B\u5F55\u7BA1\u7406\u5458" : authEnabled ? "\u9700\u8981\u7BA1\u7406\u5458\u8EAB\u4EFD\uFF1A\u8BF7\u7528\u7BA1\u7406\u5458\u8D26\u53F7\u767B\u5F55\u540E\u518D\u64CD\u4F5C" : "\u9274\u6743\u4F53\u7CFB\u5C1A\u672A\u521D\u59CB\u5316\uFF1A\u8BF7\u5148\u8C03\u7528 POST /api/auth/bootstrap \u521B\u5EFA\u7BA1\u7406\u5458"
      },
      { status: authEnabled ? 403 : 409, headers: NO_STORE2 }
    )
  };
}
__name(requireAdminAuth, "requireAdminAuth");
function readOnlyWarningHeaders(env2, authEnabled) {
  return authEnabled ? {} : warningHeadersIfOpen(env2);
}
__name(readOnlyWarningHeaders, "readOnlyWarningHeaders");
async function guardPrincipal(env2, db, request, context2, { auth = "mutation", feature = null, featurePath = null } = {}) {
  let gate;
  if (auth === "admin") gate = await requireAdminAuth(env2, db, request, context2);
  else if (auth === "report") gate = await requireReportAuth(env2, db, context2);
  else gate = await requireMutationAuth(env2, db, request, context2);
  if (!gate.ok) return gate;
  if (feature) {
    const denied = await requireFeature(gate.principal, feature, {
      path: featurePath,
      db
    });
    if (denied) return { ok: false, response: denied };
  }
  return { ok: true, principal: gate.principal };
}
__name(guardPrincipal, "guardPrincipal");

// _utils/db/turso-adapter.js
function toRows(results) {
  if (!results || !Array.isArray(results.columns)) return [];
  const { columns, rows = [] } = results;
  return rows.map((row) => {
    const record = {};
    columns.forEach((col, i) => {
      record[col] = row[i];
    });
    return record;
  });
}
__name(toRows, "toRows");
function toChanges(statement) {
  return Number(
    statement?.results?.rows_written ?? statement?.results?.affected_row_count ?? statement?.changes
  ) || 0;
}
__name(toChanges, "toChanges");
var TursoAdapter = class {
  
  backend = "turso";
  maxBatchSize = DEFAULT_MAX_BATCH_SIZE;
  #config = null;
  ready = Promise.resolve();
  /** 解析配置；缺变量 / 协议错误抛 ConfigError（路由 400 语义） */
  init(env2) {
    const config2 = getTursoConfig(env2);
    if (!config2) throw new ConfigError(CONFIG_ERROR_MSG);
    this.#config = config2;
  }
  /** 诊断信息：只暴露主机名，绝不回传令牌与完整地址 */
  describe() {
    return `turso @ ${redactUrl(this.#config?.url ?? "")}`;
  }
  async ping() {
    try {
      await this.execute("SELECT 1");
    } catch (error3) {
      throw asDbError(error3);
    }
  }
  async execute(sql, params = []) {
    const results = await this.batch([{ sql, params }]);
    return results[0].rows;
  }
  /** 原子语句组：一次网络往返、一个远端事务，失败自动回滚并抛 DbError */
  async batch(statements) {
    let payload;
    try {
      payload = await executeTursoBatch(this.#config, statements);
    } catch (error3) {
      throw asDbError(error3);
    }
    return payload.map((statement) => ({
      rows: toRows(statement.results),
      changes: toChanges(statement)
    }));
  }
};

// _utils/db/d1-adapter.js
var D1_BINDING_NAME = "DB_D1";
var D1Adapter = class {
  
  backend = "d1";
  // D1 单次批量语句数上限按官方限额取保守值；成对操作（上限 200 条语句的批量上报）
  // 必须整体落进同一个批量，这里不设得更小
  maxBatchSize = 200;
  #binding = null;
  ready = Promise.resolve();
  init(env2) {
    const binding2 = env2?.[D1_BINDING_NAME];
    if (!binding2 || typeof binding2.prepare !== "function") {
      throw new ConfigError(
        `DB_BACKEND=d1 \u9700\u8981 Pages \u5E73\u53F0\u7ED1\u5B9A D1 \u6570\u636E\u5E93\uFF1A\u5728 wrangler.toml \u914D\u7F6E d1_databases \u5E76\u5728\u63A7\u5236\u53F0\u628A\u7ED1\u5B9A\u540D\u8BBE\u4E3A ${D1_BINDING_NAME}`
      );
    }
    this.#binding = binding2;
  }
  describe() {
    return "d1 (\u5E73\u53F0\u7ED1\u5B9A)";
  }
  #bind(sql, params) {
    const query2 = this.#binding.prepare(sql);
    return Array.isArray(params) && params.length ? query2.bind(...params) : query2;
  }
  async ping() {
    try {
      await this.execute("SELECT 1");
    } catch (error3) {
      throw asDbError(error3);
    }
  }
  async execute(sql, params = []) {
    try {
      const result = await this.#bind(sql, params).all();
      return Array.isArray(result?.results) ? result.results : [];
    } catch (error3) {
      throw asDbError(error3);
    }
  }
  /** 原子语句组：D1 batch 即事务，任一语句失败整体回滚 */
  async batch(statements) {
    if (!Array.isArray(statements) || !statements.length) return [];
    if (statements.length > this.maxBatchSize) {
      throw new Error(
        `D1 \u5355\u6B21\u6279\u91CF\u6700\u591A ${this.maxBatchSize} \u6761\u8BED\u53E5\uFF0C\u6536\u5230 ${statements.length} \u6761`
      );
    }
    try {
      const results = await this.#binding.batch(
        statements.map((s) => this.#bind(s.sql, s.params))
      );
      return results.map((result) => ({
        rows: Array.isArray(result?.results) ? result.results : [],
        changes: Number(result?.meta?.changes ?? 0) || 0
      }));
    } catch (error3) {
      throw asDbError(error3);
    }
  }
};

// _utils/db/sqlite-adapter.js
var SQLITE_PATH_VAR = "DB_SQLITE_PATH";
var SqliteAdapter = class {
  
  backend = "sqlite";
  maxBatchSize = DEFAULT_MAX_BATCH_SIZE;
  /** 库实例句柄：自托管脚本与测试直接读数的通道（实现细节，业务层勿依赖） */
  db = null;
  ready = Promise.resolve();
  async init(env2) {
    const path = String(env2?.[SQLITE_PATH_VAR] ?? "").trim();
    if (!path) {
      throw new ConfigError(
        `DB_BACKEND=sqlite \u9700\u8981\u73AF\u5883\u53D8\u91CF ${SQLITE_PATH_VAR} \u6307\u5B9A SQLite \u6570\u636E\u5E93\u6587\u4EF6\u8DEF\u5F84\uFF08:memory: \u4EA6\u53EF\uFF09`
      );
    }
    let DatabaseSync;
    try {
      const moduleSpecifier = "node:sqlite";
      ({ DatabaseSync } = await import(moduleSpecifier));
      this.db = new DatabaseSync(path);
    } catch (error3) {
      throw new ConfigError(
        `sqlite \u540E\u7AEF\u521D\u59CB\u5316\u5931\u8D25\uFF08\u9700\u8981 Node 22.5+ \u7684 node:sqlite \u4E0E\u53EF\u5199\u7684\u5E93\u6587\u4EF6\u8DEF\u5F84\uFF09\uFF1A${error3?.message ?? error3}`
      );
    }
  }
  describe() {
    return "sqlite (\u672C\u5730\u6587\u4EF6)";
  }
  async ping() {
    try {
      this.#run("SELECT 1");
    } catch (error3) {
      throw asDbError(error3);
    }
  }
  #run(sql, params = []) {
    const statement = this.db.prepare(sql);
    const text = sql.replace(/\s+/g, " ").trim();
    if (/^(select|pragma|with)\s/i.test(text)) {
      return { rows: statement.all(...params), changes: 0 };
    }
    const info3 = statement.run(...params);
    return { rows: [], changes: Number(info3.changes) || 0 };
  }
  async execute(sql, params = []) {
    try {
      return this.#run(sql, params).rows;
    } catch (error3) {
      throw asDbError(error3);
    }
  }
  /** 原子语句组：同一事务提交，任一失败整体回滚 */
  async batch(statements) {
    if (!Array.isArray(statements) || !statements.length) return [];
    try {
      this.db.exec("BEGIN IMMEDIATE");
      try {
        const out = statements.map(
          (statement) => this.#run(statement.sql, statement.params ?? [])
        );
        this.db.exec("COMMIT");
        return out;
      } catch (error3) {
        this.db.exec("ROLLBACK");
        throw asDbError(error3);
      }
    } catch (error3) {
      if (error3 instanceof Error && error3.name === "DbError") throw error3;
      throw asDbError(error3);
    }
  }
};

// _utils/db/factory.js
var DB_BACKENDS = ["turso", "d1", "sqlite"];
var DB_BACKEND_VAR = "DB_BACKEND";
var ADAPTER_CLASSES = {
  turso: TursoAdapter,
  d1: D1Adapter,
  sqlite: SqliteAdapter
};
function resolveDbBackend(env2) {
  const raw = String(env2?.[DB_BACKEND_VAR] ?? "").trim().toLowerCase();
  if (!raw) return "turso";
  if (!DB_BACKENDS.includes(raw)) {
    throw new ConfigError(`DB_BACKEND \u53D6\u503C\u4E0D\u5408\u6CD5\uFF1A${raw}\uFF08\u53EF\u9009\uFF1A${DB_BACKENDS.join(" / ")}\uFF09`);
  }
  return raw;
}
__name(resolveDbBackend, "resolveDbBackend");
var bindingIds = /* @__PURE__ */ new WeakMap();
var nextBindingId = 1;
function signatureFor(env2, backend) {
  if (backend === "turso") return `turso|${String(env2?.TURSO_API_URL ?? "")}`;
  if (backend === "sqlite") return `sqlite|${String(env2?.[SQLITE_PATH_VAR] ?? "")}`;
  const binding2 = env2?.[D1_BINDING_NAME];
  if (!binding2) return "d1|missing";
  if (!bindingIds.has(binding2)) bindingIds.set(binding2, nextBindingId);
  return `d1|${bindingIds.get(binding2)}`;
}
__name(signatureFor, "signatureFor");
var cache2 = /* @__PURE__ */ new Map();
async function getAdapter(env2) {
  const backend = resolveDbBackend(env2);
  const signature = signatureFor(env2, backend);
  const existing = cache2.get(signature);
  if (existing) {
    try {
      await existing.ready;
      return existing;
    } catch (error3) {
      cache2.delete(signature);
      throw error3;
    }
  }
  const AdapterClass = ADAPTER_CLASSES[backend];
  const adapter = new AdapterClass();
  adapter.maxBatchSize = adapter.maxBatchSize || DEFAULT_MAX_BATCH_SIZE;
  adapter.ready = (async () => {
    await adapter.init(env2);
    await ensureSchema(adapter);
  })();
  cache2.set(signature, adapter);
  try {
    await adapter.ready;
  } catch (error3) {
    cache2.delete(signature);
    throw error3;
  }
  return adapter;
}
__name(getAdapter, "getAdapter");
async function resolveAdapter(env2) {
  try {
    return { adapter: await getAdapter(env2) };
  } catch (error3) {
    if (error3 instanceof ConfigError) {
      return {
        response: jsonResponse({ success: false, error: error3.message }, { status: 400 })
      };
    }
    throw error3;
  }
}
__name(resolveAdapter, "resolveAdapter");
function describeBackend(adapter) {
  return `${adapter.backend} \xB7 ${adapter.describe()}`;
}
__name(describeBackend, "describeBackend");

// api/_health/shared.js
var TAG = "api/health";
var DEEP_THROTTLE_MS = 60 * 1e3;
var REQUIRED_LOG_COLUMNS = [
  "hostname",
  "type",
  "value",
  "params",
  "source",
  "ip",
  "username",
  "first_time",
  "time",
  "count"
];
var REQUIRED_DEVICE_COLUMNS = [
  "device_id",
  "name",
  "username",
  "ip",
  "panel_version",
  "logger_version",
  "config_status",
  "last_online_time"
];
var CHECK_CATEGORIES = [
  { id: "system", label: "\u7CFB\u7EDF\u914D\u7F6E", description: "\u73AF\u5883\u53D8\u91CF\u3001\u9274\u6743\u4F53\u7CFB\u4E0E\u4EE4\u724C\u5728\u4F4D\u6027" },
  { id: "database", label: "\u6570\u636E\u5E93", description: "\u8FDE\u901A\u6027\u3001Schema \u4E00\u81F4\u6027\u3001\u8BFB\u5199\u6743\u9650\u4E0E\u63A2\u9488" },
  { id: "client", label: "Surge \u5BA2\u6237\u7AEF", description: "\u9762\u677F\u5FC3\u8DF3\u3001\u8BBE\u5907\u5728\u7EBF\u72B6\u6001\u4E0E\u914D\u7F6E\u544A\u8B66" },
  { id: "version", label: "\u7248\u672C\u4E0E\u66F4\u65B0", description: "\u9762\u677F / \u811A\u672C / \u6A21\u5757\u7248\u672C\u6BD4\u5BF9\u4E0E\u5206\u53D1\u901A\u9053" }
];
var DOC = {
  env: "docs/deploy.md#3-\u914D\u7F6E\u73AF\u5883\u53D8\u91CF",
  db: "docs/deploy.md#\u90E8\u7F72\u6559\u7A0Bturso--cloudflare-pages",
  schema: "docs/deploy.md#4-\u5EFA\u8868\u4E00\u6B21\u6027",
  read: "docs/deploy.md#4-\u5EFA\u8868\u4E00\u6B21\u6027",
  probe: "docs/deploy.md#\u90E8\u7F72\u6559\u7A0Bturso--cloudflare-pages",
  client: "docs/surge-setup.md#surge-\u5B89\u88C5\u6559\u7A0B",
  version: "docs/pwa.md#\u7248\u672C\u4F53\u7CFB\u4E0E\u4E00\u81F4\u6027\u6BD4\u5BF9"
};
function check(id, name, category, doc, fn, flags2 = {}) {
  return { id, name, category, doc, fn, ...flags2 };
}
__name(check, "check");
function now() {
  return Date.now();
}
__name(now, "now");
async function runProbe(db) {
  const marker = `probe-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  const payload = JSON.stringify({ ok: 1, at: (/* @__PURE__ */ new Date()).toISOString() });
  const results = await db.batch([
    {
      sql: `INSERT INTO ${HEALTH_PROBE_TABLE} (marker, payload, created_at) VALUES (?, ?, ?)`,
      params: [marker, payload, (/* @__PURE__ */ new Date()).toISOString()]
    },
    {
      sql: `SELECT marker, payload FROM ${HEALTH_PROBE_TABLE} WHERE marker = ?`,
      params: [marker]
    },
    { sql: `DELETE FROM ${HEALTH_PROBE_TABLE} WHERE marker = ?`, params: [marker] }
  ]);
  const [inserted, readBack, deleted] = results;
  return {
    writeOk: inserted.changes > 0,
    readOk: readBack.rows.length === 1 && readBack.rows[0].payload === payload,
    deleteOk: deleted.changes === 1
  };
}
__name(runProbe, "runProbe");
function checkConfig(env2) {
  const issues = [];
  let backend;
  try {
    backend = resolveDbBackend(env2);
  } catch (error3) {
    return {
      status: "fail",
      detail: error3.message,
      fix: `\u628A DB_BACKEND \u6539\u4E3A ${DB_BACKENDS.join(" / ")}`
    };
  }
  if (backend === "turso") {
    const url = String(env2.TURSO_API_URL ?? "").trim();
    const token = String(env2.TURSO_AUTH_TOKEN ?? "").trim();
    if (!url || !token) {
      issues.push(
        `\u7F3A\u5C11\u73AF\u5883\u53D8\u91CF\uFF1A${[!url && "TURSO_API_URL", !token && "TURSO_AUTH_TOKEN"].filter(Boolean).join("\u3001")}`
      );
    } else if (url.startsWith("libsql://")) {
      issues.push(
        "TURSO_API_URL \u4E0D\u80FD\u7528 libsql:// \u534F\u8BAE\uFF08Workers \u65E0\u6CD5\u89E3\u6790\uFF09\uFF0C\u8BF7\u6539\u4E3A https:// \u5F62\u5F0F"
      );
    } else {
      try {
        const parsed = new URL(url);
        if (parsed.protocol !== "https:")
          issues.push(`TURSO_API_URL \u5FC5\u987B\u662F https:// \u5F00\u5934\uFF0C\u5F53\u524D\u4E3A ${parsed.protocol}`);
      } catch {
        issues.push(`TURSO_API_URL \u4E0D\u662F\u5408\u6CD5\u5730\u5740\uFF1A${redactUrl(url)}`);
      }
    }
  } else if (backend === "d1") {
    const binding2 = env2.DB_D1;
    if (!binding2 || typeof binding2.prepare !== "function") {
      issues.push(`DB_BACKEND=d1 \u9700\u8981\u5E73\u53F0\u7ED1\u5B9A D1 \u6570\u636E\u5E93\uFF08\u7ED1\u5B9A\u540D DB_D1\uFF09`);
    }
  } else if (backend === "sqlite") {
    if (!String(env2.DB_SQLITE_PATH ?? "").trim()) {
      issues.push("DB_BACKEND=sqlite \u9700\u8981\u73AF\u5883\u53D8\u91CF DB_SQLITE_PATH \u6307\u5B9A\u672C\u5730\u5E93\u6587\u4EF6\u8DEF\u5F84");
    }
  }
  if (issues.length) {
    return { status: "fail", detail: issues.join("\uFF1B"), fix: "\u6309\u7F3A\u5931\u9879\u8865\u9F50\u73AF\u5883\u53D8\u91CF", backend };
  }
  return {
    status: "pass",
    detail: `\u73AF\u5883\u53D8\u91CF\u5728\u4F4D\uFF08\u540E\u7AEF ${backend}\uFF09`,
    fix: "",
    backend
  };
}
__name(checkConfig, "checkConfig");

// api/_health/schema-checks.js
function schemaCheck() {
  return check(
    3,
    "Schema \u4E00\u81F4\u6027",
    "database",
    DOC.schema,
    async (ctx) => {
      const state = await describeSchemaState(ctx.db, "surge_logs", REQUIRED_LOG_COLUMNS);
      if (!state.ok)
        return {
          status: "fail",
          detail: state.detail,
          fix: "\u90E8\u7F72\u540E\u8BBF\u95EE /api/schema \u53D6\u5EFA\u8868\u8BED\u53E5\uFF0C\u6216\u7B49\u5F85\u9996\u6B21\u8BBF\u95EE\u81EA\u52A8\u8FC1\u79FB"
        };
      const devices = await describeSchemaState(ctx.db, "devices", [
        ...REQUIRED_DEVICE_COLUMNS,
        "device_type"
      ]);
      if (!devices.ok)
        return {
          status: "fail",
          detail: devices.detail,
          fix: "\u9996\u6B21\u8BBF\u95EE\u4EFB\u610F /api \u63A5\u53E3\u4F1A\u81EA\u52A8\u8FC1\u79FB\uFF1B\u4E5F\u53EF\u8BBF\u95EE /api/schema \u53D6\u5EFA\u8868\u8BED\u53E5\u624B\u5DE5\u6267\u884C"
        };
      const verdict = await describeSchemaState(ctx.db, "domain_summary", [
        "domain",
        "best_action",
        "direct_votes",
        "proxy_votes",
        "reject_votes",
        "avg_confidence",
        "last_checked_at",
        "cooldown_days",
        "latest_comment",
        "pinned_comment",
        "pinned_kind"
      ]);
      const queries = await describeSchemaState(ctx.db, "domain_queries", [
        "domain",
        "action",
        "confidence",
        "model_name",
        "comment",
        "kind",
        "created_at"
      ]);
      const verdictOk = verdict.ok && queries.ok;
      const label = ctx.db.backend === "turso" ? "Turso" : ctx.db.backend === "d1" ? "D1" : "SQLite";
      return {
        status: verdictOk ? "pass" : "warn",
        detail: `${state.detail}\uFF1Bdevices \u6CE8\u518C\u8868\u9F50\u5168\uFF1B${verdictOk ? "AI \u5224\u5B9A\u53CC\u8868\u9F50\u5168" : `AI \u5224\u5B9A\u53CC\u8868\u5F85\u8FC1\u79FB\uFF08${queries.detail}\uFF1B${verdict.detail}\uFF09`}\uFF1BDB_SCHEMA_VERSION = ${DB_SCHEMA_VERSION}\uFF08${label}\uFF09`,
        fix: verdictOk ? "" : "\u9996\u6B21\u8BBF\u95EE\u4EFB\u610F /api \u63A5\u53E3\u4F1A\u81EA\u52A8\u8FC1\u79FB\uFF1B\u4E5F\u53EF\u8BBF\u95EE /api/schema \u53D6\u5EFA\u8868\u8BED\u53E5\u624B\u5DE5\u6267\u884C"
      };
    },
    { needsDb: true }
  );
}
__name(schemaCheck, "schemaCheck");
function probeChecks() {
  return [
    check(
      5,
      "\u5199\u63A2\u9488\uFF08\u5199\u5165\u4E34\u65F6\u884C\uFF09",
      "database",
      DOC.probe,
      async (ctx) => {
        ctx.probe = await runProbe(ctx.db);
        if (!ctx.probe.writeOk)
          return {
            status: "fail",
            detail: "\u63A2\u9488\u884C\u672A\u5199\u5165\uFF08\u6743\u9650 / \u914D\u989D / \u9501\u51B2\u7A81\uFF09",
            fix: "\u68C0\u67E5\u6570\u636E\u5E93\u8D26\u53F7\u7684\u5199\u6743\u9650\u4E0E\u914D\u989D"
          };
        return { status: "pass", detail: "health_probe \u5199\u5165\u6210\u529F\uFF08\u540C\u4E00\u4E8B\u52A1\uFF0C\u7A0D\u540E\u5220\u9664\uFF09" };
      },
      { deepOnly: true, needsDb: true }
    ),
    check(
      6,
      "\u8BFB\u56DE\u6821\u9A8C",
      "database",
      DOC.probe,
      async (ctx) => {
        if (!ctx.probe) return { status: "skip", detail: "\u5199\u63A2\u9488\u672A\u6267\u884C" };
        if (!ctx.probe.readOk)
          return {
            status: "fail",
            detail: "\u8BFB\u56DE\u5185\u5BB9\u4E0E\u5199\u5165\u4E0D\u4E00\u81F4\uFF0C\u5199\u5165\u4E0D\u53EF\u9760",
            fix: "\u68C0\u67E5\u6570\u636E\u5E93\u590D\u5236 / \u4E8B\u52A1\u914D\u7F6E"
          };
        return { status: "pass", detail: "\u63A2\u9488\u884C\u8BFB\u56DE\u4E00\u81F4" };
      },
      { deepOnly: true, needsDb: true }
    ),
    check(
      7,
      "\u5220\u9664\u6743\u9650",
      "database",
      DOC.probe,
      async (ctx) => {
        if (!ctx.probe) return { status: "skip", detail: "\u5199\u63A2\u9488\u672A\u6267\u884C" };
        if (!ctx.probe.deleteOk)
          return {
            status: "fail",
            detail: "\u63A2\u9488\u884C\u5220\u9664\u5931\u8D25\uFF1A\u8D26\u53F7\u65E0\u5199\u6743\u9650\u6216\u53EA\u8BFB",
            fix: "\u6539\u7528\u5177\u5907\u5199\u6743\u9650\u7684\u6570\u636E\u5E93\u4EE4\u724C"
          };
        return { status: "pass", detail: "\u63A2\u9488\u884C\u5DF2\u5220\u9664\uFF0C\u65E0\u6B8B\u7559\u6570\u636E" };
      },
      { deepOnly: true, needsDb: true }
    )
  ];
}
__name(probeChecks, "probeChecks");

// api/_health/version-checks.js
function scopeDevices(devices, scope) {
  return scope.deviceId ? devices.filter(
    (device) => device.deviceId === scope.deviceId || device.deviceId === `client:${scope.deviceId}`
  ) : devices;
}
__name(scopeDevices, "scopeDevices");
function collectBehind(scoped) {
  const components = [
    { key: "panel", name: "Surge \u9762\u677F\u811A\u672C", server: COMPONENT_VERSIONS.panel },
    { key: "logger", name: "\u6355\u83B7\u811A\u672C\uFF08\u672C\u5730\u526F\u672C\uFF09", server: COMPONENT_VERSIONS.logger },
    { key: "sgmodule", name: "Surge \u6A21\u5757", server: COMPONENT_VERSIONS.sgmodule }
  ];
  const behind = [];
  for (const component of components) {
    const expected = component.server;
    if (!expected) continue;
    const outdated = [];
    for (const device of scoped) {
      const inputs = versionInputsFor(device.deviceType, {
        panelVersion: device.panelVersion,
        loggerVersion: device.loggerVersion,
        platformParams: device.platformParams
      });
      if (!inputs) continue;
      const reported = component.key === "panel" ? inputs.panelVersion : inputs.loggerVersion;
      if (reported && compareSemver(reported, expected) === -1) {
        outdated.push(`${device.name || device.ip || device.deviceId}\uFF08${reported}\uFF09`);
      }
    }
    if (outdated.length) {
      behind.push({
        component: component.name,
        expected,
        outdated: [...new Set(outdated)].slice(0, 5)
      });
    }
  }
  return { components, behind };
}
__name(collectBehind, "collectBehind");
function distributionMeta() {
  return {
    channel: PANEL_ORIGIN ? "pages" : "self-host",
    origin: PANEL_ORIGIN,
    note: "Surge \u4E09\u4EF6\u5957\u7ECF Pages \u81EA\u6258\u7BA1\u5206\u53D1\uFF08script-path \u6307\u5411\u8BE5\u6E90\uFF09\uFF0C\u6A21\u5757\u66F4\u65B0\u5373\u6574\u4F53\u5931\u6548"
  };
}
__name(distributionMeta, "distributionMeta");
function versionChecks(scope) {
  return [
    check(
      11,
      "\u7248\u672C\u4E0E\u66F4\u65B0\u76D1\u63A7",
      "version",
      DOC.version,
      async (ctx) => {
        const devices = await listDevices(ctx.db, {
          limit: 100,
          deviceType: scope.deviceType,
          username: scope.username
        });
        const { components, behind } = collectBehind(scopeDevices(devices, scope));
        const distribution = distributionMeta();
        if (behind.length) {
          const text = behind.map(
            (item) => `${item.component} \u843D\u540E\uFF08\u670D\u52A1\u7AEF ${item.expected}\uFF09\uFF1A${item.outdated.join("\u3001")}`
          ).join("\uFF1B");
          return {
            status: "warn",
            detail: `\u53D1\u73B0\u7248\u672C\u843D\u540E\uFF1A${text}`,
            fix: "\u66F4\u65B0 Surge \u6A21\u5757\uFF08\u5916\u94FE\u91CD\u65B0\u5B89\u88C5\uFF09\u5E76\u5728\u811A\u672C\u7F16\u8F91\u5668\u91CD\u65B0\u53E6\u5B58\u6355\u83B7\u811A\u672C\u672C\u5730\u526F\u672C",
            components: components.map((item) => ({ ...item, current: item.server })),
            distribution
          };
        }
        return {
          status: "pass",
          detail: `\u7F51\u9875\u9762\u677F ${BUILD_LABEL}\uFF1BSurge \u9762\u677F / \u6355\u83B7\u811A\u672C / \u6A21\u5757\u5747\u4E3A\u6700\u65B0\uFF08\u670D\u52A1\u7AEF ${COMPONENT_VERSIONS.panel}\uFF09\uFF1B\u5206\u53D1\u901A\u9053 ${distribution.origin || "\u540C\u6E90\u90E8\u7F72"}`,
          components: components.map((item) => ({ ...item, current: item.server })),
          distribution
        };
      },
      { needsDb: true }
    )
  ];
}
__name(versionChecks, "versionChecks");

// api/_health/pipeline.js
function systemChecks(env2) {
  return [
    check(1, "\u914D\u7F6E\u5B8C\u6574\u6027", "system", DOC.env, async () => checkConfig(env2)),
    check(
      8,
      "\u9274\u6743\u4F53\u7CFB\u72B6\u6001",
      "system",
      DOC.env,
      async (ctx) => {
        const enabled = await isAuthEnabled(ctx.db);
        if (!enabled) {
          return {
            status: "warn",
            detail: "\u591A\u7528\u6237\u9274\u6743\u4F53\u7CFB\u672A\u521D\u59CB\u5316\uFF1A\u5F53\u524D\u533F\u540D\u53EF\u5199\uFF08\u517C\u5BB9\u65E7\u90E8\u7F72\uFF09",
            fix: "\u9762\u677F\u300C\u7528\u6237\u300D\u9875\u6267\u884C\u7BA1\u7406\u5458\u5F15\u5BFC\u521B\u5EFA\u9996\u4E2A\u7BA1\u7406\u5458\u540E\u542F\u7528\u591A\u7528\u6237\u9274\u6743"
          };
        }
        return {
          status: "pass",
          detail: "\u591A\u7528\u6237\u9274\u6743\u4F53\u7CFB\u5DF2\u542F\u7528\uFF1A\u5199\u64CD\u4F5C\u9700\u4F1A\u8BDD\u8D26\u53F7\u6216 X-Final-Key \u7528\u6237\u5BC6\u94A5\uFF0C\u533F\u540D\u6DFB\u52A0\u6570\u636E\u5DF2\u88AB\u7981\u6B62"
        };
      },
      { needsDb: true }
    )
  ];
}
__name(systemChecks, "systemChecks");
function databaseChecks() {
  return [
    check(
      2,
      "\u6570\u636E\u5E93\u8FDE\u901A\u6027",
      "database",
      DOC.db,
      async (ctx) => {
        await ctx.db.ping();
        return { status: "pass", detail: `\u8FDE\u901A\u6B63\u5E38\uFF08${describeBackend(ctx.db)}\uFF09` };
      },
      { needsDb: true }
    ),
    schemaCheck(),
    check(
      4,
      "\u8BFB\u6743\u9650",
      "database",
      DOC.read,
      async (ctx) => {
        await ctx.db.execute("SELECT id FROM surge_logs LIMIT 1");
        return { status: "pass", detail: "surge_logs \u8BFB\u53D6\u6B63\u5E38" };
      },
      { needsDb: true }
    ),
    ...probeChecks()
  ];
}
__name(databaseChecks, "databaseChecks");
function clientChecks(scope) {
  const scopeLabel = scopeLabelText(scope);
  return [
    // v1.19：原检查 9「上报令牌校验」移除——PANEL_HIT_TOKEN 改为可选参数，
    // Surge 端凭 FINAL_UID 自动取钥（X-Final-Key 用户密钥即上报凭证），
    // 未配置令牌的部署不该再看到「上报令牌校验失败」。
    check(
      10,
      "\u5BA2\u6237\u7AEF\u8FDE\u901A\u72B6\u6001",
      "client",
      DOC.client,
      async (ctx) => {
        const devices = await listDevices(ctx.db, {
          limit: 100,
          deviceType: scope.deviceType,
          username: scope.username
        });
        const scoped = scope.deviceId ? devices.filter(
          (device) => device.deviceId === scope.deviceId || device.deviceId === `client:${scope.deviceId}`
        ) : devices;
        if (!scoped.length) {
          return {
            status: "warn",
            detail: `\u5C1A\u672A\u6536\u5230\u4EFB\u4F55 Surge \u5BA2\u6237\u7AEF\u89E6\u8FBE${scopeLabel ? `\uFF08\u8303\u56F4\uFF1A${scopeLabel}\uFF09` : ""}\uFF1A\u5B89\u88C5 FINAL \u6A21\u5757\u5E76\u914D\u7F6E\u53C2\u6570\uFF0C\u9762\u677F\u5237\u65B0\u4E00\u6B21\u5373\u4E0A\u62A5`,
            fix: "\u6309 docs/surge-setup.md\u300CSurge \u5B89\u88C5\u6559\u7A0B\u300D\u5B89\u88C5\u6A21\u5757\u5E76\u586B\u5199 FINAL_WEB_URL / FINAL_UID\uFF08\u81EA\u52A8\u53D6\u94A5\uFF09"
          };
        }
        const latestDevice = scoped[0];
        const scopeSuffix = scopeLabel ? `\uFF08\u8303\u56F4\uFF1A${scopeLabel}\uFF09` : "";
        if (!latestDevice.online) {
          return {
            status: "warn",
            detail: `\u6700\u8FD1\u89E6\u8FBE ${latestDevice.lastOnlineTime}\uFF08\u79BB\u7EBF\uFF0C\u8D85\u8FC7\u4E24\u4E2A\u5237\u65B0\u5468\u671F\uFF09${scopeSuffix}`,
            fix: "\u6253\u5F00 Surge \u9762\u677F\u5237\u65B0\u4E00\u6B21\u5373\u53EF\u6062\u590D\u5FC3\u8DF3"
          };
        }
        const summary = deviceSummary(scoped);
        const outdatedCount = summary.alerts.filter(
          (alert) => alert.type === "outdated"
        ).length;
        const failedCount = summary.alerts.filter(
          (alert) => alert.type === "failed"
        ).length;
        const bits = [];
        if (outdatedCount) bits.push(`${outdatedCount} \u53F0\u914D\u7F6E\u8FC7\u671F`);
        if (failedCount) bits.push(`${failedCount} \u53F0\u672A\u4E0A\u62A5\u7248\u672C`);
        return {
          status: "pass",
          detail: `\u6700\u8FD1\u89E6\u8FBE ${latestDevice.lastOnlineTime}\uFF08\u5728\u7EBF\uFF09\uFF0C\u9762\u677F\u811A\u672C ${latestDevice.panelVersion || "\u672A\u77E5"} / \u6355\u83B7\u811A\u672C ${latestDevice.loggerVersion || "\u672A\u77E5"}\uFF1B\u8BBE\u5907 ${summary.online}/${summary.total} \u5728\u7EBF${scopeSuffix}` + (bits.length ? `\uFF1B${bits.join("\uFF0C")}\uFF08\u8BE6\u89C1\u7248\u672C\u4E0E\u66F4\u65B0\u76D1\u63A7\uFF09` : ""),
          fix: ""
        };
      },
      { needsDb: true }
    )
  ];
}
__name(clientChecks, "clientChecks");
function scopeLabelText(scope) {
  return [
    scope.deviceId && `\u8BBE\u5907 ${scope.deviceId}`,
    scope.username && `\u7528\u6237 ${scope.username}`,
    scope.deviceType && `\u7C7B\u578B ${scope.deviceType}`
  ].filter(Boolean).join(" / ");
}
__name(scopeLabelText, "scopeLabelText");
function buildPipeline(env2, scope) {
  return [
    ...systemChecks(env2),
    ...databaseChecks(),
    ...clientChecks(scope),
    ...versionChecks(scope)
  ];
}
__name(buildPipeline, "buildPipeline");

// api/_health/run.js
async function runPipeline(env2, request, context2, mode, scope) {
  const started = now();
  const results = [];
  const shared = { env: env2, request, context: context2, mode, probe: null, scope };
  for (const item of buildPipeline(env2, scope)) {
    if (item.deepOnly && mode !== "deep") {
      results.push({
        id: item.id,
        name: item.name,
        category: item.category,
        status: "skip",
        ms: 0,
        detail: "\u6DF1\u5EA6\u68C0\u6D4B\u9879\uFF08\u53EA\u8BFB\u6A21\u5F0F\u8DF3\u8FC7\uFF09",
        fix: "",
        doc: item.doc
      });
      continue;
    }
    const t0 = now();
    try {
      if (item.needsDb && !shared.db) {
        shared.db = await getAdapter(env2);
      }
      const outcome = await item.fn(shared) || {};
      results.push({
        id: item.id,
        name: item.name,
        category: item.category,
        status: outcome.status || "pass",
        ms: now() - t0,
        detail: outcome.detail || "",
        fix: outcome.fix || "",
        doc: item.doc,
        ...outcome.clients ? { clients: outcome.clients } : {},
        ...outcome.components ? { components: outcome.components } : {},
        ...outcome.distribution ? { distribution: outcome.distribution } : {}
      });
    } catch (error3) {
      const kind = error3 instanceof ConfigError ? null : DB_ERROR_LABELS[error3?.kind] ? error3.kind : "unknown";
      results.push({
        id: item.id,
        name: item.name,
        category: item.category,
        status: "fail",
        ms: now() - t0,
        detail: `${error3?.message ?? error3}${kind ? `\uFF08${DB_ERROR_LABELS[kind]}\uFF09` : ""}`,
        fix: kind === "timeout" ? "\u7A0D\u540E\u91CD\u8BD5\uFF1B\u6301\u7EED\u8D85\u65F6\u68C0\u67E5\u6570\u636E\u5E93\u7F51\u7EDC\u53EF\u8FBE\u6027" : kind === "auth" ? "\u6838\u5BF9\u6570\u636E\u5E93\u8BBF\u95EE\u4EE4\u724C" : kind === "connection" ? "\u68C0\u67E5\u6570\u636E\u5E93\u5730\u5740\u4E0E\u7F51\u7EDC\u53EF\u8FBE\u6027" : "\u6309 docs/deploy.md\u300C\u90E8\u7F72\u6559\u7A0B\u300D\u6838\u5BF9\u914D\u7F6E",
        doc: item.doc
      });
    }
  }
  return { results, elapsedMs: now() - started };
}
__name(runPipeline, "runPipeline");
function summarize(results) {
  const counts = { pass: 0, warn: 0, fail: 0, skip: 0 };
  for (const item of results) counts[item.status] = (counts[item.status] ?? 0) + 1;
  const overall = counts.fail ? "fail" : counts.warn ? "warn" : "pass";
  const worst = results.find((item) => item.status === "fail") || results.find((item) => item.status === "warn");
  const headline = overall === "pass" ? "\u5168\u90E8\u68C0\u67E5\u901A\u8FC7\uFF0C\u90E8\u7F72\u94FE\u8DEF\u5065\u5EB7" : `${worst?.name ?? "\u68C0\u6D4B"}\u672A\u901A\u8FC7\uFF1A${worst?.detail ?? ""}`;
  return { counts, overall, headline };
}
__name(summarize, "summarize");
function categorize(results) {
  return CHECK_CATEGORIES.map((category) => {
    const items = results.filter((item) => item.category === category.id);
    const counts = { pass: 0, warn: 0, fail: 0, skip: 0 };
    for (const item of items) counts[item.status] = (counts[item.status] ?? 0) + 1;
    const overall = counts.fail ? "fail" : counts.warn ? "warn" : counts.skip === items.length ? "skip" : "pass";
    return { ...category, overall, counts, checks: items.map((item) => item.id) };
  });
}
__name(categorize, "categorize");
function chainSummary(results) {
  const byId = Object.fromEntries(results.map((item) => [item.id, item]));
  const dbChecks = results.filter((item) => item.category === "database");
  const clientCheck = byId["10"];
  return {
    browser: "pass",
    pages: "pass",
    database: dbChecks.some((item) => item.status === "fail") ? "fail" : dbChecks.some((item) => item.status === "warn") ? "warn" : "pass",
    surge: !clientCheck || clientCheck.status === "skip" ? "warn" : clientCheck.status
  };
}
__name(chainSummary, "chainSummary");
function handlePreflight(request) {
  const origin = request.headers.get("origin") ?? "";
  if (!origin) return new Response(null, { status: 204 });
  try {
    if (new URL(origin).host === new URL(request.url).host) {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": origin,
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Authorization, Content-Type, X-Panel-Token"
        }
      });
    }
  } catch {
  }
  return new Response(null, { status: 403 });
}
__name(handlePreflight, "handlePreflight");
async function onRequest(context2) {
  const { request, env: env2 } = context2;
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/+$/, "") || "/";
  try {
    if (request.method === "OPTIONS") return handlePreflight(request);
    if (request.method !== "GET")
      return jsonResponse(
        { success: false, error: "\u4E0D\u652F\u6301\u7684\u65B9\u6CD5" },
        { status: 405, headers: { Allow: "GET, OPTIONS" } }
      );
    if (path !== "/api/health") return notFound(`\u672A\u77E5\u7684\u63A5\u53E3\uFF1A${path}`);
    const mode = url.searchParams.get("mode") === "deep" ? "deep" : "basic";
    const scope = {
      deviceId: (url.searchParams.get("device-id") || "").trim(),
      username: (url.searchParams.get("username") || "").trim(),
      deviceType: (url.searchParams.get("device-type") || "").trim()
    };
    if (mode === "deep") {
      if (url.searchParams.get("confirm") !== "1") {
        return badRequest(
          "\u6DF1\u5EA6\u68C0\u6D4B\u6D89\u53CA\u5199\u64CD\u4F5C\uFF08\u5411\u63A2\u9488\u8868\u5199\u5165\u4E34\u65F6\u884C\uFF09\uFF1A\u8BF7\u5728\u524D\u7AEF\u5F39\u7A97\u4E8C\u6B21\u786E\u8BA4\u540E\u91CD\u8BD5\uFF08\u8BF7\u6C42\u9700\u9644\u5E26 confirm=1\uFF09"
        );
      }
      const ip = request.headers.get("cf-connecting-ip") || "local";
      if (peekRateLimit(`health:deep:${ip}`, DEEP_THROTTLE_MS) >= 1) {
        return jsonResponse(
          { success: false, error: "\u6DF1\u5EA6\u68C0\u6D4B\u8FC7\u4E8E\u9891\u7E41\uFF0C\u8BF7\u4E00\u5206\u949F\u540E\u518D\u8BD5" },
          { status: 429, headers: { "Cache-Control": "no-store" } }
        );
      }
      const adapter = await getAdapter(env2);
      const gate = await guardPrincipal(env2, adapter, request, context2, {
        auth: "mutation",
        feature: "health.check",
        featurePath: "/api/health"
      });
      if (!gate.ok) return gate.response;
      hitRateLimit(`health:deep:${ip}`, 1, DEEP_THROTTLE_MS);
    }
    const { results, elapsedMs } = await runPipeline(env2, request, context2, mode, scope);
    const summary = summarize(results);
    const dbBackend = (() => {
      try {
        return resolveDbBackend(env2);
      } catch {
        return "unknown";
      }
    })();
    return jsonResponse(
      {
        success: true,
        data: {
          mode,
          elapsedMs,
          dbBackend,
          serverVersion: BUILD_LABEL,
          dbSchemaVersion: DB_SCHEMA_VERSION,
          scope,
          checks: results,
          categories: categorize(results),
          chain: chainSummary(results),
          summary
        }
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error3) {
    return errorResponse(TAG, request.method, url.pathname, error3);
  }
}
__name(onRequest, "onRequest");

// _utils/prefs.js
var PREFS_TABLE = "app_prefs";
var MAX_PREFERENCE_LENGTH = 8192;
var PREFS_SCHEMA = `CREATE TABLE IF NOT EXISTS ${PREFS_TABLE} (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  setting_key TEXT NOT NULL,
  setting_value TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(user_id, setting_key)
);
CREATE INDEX IF NOT EXISTS idx_${PREFS_TABLE}_user ON ${PREFS_TABLE}(user_id);`.trim();
function normalizeUserId(value, fallback = "anonymous") {
  const cleaned = String(value ?? "").trim().replace(/[^a-zA-Z0-9_:-]/g, "_").slice(0, 64);
  return cleaned || fallback;
}
__name(normalizeUserId, "normalizeUserId");
function normalizeKey(value) {
  return String(value ?? "").trim().replace(/[^a-zA-Z0-9_.]/g, "_").slice(0, 128);
}
__name(normalizeKey, "normalizeKey");
async function listPrefs(db, userId) {
  const user = normalizeUserId(userId);
  const rows = await db.execute(
    `SELECT setting_key, setting_value FROM ${PREFS_TABLE} WHERE user_id = ?`,
    [user]
  );
  const settings = {};
  for (const row of rows) settings[row.setting_key] = row.setting_value;
  return settings;
}
__name(listPrefs, "listPrefs");
async function savePrefs(db, userId, settings) {
  const user = normalizeUserId(userId);
  const entries = Object.entries(settings || {}).map(([key, value]) => {
    const k = normalizeKey(key);
    const text = String(value ?? "");
    return {
      k,
      text: text.length > MAX_PREFERENCE_LENGTH ? text.slice(0, MAX_PREFERENCE_LENGTH) : text
    };
  }).filter((entry) => entry.k.length > 0);
  if (entries.length === 0) return { saved: 0 };
  const now2 = (/* @__PURE__ */ new Date()).toISOString();
  const statements = entries.map((entry) => ({
    sql: `INSERT INTO ${PREFS_TABLE} (user_id, setting_key, setting_value, updated_at)
          VALUES (?, ?, ?, ?)
          ON CONFLICT(user_id, setting_key)
          DO UPDATE SET setting_value = excluded.setting_value, updated_at = excluded.updated_at`,
    params: [user, entry.k, entry.text, now2]
  }));
  const results = await db.batch(statements);
  return { saved: results.filter((result) => result.changes > 0).length };
}
__name(savePrefs, "savePrefs");
async function deletePref(db, userId, key) {
  const user = normalizeUserId(userId);
  const k = normalizeKey(key);
  if (!k) return { deleted: 0 };
  const results = await db.batch([
    {
      sql: `DELETE FROM ${PREFS_TABLE} WHERE user_id = ? AND setting_key = ?`,
      params: [user, k]
    }
  ]);
  return { deleted: results[0].changes };
}
__name(deletePref, "deletePref");
async function clearPrefs(db, userId) {
  const user = normalizeUserId(userId);
  const results = await db.batch([
    { sql: `DELETE FROM ${PREFS_TABLE} WHERE user_id = ?`, params: [user] }
  ]);
  return { deleted: results[0].changes };
}
__name(clearPrefs, "clearPrefs");

// api/_ai/prompt.js
var BUILTIN_ACTION_HINTS = {
  PROXY: "\u9700\u8981\u4EE3\u7406\u8BBF\u95EE",
  DIRECT: "\u56FD\u5185\u6216\u672C\u5730\u76F4\u8FDE",
  REJECT: "\u5E7F\u544A\u3001\u8FFD\u8E2A\u3001\u6076\u610F\u57DF\u540D"
};
function renderActionClause(policyKeys) {
  const raw = Array.isArray(policyKeys) ? policyKeys : [];
  let list2 = raw.map(
    (item) => typeof item === "string" || typeof item === "number" ? { key: String(item).trim() } : {
      key: String(item?.key ?? "").trim(),
      hidden: Boolean(item?.hidden),
      prompt: String(item?.prompt ?? "").trim()
    }
  ).filter((item) => item.key);
  list2 = list2.filter((item) => !item.hidden);
  if (!list2.length) {
    list2 = Object.keys(BUILTIN_ACTION_HINTS).map((key) => ({ key }));
  }
  const parts = list2.map(({ key, prompt }) => {
    const upper = key.toUpperCase();
    const hint = prompt || BUILTIN_ACTION_HINTS[upper] || "";
    return hint ? `${upper}\uFF08${hint}\uFF09` : upper;
  });
  return `3. action \u4EC5\u9650\uFF1A${parts.join("\u3001")}\u3002`;
}
__name(renderActionClause, "renderActionClause");
var VERDICT_PROMPT_HEAD = [
  "\u4F60\u662F Surge \u4EE3\u7406\u89C4\u5219\u5206\u6D41\u52A9\u624B\u3002\u6839\u636E\u7ED9\u5B9A\u7684\u57DF\u540D / \u5339\u914D\u503C\u5224\u65AD\u5B83\u5E94\u4F7F\u7528\u7684\u5206\u6D41\u7B56\u7565\uFF0C\u7ED9\u51FA\u7F6E\u4FE1\u5EA6\uFF0C\u5E76\u5199\u4E00\u53E5\u7B80\u4F53\u4E2D\u6587\u6CE8\u91CA\u3002",
  "\u89C4\u5219\uFF1A",
  "1. \u53EA\u8F93\u51FA\u4E00\u884C JSON \u5BF9\u8C61\uFF0C\u4E0D\u8981\u8F93\u51FA Markdown\u3001\u5217\u8868\u3001\u89E3\u91CA\u3001\u4EE3\u7801\u5757\u6807\u8BB0\u6216\u4EFB\u4F55\u5176\u4ED6\u6587\u5B57\u3002",
  '2. JSON \u683C\u5F0F\uFF1A{"action":"PROXY|DIRECT|REJECT","confidence":0.0\u52301.0\u4E4B\u95F4\u7684\u5C0F\u6570,"comment":"\u4E0D\u8D85\u8FC720\u5B57\u7684\u4E2D\u6587\u8BF4\u660E"}'
].join("\n");
var VERDICT_PROMPT_TAIL = [
  "4. confidence \u8868\u793A\u4F60\u5BF9\u8FD9\u4E2A\u5224\u5B9A\u7684\u628A\u63E1\uFF080.0 \u5B8C\u5168\u4E0D\u786E\u5B9A\uFF0C1.0 \u975E\u5E38\u786E\u5B9A\uFF09\u3002",
  "5. comment \u8BF4\u660E\u8BE5\u57DF\u540D\u662F\u4EC0\u4E48\u670D\u52A1\u6216\u4E3A\u4EC0\u4E48\u8FD9\u6837\u5206\u6D41\u3002",
  '\u793A\u4F8B\uFF1A{"action":"DIRECT","confidence":0.95,"comment":"Cloudflare DNS\uFF0C\u56FD\u5185\u53EF\u76F4\u8FDE"}'
].join("\n");
function buildVerdictSystemPrompt(policyKeys) {
  return [VERDICT_PROMPT_HEAD, renderActionClause(policyKeys), VERDICT_PROMPT_TAIL].join("\n");
}
__name(buildVerdictSystemPrompt, "buildVerdictSystemPrompt");
var VERDICT_SYSTEM_PROMPT = buildVerdictSystemPrompt(null);
function stripActionClause(prompt) {
  return String(prompt ?? "").split("\n").filter((line) => !/^\s*3\.\s*action\s*仅限\s*[:：]/.test(line)).join("\n");
}
__name(stripActionClause, "stripActionClause");
var VERDICT_OUTPUT_FORMAT = '{"action":"PROXY|DIRECT|REJECT","confidence":0.95,"comment":"\u4E0D\u8D85\u8FC720\u5B57\u7684\u4E2D\u6587\u8BF4\u660E"}';
var VERDICT_BATCH_CLAUSE = "6. \u4E00\u6B21\u7ED9\u5B9A\u591A\u4E2A\u5339\u914D\u503C\u65F6\uFF0C\u8F93\u51FA\u7B49\u957F JSON \u6570\u7EC4\uFF0C\u987A\u5E8F\u4E0E\u8BF7\u6C42\u5B8C\u5168\u4E00\u81F4\u3002";

// api/_ai/config-schema.js
var AI_DEFAULT_MODEL = "@cf/meta/llama-3.1-8b-instruct";
var AI_MAX_ACCOUNTS = 10;
var AI_DEFAULT_CONFIG = Object.freeze({
  cfAccountId: "",
  cfApiToken: "",
  model: AI_DEFAULT_MODEL,
  /**
   * 参与负载均衡的模型列表（v1.16）：面板多选勾选，默认全选。
   * 空列表 = 只用 model 单模型（旧配置语义不变）；model 始终镜像 models[0]。
   */
  models: [],
  prompt: "",
  /**
   * 策略组专属元数据（v1.29 T8 / 工单 #41）：{ [policyKey]: { hidden, prompt } }。
   * hidden = 显隐开关（隐藏的策略组不进入 action 约束）；prompt = 专属提示词，
   * 完整替换该组在 action 规则行里的括号说明文本。
   */
  policyMeta: {},
  /**
   * 策略分类顺序（T26 #95 / 工单 #95）：组名字符串数组——首页策略条与 hub 左
   * 列表的分组排序依据；未列出的组按首次出现序殿后。
   */
  policyGroupOrder: [],
  enabled: false,
  intervalMinutes: 360,
  batchSize: 10,
  requestDelayMs: 1e3,
  onlyUnclassified: true,
  fillComment: true,
  priorityEdited: true,
  /**
   * ❄️ 冷却天数（v1.9.0）：域名判定后的复检间隔。
   * 0 = 按共识度动态计算（稳定域名 60~90 天，争议域名 7 天）；
   * ≥ 1 = 固定使用该天数（1~365），不再动态调整。
   */
  cooldownDays: 0,
  /**
   * 多账号凭证（v1.7.0）：[{ id: Account ID, token: API Token, label: 备注 }]。
   * 与 cfAccountId / cfApiToken 双写：旧字段 = accounts[0] 的镜像，
   * 面板旧版与 GraphQL 用量卡都只读主凭证，行为不变。
   */
  accounts: [],
  /** 使用负载均衡：开 = 按策略在多凭证间轮转分发；关 = 只用主凭证 */
  loadBalance: false,
  /**
   * 失败退避（指数退避）：第 n 次连续失败后暂停 base × 2^(n-1) 毫秒，封顶 maxMs。
   * 30 秒起步、5 分钟封顶：既不会被限流追着打，也不会一次失败就长时间停摆。
   */
  cooldownBaseMs: 3e4,
  cooldownMaxMs: 3e5,
  /** 模型熔断阈值：连续失败 N 次才禁用模型（1 = 首败即熔断，2 容忍偶发抖动） */
  modelFailureThreshold: 2
});
var LIMITS2 = Object.freeze({
  accountId: 64,
  token: 256,
  model: 128,
  prompt: 2e3,
  policyPrompt: 600,
  /** 周期下限 1 分钟（v1.19）：面板调度 tick 20 秒一次，1 分钟能被准时触发 */
  intervalMin: 1,
  intervalMax: 10080,
  batchMin: 1,
  batchMax: 100,
  delayMin: 0,
  delayMax: 1e4,
  /** 凭证备注长度 */
  labelMax: 32,
  /** 中转站 API Base URL 长度（v1.32） */
  baseUrl: 256
});
var CF_TYPE = "cloudflare";
var RELAY_TYPE = "openai";
var RELAY_MODELS_MAX = 20;

// api/_ai/config-normalize.js
function normalizeRelayModels(value) {
  const list2 = Array.isArray(value) ? value : String(value ?? "").split(/[,\n，、]/);
  const out = [];
  for (const item of list2) {
    const name = toText(item, LIMITS2.model);
    if (name && !out.includes(name)) out.push(name);
    if (out.length >= RELAY_MODELS_MAX) break;
  }
  return out;
}
__name(normalizeRelayModels, "normalizeRelayModels");
function normalizeAccounts(value, current = []) {
  const existing = new Map(
    (Array.isArray(current) ? current : []).map((entry) => [
      String(entry?.id ?? "").trim(),
      entry
    ])
  );
  const merged = /* @__PURE__ */ new Map();
  for (const raw of Array.isArray(value) ? value : []) {
    const type = String(raw?.type ?? "").trim() === RELAY_TYPE ? RELAY_TYPE : CF_TYPE;
    if (type === RELAY_TYPE) {
      const baseUrl = toText(raw?.baseUrl ?? raw?.id, LIMITS2.baseUrl).replace(/\/+$/, "");
      if (!/^https:\/\//.test(baseUrl)) continue;
      const prev2 = existing.get(baseUrl) || merged.get(baseUrl) || {};
      const token2 = toText(raw?.token, LIMITS2.token);
      const keepOld2 = !token2 || token2.startsWith("\u2022\u2022");
      const models = normalizeRelayModels(raw?.models ?? prev2.models);
      merged.set(baseUrl, {
        id: baseUrl,
        type: RELAY_TYPE,
        baseUrl,
        token: keepOld2 ? String(prev2.token ?? "") : token2,
        label: toText(raw?.label, LIMITS2.labelMax),
        models
      });
      continue;
    }
    const id = toText(raw?.id, LIMITS2.accountId);
    if (!id) continue;
    const prev = existing.get(id) || merged.get(id) || {};
    const token = toText(raw?.token, LIMITS2.token);
    const keepOld = !token || token.startsWith("\u2022\u2022");
    merged.set(id, {
      id,
      type: CF_TYPE,
      token: keepOld ? String(prev.token ?? "") : token,
      label: toText(raw?.label, LIMITS2.labelMax)
    });
  }
  return [...merged.values()].filter((entry) => entry.token).slice(0, AI_MAX_ACCOUNTS);
}
__name(normalizeAccounts, "normalizeAccounts");
function toBool(value, fallback) {
  if (typeof value === "boolean") return value;
  if (value === "true" || value === 1 || value === "1") return true;
  if (value === "false" || value === 0 || value === "0") return false;
  return fallback;
}
__name(toBool, "toBool");
function toInt(value, fallback, min, max) {
  const num = Math.round(Number(value));
  if (!Number.isFinite(num)) return fallback;
  return Math.min(max, Math.max(min, num));
}
__name(toInt, "toInt");
function toText(value, max) {
  return String(value ?? "").trim().slice(0, max);
}
__name(toText, "toText");
function mergeAccountsList(merged, patch, accounts) {
  if ("accounts" in patch) {
    const next = normalizeAccounts(patch.accounts, accounts);
    const primaryCf = next.find((entry) => entry.type !== RELAY_TYPE);
    merged.cfAccountId = primaryCf?.id ?? "";
    merged.cfApiToken = primaryCf?.token ?? "";
    merged.accounts = next.slice(0, AI_MAX_ACCOUNTS);
    return;
  }
  if ("cfAccountId" in patch || "cfApiToken" in patch) {
    const id = merged.cfAccountId || accounts[0]?.id || "";
    const token = merged.cfApiToken || accounts[0]?.token || "";
    const label = accounts.find((entry) => entry.id === id)?.label ?? "";
    const next = id && token ? [
      { id, type: CF_TYPE, token, label },
      ...accounts.filter((entry) => entry.id !== id)
    ] : accounts.filter((entry) => entry.id !== id);
    merged.accounts = next.slice(0, AI_MAX_ACCOUNTS);
    return;
  }
  const primary = accounts.find(
    (entry) => entry.id === merged.cfAccountId && entry.type !== RELAY_TYPE
  );
  if (primary) {
    merged.cfApiToken = merged.cfApiToken || primary.token;
    accounts = [primary, ...accounts.filter((entry) => entry !== primary)];
  } else if (merged.cfAccountId && merged.cfApiToken) {
    accounts = [
      { id: merged.cfAccountId, type: CF_TYPE, token: merged.cfApiToken, label: "" },
      ...accounts
    ];
  }
  merged.accounts = accounts.slice(0, AI_MAX_ACCOUNTS);
}
__name(mergeAccountsList, "mergeAccountsList");
function mergeScalarFields(merged, patch) {
  merged.loadBalance = toBool(patch.loadBalance, merged.loadBalance);
  merged.cooldownBaseMs = toInt(patch.cooldownBaseMs, merged.cooldownBaseMs, 5e3, 12e4);
  merged.cooldownMaxMs = toInt(patch.cooldownMaxMs, merged.cooldownMaxMs, 1e4, 18e5);
  merged.modelFailureThreshold = toInt(
    patch.modelFailureThreshold,
    merged.modelFailureThreshold,
    1,
    10
  );
  merged.cooldownDays = toInt(patch.cooldownDays, merged.cooldownDays ?? 0, 0, 365);
  merged.enabled = toBool(patch.enabled, merged.enabled);
  merged.onlyUnclassified = toBool(patch.onlyUnclassified, merged.onlyUnclassified);
  merged.fillComment = toBool(patch.fillComment, merged.fillComment);
  merged.priorityEdited = toBool(patch.priorityEdited, merged.priorityEdited);
  merged.intervalMinutes = toInt(
    patch.intervalMinutes,
    merged.intervalMinutes,
    LIMITS2.intervalMin,
    LIMITS2.intervalMax
  );
  merged.batchSize = toInt(patch.batchSize, merged.batchSize, LIMITS2.batchMin, LIMITS2.batchMax);
  merged.requestDelayMs = toInt(
    patch.requestDelayMs,
    merged.requestDelayMs,
    LIMITS2.delayMin,
    LIMITS2.delayMax
  );
}
__name(mergeScalarFields, "mergeScalarFields");
function mergeAiConfig(current, patch = {}) {
  const merged = { ...AI_DEFAULT_CONFIG, ...current };
  merged.policyMeta = normalizePolicyMeta(merged.policyMeta);
  if ("policyMeta" in patch) merged.policyMeta = normalizePolicyMeta(patch.policyMeta);
  merged.policyGroupOrder = normalizePolicyGroupOrder(merged.policyGroupOrder);
  if ("policyGroupOrder" in patch) {
    merged.policyGroupOrder = normalizePolicyGroupOrder(patch.policyGroupOrder);
  }
  const accounts = normalizeAccounts(merged.accounts, merged.accounts);
  merged.cfAccountId = toText(merged.cfAccountId, LIMITS2.accountId);
  if ("cfAccountId" in patch) merged.cfAccountId = toText(patch.cfAccountId, LIMITS2.accountId);
  if ("model" in patch) merged.model = toText(patch.model, LIMITS2.model) || AI_DEFAULT_MODEL;
  if ("models" in patch) {
    const models = (Array.isArray(patch.models) ? patch.models : []).map((name) => toText(name, LIMITS2.model)).filter(Boolean);
    merged.models = [...new Set(models)].slice(0, AI_MAX_ACCOUNTS);
    if (merged.models.length) merged.model = merged.models[0];
  }
  if ("cfApiToken" in patch) {
    const token = toText(patch.cfApiToken, LIMITS2.token);
    if (token && !token.startsWith("\u2022\u2022")) merged.cfApiToken = token;
  }
  merged.cfApiToken = toText(merged.cfApiToken, LIMITS2.token);
  if ("prompt" in patch) merged.prompt = sanitizeUserPrompt(toText(patch.prompt, LIMITS2.prompt));
  mergeAccountsList(merged, patch, accounts);
  mergeScalarFields(merged, patch);
  return merged;
}
__name(mergeAiConfig, "mergeAiConfig");
function sanitizeUserPrompt(prompt) {
  return stripActionClause(prompt);
}
__name(sanitizeUserPrompt, "sanitizeUserPrompt");
function normalizePolicyMeta(raw) {
  const source = raw && typeof raw === "object" && !Array.isArray(raw) ? raw : {};
  const out = {};
  for (const [key, value] of Object.entries(source)) {
    const upper = String(key ?? "").trim().toUpperCase();
    if (!upper) continue;
    const hidden = Boolean(value?.hidden);
    const prompt = toText(value?.prompt, LIMITS2.policyPrompt);
    if (!hidden && !prompt) continue;
    out[upper] = { hidden, prompt };
  }
  return out;
}
__name(normalizePolicyMeta, "normalizePolicyMeta");
function normalizePolicyGroupOrder(raw) {
  if (!Array.isArray(raw)) return [];
  return [
    ...new Set(
      raw.filter((name) => typeof name === "string").map((name) => name.trim()).filter(Boolean).slice(0, 100)
    )
  ];
}
__name(normalizePolicyGroupOrder, "normalizePolicyGroupOrder");

// api/_ai/config.js
var AI_CONFIG_USER = "system";
var CONFIG_KEY = "ai.config";
var STATE_KEY = "ai.state";
var AI_BUILTIN_PROMPT = VERDICT_SYSTEM_PROMPT;
async function readPref(db, key) {
  const rows = await db.execute(
    `SELECT setting_value FROM ${PREFS_TABLE} WHERE user_id = ? AND setting_key = ?`,
    [AI_CONFIG_USER, key]
  );
  return rows[0]?.setting_value ?? "";
}
__name(readPref, "readPref");
async function writePref(db, key, value) {
  await db.batch([
    {
      sql: `INSERT INTO ${PREFS_TABLE} (user_id, setting_key, setting_value, updated_at)
            VALUES (?, ?, ?, ?)
            ON CONFLICT(user_id, setting_key)
            DO UPDATE SET setting_value = excluded.setting_value, updated_at = excluded.updated_at`,
      params: [AI_CONFIG_USER, key, value, nowIso()]
    }
  ]);
}
__name(writePref, "writePref");
function withOutboundBases(config2, env2) {
  if (!env2) return config2;
  return {
    ...config2,
    cfApiBase: env2.CF_API_BASE || void 0,
    cfGraphqlEndpoint: env2.CF_GRAPHQL_ENDPOINT || void 0
  };
}
__name(withOutboundBases, "withOutboundBases");
async function loadAiConfig(db, env2 = null) {
  try {
    const raw = await readPref(db, CONFIG_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return withOutboundBases(mergeAiConfig(parsed, {}), env2);
  } catch (error3) {
    console.warn("[ai][config] \u914D\u7F6E\u89E3\u6790\u5931\u8D25\uFF0C\u4F7F\u7528\u9ED8\u8BA4\u503C", error3?.message);
    return withOutboundBases({ ...AI_DEFAULT_CONFIG }, env2);
  }
}
__name(loadAiConfig, "loadAiConfig");
async function saveAiConfig(db, patch) {
  const current = await loadAiConfig(db);
  const merged = mergeAiConfig(current, patch);
  await writePref(db, CONFIG_KEY, JSON.stringify(merged));
  return merged;
}
__name(saveAiConfig, "saveAiConfig");
async function loadAiState(db) {
  try {
    const raw = await readPref(db, STATE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}
__name(loadAiState, "loadAiState");
async function saveAiState(db, state) {
  await writePref(db, STATE_KEY, JSON.stringify(state || {}));
}
__name(saveAiState, "saveAiState");
function maskToken(token) {
  const text = String(token ?? "");
  if (!text) return "";
  if (text.length <= 4) return "\u2022\u2022\u2022\u2022";
  return `\u2022\u2022\u2022\u2022${text.slice(-4)}`;
}
__name(maskToken, "maskToken");
function publicAiConfig(config2, { policyKeys = null, policyMeta = null } = {}) {
  const meta = policyMeta && typeof policyMeta === "object" ? policyMeta : config2.policyMeta ?? {};
  const clauseKeys = (Array.isArray(policyKeys) ? policyKeys : []).map((key) => ({
    key,
    hidden: Boolean(meta?.[String(key).toUpperCase()]?.hidden),
    prompt: String(meta?.[String(key).toUpperCase()]?.prompt ?? "")
  }));
  const { cfApiToken, ...rest } = config2;
  void cfApiToken;
  const accounts = (Array.isArray(rest.accounts) ? rest.accounts : []).map((entry) => {
    const base = {
      id: String(entry?.id ?? ""),
      type: entry?.type === RELAY_TYPE ? RELAY_TYPE : CF_TYPE,
      label: String(entry?.label ?? ""),
      tokenMask: maskToken(entry?.token),
      hasToken: Boolean(entry?.token)
    };
    if (base.type === RELAY_TYPE) {
      return {
        ...base,
        baseUrl: String(entry?.baseUrl ?? entry?.id ?? ""),
        models: Array.isArray(entry?.models) ? [...entry.models] : []
      };
    }
    return base;
  });
  const primary = accounts.find((entry) => entry.type !== RELAY_TYPE) ?? accounts[0];
  return {
    ...rest,
    accounts,
    cfAccountId: primary?.id ?? "",
    tokenMask: primary?.tokenMask ?? "",
    hasToken: Boolean(primary?.hasToken),
    // 内置提示词原文：面板提示词输入框默认值与「恢复内置」的基准。
    // 策略组清单在位时按清单渲染 action 行，否则用内置兜底（行为与 v1.28 一致）
    defaultPrompt: clauseKeys.length ? buildVerdictSystemPrompt(clauseKeys) : AI_BUILTIN_PROMPT,
    // 主输入框的可编辑模板（不含 action 行——该行锁定展示、不可手动编辑）
    defaultPromptEditable: `${VERDICT_PROMPT_HEAD}
${VERDICT_PROMPT_TAIL}`,
    // action 规则行渲染结果（锁定只读块展示，执行时以服务端渲染值为准）
    promptActionClause: clauseKeys.length ? renderActionClause(clauseKeys) : renderActionClause(null),
    // 策略组专属元数据（显隐开关 + 专属提示词）：策略组配置视图读写用
    policyMeta: meta
  };
}
__name(publicAiConfig, "publicAiConfig");

// api/_ai/client-fetch.js
var CF_API_BASE = "https://api.cloudflare.com/client/v4";
var resolveApiBase = /* @__PURE__ */ __name((config2) => String(config2?.cfApiBase ?? "").trim() || CF_API_BASE, "resolveApiBase");
var LIST_TIMEOUT_MS = 12e3;
var RUN_TIMEOUT_MS = 3e4;
var MAX_ATTEMPTS = 3;
var RETRY_BASE_DELAY_MS = 400;
async function extractApiError(response) {
  let detail = `HTTP ${response.status}`;
  try {
    const body = await response.json();
    const first = body?.errors?.[0];
    if (first?.message)
      detail = `${first.message}${first.code != null ? ` (code ${first.code})` : ""}`;
  } catch {
  }
  const error3 = new Error(`Workers AI \u8BF7\u6C42\u5931\u8D25\uFF1A${detail}`);
  error3.status = response.status;
  return error3;
}
__name(extractApiError, "extractApiError");
function aiFetchWithRetry(url, init, { timeoutMs, maxAttempts = MAX_ATTEMPTS } = {}) {
  return fetchWithRetry(url, init, {
    timeoutMs,
    maxAttempts,
    baseDelayMs: RETRY_BASE_DELAY_MS,
    onRetry: /* @__PURE__ */ __name((info3) => console.warn("[ai][client] \u53EF\u91CD\u8BD5\uFF0C\u51C6\u5907\u91CD\u8BD5", info3), "onRetry")
  });
}
__name(aiFetchWithRetry, "aiFetchWithRetry");

// api/_ai/client-auth.js
function assertCredentials(config2, credential = null) {
  const accountId = String(credential?.id ?? config2?.cfAccountId ?? "").trim();
  const token = String(credential?.token ?? config2?.cfApiToken ?? "").trim();
  if (!accountId || !token) {
    const configured = (Array.isArray(config2?.accounts) ? config2.accounts : []).some(
      (entry) => String(entry?.token ?? "").trim()
    );
    const error3 = new Error(
      configured ? "\u6240\u6709\u51ED\u8BC1\u5F53\u524D\u90FD\u4E0D\u53EF\u7528\uFF08\u989D\u5EA6\u8017\u5C3D\u6216\u5931\u8D25\u51B7\u5374\u4E2D\uFF09\uFF0C\u8BF7\u5728\u300CAI\u914D\u7F6E \u2192 \u81EA\u52A8\u5316\u8C03\u5EA6\u300D\u67E5\u770B\u8D26\u53F7\u72B6\u6001" : "\u5C1A\u672A\u914D\u7F6E Cloudflare Account ID \u6216 API Token\uFF0C\u8BF7\u5148\u5728\u300CAI\u914D\u7F6E\u300D\u9875\u4FDD\u5B58\u8FDE\u63A5"
    );
    error3.name = "ConfigError";
    throw error3;
  }
  return { accountId, token };
}
__name(assertCredentials, "assertCredentials");
function authHeaders(token) {
  return { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
}
__name(authHeaders, "authHeaders");

// api/_ai/client-relay.js
function isRelayCredential(credential) {
  return String(credential?.type ?? "") === "openai" || Boolean(credential?.baseUrl);
}
__name(isRelayCredential, "isRelayCredential");
async function extractOpenAiError(response) {
  let detail = `HTTP ${response.status}`;
  try {
    const body = await response.json();
    const message = body?.error?.message ?? body?.message;
    if (message) detail = String(message).slice(0, 300);
  } catch {
  }
  const error3 = new Error(`\u4E2D\u8F6C\u7AD9\u8BF7\u6C42\u5931\u8D25\uFF1A${detail}`);
  error3.status = response.status;
  return error3;
}
__name(extractOpenAiError, "extractOpenAiError");
async function runOpenAiCompatible(credential, model, messages, { maxTokens, temperature }) {
  const baseUrl = String(credential?.baseUrl ?? credential?.id ?? "").trim().replace(/\/+$/, "");
  const token = String(credential?.token ?? "").trim();
  if (!/^https:\/\//.test(baseUrl) || !token) {
    const error3 = new Error("\u4E2D\u8F6C\u7AD9\u672A\u914D\u7F6E API Base URL \u6216 API Key\uFF0C\u8BF7\u5148\u5728\u300CAI\u914D\u7F6E\u300D\u9875\u4FDD\u5B58\u8FDE\u63A5");
    error3.name = "ConfigError";
    throw error3;
  }
  const url = `${baseUrl}/chat/completions`;
  const response = await aiFetchWithRetry(
    url,
    {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify({
        model,
        messages,
        max_tokens: maxTokens,
        temperature,
        stream: false
      })
    },
    { timeoutMs: RUN_TIMEOUT_MS, maxAttempts: 2 }
  );
  if (!response.ok) throw await extractOpenAiError(response);
  const body = await response.json();
  const choice = body?.choices?.[0]?.message?.content;
  if (typeof choice === "string" && choice) return choice;
  if (Array.isArray(choice)) {
    const joined = choice.map(
      (block) => typeof block === "string" ? block : typeof block?.text === "string" ? block.text : ""
    ).filter(Boolean).join("");
    if (joined) return joined;
  }
  const keys = body && typeof body === "object" ? Object.keys(body).join("/") : typeof body;
  throw new Error(`\u4E2D\u8F6C\u7AD9\u8FD4\u56DE\u4E86\u65E0\u6CD5\u8BC6\u522B\u7684\u7ED3\u679C\u7ED3\u6784\uFF08\u6A21\u578B ${model || "?"}\uFF0C\u54CD\u5E94\u952E\uFF1A${keys}\uFF09`);
}
__name(runOpenAiCompatible, "runOpenAiCompatible");
async function listRelayModels(credential) {
  const baseUrl = String(credential?.baseUrl ?? credential?.id ?? "").trim().replace(/\/+$/, "");
  const token = String(credential?.token ?? "").trim();
  if (!/^https:\/\//.test(baseUrl) || !token) {
    const error3 = new Error("\u4E2D\u8F6C\u7AD9\u672A\u914D\u7F6E API Base URL \u6216 API Key\uFF0C\u8BF7\u5148\u4FDD\u5B58\u8D26\u53F7\u8FDE\u63A5");
    error3.name = "ConfigError";
    throw error3;
  }
  const fetchModels = /* @__PURE__ */ __name((url) => aiFetchWithRetry(
    url,
    { method: "GET", headers: { Authorization: `Bearer ${token}` } },
    { timeoutMs: LIST_TIMEOUT_MS }
  ), "fetchModels");
  let response = await fetchModels(`${baseUrl}/models`);
  if (response.status === 404 && !baseUrl.endsWith("/v1")) {
    response = await fetchModels(`${baseUrl}/v1/models`);
  }
  if (!response.ok) throw await extractOpenAiError(response);
  const body = await response.json();
  const list2 = Array.isArray(body) ? body : Array.isArray(body?.data) ? body.data : Array.isArray(body?.models) ? body.models : [];
  const names = [];
  for (const item of list2) {
    const name = String(
      typeof item === "string" ? item : item?.id ?? item?.name ?? item?.model ?? ""
    ).trim();
    if (name && !names.includes(name)) names.push(name);
    if (names.length >= 200) break;
  }
  return names.map((name) => ({ name }));
}
__name(listRelayModels, "listRelayModels");

// api/_ai/client.js
async function listTextModels(config2) {
  const { accountId, token } = assertCredentials(config2);
  const url = `${resolveApiBase(config2)}/accounts/${accountId}/ai/models/search?per_page=100`;
  const response = await aiFetchWithRetry(
    url,
    { method: "GET", headers: authHeaders(token) },
    { timeoutMs: LIST_TIMEOUT_MS }
  );
  if (!response.ok) throw await extractApiError(response);
  const body = await response.json();
  if (body?.success === false)
    throw new Error(`Workers AI \u8BF7\u6C42\u5931\u8D25\uFF1A${body?.errors?.[0]?.message ?? "\u672A\u77E5\u9519\u8BEF"}`);
  const models = Array.isArray(body?.result) ? body.result : [];
  return models.filter((model) => model?.task?.name === "Text Generation" && model?.name).map((model) => ({
    name: String(model.name),
    description: String(model.description ?? "").slice(0, 200),
    task: String(model.task?.name ?? "")
  }));
}
__name(listTextModels, "listTextModels");
async function runModel(config2, model, messages, { maxTokens = 150, temperature = 0, credential = null } = {}) {
  const target = String(model || config2?.model || "").trim();
  if (!target) {
    const error3 = new Error("\u672A\u6307\u5B9A\u8C03\u7528\u6A21\u578B\uFF0C\u8BF7\u5148\u5728\u300CAI\u914D\u7F6E\u300D\u9875\u9009\u62E9");
    error3.name = "ConfigError";
    throw error3;
  }
  if (isRelayCredential(credential)) {
    return runOpenAiCompatible(credential, target, messages, { maxTokens, temperature });
  }
  const { accountId, token } = assertCredentials(config2, credential);
  const url = `${resolveApiBase(config2)}/accounts/${accountId}/ai/run/${target}`;
  const response = await aiFetchWithRetry(
    url,
    {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify({ messages, max_tokens: maxTokens, temperature })
    },
    { timeoutMs: RUN_TIMEOUT_MS, maxAttempts: 2 }
  );
  if (!response.ok) throw await extractApiError(response);
  const body = await response.json();
  if (body?.success === false)
    throw new Error(`Workers AI \u8BF7\u6C42\u5931\u8D25\uFF1A${body?.errors?.[0]?.message ?? "\u672A\u77E5\u9519\u8BEF"}`);
  const result = body?.result;
  if (typeof result?.response === "string") return result.response;
  if (result?.response && typeof result.response === "object" && typeof result.response.response === "string") {
    return result.response.response;
  }
  const choice = result?.choices?.[0]?.message?.content;
  if (typeof choice === "string") return choice;
  if (Array.isArray(choice)) {
    const joined = choice.map(
      (block) => typeof block === "string" ? block : typeof block?.text === "string" ? block.text : ""
    ).filter(Boolean).join("");
    if (joined) return joined;
  }
  if (typeof result?.output === "string") return result.output;
  if (Array.isArray(result?.output)) {
    const joined = result.output.filter((item) => typeof item === "string").join("");
    if (joined) return joined;
  }
  const keys = result && typeof result === "object" ? Object.keys(result).join("/") : typeof result;
  throw new Error(
    `Workers AI \u8FD4\u56DE\u4E86\u65E0\u6CD5\u8BC6\u522B\u7684\u7ED3\u679C\u7ED3\u6784\uFF08\u6A21\u578B ${model || "?"}\uFF0Cresult \u952E\uFF1A${keys}\uFF09`
  );
}
__name(runModel, "runModel");
async function testConnection(config2, credential = null, model = null) {
  const useModel = String(model || config2?.model || AI_DEFAULT_MODEL).trim();
  const sample2 = await runModel(
    config2,
    useModel,
    [{ role: "user", content: "\u53EA\u56DE\u590D\u4E24\u4E2A\u5B57\uFF1A\u8FDE\u901A" }],
    { maxTokens: 20, temperature: 0, credential }
  );
  return { model: useModel, sample: sample2.trim().slice(0, 100) };
}
__name(testConnection, "testConnection");

// api/_ai/runtime/core.js
var AI_RUNTIME_KEY = "ai.runtime";
var MAX_MODELS = 20;
var MAX_BACKOFF_STEPS = 8;
var DEFAULT_COOLDOWN_BASE_MS = 3e4;
var DEFAULT_COOLDOWN_MAX_MS = 3e5;
var DEFAULT_MODEL_FAILURE_THRESHOLD = 2;
var DAILY_QUOTA_PATTERN = /daily (limit|quota)|额度(已)?(用尽|用完)|每日(额度|上限)|neurons.*(exhausted|used up)|10000 neurons/i;
function isQuotaError(error3) {
  if (Number(error3?.status) === 429) return true;
  return DAILY_QUOTA_PATTERN.test(String(error3?.message ?? ""));
}
__name(isQuotaError, "isQuotaError");
var RATE_LIMIT_COOLDOWN_MS = 5 * 60 * 1e3;
var DAILY_QUOTA_429_STRIKES = 3;
function emptyEntry() {
  return {
    status: "ok",
    quota_until: "",
    cooldown_until: "",
    failures: 0,
    success: 0,
    failed: 0,
    calls: 0,
    last_error: "",
    last_used_at: "",
    last_ok_at: ""
  };
}
__name(emptyEntry, "emptyEntry");
function normalizeEntry(raw) {
  const entry = emptyEntry();
  if (!raw || typeof raw !== "object") return entry;
  entry.status = ["ok", "quota", "cooldown"].includes(String(raw.status)) ? String(raw.status) : "ok";
  entry.quota_until = String(raw.quota_until ?? "");
  entry.cooldown_until = String(raw.cooldown_until ?? "");
  entry.failures = Math.max(0, Number(raw.failures) || 0);
  entry.success = Math.max(0, Number(raw.success) || 0);
  entry.failed = Math.max(0, Number(raw.failed) || 0);
  entry.calls = Math.max(0, Number(raw.calls) || 0);
  entry.last_error = String(raw.last_error ?? "").slice(0, 200);
  entry.last_used_at = String(raw.last_used_at ?? "");
  entry.last_ok_at = String(raw.last_ok_at ?? "");
  return entry;
}
__name(normalizeEntry, "normalizeEntry");
function normalizeRuntime(raw) {
  const runtime = { accounts: {}, models: {}, updated_at: "" };
  if (!raw || typeof raw !== "object") return runtime;
  for (const [id, entry] of Object.entries(raw.accounts ?? {})) {
    if (id) runtime.accounts[id] = normalizeEntry(entry);
  }
  for (const [name, entry] of Object.entries(raw.models ?? {})) {
    if (name) runtime.models[name] = normalizeEntry(entry);
  }
  const models = Object.entries(runtime.models).sort(
    (a, b) => String(b[1].last_ok_at || b[1].cooldown_until).localeCompare(
      String(a[1].last_ok_at || a[1].cooldown_until)
    )
  ).slice(0, MAX_MODELS);
  runtime.models = Object.fromEntries(models);
  runtime.updated_at = String(raw.updated_at ?? "");
  return runtime;
}
__name(normalizeRuntime, "normalizeRuntime");
function nextUtcMidnight(nowMs = Date.now()) {
  const date = new Date(nowMs);
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 1, 0, 0, 0, 0)
  );
}
__name(nextUtcMidnight, "nextUtcMidnight");
function entryStatus(entry, nowMs = Date.now()) {
  if (!entry) return "ok";
  if (entry.status === "quota") {
    const until = Date.parse(entry.quota_until || "");
    if (Number.isFinite(until) && until > nowMs) return "quota";
  }
  if (entry.status === "cooldown" || entry.status === "quota") {
    const until = Date.parse(entry.cooldown_until || "");
    if (Number.isFinite(until) && until > nowMs) return "cooldown";
  }
  return "ok";
}
__name(entryStatus, "entryStatus");
function backoffMs(failures, config2) {
  const base = Math.max(1e3, Number(config2?.cooldownBaseMs) || DEFAULT_COOLDOWN_BASE_MS);
  const max = Math.max(base, Number(config2?.cooldownMaxMs) || DEFAULT_COOLDOWN_MAX_MS);
  const step = Math.min(Math.max(1, Math.floor(failures) || 1), MAX_BACKOFF_STEPS);
  return Math.min(max, base * 2 ** (step - 1));
}
__name(backoffMs, "backoffMs");
function isRelayEntry(entry) {
  return String(entry?.type ?? "") === "openai";
}
__name(isRelayEntry, "isRelayEntry");
function modelCandidates(config2) {
  const models = (Array.isArray(config2?.models) ? config2.models : []).map((name) => String(name || "").trim()).filter(Boolean);
  if (models.length) return [...new Set(models)];
  const single = String(config2?.model || "").trim();
  return single ? [single] : [];
}
__name(modelCandidates, "modelCandidates");

// api/_ai/runtime/view.js
async function loadRuntime(db) {
  try {
    const rows = await db.execute(
      `SELECT setting_value FROM ${PREFS_TABLE} WHERE user_id = ? AND setting_key = ?`,
      ["system", AI_RUNTIME_KEY]
    );
    return normalizeRuntime(rows[0]?.setting_value ? JSON.parse(rows[0].setting_value) : null);
  } catch (error3) {
    console.warn("[ai][runtime] \u8FD0\u884C\u6001\u89E3\u6790\u5931\u8D25\uFF0C\u4F7F\u7528\u7A7A\u72B6\u6001", error3?.message);
    return normalizeRuntime(null);
  }
}
__name(loadRuntime, "loadRuntime");
async function saveRuntime(db, runtime) {
  const payload = { ...runtime, updated_at: nowIso() };
  await db.batch([
    {
      sql: `INSERT INTO ${PREFS_TABLE} (user_id, setting_key, setting_value, updated_at)
            VALUES (?, ?, ?, ?)
            ON CONFLICT(user_id, setting_key)
            DO UPDATE SET setting_value = excluded.setting_value, updated_at = excluded.updated_at`,
      params: ["system", AI_RUNTIME_KEY, JSON.stringify(payload), nowIso()]
    }
  ]);
  return payload;
}
__name(saveRuntime, "saveRuntime");
function viewEntry(entry, nowMs) {
  const status4 = entryStatus(entry, nowMs);
  const until = status4 === "quota" ? entry.quota_until : entry.cooldown_until;
  const untilMs = Date.parse(until || "");
  return {
    status: status4,
    failures: entry.failures,
    success: entry.success,
    failed: entry.failed,
    calls: entry.calls,
    last_error: entry.last_error,
    last_used_at: entry.last_used_at,
    /** 恢复剩余毫秒（ok 为 0）：面板转成「N 秒后恢复」 */
    recover_in_ms: status4 === "ok" ? 0 : Math.max(0, Number.isFinite(untilMs) ? untilMs - nowMs : 0)
  };
}
__name(viewEntry, "viewEntry");
function runtimeView(config2, runtime, nowMs = Date.now()) {
  const accountList = Array.isArray(config2?.accounts) ? config2.accounts : [];
  const firstCfIndex = accountList.findIndex((entry) => !isRelayEntry(entry));
  const accounts = accountList.map((entry, index) => {
    const state = runtime.accounts[entry.id] || emptyEntry();
    const relay = isRelayEntry(entry);
    const base = {
      id: entry.id,
      label: entry.label || (relay ? `\u4E2D\u8F6C\u8D26\u53F7 ${index + 1}` : `\u51ED\u8BC1 ${index + 1}`),
      primary: index === firstCfIndex,
      tokenMask: entry.token ? `\u2022\u2022\u2022\u2022${entry.token.slice(-4)}` : "",
      type: relay ? "openai" : "cloudflare",
      ...viewEntry(state, nowMs)
    };
    if (relay) {
      base.baseUrl = entry.baseUrl || entry.id;
      base.models = Array.isArray(entry.models) ? [...entry.models] : [];
    }
    return base;
  });
  const candidates = modelCandidates(config2);
  const relayModels = accountList.filter((entry) => isRelayEntry(entry)).flatMap((entry) => Array.isArray(entry.models) ? entry.models : []);
  const names = [
    .../* @__PURE__ */ new Set([...candidates, ...relayModels, ...Object.keys(runtime.models || {})])
  ].filter(Boolean);
  const models = names.map((name) => ({
    name,
    current: candidates.includes(name),
    ...viewEntry(runtime.models[name] || emptyEntry(), nowMs)
  }));
  models.sort((a, b) => (b.current ? 1 : 0) - (a.current ? 1 : 0) || b.success - a.success);
  return { accounts, models, loadBalance: Boolean(config2?.loadBalance) };
}
__name(runtimeView, "runtimeView");
function runtimeStats(view) {
  const accounts = Array.isArray(view?.accounts) ? view.accounts : [];
  const models = Array.isArray(view?.models) ? view.models : [];
  const configuredAccounts = accounts.filter((account) => account.tokenMask);
  const availableAccounts = configuredAccounts.filter((account) => account.status === "ok");
  const currentModels = models.filter((model) => model.current);
  const availableModels = currentModels.filter((model) => model.status === "ok");
  return {
    /** 已配置凭证 / 账号数量（token 在位才算，缺 token 的占位行不计） */
    accounts: configuredAccounts.length,
    availableAccounts: availableAccounts.length,
    /** 候选模型总数与其中当前可用数（失败冷却中的不计） */
    models: currentModels.length,
    availableModels: availableModels.length,
    /** 累计失败 / 成功次数（全部已配置凭证求和，成功按域名次数累计） */
    failed: configuredAccounts.reduce((sum, account) => sum + (Number(account.failed) || 0), 0),
    succeeded: configuredAccounts.reduce(
      (sum, account) => sum + (Number(account.success) || 0),
      0
    ),
    /** 整体是否可用：调度视角能不能发起一次真实调用 */
    available: configuredAccounts.length > 0 && availableAccounts.length > 0 && availableModels.length > 0
  };
}
__name(runtimeStats, "runtimeStats");

// api/_ai/runtime/scheduler.js
function accountModelNames(config2, entry) {
  if (isRelayEntry(entry)) {
    return (Array.isArray(entry?.models) ? entry.models : []).map((name) => String(name || "").trim()).filter(Boolean);
  }
  return modelCandidates(config2);
}
__name(accountModelNames, "accountModelNames");
function selectCredential(config2, runtime, nowMs = Date.now()) {
  const usable = (Array.isArray(config2?.accounts) ? config2.accounts : []).map((entry, index) => ({ entry, index })).filter(
    ({ entry }) => entry.id && entry.token && (!isRelayEntry(entry) || entry.baseUrl) && entryStatus(runtime.accounts[entry.id] || emptyEntry(), nowMs) === "ok"
  );
  if (!usable.length) return null;
  if (!config2?.loadBalance) return toCredential(usable[0]);
  return toCredential(
    usable.map(({ entry, index }) => {
      const state = runtime.accounts[entry.id] || emptyEntry();
      return {
        entry,
        index,
        calls: state.calls,
        lastUsed: Date.parse(state.last_used_at || "") || 0
      };
    }).sort((a, b) => a.calls - b.calls || a.lastUsed - b.lastUsed || a.index - b.index)[0]
  );
}
__name(selectCredential, "selectCredential");
function toCredential(choice) {
  if (!choice?.entry?.id) return null;
  const entry = choice.entry;
  const credential = { id: entry.id, token: entry.token, label: entry.label || "" };
  if (isRelayEntry(entry)) {
    credential.type = "openai";
    credential.baseUrl = entry.baseUrl || entry.id;
    credential.models = Array.isArray(entry.models) ? [...entry.models] : [];
  } else {
    credential.type = "cloudflare";
  }
  return credential;
}
__name(toCredential, "toCredential");
function markCredentialUsed(runtime, credential, nowMs = Date.now()) {
  if (!credential?.id) return;
  const entry = runtime.accounts[credential.id] || (runtime.accounts[credential.id] = emptyEntry());
  entry.calls += 1;
  entry.last_used_at = new Date(nowMs).toISOString();
}
__name(markCredentialUsed, "markCredentialUsed");
function selectModel(config2, runtime, nowMs = Date.now()) {
  const usable = modelCandidates(config2).filter(
    (name) => entryStatus(runtime.models[name] || emptyEntry(), nowMs) === "ok"
  );
  if (!usable.length) return null;
  if (!config2?.loadBalance) return usable[0];
  return usable.map((name) => {
    const state = runtime.models[name] || emptyEntry();
    return {
      name,
      calls: state.calls,
      lastUsed: Date.parse(state.last_used_at || "") || 0
    };
  }).sort((a, b) => a.calls - b.calls || a.lastUsed - b.lastUsed)[0].name;
}
__name(selectModel, "selectModel");
function markModelUsed(runtime, model, nowMs = Date.now()) {
  if (!model) return;
  const entry = runtime.models[model] || (runtime.models[model] = emptyEntry());
  entry.calls += 1;
  entry.last_used_at = new Date(nowMs).toISOString();
}
__name(markModelUsed, "markModelUsed");
function selectPair(config2, runtime, nowMs = Date.now()) {
  const accounts = (Array.isArray(config2?.accounts) ? config2.accounts : []).map((entry, index) => ({ entry, index })).filter(
    ({ entry }) => entry.id && entry.token && (!isRelayEntry(entry) || entry.baseUrl) && entryStatus(runtime.accounts[entry.id] || emptyEntry(), nowMs) === "ok"
  );
  const pairs = [];
  for (const { entry, index } of accounts) {
    const accountState = runtime.accounts[entry.id] || emptyEntry();
    const accountCalls = accountState.calls;
    const accountLastUsed = Date.parse(accountState.last_used_at || "") || 0;
    for (const name of accountModelNames(config2, entry)) {
      if (entryStatus(runtime.models[name] || emptyEntry(), nowMs) !== "ok") continue;
      const modelState = runtime.models[name] || emptyEntry();
      pairs.push({
        entry,
        index,
        name,
        accountCalls,
        accountLastUsed,
        modelCalls: modelState.calls,
        modelLastUsed: Date.parse(modelState.last_used_at || "") || 0
      });
    }
  }
  if (!pairs.length) return null;
  const best = config2?.loadBalance ? pairs.sort(
    (a, b) => a.accountCalls - b.accountCalls || a.accountLastUsed - b.accountLastUsed || a.index - b.index || a.modelCalls - b.modelCalls || a.modelLastUsed - b.modelLastUsed || a.name.localeCompare(b.name)
  )[0] : pairs[0];
  return { credential: toCredential({ entry: best.entry }), model: best.name };
}
__name(selectPair, "selectPair");
function unavailableKind(config2, runtime, nowMs = Date.now()) {
  const hasUsableAccount = (Array.isArray(config2?.accounts) ? config2.accounts : []).some(
    (entry) => entry.id && entry.token && (!isRelayEntry(entry) || entry.baseUrl) && entryStatus(runtime.accounts[entry.id] || emptyEntry(), nowMs) === "ok"
  );
  return hasUsableAccount ? "model" : "credential";
}
__name(unavailableKind, "unavailableKind");

// api/_ai/runtime/recording.js
function recordCredentialSuccess(runtime, credential, nowMs = Date.now()) {
  if (!credential?.id) return;
  const entry = runtime.accounts[credential.id] || (runtime.accounts[credential.id] = emptyEntry());
  entry.status = "ok";
  entry.quota_until = "";
  entry.cooldown_until = "";
  entry.failures = 0;
  entry.success += 1;
  entry.last_ok_at = new Date(nowMs).toISOString();
}
__name(recordCredentialSuccess, "recordCredentialSuccess");
function recordCredentialFailure(runtime, credential, error3, config2, nowMs = Date.now()) {
  if (!credential?.id) return;
  const entry = runtime.accounts[credential.id] || (runtime.accounts[credential.id] = emptyEntry());
  entry.failures += 1;
  entry.failed += 1;
  entry.last_error = String(error3?.message ?? "\u672A\u77E5\u9519\u8BEF").slice(0, 200);
  entry.cooldown_until = new Date(nowMs + backoffMs(entry.failures, config2)).toISOString();
  entry.status = "cooldown";
}
__name(recordCredentialFailure, "recordCredentialFailure");
function recordCredentialQuota(runtime, credential, nowMs = Date.now()) {
  if (!credential?.id) return;
  const entry = runtime.accounts[credential.id] || (runtime.accounts[credential.id] = emptyEntry());
  entry.status = "quota";
  entry.quota_until = nextUtcMidnight(nowMs).toISOString();
  entry.cooldown_until = "";
  entry.last_error = "\u4ECA\u65E5\u989D\u5EA6\u5DF2\u7528\u5B8C\uFF08429\uFF09\uFF0C\u5F85 UTC \u6B21\u65E5\u96F6\u70B9\u6062\u590D";
}
__name(recordCredentialQuota, "recordCredentialQuota");
function recordCredentialRateLimit(runtime, credential, error3, nowMs = Date.now()) {
  if (!credential?.id) return;
  const entry = runtime.accounts[credential.id] || (runtime.accounts[credential.id] = emptyEntry());
  entry.failures += 1;
  entry.failed += 1;
  const explicitDaily = DAILY_QUOTA_PATTERN.test(String(error3?.message ?? ""));
  if (explicitDaily || entry.failures >= DAILY_QUOTA_429_STRIKES) {
    recordCredentialQuota(runtime, credential, nowMs);
    return;
  }
  entry.last_error = `\u4E0A\u6E38\u9650\u6D41\uFF08429\uFF0C\u7B2C ${entry.failures} \u6B21\uFF09\uFF1A\u77ED\u51B7\u5374\u540E\u81EA\u52A8\u91CD\u8BD5\uFF0C\u989D\u5EA6\u672A\u5224\u8017\u5C3D`;
  entry.status = "cooldown";
  entry.quota_until = "";
  entry.cooldown_until = new Date(nowMs + RATE_LIMIT_COOLDOWN_MS).toISOString();
}
__name(recordCredentialRateLimit, "recordCredentialRateLimit");
function recordModelSuccess(runtime, model, count3 = 1, nowMs = Date.now()) {
  if (!model) return;
  const entry = runtime.models[model] || (runtime.models[model] = emptyEntry());
  entry.status = "ok";
  entry.cooldown_until = "";
  entry.failures = 0;
  entry.success += Math.max(0, Math.floor(Number(count3) || 0));
  entry.last_ok_at = new Date(nowMs).toISOString();
}
__name(recordModelSuccess, "recordModelSuccess");
function recordModelFailure(runtime, model, error3, config2, nowMs = Date.now()) {
  if (!model) return;
  const entry = runtime.models[model] || (runtime.models[model] = emptyEntry());
  entry.failures += 1;
  entry.failed += 1;
  entry.last_error = String(error3?.message ?? "\u672A\u77E5\u9519\u8BEF").slice(0, 200);
  const threshold = Math.max(
    1,
    Math.floor(Number(config2?.modelFailureThreshold) || DEFAULT_MODEL_FAILURE_THRESHOLD)
  );
  if (entry.failures < threshold) return;
  entry.cooldown_until = new Date(nowMs + backoffMs(entry.failures, config2)).toISOString();
  entry.status = "cooldown";
}
__name(recordModelFailure, "recordModelFailure");
function dailyQuotaExhausted(runtime) {
  return Object.values(runtime?.accounts ?? {}).some((entry) => entryStatus(entry) === "quota");
}
__name(dailyQuotaExhausted, "dailyQuotaExhausted");
function unavailabilityMessage(kind) {
  return kind === "model" ? "\u5168\u90E8\u5019\u9009\u6A21\u578B\u90FD\u5728\u5931\u8D25\u51B7\u5374\u4E2D\uFF0C\u7B49\u5F85\u81EA\u52A8\u6062\u590D" : "\u6240\u6709\u51ED\u8BC1\u5F53\u524D\u4E0D\u53EF\u7528\uFF08\u989D\u5EA6\u8017\u5C3D\u6216\u5931\u8D25\u51B7\u5374\u4E2D\uFF09";
}
__name(unavailabilityMessage, "unavailabilityMessage");

// api/_ai/runtime/caller.js
async function callModelWithRuntime(config2, runtime, run2, {
  model = null,
  credential = null,
  selectCredential: pickCredential = true,
  selectModel: pickModel = true
} = {}) {
  if (!runtime) {
    const fallbackModel = String(config2?.model || AI_DEFAULT_MODEL).trim();
    const text2 = await run2({ model: fallbackModel, credential: null });
    return { ok: true, model: fallbackModel, credential: null, text: text2 };
  }
  let chosenCredential = credential;
  let chosenModel = model;
  if (!chosenCredential && !chosenModel) {
    const pair = selectPair(config2, runtime);
    if (!pair) return { ok: false, unavailable: unavailableKind(config2, runtime) };
    chosenCredential = pair.credential;
    chosenModel = pair.model;
  } else {
    if (!chosenCredential && pickCredential) {
      chosenCredential = selectCredential(config2, runtime);
    }
    if (!chosenModel) {
      chosenModel = chosenCredential?.type === "openai" ? (chosenCredential.models ?? [])[0] ?? null : pickModel ? selectModel(config2, runtime) : String(config2?.model || AI_DEFAULT_MODEL).trim();
    }
    if (pickModel && !chosenModel) return { ok: false, unavailable: "model" };
    if (pickCredential && !chosenCredential) return { ok: false, unavailable: "credential" };
  }
  markCredentialUsed(runtime, chosenCredential);
  markModelUsed(runtime, chosenModel);
  let text;
  try {
    text = await run2({ model: chosenModel, credential: chosenCredential });
  } catch (error3) {
    if (isQuotaError(error3)) {
      recordCredentialRateLimit(runtime, chosenCredential, error3);
      console.warn("[ai][runtime] \u4E0A\u6E38 429\uFF08\u77AC\u65F6\u9650\u6D41\u6216\u65E5\u989D\u5EA6\u4FE1\u53F7\uFF0C\u5DF2\u6309\u4E09\u632F\u8BED\u4E49\u8BB0\u8D26\uFF09");
    } else {
      recordCredentialFailure(runtime, chosenCredential, error3, config2);
      recordModelFailure(runtime, chosenModel, error3, config2);
    }
    throw error3;
  }
  return { ok: true, model: chosenModel, credential: chosenCredential, text };
}
__name(callModelWithRuntime, "callModelWithRuntime");

// _utils/export-policy-validate.js
var BUILTIN_EXPORT_POLICY = "REJECT";
var MAX_POLICY_KEY_LENGTH = 32;
var MAX_GIST_URL_LENGTH = 512;
var MAX_SYNC_MINUTES = 1440;
var MAX_ICON_LENGTH = 512;
function validateGistUrl(value) {
  const url = String(value ?? "").trim();
  if (!url) return "";
  if (!/^https:\/\/gist\.githubusercontent\.com\//.test(url) && !/^https:\/\/gist\.github\.com\//.test(url) && !/^https:\/\/raw\.githubusercontent\.com\//.test(url)) {
    return "\u5916\u90E8\u8FDE\u63A5\u4EC5\u652F\u6301 GitHub Gist / gist.githubusercontent.com \u5730\u5740";
  }
  if (url.length > MAX_GIST_URL_LENGTH) return "\u5916\u90E8\u8FDE\u63A5\u5730\u5740\u8FC7\u957F";
  return "";
}
__name(validateGistUrl, "validateGistUrl");
function validateSyncMinutes(value) {
  const minutes = Number(value);
  if (!Number.isInteger(minutes) || minutes < 0 || minutes > MAX_SYNC_MINUTES) {
    return `\u5B9A\u65F6\u9891\u7387\u9700\u4E3A 0\uFF08\u5173\u95ED\uFF09\u6216 1-${MAX_SYNC_MINUTES} \u4E4B\u95F4\u7684\u6574\u6570\u5206\u949F`;
  }
  return "";
}
__name(validateSyncMinutes, "validateSyncMinutes");
function validateIconUrl(value) {
  const url = String(value ?? "").trim();
  if (!url) return "";
  if (!/^https:\/\//.test(url)) return "\u56FE\u6807\u5730\u5740\u4EC5\u652F\u6301 https \u94FE\u63A5";
  if (url.length > MAX_ICON_LENGTH) return "\u56FE\u6807\u5730\u5740\u8FC7\u957F";
  return "";
}
__name(validateIconUrl, "validateIconUrl");
function normalizePolicyKey(value) {
  return String(value ?? "").trim().toUpperCase().replace(/\s+/g, "");
}
__name(normalizePolicyKey, "normalizePolicyKey");
function validatePolicyKey(value) {
  const key = normalizePolicyKey(value);
  if (!key) return "\u7B56\u7565\u7EC4\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A";
  if (key.length < 2) return "\u7B56\u7565\u7EC4\u540D\u79F0\u9700 2-32 \u4E2A\u5B57\u7B26";
  if (key.length > MAX_POLICY_KEY_LENGTH) return `\u7B56\u7565\u7EC4\u540D\u79F0\u9700 \u2264 ${MAX_POLICY_KEY_LENGTH} \u4E2A\u5B57\u7B26`;
  if (!/^[A-Z0-9\u4e00-\u9fa5]+$/.test(key))
    return "\u7B56\u7565\u7EC4\u540D\u79F0\u53EA\u80FD\u5305\u542B\u4E2D\u82F1\u6587\u6216\u6570\u5B57\uFF0C\u4E0D\u80FD\u5305\u542B\u7279\u6B8A\u7B26\u53F7\u4E0E\u7A7A\u683C";
  if (key === "ALL") return "ALL \u662F\u5168\u90E8\u7B56\u7565\u7684\u4FDD\u7559\u952E\uFF0C\u8BF7\u6362\u4E00\u4E2A\u540D\u79F0";
  return "";
}
__name(validatePolicyKey, "validatePolicyKey");

// _utils/export-policies.js
var DEFAULT_POLICIES = [
  { policyKey: "REJECT", label: "REJECT", emoji: "", isBuiltin: 1 },
  { policyKey: "PROXY", label: "PROXY", emoji: "", isBuiltin: 0 },
  { policyKey: "DIRECT", label: "DIRECT", emoji: "", isBuiltin: 0 }
];
var MAX_LABEL_LENGTH = 32;
var MAX_EMOJI_LENGTH = 8;
var MAX_GROUP_NAME_LENGTH = 32;
var MAX_ICON_LENGTH2 = 512;
var POLICY_COLUMNS = "id, policy_key, label, emoji, is_builtin, sort_order, gist_enabled, gist_url, sync_minutes, group_name, icon, created_at, updated_at";
function sanitizePolicyRow(row) {
  return {
    id: Number(row.id) || 0,
    policyKey: normalizePolicyKey(row.policy_key),
    label: String(row.label ?? ""),
    emoji: String(row.emoji ?? ""),
    isBuiltin: Boolean(Number(row.is_builtin ?? 0)),
    sortOrder: Number(row.sort_order) || 0,
    // v1.29 T15（工单 #48）：Gist 联动——上传开关 / 外部连接地址 / 定时频率（分钟，0=关）
    gistEnabled: Boolean(Number(row.gist_enabled ?? 0)),
    gistUrl: String(row.gist_url ?? ""),
    syncMinutes: Number(row.sync_minutes ?? 0) || 0,
    // v16：策略分组名与图标地址（首页归组展示 / 图标包解析回填）
    groupName: String(row.group_name ?? ""),
    icon: String(row.icon ?? ""),
    createdAt: String(row.created_at ?? ""),
    updatedAt: String(row.updated_at ?? "")
  };
}
__name(sanitizePolicyRow, "sanitizePolicyRow");
var policiesSeeded = false;
async function ensureExportPolicies(db) {
  if (policiesSeeded) return;
  policiesSeeded = true;
  try {
    const rows = await db.execute(`SELECT policy_key FROM ${EXPORT_POLICIES_TABLE}`);
    const have = new Set(rows.map((row) => normalizePolicyKey(row.policy_key)));
    const missing = DEFAULT_POLICIES.filter((item) => !have.has(item.policyKey));
    if (!missing.length) return;
    const now2 = (/* @__PURE__ */ new Date()).toISOString();
    await db.batch(
      missing.map((item, index) => ({
        sql: `INSERT OR IGNORE INTO ${EXPORT_POLICIES_TABLE}
            (policy_key, label, emoji, is_builtin, sort_order, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
        params: [
          item.policyKey,
          item.label || item.policyKey,
          item.emoji,
          item.isBuiltin,
          have.size + index,
          now2,
          now2
        ]
      }))
    );
  } catch {
    policiesSeeded = false;
  }
}
__name(ensureExportPolicies, "ensureExportPolicies");
async function listExportPolicies(db) {
  await ensureExportPolicies(db);
  const rows = await db.execute(
    `SELECT ${POLICY_COLUMNS} FROM ${EXPORT_POLICIES_TABLE} ORDER BY sort_order ASC, id ASC`
  );
  return rows.map(sanitizePolicyRow);
}
__name(listExportPolicies, "listExportPolicies");
async function getExportPolicyByKey(db, policyKey) {
  const key = normalizePolicyKey(policyKey);
  if (!key) return null;
  await ensureExportPolicies(db);
  const rows = await db.execute(
    `SELECT ${POLICY_COLUMNS} FROM ${EXPORT_POLICIES_TABLE} WHERE policy_key = ?`,
    [key]
  );
  return rows[0] ? sanitizePolicyRow(rows[0]) : null;
}
__name(getExportPolicyByKey, "getExportPolicyByKey");
async function getExportPolicyById(db, id) {
  const rows = await db.execute(
    `SELECT ${POLICY_COLUMNS} FROM ${EXPORT_POLICIES_TABLE} WHERE id = ?`,
    [Number(id)]
  );
  return rows[0] ? sanitizePolicyRow(rows[0]) : null;
}
__name(getExportPolicyById, "getExportPolicyById");
async function createExportPolicy(db, { policyKey, label = "", emoji = "" }) {
  const key = normalizePolicyKey(policyKey);
  const now2 = (/* @__PURE__ */ new Date()).toISOString();
  const maxRows = await db.execute(
    `SELECT COALESCE(MAX(sort_order), -1) AS n FROM ${EXPORT_POLICIES_TABLE}`
  );
  const sortOrder = Number(maxRows[0]?.n ?? -1) + 1;
  await db.batch([
    {
      sql: `INSERT INTO ${EXPORT_POLICIES_TABLE}
            (policy_key, label, emoji, is_builtin, sort_order, created_at, updated_at)
            VALUES (?, ?, ?, 0, ?, ?, ?)`,
      params: [
        key,
        String(label || key).slice(0, MAX_LABEL_LENGTH),
        String(emoji ?? "").slice(0, MAX_EMOJI_LENGTH),
        sortOrder,
        now2,
        now2
      ]
    }
  ]);
  return getExportPolicyByKey(db, key);
}
__name(createExportPolicy, "createExportPolicy");
async function updateExportPolicy(db, id, { label, emoji, gistEnabled, gistUrl, syncMinutes, groupName, icon }) {
  const sets = [];
  const params = [];
  if (label !== void 0) {
    sets.push("label = ?");
    params.push(String(label).slice(0, MAX_LABEL_LENGTH));
  }
  if (emoji !== void 0) {
    sets.push("emoji = ?");
    params.push(String(emoji ?? "").slice(0, MAX_EMOJI_LENGTH));
  }
  if (gistEnabled !== void 0) {
    sets.push("gist_enabled = ?");
    params.push(gistEnabled ? 1 : 0);
  }
  if (gistUrl !== void 0) {
    sets.push("gist_url = ?");
    params.push(
      String(gistUrl ?? "").trim().slice(0, MAX_GIST_URL_LENGTH)
    );
  }
  if (syncMinutes !== void 0) {
    sets.push("sync_minutes = ?");
    params.push(Number(syncMinutes) || 0);
  }
  if (groupName !== void 0) {
    sets.push("group_name = ?");
    params.push(
      String(groupName ?? "").trim().slice(0, MAX_GROUP_NAME_LENGTH)
    );
  }
  if (icon !== void 0) {
    sets.push("icon = ?");
    params.push(
      String(icon ?? "").trim().slice(0, MAX_ICON_LENGTH2)
    );
  }
  if (!sets.length) return getExportPolicyById(db, id);
  sets.push("updated_at = ?");
  params.push((/* @__PURE__ */ new Date()).toISOString());
  params.push(Number(id));
  await db.batch([
    { sql: `UPDATE ${EXPORT_POLICIES_TABLE} SET ${sets.join(", ")} WHERE id = ?`, params }
  ]);
  return getExportPolicyById(db, id);
}
__name(updateExportPolicy, "updateExportPolicy");
async function deleteExportPolicy(db, id) {
  const results = await db.batch([
    { sql: `DELETE FROM ${EXPORT_POLICIES_TABLE} WHERE id = ?`, params: [Number(id)] }
  ]);
  return Number(results[0]?.changes ?? 0);
}
__name(deleteExportPolicy, "deleteExportPolicy");

// api/_ai/routes-shared.js
var MAX_QUERY_DOMAINS = 50;
var MAX_JUDGE_DOMAINS = 120;
var AI_SCHEDULE_FIELDS = /* @__PURE__ */ new Set([
  "enabled",
  "intervalMinutes",
  "batchSize",
  "requestDelayMs",
  "onlyUnclassified",
  "fillComment",
  "priorityEdited",
  "cooldownDays",
  "cooldownBaseMs",
  "cooldownMaxMs",
  "modelFailureThreshold"
]);
var AI_SHARED_CONFIG_FIELDS = /* @__PURE__ */ new Set(["models", "model", "loadBalance"]);
async function guardAi(context2, db, feature) {
  return guardPrincipal(context2.env, db, context2.request, context2, {
    auth: "mutation",
    feature,
    featurePath: new URL(context2.request.url).pathname
  });
}
__name(guardAi, "guardAi");
async function loadPolicyKeys(db) {
  try {
    const list2 = await listExportPolicies(db);
    return (Array.isArray(list2) ? list2 : []).map((item) => item.policyKey).filter(Boolean);
  } catch {
    return [];
  }
}
__name(loadPolicyKeys, "loadPolicyKeys");

// api/_ai/routes-config.js
async function getConfig(context2, db) {
  const config2 = await loadAiConfig(db);
  return jsonResponse({
    success: true,
    data: publicAiConfig(config2, { policyKeys: await loadPolicyKeys(db) })
  });
}
__name(getConfig, "getConfig");
async function saveConfig(context2, db) {
  const auth = await requireMutationAuth(context2.env, db, context2.request, context2);
  if (!auth.ok) return auth.response;
  const body = await readJson(context2);
  if (!body.ok) return badRequest("\u8BF7\u6C42\u4F53\u4E0D\u662F\u6709\u6548\u7684 JSON");
  const payload = body.value || {};
  const required = /* @__PURE__ */ new Set();
  const shared = /* @__PURE__ */ new Set();
  for (const key of Object.keys(payload)) {
    if (key === "prompt" || key === "policyMeta") required.add("ai.prompt");
    else if (AI_SCHEDULE_FIELDS.has(key)) required.add("ai.schedule");
    else if (AI_SHARED_CONFIG_FIELDS.has(key)) shared.add("ai.config");
    else required.add("ai.config");
  }
  if (!required.has("ai.schedule")) {
    for (const feature of shared) required.add(feature);
  }
  if (!required.size) required.add("ai.config");
  for (const feature of required) {
    const denied = await requireFeature(auth.principal, feature, {
      path: "/api/ai/config",
      db
    });
    if (denied) return denied;
  }
  const saved = await saveAiConfig(db, payload);
  return jsonResponse({
    success: true,
    data: publicAiConfig(saved, { policyKeys: await loadPolicyKeys(db) })
  });
}
__name(saveConfig, "saveConfig");
async function getModels(context2, db) {
  const guard5 = await guardAi(context2, db, "ai.config");
  if (!guard5.ok) return guard5.response;
  const config2 = await loadAiConfig(db, context2.env);
  const models = await listTextModels(config2);
  return jsonResponse({ success: true, data: { models, current: config2.model } });
}
__name(getModels, "getModels");
async function pullRelayModels(context2, db) {
  const guard5 = await guardAi(context2, db, "ai.config");
  if (!guard5.ok) return guard5.response;
  const body = await readJson(context2);
  if (!body.ok) return badRequest("\u8BF7\u6C42\u4F53\u4E0D\u662F\u6709\u6548\u7684 JSON");
  const accountId = String(body.value?.accountId ?? "").trim();
  if (!accountId) return badRequest("\u7F3A\u5C11 accountId\uFF08\u4E2D\u8F6C\u7AD9 Base URL\uFF09");
  const config2 = await loadAiConfig(db, context2.env);
  const account = (Array.isArray(config2.accounts) ? config2.accounts : []).find(
    (entry) => entry?.type === "openai" && String(entry?.id ?? "") === accountId
  );
  if (!account) return badRequest("\u672A\u627E\u5230\u8BE5\u4E2D\u8F6C\u8D26\u53F7\uFF0C\u8BF7\u5148\u4FDD\u5B58\u8D26\u53F7\u914D\u7F6E");
  const models = await listRelayModels(account);
  return jsonResponse({ success: true, data: { accountId, models } });
}
__name(pullRelayModels, "pullRelayModels");
async function test(context2, db) {
  const guard5 = await guardAi(context2, db, "ai.config");
  if (!guard5.ok) return guard5.response;
  const config2 = await loadAiConfig(db, context2.env);
  const runtime = await loadRuntime(db);
  try {
    const outcome = await callModelWithRuntime(
      config2,
      runtime,
      ({ model, credential }) => testConnection(config2, credential, model).then((result) => result.sample)
    );
    if (!outcome.ok) {
      return jsonResponse(
        {
          success: true,
          data: { ok: false, error: unavailabilityMessage(outcome.unavailable) }
        },
        { headers: { "Cache-Control": "no-store" } }
      );
    }
    recordCredentialSuccess(runtime, outcome.credential);
    recordModelSuccess(runtime, outcome.model, 0);
    return jsonResponse({
      success: true,
      data: { model: outcome.model, sample: outcome.text, accountId: outcome.credential.id }
    });
  } finally {
    await saveRuntime(db, runtime);
  }
}
__name(test, "test");

// api/_ai/verdict/parse.js
var ALLOWED_ACTIONS = /* @__PURE__ */ new Set(["PROXY", "DIRECT", "REJECT"]);
var MAX_COMMENT_LENGTH = 80;
var MAX_DOMAIN_LENGTH = 253;
function normalizeDomain(raw) {
  return String(raw ?? "").trim().slice(0, MAX_DOMAIN_LENGTH);
}
__name(normalizeDomain, "normalizeDomain");
function normalizeVerdict(parsed, rawText = "") {
  const action = normalizePolicy(parsed?.action ?? parsed?.policy, "");
  if (!ALLOWED_ACTIONS.has(action)) return parseVerdictText(rawText);
  const confidence = Number(parsed?.confidence);
  const validConfidence = Number.isFinite(confidence) ? Math.min(1, Math.max(0, Math.round(confidence * 100) / 100)) : 0.5;
  let comment = String(parsed?.comment ?? "").replace(/^\s*\/\/\s*/, "").replace(/^["'「『]+|["'」』]+$/g, "").replace(/\s+/g, " ").trim();
  if (comment.length > MAX_COMMENT_LENGTH) comment = comment.slice(0, MAX_COMMENT_LENGTH);
  return { action, confidence: validConfidence, comment };
}
__name(normalizeVerdict, "normalizeVerdict");
function isAllowedAction(value) {
  return ALLOWED_ACTIONS.has(normalizePolicy(value, ""));
}
__name(isAllowedAction, "isAllowedAction");
function parseVerdictBatchOutput(text, domains) {
  const raw = String(text ?? "");
  const matched = /* @__PURE__ */ new Map();
  const start = raw.indexOf("[");
  const end = raw.lastIndexOf("]");
  let items = [];
  if (start >= 0 && end > start) {
    try {
      const parsed = JSON.parse(raw.slice(start, end + 1));
      if (Array.isArray(parsed)) items = parsed;
    } catch {
      items = extractJsonObjects(raw.slice(start, end + 1));
    }
  }
  const list2 = (Array.isArray(domains) ? domains : []).filter(Boolean);
  const used = /* @__PURE__ */ new Set();
  for (const item of items) {
    const key = String(item?.domain ?? item?.\u5339\u914D\u503C ?? item?.value ?? "").trim();
    if (key && list2.includes(key) && !used.has(key)) {
      const verdict = normalizeVerdict(item, raw);
      if (verdict) {
        matched.set(key, verdict);
        used.add(key);
      }
    }
  }
  if (items.length === list2.length) {
    list2.forEach((domain2, index) => {
      if (used.has(domain2) || !isPlainVerdict(items[index])) return;
      const verdict = normalizeVerdict(items[index], raw);
      if (verdict) {
        matched.set(domain2, verdict);
        used.add(domain2);
      }
    });
  }
  return { matched, rawItems: items };
}
__name(parseVerdictBatchOutput, "parseVerdictBatchOutput");
function extractJsonObjects(text) {
  const items = [];
  let depth = 0;
  let current = "";
  let quote = "";
  for (const char of String(text ?? "")) {
    if (quote) {
      current += char;
      if (char === quote) quote = "";
      continue;
    }
    if (char === '"' || char === "'") {
      quote = char;
      current += char;
      continue;
    }
    if (char === "{") {
      depth += 1;
      current += char;
      continue;
    }
    if (char === "}") {
      depth -= 1;
      current += char;
      if (depth === 0) {
        try {
          items.push(JSON.parse(current));
        } catch {
        }
        current = "";
      }
      continue;
    }
    if (depth > 0) current += char;
  }
  return items;
}
__name(extractJsonObjects, "extractJsonObjects");
function isPlainVerdict(item) {
  return Boolean(item && typeof item === "object" && isAllowedAction(item.action ?? item.policy));
}
__name(isPlainVerdict, "isPlainVerdict");
function parseVerdictOutput(text) {
  const raw = String(text ?? "");
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start < 0 || end <= start) return parseVerdictText(raw);
  let parsed;
  try {
    parsed = JSON.parse(raw.slice(start, end + 1));
  } catch {
    return parseVerdictText(raw);
  }
  return normalizeVerdict(parsed, raw);
}
__name(parseVerdictOutput, "parseVerdictOutput");
var CHINESE_ACTION_MAP = [
  [/(直连|直接访问|直接分流)/, "DIRECT"],
  [/(代理|走代理)/, "PROXY"],
  [/(拦截|拒绝|屏蔽|阻断)/, "REJECT"]
];
function parseVerdictText(text) {
  const flat = String(text ?? "").replace(/[ \t]+/g, " ").trim();
  if (!flat) return null;
  const policyLine = flat.match(
    /(?:分流策略|策略|policy|action)\s*[:：]?\s*["']?([A-Za-z]+|直连|直接访问|直接分流|代理|拦截|拒绝|屏蔽)["']?/i
  );
  let action = normalizePolicy(policyLine?.[1], "");
  if (!ALLOWED_ACTIONS.has(action)) {
    const hit = CHINESE_ACTION_MAP.find(([pattern]) => pattern.test(flat));
    action = hit?.[1] ?? "";
  }
  if (!ALLOWED_ACTIONS.has(action)) return null;
  const percent = flat.match(/(\d{1,3}(?:\.\d+)?)\s*%/);
  const labeled = flat.match(/(?:confidence|置信度|把握)\s*[:：]?\s*(0(?:\.\d+)?|1(?:\.0+)?)/i);
  let confidence = 0.5;
  if (percent) confidence = Math.min(1, Number(percent[1]) / 100);
  else if (labeled) confidence = Math.min(1, Number(labeled[1]));
  confidence = Math.round(confidence * 100) / 100;
  const commentLine = flat.match(/注释\s*[:：]\s*([^\n]+)/);
  let comment = commentLine ? commentLine[1] : "";
  if (!comment && policyLine) {
    const tail = flat.slice(flat.indexOf(policyLine[0]) + policyLine[0].length);
    comment = tail.split("\n")[0].replace(/^[\s,，;；:：*\-—]+/, "").split(/[\n。；]/)[0];
  }
  comment = comment.replace(/^["'「『]+|["'」』]+$/g, "").replace(/\s+/g, " ").trim();
  if (comment.length > MAX_COMMENT_LENGTH) comment = comment.slice(0, MAX_COMMENT_LENGTH);
  return { action, confidence, comment };
}
__name(parseVerdictText, "parseVerdictText");

// api/_ai/verdict/prompts.js
function buildBatchUserPrompt(domains) {
  const lines = domains.map((domain2, index) => `${index + 1}. ${domain2}`);
  return [
    `\u4E0B\u9762\u662F ${domains.length} \u4E2A\u9700\u8981\u5224\u5B9A\u7684\u5339\u914D\u503C\uFF0C\u8BF7\u9010\u6761\u5224\u5B9A\uFF1A`,
    ...lines,
    "",
    `\u8BF7\u8F93\u51FA\u4E00\u4E2A JSON \u6570\u7EC4\uFF0C\u5171 ${domains.length} \u9879\uFF0C\u987A\u5E8F\u4E0E\u4E0A\u9762\u5B8C\u5168\u4E00\u81F4\uFF0C\u6BCF\u9879\u683C\u5F0F\uFF1A${VERDICT_OUTPUT_FORMAT}`,
    "\u53EA\u8F93\u51FA JSON \u6570\u7EC4\uFF0C\u4E0D\u8981\u8F93\u51FA Markdown\u3001\u89E3\u91CA\u6216\u4EE3\u7801\u5757\u6807\u8BB0\u3002"
  ].join("\n");
}
__name(buildBatchUserPrompt, "buildBatchUserPrompt");
function buildVerdictMessagesBatch(config2, domains, systemPrompt = VERDICT_SYSTEM_PROMPT) {
  const list2 = (Array.isArray(domains) ? domains : []).filter(Boolean);
  const messages = [];
  const prompt = String(config2?.prompt ?? "").trim();
  if (prompt) messages.push({ role: "system", content: prompt });
  messages.push({
    role: "system",
    content: [systemPrompt, VERDICT_BATCH_CLAUSE].join("\n")
  });
  messages.push({ role: "user", content: buildBatchUserPrompt(list2) });
  return messages;
}
__name(buildVerdictMessagesBatch, "buildVerdictMessagesBatch");
async function loadVerdictSystemPrompt(db, config2 = null) {
  let groups = [];
  try {
    const list2 = await listExportPolicies(db);
    const meta = config2?.policyMeta ?? {};
    groups = (Array.isArray(list2) ? list2 : []).map((item) => {
      const key = String(item.policyKey ?? "").trim();
      if (!key) return null;
      return {
        key,
        hidden: Boolean(meta[key?.toUpperCase()]?.hidden),
        prompt: String(meta[key?.toUpperCase()]?.prompt ?? "")
      };
    }).filter(Boolean);
  } catch (error3) {
    console.warn("[ai][verdict] \u7B56\u7565\u7EC4\u6E05\u5355\u8BFB\u53D6\u5931\u8D25\uFF0C\u56DE\u843D\u5185\u7F6E action \u7EA6\u675F", error3?.message);
  }
  return groups.length ? buildVerdictSystemPrompt(groups) : VERDICT_SYSTEM_PROMPT;
}
__name(loadVerdictSystemPrompt, "loadVerdictSystemPrompt");
function buildUserPrompt(domain2) {
  return `\u5339\u914D\u503C\uFF1A${domain2}
\u8BF7\u5224\u5B9A\u5B83\u5E94\u4F7F\u7528\u7684\u5206\u6D41\u7B56\u7565\u5E76\u7ED9\u51FA\u7F6E\u4FE1\u5EA6\u4E0E\u6CE8\u91CA\u3002`;
}
__name(buildUserPrompt, "buildUserPrompt");
function buildVerdictMessages(config2, domain2, systemPrompt = VERDICT_SYSTEM_PROMPT) {
  const messages = [];
  const prompt = String(config2?.prompt ?? "").trim();
  if (prompt) messages.push({ role: "system", content: prompt });
  messages.push({ role: "system", content: systemPrompt });
  messages.push({ role: "user", content: buildUserPrompt(domain2) });
  return messages;
}
__name(buildVerdictMessages, "buildVerdictMessages");

// _utils/logs/verdicts/core.js
function cooldownFor(votes, fixedDays = 0) {
  const fixed = Math.floor(Number(fixedDays) || 0);
  if (fixed >= 1) return Math.min(365, fixed);
  const total = votes.direct + votes.proxy + votes.reject;
  if (total <= 0) return 7;
  const top = Math.max(votes.direct, votes.proxy, votes.reject);
  const ratio = top / total;
  if (ratio < 0.5) return 7;
  if (total >= 5 && ratio >= 0.9) return 90;
  if (total >= 3 && ratio >= 0.8) return 60;
  return 30;
}
__name(cooldownFor, "cooldownFor");
function bestActionFor(votes, lastAction) {
  const max = Math.max(votes.direct, votes.proxy, votes.reject);
  if (max <= 0) return normalizeRulePolicy(lastAction || "PROXY");
  if (votes.direct === max) return "DIRECT";
  if (votes.proxy === max) return "PROXY";
  if (votes.reject === max) return "REJECT";
  return normalizeRulePolicy(lastAction || "PROXY");
}
__name(bestActionFor, "bestActionFor");
var SUMMARY_COLUMNS = "domain, best_action, direct_votes, proxy_votes, reject_votes, avg_confidence, last_checked_at, cooldown_days, latest_comment, pinned_comment, pinned_kind";
async function getDomainSummary(db, domain2) {
  const key = String(domain2 || "").trim();
  if (!key) return null;
  const rows = await db.execute(
    `SELECT ${SUMMARY_COLUMNS} FROM ${DOMAIN_SUMMARY_TABLE} WHERE domain = ?`,
    [key]
  );
  return rows[0] ?? null;
}
__name(getDomainSummary, "getDomainSummary");
async function insertVerdictRecord(db, domain2, { action, confidence = 0, modelName = "", comment = "", kind = "ai", createdAt = "" } = {}) {
  await db.batch([
    {
      sql: `INSERT INTO ${DOMAIN_QUERIES_TABLE} (domain, action, confidence, model_name, comment, kind, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
      params: [
        domain2,
        action,
        confidence,
        String(modelName || ""),
        String(comment || ""),
        kind,
        createdAt || nowIso()
      ]
    }
  ]);
}
__name(insertVerdictRecord, "insertVerdictRecord");
async function aggregateDomainVotes(db, domain2) {
  const [agg] = await db.execute(
    `SELECT COALESCE(SUM(CASE WHEN action = 'DIRECT' THEN 1 ELSE 0 END), 0) AS d,
            COALESCE(SUM(CASE WHEN action = 'PROXY' THEN 1 ELSE 0 END), 0) AS p,
            COALESCE(SUM(CASE WHEN action = 'REJECT' THEN 1 ELSE 0 END), 0) AS r,
            COALESCE(AVG(confidence), 0) AS avg_conf
       FROM ${DOMAIN_QUERIES_TABLE} WHERE domain = ? AND kind = 'ai'`,
    [domain2]
  );
  return {
    direct: Number(agg?.d) || 0,
    proxy: Number(agg?.p) || 0,
    reject: Number(agg?.r) || 0,
    avgConfidence: Number(agg?.avg_conf) || 0
  };
}
__name(aggregateDomainVotes, "aggregateDomainVotes");
async function latestVerdictRecord(db, domain2) {
  const rows = await db.execute(
    `SELECT action, comment FROM ${DOMAIN_QUERIES_TABLE} WHERE domain = ? ORDER BY created_at DESC, id DESC LIMIT 1`,
    [domain2]
  );
  return rows[0] ?? null;
}
__name(latestVerdictRecord, "latestVerdictRecord");
function buildSummaryRow({
  domain: domain2,
  votes,
  avgConfidence = 0,
  latest = null,
  previous = null,
  bestAction,
  cooldownDays,
  comment = "",
  kind = "ai",
  checkedAt = ""
}) {
  const previousPinned = String(previous?.pinned_comment ?? "");
  const previousPinnedKind = String(previous?.pinned_kind ?? "");
  const pinnedComment = kind === "ai" ? previousPinned : String(comment ?? "").trim();
  const pinnedKind = kind === "ai" ? previousPinnedKind : pinnedComment ? kind : "";
  return {
    domain: domain2,
    best_action: bestAction,
    direct_votes: votes.direct,
    proxy_votes: votes.proxy,
    reject_votes: votes.reject,
    avg_confidence: Math.round(avgConfidence * 100) / 100,
    last_checked_at: checkedAt,
    cooldown_days: cooldownDays,
    latest_comment: String(latest?.comment ?? ""),
    pinned_comment: pinnedComment,
    pinned_kind: pinnedKind,
    /** 相对旧汇总的变化（执行器统计口径：策略改判数 / 新补注释数） */
    policyChanged: String(previous?.best_action ?? "") !== bestAction,
    commentFilled: !String(previous?.latest_comment ?? "").trim() && Boolean(String(latest?.comment ?? "").trim())
  };
}
__name(buildSummaryRow, "buildSummaryRow");
async function upsertDomainSummary(db, summary) {
  await db.batch([
    {
      sql: `INSERT INTO ${DOMAIN_SUMMARY_TABLE}
              (${SUMMARY_COLUMNS})
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(domain) DO UPDATE SET
              best_action = excluded.best_action,
              direct_votes = excluded.direct_votes,
              proxy_votes = excluded.proxy_votes,
              reject_votes = excluded.reject_votes,
              avg_confidence = excluded.avg_confidence,
              last_checked_at = excluded.last_checked_at,
              cooldown_days = excluded.cooldown_days,
              latest_comment = excluded.latest_comment,
              pinned_comment = excluded.pinned_comment,
              pinned_kind = excluded.pinned_kind`,
      params: [
        summary.domain,
        summary.best_action,
        summary.direct_votes,
        summary.proxy_votes,
        summary.reject_votes,
        summary.avg_confidence,
        summary.last_checked_at,
        summary.cooldown_days,
        summary.latest_comment,
        summary.pinned_comment,
        summary.pinned_kind
      ]
    }
  ]);
}
__name(upsertDomainSummary, "upsertDomainSummary");
var HISTORY_COLUMNS = "id, domain, action, confidence, model_name, comment, kind, created_at";
async function getDomainHistoryRecords(db, domain2, limit = 20) {
  const key = String(domain2 || "").trim();
  if (!key) return [];
  try {
    return await db.execute(
      `SELECT ${HISTORY_COLUMNS} FROM ${DOMAIN_QUERIES_TABLE} WHERE domain = ? ORDER BY created_at DESC, id DESC LIMIT ?`,
      [key, Math.min(100, Math.max(1, limit))]
    );
  } catch (error3) {
    throw asDbError(error3);
  }
}
__name(getDomainHistoryRecords, "getDomainHistoryRecords");
async function getEffectivePolicy(db, hostname) {
  const target = String(hostname || "").trim();
  if (!target) return "PROXY";
  try {
    const rows = await db.execute(
      `SELECT COALESCE(NULLIF(ro.policy, ''), NULLIF(d.best_action, ''), 'PROXY') AS policy
         FROM ${LOGS_TABLE} s
         LEFT JOIN ${RULE_OVERRIDES_TABLE} ro ON ro.hostname = s.hostname
         LEFT JOIN ${DOMAIN_SUMMARY_TABLE} d
           ON d.domain = s.match_key
        WHERE s.hostname = ?`,
      [target]
    );
    return normalizeRulePolicy(rows[0]?.policy);
  } catch (error3) {
    throw asDbError(error3);
  }
}
__name(getEffectivePolicy, "getEffectivePolicy");

// _utils/logs/verdicts/chunking.js
var MAX_BIND_PARAMS = 100;
function chunkLimit(db) {
  return Math.max(1, Math.min(db.maxBatchSize || MAX_BIND_PARAMS, MAX_BIND_PARAMS));
}
__name(chunkLimit, "chunkLimit");
async function batchChunked(db, statements) {
  const size = chunkLimit(db);
  for (let start = 0; start < statements.length; start += size) {
    await db.batch(statements.slice(start, start + size));
  }
}
__name(batchChunked, "batchChunked");
async function selectDomainsChunked(db, buildSql, keys) {
  const size = chunkLimit(db);
  const rows = [];
  for (let start = 0; start < keys.length; start += size) {
    const slice = keys.slice(start, start + size);
    const placeholders = slice.map(() => "?").join(", ");
    rows.push(...await db.execute(buildSql(placeholders), slice));
  }
  return rows;
}
__name(selectDomainsChunked, "selectDomainsChunked");

// _utils/logs/verdicts/batch.js
async function aggregateVotesByDomain(db, keys, aiOnly) {
  const rows = await selectDomainsChunked(
    db,
    (placeholders) => `
    SELECT q.domain,
            COALESCE(SUM(CASE WHEN q.action = 'DIRECT' THEN 1 ELSE 0 END), 0) AS d,
            COALESCE(SUM(CASE WHEN q.action = 'PROXY' THEN 1 ELSE 0 END), 0) AS p,
            COALESCE(SUM(CASE WHEN q.action = 'REJECT' THEN 1 ELSE 0 END), 0) AS r,
            COALESCE(AVG(CASE WHEN q.kind = 'ai' THEN q.confidence END), 0) AS avg_conf,
            (SELECT q2.comment FROM ${DOMAIN_QUERIES_TABLE} q2
              WHERE q2.domain = q.domain ORDER BY q2.created_at DESC, q2.id DESC LIMIT 1) AS latest_comment,
            (SELECT q2.action FROM ${DOMAIN_QUERIES_TABLE} q2
              WHERE q2.domain = q.domain ORDER BY q2.created_at DESC, q2.id DESC LIMIT 1) AS latest_action
       FROM ${DOMAIN_QUERIES_TABLE} q
      WHERE q.domain IN (${placeholders})${aiOnly ? " AND q.kind = 'ai'" : ""}
      GROUP BY q.domain`,
    keys
  );
  return new Map(rows.map((row) => [String(row.domain), row]));
}
__name(aggregateVotesByDomain, "aggregateVotesByDomain");
function summaryFromAggregate(entry, row, config2, kind, checkedAt) {
  const votes = {
    direct: Number(row?.d) || 0,
    proxy: Number(row?.p) || 0,
    reject: Number(row?.r) || 0
  };
  const latest = row ? { action: row.latest_action, comment: row.latest_comment } : null;
  return buildSummaryRow({
    domain: entry.domain,
    votes,
    avgConfidence: Number(row?.avg_conf) || 0,
    latest,
    previous: null,
    bestAction: bestActionFor(votes, latest?.action ?? entry.action),
    cooldownDays: cooldownFor(votes, config2?.cooldownDays),
    comment: entry.comment,
    kind,
    checkedAt
  });
}
__name(summaryFromAggregate, "summaryFromAggregate");
function summaryParams(summary) {
  return [
    summary.domain,
    summary.best_action,
    summary.direct_votes,
    summary.proxy_votes,
    summary.reject_votes,
    summary.avg_confidence,
    summary.last_checked_at,
    summary.cooldown_days,
    summary.latest_comment,
    summary.pinned_comment,
    summary.pinned_kind
  ];
}
__name(summaryParams, "summaryParams");
async function recordVerdictsBatch(db, entries, { config: config2 = null } = {}) {
  const valid = (Array.isArray(entries) ? entries : []).filter((entry) => entry?.domain && entry?.verdict?.action).map((entry) => ({
    domain: String(entry.domain).trim(),
    action: normalizeRulePolicy(entry.verdict.action),
    confidence: Number(entry.verdict.confidence) || 0,
    modelName: String(entry.modelName || ""),
    comment: String(entry.verdict.comment || "")
  })).filter((entry) => entry.domain);
  if (!valid.length) return /* @__PURE__ */ new Map();
  const createdAt = nowIso();
  const chunkSize = Math.max(1, Math.min(db.maxBatchSize || 100, 100));
  for (let start = 0; start < valid.length; start += chunkSize) {
    await db.batch(
      valid.slice(start, start + chunkSize).map((entry) => ({
        sql: `INSERT INTO ${DOMAIN_QUERIES_TABLE} (domain, action, confidence, model_name, comment, kind, created_at)
            VALUES (?, ?, ?, ?, ?, 'ai', ?)`,
        params: [
          entry.domain,
          entry.action,
          entry.confidence,
          entry.modelName,
          entry.comment,
          createdAt
        ]
      }))
    );
  }
  const byDomain = await aggregateVotesByDomain(
    db,
    valid.map((entry) => entry.domain),
    false
  );
  const summaries = /* @__PURE__ */ new Map();
  const upserts = valid.map((entry) => {
    const summary = summaryFromAggregate(
      entry,
      byDomain.get(entry.domain),
      config2,
      "ai",
      nowIso()
    );
    summaries.set(entry.domain, summary);
    return {
      sql: `INSERT INTO ${DOMAIN_SUMMARY_TABLE} (${SUMMARY_COLUMNS})
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(domain) DO UPDATE SET
              best_action = excluded.best_action,
              direct_votes = excluded.direct_votes,
              proxy_votes = excluded.proxy_votes,
              reject_votes = excluded.reject_votes,
              avg_confidence = excluded.avg_confidence,
              last_checked_at = excluded.last_checked_at,
              cooldown_days = excluded.cooldown_days,
              latest_comment = excluded.latest_comment`,
      params: summaryParams(summary)
    };
  });
  for (let start = 0; start < upserts.length; start += chunkSize) {
    await db.batch(upserts.slice(start, start + chunkSize));
  }
  return summaries;
}
__name(recordVerdictsBatch, "recordVerdictsBatch");
async function recordPinnedCommentsBatch(db, entries, { config: config2 = null } = {}) {
  const valid = (Array.isArray(entries) ? entries : []).map((entry) => ({
    domain: String(entry?.domain ?? "").trim(),
    action: normalizeRulePolicy(entry?.action),
    comment: String(entry?.comment ?? "").trim()
  })).filter((entry) => entry.domain && entry.comment);
  if (!valid.length) return { recorded: 0 };
  const keys = valid.map((entry) => entry.domain);
  const existingRows = await selectDomainsChunked(
    db,
    (placeholders) => `SELECT domain, pinned_comment FROM ${DOMAIN_SUMMARY_TABLE} WHERE domain IN (${placeholders})`,
    keys
  );
  const pinnedByDomain = new Map(
    existingRows.map((row) => [String(row.domain), String(row.pinned_comment ?? "").trim()])
  );
  const fresh = valid.filter((entry) => pinnedByDomain.get(entry.domain) !== entry.comment);
  if (!fresh.length) return { recorded: 0 };
  const createdAt = nowIso();
  await batchChunked(
    db,
    fresh.map((entry) => ({
      sql: `INSERT INTO ${DOMAIN_QUERIES_TABLE} (domain, action, confidence, model_name, comment, kind, created_at)
          VALUES (?, ?, 0, 'manual', ?, 'manual', ?)`,
      params: [entry.domain, entry.action, entry.comment, createdAt]
    }))
  );
  const byDomain = await aggregateVotesByDomain(db, keys, true);
  await batchChunked(
    db,
    fresh.map((entry) => {
      const summary = summaryFromAggregate(
        entry,
        byDomain.get(entry.domain),
        config2,
        "manual",
        ""
      );
      return {
        sql: `INSERT INTO ${DOMAIN_SUMMARY_TABLE} (${SUMMARY_COLUMNS})
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(domain) DO UPDATE SET
              best_action = excluded.best_action,
              direct_votes = excluded.direct_votes,
              proxy_votes = excluded.proxy_votes,
              reject_votes = excluded.reject_votes,
              avg_confidence = excluded.avg_confidence,
              // \u5199\u6CE8\u91CA\u4E0D\u6539\u51B7\u5374\u72B6\u6001\uFF1A\u4FDD\u7559\u5DF2\u6709 last_checked_at\uFF08\u5355\u6761\u8DEF\u5F84\u540C\u6837\u4FDD\u7559\uFF0C
              // \u5426\u5219\u57DF\u540D\u4F1A\u300C\u5047\u88C5\u521A\u5224\u5B9A\u8FC7\u300D\u800C\u8DF3\u8FC7 AI \u8C03\u5EA6\uFF09
              last_checked_at = COALESCE(NULLIF(${DOMAIN_SUMMARY_TABLE}.last_checked_at, ''), excluded.last_checked_at),
              latest_comment = excluded.latest_comment,
              pinned_comment = excluded.pinned_comment,
              pinned_kind = excluded.pinned_kind`,
        params: summaryParams(summary)
      };
    })
  );
  return { recorded: fresh.length };
}
__name(recordPinnedCommentsBatch, "recordPinnedCommentsBatch");

// _utils/logs/verdicts/batch-preset.js
async function recordPresetEntries(db, entries, { config: config2 = null } = {}) {
  const valid = (Array.isArray(entries) ? entries : []).map((entry) => ({
    domain: String(entry?.domain ?? "").trim(),
    action: normalizeRulePolicy(entry?.action),
    comment: String(entry?.comment ?? "").trim()
  })).filter((entry) => entry.domain);
  if (!valid.length) return { recorded: 0 };
  const createdAt = nowIso();
  await batchChunked(
    db,
    valid.map((entry) => ({
      sql: `INSERT INTO ${DOMAIN_QUERIES_TABLE} (domain, action, confidence, model_name, comment, kind, created_at)
          VALUES (?, ?, 0, 'preset', ?, 'preset', ?)`,
      params: [entry.domain, entry.action, entry.comment, createdAt]
    }))
  );
  const keys = valid.map((entry) => entry.domain);
  const rows = await selectDomainsChunked(
    db,
    (placeholders) => `
    SELECT domain,
            COALESCE(SUM(CASE WHEN action = 'DIRECT' THEN 1 ELSE 0 END), 0) AS d,
            COALESCE(SUM(CASE WHEN action = 'PROXY' THEN 1 ELSE 0 END), 0) AS p,
            COALESCE(SUM(CASE WHEN action = 'REJECT' THEN 1 ELSE 0 END), 0) AS r,
            COALESCE(AVG(CASE WHEN kind = 'ai' THEN confidence END), 0) AS avg_conf,
            (SELECT q2.comment FROM ${DOMAIN_QUERIES_TABLE} q2
              WHERE q2.domain = q.domain ORDER BY q2.created_at DESC, q2.id DESC LIMIT 1) AS latest_comment,
            (SELECT q2.action FROM ${DOMAIN_QUERIES_TABLE} q2
              WHERE q2.domain = q.domain ORDER BY q2.created_at DESC, q2.id DESC LIMIT 1) AS latest_action
       FROM ${DOMAIN_QUERIES_TABLE} q
      WHERE domain IN (${placeholders}) AND kind = 'ai'
      GROUP BY domain`,
    keys
  );
  const byDomain = new Map(rows.map((row) => [String(row.domain), row]));
  await batchChunked(
    db,
    valid.map((entry) => {
      const row = byDomain.get(entry.domain);
      const votes = {
        direct: Number(row?.d) || 0,
        proxy: Number(row?.p) || 0,
        reject: Number(row?.r) || 0
      };
      const latest = row ? { action: row.latest_action, comment: row.latest_comment } : null;
      const summary = buildSummaryRow({
        domain: entry.domain,
        votes,
        avgConfidence: Number(row?.avg_conf) || 0,
        latest,
        previous: null,
        bestAction: bestActionFor(votes, latest?.action ?? entry.action),
        cooldownDays: cooldownFor(votes, config2?.cooldownDays),
        comment: entry.comment,
        kind: "preset",
        checkedAt: ""
      });
      return {
        sql: `INSERT INTO ${DOMAIN_SUMMARY_TABLE}
              (${SUMMARY_COLUMNS})
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(domain) DO UPDATE SET
              best_action = excluded.best_action,
              direct_votes = excluded.direct_votes,
              proxy_votes = excluded.proxy_votes,
              reject_votes = excluded.reject_votes,
              avg_confidence = excluded.avg_confidence,
              latest_comment = excluded.latest_comment,
              pinned_comment = excluded.pinned_comment,
              pinned_kind = excluded.pinned_kind`,
        params: [
          summary.domain,
          summary.best_action,
          summary.direct_votes,
          summary.proxy_votes,
          summary.reject_votes,
          summary.avg_confidence,
          summary.last_checked_at,
          summary.cooldown_days,
          summary.latest_comment,
          summary.pinned_comment,
          summary.pinned_kind
        ]
      };
    })
  );
  return { recorded: valid.length };
}
__name(recordPresetEntries, "recordPresetEntries");

// _utils/logs/verdicts/pinned.js
async function recordPinnedComment(db, domain2, { action, comment, kind = "manual", confidence = 0, config: config2 = null } = {}) {
  const key = String(domain2 || "").trim();
  const text = String(comment ?? "").trim();
  if (!key || !text) return { summary: await getDomainSummary(db, key), skipped: true };
  const previous = await getDomainSummary(db, key);
  const samePinned = String(previous?.pinned_comment ?? "").trim() === text;
  if (samePinned) return { summary: previous, skipped: true };
  const validAction = normalizeRulePolicy(action);
  await insertVerdictRecord(db, key, {
    action: validAction,
    confidence,
    modelName: kind,
    comment: text,
    kind
  });
  const votes = await aggregateDomainVotes(db, key);
  const latest = await latestVerdictRecord(db, key);
  const summary = buildSummaryRow({
    domain: key,
    votes,
    avgConfidence: votes.avgConfidence,
    latest,
    previous,
    bestAction: bestActionFor(votes, latest?.action),
    cooldownDays: cooldownFor(votes, config2?.cooldownDays),
    comment: text,
    kind,
    // 保持既有冷却状态：写注释 / 预设记录不应让域名「假装刚判定过」而跳过 AI 调度
    checkedAt: String(previous?.last_checked_at ?? "")
  });
  await upsertDomainSummary(db, summary);
  return { summary, skipped: false };
}
__name(recordPinnedComment, "recordPinnedComment");
async function clearPinnedComment(db, domain2, { presetOnly = false } = {}) {
  const key = String(domain2 || "").trim();
  if (!key) return 0;
  const results = await db.batch([
    {
      sql: `UPDATE ${DOMAIN_SUMMARY_TABLE}
              SET pinned_comment = '', pinned_kind = ''
            WHERE domain = ?${presetOnly ? " AND pinned_kind = 'preset'" : ""}`,
      params: [key]
    }
  ]);
  return Number(results[0]?.changes) || 0;
}
__name(clearPinnedComment, "clearPinnedComment");
async function clearPresetPins(db) {
  const results = await db.batch([
    {
      sql: `UPDATE ${DOMAIN_SUMMARY_TABLE} SET pinned_comment = '', pinned_kind = '' WHERE pinned_kind = 'preset'`,
      params: []
    }
  ]);
  return Number(results[0]?.changes) || 0;
}
__name(clearPresetPins, "clearPresetPins");
async function clearPresetPinsForDomains(db, domains) {
  const keys = [
    ...new Set(
      (Array.isArray(domains) ? domains : []).map((domain2) => String(domain2 || "").trim()).filter(Boolean)
    )
  ];
  if (!keys.length) return 0;
  const results = await db.batch(
    keys.map((key) => ({
      sql: `UPDATE ${DOMAIN_SUMMARY_TABLE} SET pinned_comment = '', pinned_kind = '' WHERE domain = ? AND pinned_kind = 'preset'`,
      params: [key]
    }))
  );
  return results.reduce((total, result) => total + (Number(result?.changes) || 0), 0);
}
__name(clearPresetPinsForDomains, "clearPresetPinsForDomains");

// _utils/logs/verdicts/rename.js
async function renameVerdictKey(db, oldKey, newKey) {
  const from = String(oldKey || "").trim();
  const to = String(newKey || "").trim();
  if (!from || !to || from === to) return false;
  await db.batch([
    {
      sql: `UPDATE ${DOMAIN_QUERIES_TABLE} SET domain = ? WHERE domain = ?`,
      params: [to, from]
    },
    {
      sql: `INSERT INTO ${DOMAIN_SUMMARY_TABLE} (${SUMMARY_COLUMNS})
            SELECT ?, best_action, direct_votes, proxy_votes, reject_votes, avg_confidence,
                   last_checked_at, cooldown_days, latest_comment, pinned_comment, pinned_kind
              FROM ${DOMAIN_SUMMARY_TABLE} WHERE domain = ?
            ON CONFLICT(domain) DO NOTHING`,
      params: [to, from]
    },
    { sql: `DELETE FROM ${DOMAIN_SUMMARY_TABLE} WHERE domain = ?`, params: [from] }
  ]);
  const previous = await getDomainSummary(db, to);
  if (!previous) return false;
  const votes = await aggregateDomainVotes(db, to);
  const latest = await latestVerdictRecord(db, to);
  await upsertDomainSummary(
    db,
    buildSummaryRow({
      domain: to,
      votes,
      avgConfidence: votes.avgConfidence,
      latest,
      previous,
      bestAction: bestActionFor(votes, latest?.action ?? previous.best_action),
      // 冷却按合并后的共识度动态重算（rename 不改变「是否在冷却期」的判定口径太多）
      cooldownDays: cooldownFor(votes, 0),
      comment: "",
      kind: "ai",
      checkedAt: previous.last_checked_at
    })
  );
  return true;
}
__name(renameVerdictKey, "renameVerdictKey");

// api/_ai/verdict/store.js
async function getSummary(db, domain2) {
  return getDomainSummary(db, domain2);
}
__name(getSummary, "getSummary");
function isSummaryFresh(summary, nowMs = Date.now()) {
  if (!summary) return false;
  const checkedAt = Date.parse(String(summary.last_checked_at ?? ""));
  if (!Number.isFinite(checkedAt)) return false;
  const cooldown = Math.max(1, Number(summary.cooldown_days) || 7);
  return checkedAt + cooldown * 86400 * 1e3 > nowMs;
}
__name(isSummaryFresh, "isSummaryFresh");
async function recordVerdict(db, domain2, verdict, modelName, config2 = null, kind = "ai") {
  const previous = await getSummary(db, domain2);
  await insertVerdictRecord(db, domain2, {
    action: verdict.action,
    confidence: verdict.confidence,
    modelName,
    comment: verdict.comment,
    kind,
    createdAt: nowIso()
  });
  const votes = await aggregateDomainVotes(db, domain2);
  const latest = await latestVerdictRecord(db, domain2);
  const summary = buildSummaryRow({
    domain: domain2,
    votes,
    avgConfidence: votes.avgConfidence,
    latest,
    previous,
    bestAction: bestActionFor(votes, latest?.action),
    cooldownDays: cooldownFor(votes, config2?.cooldownDays),
    comment: verdict.comment,
    kind,
    checkedAt: nowIso()
  });
  await upsertDomainSummary(db, summary);
  return summary;
}
__name(recordVerdict, "recordVerdict");
async function syncLogsToVerdict(db, domain2, summary) {
  const keyCondition = `match_key = ?`;
  const results = await db.batch([
    {
      sql: `UPDATE ${LOGS_TABLE} SET ai_processed = 1 WHERE ${keyCondition}`,
      params: [domain2]
    }
  ]);
  return {
    policyUpdated: summary.policyChanged ? Number(results[0]?.changes) || 0 : 0,
    commentFilled: summary.commentFilled ? Number(results[0]?.changes) || 0 : 0
  };
}
__name(syncLogsToVerdict, "syncLogsToVerdict");
async function syncLogsToVerdictBatch(db, domains) {
  const keys = [
    ...new Set(
      (Array.isArray(domains) ? domains : []).map((domain2) => String(domain2 ?? "").trim()).filter(Boolean)
    )
  ];
  if (!keys.length) return { policyUpdated: 0, commentFilled: 0 };
  const results = await db.batch([
    {
      sql: `UPDATE ${LOGS_TABLE} SET ai_processed = 1
             WHERE match_key IN (${keys.map(() => "?").join(", ")})`,
      params: keys
    }
  ]);
  return { policyUpdated: Number(results[0]?.changes) || 0, commentFilled: 0 };
}
__name(syncLogsToVerdictBatch, "syncLogsToVerdictBatch");

// api/_ai/verdict/judge-batch.js
async function fillFromCache(db, list2, force, results, summary, onResult) {
  const pending = [];
  for (const domain2 of list2) {
    if (!force) {
      const cached = await getSummary(db, domain2);
      if (isSummaryFresh(cached)) {
        results.push({ domain: domain2, source: "cache", summary: cached });
        summary.cacheHits += 1;
        onResult?.(results[results.length - 1]);
        continue;
      }
    }
    pending.push(domain2);
  }
  return pending;
}
__name(fillFromCache, "fillFromCache");
function markPending(pending, results, summary, onResult, source, error3, counter) {
  for (const domain2 of pending) {
    results.push({ domain: domain2, source, summary: null, error: error3 });
    onResult?.(results[results.length - 1]);
  }
  summary[counter] += pending.length;
}
__name(markPending, "markPending");
async function askModelOnce(db, config2, runtime, pending) {
  const systemPrompt = await loadVerdictSystemPrompt(db, config2);
  return callModelWithRuntime(
    config2,
    runtime,
    ({ model, credential }) => runModel(config2, model, buildVerdictMessagesBatch(config2, pending, systemPrompt), {
      credential,
      maxTokens: Math.max(400, pending.length * 60),
      temperature: 0
    })
  );
}
__name(askModelOnce, "askModelOnce");
async function persistAndCollect(db, entries, model, config2, summary, results, onResult) {
  const summaries = await recordVerdictsBatch(db, entries, { config: config2 });
  const sync = await syncLogsToVerdictBatch(db, [...summaries.keys()]);
  summary.policyUpdated += sync.policyUpdated;
  summary.commentFilled += sync.commentFilled;
  for (const domain2 of [...summaries.keys()]) {
    results.push({ domain: domain2, source: "ai", summary: summaries.get(domain2) });
    onResult?.(results[results.length - 1]);
  }
}
__name(persistAndCollect, "persistAndCollect");
function collectEntries(pending, matched, model, results, summary, onResult) {
  const entries = [];
  for (const domain2 of pending) {
    const verdict = matched.get(domain2);
    if (!verdict) {
      results.push({
        domain: domain2,
        source: "failed",
        summary: null,
        error: "\u6A21\u578B\u672A\u7ED9\u51FA\u8BE5\u5339\u914D\u503C\u7684\u7ED3\u8BBA"
      });
      summary.failed += 1;
      onResult?.(results[results.length - 1]);
      continue;
    }
    summary.aiCalls += 1;
    entries.push({ domain: domain2, verdict, modelName: model });
  }
  return entries;
}
__name(collectEntries, "collectEntries");
async function judgeDomainsBatch(db, config2, domains, { force = false, runtime = null, onResult } = {}) {
  const summary = {
    at: nowIso(),
    attempted: 0,
    cacheHits: 0,
    aiCalls: 0,
    policyUpdated: 0,
    commentFilled: 0,
    failed: 0,
    errors: 0,
    quotaExceeded: false,
    aborted: false,
    /** 合并提问模式：1 = 一次提问覆盖 N 个域名 */
    combined: true
  };
  const results = [];
  const list2 = [
    ...new Set((Array.isArray(domains) ? domains : []).map(normalizeDomain).filter(Boolean))
  ];
  summary.attempted = list2.length;
  const pending = await fillFromCache(db, list2, force, results, summary, onResult);
  if (!pending.length) return { results, summary };
  let outcome;
  try {
    outcome = await askModelOnce(db, config2, runtime, pending);
  } catch (error3) {
    if (isQuotaError(error3) && (!runtime || dailyQuotaExhausted(runtime)))
      summary.quotaExceeded = true;
    markPending(
      pending,
      results,
      summary,
      onResult,
      "error",
      error3?.message ?? "\u63D0\u95EE\u5931\u8D25",
      "errors"
    );
    summary.aborted = true;
    return { results, summary };
  }
  if (!outcome.ok) {
    markPending(
      pending,
      results,
      summary,
      onResult,
      "unavailable",
      unavailabilityMessage(outcome.unavailable),
      "errors"
    );
    summary.aborted = true;
    return { results, summary };
  }
  const { model, credential, text } = outcome;
  const { matched } = parseVerdictBatchOutput(text, pending);
  if (!matched.size) {
    markPending(pending, results, summary, onResult, "failed", "\u6A21\u578B\u8F93\u51FA\u65E0\u6CD5\u89E3\u6790", "failed");
    return { results, summary };
  }
  if (runtime) {
    recordCredentialSuccess(runtime, credential);
    recordModelSuccess(runtime, model, matched.size);
  }
  const entries = collectEntries(pending, matched, model, results, summary, onResult);
  await persistAndCollect(db, entries, model, config2, summary, results, onResult);
  return { results, summary };
}
__name(judgeDomainsBatch, "judgeDomainsBatch");

// api/_ai/verdict/engine.js
function sleep2(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
__name(sleep2, "sleep");
async function queryDomainVerdict(db, config2, domain2, { force = false, runtime = null } = {}) {
  const key = normalizeDomain(domain2);
  if (!key) return { domain: key, source: "failed", summary: null, error: "\u57DF\u540D\u4E3A\u7A7A" };
  const cached = force ? null : await getSummary(db, key);
  if (isSummaryFresh(cached)) {
    return { domain: key, source: "cache", summary: cached };
  }
  const systemPrompt = await loadVerdictSystemPrompt(db, config2);
  const outcome = await callModelWithRuntime(
    config2,
    runtime,
    ({ model: model2, credential: credential2 }) => runModel(config2, model2, buildVerdictMessages(config2, key, systemPrompt), { credential: credential2 })
  );
  if (!outcome.ok) {
    return {
      domain: key,
      source: "unavailable",
      summary: null,
      error: unavailabilityMessage(outcome.unavailable)
    };
  }
  const { model, credential, text } = outcome;
  const output = parseVerdictOutput(text);
  if (!output) {
    return { domain: key, source: "failed", summary: null, error: "\u6A21\u578B\u8F93\u51FA\u65E0\u6CD5\u89E3\u6790" };
  }
  if (runtime) {
    recordCredentialSuccess(runtime, credential);
    recordModelSuccess(runtime, model, 1);
  }
  const summary = await recordVerdict(db, key, output, model, config2);
  const sync = await syncLogsToVerdict(db, key, summary);
  return { domain: key, source: "ai", summary, ...sync };
}
__name(queryDomainVerdict, "queryDomainVerdict");
async function queryDomains(db, config2, domains, { force = false, onResult, runtime = null } = {}) {
  const summary = {
    at: nowIso(),
    attempted: 0,
    cacheHits: 0,
    aiCalls: 0,
    policyUpdated: 0,
    commentFilled: 0,
    failed: 0,
    errors: 0,
    quotaExceeded: false,
    aborted: false
  };
  const results = [];
  const list2 = [
    ...new Set((Array.isArray(domains) ? domains : []).map(normalizeDomain).filter(Boolean))
  ];
  for (let index = 0; index < list2.length; index += 1) {
    const domain2 = list2[index];
    if (index > 0 && config2.requestDelayMs > 0) await sleep2(config2.requestDelayMs);
    summary.attempted += 1;
    try {
      const result = await queryDomainVerdict(db, config2, domain2, { force, runtime });
      results.push(result);
      onResult?.(result);
      if (result.source === "cache") summary.cacheHits += 1;
      else if (result.source === "unavailable") {
        summary.errors += 1;
        summary.aborted = true;
        break;
      } else if (result.source === "failed") summary.failed += 1;
      else {
        summary.aiCalls += 1;
        summary.policyUpdated += result.policyUpdated ?? 0;
        summary.commentFilled += result.commentFilled ?? 0;
      }
    } catch (error3) {
      if (isQuotaError(error3) && (!runtime || dailyQuotaExhausted(runtime))) {
        summary.quotaExceeded = true;
        summary.aborted = true;
        results.push({ domain: domain2, source: "error", summary: null, error: error3?.message });
        onResult?.(results[results.length - 1]);
        break;
      }
      summary.errors += 1;
      results.push({ domain: domain2, source: "error", summary: null, error: error3?.message });
      onResult?.(results[results.length - 1]);
    }
  }
  return { results, summary };
}
__name(queryDomains, "queryDomains");
async function getDomainHistory(db, domain2, limit = 20) {
  const key = normalizeDomain(domain2);
  if (!key) return { domain: "", summary: null, history: [] };
  const history2 = await getDomainHistoryRecords(db, key, limit);
  const summary = await getSummary(db, key);
  return { domain: key, summary, history: history2 };
}
__name(getDomainHistory, "getDomainHistory");

// api/_ai/verdict/queue.js
var CANDIDATE_KEY_SQL = `s.match_key`;
function candidateWhere() {
  return `s.type != 'FINAL' AND TRIM(${CANDIDATE_KEY_SQL}) != ''
    AND (d.domain IS NULL OR COALESCE(d.last_checked_at, '') = ''
         OR (julianday(d.last_checked_at) + d.cooldown_days) <= julianday('now'))`;
}
__name(candidateWhere, "candidateWhere");
async function selectVerdictCandidates(db, limit) {
  const where = candidateWhere();
  const rows = await db.execute(
    `SELECT s.hostname, s.value, s.manual_edited, ${CANDIDATE_KEY_SQL} AS key
       FROM ${LOGS_TABLE} s
       LEFT JOIN ${DOMAIN_SUMMARY_TABLE} d ON d.domain = ${CANDIDATE_KEY_SQL}
       WHERE ${where}
       ORDER BY s.manual_edited DESC, s.count DESC, s.time DESC
       LIMIT ?`,
    [Math.max(1, limit)]
  );
  const [{ v: total }] = await db.execute(
    `SELECT COUNT(*) AS v FROM ${LOGS_TABLE} s
       LEFT JOIN ${DOMAIN_SUMMARY_TABLE} d ON d.domain = ${CANDIDATE_KEY_SQL}
       WHERE ${where}`
  );
  return { items: rows, remaining: Math.max(0, Number(total) || 0) };
}
__name(selectVerdictCandidates, "selectVerdictCandidates");
async function verdictQueueStats(db) {
  const where = candidateWhere();
  const results = await db.batch([
    {
      sql: `SELECT COUNT(*) AS v FROM ${LOGS_TABLE} s
              LEFT JOIN ${DOMAIN_SUMMARY_TABLE} d ON d.domain = ${CANDIDATE_KEY_SQL} WHERE ${where}`,
      params: []
    },
    {
      sql: `SELECT COUNT(*) AS v FROM ${LOGS_TABLE} s
              LEFT JOIN ${DOMAIN_SUMMARY_TABLE} d ON d.domain = ${CANDIDATE_KEY_SQL} WHERE ${where} AND s.manual_edited = 1`,
      params: []
    },
    { sql: `SELECT COUNT(*) AS v FROM ${DOMAIN_SUMMARY_TABLE}`, params: [] }
  ]);
  return {
    pending: Number(results[0].rows[0]?.v) || 0,
    pendingEdited: Number(results[1].rows[0]?.v) || 0,
    processed: Number(results[2].rows[0]?.v) || 0
  };
}
__name(verdictQueueStats, "verdictQueueStats");
async function selectRandomRuleTarget(db) {
  const rows = await db.execute(
    `SELECT s.hostname, s.value, ${CANDIDATE_KEY_SQL} AS key
       FROM ${LOGS_TABLE} s
      WHERE s.type != 'FINAL' AND TRIM(${CANDIDATE_KEY_SQL}) != ''
      ORDER BY RANDOM() LIMIT 1`
  );
  const row = rows[0];
  if (!row) return null;
  return {
    hostname: String(row.hostname ?? ""),
    value: String(row.value ?? ""),
    key: String(row.key ?? "")
  };
}
__name(selectRandomRuleTarget, "selectRandomRuleTarget");
async function resetVerdicts(db) {
  const results = await db.batch([{ sql: `DELETE FROM ${DOMAIN_SUMMARY_TABLE}`, params: [] }]);
  return { reset: Number(results[0]?.changes) || 0 };
}
__name(resetVerdicts, "resetVerdicts");

// api/_ai/executor.js
var RUNNING_STALE_MS = 15 * 60 * 1e3;
function skipReasonFor(state, config2, force) {
  const runningSince = Date.parse(state.running_since || "");
  if (state.running && Number.isFinite(runningSince) && Date.now() - runningSince < RUNNING_STALE_MS) {
    return { skipped: true, reason: "running" };
  }
  const intervalMs = Math.max(1, config2.intervalMinutes) * 60 * 1e3;
  const lastFinish = Date.parse(state.last_finish_at || "");
  const queueDrained = Number(state.last_summary?.remaining ?? 0) === 0;
  if (!force && queueDrained && Number.isFinite(lastFinish) && Date.now() - lastFinish < intervalMs) {
    return {
      skipped: true,
      reason: "cooldown",
      nextRunAt: new Date(lastFinish + intervalMs).toISOString()
    };
  }
  return null;
}
__name(skipReasonFor, "skipReasonFor");
function mergeBatchOutcome(summary, outcome) {
  summary.cacheHits = outcome.summary.cacheHits;
  summary.aiCalls = outcome.summary.aiCalls;
  summary.policyUpdated = outcome.summary.policyUpdated;
  summary.commentFilled = outcome.summary.commentFilled;
  summary.failed = outcome.summary.failed;
  summary.errors = outcome.summary.errors;
  summary.quotaExceeded = outcome.summary.quotaExceeded;
  summary.aborted = outcome.summary.aborted;
  if (outcome.results.some((result) => result.source === "unavailable")) {
    summary.unavailable = true;
  }
  if (summary.quotaExceeded) {
    console.warn("[ai][executor] \u4ECA\u65E5 AI \u989D\u5EA6\u5DF2\u8FBE\u4E0A\u9650\uFF08429\uFF09\uFF0C\u4E2D\u6B62\u672C\u8F6E");
  }
}
__name(mergeBatchOutcome, "mergeBatchOutcome");
async function runAiBatch(db, config2, { force = false, runtime = null } = {}) {
  const state = await loadAiState(db);
  const skip = skipReasonFor(state, config2, force);
  if (skip) return skip;
  await saveAiState(db, {
    ...state,
    running: true,
    running_since: nowIso(),
    last_run_at: nowIso()
  });
  const summary = {
    at: nowIso(),
    batchSize: config2.batchSize,
    attempted: 0,
    cacheHits: 0,
    aiCalls: 0,
    policyUpdated: 0,
    commentFilled: 0,
    /** 解析失败 / 动作非法：不写任何数据，也不缓存，下轮重试 */
    failed: 0,
    /** 传输级失败（超时 / 限流 / 断网）：未判定，留在队列等下一轮 */
    errors: 0,
    /** 免费额度用尽（429）：当日重试无意义，中止本轮等待次日恢复 */
    quotaExceeded: false,
    aborted: false,
    remaining: 0
  };
  try {
    const { items, remaining } = await selectVerdictCandidates(db, config2.batchSize);
    summary.remaining = remaining;
    summary.attempted = items.length;
    const domains = items.map((item) => item.key || item.value || item.hostname).filter(Boolean);
    if (!domains.length) return { skipped: false, summary };
    const outcome = await judgeDomainsBatch(db, config2, domains, { runtime });
    mergeBatchOutcome(summary, outcome);
    summary.remaining = Math.max(0, remaining - summary.attempted + summary.errors);
    return { skipped: false, summary };
  } finally {
    const latest = await loadAiState(db);
    await saveAiState(db, {
      ...latest,
      running: false,
      last_finish_at: nowIso(),
      last_summary: summary
    });
  }
}
__name(runAiBatch, "runAiBatch");

// api/_ai/routes-verdict.js
async function judge(context2, db) {
  const guard5 = await guardAi(context2, db, "ai.page.judge");
  if (!guard5.ok) return guard5.response;
  const body = await readJson(context2);
  if (!body.ok) return badRequest("\u8BF7\u6C42\u4F53\u4E0D\u662F\u6709\u6548\u7684 JSON");
  const raw = Array.isArray(body.value?.domains) ? body.value.domains : [body.value?.domain];
  const domains = [...new Set(raw.map(normalizeDomain).filter(Boolean))];
  if (!domains.length) return badRequest("\u7F3A\u5C11\u5F85\u5224\u5B9A\u7684\u5339\u914D\u503C");
  if (domains.length > MAX_JUDGE_DOMAINS)
    return badRequest(`\u5355\u6B21\u6700\u591A\u5408\u5E76\u5224\u5B9A ${MAX_JUDGE_DOMAINS} \u4E2A\u5339\u914D\u503C`);
  const force = body.value?.force !== false;
  const config2 = await loadAiConfig(db, context2.env);
  const runtime = await loadRuntime(db);
  try {
    const result = await judgeDomainsBatch(db, config2, domains, { force, runtime });
    return jsonResponse(
      { success: true, data: result },
      { headers: { "Cache-Control": "no-store" } }
    );
  } finally {
    await saveRuntime(db, runtime);
  }
}
__name(judge, "judge");
async function sample(context2, db) {
  const guard5 = await guardAi(context2, db, "ai.config");
  if (!guard5.ok) return guard5.response;
  const runtime = await loadRuntime(db);
  try {
    const config2 = await loadAiConfig(db, context2.env);
    const target = await selectRandomRuleTarget(db);
    if (!target) {
      return jsonResponse(
        {
          success: true,
          data: { ok: false, error: "\u89C4\u5219\u8868\u91CC\u6CA1\u6709\u53EF\u5224\u5B9A\u7684\u5339\u914D\u503C\uFF0C\u5148\u6DFB\u52A0\u89C4\u5219\u518D\u6D4B\u8BD5" }
        },
        { headers: { "Cache-Control": "no-store" } }
      );
    }
    const startedAt = Date.now();
    let usedModel = null;
    try {
      const outcome = await callModelWithRuntime(config2, runtime, ({ model, credential }) => {
        usedModel = model;
        return runModel(config2, model, buildVerdictMessages(config2, target.key), {
          credential,
          maxTokens: 200
        });
      });
      if (!outcome.ok) {
        return jsonResponse(
          {
            success: true,
            data: {
              ok: false,
              error: unavailabilityMessage(outcome.unavailable),
              domain: target.key
            }
          },
          { headers: { "Cache-Control": "no-store" } }
        );
      }
      const verdict = parseVerdictOutput(outcome.text);
      recordCredentialSuccess(runtime, outcome.credential);
      if (verdict) recordModelSuccess(runtime, outcome.model, 1);
      return jsonResponse(
        {
          success: true,
          data: {
            ok: Boolean(verdict),
            domain: target.key,
            hostname: target.hostname,
            model: outcome.model,
            accountId: outcome.credential.id,
            verdict: verdict || null,
            raw: String(outcome.text ?? "").slice(0, 1e3),
            elapsedMs: Date.now() - startedAt
          }
        },
        { headers: { "Cache-Control": "no-store" } }
      );
    } catch (error3) {
      return jsonResponse(
        {
          success: true,
          data: {
            ok: false,
            domain: target.key,
            model: usedModel,
            error: error3?.message ?? "\u63D0\u95EE\u5931\u8D25"
          }
        },
        { headers: { "Cache-Control": "no-store" } }
      );
    }
  } finally {
    await saveRuntime(db, runtime);
  }
}
__name(sample, "sample");
async function query(context2, db) {
  const guard5 = await guardAi(context2, db, "ai.run");
  if (!guard5.ok) return guard5.response;
  const body = await readJson(context2);
  if (!body.ok) return badRequest("\u8BF7\u6C42\u4F53\u4E0D\u662F\u6709\u6548\u7684 JSON");
  const raw = Array.isArray(body.value?.domains) ? body.value.domains : [body.value?.domain];
  const domains = [...new Set(raw.map(normalizeDomain).filter(Boolean))];
  if (!domains.length) return badRequest("\u7F3A\u5C11\u5F85\u5224\u5B9A\u7684\u57DF\u540D");
  if (domains.length > MAX_QUERY_DOMAINS)
    return badRequest(`\u5355\u6B21\u6700\u591A\u5224\u5B9A ${MAX_QUERY_DOMAINS} \u4E2A\u57DF\u540D`);
  const force = body.value?.force === true;
  const config2 = await loadAiConfig(db, context2.env);
  const runtime = await loadRuntime(db);
  try {
    const result = await queryDomains(db, config2, domains, { force, runtime });
    return jsonResponse(
      { success: true, data: result },
      { headers: { "Cache-Control": "no-store" } }
    );
  } finally {
    await saveRuntime(db, runtime);
  }
}
__name(query, "query");
async function run(context2, db, url) {
  const guard5 = await guardAi(context2, db, "ai.run");
  if (!guard5.ok) return guard5.response;
  const config2 = await loadAiConfig(db, context2.env);
  const body = await readJson(context2);
  const force = url.searchParams.get("force") === "1" || body.value?.force === true;
  const runtime = await loadRuntime(db);
  try {
    const result = await runAiBatch(db, config2, { force, runtime });
    return jsonResponse({ success: true, data: result });
  } finally {
    await saveRuntime(db, runtime);
  }
}
__name(run, "run");
async function reset(context2, db) {
  const guard5 = await guardAi(context2, db, "ai.status");
  if (!guard5.ok) return guard5.response;
  const data = await resetVerdicts(db);
  return jsonResponse({ success: true, data });
}
__name(reset, "reset");

// _utils/timezone.js
var TZ_PARAM = "tz";
function clientTzOffsetFromHeader(value, fallback = 0) {
  const raw = Number(value);
  if (!Number.isFinite(raw) || raw < MIN_OFFSET || raw > MAX_OFFSET) return fallback;
  return raw;
}
__name(clientTzOffsetFromHeader, "clientTzOffsetFromHeader");
var MIN_OFFSET = -720;
var MAX_OFFSET = 840;
var MS_PER_DAY = 864e5;
function clientTzOffset(params, fallback = 0) {
  const raw = Number(params.get(TZ_PARAM));
  if (!Number.isFinite(raw) || raw < MIN_OFFSET || raw > MAX_OFFSET) return fallback;
  return raw;
}
__name(clientTzOffset, "clientTzOffset");
function startOfClientDay(offsetMinutes, reference = /* @__PURE__ */ new Date()) {
  const offsetMs = Number.isFinite(offsetMinutes) ? offsetMinutes * 60 * 1e3 : 0;
  const localWallMs = reference.getTime() + offsetMs;
  const localMidnightMs = localWallMs - (localWallMs % MS_PER_DAY + MS_PER_DAY) % MS_PER_DAY;
  return new Date(localMidnightMs - offsetMs).toISOString();
}
__name(startOfClientDay, "startOfClientDay");

// api/_ai/usage/schema-fields.js
function semanticField(component, available) {
  if (!component?.semantic || !available) return null;
  return available.find((field) => component.semantic.test(field)) ?? null;
}
__name(semanticField, "semanticField");
function metricFieldSets(metric, available) {
  if (metric.components) {
    const sets = [];
    const resolved = metric.components.map(
      (component) => available ? component.candidates.find((candidate) => available.includes(candidate)) ?? semanticField(component, available) : component.candidates[0]
    ).filter(Boolean);
    if (resolved.length && (available || metric.required)) sets.push(resolved);
    const fallback = available ? metric.candidates?.find((candidate) => available.includes(candidate)) ?? semanticField(metric, available) : metric.required ? metric.candidates?.[0] : null;
    if (fallback) sets.push([fallback]);
    return sets;
  }
  const field = available ? metric.candidates.find((candidate) => available.includes(candidate)) ?? semanticField(metric, available) : metric.required ? metric.candidates[0] : null;
  return field ? [[field]] : [];
}
__name(metricFieldSets, "metricFieldSets");
function pickFields(metrics, available) {
  const picked = [];
  for (const metric of metrics) {
    const [fields] = metricFieldSets(metric, available);
    if (fields?.length) picked.push({ key: metric.key, fields });
  }
  return picked;
}
__name(pickFields, "pickFields");
function isSchemaDriftError(error3) {
  return /unknown field|cannot query field|unknown argument|not defined/i.test(
    String(error3?.message ?? "")
  );
}
__name(isSchemaDriftError, "isSchemaDriftError");
function comboKey(combo) {
  return combo.map((entry) => `${entry.key}:${entry.fields.join("+")}`).join("|");
}
__name(comboKey, "comboKey");
function fieldCombos(metrics) {
  const primary = pickFields(metrics, null);
  const combos = [];
  for (let size = primary.length; size >= 1; size -= 1) {
    for (let start = 0; start + size <= primary.length; start += 1) {
      combos.push(primary.slice(start, start + size));
    }
  }
  for (const metric of metrics) {
    if (!metric.components || !metric.candidates?.length) continue;
    for (const fields of metricFieldSets(metric, null).slice(1)) {
      const swapped = primary.map(
        (entry) => entry.key === metric.key ? { key: entry.key, fields } : entry
      );
      combos.push(swapped);
      combos.push(
        primary.filter((entry) => entry.key !== metric.key).concat([{ key: metric.key, fields }])
      );
      combos.push([{ key: metric.key, fields }]);
    }
  }
  const seen = /* @__PURE__ */ new Set();
  return combos.filter((combo) => {
    const key = comboKey(combo);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
__name(fieldCombos, "fieldCombos");

// api/_ai/usage/transport.js
var GRAPHQL_ENDPOINT = "https://api.cloudflare.com/client/v4/graphql";
var QUERY_TIMEOUT_MS = 15e3;
async function queryGraphql(token, query2, variables, endpoint = GRAPHQL_ENDPOINT) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query: query2, variables }),
    signal: AbortSignal.timeout(QUERY_TIMEOUT_MS)
  });
  let body = null;
  try {
    body = await response.json();
  } catch {
  }
  const firstError = body?.errors?.[0]?.message;
  if (firstError) throw new Error(firstError);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return body?.data ?? {};
}
__name(queryGraphql, "queryGraphql");
function observabilityErrorState(status4, detail) {
  if (status4 === 403 || status4 === 404) return "disabled";
  if (/not (found|enabled)|observability|permission|authorized|forbidden/i.test(String(detail)))
    return "disabled";
  return "unavailable";
}
__name(observabilityErrorState, "observabilityErrorState");
function observabilityError(message, state) {
  const error3 = new Error(message);
  error3.observabilityState = state;
  return error3;
}
__name(observabilityError, "observabilityError");
async function loadObservabilityRest(token, account, { sinceToday, endpoint = GRAPHQL_ENDPOINT }) {
  const from = Date.parse(sinceToday);
  const to = Date.now();
  const restBase = endpoint.replace("/client/v4/graphql", "/client/v4");
  const response = await fetch(
    `${restBase}/accounts/${account.id}/workers/observability/telemetry/query`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        queryId: `cp-usage-${Date.now().toString(36)}`,
        view: "events",
        timeframe: { from, to },
        parameters: { datasets: ["cloudflare-workers"], limit: 1 },
        limit: 1
      }),
      signal: AbortSignal.timeout(QUERY_TIMEOUT_MS)
    }
  );
  const body = await response.json().catch(() => null);
  if (!response.ok) {
    const detail = body?.errors?.[0]?.message ?? `HTTP ${response.status}`;
    throw observabilityError(
      `REST \u9065\u6D4B\u67E5\u8BE2\u5931\u8D25\uFF1A${detail}`,
      observabilityErrorState(response.status, detail)
    );
  }
  if (body?.success === false) {
    const detail = body?.errors?.[0]?.message ?? "\u672A\u77E5\u9519\u8BEF";
    throw observabilityError(
      `REST \u9065\u6D4B\u67E5\u8BE2\u5931\u8D25\uFF1A${detail}`,
      observabilityErrorState(response.status, detail)
    );
  }
  const count3 = Number(body?.result?.events?.count);
  if (!Number.isFinite(count3)) {
    throw observabilityError(
      "REST \u9065\u6D4B\u54CD\u5E94\u6CA1\u6709 events.count\uFF08\u8D26\u53F7\u53EF\u80FD\u672A\u5F00\u542F Workers Observability\uFF09",
      "disabled"
    );
  }
  return { events: count3 };
}
__name(loadObservabilityRest, "loadObservabilityRest");

// api/_ai/usage/query-build.js
var GROUP_LIMIT = 1e3;
function candidatePlans(dataset, nodes) {
  const combos = fieldCombos(dataset.metrics);
  const nodeNames = nodes?.length ? nodes : [dataset.node];
  return [
    ...nodeNames.flatMap(
      (node) => combos.flatMap((fields) => [
        { node, dimension: dataset.dimensions[0], fields },
        { node, dimension: "", fields }
      ])
    )
  ];
}
__name(candidatePlans, "candidatePlans");
function buildQuery(plan, dataset) {
  const allFields = plan.fields.flatMap((entry) => entry.fields);
  const rootFields = allFields.filter((field) => dataset.rootFields?.includes(field));
  const sumFields = allFields.filter((field) => !dataset.rootFields?.includes(field));
  const metrics = [
    ...rootFields,
    ...sumFields.length ? [`sum { ${sumFields.join(" ")} }`] : []
  ].join(" ");
  const WINDOW_VARIABLES = { h24: "since24h", today: "sinceToday", month: "sinceMonth" };
  const usedVars = [...new Set(dataset.windows.map((key) => WINDOW_VARIABLES[key]))];
  const declarations = usedVars.map((name) => `$${name}: Time!`).join(", ");
  const selections = dataset.windows.map((key, index) => {
    const variable = WINDOW_VARIABLES[key];
    const dimensions = plan.dimension ? `
          dimensions { ${plan.dimension} }` : "";
    return `w${index}: ${plan.node}(
          limit: ${plan.limit || GROUP_LIMIT}
          filter: {datetime_geq: $${variable}}
        ) {
          ${metrics}${dimensions}
        }`;
  }).join("\n      ");
  return `query($accountTag: String!, ${declarations}) {
  viewer {
    accounts(filter: {accountTag: $accountTag}) {
      ${selections}
    }
  }
}`;
}
__name(buildQuery, "buildQuery");
async function runDataset(token, plans, dataset, variables, endpoint) {
  const usable = plans.filter((plan) => plan.fields.length);
  if (!usable.length) {
    const available = plans[0]?.available;
    throw new Error(
      `\u672A\u5339\u914D\u5230\u53EF\u7528\u6307\u6807\u5B57\u6BB5${available?.length ? `\uFF08\u8BE5\u6570\u636E\u96C6\u5F53\u524D\u53EF\u7528\u5B57\u6BB5\uFF1A${available.join(" / ")}\uFF09` : ""}`
    );
  }
  const messages = [];
  const emptyNodes = /* @__PURE__ */ new Set();
  let emptyResult = null;
  for (const plan of usable) {
    try {
      const data = await queryGraphql(token, buildQuery(plan, dataset), variables, endpoint);
      if (datasetHasGroups(data, dataset)) return { plan, data };
      if (!emptyResult) emptyResult = { plan, data };
      emptyNodes.add(plan.node);
      if (!usable.some((next) => next.node !== plan.node && !emptyNodes.has(next.node)))
        return { plan, data };
      continue;
    } catch (error3) {
      const message = String(error3?.message ?? "\u672A\u77E5\u9519\u8BEF");
      if (!messages.includes(message)) messages.push(message);
    }
  }
  if (emptyResult) return emptyResult;
  const first = messages[0] ?? "\u672A\u77E5\u9519\u8BEF";
  const rest = messages.slice(1, 4);
  throw new Error(rest.length ? `${first}\uFF08\u540E\u7EED\u5C1D\u8BD5\uFF1A${rest.join("\uFF1B")}\uFF09` : first);
}
__name(runDataset, "runDataset");
function datasetHasGroups(data, dataset) {
  return dataset.windows.some((key, index) => aliasGroups(data, `w${index}`).length > 0);
}
__name(datasetHasGroups, "datasetHasGroups");
function aliasGroups(data, alias) {
  const accounts = data?.viewer?.accounts;
  const account = Array.isArray(accounts) ? accounts[0] ?? {} : {};
  return Array.isArray(account?.[alias]) ? account[alias] : [];
}
__name(aliasGroups, "aliasGroups");

// api/_ai/usage/schema-introspect.js
function pascalCase(name) {
  return String(name).replace(/^[a-z]/, (char) => char.toUpperCase());
}
__name(pascalCase, "pascalCase");
function typeIdentifier(name) {
  return String(name).replace(/[^A-Za-z0-9_]/g, "");
}
__name(typeIdentifier, "typeIdentifier");
async function introspectTypeFields(token, typeName, endpoint) {
  const name = typeIdentifier(typeName);
  if (!name) return null;
  const data = await queryGraphql(
    token,
    `{ __type(name: "${name}") { fields { name } } }`,
    {},
    endpoint
  );
  const fields = data?.__type?.fields;
  return Array.isArray(fields) && fields.length ? fields.map((field) => field?.name).filter(Boolean) : null;
}
__name(introspectTypeFields, "introspectTypeFields");
function introspectNames(node, suffix = "") {
  const pascal = pascalCase(node);
  return [`Account${pascal}${suffix}`, `${pascal}${suffix}`];
}
__name(introspectNames, "introspectNames");
async function introspectTypeFieldsAny(token, names, endpoint) {
  for (const name of names) {
    const fields = await introspectTypeFields(token, name, endpoint).catch(() => null);
    if (fields) return fields;
  }
  return null;
}
__name(introspectTypeFieldsAny, "introspectTypeFieldsAny");

// api/_ai/usage/schema-candidates.js
var SCHEMA_TTL_MS = 30 * 60 * 1e3;
function datasetNodeCandidates(dataset, accountFields) {
  const names = [dataset.node];
  for (const name of accountFields ?? []) {
    if (dataset.nodePattern.test(String(name)) && !names.includes(name)) names.push(name);
  }
  return names;
}
__name(datasetNodeCandidates, "datasetNodeCandidates");

// api/_ai/usage/schema-settings.js
var settingsCache = { at: 0, byAccount: {} };
function invalidateSettingsCache() {
  settingsCache = { at: 0, byAccount: {} };
}
__name(invalidateSettingsCache, "invalidateSettingsCache");
function buildSettingsQuery(nodeNames) {
  const selections = nodeNames.map(
    (name) => `${typeIdentifier(name)} { enabled availableFields maxNumberOfFields maxPageSize }`
  ).join("\n        ");
  return `query($accountTag: String!) {
  viewer {
    accounts(filter: {accountTag: $accountTag}) {
      settings {
        ${selections}
      }
    }
  }
}`;
}
__name(buildSettingsQuery, "buildSettingsQuery");
function parseSettingsSnapshot(data) {
  const accounts = data?.viewer?.accounts;
  const settings = Array.isArray(accounts) ? accounts[0]?.settings : null;
  if (!settings || typeof settings !== "object") return null;
  const byNode = {};
  for (const [node, entry] of Object.entries(settings)) {
    if (!entry || typeof entry !== "object") continue;
    const fields = Array.isArray(entry.availableFields) ? entry.availableFields.map(String).filter(Boolean) : [];
    const sumFields = [
      .../* @__PURE__ */ new Set([
        ...fields.filter((field) => field.startsWith("sum_")).map((field) => field.slice(4)),
        // 无路径前缀的裸字段名（如 count）同样按 sum 候选收下：settings 对简单
        // 聚合字段可能不带 sum_ 前缀，漏掉它会让计数型指标彻底消失
        ...fields.filter((field) => !field.includes("_"))
      ])
    ];
    byNode[node] = {
      enabled: entry.enabled !== false,
      // v1.25：maxPageSize 随快照带出——GraphQL 分页上限是节点级的（如
      // workersInvocationsAdaptive 远小于 Groups 节点），按它钳制查询 limit，
      // 超限报错会让整个数据集全军覆没成「—」
      maxPageSize: Number.isFinite(Number(entry.maxPageSize)) && Number(entry.maxPageSize) > 0 ? Math.floor(Number(entry.maxPageSize)) : null,
      sumFields,
      dimensionFields: fields.filter((field) => field.startsWith("dimensions_")).map((field) => field.slice(11))
    };
  }
  return Object.keys(byNode).length ? byNode : null;
}
__name(parseSettingsSnapshot, "parseSettingsSnapshot");
async function settingsSnapshot(token, account, dataset, accountFields, endpoint) {
  const acctKey = `${account.id}:${token.slice(-6)}`;
  const cacheKey = `${dataset.node}`;
  const cached = settingsCache.byAccount[acctKey];
  const bucket = cached && Date.now() - settingsCache.at < SCHEMA_TTL_MS ? cached[cacheKey] : null;
  if (bucket) return bucket.snapshot;
  const names = datasetNodeCandidates(dataset, accountFields).filter(Boolean);
  const snapshot = await fetchSettingsSnapshot(token, account.id, names, accountFields, endpoint);
  const next = { ...cached ?? {}, [cacheKey]: { snapshot } };
  settingsCache = { at: Date.now(), byAccount: { ...settingsCache.byAccount, [acctKey]: next } };
  return snapshot;
}
__name(settingsSnapshot, "settingsSnapshot");
async function fetchSettingsSnapshot(token, accountTag, names, accountFields, endpoint) {
  if (!names.length) return null;
  try {
    return parseSettingsSnapshot(
      await queryGraphql(token, buildSettingsQuery(names), { accountTag }, endpoint)
    );
  } catch {
    if (!accountFields) return null;
    const verified = names.filter((name) => accountFields.includes(name));
    if (!verified.length || verified.length === names.length) return null;
    try {
      return parseSettingsSnapshot(
        await queryGraphql(token, buildSettingsQuery(verified), { accountTag }, endpoint)
      );
    } catch {
      return null;
    }
  }
}
__name(fetchSettingsSnapshot, "fetchSettingsSnapshot");

// api/_ai/usage/schema-probe.js
var accountFieldsCache = { at: 0, byToken: {} };
var schemaCache = { at: 0, plans: {} };
async function accountFieldList(token, cfgKey, endpoint) {
  const cached = accountFieldsCache.byToken[cfgKey];
  if (cached && Date.now() - accountFieldsCache.at < SCHEMA_TTL_MS) return cached.promise;
  const promise = introspectTypeFields(token, "Account", endpoint).catch(() => null);
  if (Date.now() - accountFieldsCache.at >= SCHEMA_TTL_MS) {
    accountFieldsCache = { at: Date.now(), byToken: { [cfgKey]: { promise } } };
  }
  return promise;
}
__name(accountFieldList, "accountFieldList");
async function probePlans(token, dataset, nodes, settings, endpoint) {
  const plans = [];
  let sawSchemaNode = false;
  let sawDisabled = false;
  for (const node of nodes) {
    const entry = settings?.[node];
    if (entry && entry.enabled === false) {
      sawDisabled = true;
      continue;
    }
    if (entry) sawSchemaNode = true;
    let sumFields = entry?.sumFields?.length ? entry.sumFields : null;
    if (!entry) {
      const groupFields = dataset.rootFields?.length ? await introspectTypeFieldsAny(token, introspectNames(node), endpoint) : null;
      const rootFields = groupFields?.filter((field) => dataset.rootFields.includes(field)) ?? [];
      const sumOnly = await introspectTypeFieldsAny(
        token,
        introspectNames(node, "Sum"),
        endpoint
      );
      sumFields = [...rootFields, ...sumOnly ?? []];
      if (!sumFields.length) sumFields = null;
    }
    if (!sumFields) {
      continue;
    }
    sawSchemaNode = true;
    const dimensionFields = entry?.dimensionFields?.length ? entry.dimensionFields : await introspectTypeFieldsAny(token, introspectNames(node, "Dimensions"), endpoint);
    const dimension = dimensionFields ? dataset.dimensions.find((name) => dimensionFields.includes(name)) ?? "" : dataset.dimensions[0];
    const fields = pickFields(dataset.metrics, sumFields);
    if (fields.length) {
      plans.push({
        node,
        dimension,
        fields,
        available: sumFields,
        source: entry ? "settings" : "introspection",
        // v1.25：按 settings 的节点分页上限钳制 limit（缺失回落统一 GROUP_LIMIT）
        limit: Math.min(GROUP_LIMIT, entry?.maxPageSize || GROUP_LIMIT)
      });
    }
  }
  if (!plans.length && !sawSchemaNode && sawDisabled) {
    if (dataset.optionalDataset) return [];
    throw new Error(`API \u4EE4\u724C\u672A\u5F00\u901A\u8BE5\u6570\u636E\u96C6\uFF08\u8282\u70B9 enabled=false\uFF1B${dataset.scope}\uFF09`);
  }
  return plans;
}
__name(probePlans, "probePlans");
function cachedSchemaPlans(cfgKey, node) {
  const bucket = schemaCache.plans[cfgKey];
  if (!bucket || Date.now() - schemaCache.at >= SCHEMA_TTL_MS) return null;
  return bucket[node] ?? null;
}
__name(cachedSchemaPlans, "cachedSchemaPlans");
function storeSchemaPlans(cfgKey, node, plans) {
  const buckets2 = schemaCache.plans[cfgKey] ?? {};
  schemaCache = {
    at: Date.now(),
    plans: { ...schemaCache.plans, [cfgKey]: { ...buckets2, [node]: plans } }
  };
}
__name(storeSchemaPlans, "storeSchemaPlans");
function invalidateSchemaPlan(cfgKey, node) {
  const bucket = schemaCache.plans[cfgKey];
  if (!bucket || !(node in bucket)) return;
  const next = { ...bucket };
  delete next[node];
  schemaCache = { at: schemaCache.at, plans: { ...schemaCache.plans, [cfgKey]: next } };
}
__name(invalidateSchemaPlan, "invalidateSchemaPlan");
async function datasetPlans(token, account, dataset, endpoint) {
  const acctKey = `${account.id}:${token.slice(-6)}`;
  const cached = cachedSchemaPlans(acctKey, dataset.node);
  if (cached) return cached;
  const accountFields = await accountFieldList(token, token.slice(-6), endpoint);
  if (dataset.optionalDataset && accountFields && !accountFields.some((name) => dataset.nodePattern.test(name))) {
    storeSchemaPlans(acctKey, dataset.node, []);
    return [];
  }
  const nodes = datasetNodeCandidates(dataset, accountFields);
  const settings = await settingsSnapshot(token, account, dataset, accountFields, endpoint);
  if (!accountFields && !settings) {
    const fallback = dataset.optionalDataset ? [] : candidatePlans(dataset, nodes);
    storeSchemaPlans(acctKey, dataset.node, fallback);
    return fallback;
  }
  const probedPlans = await probePlans(token, dataset, nodes, settings, endpoint);
  if (!probedPlans.length) {
    const fallback = dataset.optionalDataset ? [] : candidatePlans(dataset, nodes);
    storeSchemaPlans(acctKey, dataset.node, fallback);
    return fallback;
  }
  const fallbackNodes = nodes.filter((node) => !settings?.[node]);
  const fallbacks = candidatePlans(dataset, fallbackNodes).map((plan) => ({
    ...plan,
    available: settings?.[plan.node]?.sumFields ?? null
  }));
  const plans = [...probedPlans, ...fallbacks];
  storeSchemaPlans(acctKey, dataset.node, plans);
  return plans;
}
__name(datasetPlans, "datasetPlans");
function invalidateProbeCaches() {
  accountFieldsCache = { at: 0, byToken: {} };
  invalidateSettingsCache();
  schemaCache = { at: 0, plans: {} };
}
__name(invalidateProbeCaches, "invalidateProbeCaches");

// api/_ai/usage/aggregate.js
var BREAKDOWN_LIMIT = 5;
function metricValue(group3, field, rootFields) {
  const raw = rootFields?.includes(field) ? group3?.[field] : group3?.sum?.[field];
  if (raw === null || raw === void 0 || raw === "") return void 0;
  const value = Number(raw);
  return Number.isFinite(value) ? value : void 0;
}
__name(metricValue, "metricValue");
function entryValue(group3, entry, rootFields) {
  let total = 0;
  let provided = false;
  for (const field of entry.fields) {
    const value = metricValue(group3, field, rootFields);
    if (value === void 0) continue;
    total += value;
    provided = true;
  }
  return provided ? total : void 0;
}
__name(entryValue, "entryValue");
function sumMetrics(groups, plan, rootFields) {
  const totals = {};
  for (const entry of plan.fields) {
    let total = 0;
    let provided = false;
    for (const group3 of groups) {
      const value = entryValue(group3, entry, rootFields);
      if (value === void 0) continue;
      total += value;
      provided = true;
    }
    if (provided) totals[entry.key] = total;
  }
  return totals;
}
__name(sumMetrics, "sumMetrics");
function groupBreakdown(groups, plan, dataset) {
  if (!plan.dimension || !groups.length) return [];
  const buckets2 = /* @__PURE__ */ new Map();
  for (const group3 of groups) {
    const name = String(group3?.dimensions?.[plan.dimension] ?? "").trim() || dataset.fallbackLabel;
    const bucket = buckets2.get(name) || { name };
    for (const entry of plan.fields) {
      const value = entryValue(group3, entry, dataset.rootFields);
      if (value === void 0) continue;
      bucket[entry.key] = (bucket[entry.key] || 0) + value;
    }
    buckets2.set(name, bucket);
  }
  return [...buckets2.values()].sort((a, b) => (b[dataset.sortKey] ?? 0) - (a[dataset.sortKey] ?? 0)).slice(0, BREAKDOWN_LIMIT);
}
__name(groupBreakdown, "groupBreakdown");
function datasetWarning(dataset, error3) {
  const message = error3?.message ?? "\u672A\u77E5\u9519\u8BEF";
  const drifted = isSchemaDriftError(error3);
  const hint = drifted ? "\uFF1BCloudflare \u52A8\u6001 schema \u53EF\u80FD\u5DF2\u53D8\u66F4\u5B57\u6BB5\uFF08\u91CD\u8BD5\u4F1A\u81EA\u52A8\u91CD\u65B0\u63A2\u6D4B\uFF09" : "";
  return `${dataset.label}\u8BFB\u53D6\u5931\u8D25\uFF08${dataset.scope}\uFF09${hint}\uFF1A${message}`;
}
__name(datasetWarning, "datasetWarning");
function windowWarning(dataset, usage3, groups, plan) {
  const missing = dataset.metrics.filter((metric) => (metric.required || metric.warnMissing) && !(metric.key in usage3)).map((metric) => metric.key);
  if (!missing.length) return "";
  const requested = new Set(plan.fields.map((entry) => entry.key));
  const notQueried = missing.filter((key) => !requested.has(key));
  const queried = missing.filter((key) => requested.has(key));
  const parts = [];
  if (notQueried.length) {
    parts.push(
      `schema \u672A\u63D0\u4F9B ${notQueried.join(" / ")} \u5B57\u6BB5${plan.available?.length ? `\uFF08\u53EF\u7528\u5B57\u6BB5\uFF1A${plan.available.join(" / ")}\uFF09` : ""}`
    );
  }
  if (queried.length) {
    parts.push(
      groups.length ? `${queried.join(" / ")} \u5B57\u6BB5\u5DF2\u67E5\u8BE2\u4F46\u63A5\u53E3\u672A\u8FD4\u56DE\u6570\u503C` : "\u8BE5\u65F6\u95F4\u7A97\u5185\u6CA1\u6709\u6570\u636E\u8BB0\u5F55"
    );
  }
  return `${dataset.label}${groups.length ? "\u5DF2\u8FD4\u56DE\uFF0C\u4F46 " : ""}${parts.join("\uFF1B")}\uFF0C\u5BF9\u5E94\u6307\u6807\u663E\u793A\u300C\u2014\u300D`;
}
__name(windowWarning, "windowWarning");
function observabilityState(accounts) {
  const list2 = Array.isArray(accounts) ? accounts : [];
  let sawDisabled = false;
  for (const item of list2) {
    const obs = item?.today?.observability;
    if (obs && obs.events !== null && obs.events !== void 0 && Number.isFinite(Number(obs.events)))
      return "ok";
    if (obs?.state === "disabled") sawDisabled = true;
  }
  return sawDisabled ? "disabled" : "unavailable";
}
__name(observabilityState, "observabilityState");

// api/_ai/usage/datasets.js
var AI_DATASET = {
  label: "AI \u63A8\u7406\u7528\u91CF",
  scope: "\u9700 Account Analytics: Read \u6743\u9650",
  /** 节点名候选：内省按正则找回真实名字，避免节点被改名后整卡失效 */
  node: "aiInferenceAdaptiveGroups",
  nodePattern: /^ai\w*inference\w*groups$/i,
  dimensions: ["modelName", "model", "modelId"],
  fallbackLabel: "\u672A\u77E5\u6A21\u578B",
  breakdown: "models",
  sortKey: "tokens",
  windows: ["h24", "today"],
  /** 挂在分组根上而不是 sum 里的字段（2026-10 schema：请求数从 sum.requests 改为根上的 count） */
  rootFields: ["count"],
  metrics: [
    {
      key: "requests",
      required: true,
      candidates: ["requests", "count", "inferenceRequests", "requestCount"],
      semantic: /^(total)?_?(requests?|request_?count|invocations?|inferences?|count)$/i
    },
    {
      key: "tokens",
      required: true,
      /** 复合指标：逐组件取交集后求和；组件全缺时回落整字段候选 */
      components: [
        {
          candidates: [
            "totalInputTokens",
            "promptTokens",
            "promptTokenCount",
            "inputTokens"
          ],
          semantic: /^(total_?)?(prompt|input|in)_?tokens?(_?count)?$/i
        },
        {
          candidates: [
            "totalOutputTokens",
            "completionTokens",
            "completionTokenCount",
            "outputTokens"
          ],
          semantic: /^(total_?)?(completion|output|out)_?tokens?(_?count)?$/i
        }
      ],
      candidates: ["totalTokens", "tokens", "tokenCount"]
    },
    {
      key: "neurons",
      required: false,
      candidates: ["totalNeurons", "neurons", "neuronsUsed", "aiNeurons"],
      semantic: /^(total_?)?neurons?(_?used)?$/i
    }
  ]
};
var WORKERS_DATASET = {
  label: "Workers \u6307\u6807",
  scope: "\u53EF\u9009\uFF0C\u9700 Workers Scripts: Read \u6743\u9650",
  /** 默认节点名沿用经典形态；内省按正则找回真实名字（workersInvocationsAdaptiveGroups 也命中） */
  node: "workersInvocationsAdaptive",
  nodePattern: /^workersinvocations\w*$/i,
  dimensions: ["scriptName", "script"],
  fallbackLabel: "\u672A\u547D\u540D\u811A\u672C",
  breakdown: "scripts",
  sortKey: "requests",
  windows: ["h24", "today"],
  metrics: [
    // requests 是核心必选：只要数据集返回就该有它；errors 是易变字段（schema 常改名），
    // 缺失时单独提示而不是拖垮整个 Workers 区块（修复指标整体显示「—」的 Bug）
    {
      key: "requests",
      required: true,
      candidates: ["requests", "invocations", "requestCount"],
      semantic: /^(total)?_?(requests?|request_?count|invocations?)$/i
    },
    {
      key: "errors",
      required: false,
      warnMissing: true,
      candidates: ["errors", "errorCount", "exceptions", "clientErrors"],
      semantic: /^(total)?_?(errors?|error_?count|exceptions?)$/i
    }
  ]
};
var OBSERVABILITY_DATASET = {
  label: "\u53EF\u89C2\u6D4B\u6027\u4E8B\u4EF6",
  scope: "\u53EF\u9009\uFF0C\u9700 Workers Observability \u6743\u9650",
  node: "workersObservabilityTelemetryAdaptiveGroups",
  nodePattern: /^workersobservability\w*$/i,
  dimensions: [],
  fallbackLabel: "",
  breakdown: "",
  sortKey: "events",
  windows: ["today"],
  optionalDataset: true,
  /**
   * v1.25：GraphQL 节点族（workersObservability*）已从 Analytics schema 移除，
   * GraphQL 探测缺席时回落 Workers Observability REST 遥测查询
   * （POST /accounts/{id}/workers/observability/telemetry/query，view=events
   * 响应的 events.count 即事件总数）——「今日可观测性事件」不再恒为「—」。
   */
  restFallback: true,
  metrics: [
    {
      key: "events",
      required: true,
      candidates: ["events", "eventCount", "totalEvents", "count"],
      semantic: /^(total)?_?(events?|event_?count)$/i
    }
  ]
};
var BUILDS_DATASET = {
  label: "Workers \u6784\u5EFA\u7528\u91CF",
  scope: "\u53EF\u9009\uFF0C\u9700 Workers Builds: Read \u6743\u9650",
  node: "workersBuildsBuildMinutesAdaptiveGroups",
  nodePattern: /^workersbuilds\w*$/i,
  dimensions: [],
  fallbackLabel: "",
  breakdown: "",
  sortKey: "buildMinutes",
  windows: ["month"],
  optionalDataset: true,
  metrics: [
    {
      key: "buildMinutes",
      required: true,
      candidates: ["buildMinutes", "buildMinutesUsed", "minutes", "durationMinutes"],
      semantic: /^(build)?_?minutes?(_?used|_?duration)?$/i
    }
  ]
};

// api/_ai/usage/dataset-run.js
function emptyWindows(dataset) {
  return Object.fromEntries(dataset.windows.map((key) => [key, null]));
}
__name(emptyWindows, "emptyWindows");
async function loadDatasetUsage(token, account, dataset, variables, endpoint) {
  const plans = await datasetPlans(token, account, dataset, endpoint);
  if (!plans.length) {
    if (dataset.restFallback) {
      try {
        const usage3 = await loadObservabilityRest(token, account, {
          sinceToday: variables.sinceToday,
          endpoint
        });
        return { [dataset.windows[0]]: { usage: usage3, warning: "" } };
      } catch (error3) {
        const state = error3?.observabilityState ?? "unavailable";
        console.warn(
          "[usage] \u53EF\u89C2\u6D4B\u6027\u4E8B\u4EF6 GraphQL \u4E0E REST \u9065\u6D4B\u90FD\u4E0D\u53EF\u7528",
          error3?.message ?? error3
        );
        return { [dataset.windows[0]]: { usage: { events: null, state }, warning: "" } };
      }
    }
    return null;
  }
  try {
    const { plan, data } = await runDataset(token, plans, dataset, variables, endpoint);
    const out = {};
    dataset.windows.forEach((key, index) => {
      const groups = aliasGroups(data, `w${index}`);
      const usage3 = {
        ...sumMetrics(groups, plan, dataset.rootFields),
        ...dataset.breakdown ? { [dataset.breakdown]: groupBreakdown(groups, plan, dataset) } : {}
      };
      out[key] = { usage: usage3, warning: windowWarning(dataset, usage3, groups, plan) };
    });
    return out;
  } catch (error3) {
    if (isSchemaDriftError(error3))
      invalidateSchemaPlan(`${account.id}:${token.slice(-6)}`, dataset.node);
    const available = plans.find((plan) => plan.available?.length)?.available;
    if (available?.length && !error3.message.includes(available[0])) {
      error3.message = `${error3.message}\uFF08\u8BE5\u6570\u636E\u96C6\u5F53\u524D\u53EF\u7528\u5B57\u6BB5\uFF1A${available.join(" / ")}\uFF09`;
    }
    throw error3;
  }
}
__name(loadDatasetUsage, "loadDatasetUsage");
function unwrapDataset(result, dataset, warnings) {
  if (result.status === "fulfilled") {
    const windows = result.value;
    if (!windows) return emptyWindows(dataset);
    const out = {};
    for (const [key, usage3] of Object.entries(windows)) {
      if (usage3.warning) warnings.push(usage3.warning);
      out[key] = usage3.usage;
    }
    return out;
  }
  warnings.push(datasetWarning(dataset, result.reason));
  return emptyWindows(dataset);
}
__name(unwrapDataset, "unwrapDataset");
async function queryAccountUsage(account, windows, endpoint) {
  const variables = { accountTag: account.id, ...windows };
  const [ai, workers, observability, builds] = await Promise.allSettled([
    loadDatasetUsage(account.token, account, AI_DATASET, variables, endpoint),
    loadDatasetUsage(account.token, account, WORKERS_DATASET, variables, endpoint),
    loadDatasetUsage(account.token, account, OBSERVABILITY_DATASET, variables, endpoint),
    loadDatasetUsage(account.token, account, BUILDS_DATASET, variables, endpoint)
  ]);
  const warnings = [];
  const aiWindows = unwrapDataset(ai, AI_DATASET, warnings);
  const workersWindows = unwrapDataset(workers, WORKERS_DATASET, warnings);
  const observabilityWindows = unwrapDataset(observability, OBSERVABILITY_DATASET, warnings);
  const buildsWindows = unwrapDataset(builds, BUILDS_DATASET, warnings);
  return {
    ai: aiWindows.h24 ?? null,
    workers: workersWindows.h24 ?? null,
    today: {
      ai: aiWindows.today ?? null,
      workers: workersWindows.today ?? null,
      observability: observabilityWindows.today ?? null
    },
    builds: buildsWindows.month ?? null,
    warnings
  };
}
__name(queryAccountUsage, "queryAccountUsage");
function sumAcrossAccounts(accounts, pick2) {
  let total = 0;
  let provided = false;
  for (const value of accounts.map(pick2)) {
    if (value === null || value === void 0 || !Number.isFinite(Number(value))) continue;
    total += Number(value);
    provided = true;
  }
  return provided ? total : void 0;
}
__name(sumAcrossAccounts, "sumAcrossAccounts");

// api/_ai/usage/index.js
var WINDOW_HOURS = 24;
var CACHE_TTL_MS2 = 60 * 1e3;
var WORKERS_DAILY_REQUEST_LIMIT = 1e5;
var MAX_USAGE_ACCOUNTS = 10;
var usageCache = { at: 0, key: "", data: null };
function invalidateAllCaches() {
  usageCache = { at: 0, key: "", data: null };
  invalidateProbeCaches();
}
__name(invalidateAllCaches, "invalidateAllCaches");
function isoNow() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
__name(isoNow, "isoNow");
function startOfMonthUtc(now2 = Date.now()) {
  const day = new Date(now2);
  return new Date(Date.UTC(day.getUTCFullYear(), day.getUTCMonth(), 1)).toISOString();
}
__name(startOfMonthUtc, "startOfMonthUtc");
function normalizeUsageAccounts(config2) {
  const raw = Array.isArray(config2?.accounts) ? config2.accounts : [];
  const seen = /* @__PURE__ */ new Set();
  const accounts = [];
  for (const entry of raw) {
    const id = String(entry?.id ?? "").trim();
    const token = String(entry?.token ?? "").trim();
    if (!id || !token || seen.has(`${id}:${token.slice(-6)}`)) continue;
    seen.add(`${id}:${token.slice(-6)}`);
    accounts.push({ id, token, label: String(entry?.label ?? "").trim() || id });
    if (accounts.length >= MAX_USAGE_ACCOUNTS) break;
  }
  if (!accounts.length) {
    const id = String(config2?.cfAccountId ?? "").trim();
    const token = String(config2?.cfApiToken ?? "").trim();
    if (id && token) accounts.push({ id, token, label: id });
  }
  return accounts;
}
__name(normalizeUsageAccounts, "normalizeUsageAccounts");
function usageCacheKey(accounts) {
  return accounts.map((account) => `${account.id}:${account.token.slice(-6)}`).join("|");
}
__name(usageCacheKey, "usageCacheKey");
async function getCfUsage(config2, { force = false, tzOffsetMinutes = 0 } = {}) {
  const accounts = normalizeUsageAccounts(config2);
  if (!accounts.length) return { configured: false };
  const key = usageCacheKey(accounts);
  if (force) {
    invalidateAllCaches();
  }
  if (!force && usageCache.key === key && Date.now() - usageCache.at < CACHE_TTL_MS2) {
    return { ...usageCache.data, cached: true };
  }
  const windows = {
    since24h: new Date(Date.now() - WINDOW_HOURS * 3600 * 1e3).toISOString(),
    sinceToday: startOfClientDay(tzOffsetMinutes),
    sinceMonth: startOfMonthUtc()
  };
  const endpoint = String(config2?.cfGraphqlEndpoint ?? "").trim() || void 0;
  const settled = await Promise.all(
    accounts.map(async (account) => {
      const usage3 = await queryAccountUsage(account, windows, endpoint);
      return { id: account.id, label: account.label, ...usage3 };
    })
  );
  const totals = {
    aiRequests: sumAcrossAccounts(settled, (item) => item.ai?.requests),
    aiTokens: sumAcrossAccounts(settled, (item) => item.ai?.tokens),
    workersRequests: sumAcrossAccounts(settled, (item) => item.workers?.requests),
    workersErrors: sumAcrossAccounts(settled, (item) => item.workers?.errors),
    todayAiRequests: sumAcrossAccounts(settled, (item) => item.today?.ai?.requests),
    todayWorkersRequests: sumAcrossAccounts(settled, (item) => item.today?.workers?.requests),
    todayObservabilityEvents: sumAcrossAccounts(
      settled,
      (item) => item.today?.observability?.events
    ),
    /** 可观测性数据源状态（v1.29 T5）：ok / disabled（未开启）/ unavailable，前端按此给提示 */
    observabilityState: observabilityState(settled),
    monthBuildMinutes: sumAcrossAccounts(settled, (item) => item.builds?.buildMinutes)
  };
  const data = {
    configured: true,
    windowHours: WINDOW_HOURS,
    since: windows.since24h,
    todaySince: windows.sinceToday,
    monthSince: windows.sinceMonth,
    accounts: settled,
    totals,
    limits: { workersDailyRequests: WORKERS_DAILY_REQUEST_LIMIT },
    // 兼容字段：主账号（第一个）的明细——单账号部署下与 totals 语义一致
    ai: settled[0]?.ai ?? null,
    workers: settled[0]?.workers ?? null,
    warnings: settled.flatMap((item) => item.warnings ?? []),
    fetchedAt: isoNow()
  };
  usageCache = { at: Date.now(), key, data };
  return { ...data, cached: false };
}
__name(getCfUsage, "getCfUsage");

// api/_ai/routes-status.js
async function recentVerdictRecords(db, limit = 20) {
  try {
    const rows = await db.execute(
      `SELECT q.domain, q.action, q.confidence, q.model_name, q.comment, q.created_at,
                    COALESCE(l.count, 0) AS hit_count
       FROM ${DOMAIN_QUERIES_TABLE} q
       LEFT JOIN surge_logs l ON l.hostname = q.domain
       WHERE q.kind = 'ai'
       ORDER BY q.id DESC LIMIT ?`,
      [Math.max(1, Math.min(50, limit))]
    );
    return rows.map((row) => ({
      ts: String(row.created_at ?? ""),
      domain: String(row.domain ?? ""),
      action: String(row.action ?? ""),
      confidence: Number(row.confidence) || 0,
      reason: String(row.comment ?? ""),
      model: String(row.model_name ?? ""),
      hits: Number(row.hit_count) || 0
    }));
  } catch {
    return [];
  }
}
__name(recentVerdictRecords, "recentVerdictRecords");
async function modelHistoryRecords(db, model, limit = 20) {
  const name = String(model ?? "").trim().slice(0, 128);
  if (!name) return [];
  try {
    const rows = await db.execute(
      `SELECT domain, action, confidence, model_name, comment, created_at
       FROM ${DOMAIN_QUERIES_TABLE} WHERE kind = 'ai' AND model_name = ?
       ORDER BY id DESC LIMIT ?`,
      [name, Math.max(1, Math.min(50, limit))]
    );
    return rows.map((row) => ({
      ts: String(row.created_at ?? ""),
      domain: String(row.domain ?? ""),
      action: String(row.action ?? ""),
      confidence: Number(row.confidence) || 0,
      reason: String(row.comment ?? ""),
      model: String(row.model_name ?? "")
    }));
  } catch {
    return [];
  }
}
__name(modelHistoryRecords, "modelHistoryRecords");
async function status(context2, db) {
  const gate = await guardAi(context2, db, "ai.status");
  if (!gate.ok) return gate.response;
  const config2 = await loadAiConfig(db);
  const [stats, state, runtime, recentVerdicts] = await Promise.all([
    verdictQueueStats(db),
    loadAiState(db),
    loadRuntime(db),
    recentVerdictRecords(db)
  ]);
  const view = runtimeView(config2, runtime);
  const intervalMs = config2.intervalMinutes * 60 * 1e3;
  const lastFinish = Date.parse(state.last_finish_at || "");
  const drained = Number(state.last_summary?.remaining ?? 0) === 0;
  const nextRunAt = drained && Number.isFinite(lastFinish) && lastFinish > 0 ? new Date(lastFinish + intervalMs).toISOString() : "";
  return jsonResponse(
    {
      success: true,
      data: {
        enabled: config2.enabled,
        config: publicAiConfig(config2),
        queue: stats,
        /** 多账号 / 模型运行态：状态、成功计数、恢复倒计时（面板监控视图用） */
        runtime: view,
        /** 可用性统计（v1.25）：凭证 / 账号 / 可用模型 / 失败 / 成功 / 是否可用 */
        stats: runtimeStats(view),
        /** 最近识别记录（v1.25）：动作 / 域名 / 置信度 / 注释 / 模型，最多 20 条 */
        recentVerdicts,
        running: Boolean(state.running),
        lastRunAt: state.last_run_at || "",
        lastFinishAt: state.last_finish_at || "",
        lastSummary: state.last_summary || null,
        nextRunAt
      }
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
__name(status, "status");
async function history(context2, db, url) {
  const model = String(url.searchParams.get("model") ?? "").trim();
  if (model) {
    const records = await modelHistoryRecords(db, model);
    return jsonResponse(
      { success: true, data: { model: model.slice(0, 128), history: records } },
      { headers: { "Cache-Control": "no-store" } }
    );
  }
  const domain2 = normalizeDomain(url.searchParams.get("domain"));
  if (!domain2) return badRequest("\u7F3A\u5C11 domain \u53C2\u6570");
  const data = await getDomainHistory(db, domain2);
  return jsonResponse({ success: true, data }, { headers: { "Cache-Control": "no-store" } });
}
__name(history, "history");
async function usage(context2, db, url) {
  const force = url.searchParams.get("force") === "1";
  const gate = await guardAi(context2, db, force ? "ai.config" : "usage.cloudflare");
  if (!gate.ok) return gate.response;
  const config2 = await loadAiConfig(db, context2.env);
  const tzOffsetMinutes = clientTzOffsetFromHeader(
    context2.request.headers.get("x-panel-tz-offset")
  );
  const data = await getCfUsage(config2, { force, tzOffsetMinutes });
  return jsonResponse({ success: true, data }, { headers: { "Cache-Control": "no-store" } });
}
__name(usage, "usage");

// api/ai.js
var TAG2 = "api/ai";
async function onRequest2(context2) {
  const { adapter: db, response } = await resolveAdapter(context2.env);
  if (response) return response;
  await db.ready;
  const url = new URL(context2.request.url);
  const path = url.pathname;
  const method = context2.request.method;
  try {
    if (method === "GET" && path === "/api/ai/config") return getConfig(context2, db);
    if (method === "POST" && path === "/api/ai/config") return saveConfig(context2, db);
    if (method === "GET" && path === "/api/ai/models") return getModels(context2, db);
    if (method === "POST" && path === "/api/ai/models") return pullRelayModels(context2, db);
    if (method === "POST" && path === "/api/ai/test") return test(context2, db);
    if (method === "GET" && path === "/api/ai/status") return status(context2, db);
    if (method === "GET" && path === "/api/ai/history") return history(context2, db, url);
    if (method === "GET" && path === "/api/ai/usage") return usage(context2, db, url);
    if (method === "POST" && path === "/api/ai/query") return query(context2, db);
    if (method === "POST" && path === "/api/ai/run") return run(context2, db, url);
    if (method === "POST" && path === "/api/ai/judge") return judge(context2, db);
    if (method === "POST" && path === "/api/ai/sample") return sample(context2, db);
    if (method === "POST" && path === "/api/ai/reset") return reset(context2, db);
    if (method === "GET") return notFound(`\u672A\u77E5\u7684\u63A5\u53E3\uFF1A${path}`);
    return methodNotAllowed(method, "GET, POST");
  } catch (error3) {
    return errorResponse(TAG2, method, path, error3);
  }
}
__name(onRequest2, "onRequest");

// _utils/panel-config.js
var PANEL_CONFIG_USER = "system";
var PANEL_CONFIG_KEY = "panel.config";
var PANEL_DEFAULT_CONFIG = Object.freeze({ recordSourceIp: true });
var CACHE_TTL_MS3 = 15 * 1e3;
var cache3 = null;
function invalidatePanelConfigCache() {
  cache3 = null;
}
__name(invalidatePanelConfigCache, "invalidatePanelConfigCache");
function toBool2(value, fallback) {
  if (typeof value === "boolean") return value;
  if (value === "true" || value === 1 || value === "1") return true;
  if (value === "false" || value === 0 || value === "0") return false;
  return fallback;
}
__name(toBool2, "toBool");
function parsePanelConfig(raw) {
  let parsed = null;
  try {
    parsed = JSON.parse(String(raw ?? ""));
  } catch {
    parsed = null;
  }
  const source = parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  return {
    recordSourceIp: toBool2(source.recordSourceIp, PANEL_DEFAULT_CONFIG.recordSourceIp)
  };
}
__name(parsePanelConfig, "parsePanelConfig");
async function readPanelConfig(db) {
  if (cache3 && Date.now() - cache3.at < CACHE_TTL_MS3) return cache3.value;
  let value = PANEL_DEFAULT_CONFIG;
  try {
    const rows = await db.execute(
      `SELECT setting_value FROM ${PREFS_TABLE} WHERE user_id = ? AND setting_key = ?`,
      [PANEL_CONFIG_USER, PANEL_CONFIG_KEY]
    );
    value = parsePanelConfig(rows[0]?.setting_value);
  } catch {
  }
  cache3 = { value, at: Date.now() };
  return value;
}
__name(readPanelConfig, "readPanelConfig");
async function writePanelConfig(db, patch = {}) {
  const current = await readPanelConfig(db);
  const next = {
    recordSourceIp: patch.recordSourceIp === void 0 ? current.recordSourceIp : toBool2(patch.recordSourceIp, current.recordSourceIp)
  };
  const now2 = (/* @__PURE__ */ new Date()).toISOString();
  await db.batch([
    {
      sql: `INSERT INTO ${PREFS_TABLE} (user_id, setting_key, setting_value, updated_at)
            VALUES (?, ?, ?, ?)
            ON CONFLICT(user_id, setting_key) DO UPDATE SET setting_value = excluded.setting_value, updated_at = excluded.updated_at`,
      params: [PANEL_CONFIG_USER, PANEL_CONFIG_KEY, JSON.stringify(next), now2]
    }
  ]);
  invalidatePanelConfigCache();
  return next;
}
__name(writePanelConfig, "writePanelConfig");

// _utils/api-constants.js
var CACHE_OK = { "Cache-Control": "public, max-age=30" };
var CACHE_PRIVATE = { "Cache-Control": "private, max-age=30" };
var NO_CACHE = { "Cache-Control": "no-store" };
function normalizePath(path) {
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path;
}
__name(normalizePath, "normalizePath");

// api/_auth/routes-client.js
async function handleConnect(context2, db) {
  const key = String(context2.request.headers.get("x-final-key") ?? "").trim();
  if (!key) {
    return jsonResponse(
      // v9 起 FINAL_KEY 参数已废弃（密钥由 FINAL_UID 自动换取）：错误文案指向新参数，
      // 否则照着旧文案去配置一个不再存在的参数，用户永远连不上（审计 P3-25）
      {
        success: false,
        code: "key-required",
        error: "\u7F3A\u5C11 X-Final-Key \u8BF7\u6C42\u5934\uFF1A\u8BF7\u5728\u6A21\u7EC4\u53C2\u6570\u91CC\u914D\u7F6E FINAL_UID\uFF08\u9762\u677F\u5237\u65B0\u4E00\u6B21\u5373\u81EA\u52A8\u83B7\u53D6\u5BC6\u94A5\uFF09"
      },
      { status: 401, headers: NO_CACHE }
    );
  }
  const principal = await resolvePrincipal(
    context2.env,
    db,
    context2.request,
    extractToken(context2.request),
    context2
  );
  if (principal?.type === "invalid-key") {
    const status4 = principal.code === "key-rate-limited" ? 429 : principal.code === "user-disabled" ? 403 : 401;
    const messages = {
      "key-invalid": "\u5BC6\u94A5\u65E0\u6548\uFF1A\u4E0D\u5339\u914D\u4EFB\u4F55\u7528\u6237\uFF0C\u8BF7\u5230\u9762\u677F\u300C\u7528\u6237\u300D\u9875\u6838\u5BF9\u6216\u91CD\u65B0\u751F\u6210",
      "user-disabled": "\u5BC6\u94A5\u5BF9\u5E94\u7684\u8D26\u53F7\u5DF2\u88AB\u7981\u7528\uFF1A\u8BF7\u8054\u7CFB\u7BA1\u7406\u5458",
      "key-rate-limited": "\u5BC6\u94A5\u9274\u6743\u5931\u8D25\u6B21\u6570\u8FC7\u591A\uFF1A\u8BF7 1 \u5206\u949F\u540E\u91CD\u8BD5"
    };
    return jsonResponse(
      {
        success: false,
        code: principal.code,
        error: messages[principal.code] ?? "\u5BC6\u94A5\u9274\u6743\u5931\u8D25"
      },
      { status: status4, headers: NO_CACHE }
    );
  }
  if (principal?.type !== "user") {
    return jsonResponse(
      { success: false, code: "key-invalid", error: "\u5BC6\u94A5\u65E0\u6548\uFF1A\u4E0D\u5339\u914D\u4EFB\u4F55\u7528\u6237" },
      { status: 401, headers: NO_CACHE }
    );
  }
  const device = parseDeviceHeaders(context2.request);
  const refreshSeconds = device.refreshSeconds;
  return jsonResponse(
    {
      success: true,
      data: {
        user: {
          id: principal.user.id,
          username: principal.user.username,
          displayName: principal.user.displayName,
          role: principal.user.role
        },
        onlineWindowMs: offlineWindowMs(refreshSeconds),
        serverVersion: COMPONENT_VERSIONS.panel,
        components: COMPONENT_VERSIONS
      }
    },
    { headers: NO_CACHE }
  );
}
__name(handleConnect, "handleConnect");
async function handleHeartbeat(context2, db) {
  const report2 = await requireReportAuth(context2.env, db, context2);
  if (!report2.ok) return report2.response;
  const device = parseDeviceHeaders(context2.request);
  const windowMs = offlineWindowMs(device.refreshSeconds);
  return jsonResponse(
    {
      success: true,
      data: {
        ok: true,
        onlineUntil: new Date(Date.now() + windowMs).toISOString(),
        onlineWindowMs: windowMs,
        identity: report2.principal?.via === "user-key" ? { username: report2.principal.user.username, via: "user-key" } : { via: report2.principal?.via ?? "hit-token" }
      }
    },
    { headers: NO_CACHE }
  );
}
__name(handleHeartbeat, "handleHeartbeat");

// api/_auth/routes.js
function loginResponse(token, expiresAt, user) {
  return jsonResponse(
    {
      success: true,
      data: {
        token,
        expiresAt,
        user
      }
    },
    { headers: NO_CACHE }
  );
}
__name(loginResponse, "loginResponse");
async function handleBootstrap(context2, db) {
  if (await hasAnyUser(db)) {
    return jsonResponse(
      { success: false, error: "\u9274\u6743\u4F53\u7CFB\u5DF2\u521D\u59CB\u5316\uFF1A\u7BA1\u7406\u5458\u5DF2\u5B58\u5728\uFF0C\u8BF7\u76F4\u63A5\u767B\u5F55" },
      { status: 409, headers: NO_CACHE }
    );
  }
  const parsed = await readJson(context2);
  if (!parsed.ok) return badRequest("\u8BF7\u6C42\u4F53\u4E0D\u662F\u6709\u6548\u7684 JSON");
  const { username, password, displayName } = parsed.value ?? {};
  const usernameError = validateUsername(username);
  if (usernameError) return badRequest(usernameError);
  const passwordError = validatePasswordStrength(password);
  if (passwordError) return badRequest(passwordError);
  const passwordHash = await hashPassword(password);
  let user;
  try {
    user = await createUser(db, {
      username: String(username).trim(),
      passwordHash,
      role: "admin",
      displayName
    });
  } catch (error3) {
    if (constraintTargetOf(error3)) {
      return jsonResponse(
        { success: false, error: "\u9274\u6743\u4F53\u7CFB\u5DF2\u521D\u59CB\u5316\uFF1A\u7BA1\u7406\u5458\u5DF2\u5B58\u5728\uFF0C\u8BF7\u76F4\u63A5\u767B\u5F55" },
        { status: 409, headers: NO_CACHE }
      );
    }
    throw error3;
  }
  invalidateAuthStateCache();
  const session = await createSession(db, user.id, {
    userAgent: context2.request.headers.get("user-agent") ?? ""
  });
  await recordAudit(
    db,
    null,
    "admin.bootstrap",
    "user",
    user.id,
    user.username,
    "\u5F15\u5BFC\u521B\u5EFA\u9996\u4F4D\u8D85\u7EA7\u7BA1\u7406\u5458"
  );
  return loginResponse(session.token, session.expiresAt, user);
}
__name(handleBootstrap, "handleBootstrap");
var LOGIN_RATE_WINDOW_MS = 60 * 1e3;
var LOGIN_RATE_LIMIT = 10;
var LOGIN_USER_RATE_LIMIT = 5;
function loginRateGate(request, username) {
  const ipGateKey = `login:${clientIp(request)}`;
  const userGateKey = `login:${clientIp(request)}:${String(username ?? "").slice(0, 64)}`;
  const ipGate = hitRateLimit(ipGateKey, LOGIN_RATE_LIMIT, LOGIN_RATE_WINDOW_MS);
  const userGate = ipGate.allowed ? hitRateLimit(userGateKey, LOGIN_USER_RATE_LIMIT, LOGIN_RATE_WINDOW_MS) : ipGate;
  return {
    allowed: userGate.allowed,
    retryAfterMs: userGate.retryAfterMs,
    ipGateKey,
    userGateKey
  };
}
__name(loginRateGate, "loginRateGate");
async function handleLogin(context2, db) {
  const parsed = await readJson(context2);
  if (!parsed.ok) return badRequest("\u8BF7\u6C42\u4F53\u4E0D\u662F\u6709\u6548\u7684 JSON");
  const { username, password } = parsed.value ?? {};
  if (!username || !password) return badRequest("\u7528\u6237\u540D\u4E0E\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A");
  const gate = loginRateGate(context2.request, username);
  if (!gate.allowed)
    return tooManyRequests("\u767B\u5F55\u5C1D\u8BD5\u8FC7\u4E8E\u9891\u7E41\uFF1A\u8BF7 1 \u5206\u949F\u540E\u91CD\u8BD5", gate.retryAfterMs);
  const row = await getUserByUsername(db, username);
  if (!row) return unauthorized("\u7528\u6237\u540D\u6216\u5BC6\u7801\u9519\u8BEF");
  const passwordOk = await verifyPassword(password, row.password_hash);
  if (!passwordOk) return unauthorized("\u7528\u6237\u540D\u6216\u5BC6\u7801\u9519\u8BEF");
  if (passwordOk && isLegacyBuiltinCredential(row, password)) {
    return unauthorized("\u7528\u6237\u540D\u6216\u5BC6\u7801\u9519\u8BEF");
  }
  if (String(row.status ?? "active") !== "active") {
    return jsonResponse(
      { success: false, error: "\u8D26\u53F7\u5DF2\u88AB\u7981\u7528\uFF1A\u8BF7\u8054\u7CFB\u7BA1\u7406\u5458" },
      { status: 403, headers: NO_CACHE }
    );
  }
  const user = {
    id: Number(row.id),
    username: String(row.username ?? ""),
    displayName: String(row.display_name ?? ""),
    role: String(row.role ?? "user"),
    groupId: row.group_id == null ? null : Number(row.group_id),
    status: String(row.status ?? "active")
  };
  const session = await createSession(db, user.id, {
    userAgent: context2.request.headers.get("user-agent") ?? ""
  });
  await markUserLogin(db, user.id);
  clearRateLimit(gate.userGateKey);
  clearRateLimit(gate.ipGateKey);
  return loginResponse(session.token, session.expiresAt, user);
}
__name(handleLogin, "handleLogin");
async function handleLogout(context2, db) {
  const token = extractToken(context2.request);
  await deleteSession(db, token);
  return jsonResponse({ success: true, data: { loggedOut: true } }, { headers: NO_CACHE });
}
__name(handleLogout, "handleLogout");
async function handleMe(context2, db) {
  const token = extractToken(context2.request) || new URL(context2.request.url).searchParams.get("token") || "";
  const principal = await resolvePrincipal(context2.env, db, context2.request, token, context2);
  const authEnabled = await isAuthEnabled(db);
  const [featureAccess, systemConfig] = await Promise.all([
    evaluateAllFeatures(principal, { db }),
    readPanelConfig(db)
  ]);
  const data = {
    authenticated: Boolean(principal),
    authEnabled,
    isAdmin: isPrincipalAdmin(principal),
    features: FEATURES,
    featureDefaults: FEATURE_DEFAULTS,
    featureAccess,
    systemConfig
  };
  if (principal?.type === "user") {
    data.user = principal.user;
    data.session = { expiresAt: principal.session.expiresAt };
  } else if (principal?.type === "token") {
    data.tokenAuth = { role: principal.role, via: principal.via };
  }
  return jsonResponse({ success: true, data }, { headers: NO_CACHE });
}
__name(handleMe, "handleMe");
async function handleChangePassword(context2, db) {
  const token = extractToken(context2.request);
  const principal = await resolvePrincipal(context2.env, db, context2.request, token, context2);
  if (principal?.type !== "user" || principal.via === "user-key") {
    return unauthorized("\u8BF7\u5148\u767B\u5F55\u8D26\u53F7\uFF08\u5BC6\u94A5\u8EAB\u4EFD\u4E0D\u652F\u6301\u6539\u5BC6\uFF09");
  }
  const parsed = await readJson(context2);
  if (!parsed.ok) return badRequest("\u8BF7\u6C42\u4F53\u4E0D\u662F\u6709\u6548\u7684 JSON");
  const { currentPassword, newPassword } = parsed.value ?? {};
  if (!currentPassword || !newPassword) return badRequest("\u5F53\u524D\u5BC6\u7801\u4E0E\u65B0\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A");
  const passwordError = validatePasswordStrength(newPassword);
  if (passwordError) return badRequest(passwordError);
  const row = await getUserByUsername(db, principal.user.username);
  if (!row) return notFound("\u7528\u6237\u4E0D\u5B58\u5728");
  if (!await verifyPassword(currentPassword, row.password_hash)) {
    return unauthorized("\u5F53\u524D\u5BC6\u7801\u4E0D\u6B63\u786E");
  }
  const passwordHash = await hashPassword(newPassword);
  await updateUser(db, row.id, { passwordHash });
  await db.execute(`DELETE FROM auth_sessions WHERE user_id = ? AND token_hash != ?`, [
    row.id,
    principal.session.tokenHash
  ]);
  return jsonResponse({ success: true, data: { changed: true } }, { headers: NO_CACHE });
}
__name(handleChangePassword, "handleChangePassword");

// api/auth.js
var TAG3 = "api/auth";
var POST_PATHS = /* @__PURE__ */ new Set([
  "bootstrap",
  "login",
  "logout",
  "change-password",
  "connect",
  "heartbeat"
]);
var GET_PATHS = /* @__PURE__ */ new Set(["me"]);
async function onRequest3(context2) {
  const { adapter: db, response } = await resolveAdapter(context2.env);
  if (response) return response;
  const url = new URL(context2.request.url);
  const method = context2.request.method;
  const sub = url.pathname.replace(/^\/api\/auth\/?/, "").replace(/\/+$/, "");
  const isRoot = url.pathname === "/api/auth" || url.pathname === "/api/auth/";
  try {
    await db.ready;
    if (isRoot) return methodNotAllowed(method, "GET, POST");
    if (method === "POST" && POST_PATHS.has(sub)) {
      if (sub === "bootstrap") return await handleBootstrap(context2, db);
      if (sub === "login") return await handleLogin(context2, db);
      if (sub === "logout") return await handleLogout(context2, db);
      if (sub === "change-password") return await handleChangePassword(context2, db);
      if (sub === "connect") return await handleConnect(context2, db);
      if (sub === "heartbeat") return await handleHeartbeat(context2, db);
    }
    if (method === "GET" && GET_PATHS.has(sub)) {
      if (sub === "me") return await handleMe(context2, db);
    }
    if (POST_PATHS.has(sub) || GET_PATHS.has(sub)) {
      return methodNotAllowed(method, POST_PATHS.has(sub) ? "POST" : "GET");
    }
    return notFound(`\u672A\u77E5\u7684\u9274\u6743\u63A5\u53E3\uFF1A/api/auth/${sub}`);
  } catch (error3) {
    return errorResponse(TAG3, method, url.pathname, error3);
  }
}
__name(onRequest3, "onRequest");

// api/devices.js
var TAG4 = "api/devices";
var CLEANUP_MODES = ["unbound", "offline", "duplicates", "older"];
async function onRequest4(context2) {
  const { adapter: db, response } = await resolveAdapter(context2.env);
  if (response) return response;
  await db.ready;
  const url = new URL(context2.request.url);
  return handleDevicesRequest(
    context2,
    db,
    url.pathname.replace(/\/+$/, "") || "/",
    context2.request.method
  );
}
__name(onRequest4, "onRequest");
async function guard(context2, db) {
  return guardPrincipal(context2.env, db, context2.request, context2, {
    auth: "admin",
    feature: "devices.view"
  });
}
__name(guard, "guard");
async function handleCleanup(context2, db) {
  const gate = await guard(context2, db);
  if (!gate.ok) return gate.response;
  const parsed = await readJson(context2);
  if (!parsed.ok) return badRequest("\u8BF7\u6C42\u4F53\u4E0D\u662F\u6709\u6548\u7684 JSON");
  const body = parsed.value ?? {};
  const mode = String(body.mode ?? "unbound");
  if (!CLEANUP_MODES.includes(mode)) {
    return badRequest(`mode \u5FC5\u987B\u662F\uFF1A${CLEANUP_MODES.join(" / ")}`);
  }
  const olderThanDays = Number(body.olderThanDays);
  const [devices, users] = await Promise.all([
    listDevices(db, { limit: 500, collapse: false }),
    mode === "unbound" ? listUsers(db) : Promise.resolve([])
  ]);
  const targets = selectCleanupTargets(devices, {
    mode,
    olderThanDays,
    boundUsernames: users.map((user) => user.username)
  });
  const deleted = await deleteDevicesByIds(
    db,
    targets.map((device) => device.deviceId)
  );
  return jsonResponse(
    {
      success: true,
      data: {
        mode,
        deleted: deleted.length,
        devices: targets.map((device) => ({
          deviceId: device.deviceId,
          name: device.name,
          username: device.username,
          lastOnlineTime: device.lastOnlineTime
        }))
      }
    },
    { headers: NO_CACHE }
  );
}
__name(handleCleanup, "handleCleanup");
async function handleDeleteDevice(context2, db, deviceId) {
  const gate = await guard(context2, db);
  if (!gate.ok) return gate.response;
  const id = String(deviceId ?? "").trim();
  if (!id) return badRequest("\u7F3A\u5C11\u8BBE\u5907\u6807\u8BC6");
  const devices = await listDevices(db, { limit: 500, collapse: false });
  if (!devices.some((device) => device.deviceId === id)) return notFound("\u8BBE\u5907\u4E0D\u5B58\u5728\u6216\u5DF2\u88AB\u6E05\u7406");
  const deleted = await deleteDevicesByIds(db, [id]);
  return jsonResponse(
    { success: true, data: { deleted: deleted.length, deviceId: id } },
    { headers: NO_CACHE }
  );
}
__name(handleDeleteDevice, "handleDeleteDevice");
async function handleDevicesRequest(context2, db, path, method) {
  try {
    if (path === "/api/devices/cleanup") {
      if (method === "POST") return await handleCleanup(context2, db);
      return methodNotAllowed(method, "POST");
    }
    const item = path.match(/^\/api\/devices\/(.+)$/);
    if (item) {
      if (method === "DELETE")
        return await handleDeleteDevice(context2, db, decodeURIComponent(item[1]));
      return methodNotAllowed(method, "DELETE");
    }
    return notFound(`\u672A\u77E5\u7684\u63A5\u53E3\uFF1A${path}`);
  } catch (error3) {
    return errorResponse(TAG4, method, path, error3);
  }
}
__name(handleDevicesRequest, "handleDevicesRequest");

// api/export-policies.js
var TAG5 = "api/export-policies";
var ALLOW_METHODS = "GET, POST, PATCH, DELETE";
async function guardWrite(context2, db) {
  return guardPrincipal(context2.env, db, context2.request, context2, {
    auth: "mutation",
    feature: "export.filter"
  });
}
__name(guardWrite, "guardWrite");
async function handleListExportPolicies(context2, db) {
  const policies = await listExportPolicies(db);
  return jsonResponse({ success: true, data: policies }, { headers: NO_CACHE });
}
__name(handleListExportPolicies, "handleListExportPolicies");
async function handleCreateExportPolicy(context2, db) {
  const gate = await guardWrite(context2, db);
  if (!gate.ok) return gate.response;
  const parsed = await readJson(context2);
  if (!parsed.ok) return badRequest("\u8BF7\u6C42\u4F53\u4E0D\u662F\u6709\u6548\u7684 JSON");
  const body = parsed.value ?? {};
  const keyError = validatePolicyKey(body.policyKey);
  if (keyError) return badRequest(keyError);
  const existing = await getExportPolicyByKey(db, body.policyKey);
  if (existing) return badRequest(`\u7B56\u7565\u5DF2\u5B58\u5728\uFF1A${existing.policyKey}`);
  const created = await createExportPolicy(db, {
    policyKey: body.policyKey,
    label: body.label,
    emoji: body.emoji
  }).catch((error3) => {
    if (constraintTargetOf(error3)) return null;
    throw error3;
  });
  if (!created) return badRequest("\u7B56\u7565\u521B\u5EFA\u51B2\u7A81\uFF08\u5E76\u53D1\uFF09\uFF0C\u8BF7\u91CD\u8BD5");
  return jsonResponse({ success: true, data: created }, { status: 201, headers: NO_CACHE });
}
__name(handleCreateExportPolicy, "handleCreateExportPolicy");
async function handlePatchExportPolicy(context2, db, id) {
  const gate = await guardWrite(context2, db);
  if (!gate.ok) return gate.response;
  const existing = await getExportPolicyById(db, id);
  if (!existing) return notFound("\u7B56\u7565\u4E0D\u5B58\u5728");
  const parsed = await readJson(context2);
  if (!parsed.ok) return badRequest("\u8BF7\u6C42\u4F53\u4E0D\u662F\u6709\u6548\u7684 JSON");
  const body = parsed.value ?? {};
  if (existing.isBuiltin && body.policyKey !== void 0 && normalizePolicyKey(body.policyKey) !== existing.policyKey) {
    return badRequest(`\u5185\u7F6E\u7B56\u7565 ${BUILTIN_EXPORT_POLICY} \u7684\u952E\u4E0D\u53EF\u4FEE\u6539`);
  }
  if (body.gistUrl !== void 0) {
    const urlError = validateGistUrl(body.gistUrl);
    if (urlError) return badRequest(urlError);
  }
  if (body.syncMinutes !== void 0) {
    const minutesError = validateSyncMinutes(body.syncMinutes);
    if (minutesError) return badRequest(minutesError);
  }
  if (body.icon !== void 0) {
    const iconError = validateIconUrl(body.icon);
    if (iconError) return badRequest(iconError);
  }
  const updated = await updateExportPolicy(db, id, {
    label: body.label === void 0 ? existing.label : String(body.label).trim(),
    emoji: body.emoji === void 0 ? existing.emoji : String(body.emoji).trim(),
    gistEnabled: body.gistEnabled === void 0 ? void 0 : Boolean(body.gistEnabled),
    gistUrl: body.gistUrl === void 0 ? void 0 : String(body.gistUrl ?? "").trim(),
    syncMinutes: body.syncMinutes === void 0 ? void 0 : Number(body.syncMinutes) || 0,
    groupName: body.groupName === void 0 ? void 0 : String(body.groupName ?? "").trim(),
    icon: body.icon === void 0 ? void 0 : String(body.icon ?? "").trim()
  });
  return jsonResponse({ success: true, data: updated }, { headers: NO_CACHE });
}
__name(handlePatchExportPolicy, "handlePatchExportPolicy");
async function handleDeleteExportPolicy(context2, db, id) {
  const gate = await guardWrite(context2, db);
  if (!gate.ok) return gate.response;
  const existing = await getExportPolicyById(db, id);
  if (!existing) return notFound("\u7B56\u7565\u4E0D\u5B58\u5728");
  if (existing.isBuiltin) {
    return badRequest(`\u5185\u7F6E\u7B56\u7565 ${BUILTIN_EXPORT_POLICY} \u4E0D\u53EF\u5220\u9664\uFF1A\u5B83\u662F\u62E6\u622A\u89C4\u5219\u7684\u6807\u51C6\u8BA2\u9605\u5730\u5740`);
  }
  const deleted = await deleteExportPolicy(db, id);
  return jsonResponse({ success: true, data: { deleted } }, { headers: NO_CACHE });
}
__name(handleDeleteExportPolicy, "handleDeleteExportPolicy");
async function handleExportPoliciesRequest(context2, db, path, method) {
  try {
    if (path === "/api/export-policies") {
      if (method === "GET") return await handleListExportPolicies(context2, db);
      if (method === "POST") return await handleCreateExportPolicy(context2, db);
      return methodNotAllowed(method, ALLOW_METHODS);
    }
    const item = path.match(/^\/api\/export-policies\/(\d+)$/);
    if (item) {
      if (method === "PATCH") return await handlePatchExportPolicy(context2, db, item[1]);
      if (method === "DELETE") return await handleDeleteExportPolicy(context2, db, item[1]);
      return methodNotAllowed(method, "PATCH, DELETE");
    }
    return notFound(`\u672A\u77E5\u7684\u63A5\u53E3\uFF1A${path}`);
  } catch (error3) {
    return errorResponse(TAG5, method, path, error3);
  }
}
__name(handleExportPoliciesRequest, "handleExportPoliciesRequest");
async function onRequest5(context2) {
  const { adapter: db, response } = await resolveAdapter(context2.env);
  if (response) return response;
  await db.ready;
  const url = new URL(context2.request.url);
  return handleExportPoliciesRequest(
    context2,
    db,
    url.pathname.replace(/\/+$/, "") || "/",
    context2.request.method
  );
}
__name(onRequest5, "onRequest");

// _utils/logs/query.js
function effectivePolicyExpr(alias = "s") {
  return `COALESCE(NULLIF(ro.policy, ''), NULLIF(d.best_action, ''), 'PROXY')`;
}
__name(effectivePolicyExpr, "effectivePolicyExpr");
function logKeyExpr(alias = "s") {
  return `${alias}.match_key`;
}
__name(logKeyExpr, "logKeyExpr");
var OVERRIDES_JOIN = `LEFT JOIN ${RULE_OVERRIDES_TABLE} ro ON ro.hostname = s.hostname`;
var SUMMARY_JOIN = `LEFT JOIN ${DOMAIN_SUMMARY_TABLE} d ON d.domain = ${logKeyExpr("s")}`;
function pushSearch(conditions, params, search) {
  const like = `%${likeEscape(search)}%`;
  conditions.push(
    `(s.hostname LIKE ? ESCAPE '\\'
       OR COALESCE(s.value, '') LIKE ? ESCAPE '\\'
       OR ${effectivePolicyExpr()} LIKE ? ESCAPE '\\'
       OR COALESCE(s.source, '') LIKE ? ESCAPE '\\'
       OR COALESCE(s.ip, '') LIKE ? ESCAPE '\\'
       OR COALESCE(s.username, '') LIKE ? ESCAPE '\\'
       OR COALESCE(ro.comment, '') LIKE ? ESCAPE '\\'
       OR COALESCE(d.pinned_comment, '') LIKE ? ESCAPE '\\'
       OR COALESCE(d.latest_comment, '') LIKE ? ESCAPE '\\')`
  );
  params.push(like, like, like, like, like, like, like, like, like);
}
__name(pushSearch, "pushSearch");
function pushMinCount(conditions, params, minCount) {
  const value = Math.floor(Number(minCount) || 0);
  if (value > 1) {
    conditions.push(`s.count >= ?`);
    params.push(value);
  }
}
__name(pushMinCount, "pushMinCount");
function normalizePolicyText(policy) {
  return String(policy || "ALL").trim().toUpperCase() === "ALL" ? "ALL" : normalizeRulePolicy(policy);
}
__name(normalizePolicyText, "normalizePolicyText");
function clampLimit(value) {
  return Math.max(1, Math.min(Number(value) || 5e3, 2e4));
}
__name(clampLimit, "clampLimit");
async function listLogs(db, { search = "", policy = "ALL", type = "ALL", minCount = 0, limit = 5e3 } = {}) {
  const conditions = [];
  const params = [];
  if (search) pushSearch(conditions, params, search);
  const policyKey = String(policy || "ALL").trim().toUpperCase();
  if (policyKey === "MANUAL") {
    conditions.push("s.manual_edited = 1");
  } else {
    const policyText = normalizePolicyText(policy);
    if (policyText !== "ALL") {
      conditions.push(`${effectivePolicyExpr()} = ?`);
      params.push(policyText);
    }
  }
  const typeText = String(type || "ALL").trim().toUpperCase();
  if (typeText !== "ALL") {
    if (!RULE_TYPES.has(typeText)) return [];
    conditions.push("s.type = ?");
    params.push(typeText);
  }
  pushMinCount(conditions, params, minCount);
  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const rows = await db.execute(
    `SELECT s.*, ro.policy AS override_policy, ro.comment AS override_comment,
            d.best_action AS ai_best, d.direct_votes AS ai_direct, d.proxy_votes AS ai_proxy,
            d.reject_votes AS ai_reject, d.avg_confidence AS ai_confidence,
            d.last_checked_at AS ai_checked_at, d.cooldown_days AS ai_cooldown_days,
            d.latest_comment AS ai_comment, d.pinned_comment, d.pinned_kind
       FROM ${LOGS_TABLE} s
       ${OVERRIDES_JOIN}
       ${SUMMARY_JOIN}
       ${where}
       ORDER BY s.time DESC, s.id DESC LIMIT ?`,
    [...params, clampLimit(limit)]
  );
  return rows.map(normalizeLogRow);
}
__name(listLogs, "listLogs");
async function getAllLogs(db, { minCount = 0, policy = "ALL", source = "", cutoffIso = "" } = {}) {
  const conditions = [];
  const params = [];
  pushMinCount(conditions, params, minCount);
  const policyKey = String(policy ?? "ALL").trim().toUpperCase();
  if (policyKey && policyKey !== "ALL") {
    conditions.push(`${effectivePolicyExpr()} = ?`);
    params.push(normalizeRulePolicy(policyKey));
  }
  const sourceKey = normalizeSource(source);
  if (sourceKey) {
    conditions.push("source = ?");
    params.push(sourceKey);
  }
  if (cutoffIso) {
    conditions.push("time >= ?");
    params.push(cutoffIso);
  }
  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const rows = await db.execute(
    `SELECT s.id, s.hostname, s.type, s.value, s.params, s.source, s.ip, s.username,
            s.first_time, s.time, s.count, s.manual_edited, s.ai_processed,
            ro.policy AS override_policy, ro.comment AS override_comment,
            d.best_action AS ai_best, d.latest_comment AS ai_comment,
            d.pinned_comment, d.pinned_kind
       FROM ${LOGS_TABLE} s
       ${OVERRIDES_JOIN}
       ${SUMMARY_JOIN}
       ${where} ORDER BY s.time DESC, s.id DESC`,
    params
  );
  return rows.map(normalizeLogRow);
}
__name(getAllLogs, "getAllLogs");
function buildStatsStatements(tzOffsetMinutes) {
  const policyExpr = effectivePolicyExpr();
  return [
    {
      sql: `SELECT COUNT(*) AS v, COALESCE(SUM(s.count), 0) AS hits
             FROM ${LOGS_TABLE} s ${OVERRIDES_JOIN} ${SUMMARY_JOIN}`
    },
    {
      sql: `SELECT COALESCE(SUM(CASE WHEN ${policyExpr} = 'PROXY' THEN 1 ELSE 0 END), 0) AS proxy,
                   COALESCE(SUM(CASE WHEN ${policyExpr} = 'DIRECT' THEN 1 ELSE 0 END), 0) AS direct,
                   COALESCE(SUM(CASE WHEN ${policyExpr} = 'REJECT' THEN 1 ELSE 0 END), 0) AS reject,
                   COALESCE(SUM(CASE WHEN COALESCE(ro.comment, '') = '' AND COALESCE(d.latest_comment, '') = ''
                                       AND COALESCE(d.pinned_comment, '') = '' THEN 1 ELSE 0 END), 0) AS empty_comment
             FROM ${LOGS_TABLE} s ${OVERRIDES_JOIN} ${SUMMARY_JOIN}`
    },
    {
      sql: `SELECT COUNT(*) AS v, COALESCE(SUM(s.count), 0) AS hits
             FROM ${LOGS_TABLE} s WHERE s.time >= ?`,
      params: [startOfClientDay(tzOffsetMinutes)]
    },
    {
      sql: `SELECT COALESCE(NULLIF(TRIM(s.source), ''), '\u672A\u6807\u6CE8') AS v, COUNT(*) AS c FROM ${LOGS_TABLE} s GROUP BY 1 ORDER BY c DESC`
    },
    {
      sql: `SELECT COALESCE(NULLIF(s.type, ''), 'DOMAIN-SUFFIX') AS v, COUNT(*) AS c FROM ${LOGS_TABLE} s GROUP BY 1 ORDER BY c DESC`
    },
    {
      sql: `SELECT COUNT(DISTINCT COALESCE(NULLIF(TRIM(s.source), ''), '\u672A\u6807\u6CE8')) AS v FROM ${LOGS_TABLE} s`
    },
    {
      sql: `SELECT ${policyExpr} AS v, COUNT(*) AS c FROM ${LOGS_TABLE} s ${OVERRIDES_JOIN} ${SUMMARY_JOIN} GROUP BY 1 ORDER BY c DESC`
    },
    { sql: `SELECT COUNT(*) AS v FROM ${LOGS_TABLE} s WHERE s.manual_edited = 1` }
  ];
}
__name(buildStatsStatements, "buildStatsStatements");
function pick(statement) {
  return Number(statement?.rows?.[0]?.v) || 0;
}
__name(pick, "pick");
function pickColumn(statement, column) {
  return Number(statement?.rows?.[0]?.[column]) || 0;
}
__name(pickColumn, "pickColumn");
function grouped(statement) {
  return (statement?.rows ?? []).map((row) => ({
    name: String(row.v),
    count: Number(row.c) || 0
  }));
}
__name(grouped, "grouped");
async function getStats(db, tzOffsetMinutes = 0) {
  const [totals, breakdowns, today, sources, types, sourceCount, policies, manualCount] = await db.batch(buildStatsStatements(tzOffsetMinutes));
  return {
    totalRules: pick(totals),
    totalHits: pickColumn(totals, "hits"),
    proxyCount: pickColumn(breakdowns, "proxy"),
    directCount: pickColumn(breakdowns, "direct"),
    rejectCount: pickColumn(breakdowns, "reject"),
    emptyCommentCount: pickColumn(breakdowns, "empty_comment"),
    // v1.30：今日页两格——今日新增条数 + 今日命中次数（同一条 range 扫描一并带出）
    todayNew: pick(today),
    todayHits: pickColumn(today, "hits"),
    sourceCount: pick(sourceCount),
    manualCount: pick(manualCount),
    sources: grouped(sources).slice(0, 20),
    types: grouped(types).slice(0, 20),
    // 全量来源名（来源数远小于 20 上限的场景几乎不存在，但下拉框需要完整列表）
    sourceNames: grouped(sources).map((item) => item.name).filter((name) => name && name !== "\u672A\u6807\u6CE8"),
    // 全部出现过的生效策略名（含覆盖与 AI 汇总）：编辑弹窗的策略候选与策略筛选共用
    policies: grouped(policies).map((item) => item.name).filter(Boolean)
  };
}
__name(getStats, "getStats");

// _utils/logs/hit.js
var HIT_BATCH_MAX_ITEMS = 200;
var MAX_HOSTNAME_LENGTH = 253;
var MAX_VALUE_LENGTH = 512;
var HIT_BATCH_MAX_COUNT = 1e3;
async function recordHit(db, hostname, {
  source = "",
  ip = "",
  username = "",
  policy = "PROXY",
  type = "UNSET",
  value = "UNSET",
  params = null
} = {}) {
  return recordHits(db, [{ hostname, source, ip, username, policy, type, value, params }]);
}
__name(recordHit, "recordHit");
function normalizeHitInput(item) {
  const target = String(item?.hostname ?? "").trim();
  if (!target || target.length > MAX_HOSTNAME_LENGTH) return null;
  const inferredType = inferHostType(target);
  const type = String(item.type ?? "").trim().toUpperCase();
  const rawValue = String(item.value ?? "").trim().slice(0, MAX_VALUE_LENGTH);
  return {
    hostname: target,
    type: !type || type === "UNSET" ? inferredType : normalizeRuleType(type),
    value: !rawValue || rawValue === "UNSET" ? target : rawValue,
    params: item.params == null ? "" : encodeParams(
      typeof item.params === "string" ? parseParamsText(item.params) : normalizeParamsObject(item.params)
    ),
    source: normalizeSource(item.source),
    ip: normalizeIp(item.ip),
    username: normalizeUsername(item.username),
    count: Math.min(HIT_BATCH_MAX_COUNT, Math.max(1, Math.floor(Number(item.count) || 1)))
  };
}
__name(normalizeHitInput, "normalizeHitInput");
function buildHitStatement(hit, now2) {
  return {
    sql: `INSERT INTO ${LOGS_TABLE} (${WRITE_COLUMNS})
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON CONFLICT(hostname) DO UPDATE SET
            type = CASE WHEN excluded.type = ? THEN ${LOGS_TABLE}.type ELSE excluded.type END,
            value = CASE WHEN ${LOGS_TABLE}.value = '' THEN excluded.value ELSE ${LOGS_TABLE}.value END,
            match_key = CASE WHEN TRIM(${LOGS_TABLE}.value) = '' THEN excluded.match_key ELSE ${LOGS_TABLE}.match_key END,
            count = ${LOGS_TABLE}.count + excluded.count,
            time = excluded.time,
            first_time = COALESCE(NULLIF(${LOGS_TABLE}.first_time, ''), excluded.time),
            source = CASE WHEN ${LOGS_TABLE}.source = '' THEN excluded.source ELSE ${LOGS_TABLE}.source END,
            ip = CASE WHEN ${LOGS_TABLE}.ip = '' THEN excluded.ip ELSE ${LOGS_TABLE}.ip END,
            username = CASE WHEN ${LOGS_TABLE}.username = '' THEN excluded.username ELSE ${LOGS_TABLE}.username END`,
    params: [
      hit.hostname,
      hit.type,
      hit.value,
      hit.params,
      hit.source,
      hit.ip,
      hit.username,
      now2,
      now2,
      hit.count,
      // 判定键与 value 列同源：value 归一化后必非空，兜底再拉一次 hostname
      hit.value || hit.hostname,
      hit.type
    ]
  };
}
__name(buildHitStatement, "buildHitStatement");
async function recordHits(db, items = []) {
  if (!Array.isArray(items) || !items.length) return { accepted: 0, changed: false, rejected: 0 };
  if (items.length > HIT_BATCH_MAX_ITEMS) {
    throw new Error(`\u5355\u6B21\u4E0A\u62A5\u6700\u591A ${HIT_BATCH_MAX_ITEMS} \u6761\u547D\u4E2D`);
  }
  const merged = /* @__PURE__ */ new Map();
  let rejected = 0;
  for (const item of items) {
    const hit = normalizeHitInput(item);
    if (!hit) {
      rejected += 1;
      continue;
    }
    const existing = merged.get(hit.hostname);
    if (existing) {
      existing.count = Math.min(HIT_BATCH_MAX_COUNT, existing.count + hit.count);
    } else {
      merged.set(hit.hostname, hit);
    }
  }
  if (!merged.size) return { accepted: 0, changed: false, rejected };
  const now2 = nowIso();
  const results = await db.batch([...merged.values()].map((hit) => buildHitStatement(hit, now2)));
  return {
    accepted: merged.size,
    changed: results.some((result) => result.changes > 0),
    rejected
  };
}
__name(recordHits, "recordHits");

// _utils/logs/field-update.js
function buildFieldUpdateStatements(target, patched, fields, manualEdited = 1) {
  const { valueType, typeText, validType, paramsText } = fields;
  const sourceText = patched.source === null ? null : normalizeSource(patched.source);
  const effectiveValue = valueType === "UNSET" ? target : valueType;
  return [
    {
      sql: `UPDATE ${LOGS_TABLE}
            SET type = CASE WHEN ? = 'UNSET' THEN type ELSE ? END,
                value = CASE WHEN ? = 'UNSET' THEN value ELSE ? END,
                match_key = CASE WHEN ? = 'UNSET' THEN match_key
                                 ELSE CASE WHEN TRIM(?) = '' THEN hostname ELSE ? END END,
                params = CASE WHEN ? IS NULL THEN params ELSE ? END,
                source = CASE WHEN ? IS NULL THEN source ELSE ? END,
                manual_edited = ?
            WHERE hostname = ?`,
      params: [
        typeText,
        validType,
        valueType,
        valueType === "UNSET" ? "" : valueType,
        valueType,
        valueType === "UNSET" ? "" : valueType,
        valueType === "UNSET" ? "" : valueType,
        paramsText,
        paramsText ?? "",
        sourceText,
        sourceText ?? "",
        manualEdited ? 1 : 0,
        target
      ]
    },
    {
      sql: `INSERT INTO ${LOGS_TABLE} (${WRITE_COLUMNS}, manual_edited)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?)
            ON CONFLICT(hostname) DO NOTHING`,
      params: [
        target,
        validType === "UNSET" ? "DOMAIN-SUFFIX" : validType,
        effectiveValue,
        paramsText || "",
        sourceText === null ? "" : sourceText,
        "",
        "",
        nowIso(),
        nowIso(),
        String(effectiveValue).trim() || target,
        manualEdited ? 1 : 0
      ]
    }
  ];
}
__name(buildFieldUpdateStatements, "buildFieldUpdateStatements");
async function applyFieldUpdate(db, target, patched, repaired, manualEdited = 1) {
  const valueType = String(patched.value).trim();
  const typeText = patched.type === "UNSET" ? "UNSET" : normalizeRuleType(patched.type);
  const validType = typeText === "UNSET" ? "UNSET" : normalizeRuleType(typeText);
  const paramsText = patched.params === null ? null : encodeParams(normalizeParamsObject(patched.params));
  const fields = { valueType, typeText, validType, paramsText };
  const results = await db.batch(
    buildFieldUpdateStatements(target, patched, fields, manualEdited)
  );
  return {
    found: results[0].changes > 0,
    created: results[1].changes > 0,
    renamed: false,
    repaired
  };
}
__name(applyFieldUpdate, "applyFieldUpdate");

// _utils/logs/overrides.js
async function upsertOverride(db, hostname, { policy = null, comment = null } = {}) {
  const target = String(hostname || "").trim();
  if (!target) return false;
  const policyText = policy === null ? null : policy === "" ? "" : normalizeRulePolicy(policy);
  const commentText = comment === null ? null : String(comment).trim().slice(0, 200);
  if (policyText === null && commentText === null) return false;
  await db.batch([
    {
      sql: `INSERT INTO ${RULE_OVERRIDES_TABLE} (hostname, policy, comment, updated_at)
            VALUES (?, COALESCE(?, ''), COALESCE(?, ''), ?)
            ON CONFLICT(hostname) DO UPDATE SET
              policy = COALESCE(?, ${RULE_OVERRIDES_TABLE}.policy),
              comment = COALESCE(?, ${RULE_OVERRIDES_TABLE}.comment),
              updated_at = excluded.updated_at`,
      params: [target, policyText, commentText, nowIso(), policyText, commentText]
    }
  ]);
  return true;
}
__name(upsertOverride, "upsertOverride");
async function deleteOverride(db, hostname) {
  const target = String(hostname || "").trim();
  if (!target) return 0;
  const results = await db.batch([
    { sql: `DELETE FROM ${RULE_OVERRIDES_TABLE} WHERE hostname = ?`, params: [target] }
  ]);
  return results[0].changes;
}
__name(deleteOverride, "deleteOverride");
async function upsertOverridesBatch(db, items) {
  const valid = (Array.isArray(items) ? items : []).map((item) => ({
    hostname: String(item?.hostname || "").trim(),
    policy: normalizeRulePolicy(item?.policy)
  })).filter((item) => item.hostname);
  if (!valid.length) return 0;
  const at = nowIso();
  const chunkSize = Math.max(1, Math.min(db.maxBatchSize || 100, 100));
  for (let start = 0; start < valid.length; start += chunkSize) {
    await db.batch(
      valid.slice(start, start + chunkSize).map((item) => ({
        sql: `INSERT INTO ${RULE_OVERRIDES_TABLE} (hostname, policy, comment, updated_at)
            VALUES (?, ?, '', ?)
            ON CONFLICT(hostname) DO UPDATE SET
              policy = excluded.policy, updated_at = excluded.updated_at`,
        params: [item.hostname, item.policy, at]
      }))
    );
  }
  return valid.length;
}
__name(upsertOverridesBatch, "upsertOverridesBatch");
async function renameOverride(db, oldHostname, newHostname) {
  const from = String(oldHostname || "").trim();
  const to = String(newHostname || "").trim();
  if (!from || !to || from === to) return false;
  const results = await db.batch([
    {
      sql: `INSERT INTO ${RULE_OVERRIDES_TABLE} (hostname, policy, comment, updated_at)
            SELECT ?, policy, comment, ? FROM ${RULE_OVERRIDES_TABLE} WHERE hostname = ?
            ON CONFLICT(hostname) DO NOTHING`,
      params: [to, nowIso(), from]
    },
    { sql: `DELETE FROM ${RULE_OVERRIDES_TABLE} WHERE hostname = ?`, params: [from] }
  ]);
  return results[0].changes > 0;
}
__name(renameOverride, "renameOverride");

// _utils/logs/edit.js
function validateLogPatch(entry = {}) {
  const typeText = String(entry.type ?? "UNSET").trim().toUpperCase();
  const type = typeText === "UNSET" ? "UNSET" : normalizeRuleType(typeText);
  const rawValue = String(entry.value ?? "UNSET").trim();
  let value = rawValue;
  if (type === "FINAL") {
    value = rawValue === "UNSET" ? "UNSET" : "";
  } else if (type !== "UNSET" && rawValue === "") {
    value = String(entry.hostname || "").trim();
  }
  const policyText = String(entry.policy ?? "UNSET").trim();
  if (policyText && policyText !== "UNSET" && !isPolicyName(policyText)) {
    return { ok: false, error: `\u7B56\u7565\u540D\u4E0D\u5408\u6CD5\uFF1A${policyText}` };
  }
  if (value !== "UNSET" && value.length > 512) {
    return { ok: false, error: "\u5339\u914D\u503C\u8FC7\u957F\uFF08\u8D85\u8FC7 512 \u5B57\u7B26\uFF09" };
  }
  const commentText = entry.comment === null || entry.comment === void 0 ? null : String(entry.comment).trim();
  if (commentText && commentText.length > 200)
    return { ok: false, error: "\u5907\u6CE8\u8FC7\u957F\uFF08\u8D85\u8FC7 200 \u5B57\u7B26\uFF09" };
  return {
    ok: true,
    repaired: value !== rawValue,
    value: {
      type,
      value,
      policy: policyText === "UNSET" ? "UNSET" : policyText,
      params: entry.params,
      comment: commentText,
      source: entry.source
    }
  };
}
__name(validateLogPatch, "validateLogPatch");
async function renameLog(db, oldHostname, { newValue, type = "UNSET", params = null, source = null, manualEdited = 1 } = {}) {
  const newHostname = String(newValue || "").trim();
  if (!newHostname || newHostname === oldHostname)
    return { found: false, created: false, renamed: false };
  const [oldRow] = await db.execute(
    `SELECT count, time, first_time, source, ip, username, type, value FROM ${LOGS_TABLE} WHERE hostname = ?`,
    [oldHostname]
  );
  const baseCount = oldRow ? safeCount(oldRow.count) : 1;
  const baseTime = oldRow ? String(oldRow.time ?? "") : nowIso();
  const baseFirst = oldRow && String(oldRow.first_time ?? "").trim() !== "" ? String(oldRow.first_time) : baseTime;
  const baseIp = oldRow ? String(oldRow.ip ?? "") : "";
  const baseUsername = oldRow ? String(oldRow.username ?? "") : "";
  const typeText = String(type ?? "UNSET").trim().toUpperCase();
  const validType = typeText === "UNSET" ? oldRow ? normalizeRuleType(oldRow.type) : "DOMAIN-SUFFIX" : normalizeRuleType(typeText);
  const validParams = params === null ? "" : encodeParams(normalizeParamsObject(params));
  const validSource = source === null ? oldRow ? normalizeSource(oldRow.source) : "" : normalizeSource(source);
  const results = await db.batch([
    { sql: `DELETE FROM ${LOGS_TABLE} WHERE hostname = ?`, params: [oldHostname] },
    {
      sql: `INSERT INTO ${LOGS_TABLE} (${WRITE_COLUMNS}, manual_edited)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      params: [
        newHostname,
        validType,
        newHostname,
        validParams,
        validSource,
        baseIp,
        baseUsername,
        baseFirst,
        baseTime,
        baseCount,
        newHostname,
        manualEdited ? 1 : 0
      ]
    }
  ]);
  await renameOverride(db, oldHostname, newHostname);
  const oldKey = String(oldRow?.value ?? "").trim() || oldHostname;
  await renameVerdictKey(db, oldKey, newHostname);
  return { found: results[0].changes > 0, created: results[1].changes > 0, renamed: true };
}
__name(renameLog, "renameLog");
async function updateLog(db, hostname, {
  type = "UNSET",
  value = "UNSET",
  policy = "UNSET",
  params = null,
  comment = null,
  source = null,
  unmanual = false
} = {}) {
  const target = String(hostname || "").trim();
  if (!target) return { found: false, created: false, renamed: false, repaired: false };
  const check2 = validateLogPatch({
    hostname: target,
    type,
    value,
    policy,
    params,
    comment,
    source
  });
  if (!check2.ok)
    return {
      found: false,
      created: false,
      renamed: false,
      repaired: false,
      error: check2.error
    };
  const patched = check2.value;
  const valueType = String(patched.value).trim();
  const manualEdited = unmanual ? 0 : 1;
  const result = valueType && valueType !== "UNSET" && valueType !== target ? await renameLog(db, target, {
    type: patched.type,
    params: patched.params,
    source: patched.source,
    newValue: valueType,
    manualEdited
  }) : await applyFieldUpdate(db, target, patched, check2.repaired, manualEdited);
  const summaryKey = (valueType && valueType !== "UNSET" ? valueType : "") || target;
  const isFinal = target === FINAL_KEY;
  const policyPatch = unmanual ? "" : patched.policy === "UNSET" ? null : patched.policy;
  const commentPatch = patched.comment;
  let overrideTouched = false;
  let commentRecorded = false;
  if (commentPatch !== null && !isFinal && summaryKey) {
    if (commentPatch) {
      const action = patched.policy === "UNSET" ? await getEffectivePolicy(db, target) : normalizeRulePolicy(patched.policy);
      const recorded = await recordPinnedComment(db, summaryKey, {
        action,
        comment: commentPatch,
        kind: "manual"
      });
      commentRecorded = !recorded.skipped;
    } else {
      await clearPinnedComment(db, summaryKey);
    }
    overrideTouched = await upsertOverride(db, result.renamed ? summaryKey : target, {
      policy: policyPatch,
      comment: ""
    }) || overrideTouched;
  } else {
    overrideTouched = await upsertOverride(db, result.renamed ? summaryKey : target, {
      policy: policyPatch,
      comment: commentPatch
    }) || overrideTouched;
  }
  return { ...result, overrideTouched, commentRecorded };
}
__name(updateLog, "updateLog");

// _utils/ipnet.js
function parseIpv4(text) {
  const parts = String(text ?? "").split(".");
  if (parts.length !== 4) return null;
  let value = 0;
  for (const part of parts) {
    if (!/^\d{1,3}$/.test(part)) return null;
    const octet = Number(part);
    if (octet > 255) return null;
    value = value * 256 + octet;
  }
  return value >>> 0;
}
__name(parseIpv4, "parseIpv4");
function parseIpv6(text) {
  const raw = String(text ?? "").trim();
  if (!raw || !raw.includes(":") || raw.includes("%")) return null;
  const halves = raw.split("::");
  if (halves.length > 2) return null;
  const parseGroups = /* @__PURE__ */ __name((part) => {
    if (part === "") return [];
    const groups = [];
    const pieces = part.split(":");
    for (let i = 0; i < pieces.length; i += 1) {
      const piece = pieces[i];
      if (/^\d{1,3}(?:\.\d{1,3}){3}$/.test(piece)) {
        if (i !== pieces.length - 1) return null;
        const v4 = parseIpv4(piece);
        if (v4 === null) return null;
        groups.push(v4 >>> 16, v4 & 65535);
      } else {
        if (!/^[0-9a-fA-F]{1,4}$/.test(piece)) return null;
        groups.push(parseInt(piece, 16));
      }
    }
    return groups;
  }, "parseGroups");
  const head = parseGroups(halves[0]);
  const tail = halves.length === 2 ? parseGroups(halves[1]) : [];
  if (head === null || tail === null) return null;
  const missing = 8 - head.length - tail.length;
  if (missing < 0 || halves.length === 1 && missing !== 0) return null;
  return head.concat(new Array(missing).fill(0), tail);
}
__name(parseIpv6, "parseIpv6");
function formatIpv6(groups) {
  let bestStart = -1;
  let bestLen = 0;
  let current = -1;
  for (let i = 0; i <= 8; i += 1) {
    if (i < 8 && groups[i] === 0) {
      if (current < 0) current = i;
    } else if (current >= 0) {
      if (i - current > bestLen) {
        bestLen = i - current;
        bestStart = current;
      }
      current = -1;
    }
  }
  if (bestLen < 2) return groups.map((group3) => group3.toString(16)).join(":");
  const hex2 = /* @__PURE__ */ __name((slice) => slice.map((group3) => group3.toString(16)).join(":"), "hex");
  const head = hex2(groups.slice(0, bestStart));
  const tail = hex2(groups.slice(bestStart + bestLen));
  if (bestStart === 0) return `::${tail}`;
  if (bestStart + bestLen === 8) return `${head}::`;
  return `${head}::${tail}`;
}
__name(formatIpv6, "formatIpv6");
function ipv4NetworkBase(int, prefix) {
  if (prefix <= 0) return 0;
  if (prefix >= 32) return int >>> 0;
  return (int & 4294967295 << 32 - prefix >>> 0) >>> 0;
}
__name(ipv4NetworkBase, "ipv4NetworkBase");
function ipv6NetworkBase(groups, prefix) {
  const out = groups.slice();
  const full = Math.floor(prefix / 16);
  const rest = prefix % 16;
  for (let i = full + (rest > 0 ? 1 : 0); i < 8; i += 1) out[i] = 0;
  if (rest > 0) out[full] = groups[full] >> 16 - rest << 16 - rest;
  return out;
}
__name(ipv6NetworkBase, "ipv6NetworkBase");
function ipv4CidrString(int, prefix) {
  const base = ipv4NetworkBase(int, prefix);
  return `${base >>> 24 & 255}.${base >>> 16 & 255}.${base >>> 8 & 255}.${base & 255}/${prefix}`;
}
__name(ipv4CidrString, "ipv4CidrString");
function ipv6CidrString(groups, prefix) {
  return `${formatIpv6(ipv6NetworkBase(groups, prefix))}/${prefix}`;
}
__name(ipv6CidrString, "ipv6CidrString");
function parseIpTarget(text) {
  const raw = String(text ?? "").trim();
  if (!raw) return null;
  const slash = raw.lastIndexOf("/");
  const address = slash > 0 ? raw.slice(0, slash) : raw;
  let prefix = null;
  if (slash > 0) {
    const prefixText = raw.slice(slash + 1);
    if (!/^\d{1,3}$/.test(prefixText)) return null;
    prefix = Number(prefixText);
  }
  if (address.includes(":")) {
    const groups = parseIpv6(address);
    if (!groups) return null;
    if (prefix === null) prefix = 128;
    if (prefix > 128) return null;
    return {
      family: 6,
      groups: ipv6NetworkBase(groups, prefix),
      prefix,
      cidr: ipv6CidrString(groups, prefix),
      addressText: address
    };
  }
  const ipv4 = parseIpv4(address);
  if (!ipv4) return null;
  if (prefix === null) prefix = 32;
  if (prefix > 32) return null;
  return {
    family: 4,
    baseInt: ipv4NetworkBase(ipv4, prefix),
    prefix,
    cidr: ipv4CidrString(ipv4, prefix),
    addressText: address
  };
}
__name(parseIpTarget, "parseIpTarget");
function hostInCidr(hostText, target) {
  const record = parseIpTarget(hostText);
  if (!record || record.family !== target.family) return false;
  if (record.prefix < target.prefix) return false;
  if (record.family === 4) {
    const shift = 32 - target.prefix;
    if (shift === 0) return record.baseInt === target.baseInt;
    return record.baseInt >>> shift === target.baseInt >>> shift;
  }
  const full = Math.floor(target.prefix / 16);
  const rest = target.prefix % 16;
  for (let i = 0; i < full; i += 1) {
    if (record.groups[i] !== target.groups[i]) return false;
  }
  if (rest > 0) {
    const shift = 16 - rest;
    return record.groups[full] >>> shift === target.groups[full] >>> shift;
  }
  return true;
}
__name(hostInCidr, "hostInCidr");

// _utils/logs/reduce-exclude.js
function legacyV4PrefixCidr(key) {
  const parts = key.split(".");
  if (parts.length !== 3 || !parts.every((part) => /^\d{1,3}$/.test(part) && Number(part) <= 255))
    return null;
  return `${key}.0/24`;
}
__name(legacyV4PrefixCidr, "legacyV4PrefixCidr");
function buildVictimDeletes(victims) {
  const statements = [];
  for (let start = 0; start < victims.length; start += 100) {
    const chunk = victims.slice(start, start + 100);
    statements.push({
      sql: `DELETE FROM ${LOGS_TABLE} WHERE hostname IN (${chunk.map(() => "?").join(", ")})`,
      params: chunk
    });
  }
  return statements;
}
__name(buildVictimDeletes, "buildVictimDeletes");
function sumVictimHits(rows) {
  return rows.reduce((total, row) => total + safeCount(row.count), 0);
}
__name(sumVictimHits, "sumVictimHits");
function pickSummarySource(rows, fallbackSource) {
  const fallback = normalizeSource(fallbackSource);
  const seen = /* @__PURE__ */ new Map();
  for (const row of rows) {
    const source = normalizeSource(row.source);
    if (!source) continue;
    seen.set(source, (seen.get(source) || 0) + 1);
  }
  if (!seen.size) return fallback;
  if (fallback && seen.has(fallback)) return fallback;
  return [...seen.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([source]) => source)[0];
}
__name(pickSummarySource, "pickSummarySource");
async function reduceDomainExclude(db, { insertTarget, type, value, policy, where, whereParams, fallbackSource }) {
  const cond = `(${where.sql})`;
  const sourceFallback = normalizeSource(fallbackSource);
  const insertStatement = {
    sql: `INSERT INTO ${LOGS_TABLE} (hostname, type, value, params, source, first_time, time, count)
          VALUES (
            ?, ?, ?, '',
            COALESCE(
              CASE WHEN ? <> '' AND EXISTS (
                SELECT 1 FROM ${LOGS_TABLE} WHERE ${cond} AND source = ?
              ) THEN ? ELSE NULL END,
              (SELECT source FROM ${LOGS_TABLE} WHERE ${cond} AND source <> ''
               GROUP BY source ORDER BY COUNT(*) DESC, source ASC LIMIT 1),
              ?
            ),
            ?, ?,
            MAX((SELECT COALESCE(SUM(MAX(count, 1)), 0) FROM ${LOGS_TABLE} WHERE ${cond}), 1)
          )
          ON CONFLICT(hostname) DO UPDATE SET
            type = excluded.type, value = excluded.value,
            params = excluded.params, source = excluded.source,
            first_time = excluded.first_time, time = excluded.time, count = excluded.count`,
    params: [
      insertTarget,
      type,
      value,
      // source：兜底来源命中检查（兜底值、条件、兜底值）→ 最常见非空来源（条件）→ 兜底值
      sourceFallback,
      ...whereParams,
      sourceFallback,
      sourceFallback,
      ...whereParams,
      sourceFallback,
      nowIso(),
      nowIso(),
      ...whereParams
    ]
  };
  const deleteStatement = {
    sql: `DELETE FROM ${LOGS_TABLE} WHERE ${cond} AND hostname <> ?`,
    params: [...whereParams, insertTarget]
  };
  const results = await db.batch([insertStatement, deleteStatement]);
  await upsertOverride(db, insertTarget, { policy, comment: null });
  return {
    deleted: results[1].changes,
    created: results[0].changes > 0
  };
}
__name(reduceDomainExclude, "reduceDomainExclude");
async function reduceIpExclude(db, { insertTarget, type, value, policy, targetIp, source }) {
  const rows = await db.execute(`SELECT hostname, count, source FROM ${LOGS_TABLE}`);
  const victimRows = rows.map((row) => ({
    hostname: String(row.hostname ?? "").trim(),
    count: safeCount(row.count),
    source: row.source
  })).filter((row) => row.hostname && hostInCidr(row.hostname, targetIp));
  const summaryHits = sumVictimHits(victimRows);
  const summarySource = pickSummarySource(victimRows, source);
  const insertStatement = {
    sql: `INSERT INTO ${LOGS_TABLE} (hostname, type, value, params, source, first_time, time, count)
          VALUES (?, ?, ?, '', ?, ?, ?, ?)
          ON CONFLICT(hostname) DO UPDATE SET type = excluded.type, value = excluded.value`,
    params: [
      insertTarget,
      type,
      value,
      summarySource,
      nowIso(),
      nowIso(),
      safeCount(summaryHits)
    ]
  };
  const DELETE_CHUNK = Math.max(1, Math.min(200, (db.maxBatchSize || 200) - 1));
  const deleteStatements = buildVictimDeletes(victimRows.map((row) => row.hostname));
  const chunks = [];
  for (let start = 0; start < deleteStatements.length; start += DELETE_CHUNK) {
    chunks.push(deleteStatements.slice(start, start + DELETE_CHUNK));
  }
  if (!chunks.length) chunks.push([]);
  let deleted = 0;
  let created = false;
  for (let i = 0; i < chunks.length; i += 1) {
    const isLast = i === chunks.length - 1;
    const batch = isLast ? [...chunks[i], insertStatement] : chunks[i];
    const results = await db.batch(batch);
    results.forEach((result, index) => {
      if (isLast && index === batch.length - 1) {
        if (result.changes > 0) created = true;
      } else {
        deleted += result.changes;
      }
    });
  }
  await upsertOverride(db, insertTarget, { policy, comment: null });
  return { deleted, created };
}
__name(reduceIpExclude, "reduceIpExclude");
async function reduceExclude(db, targetKey, { policy = "PROXY", source = "" } = {}) {
  const key = String(targetKey || "").trim();
  const validPolicy = normalizeRulePolicy(policy);
  if (!key) return { deleted: 0, created: false };
  const parsed = parseIpTarget(key);
  const legacyCidr = parsed ? null : legacyV4PrefixCidr(key);
  const targetIp = parsed || (legacyCidr ? parseIpTarget(legacyCidr) : null);
  const insertTarget = targetIp ? parsed && key.includes("/") ? key : targetIp.cidr : key;
  const type = inferHostType(insertTarget);
  const value = insertTarget;
  if (!targetIp) {
    const where = key.includes(":") ? { sql: `hostname LIKE ?`, params: [`${key}%`] } : { sql: `hostname = ? OR hostname LIKE ?`, params: [key, `%.${key}`] };
    return reduceDomainExclude(db, {
      insertTarget,
      type,
      value,
      policy: validPolicy,
      where,
      whereParams: where.params,
      fallbackSource: source
    });
  }
  return reduceIpExclude(db, {
    insertTarget,
    type,
    value,
    policy: validPolicy,
    targetIp,
    source
  });
}
__name(reduceExclude, "reduceExclude");

// _utils/logs/admin.js
async function deleteLog(db, hostname) {
  const target = String(hostname || "").trim();
  if (!target) return 0;
  const results = await db.batch([
    { sql: `DELETE FROM ${LOGS_TABLE} WHERE hostname = ?`, params: [target] }
  ]);
  await deleteOverride(db, target);
  return results[0].changes;
}
__name(deleteLog, "deleteLog");
async function clearAllLogs(db) {
  const results = await db.batch([
    { sql: `DELETE FROM ${LOGS_TABLE}` },
    { sql: `DELETE FROM sqlite_sequence WHERE name = ?`, params: [LOGS_TABLE] },
    { sql: `DELETE FROM rule_overrides` }
  ]);
  return results[0].changes;
}
__name(clearAllLogs, "clearAllLogs");
async function clearEmptyCommentLogs(db) {
  const results = await db.batch([
    {
      sql: `DELETE FROM ${LOGS_TABLE} AS s
             WHERE NOT EXISTS (
               SELECT 1 FROM rule_overrides ro
                WHERE ro.hostname = s.hostname AND TRIM(COALESCE(ro.comment, '')) != ''
             )
               AND NOT EXISTS (
               SELECT 1 FROM domain_summary d
                WHERE d.domain = s.match_key
                  AND (TRIM(COALESCE(d.latest_comment, '')) != ''
                    OR TRIM(COALESCE(d.pinned_comment, '')) != '')
             )`
    },
    // 孤儿覆盖行清理：规则行已删但覆盖行还在（历史版本遗留），一并回收
    {
      sql: `DELETE FROM rule_overrides
             WHERE NOT EXISTS (SELECT 1 FROM ${LOGS_TABLE} s WHERE s.hostname = rule_overrides.hostname)`
    }
  ]);
  return results[0].changes;
}
__name(clearEmptyCommentLogs, "clearEmptyCommentLogs");
async function clearPresetCommentPins(db) {
  return clearPresetPins(db);
}
__name(clearPresetCommentPins, "clearPresetCommentPins");
async function clearAllCommentPins(db) {
  const results = await db.batch([
    {
      sql: `UPDATE domain_summary SET pinned_comment = '', pinned_kind = '' WHERE TRIM(COALESCE(pinned_comment, '')) != ''`,
      params: []
    },
    {
      sql: `UPDATE rule_overrides SET comment = '' WHERE TRIM(COALESCE(comment, '')) != ''`,
      params: []
    }
  ]);
  return results.reduce((total, result) => total + (Number(result?.changes) || 0), 0);
}
__name(clearAllCommentPins, "clearAllCommentPins");

// _utils/logs/batch-parse.js
function parseOverrideLine(line) {
  const parsed = parseRuleLine(line);
  if (!parsed || parsed.invalid) return null;
  const comment = parsed.comment || "";
  if (parsed.type === "FINAL") {
    return {
      hostname: FINAL_KEY,
      type: "FINAL",
      value: "",
      policy: normalizeRulePolicy(parsed.policy),
      params: parsed.params,
      comment,
      source: ""
    };
  }
  if (!parsed.value) return null;
  if ((parsed.type === "IP-CIDR" || parsed.type === "IP-CIDR6") && isInvalidIpLiteral(parsed.value))
    return null;
  return {
    hostname: parsed.value,
    type: parsed.type,
    value: parsed.value,
    policy: parsed.policySpecified === false ? "" : normalizeRulePolicy(parsed.policy),
    params: parsed.params,
    comment,
    source: ""
  };
}
__name(parseOverrideLine, "parseOverrideLine");
function normalizeOverrideInput(entry) {
  if (!entry || typeof entry !== "object") return null;
  const type = normalizeRuleType(entry.type);
  const value = String(entry.value ?? entry.hostname ?? entry.target ?? "").trim();
  if (!value && type !== "FINAL") return null;
  if ((type === "IP-CIDR" || type === "IP-CIDR6") && value && isInvalidIpLiteral(value))
    return null;
  const rawPolicy = String(entry.policy ?? "").trim();
  const policy = rawPolicy ? normalizeRulePolicy(rawPolicy) : "";
  if (type === "FINAL") {
    return {
      hostname: FINAL_KEY,
      type: "FINAL",
      value: "",
      policy: rawPolicy ? normalizeRulePolicy(rawPolicy) : normalizeRulePolicy("PROXY"),
      params: normalizeParamsObject(entry.params),
      comment: String(entry.comment ?? "").trim(),
      source: normalizeSource(entry.source)
    };
  }
  return {
    hostname: value,
    type,
    value,
    policy,
    params: normalizeParamsObject(entry.params),
    comment: String(entry.comment ?? "").trim(),
    source: normalizeSource(entry.source)
  };
}
__name(normalizeOverrideInput, "normalizeOverrideInput");

// _utils/logs/batch.js
async function preserveEditedRow(db, items, preserveKey) {
  const head = items[0];
  if (!head || head.hostname === preserveKey) return false;
  const renamed = await renameLog(db, preserveKey, {
    type: head.type,
    params: head.params,
    source: head.source,
    newValue: head.hostname
  });
  if (!renamed.found) return false;
  items.shift();
  return true;
}
__name(preserveEditedRow, "preserveEditedRow");
function buildStatements(items, override, now2) {
  const statements = [];
  for (const item of items) {
    const encodedParams = encodeParams(item.params);
    const matchKey = String(item.value ?? "").trim() || item.hostname;
    const sourceSql = override ? "source = ?" : `source = CASE WHEN ? = '' THEN source ELSE ? END`;
    statements.push({
      sql: `UPDATE ${LOGS_TABLE}
            SET type = ?, value = ?, params = ?, ${sourceSql},
                match_key = ?,
                first_time = COALESCE(NULLIF(first_time, ''), ?)
            WHERE hostname = ?`,
      params: override ? [item.type, item.value, encodedParams, item.source, matchKey, now2, item.hostname] : [
        item.type,
        item.value,
        encodedParams,
        item.source,
        item.source,
        matchKey,
        now2,
        item.hostname
      ]
    });
    statements.push({
      sql: `INSERT INTO ${LOGS_TABLE} (${WRITE_COLUMNS})
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(hostname) DO NOTHING`,
      // 批量粘贴 / Gist 还原没有设备上下文：ip / username 留空，命中上报路径才会携带
      params: [
        item.hostname,
        item.type,
        item.value,
        encodedParams,
        item.source,
        "",
        "",
        now2,
        now2,
        1,
        matchKey
      ]
    });
  }
  return statements;
}
__name(buildStatements, "buildStatements");
async function flushOverrides(db, items, createdHostnames, override) {
  const presetEntries = [];
  const manualEntries = [];
  const clearPresetKeys = [];
  for (const item of items) {
    if (item.type === "FINAL") continue;
    const domain2 = String(item.value || "").trim() || String(item.hostname || "").trim();
    if (!domain2) continue;
    if (!item.policy) continue;
    if (createdHostnames.has(item.hostname)) {
      presetEntries.push({ domain: domain2, action: item.policy, comment: item.comment });
      continue;
    }
    if (item.comment)
      manualEntries.push({ domain: domain2, action: item.policy, comment: item.comment });
    else if (override) clearPresetKeys.push(domain2);
  }
  const finalItem = items.find((item) => item.type === "FINAL");
  if (finalItem)
    await upsertOverride(db, finalItem.hostname, { policy: finalItem.policy, comment: null });
  await upsertOverridesBatch(
    db,
    items.filter((item) => item.type !== "FINAL" && item.policy).map((item) => ({ hostname: item.hostname, policy: item.policy }))
  );
  if (presetEntries.length) await recordPresetEntries(db, presetEntries);
  if (manualEntries.length) await recordPinnedCommentsBatch(db, manualEntries);
  if (clearPresetKeys.length) await clearPresetPinsForDomains(db, clearPresetKeys);
}
__name(flushOverrides, "flushOverrides");
async function flushChunks(db, statements) {
  let updated = 0;
  let created = 0;
  const createdHostnames = /* @__PURE__ */ new Set();
  const cap = Math.min(BATCH_CHUNK_SIZE * 2, db.maxBatchSize || BATCH_CHUNK_SIZE * 2);
  const chunkSize = Math.max(2, cap - cap % 2);
  for (let start = 0; start < statements.length; start += chunkSize) {
    const chunk = statements.slice(start, start + chunkSize);
    const results = await db.batch(chunk);
    for (let i = 0; i < results.length; i += 2) {
      if (results[i].changes > 0) updated += 1;
      if (results[i + 1] && results[i + 1].changes > 0) {
        created += 1;
        createdHostnames.add(statements[start + i + 1].params[0]);
      }
    }
  }
  return { updated, created, createdHostnames };
}
__name(flushChunks, "flushChunks");
async function batchOverride(db, lines, { mode = "merge", preserveFrom = "", policyOverride = "" } = {}) {
  const parsed = /* @__PURE__ */ new Map();
  let truncated = 0;
  for (const line of lines) {
    if (parsed.size >= BATCH_MAX_LINES) {
      truncated += 1;
      continue;
    }
    const item = typeof line === "string" ? parseOverrideLine(line) : normalizeOverrideInput(line);
    if (item) parsed.set(item.hostname, item);
  }
  if (parsed.size === 0)
    return { updated: 0, created: 0, total: 0, preserved: false, skipped: 0, truncated: 0 };
  const override = mode === "override";
  const forcedPolicy = String(policyOverride ?? "").trim();
  if (forcedPolicy) {
    const normalized = normalizeRulePolicy(forcedPolicy);
    for (const item of parsed.values()) item.policy = normalized;
  }
  const items = [...parsed.values()];
  let preserved = false;
  const preserveKey = String(preserveFrom || "").trim();
  if (preserveKey) {
    preserved = await preserveEditedRow(db, items, preserveKey);
  }
  const { updated, created, createdHostnames } = await flushChunks(
    db,
    buildStatements(items, override, nowIso())
  );
  await flushOverrides(db, items, createdHostnames, override);
  return { updated, created, total: parsed.size, preserved, skipped: truncated, truncated };
}
__name(batchOverride, "batchOverride");

// _utils/logs/export.js
function canonicalizeLogItem(item) {
  return canonicalIp(normalizeRuleType(item?.type), item?.value);
}
__name(canonicalizeLogItem, "canonicalizeLogItem");
function formatLogRule(item, { withSource = false, canonical } = {}) {
  const normalized = canonical ?? canonicalizeLogItem(item);
  const { type, value } = normalized;
  const text = formatRuleItem({
    type,
    value,
    policy: item.policy,
    params: item.params,
    comment: item.comment
  });
  if (!withSource || !item.source) return text;
  return `${text} // \u6765\u6E90\uFF1A${item.source}`;
}
__name(formatLogRule, "formatLogRule");
function markIpVersionFromCanonical(item, canonical) {
  const { type, value } = canonical;
  const text = String(value || "");
  if (type !== "IP-CIDR" && type !== "IP-CIDR6" && !text.includes(":"))
    return { ...item, ipv4: false, ipv6: false };
  if (type === "IP-CIDR6" || text.includes(":")) return { ...item, ipv4: false, ipv6: true };
  return { ...item, ipv4: true, ipv6: false };
}
__name(markIpVersionFromCanonical, "markIpVersionFromCanonical");
function describeExportFilter({
  type = "all",
  source = "",
  minCount = 0,
  lastDays = 0
} = {}) {
  const typeText = String(type || "all").trim().toUpperCase() || "ALL";
  const sourceText = String(source || "").trim();
  const min = Math.floor(Number(minCount) || 0);
  const days = Math.floor(Number(lastDays) || 0);
  const parts = [
    `type=${typeText === "ALL" ? "ALL" : typeText}`,
    `source=${sourceText || "ANY"}`
  ];
  if (min > 1) parts.push(`min_count=${min}`);
  if (days > 0) parts.push(`last_days=${days}`);
  return {
    type: typeText,
    source: sourceText,
    minCount: min,
    lastDays: days,
    text: parts.join(", ")
  };
}
__name(describeExportFilter, "describeExportFilter");
function tallyByField(lines) {
  const byPolicy = {};
  const byType = {};
  let ipv4 = 0;
  let ipv6 = 0;
  for (const item of lines) {
    const policy = String(item.policy || "PROXY").toUpperCase();
    const type = String(item.type || "DOMAIN-SUFFIX").toUpperCase();
    byPolicy[policy] = (byPolicy[policy] || 0) + 1;
    byType[type] = (byType[type] || 0) + 1;
    if (item.ipv4) ipv4 += 1;
    if (item.ipv6) ipv6 += 1;
  }
  return { byPolicy, byType, ipv4, ipv6 };
}
__name(tallyByField, "tallyByField");
function tallyText(map) {
  return Object.entries(map).sort((a, b) => b[1] - a[1]).map(([name, count3]) => `${name}: ${count3}`).join(" | ");
}
__name(tallyText, "tallyText");
function buildExportHeader({
  filterText = "type=ALL, source=ANY",
  lines = [],
  hits = 0,
  generatedAt = ""
} = {}) {
  const counts = tallyByField(lines);
  const policyText = tallyText(counts.byPolicy);
  return [
    `# Generated by Surge Rules Manager at ${generatedAt || "-"}`,
    `# Filter: ${filterText}`,
    `# Rules: ${lines.length} total${policyText ? ` | ${policyText}` : ""}`,
    `# Types: ${tallyText(counts.byType) || "none"}`,
    `# Hits: total ${Math.max(0, Number(hits) || 0)} | IPv4: ${counts.ipv4} | IPv6: ${counts.ipv6}`
  ];
}
__name(buildExportHeader, "buildExportHeader");
function summarizeExport(lines = []) {
  const counts = tallyByField(lines);
  let hits = 0;
  let emptyComment = 0;
  for (const item of lines) {
    hits += Number(item.count) || 1;
    if (!String(item.comment || "").trim()) emptyComment += 1;
  }
  return {
    ruleCount: lines.length,
    hits,
    ipv4: counts.ipv4,
    ipv6: counts.ipv6,
    emptyComment,
    byPolicy: counts.byPolicy,
    byType: counts.byType
  };
}
__name(summarizeExport, "summarizeExport");

// api/_logger/exporter.js
var DNS_FAILED_PLACEHOLDER = "Unresolved Domain (DNS Failed)";
function normalizeLastDays(value) {
  const days = Math.floor(Number(value) || 0);
  return days > 0 ? days : 0;
}
__name(normalizeLastDays, "normalizeLastDays");
async function buildExport(db, { type = "all", source = "", withSource = false, minCount = 0, lastDays = 0 } = {}) {
  const typeKey = String(type || "all").trim().toUpperCase();
  const resolvedLastDays = normalizeLastDays(lastDays);
  const cutoff = resolvedLastDays > 0 ? Date.now() - resolvedLastDays * 864e5 : null;
  const logs = await getAllLogs(db, {
    minCount,
    policy: typeKey,
    source,
    cutoffIso: cutoff !== null ? new Date(cutoff).toISOString() : ""
  });
  const matched = [];
  const lines = [];
  for (const item of logs) {
    if (!item.value && item.type !== "FINAL") continue;
    if (item.hostname === DNS_FAILED_PLACEHOLDER || item.value === DNS_FAILED_PLACEHOLDER)
      continue;
    const canonical = canonicalizeLogItem(item);
    matched.push(markIpVersionFromCanonical(item, canonical));
    lines.push(formatLogRule(item, { withSource, canonical }));
  }
  const hits = matched.reduce((sum, item) => sum + (Number(item.count) || 1), 0);
  return {
    lines,
    matched,
    hits,
    count: lines.length,
    ipv4: matched.filter((item) => item.ipv4).length,
    ipv6: matched.filter((item) => item.ipv6).length
  };
}
__name(buildExport, "buildExport");
function renderExportText(result, { withMeta, filterText }) {
  const body = result.lines.length ? result.lines.join("\n") : "# \u6682\u65E0\u7B26\u5408\u6761\u4EF6\u7684\u89C4\u5219";
  if (!withMeta || !result.lines.length) return body;
  return buildExportHeader({
    filterText,
    lines: result.matched,
    hits: result.hits,
    generatedAt: (/* @__PURE__ */ new Date()).toISOString().replace("T", " ").slice(0, 19) + " UTC"
  }).concat([body]).join("\n");
}
__name(renderExportText, "renderExportText");

// _utils/subscriptions.js
var SUBSCRIPTIONS_TABLE = "subscriptions";
var MAX_NAME_LENGTH = 200;
var MAX_STATUS_LENGTH = 64;
var SUBSCRIPTIONS_SCHEMA = `CREATE TABLE IF NOT EXISTS ${SUBSCRIPTIONS_TABLE} (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  url TEXT NOT NULL,
  name TEXT NOT NULL DEFAULT '',
  -- v12\uFF1A\u6BCF\u6761\u8BA2\u9605\u5355\u72EC\u7684\u7B56\u7565\u2014\u2014URL \u89C4\u5219\u8BA2\u9605\u89E3\u6790\u65F6\u6307\u5B9A\uFF0C\u7A7A = \u667A\u80FD\u8BC6\u522B
  --\uFF08\u4FDD\u7559\u8BA2\u9605\u5404\u884C\u81EA\u5E26\u7B56\u7565\uFF09\uFF1B\u586B\u5145\u8FDB\u6279\u91CF\u7F16\u8F91\u6846\u65F6\u4F5C\u4E3A\u672A\u5199\u7B56\u7565\u884C\u7684\u9ED8\u8BA4\u8986\u76D6
  policy TEXT NOT NULL DEFAULT '',
  rule_count INTEGER NOT NULL DEFAULT 0,
  last_status TEXT NOT NULL DEFAULT '',
  last_fetched_at TEXT NOT NULL DEFAULT '',
  updated_at TEXT NOT NULL,
  UNIQUE(url)
);
CREATE INDEX IF NOT EXISTS idx_${SUBSCRIPTIONS_TABLE}_time ON ${SUBSCRIPTIONS_TABLE}(updated_at);`.trim();
var SubscriptionUrlError = class extends Error {
  
  constructor(message) {
    super(message);
    this.name = "SubscriptionUrlError";
  }
};
function normalizeSubscriptionUrl(raw) {
  const text = String(raw ?? "").trim();
  if (!text) throw new SubscriptionUrlError("\u8BA2\u9605\u5730\u5740\u4E0D\u80FD\u4E3A\u7A7A");
  let parsed;
  try {
    parsed = new URL(text);
  } catch {
    throw new SubscriptionUrlError("\u8BA2\u9605\u5730\u5740\u4E0D\u662F\u5408\u6CD5\u7684 URL");
  }
  if (parsed.protocol !== "https:") {
    throw new SubscriptionUrlError(`\u8BA2\u9605\u5730\u5740\u5FC5\u987B\u4F7F\u7528 https:// \u534F\u8BAE\uFF0C\u5F53\u524D\u4E3A ${parsed.protocol}`);
  }
  if (parsed.username || parsed.password) {
    throw new SubscriptionUrlError("\u8BA2\u9605\u5730\u5740\u4E0D\u80FD\u5305\u542B\u8D26\u53F7\u5BC6\u7801\uFF08userinfo\uFF09");
  }
  if (!parsed.hostname) throw new SubscriptionUrlError("\u8BA2\u9605\u5730\u5740\u7F3A\u5C11\u4E3B\u673A\u540D");
  parsed.username = "";
  parsed.password = "";
  parsed.hash = "";
  parsed.search = "";
  parsed.hostname = parsed.hostname.toLowerCase();
  parsed.pathname = parsed.pathname.replace(/\/+$/, "") || "/";
  return parsed.toString();
}
__name(normalizeSubscriptionUrl, "normalizeSubscriptionUrl");
function normalizeSubscriptionName(name) {
  return String(name ?? "").replace(/\s+/g, " ").trim().slice(0, MAX_NAME_LENGTH);
}
__name(normalizeSubscriptionName, "normalizeSubscriptionName");
async function listSubscriptions(db) {
  const rows = await db.execute(
    `SELECT id, url, name, policy, rule_count, last_status, last_fetched_at, updated_at
     FROM ${SUBSCRIPTIONS_TABLE} ORDER BY updated_at DESC, id DESC`
  );
  return rows.map(normalizeSubscriptionRow);
}
__name(listSubscriptions, "listSubscriptions");
function normalizeSubscriptionRow(row) {
  return {
    id: Number(row.id) || 0,
    url: String(row.url ?? ""),
    name: String(row.name ?? ""),
    // v12：每条订阅单独的策略（空 = 智能识别，保留订阅各行自带策略）
    policy: String(row.policy ?? ""),
    ruleCount: Number(row.rule_count) || 0,
    lastStatus: String(row.last_status ?? ""),
    lastFetchedAt: String(row.last_fetched_at ?? ""),
    updatedAt: String(row.updated_at ?? "")
  };
}
__name(normalizeSubscriptionRow, "normalizeSubscriptionRow");
async function upsertSubscription(db, url, name, { ruleCount = 0, lastStatus = "", policy } = {}) {
  const normalized = normalizeSubscriptionUrl(url);
  const text = normalizeSubscriptionName(name);
  const policyText = policy === void 0 ? null : String(policy ?? "").trim().slice(0, 64);
  const now2 = (/* @__PURE__ */ new Date()).toISOString();
  const existing = await db.execute(`SELECT id FROM ${SUBSCRIPTIONS_TABLE} WHERE url = ?`, [
    normalized
  ]);
  const known = existing[0];
  if (known) {
    await db.batch([
      {
        sql: `UPDATE ${SUBSCRIPTIONS_TABLE} SET name = ?, policy = COALESCE(?, policy), updated_at = ? WHERE id = ?`,
        params: [text, policyText, now2, Number(known.id)]
      }
    ]);
    return { id: Number(known.id), created: false };
  }
  const count3 = Math.max(0, Math.floor(Number(ruleCount) || 0));
  const status4 = count3 > 0 ? String(lastStatus || "ok").slice(0, MAX_STATUS_LENGTH) : "";
  const results = await db.batch([
    {
      sql: `INSERT INTO ${SUBSCRIPTIONS_TABLE} (url, name, policy, rule_count, last_status, updated_at)
              VALUES (?, ?, ?, ?, ?, ?)`,
      params: [normalized, text, policyText ?? "", count3, status4, now2]
    }
  ]);
  const inserted = await db.execute(`SELECT id FROM ${SUBSCRIPTIONS_TABLE} WHERE url = ?`, [
    normalized
  ]);
  const created = results[0].changes > 0;
  return { id: Number(inserted[0]?.id) || 0, created };
}
__name(upsertSubscription, "upsertSubscription");
async function updateSubscriptionStatus(db, url, { ruleCount = 0, status: status4 = "" } = {}) {
  const normalized = normalizeSubscriptionUrl(url);
  const now2 = (/* @__PURE__ */ new Date()).toISOString();
  const results = await db.batch([
    {
      sql: `UPDATE ${SUBSCRIPTIONS_TABLE}
            SET rule_count = ?, last_status = ?, last_fetched_at = ?, updated_at = ?
            WHERE url = ?`,
      params: [
        Math.max(0, Number(ruleCount) || 0),
        String(status4 || "").slice(0, MAX_STATUS_LENGTH),
        now2,
        now2,
        normalized
      ]
    }
  ]);
  return results[0].changes;
}
__name(updateSubscriptionStatus, "updateSubscriptionStatus");
async function deleteSubscription(db, id) {
  const numeric = Number(id);
  if (!Number.isInteger(numeric) || numeric <= 0) return 0;
  const results = await db.batch([
    { sql: `DELETE FROM ${SUBSCRIPTIONS_TABLE} WHERE id = ?`, params: [numeric] }
  ]);
  return results[0].changes;
}
__name(deleteSubscription, "deleteSubscription");

// api/_subscribe/guard.js
var BLOCKED_IPV4 = [
  { test: /* @__PURE__ */ __name((p) => p[0] === 0, "test"), reason: "0.0.0.0/8 \u4FDD\u7559\u7F51\u6BB5" },
  { test: /* @__PURE__ */ __name((p) => p[0] === 10, "test"), reason: "10.0.0.0/8 \u79C1\u6709\u7F51\u6BB5" },
  { test: /* @__PURE__ */ __name((p) => p[0] === 127, "test"), reason: "127.0.0.0/8 \u73AF\u56DE\u5730\u5740" },
  {
    test: /* @__PURE__ */ __name((p) => p[0] === 169 && p[1] === 254, "test"),
    reason: "169.254.0.0/16 \u94FE\u8DEF\u672C\u5730\uFF08\u542B\u4E91\u5143\u6570\u636E\u5730\u5740\uFF09"
  },
  { test: /* @__PURE__ */ __name((p) => p[0] === 172 && p[1] >= 16 && p[1] <= 31, "test"), reason: "172.16.0.0/12 \u79C1\u6709\u7F51\u6BB5" },
  { test: /* @__PURE__ */ __name((p) => p[0] === 192 && p[1] === 168, "test"), reason: "192.168.0.0/16 \u79C1\u6709\u7F51\u6BB5" },
  {
    test: /* @__PURE__ */ __name((p) => p[0] === 100 && p[1] >= 64 && p[1] <= 127, "test"),
    reason: "100.64.0.0/10 \u8FD0\u8425\u5546\u7EA7 NAT"
  },
  { test: /* @__PURE__ */ __name((p) => p[0] === 198 && p[1] >= 18 && p[1] <= 19, "test"), reason: "198.18.0.0/15 \u57FA\u51C6\u6D4B\u8BD5\u4FDD\u7559" },
  { test: /* @__PURE__ */ __name((p) => p[0] >= 224, "test"), reason: "\u7EC4\u64AD / \u4FDD\u7559\u5730\u5740" }
];
var BLOCKED_HOST_PATTERNS = [
  { test: /* @__PURE__ */ __name((host) => host === "localhost", "test"), reason: "localhost \u5C5E\u4E8E\u672C\u673A\u56DE\u73AF" },
  { test: /* @__PURE__ */ __name((host) => host.endsWith(".localhost"), "test"), reason: ".localhost \u540E\u7F00\u5C5E\u4E8E\u672C\u673A\u56DE\u73AF" },
  { test: /* @__PURE__ */ __name((host) => host.endsWith(".local"), "test"), reason: ".local \u662F mDNS \u5185\u7F51\u57DF\u540D" },
  { test: /* @__PURE__ */ __name((host) => host.endsWith(".internal"), "test"), reason: ".internal \u662F\u5185\u7F51\u4E13\u7528\u540E\u7F00" },
  { test: /* @__PURE__ */ __name((host) => host.endsWith(".lan"), "test"), reason: ".lan \u662F\u5185\u7F51\u4E13\u7528\u540E\u7F00" },
  { test: /* @__PURE__ */ __name((host) => host === "metadata.google.internal", "test"), reason: "\u4E91\u5382\u5546\u5143\u6570\u636E\u670D\u52A1\u5730\u5740" }
];
function blockedIPv4Reason(octets) {
  const hit = BLOCKED_IPV4.find((rule) => rule.test(octets));
  return hit ? hit.reason : "";
}
__name(blockedIPv4Reason, "blockedIPv4Reason");
function parseIPv6Groups(text) {
  let head = text;
  let tail = null;
  const compressed = text.indexOf("::");
  if (compressed !== -1) {
    if (text.includes("::", compressed + 1)) return null;
    head = text.slice(0, compressed);
    tail = text.slice(compressed + 2);
  }
  const parseGroups = /* @__PURE__ */ __name((part) => {
    if (part === "") return [];
    const pieces = part.split(":");
    const groups = [];
    for (let i = 0; i < pieces.length; i += 1) {
      const piece = pieces[i];
      if (piece.includes(".")) {
        if (i !== pieces.length - 1) return null;
        const dotted = piece.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
        if (!dotted) return null;
        const octets = dotted.slice(1).map(Number);
        if (octets.some((n) => n > 255)) return null;
        groups.push(octets[0] << 8 | octets[1], octets[2] << 8 | octets[3]);
        continue;
      }
      if (!/^[0-9a-f]{1,4}$/.test(piece)) return null;
      groups.push(parseInt(piece, 16));
    }
    return groups;
  }, "parseGroups");
  const headGroups = parseGroups(head);
  const tailGroups = tail === null ? [] : parseGroups(tail);
  if (!headGroups || !tailGroups) return null;
  if (tail === null && headGroups.length !== 8) return null;
  if (tail !== null && headGroups.length + tailGroups.length > 7) return null;
  const zeros = new Array(8 - headGroups.length - tailGroups.length).fill(0);
  return [...headGroups, ...zeros, ...tailGroups];
}
__name(parseIPv6Groups, "parseIPv6Groups");
function blockedIPv6Reason(host) {
  const groups = parseIPv6Groups(host.toLowerCase().replace(/^\[|\]$/g, ""));
  if (!groups) return "";
  if (groups.every((g) => g === 0)) return "IPv6 \u672A\u6307\u5B9A\u5730\u5740";
  if (groups[7] === 1 && groups.slice(0, 7).every((g) => g === 0)) return "IPv6 \u73AF\u56DE\u5730\u5740";
  if ((groups[0] & 65024) === 64512) return "fc00::/7 \u552F\u4E00\u672C\u5730\u5730\u5740";
  if ((groups[0] & 65472) === 65152) return "fe80::/10 \u94FE\u8DEF\u672C\u5730\u5730\u5740";
  let embedded = null;
  if (groups[5] === 65535 && groups.slice(0, 5).every((g) => g === 0)) {
    embedded = [groups[6] >> 8, groups[6] & 255, groups[7] >> 8, groups[7] & 255];
  } else if (groups[0] === 100 && groups[1] === 65435 && groups.slice(2, 6).every((g) => g === 0)) {
    embedded = [groups[6] >> 8, groups[6] & 255, groups[7] >> 8, groups[7] & 255];
  } else if (groups[0] === 8194) {
    embedded = [groups[1] >> 8, groups[1] & 255, groups[2] >> 8, groups[2] & 255];
  }
  if (embedded) return blockedIPv4Reason(embedded);
  return "";
}
__name(blockedIPv6Reason, "blockedIPv6Reason");
function blockedHostReason(hostname) {
  const host = String(hostname || "").toLowerCase().replace(/^\[|\]$/g, "");
  if (!host) return "\u8BA2\u9605\u5730\u5740\u7F3A\u5C11\u4E3B\u673A\u540D";
  for (const rule of BLOCKED_HOST_PATTERNS) {
    if (rule.test(host)) return rule.reason;
  }
  const ipv4 = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (ipv4) {
    const octets = ipv4.slice(1).map(Number);
    if (octets.some((part) => part > 255)) return "";
    return blockedIPv4Reason(octets);
  }
  if (host.includes(":")) return blockedIPv6Reason(host);
  return "";
}
__name(blockedHostReason, "blockedHostReason");
function checkSubscriptionUrl(raw) {
  let normalized;
  try {
    normalized = normalizeSubscriptionUrl(raw);
  } catch (error3) {
    if (error3 instanceof SubscriptionUrlError) return { error: error3.message };
    return { error: "\u8BA2\u9605\u5730\u5740\u65E0\u6CD5\u89E3\u6790" };
  }
  const host = new URL(normalized).hostname;
  const reason = blockedHostReason(host);
  if (reason) return { error: `\u4E0D\u5141\u8BB8\u6293\u53D6\u8BE5\u5730\u5740\uFF1A${reason}` };
  return { url: normalized };
}
__name(checkSubscriptionUrl, "checkSubscriptionUrl");

// api/_subscribe/cache.js
var MAX_CACHE_ENTRIES = 200;
var CACHE_TTL_MS4 = 5 * 60 * 1e3;
var parseCache = /* @__PURE__ */ new Map();
function readCache(url) {
  const hit = parseCache.get(url);
  if (!hit) return null;
  if (Date.now() - hit.at > CACHE_TTL_MS4) {
    parseCache.delete(url);
    return null;
  }
  return hit.value;
}
__name(readCache, "readCache");
function writeCache(url, value) {
  parseCache.delete(url);
  parseCache.set(url, { at: Date.now(), value });
  while (parseCache.size > MAX_CACHE_ENTRIES) {
    const oldest = parseCache.keys().next();
    if (oldest.done) break;
    parseCache.delete(oldest.value);
  }
}
__name(writeCache, "writeCache");

// api/_subscribe/extract.js
var MAX_RULE_LINES = 5e4;
var SECTION_HEADER = /^\s*\[.*\]\s*$/;
var CONFIG_LINE = /^\s*[A-Za-z0-9_.-]+\s*=/;
var BASE64_LIKE = /^[A-Za-z0-9+/=\s]+$/;
function normalizeFilterConfig(raw) {
  const keywordSource = Array.isArray(raw?.excludeKeywords) ? raw.excludeKeywords : String(raw?.excludeKeywords ?? "").split(/\r?\n/);
  const replaceSource = Array.isArray(raw?.replacements) ? raw.replacements : String(raw?.replacements ?? "").split(/\r?\n/);
  const excludeKeywords = [];
  for (const item of keywordSource) {
    const keyword = String(item ?? "").trim();
    if (keyword && !excludeKeywords.includes(keyword)) excludeKeywords.push(keyword);
    if (excludeKeywords.length >= 100) break;
  }
  const replacements = [];
  for (const entry of replaceSource) {
    let find = "";
    let replace = "";
    if (entry && typeof entry === "object") {
      find = String(entry.find ?? "").trim();
      replace = String(entry.replace ?? "").trim();
    } else {
      const text = String(entry ?? "").trim();
      const sep = text.indexOf("=>");
      if (sep <= 0) continue;
      find = text.slice(0, sep).trim();
      replace = text.slice(sep + 2).trim();
    }
    if (find && !replacements.some((rule) => rule.find === find && rule.replace === replace))
      replacements.push({ find, replace });
    if (replacements.length >= 100) break;
  }
  return { excludeKeywords, replacements };
}
__name(normalizeFilterConfig, "normalizeFilterConfig");
function applyReplacements(line, replacements) {
  let text = line;
  for (const { find, replace } of replacements) text = text.split(find).join(replace);
  return text;
}
__name(applyReplacements, "applyReplacements");
function extractRuleLines(content, filter = null) {
  const normalized = filter ? normalizeFilterConfig(filter) : { excludeKeywords: [], replacements: [] };
  const hasFilter = normalized.excludeKeywords.length > 0 || normalized.replacements.length > 0;
  const text = String(content || "");
  const lines = [];
  let skipped = 0;
  let filtered = 0;
  let seen = 0;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;
    seen += 1;
    if (SECTION_HEADER.test(line) || CONFIG_LINE.test(line)) {
      skipped += 1;
      continue;
    }
    if (hasFilter) {
      const candidate = applyReplacements(line, normalized.replacements);
      if (normalized.excludeKeywords.some((keyword) => candidate.includes(keyword))) {
        filtered += 1;
        continue;
      }
      const parsed = parseRuleLine(candidate);
      if (parsed && !parsed.invalid) {
        lines.push(candidate);
        if (lines.length >= MAX_RULE_LINES) break;
      } else {
        skipped += 1;
      }
    } else {
      const parsed = parseRuleLine(line);
      if (parsed && !parsed.invalid) {
        lines.push(line);
        if (lines.length >= MAX_RULE_LINES) break;
      } else {
        skipped += 1;
      }
    }
  }
  return { lines, skipped, filtered, total: seen };
}
__name(extractRuleLines, "extractRuleLines");
function isBase64Payload(line) {
  const text = String(line || "").split("//")[0].trim();
  return text.length > 60 && BASE64_LIKE.test(text);
}
__name(isBase64Payload, "isBase64Payload");
function decodeBase64(text) {
  try {
    const binary = atob(text);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
    return new TextDecoder("utf-8", { fatal: false }).decode(bytes);
  } catch {
    return "";
  }
}
__name(decodeBase64, "decodeBase64");
function retryAsBase64(text, first, filter = null) {
  const extractionRate = first.total > 0 ? first.lines.length / first.total : 0;
  const looksBase64 = BASE64_LIKE.test(text) && text.replace(/\s/g, "").length % 4 === 0;
  const soleLineIsBase64 = first.lines.length === 1 && isBase64Payload(first.lines[0]);
  if (!(first.total > 0 && looksBase64 && (extractionRate < 0.1 || soleLineIsBase64)))
    return null;
  const decoded = decodeBase64(text.replace(/\s/g, ""));
  if (!decoded) return null;
  const second = extractRuleLines(decoded, filter);
  return second.lines.length > 0 ? { ok: true, ...second, truncated: second.lines.length >= MAX_RULE_LINES } : null;
}
__name(retryAsBase64, "retryAsBase64");

// api/_logger/subscription-merge.js
var FETCH_TIMEOUT_MS = 6e3;
var MAX_MERGE_SUBSCRIPTIONS = 5;
function lineKey(type, value) {
  return `${String(type || "").toUpperCase()}|${String(value || "").trim().toLowerCase()}`;
}
__name(lineKey, "lineKey");
async function loadSubscriptionLines(url) {
  const cached = readCache(url);
  if (cached?.ok && Array.isArray(cached.lines)) return cached.lines;
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
    if (!response.ok) return null;
    const contentType = String(response.headers.get("content-type") || "").toLowerCase();
    if (contentType.includes("text/html")) return null;
    const text = await response.text();
    if (!text.trim()) return null;
    const extracted = extractRuleLines(text);
    writeCache(url, { ok: true, ...extracted, truncated: extracted.lines.length >= 5e4 });
    return extracted.lines;
  } catch {
    return null;
  }
}
__name(loadSubscriptionLines, "loadSubscriptionLines");
async function mergeSubscriptionRules(db, policyKey, lines) {
  const result = { lines, added: 0, merged: 0, items: [] };
  let subscriptions = [];
  try {
    subscriptions = await listSubscriptions(db);
  } catch {
    return result;
  }
  const wanted = String(policyKey || "").trim().toUpperCase();
  const matching = subscriptions.filter(
    (item) => String(item.policy || "").trim().toUpperCase() === wanted && wanted
  );
  if (!matching.length) return result;
  const taken = new Set(
    lines.map((line) => {
      const parsed = parseRuleLine(line);
      return parsed ? lineKey(parsed.type, parsed.value) : null;
    })
  );
  const extra = [];
  const items = [];
  let merged = 0;
  for (const item of matching.slice(0, MAX_MERGE_SUBSCRIPTIONS)) {
    const checked = checkSubscriptionUrl(item.url);
    if (checked.error) continue;
    const subLines = await loadSubscriptionLines(checked.url);
    if (!subLines) continue;
    merged += 1;
    for (const line of subLines) {
      const parsed = parseRuleLine(line);
      if (!parsed || parsed.invalid) continue;
      const effective = parsed.policySpecified ? String(parsed.policy || "").toUpperCase() : String(item.policy || "").trim().toUpperCase();
      if (effective !== wanted) continue;
      const key = lineKey(parsed.type, parsed.value);
      if (taken.has(key)) continue;
      taken.add(key);
      extra.push(line);
      items.push({ type: parsed.type, value: parsed.value, policy: effective, count: 0 });
    }
  }
  result.lines = extra.length ? [...lines, ...extra] : lines;
  result.added = extra.length;
  result.items = items;
  result.merged = merged;
  return result;
}
__name(mergeSubscriptionRules, "mergeSubscriptionRules");

// api/_logger/constants.js
var READ_PATHS = /* @__PURE__ */ new Set([
  "/api/logger",
  "/api/logger/stats",
  "/api/logger/export",
  "/api/logger/export-summary",
  "/api/logger/export-versions",
  "/api/logger/schema",
  "/api/logger/meta"
]);
var WRITE_PATHS = /* @__PURE__ */ new Set([
  "/api/logger/hit",
  "/api/logger/hits",
  "/api/logger/update",
  "/api/logger/delete",
  "/api/logger/exclude",
  "/api/logger/batch",
  "/api/logger/clear",
  "/api/logger/clear-empty",
  "/api/logger/clear-preset-comments",
  "/api/logger/clear-all-comments"
]);
function readMinCount(params) {
  const raw = Number(params.get("min-count"));
  if (!Number.isFinite(raw)) return 0;
  const value = Math.floor(raw);
  return value > 1 ? value : 0;
}
__name(readMinCount, "readMinCount");
function readLastDays(params) {
  const raw = Number(params.get("last-days"));
  if (!Number.isFinite(raw)) return 0;
  const value = Math.floor(raw);
  return value > 0 ? value : 0;
}
__name(readLastDays, "readLastDays");

// api/_logger/revisions.js
var EXPORT_POLICY_TYPES = ["all", "proxy", "direct", "reject"];
function exportPrefKey(type, pref) {
  return `export.policy.${String(type).toLowerCase()}.${pref}`;
}
__name(exportPrefKey, "exportPrefKey");
function revisionPrefKey(type) {
  return `export.policy.${String(type).toLowerCase()}.revision`;
}
__name(revisionPrefKey, "revisionPrefKey");
var LEGACY_EXPORT_PREFS = {
  source: "export.source",
  with_source: "export.with_source",
  min_count: "export.min_count",
  last_days: "export.last_days"
};
var FILTER_FIELDS = [
  { field: "source", param: "source", pref: "source", parse: /* @__PURE__ */ __name((value) => String(value ?? ""), "parse") },
  {
    field: "withSource",
    param: "with-source",
    pref: "with_source",
    parse: /* @__PURE__ */ __name((value) => String(value ?? "") === "1", "parse")
  },
  {
    field: "minCount",
    param: "min-count",
    pref: "min_count",
    parse: /* @__PURE__ */ __name((value) => readMinCount(new URLSearchParams({ "min-count": value ?? "" })), "parse")
  },
  {
    field: "lastDays",
    param: "last-days",
    pref: "last_days",
    parse: /* @__PURE__ */ __name((value) => readLastDays(new URLSearchParams({ "last-days": value ?? "" })), "parse")
  },
  // v12：与订阅合并（默认开——显式存 '0' 才关闭；缺省视为开，老部署升级行为不变）
  {
    field: "mergeSubscriptions",
    param: "merge-subscriptions",
    pref: "merge_subscriptions",
    parse: /* @__PURE__ */ __name((value) => String(value ?? "1") !== "0", "parse")
  }
];
async function resolvePolicyFilters(db, params, type) {
  const prefs = await listPrefs(db, "export");
  const resolved = {};
  for (const { field, param, pref, parse: parse2 } of FILTER_FIELDS) {
    const own = prefs[exportPrefKey(type, pref)];
    const value = own === void 0 ? prefs[LEGACY_EXPORT_PREFS[pref]] : own;
    resolved[field] = params.has(param) ? parse2(params.get(param)) : parse2(value);
  }
  return resolved;
}
__name(resolvePolicyFilters, "resolvePolicyFilters");
async function readExportRevisions(db, types = EXPORT_POLICY_TYPES) {
  const prefs = await listPrefs(db, "export");
  const out = {};
  for (const type of types) {
    try {
      const parsed = JSON.parse(prefs[revisionPrefKey(type)] ?? "null");
      const n = Math.max(0, Math.floor(Number(parsed?.n) || 0));
      if (parsed && n > 0) {
        out[type] = { n, hash: String(parsed.hash ?? ""), at: String(parsed.at ?? "") };
      }
    } catch {
    }
  }
  return out;
}
__name(readExportRevisions, "readExportRevisions");
async function sha256Hex8(text) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("").slice(0, 8);
}
__name(sha256Hex8, "sha256Hex8");
async function revisionFromLines(db, type, lines, count3, storedAll = null) {
  const hash = await sha256Hex8((lines ?? []).join("\n"));
  const stored = (storedAll ?? await readExportRevisions(db, [type]))[type];
  if (stored && stored.hash === hash) {
    return {
      type,
      n: stored.n,
      hash,
      revision: `v${stored.n}.${hash}`,
      at: stored.at,
      count: Number(count3) || 0,
      changed: false
    };
  }
  const n = (stored?.n || 0) + 1;
  const at = (/* @__PURE__ */ new Date()).toISOString();
  await savePrefs(db, "export", { [revisionPrefKey(type)]: JSON.stringify({ n, hash, at }) });
  return {
    type,
    n,
    hash,
    revision: `v${n}.${hash}`,
    at,
    count: Number(count3) || 0,
    changed: true
  };
}
__name(revisionFromLines, "revisionFromLines");
async function resolveExportRevisions(db, types = EXPORT_POLICY_TYPES) {
  const storedAll = await readExportRevisions(db, types);
  const out = {};
  for (const type of types) {
    const filters = await resolvePolicyFilters(db, new URLSearchParams(), type);
    const result = await buildExport(db, { type, ...filters });
    let lines = result.lines;
    let count3 = result.count;
    if (String(type).toLowerCase() !== "all" && filters.mergeSubscriptions) {
      try {
        const merged = await mergeSubscriptionRules(db, String(type).toUpperCase(), lines);
        lines = merged.lines;
        count3 = lines.length;
      } catch {
      }
    }
    out[type] = await revisionFromLines(db, type, lines, count3, storedAll);
  }
  return out;
}
__name(resolveExportRevisions, "resolveExportRevisions");

// api/export.js
var TAG6 = "api/export";
async function onRequest6(context2) {
  const { adapter: db, response } = await resolveAdapter(context2.env);
  if (response) return response;
  const url = new URL(context2.request.url);
  const method = context2.request.method;
  try {
    await db.ready;
    if (method !== "GET") return methodNotAllowed(method, "GET");
    const requested = (url.searchParams.get("policy") || "all").trim();
    const type = requested.toLowerCase() === "all" ? "all" : normalizePolicyKey(requested);
    const filters = await resolvePolicyFilters(db, url.searchParams, type);
    const result = await buildExport(db, { type, ...filters });
    let lines = result.lines;
    let count3 = result.count;
    if (type !== "all" && filters.mergeSubscriptions) {
      try {
        const merged = await mergeSubscriptionRules(
          db,
          normalizePolicyKey(type),
          result.lines
        );
        lines = merged.lines;
        count3 = lines.length;
      } catch (error3) {
        console.warn("[export] \u8BA2\u9605\u5408\u5E76\u5931\u8D25\uFF0C\u6309\u7EAF\u5E93\u5185\u89C4\u5219\u5BFC\u51FA", error3?.message || error3);
      }
    }
    const output = renderExportText(
      { ...result, lines, count: count3 },
      {
        withMeta: url.searchParams.get("meta") !== "0" && result.lines.length > 0,
        filterText: describeExportFilter({
          type,
          source: filters.source,
          minCount: filters.minCount,
          lastDays: filters.lastDays
        }).text
      }
    );
    const revision = await revisionFromLines(db, type, lines, count3);
    return textResponse(output, {
      headers: {
        "Cache-Control": "public, max-age=30",
        "X-Export-Count": String(count3),
        "X-Export-IPv4": String(result.ipv4),
        "X-Export-IPv6": String(result.ipv6),
        "X-Export-Revision": revision.revision,
        ...warningHeadersIfOpen(context2.env)
      }
    });
  } catch (error3) {
    return errorResponse(TAG6, method, url.pathname, error3);
  }
}
__name(onRequest6, "onRequest");

// api/gist.js
var TAG7 = "api/gist";
var NO_STORE3 = { "Cache-Control": "no-store" };
var GIST_API_BASE = "https://api.github.com";
var GIST_TIMEOUT_MS = 1e4;
var GIST_RETRY_ATTEMPTS = 3;
var GIST_RETRY_BASE_DELAY_MS = 500;
var backoffDelayMs = /* @__PURE__ */ __name((attempt) => GIST_RETRY_BASE_DELAY_MS * 2 ** (attempt - 1), "backoffDelayMs");
var sleep3 = /* @__PURE__ */ __name((ms) => new Promise((resolve) => setTimeout(resolve, ms)), "sleep");
function normalizeNetworkError(error3) {
  const message = String(error3?.message ?? error3);
  if (error3?.name === "TimeoutError" || error3?.name === "AbortError" || /aborted|timed?\s?out/i.test(message)) {
    return new Error(
      `\u8BF7\u6C42\u8D85\u65F6\uFF08${GIST_TIMEOUT_MS / 1e3} \u79D2/\u6B21\uFF0C\u5DF2\u91CD\u8BD5\uFF09\uFF1A\u8BF7\u68C0\u67E5\u7F51\u7EDC\u6216\u7A0D\u540E\u518D\u8BD5`
    );
  }
  if (/fetch failed|network|ENOTFOUND|ECONNREFUSED|EAI_AGAIN/i.test(message)) {
    return new Error(`\u7F51\u7EDC\u9519\u8BEF\uFF1A\u65E0\u6CD5\u8FDE\u63A5\u4E0A\u6E38\uFF08${message}\uFF09`);
  }
  return new Error(message);
}
__name(normalizeNetworkError, "normalizeNetworkError");
async function fetchWithRetry2(url, options = {}) {
  let lastError = null;
  for (let attempt = 1; attempt <= GIST_RETRY_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch(url, {
        ...options,
        signal: AbortSignal.timeout(GIST_TIMEOUT_MS)
      });
      if (response.status < 500 && response.status !== 429)
        return { response, attempts: attempt };
      lastError = new Error(`GitHub \u8FD4\u56DE ${response.status}`);
    } catch (error3) {
      lastError = error3;
    }
    if (attempt < GIST_RETRY_ATTEMPTS) await sleep3(backoffDelayMs(attempt));
  }
  throw normalizeNetworkError(lastError);
}
__name(fetchWithRetry2, "fetchWithRetry");
function extractGistToken(body, request) {
  return String(request.headers.get("x-gist-token") ?? "").trim() || String(body?.gistToken ?? "").trim();
}
__name(extractGistToken, "extractGistToken");
async function githubError(response, fallback) {
  const data = await response.json().catch(() => ({}));
  return new Error(data.message || `${fallback}\uFF08HTTP ${response.status}\uFF09`);
}
__name(githubError, "githubError");
async function uploadGistFile({ gistToken, gistId, fileName, content, description }) {
  const url = gistId ? `${GIST_API_BASE}/gists/${encodeURIComponent(gistId)}` : `${GIST_API_BASE}/gists`;
  const { response, attempts } = await fetchWithRetry2(url, {
    method: gistId ? "PATCH" : "POST",
    headers: {
      Authorization: `token ${gistToken}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      description,
      public: false,
      files: { [fileName]: { content } }
    })
  });
  if (!response.ok) throw await githubError(response, gistId ? "Gist \u66F4\u65B0\u5931\u8D25" : "Gist \u521B\u5EFA\u5931\u8D25");
  const data = await response.json().catch(() => ({}));
  const rawUrl = data.files?.[fileName]?.raw_url;
  if (!data.id || !rawUrl) throw new Error("Gist \u54CD\u5E94\u7F3A\u5C11 id / raw_url \u5B57\u6BB5");
  return { gistId: data.id, rawUrl, htmlUrl: data.html_url ?? "", attempts };
}
__name(uploadGistFile, "uploadGistFile");
async function fetchExternalContent({ url, gistToken = "" }) {
  const headers = {};
  if (gistToken && url.startsWith(GIST_API_BASE)) {
    headers.Authorization = `token ${gistToken}`;
    headers.Accept = "application/vnd.github+json";
  }
  const { response, attempts } = await fetchWithRetry2(url, { headers });
  if (!response.ok) throw await githubError(response, "\u5916\u94FE\u62C9\u53D6\u5931\u8D25");
  const content = await response.text();
  if (!content) throw new Error("\u5916\u94FE\u5185\u5BB9\u4E3A\u7A7A");
  return { content, attempts };
}
__name(fetchExternalContent, "fetchExternalContent");
async function buildPolicyExportText(db, type) {
  const filters = await resolvePolicyFilters(db, new URLSearchParams(), type);
  const result = await buildExport(db, { type, ...filters });
  let lines = result.lines;
  let count3 = result.count;
  if (type !== "all" && filters.mergeSubscriptions) {
    try {
      const merged = await mergeSubscriptionRules(db, normalizePolicyKey(type), result.lines);
      lines = merged.lines;
      count3 = lines.length;
    } catch (error3) {
      console.warn("[gist] \u8BA2\u9605\u5408\u5E76\u5931\u8D25\uFF0C\u6309\u7EAF\u5E93\u5185\u89C4\u5219\u5BFC\u51FA", error3?.message || error3);
    }
  }
  return renderExportText(
    { ...result, lines, count: count3 },
    {
      withMeta: result.lines.length > 0,
      filterText: describeExportFilter({
        type,
        source: filters.source,
        minCount: filters.minCount,
        lastDays: filters.lastDays
      }).text
    }
  );
}
__name(buildPolicyExportText, "buildPolicyExportText");
async function guardUpload(context2, db) {
  return guardPrincipal(context2.env, db, context2.request, context2, { auth: "mutation" });
}
__name(guardUpload, "guardUpload");
async function handleUpload(context2, db) {
  const gate = await guardUpload(context2, db);
  if (!gate.ok) return gate.response;
  const parsed = await readJson(context2);
  if (!parsed.ok) return badRequest("\u8BF7\u6C42\u4F53\u4E0D\u662F\u6709\u6548\u7684 JSON");
  const body = parsed.value ?? {};
  const policyKey = String(body.policyKey ?? "").trim();
  if (!policyKey) return badRequest("\u7F3A\u5C11 policyKey\uFF1A\u8981\u4E0A\u4F20\u54EA\u4EFD\u7B56\u7565\u7684\u5BFC\u51FA\u5185\u5BB9");
  const gistToken = extractGistToken(body, context2.request);
  if (!gistToken)
    return badRequest(
      "\u7F3A\u5C11 Gist Token\uFF1A\u8BF7\u7ECF x-gist-token \u5934\u6216 body.gistToken \u968F\u8BF7\u6C42\u4E2D\u8F6C\uFF08\u670D\u52A1\u7AEF\u4E0D\u4FDD\u5B58\uFF09"
    );
  const type = policyKey.toLowerCase() === "all" ? "all" : normalizePolicyKey(policyKey);
  const content = await buildPolicyExportText(db, type);
  if (!content.trim()) return badRequest(`\u7B56\u7565 ${type} \u5F53\u524D\u6CA1\u6709\u53EF\u4E0A\u4F20\u7684\u89C4\u5219\u884C`);
  try {
    const result = await uploadGistFile({
      gistToken,
      gistId: String(body.gistId ?? "").trim(),
      fileName: `surge_export_${type.toLowerCase()}.list`,
      content,
      description: `Surge \u7B56\u7565\u7EC4 \xB7 ${type.toUpperCase()}\uFF08\u7531\u9762\u677F Gist \u5B9A\u65F6\u540C\u6B65\u7EF4\u62A4\uFF09`
    });
    return jsonResponse(
      { success: true, data: { policyKey: type, ...result } },
      { headers: NO_STORE3 }
    );
  } catch (error3) {
    return jsonResponse(
      { success: false, error: error3.message },
      { status: 502, headers: NO_STORE3 }
    );
  }
}
__name(handleUpload, "handleUpload");
async function handleFetch(context2, db) {
  const gate = await guardUpload(context2, db);
  if (!gate.ok) return gate.response;
  const parsed = await readJson(context2);
  if (!parsed.ok) return badRequest("\u8BF7\u6C42\u4F53\u4E0D\u662F\u6709\u6548\u7684 JSON");
  const body = parsed.value ?? {};
  const url = String(body.url ?? "").trim();
  if (!/^https:\/\//.test(url)) return badRequest("\u7F3A\u5C11\u6709\u6548\u7684 https \u5916\u94FE\u5730\u5740");
  if (!/^https:\/\/(gist\.githubusercontent\.com|api\.github\.com|raw\.githubusercontent\.com)\//.test(
    url
  )) {
    return badRequest("\u5916\u94FE\u4EC5\u652F\u6301 GitHub Gist / raw.githubusercontent.com \u5730\u5740");
  }
  try {
    const result = await fetchExternalContent({
      url,
      gistToken: extractGistToken(body, context2.request)
    });
    return jsonResponse(
      { success: true, data: { url, content: result.content, attempts: result.attempts } },
      { headers: NO_STORE3 }
    );
  } catch (error3) {
    return jsonResponse(
      { success: false, error: error3.message },
      { status: 502, headers: NO_STORE3 }
    );
  }
}
__name(handleFetch, "handleFetch");
async function handleGistRequest(context2, db, path, method) {
  try {
    if (path === "/api/gist/upload" && method === "POST")
      return await handleUpload(context2, db);
    if (path === "/api/gist/fetch" && method === "POST") return await handleFetch(context2, db);
    if (path === "/api/gist/upload" || path === "/api/gist/fetch") {
      return methodNotAllowed(method, "POST");
    }
    return notFound(`\u672A\u77E5\u7684\u63A5\u53E3\uFF1A${path}`);
  } catch (error3) {
    return errorResponse(TAG7, method, path, error3);
  }
}
__name(handleGistRequest, "handleGistRequest");
async function onRequest7(context2) {
  const { adapter: db, response } = await resolveAdapter(context2.env);
  if (response) return response;
  await db.ready;
  const url = new URL(context2.request.url);
  return handleGistRequest(context2, db, url.pathname, context2.request.method);
}
__name(onRequest7, "onRequest");

// api/_users/guards.js
async function guard2(context2, db) {
  return guardPrincipal(context2.env, db, context2.request, context2, {
    auth: "admin",
    feature: "users.manage"
  });
}
__name(guard2, "guard");
async function keyGuard(context2, db, id) {
  const gate = await requireMutationAuth(context2.env, db, context2.request, context2);
  if (!gate.ok) return gate;
  const principal = gate.principal;
  if (principal.type === "user" && principal.via !== "user-key" && Number(principal.user.id) === Number(id)) {
    return { ok: true, principal };
  }
  if (!isPrincipalAdmin(principal)) {
    return {
      ok: false,
      response: jsonResponse(
        { success: false, error: "\u53EA\u80FD\u91CD\u7F6E\u81EA\u5DF1\u7684\u5BC6\u94A5\uFF1A\u91CD\u7F6E\u4ED6\u4EBA\u5BC6\u94A5\u9700\u8981\u7BA1\u7406\u5458\u8EAB\u4EFD" },
        { status: 403, headers: NO_CACHE }
      )
    };
  }
  const featureDenied = await requireFeature(principal, "users.manage", { db });
  if (featureDenied) return { ok: false, response: featureDenied };
  return { ok: true, principal };
}
__name(keyGuard, "keyGuard");
function serializePermissions(value) {
  const normalized = normalizeFeatures(value);
  return JSON.stringify({ features: normalized });
}
__name(serializePermissions, "serializePermissions");

// api/_users/users-validate.js
function validateUserPayload(body, { requirePassword }) {
  const username = String(body.username ?? "").trim();
  const usernameError = validateUsername(username);
  if (usernameError && username) return { error: usernameError };
  let uid;
  if (body.uid !== void 0) {
    const uidValue = String(body.uid ?? "").trim();
    if (uidValue) {
      const uidError = validateUid(uidValue);
      if (uidError) return { error: uidError };
    }
    uid = uidValue;
  }
  const password = String(body.password ?? "");
  if (requirePassword) {
    const passwordError = validatePasswordStrength(password);
    if (passwordError) return { error: passwordError };
  } else if (password && validatePasswordStrength(password)) {
    return { error: validatePasswordStrength(password) };
  }
  const role = body.role === void 0 ? "user" : String(body.role);
  const status4 = body.status === void 0 ? void 0 : String(body.status);
  if (status4 !== void 0 && !USER_STATUSES.includes(status4)) {
    return { error: `\u72B6\u6001\u5FC5\u987B\u662F\uFF1A${USER_STATUSES.join(" / ")}` };
  }
  let groupId = body.groupId;
  if (groupId !== void 0 && groupId !== null && groupId !== "") {
    groupId = Number(groupId);
    if (!Number.isInteger(groupId) || groupId <= 0)
      return { error: "groupId \u5FC5\u987B\u662F\u6B63\u6574\u6570\u6216 null" };
  } else {
    groupId = null;
  }
  const displayName = body.displayName === void 0 ? void 0 : String(body.displayName).slice(0, 32);
  const permissions = body.features === void 0 ? void 0 : serializePermissions(body.features);
  return { value: { username, uid, password, role, status: status4, groupId, displayName, permissions } };
}
__name(validateUserPayload, "validateUserPayload");
async function ensureUidAvailable(db, uid) {
  const value = String(uid ?? "").trim();
  if (!value) return "";
  const byUid = await getUserByUid(db, value);
  if (byUid) return `UID \u5DF2\u88AB\u7528\u6237\u300C${byUid.username}\u300D\u5360\u7528`;
  const byName = await getUserByUsername(db, value);
  if (byName) return `UID \u4E0E\u7528\u6237\u300C${value}\u300D\u7684\u7528\u6237\u540D\u51B2\u7A81\uFF0C\u8BF7\u6362\u4E00\u4E2A`;
  return "";
}
__name(ensureUidAvailable, "ensureUidAvailable");
async function writeUserGuarded(write, messageFor) {
  try {
    return { user: await write() };
  } catch (error3) {
    const target = constraintTargetOf(error3);
    if (target) {
      return { conflict: messageFor(target.endsWith(".username") ? "username" : "uid") };
    }
    throw error3;
  }
}
__name(writeUserGuarded, "writeUserGuarded");

// _utils/presence.js
var CONFIG_ROLLUP_ORDER = ["failed", "outdated", "latest"];
var RESOURCE_ROLLUP_ORDER = ["outdated", "unknown", "latest"];
function sanitizeBoundUser(user) {
  return {
    id: Number(user.id),
    username: String(user.username ?? ""),
    displayName: String(user.displayName ?? ""),
    role: String(user.role ?? "user"),
    groupId: user.groupId == null ? null : Number(user.groupId),
    status: String(user.status ?? "active"),
    lastLoginAt: String(user.lastLoginAt ?? "")
  };
}
__name(sanitizeBoundUser, "sanitizeBoundUser");
function rollupConfigStatus(statuses) {
  for (const status4 of CONFIG_ROLLUP_ORDER) {
    if (statuses.includes(status4)) return status4;
  }
  return "latest";
}
__name(rollupConfigStatus, "rollupConfigStatus");
function rollupResourceStatus(statuses) {
  for (const status4 of RESOURCE_ROLLUP_ORDER) {
    if (statuses.includes(status4)) return status4;
  }
  return "";
}
__name(rollupResourceStatus, "rollupResourceStatus");
function rollupSubscriptions(devices) {
  let subscribed = 0;
  for (const device of devices) {
    const count3 = Object.values(device.subscriptions ?? {}).filter(Boolean).length;
    if (count3 > subscribed) subscribed = count3;
  }
  return subscribed;
}
__name(rollupSubscriptions, "rollupSubscriptions");
function latestVersion(devices, key) {
  let winner = "";
  let stamp = 0;
  for (const device of devices) {
    const value = String(device[key] ?? "");
    const time3 = Date.parse(String(device.lastOnlineTime ?? "")) || 0;
    if (value && time3 >= stamp) {
      winner = value;
      stamp = time3;
    }
  }
  return winner;
}
__name(latestVersion, "latestVersion");
async function listUserPresence(db, { limit = 100, devices = null, users = null } = {}) {
  const [userRows, deviceRows] = await Promise.all([
    users ?? listUsers(db),
    devices ?? listDevices(db, { limit: Math.max(1, Math.min(Number(limit) || 100, 500)) })
  ]);
  const grouped2 = /* @__PURE__ */ new Map();
  for (const user of userRows) {
    const key = normalizeUsername(user.username).toLowerCase();
    if (!key || grouped2.has(key)) continue;
    grouped2.set(key, {
      key,
      username: normalizeUsername(user.username),
      boundUser: sanitizeBoundUser(user),
      devices: []
    });
  }
  for (const device of deviceRows) {
    const key = normalizeUsername(device.username).toLowerCase();
    if (!key || !grouped2.has(key)) continue;
    grouped2.get(key).devices.push(device);
  }
  const presences = [...grouped2.values()].map((entry) => {
    const summary = deviceSummary(entry.devices);
    const lastActive = entry.devices.reduce((latest, device) => {
      const time3 = Date.parse(String(device.lastOnlineTime ?? "")) || 0;
      return time3 > latest ? time3 : latest;
    }, 0);
    return {
      key: entry.key,
      username: entry.username,
      // 账号化后每一条 presence 都来自账号表：bound 恒为 true。字段保留只为不破坏
      // /stats 的响应契约——bound=false 的「未绑定用户」这一形态不再存在
      bound: true,
      boundUser: entry.boundUser,
      deviceCount: summary.total,
      onlineCount: summary.online,
      online: summary.online > 0,
      lastActiveTime: lastActive ? new Date(lastActive).toISOString() : "",
      panelVersion: latestVersion(entry.devices, "panelVersion"),
      loggerVersion: latestVersion(entry.devices, "loggerVersion"),
      configStatus: rollupConfigStatus(
        entry.devices.map((device) => device.configStatus)
      ),
      // 外部资源订阅状态（v1.17）：账号卡「资源订阅 n/3 · 状态」行的数据源
      subscribedCount: rollupSubscriptions(entry.devices),
      resourceStatus: rollupResourceStatus(
        entry.devices.map((device) => device.resourceStatus)
      ),
      stalePolicies: [
        ...new Set(entry.devices.flatMap((device) => device.stalePolicies ?? []))
      ],
      alertCount: summary.alertCount,
      alerts: summary.alerts,
      devices: entry.devices
    };
  }).sort((a, b) => {
    if (a.online !== b.online) return a.online ? -1 : 1;
    const left = Date.parse(a.lastActiveTime || "") || 0;
    const right = Date.parse(b.lastActiveTime || "") || 0;
    if (left !== right) return right - left;
    return a.username.localeCompare(b.username);
  });
  return presences;
}
__name(listUserPresence, "listUserPresence");
function userPresenceSummary(presences) {
  const list2 = Array.isArray(presences) ? presences : [];
  const onlineUsers = list2.filter((item) => item.online).length;
  return {
    total: list2.length,
    bound: list2.length,
    unbound: 0,
    online: onlineUsers,
    offline: list2.length - onlineUsers,
    onlineDevices: list2.reduce((sum, item) => sum + (item.onlineCount || 0), 0),
    totalDevices: list2.reduce((sum, item) => sum + (item.deviceCount || 0), 0),
    alertCount: list2.reduce((sum, item) => sum + (item.alertCount || 0), 0)
  };
}
__name(userPresenceSummary, "userPresenceSummary");
function countUnboundDevices(devices, presences) {
  const accounts = new Set(
    (presences ?? []).map(
      (item) => String(item.username ?? "").trim().toLowerCase()
    )
  );
  return (devices ?? []).filter(
    (device) => !accounts.has(
      String(device.username ?? "").trim().toLowerCase()
    )
  ).length;
}
__name(countUnboundDevices, "countUnboundDevices");
async function getUserPresenceReport(db, { limit = 100, devices = null } = {}) {
  const deviceRows = devices ?? await listDevices(db, { limit: Math.max(1, Math.min(Number(limit) || 100, 500)) });
  const users = await listUserPresence(db, { limit, devices: deviceRows });
  return {
    users,
    userSummary: {
      ...userPresenceSummary(users),
      unboundDevices: countUnboundDevices(deviceRows, users)
    }
  };
}
__name(getUserPresenceReport, "getUserPresenceReport");

// api/_users/users-presence.js
async function handleListUserPresence(context2, db) {
  const gate = await guard2(context2, db);
  if (!gate.ok) return gate.response;
  const url = new URL(context2.request.url);
  const username = (url.searchParams.get("username") ?? "").trim().toLowerCase();
  const bound = url.searchParams.get("bound");
  const online = url.searchParams.get("online");
  const report2 = await getUserPresenceReport(db, { limit: 200 });
  let users = report2.users ?? [];
  if (username)
    users = users.filter((user) => String(user.username ?? "").toLowerCase() === username);
  if (bound === "true") users = users.filter((user) => user.bound);
  if (bound === "false") users = users.filter((user) => !user.bound);
  if (online === "true") users = users.filter((user) => user.online);
  if (online === "false") users = users.filter((user) => !user.online);
  const slimUsers = users.map(({ devices, alerts, stalePolicies, ...rest }) => {
    void devices;
    void alerts;
    void stalePolicies;
    return rest;
  });
  return jsonResponse(
    { success: true, data: { users: slimUsers, userSummary: userPresenceSummary(users) } },
    { headers: NO_CACHE }
  );
}
__name(handleListUserPresence, "handleListUserPresence");

// api/_users/users-crud.js
async function handleListUsers(context2, db) {
  const gate = await guard2(context2, db);
  if (!gate.ok) return gate.response;
  const seededTestAccount = await ensureBuiltinTestUser(db);
  const [users, groups, memberCounts] = await Promise.all([
    listUsers(db),
    listGroups(db),
    listGroupMemberCounts(db)
  ]);
  const withCounts = groups.map((group3) => ({
    ...group3,
    memberCount: memberCounts.get(group3.id) || 0
  }));
  return jsonResponse(
    {
      success: true,
      data: {
        users,
        groups: withCounts,
        ...seededTestAccount ? { testAccount: seededTestAccount } : {}
      }
    },
    { headers: NO_CACHE }
  );
}
__name(handleListUsers, "handleListUsers");
async function handleCreateUser(context2, db) {
  const gate = await guard2(context2, db);
  if (!gate.ok) return gate.response;
  const parsed = await readJson(context2);
  if (!parsed.ok) return badRequest("\u8BF7\u6C42\u4F53\u4E0D\u662F\u6709\u6548\u7684 JSON");
  const check2 = validateUserPayload(parsed.value ?? {}, { requirePassword: true });
  if (check2.error) return badRequest(check2.error);
  const { username, uid, password, role, groupId, displayName, permissions } = check2.value;
  const roleError = await validateRoleValue(db, role);
  if (roleError) return badRequest(roleError);
  const duplicate = await getUserByUsername(db, username);
  if (duplicate) return badRequest(`\u8D26\u53F7\u5DF2\u5B58\u5728\uFF1A${username}`);
  const adminSlot = isActiveAdmin(role, "active") ? await singleAdminViolation(db, "add") : null;
  if (adminSlot) return badRequest(`${adminSlot}\uFF0C\u8BF7\u6539\u7528\u666E\u901A\u7528\u6237\u6216\u81EA\u5B9A\u4E49\u89D2\u8272`);
  const effectiveUid = !uid ? username : uid;
  const uidConflict = await ensureUidAvailable(db, effectiveUid);
  if (uidConflict) return badRequest(uidConflict);
  if (groupId && !await getGroupById(db, groupId)) return badRequest("\u7528\u6237\u7EC4\u4E0D\u5B58\u5728");
  const passwordHash = await hashPassword(password);
  const created = await writeUserGuarded(
    () => createUser(db, {
      username,
      passwordHash,
      role,
      groupId,
      displayName,
      permissions,
      uid: effectiveUid === username ? null : uid
    }),
    (column) => column === "username" ? `\u8D26\u53F7\u5DF2\u5B58\u5728\uFF1A${username}` : `UID \u5DF2\u88AB\u5360\u7528\uFF1A${effectiveUid}`
  );
  if (created.conflict) return badRequest(created.conflict);
  const user = created.user;
  const userKey = generateUserKey();
  await setUserKey(db, user.id, {
    keyHash: await hashUserKey(userKey),
    preview: userKeyPreview(userKey)
  });
  invalidateAuthStateCache();
  await recordAudit(
    db,
    gate.principal,
    "user.create",
    "user",
    user.id,
    user.username,
    `role=${user.role}`
  );
  return jsonResponse(
    { success: true, data: { ...user, userKey } },
    { status: 201, headers: NO_CACHE }
  );
}
__name(handleCreateUser, "handleCreateUser");
async function handlePatchUser(context2, db, id) {
  const gate = await guard2(context2, db);
  if (!gate.ok) return gate.response;
  const row = await getUserById(db, id);
  if (!row) return notFound("\u7528\u6237\u4E0D\u5B58\u5728");
  const parsed = await readJson(context2);
  if (!parsed.ok) return badRequest("\u8BF7\u6C42\u4F53\u4E0D\u662F\u6709\u6548\u7684 JSON");
  const body = parsed.value ?? {};
  const requestedUsername = String(body.username ?? "").trim();
  const check2 = validateUserPayload(
    { ...body, username: requestedUsername || row.username },
    { requirePassword: false }
  );
  if (check2.error) return badRequest(check2.error);
  const { username, uid, password, role, status: status4, groupId, displayName, permissions } = check2.value;
  const usernameChanged = Boolean(requestedUsername) && requestedUsername !== String(row.username ?? "");
  const roleError = await validateRoleValue(db, role ?? row.role);
  if (roleError) return badRequest(roleError);
  const wasAdmin = isActiveAdmin(row.role, row.status);
  const willBeAdmin = isActiveAdmin(role ?? row.role, status4 ?? row.status);
  if (wasAdmin && !willBeAdmin) {
    const lastAdmin = await singleAdminViolation(db, "remove", "\u505C\u7528");
    if (lastAdmin) return badRequest(lastAdmin);
  }
  const adminSlot = !wasAdmin && willBeAdmin ? await singleAdminViolation(db, "add") : null;
  if (adminSlot) return badRequest(`${adminSlot}\uFF0C\u65E0\u6CD5\u518D\u521B\u5EFA\u7B2C\u4E8C\u4F4D`);
  if (usernameChanged) {
    const taken = await getUserByUsername(db, username);
    if (taken && Number(taken.id) !== Number(id))
      return badRequest(`\u8D26\u53F7\u5DF2\u88AB\u5360\u7528\uFF1A${username}`);
  }
  if (groupId && !await getGroupById(db, groupId)) return badRequest("\u7528\u6237\u7EC4\u4E0D\u5B58\u5728");
  const uidFollowsAccount = String(row.uid ?? "") === String(row.username ?? "");
  const effectiveUid = uidFollowsAccount && usernameChanged ? username : uid;
  if (effectiveUid !== void 0 && effectiveUid !== String(row.uid ?? "")) {
    const uidConflict = await ensureUidAvailable(db, effectiveUid);
    if (uidConflict) return badRequest(uidConflict);
  }
  const patch = {};
  if (usernameChanged) patch.username = username;
  if (password) patch.passwordHash = await hashPassword(password);
  if (effectiveUid !== void 0) patch.uid = effectiveUid;
  if (role !== void 0 && role !== row.role) patch.role = role;
  if (status4 !== void 0 && status4 !== row.status) patch.status = status4;
  if (groupId !== void 0) patch.groupId = groupId;
  if (displayName !== void 0) patch.displayName = displayName;
  if (permissions !== void 0) patch.permissions = permissions;
  const patched = await writeUserGuarded(
    () => updateUser(db, id, patch),
    (column) => column === "username" ? `\u8D26\u53F7\u5DF2\u88AB\u5360\u7528\uFF1A${String(patch.username ?? "")}` : `UID \u5DF2\u88AB\u5360\u7528\uFF1A${String(patch.uid ?? "").trim()}`
  );
  if (patched.conflict) return badRequest(patched.conflict);
  const user = patched.user;
  if (patch.status === "disabled" || patch.passwordHash) {
    await deleteUserSessions(db, id).catch(() => {
    });
  }
  if (patch.status === "disabled") {
    await deleteUserChannels(db, id).catch(() => {
    });
  }
  await recordAudit(
    db,
    gate.principal,
    "user.update",
    "user",
    user.id,
    user.username,
    `\u53D8\u66F4:${Object.keys(patch).join(", ") || "\u65E0"}`
  );
  return jsonResponse({ success: true, data: user }, { headers: NO_CACHE });
}
__name(handlePatchUser, "handlePatchUser");
async function handleDeleteUser(context2, db, id) {
  const gate = await guard2(context2, db);
  if (!gate.ok) return gate.response;
  const row = await getUserById(db, id);
  if (!row) return notFound("\u7528\u6237\u4E0D\u5B58\u5728");
  if (Number(row.is_builtin ?? 0) === 1) {
    return badRequest(
      "\u5185\u7F6E\u6D4B\u8BD5\u8D26\u53F7\u4E0D\u53EF\u5220\u9664\uFF1A\u5982\u9700\u6536\u56DE\u5176\u6743\u9650\uFF0C\u53EF\u7981\u7528\u8D26\u53F7\u6216\u8C03\u6574\u89D2\u8272 / \u7528\u6237\u7EC4 / \u529F\u80FD\u9650\u5236"
    );
  }
  if (gate.principal.type === "user" && Number(gate.principal.user.id) === Number(id)) {
    return badRequest("\u4E0D\u80FD\u5220\u9664\u5F53\u524D\u767B\u5F55\u7684\u8D26\u53F7");
  }
  if (isActiveAdmin(row.role, row.status)) {
    const lastAdmin = await singleAdminViolation(db, "remove", "\u5220\u9664");
    if (lastAdmin) return badRequest(lastAdmin);
  }
  await deleteUser(db, id);
  invalidateAuthStateCache();
  await recordAudit(
    db,
    gate.principal,
    "user.delete",
    "user",
    id,
    row.username,
    `role=${row.role} status=${row.status}`
  );
  return jsonResponse({ success: true, data: { deleted: Number(id) } }, { headers: NO_CACHE });
}
__name(handleDeleteUser, "handleDeleteUser");

// api/_users/users-batch.js
var BATCH_MAX_USERS = 50;
async function validateBatchInput(db, body) {
  const count3 = Math.floor(Number(body.count));
  if (!Number.isFinite(count3) || count3 < 1) return { error: "count \u5FC5\u987B\u662F \u2265 1 \u7684\u6574\u6570" };
  if (count3 > BATCH_MAX_USERS) return { error: `\u5355\u6B21\u6700\u591A\u521B\u5EFA ${BATCH_MAX_USERS} \u4E2A\u7528\u6237` };
  const role = body.role === void 0 ? "user" : String(body.role);
  const batchRoleError = await validateRoleValue(db, role);
  if (batchRoleError) return { error: batchRoleError };
  if (isActiveAdmin(role, "active") && body.confirmAdmin !== true) {
    return { error: "\u6279\u91CF\u521B\u5EFA\u7BA1\u7406\u5458\u9700\u8981\u663E\u5F0F\u786E\u8BA4\uFF1A\u8BF7\u6C42\u643A\u5E26 confirmAdmin: true" };
  }
  const adminSlot = isActiveAdmin(role, "active") ? await singleAdminViolation(db, "add") : null;
  if (adminSlot) return { error: `${adminSlot}\uFF0C\u6279\u91CF\u521B\u5EFA\u8BF7\u6539\u7528\u666E\u901A\u7528\u6237\u6216\u81EA\u5B9A\u4E49\u89D2\u8272` };
  let groupId = body.groupId;
  if (groupId !== void 0 && groupId !== null && groupId !== "") {
    groupId = Number(groupId);
    if (!Number.isInteger(groupId) || groupId <= 0)
      return { error: "groupId \u5FC5\u987B\u662F\u6B63\u6574\u6570\u6216 null" };
  } else {
    groupId = null;
  }
  if (groupId && !await getGroupById(db, groupId)) return { error: "\u7528\u6237\u7EC4\u4E0D\u5B58\u5728" };
  const prefix = String(body.namePrefix ?? "").trim().replace(/[^a-zA-Z0-9_-]/g, "");
  if (prefix.length > 20) return { error: "namePrefix \u9700 \u2264 20 \u4E2A\u5B57\u7B26\uFF08\u5B57\u6BCD\u6570\u5B57\u4E0B\u5212\u7EBF\u8FDE\u5B57\u7B26\uFF09" };
  const effectivePrefix = prefix || `user${generateUsernameSuffix(3)}`;
  const template = body.displayNameTemplate === void 0 ? "" : String(body.displayNameTemplate).slice(0, 32);
  const permissions = body.features === void 0 ? "{}" : serializePermissions(body.features);
  return { input: { count: count3, role, groupId, effectivePrefix, template, permissions } };
}
__name(validateBatchInput, "validateBatchInput");
async function buildCandidates(db, effectivePrefix, count3) {
  const taken = new Set(await listUsernamesByPrefix(db, effectivePrefix));
  const candidates = [];
  let skipped = 0;
  let seq = 1;
  const maxAttempts = count3 * 25 + 100;
  while (candidates.length < count3 && seq <= maxAttempts) {
    const username = `${effectivePrefix}${seq}`;
    seq += 1;
    if (validateUsername(username) || taken.has(username)) {
      skipped += 1;
      continue;
    }
    candidates.push(username);
  }
  return { candidates, skipped };
}
__name(buildCandidates, "buildCandidates");
async function deriveCredentialRows(candidates, { template, role, groupId, permissions }) {
  const passwords = candidates.map(() => generateUserPassword());
  const rows = candidates.map((username, index) => {
    const userKey = generateUserKey();
    return {
      username,
      password: passwords[index],
      userKey,
      keyPreview: userKeyPreview(userKey),
      displayName: template ? template.replaceAll("{n}", String(index + 1)).replaceAll("{username}", username) : username,
      role,
      groupId,
      permissions
    };
  });
  const [passwordHashes, keyHashes] = await Promise.all([
    Promise.all(passwords.map((password) => hashPassword(password))),
    Promise.all(rows.map((row) => hashUserKey(row.userKey)))
  ]);
  rows.forEach((row, index) => {
    row.passwordHash = passwordHashes[index];
    row.keyHash = keyHashes[index];
  });
  return rows;
}
__name(deriveCredentialRows, "deriveCredentialRows");
async function handleBatchCreateUsers(context2, db) {
  const gate = await guard2(context2, db);
  if (!gate.ok) return gate.response;
  const parsed = await readJson(context2);
  if (!parsed.ok) return badRequest("\u8BF7\u6C42\u4F53\u4E0D\u662F\u6709\u6548\u7684 JSON");
  const body = parsed.value ?? {};
  const { error: error3, input } = await validateBatchInput(db, body);
  if (error3) return badRequest(error3);
  const { candidates, skipped } = await buildCandidates(db, input.effectivePrefix, input.count);
  if (candidates.length < input.count) {
    return badRequest(
      `\u4EC5\u80FD\u521B\u5EFA ${candidates.length}/${input.count} \u4E2A\u7528\u6237\uFF1A\u53EF\u7528\u7528\u6237\u540D\u4E0D\u8DB3\uFF0C\u8BF7\u6362\u66F4\u77ED\u7684\u7528\u6237\u540D\u524D\u7F00`
    );
  }
  const rows = await deriveCredentialRows(candidates, input);
  const written = await writeUserGuarded(
    () => createUsersBulk(db, rows),
    (column) => column === "username" ? "\u8D26\u53F7\u5DF2\u5B58\u5728\uFF08\u5E76\u53D1\u521B\u5EFA\u51B2\u7A81\uFF09\uFF0C\u8BF7\u91CD\u8BD5" : "UID \u5DF2\u88AB\u5360\u7528"
  );
  if (written.conflict) return badRequest(written.conflict);
  const saved = await listUsersByUsernames(db, candidates);
  const idByUsername = new Map(saved.map((user) => [user.username, user.id]));
  const created = rows.map((row) => ({
    id: idByUsername.get(row.username) ?? null,
    username: row.username,
    displayName: row.displayName,
    role: input.role,
    groupId: input.groupId,
    password: row.password,
    userKey: row.userKey
  }));
  invalidateAuthStateCache();
  await recordAudit(
    db,
    gate.principal,
    "user.batch_create",
    "user",
    null,
    input.effectivePrefix,
    `count=${created.length} role=${input.role}`
  );
  return jsonResponse(
    { success: true, data: { created, skipped } },
    { status: 201, headers: NO_CACHE }
  );
}
__name(handleBatchCreateUsers, "handleBatchCreateUsers");

// api/_users/audit-handlers.js
async function handleListAuditLogs(context2, db) {
  const gate = await guard2(context2, db);
  if (!gate.ok) return gate.response;
  const url = new URL(context2.request.url);
  const limit = url.searchParams.get("limit") ?? void 0;
  const logs = await listAuditLogs(db, limit === void 0 ? 100 : Number(limit));
  return jsonResponse({ success: true, data: { logs } }, { headers: NO_CACHE });
}
__name(handleListAuditLogs, "handleListAuditLogs");

// api/_users/users-credentials.js
async function handleResetUserKey(context2, db, id) {
  const gate = await keyGuard(context2, db, Number(id));
  if (!gate.ok) return gate.response;
  const row = await getUserById(db, id);
  if (!row) return notFound("\u7528\u6237\u4E0D\u5B58\u5728");
  if (String(row.status ?? "active") !== "active") {
    return badRequest("\u8D26\u53F7\u5DF2\u88AB\u7981\u7528\uFF1A\u8BF7\u5148\u542F\u7528\u8D26\u53F7\u518D\u91CD\u7F6E\u5BC6\u94A5");
  }
  const userKey = generateUserKey();
  const now2 = (/* @__PURE__ */ new Date()).toISOString();
  await setUserKey(db, Number(id), {
    keyHash: await hashUserKey(userKey),
    preview: userKeyPreview(userKey)
  });
  await deleteUserChannels(db, Number(id)).catch(() => {
  });
  await recordAudit(
    db,
    gate.principal,
    "user.key_reset",
    "user",
    Number(id),
    row.username,
    "\u91CD\u7F6E\u7528\u6237\u5BC6\u94A5(\u65E7\u5BC6\u94A5\u5373\u540A\u9500)"
  );
  return jsonResponse(
    { success: true, data: { userKey, preview: userKeyPreview(userKey), createdAt: now2 } },
    { headers: NO_CACHE }
  );
}
__name(handleResetUserKey, "handleResetUserKey");
async function handleCreateUserByUid(context2, db) {
  const gate = await guard2(context2, db);
  if (!gate.ok) return gate.response;
  const parsed = await readJson(context2);
  if (!parsed.ok) return badRequest("\u8BF7\u6C42\u4F53\u4E0D\u662F\u6709\u6548\u7684 JSON");
  const body = parsed.value ?? {};
  const uid = String(body.uid ?? "").trim();
  const uidError = validateUid(uid);
  if (uidError) return badRequest(uidError);
  const role = body.role === void 0 ? "user" : String(body.role);
  const uidRoleError = await validateRoleValue(db, role);
  if (uidRoleError) return badRequest(uidRoleError);
  const adminSlot = isActiveAdmin(role, "active") ? await singleAdminViolation(db, "add") : null;
  if (adminSlot) return badRequest(`${adminSlot}\uFF0C\u8BF7\u6539\u7528\u666E\u901A\u7528\u6237\u6216\u81EA\u5B9A\u4E49\u89D2\u8272`);
  let groupId = body.groupId;
  if (groupId !== void 0 && groupId !== null && groupId !== "") {
    groupId = Number(groupId);
    if (!Number.isInteger(groupId) || groupId <= 0)
      return badRequest("groupId \u5FC5\u987B\u662F\u6B63\u6574\u6570\u6216 null");
  } else {
    groupId = null;
  }
  if (groupId && !await getGroupById(db, groupId)) return badRequest("\u7528\u6237\u7EC4\u4E0D\u5B58\u5728");
  const duplicate = await getUserByUsername(db, uid);
  if (duplicate) return badRequest(`UID \u5DF2\u88AB\u5360\u7528\uFF08\u4E0E\u7528\u6237\u300C${uid}\u300D\u7684\u7528\u6237\u540D\u51B2\u7A81\uFF09`);
  const uidConflict = await ensureUidAvailable(db, uid);
  if (uidConflict) return badRequest(uidConflict);
  const displayName = body.displayName === void 0 ? "" : String(body.displayName).slice(0, 32);
  const password = generateUserPassword();
  const passwordHash = await hashPassword(password);
  const created = await writeUserGuarded(
    () => createUser(db, {
      username: uid,
      passwordHash,
      role,
      groupId,
      displayName,
      permissions: "{}",
      uid
    }),
    () => `UID \u5DF2\u88AB\u7528\u6237\u300C${uid}\u300D\u5360\u7528`
  );
  if (created.conflict) return badRequest(created.conflict);
  const user = created.user;
  const userKey = generateUserKey();
  await setUserKey(db, user.id, {
    keyHash: await hashUserKey(userKey),
    preview: userKeyPreview(userKey)
  });
  invalidateAuthStateCache();
  await recordAudit(
    db,
    gate.principal,
    "user.create_uid",
    "user",
    user.id,
    user.username,
    `uid=${uid}`
  );
  return jsonResponse(
    {
      success: true,
      data: {
        user,
        userKey,
        hint: `\u5BC6\u94A5\u5DF2\u81EA\u52A8\u751F\u6210\uFF08\u660E\u6587\u4EC5\u672C\u6B21\u53EF\u89C1\uFF09\u3002Surge \u6A21\u7EC4\u53C2\u6570 FINAL_UID \u586B\u300C${uid}\u300D\u5373\u53EF\uFF1A\u9762\u677F\u5237\u65B0\u65F6\u81EA\u52A8\u83B7\u53D6\u5E76\u6301\u4E45\u5316\u7528\u6237\u5BC6\u94A5\uFF0C\u65E0\u9700\u624B\u5DE5\u590D\u5236 Token\u3002`
      }
    },
    { status: 201, headers: NO_CACHE }
  );
}
__name(handleCreateUserByUid, "handleCreateUserByUid");
async function handleResetUserQuota(context2, db, id) {
  const gate = await guard2(context2, db);
  if (!gate.ok) return gate.response;
  const row = await getUserById(db, id);
  if (!row) return notFound("\u7528\u6237\u4E0D\u5B58\u5728");
  const parsed = await readJson(context2);
  const body = parsed.ok ? parsed.value ?? {} : {};
  let total;
  if (body.total !== void 0 && body.total !== null && body.total !== "") {
    total = Math.floor(Number(body.total));
    if (!Number.isFinite(total) || total < 0 || total > MAX_KEY_QUOTA) {
      return badRequest(`total \u5FC5\u987B\u662F 0 - ${MAX_KEY_QUOTA} \u7684\u6574\u6570\uFF080 = \u4E0D\u9650\uFF09`);
    }
  }
  const user = await resetUserQuota(db, Number(id), { total: total ?? null });
  await recordAudit(
    db,
    gate.principal,
    "user.quota_reset",
    "user",
    Number(id),
    row.username,
    `total=${user.keyQuota.total}`
  );
  return jsonResponse(
    { success: true, data: { keyQuota: user.keyQuota, resetTo: user.keyQuota.total } },
    { headers: NO_CACHE }
  );
}
__name(handleResetUserQuota, "handleResetUserQuota");
async function handleGetMyKey(context2, db) {
  const gate = await requireMutationAuth(context2.env, db, context2.request, context2);
  if (!gate.ok) return gate.response;
  const principal = gate.principal;
  if (principal?.type !== "user" || principal.via === "user-key") {
    return unauthorized("\u8BF7\u5148\u767B\u5F55\u8D26\u53F7\uFF1A\u5BC6\u94A5\u8EAB\u4EFD\u4E0D\u80FD\u67E5\u770B\u5BC6\u94A5\u4FE1\u606F");
  }
  const row = await getUserById(db, Number(principal.user.id));
  if (!row) return notFound("\u7528\u6237\u4E0D\u5B58\u5728");
  const channels = await listUserChannels(db, Number(row.id));
  return jsonResponse(
    {
      success: true,
      data: {
        preview: String(row.user_key_preview ?? ""),
        hasKey: Boolean(String(row.user_key_preview ?? "")),
        createdAt: String(row.user_key_created_at ?? ""),
        lastUsedAt: String(row.user_key_last_used_at ?? ""),
        channels
      }
    },
    { headers: NO_CACHE }
  );
}
__name(handleGetMyKey, "handleGetMyKey");

// api/_users/groups-handlers.js
function validateGroupPayload(body) {
  const name = String(body.name ?? "").trim();
  if (name.length < 1 || name.length > 32) return { error: "\u7EC4\u540D\u9700 1-32 \u4E2A\u5B57\u7B26" };
  const description = body.description === void 0 ? void 0 : String(body.description);
  const permissions = body.features === void 0 ? void 0 : serializePermissions(body.features);
  let parentId;
  if (body.parentId !== void 0) {
    if (body.parentId === null || body.parentId === "") parentId = null;
    else {
      parentId = Number(body.parentId);
      if (!Number.isInteger(parentId) || parentId < 1) {
        return { error: "parentId \u5FC5\u987B\u662F\u6B63\u6574\u6570\u6216 null" };
      }
    }
  }
  return { value: { name, description, permissions, parentId } };
}
__name(validateGroupPayload, "validateGroupPayload");
async function handleListGroups(context2, db) {
  const gate = await guard2(context2, db);
  if (!gate.ok) return gate.response;
  const [groups, memberCounts] = await Promise.all([listGroups(db), listGroupMemberCounts(db)]);
  const withCounts = groups.map((group3) => ({
    ...group3,
    memberCount: memberCounts.get(group3.id) || 0
  }));
  return jsonResponse({ success: true, data: withCounts }, { headers: NO_CACHE });
}
__name(handleListGroups, "handleListGroups");
async function handleCreateGroup(context2, db) {
  const gate = await guard2(context2, db);
  if (!gate.ok) return gate.response;
  const parsed = await readJson(context2);
  if (!parsed.ok) return badRequest("\u8BF7\u6C42\u4F53\u4E0D\u662F\u6709\u6548\u7684 JSON");
  const check2 = validateGroupPayload(parsed.value ?? {});
  if (check2.error) return badRequest(check2.error);
  const all = await listGroups(db);
  if (all.some((group4) => group4.name === check2.value.name))
    return badRequest(`\u7EC4\u540D\u5DF2\u5B58\u5728\uFF1A${check2.value.name}`);
  if (check2.value.parentId !== void 0 && check2.value.parentId !== null) {
    const cycle = await validateGroupParent(db, null, check2.value.parentId);
    if (cycle) return badRequest(cycle);
  }
  const group3 = await createGroup(db, check2.value);
  await recordAudit(
    db,
    gate.principal,
    "group.create",
    "group",
    group3.id,
    group3.name,
    `\u63CF\u8FF0:${group3.description || "\u2014"}`
  );
  return jsonResponse({ success: true, data: group3 }, { status: 201, headers: NO_CACHE });
}
__name(handleCreateGroup, "handleCreateGroup");
async function handlePatchGroup(context2, db, id) {
  const gate = await guard2(context2, db);
  if (!gate.ok) return gate.response;
  const existing = await getGroupById(db, id);
  if (!existing) return notFound("\u7528\u6237\u7EC4\u4E0D\u5B58\u5728");
  const parsed = await readJson(context2);
  if (!parsed.ok) return badRequest("\u8BF7\u6C42\u4F53\u4E0D\u662F\u6709\u6548\u7684 JSON");
  const check2 = validateGroupPayload(parsed.value ?? {});
  if (check2.error) return badRequest(check2.error);
  if (existing.isSystem && check2.value.name !== existing.name) {
    return badRequest("\u7CFB\u7EDF\u9ED8\u8BA4\u7EC4\u7684\u540D\u79F0\u4E0D\u53EF\u4FEE\u6539\uFF08\u6743\u9650\u53EF\u6B63\u5E38\u8C03\u6574\uFF09");
  }
  const all = await listGroups(db);
  if (all.some((group4) => group4.name === check2.value.name && group4.id !== Number(id))) {
    return badRequest(`\u7EC4\u540D\u5DF2\u5B58\u5728\uFF1A${check2.value.name}`);
  }
  if (check2.value.parentId !== void 0) {
    const cycle = await validateGroupParent(db, id, check2.value.parentId);
    if (cycle) return badRequest(cycle);
  }
  const group3 = await updateGroup(db, id, check2.value);
  await recordAudit(
    db,
    gate.principal,
    "group.update",
    "group",
    group3.id,
    group3.name,
    `\u53D8\u66F4:${Object.keys(check2.value).join(", ") || "\u65E0"}`
  );
  return jsonResponse({ success: true, data: group3 }, { headers: NO_CACHE });
}
__name(handlePatchGroup, "handlePatchGroup");
async function handleDeleteGroup(context2, db, id) {
  const gate = await guard2(context2, db);
  if (!gate.ok) return gate.response;
  const existing = await getGroupById(db, id);
  if (!existing) return notFound("\u7528\u6237\u7EC4\u4E0D\u5B58\u5728");
  if (existing.isSystem) {
    return badRequest("\u7CFB\u7EDF\u9ED8\u8BA4\u7EC4\u4E0D\u53EF\u5220\u9664\uFF1A\u5B83\u662F\u5404\u8EAB\u4EFD\u7C7B\u578B\u7684\u6807\u51C6\u6743\u9650\u8D77\u70B9");
  }
  const members = await countGroupMembers(db, id);
  await deleteGroup(db, id);
  await recordAudit(
    db,
    gate.principal,
    "group.delete",
    "group",
    id,
    existing.name,
    `\u89E3\u7ED1\u6210\u5458:${members}`
  );
  return jsonResponse(
    { success: true, data: { deleted: Number(id), unboundMembers: members } },
    { headers: NO_CACHE }
  );
}
__name(handleDeleteGroup, "handleDeleteGroup");

// api/_users/roles-handlers.js
function validateRolePayload(body) {
  const name = String(body.name ?? "").trim();
  const nameError = validateRoleName(name);
  if (nameError) return { error: nameError };
  const description = body.description === void 0 ? void 0 : String(body.description);
  const permissions = body.features === void 0 ? void 0 : serializePermissions(body.features);
  return { value: { name, description, permissions } };
}
__name(validateRolePayload, "validateRolePayload");
async function handleListRoles(context2, db) {
  const gate = await guard2(context2, db);
  if (!gate.ok) return gate.response;
  const roles = await listRoles(db);
  return jsonResponse({ success: true, data: { roles } }, { headers: NO_CACHE });
}
__name(handleListRoles, "handleListRoles");
async function handleCreateRole(context2, db) {
  const gate = await guard2(context2, db);
  if (!gate.ok) return gate.response;
  const parsed = await readJson(context2);
  if (!parsed.ok) return badRequest("\u8BF7\u6C42\u4F53\u4E0D\u662F\u6709\u6548\u7684 JSON");
  const check2 = validateRolePayload(parsed.value ?? {});
  if (check2.error) return badRequest(check2.error);
  const all = await listRoles(db);
  if (all.some((role2) => role2.name === check2.value.name))
    return badRequest(`\u89D2\u8272\u540D\u5DF2\u5B58\u5728\uFF1A${check2.value.name}`);
  const role = await createRole(db, check2.value);
  await recordAudit(
    db,
    gate.principal,
    "role.create",
    "role",
    role.id,
    role.name,
    `\u63CF\u8FF0:${role.description || "\u2014"}`
  );
  return jsonResponse({ success: true, data: { role } }, { status: 201, headers: NO_CACHE });
}
__name(handleCreateRole, "handleCreateRole");
async function handlePatchRole(context2, db, id) {
  const gate = await guard2(context2, db);
  if (!gate.ok) return gate.response;
  const existing = await getRoleById(db, id);
  if (!existing) return notFound("\u89D2\u8272\u4E0D\u5B58\u5728");
  const parsed = await readJson(context2);
  if (!parsed.ok) return badRequest("\u8BF7\u6C42\u4F53\u4E0D\u662F\u6709\u6548\u7684 JSON");
  const body = parsed.value ?? {};
  const check2 = validateRolePayload(body);
  if (check2.error) return badRequest(check2.error);
  const all = await listRoles(db);
  if (all.some((role2) => role2.name === check2.value.name && role2.id !== Number(id))) {
    return badRequest(`\u89D2\u8272\u540D\u5DF2\u5B58\u5728\uFF1A${check2.value.name}`);
  }
  const role = await updateRole(db, id, check2.value);
  await recordAudit(
    db,
    gate.principal,
    "role.update",
    "role",
    role.id,
    role.name,
    `\u53D8\u66F4:${Object.keys(check2.value).filter((key) => key !== "name").join(", ") || "\u4EC5\u540D\u79F0"}`
  );
  return jsonResponse({ success: true, data: { role } }, { headers: NO_CACHE });
}
__name(handlePatchRole, "handlePatchRole");
async function handleDeleteRole(context2, db, id) {
  const gate = await guard2(context2, db);
  if (!gate.ok) return gate.response;
  const existing = await getRoleById(db, id);
  if (!existing) return notFound("\u89D2\u8272\u4E0D\u5B58\u5728");
  const result = await deleteRole(db, id);
  await recordAudit(
    db,
    gate.principal,
    "role.delete",
    "role",
    id,
    existing.name,
    `\u5F15\u7528\u7528\u6237\u56DE\u843D:${result.demotedUsers}`
  );
  return jsonResponse(
    { success: true, data: { deleted: result.deleted, demotedUsers: result.demotedUsers } },
    { headers: NO_CACHE }
  );
}
__name(handleDeleteRole, "handleDeleteRole");

// api/_users/routes.js
var TAG8 = "api/users";
var ALLOW_METHODS2 = "GET, POST, PUT, PATCH, DELETE";
async function handleUsersRequest(context2, db, path, method) {
  try {
    if (path === "/api/users") {
      if (method === "GET") return await handleListUsers(context2, db);
      if (method === "POST") return await handleCreateUser(context2, db);
      return methodNotAllowed(method, ALLOW_METHODS2);
    }
    if (path === "/api/users/batch") {
      if (method === "POST") return await handleBatchCreateUsers(context2, db);
      return methodNotAllowed(method, "POST");
    }
    if (path === "/api/users/uid") {
      if (method === "POST") return await handleCreateUserByUid(context2, db);
      return methodNotAllowed(method, "POST");
    }
    if (path === "/api/users/me/key") {
      if (method === "GET") return await handleGetMyKey(context2, db);
      return methodNotAllowed(method, "GET");
    }
    if (path === "/api/users/presence") {
      if (method === "GET") return await handleListUserPresence(context2, db);
      return methodNotAllowed(method, "GET");
    }
    if (path === "/api/users/audit") {
      if (method === "GET") return await handleListAuditLogs(context2, db);
      return methodNotAllowed(method, "GET");
    }
    if (path === "/api/users/roles") {
      if (method === "GET") return await handleListRoles(context2, db);
      if (method === "POST") return await handleCreateRole(context2, db);
      return methodNotAllowed(method, "GET, POST");
    }
    const roleItem = path.match(/^\/api\/users\/roles\/(\d+)$/);
    if (roleItem) {
      if (method === "PATCH") return await handlePatchRole(context2, db, roleItem[1]);
      if (method === "DELETE") return await handleDeleteRole(context2, db, roleItem[1]);
      return methodNotAllowed(method, "PATCH, DELETE");
    }
    const keyItem = path.match(/^\/api\/users\/(\d+)\/key$/);
    if (keyItem) {
      if (method === "PUT") return await handleResetUserKey(context2, db, keyItem[1]);
      return methodNotAllowed(method, "PUT");
    }
    const quotaItem = path.match(/^\/api\/users\/(\d+)\/quota$/);
    if (quotaItem) {
      if (method === "PUT") return await handleResetUserQuota(context2, db, quotaItem[1]);
      return methodNotAllowed(method, "PUT");
    }
    const item = path.match(/^\/api\/users\/(\d+)$/);
    if (item) {
      const id = item[1];
      if (method === "PATCH") return await handlePatchUser(context2, db, id);
      if (method === "DELETE") return await handleDeleteUser(context2, db, id);
      return methodNotAllowed(method, "PATCH, DELETE");
    }
    if (path === "/api/groups") {
      if (method === "GET") return await handleListGroups(context2, db);
      if (method === "POST") return await handleCreateGroup(context2, db);
      return methodNotAllowed(method, ALLOW_METHODS2);
    }
    const groupItem = path.match(/^\/api\/groups\/(\d+)$/);
    if (groupItem) {
      const id = groupItem[1];
      if (method === "PATCH") return await handlePatchGroup(context2, db, id);
      if (method === "DELETE") return await handleDeleteGroup(context2, db, id);
      return methodNotAllowed(method, "PATCH, DELETE");
    }
    return notFound(`\u672A\u77E5\u7684\u63A5\u53E3\uFF1A${path}`);
  } catch (error3) {
    return errorResponse(TAG8, method, path, error3);
  }
}
__name(handleUsersRequest, "handleUsersRequest");

// api/groups.js
async function onRequest8(context2) {
  const { adapter: db, response } = await resolveAdapter(context2.env);
  if (response) return response;
  await db.ready;
  const url = new URL(context2.request.url);
  return handleUsersRequest(
    context2,
    db,
    url.pathname.replace(/\/+$/, "") || "/",
    context2.request.method
  );
}
__name(onRequest8, "onRequest");

// _utils/heartbeat.js
async function listHeartbeats(db, { limit = 5 } = {}) {
  const rows = await db.execute(
    `SELECT client_id, panel_version, logger_version, last_seen, updated_at
     FROM ${HEARTBEATS_TABLE} ORDER BY updated_at DESC LIMIT ?`,
    [Math.max(1, Math.min(Number(limit) || 5, 50))]
  );
  return rows.map((row) => ({
    clientId: String(row.client_id ?? ""),
    panelVersion: String(row.panel_version ?? ""),
    loggerVersion: String(row.logger_version ?? ""),
    lastSeen: String(row.last_seen ?? ""),
    updatedAt: String(row.updated_at ?? "")
  }));
}
__name(listHeartbeats, "listHeartbeats");

// api/_logger/stats-snapshot.js
function resolveTypeQuietly(request) {
  try {
    const body = {};
    return resolveDeviceType(request, body);
  } catch {
    return "";
  }
}
__name(resolveTypeQuietly, "resolveTypeQuietly");
async function registerHeartbeat(db, context2, device, heartbeatIp) {
  try {
    const heartbeatType = device.deviceType || resolveTypeQuietly(context2.request);
    await touchDevice(db, {
      ...device,
      ip: heartbeatIp,
      deviceType: heartbeatType,
      // v1.5 平台专属参数（系统 / Surge 版本 / 构建号）与 v1.17 资源快照：
      // 此前只有 /hits 路径收集平台参数，面板心跳的 $environment 自报一直
      // 没有入库——外部资源能力判定（surge-version 门槛）依赖这份数据
      platformParams: collectPlatformParams(context2.request, {}, heartbeatType),
      resources: parseResourceSnapshot(device.resourcesRaw)
    });
  } catch (error3) {
    console.warn("[devices] \u8BBE\u5907\u767B\u8BB0\u5931\u8D25\uFF08\u4E0D\u5F71\u54CD\u7EDF\u8BA1\uFF09:", error3?.message ?? error3);
  }
}
__name(registerHeartbeat, "registerHeartbeat");
async function loadExportVersions(db) {
  try {
    return await readExportRevisions(db);
  } catch (error3) {
    console.warn("[revisions] \u4FEE\u8BA2\u53F7\u8BFB\u53D6\u5931\u8D25\uFF08\u4E0D\u5F71\u54CD\u7EDF\u8BA1\uFF09:", error3?.message ?? error3);
    return {};
  }
}
__name(loadExportVersions, "loadExportVersions");
async function loadDevicesReport(db, url, exportVersions) {
  const deviceSummary2 = { total: 0, online: 0, alertCount: 0, alerts: [] };
  const deviceTypeFilter = url.searchParams.get("device-type") || "";
  const usernameFilter = url.searchParams.get("username") || "";
  const isolated = Boolean(deviceTypeFilter || usernameFilter);
  try {
    const report2 = await getDevicesReport(db, {
      limit: 100,
      deviceType: deviceTypeFilter,
      username: usernameFilter,
      exportVersions
    });
    return { ...report2, presenceDevices: isolated ? null : report2.devices, isolated };
  } catch (error3) {
    console.warn("[devices] \u8BBE\u5907\u62A5\u8868\u8BFB\u53D6\u5931\u8D25\uFF08\u4E0D\u5F71\u54CD\u7EDF\u8BA1\uFF09:", error3?.message ?? error3);
    return { devices: [], deviceSummary: deviceSummary2, presenceDevices: null, isolated };
  }
}
__name(loadDevicesReport, "loadDevicesReport");
async function collectClients(db, url, isHeartbeat, devices, isolated) {
  if ((isHeartbeat || url.searchParams.get("with-clients") === "1") && !isolated) {
    const clients = [];
    const seen = /* @__PURE__ */ new Set();
    for (const row of devices) {
      if (!row.deviceId.startsWith("client:")) continue;
      if (clients.length >= 5) break;
      seen.add(row.deviceId);
      clients.push({
        clientId: row.deviceId.slice("client:".length),
        panelVersion: row.panelVersion,
        loggerVersion: row.loggerVersion,
        lastSeen: row.lastOnlineTime,
        updatedAt: row.updatedAt
      });
    }
    if (isHeartbeat) {
      try {
        for (const beat of await listHeartbeats(db, { limit: 5 })) {
          if (seen.has(`client:${beat.clientId}`) || seen.has(beat.clientId)) continue;
          clients.push(beat);
        }
      } catch {
      }
    }
    return clients;
  }
  return [];
}
__name(collectClients, "collectClients");
async function loadUserPresence(db, presenceDevices) {
  const emptySummary = {
    total: 0,
    bound: 0,
    unbound: 0,
    online: 0,
    offline: 0,
    onlineDevices: 0,
    totalDevices: 0,
    alertCount: 0,
    unboundDevices: 0
  };
  try {
    const report2 = await getUserPresenceReport(db, {
      limit: 100,
      devices: presenceDevices
    });
    return { users: report2.users, userSummary: report2.userSummary };
  } catch (error3) {
    console.warn("[presence] \u7528\u6237\u770B\u677F\u8BFB\u53D6\u5931\u8D25\uFF08\u4E0D\u5F71\u54CD\u7EDF\u8BA1\uFF09:", error3?.message ?? error3);
    return { users: [], userSummary: emptySummary };
  }
}
__name(loadUserPresence, "loadUserPresence");
async function buildStatsSnapshot(db, url, { device, isHeartbeat, panelConfig, heartbeatNote, keyQuota }) {
  const stats = await getStats(db, clientTzOffset(url.searchParams));
  const exportVersions = await loadExportVersions(db);
  const { devices, deviceSummary: deviceSummary2, presenceDevices, isolated } = await loadDevicesReport(
    db,
    url,
    exportVersions
  );
  const clients = await collectClients(db, url, isHeartbeat, devices, isolated);
  const { users: userPresences, userSummary } = await loadUserPresence(db, presenceDevices);
  if (!panelConfig.recordSourceIp) {
    for (const row of devices) row.ip = "";
    for (const presence of userPresences) {
      for (const row of presence.devices ?? []) row.ip = "";
    }
  }
  const quotaWarning = keyQuota && keyQuota.total > 0 && keyQuota.remaining > 0 && keyQuota.remaining <= Math.max(1, Math.ceil(keyQuota.total * 0.2)) ? { remaining: keyQuota.remaining, total: keyQuota.total } : null;
  return {
    ...stats,
    serverVersion: BUILD_LABEL,
    latest: COMPONENT_VERSIONS,
    ...isHeartbeat ? {
      // 版本判定服务端出结论（审计 D2）：level 面板脚本自报 vs 服务端部署版本，
      // loggerLevel 捕获脚本自报 vs 服务端部署版本
      level: versionLevel(device.panelVersion, COMPONENT_VERSIONS.panel),
      loggerLevel: versionLevel(device.loggerVersion, COMPONENT_VERSIONS.logger)
    } : {},
    clients,
    devices,
    deviceSummary: deviceSummary2,
    // 订阅修订号（v1.17）：{<type>: {n, revision, at}}，网页订阅版本展示与
    // 设备资源状态判定的基准；面板不读这个字段（走 /export-versions 拿新鲜值）
    exportVersions,
    users: userPresences,
    userSummary,
    ...heartbeatNote ? { heartbeat: heartbeatNote } : {},
    ...quotaWarning ? { quotaWarning } : {}
  };
}
__name(buildStatsSnapshot, "buildStatsSnapshot");

// api/_logger/read-auth.js
function readAuthForced(env2) {
  const value = String(env2?.PANEL_READ_AUTH ?? "").trim();
  return value === "1" || value.toLowerCase() === "true";
}
__name(readAuthForced, "readAuthForced");
async function guardReadAuth(context2, db) {
  const auth = await requireReportAuth(context2.env, db, context2);
  if (readAuthForced(context2?.env)) {
    if (!auth.ok) return auth.response;
    if (auth.principal?.type === "anonymous-legacy") {
      return jsonResponse(
        {
          success: false,
          error: "PANEL_READ_AUTH \u5DF2\u542F\u7528\uFF1A\u53EA\u8BFB\u63A5\u53E3\u8981\u6C42\u8EAB\u4EFD\uFF08\u4E0A\u62A5\u4EE4\u724C\u6216\u767B\u5F55\u4F1A\u8BDD\uFF09"
        },
        { status: 401, headers: NO_CACHE }
      );
    }
  }
  if (!auth.ok && auth.principal?.type === "invalid-key") return auth.response;
  const authEnabled = await isAuthEnabled(db);
  if (!authEnabled) return null;
  const principal = auth.ok ? auth.principal : await resolvePrincipal(context2.env, db, context2.request, "", context2);
  return requireFeature(principal, "logs.view", { path: "/api/logger", db });
}
__name(guardReadAuth, "guardReadAuth");

// api/_logger/reads-meta.js
async function handleMeta(context2, db) {
  const denied = await guardReadAuth(context2, db);
  if (denied) return denied;
  const authEnabled = await isAuthEnabled(db);
  return jsonResponse(
    {
      success: true,
      data: {
        ruleTypes: ALL_RULE_TYPES,
        params: RULE_PARAMS,
        flagParams: FLAG_PARAM_NAMES,
        kvParams: KV_PARAM_NAMES,
        policies: SURGE_POLICIES,
        writeAuthRequired: authEnabled,
        hitAuthRequired: Boolean(anyConfiguredToken(context2.env)),
        auth: {
          enabled: authEnabled,
          writeAuthRequired: authEnabled,
          hitAuthRequired: Boolean(anyConfiguredToken(context2.env))
        },
        deviceTypes: Object.fromEntries(
          Object.entries(DEVICE_PROFILES).map(([key, profile3]) => [
            key,
            {
              code: profile3.code,
              label: profile3.label,
              versionDetection: profile3.versionDetection,
              panelExpected: profile3.panelExpected,
              tracked: profile3.tracked
            }
          ])
        ),
        distribution: {
          channel: PANEL_ORIGIN ? "pages" : "self-host",
          origin: PANEL_ORIGIN
        },
        // v1.17：外部资源自动更新的版本门槛（官方要求 iOS 5.23.0+ / Mac 6.10.0+），
        // 网页端能力徽标据此渲染，不在前端硬编码版本号
        externalResources: {
          minSurgeVersion: EXTERNAL_RESOURCES_MIN
        },
        version: {
          serverVersion: BUILD_LABEL,
          components: COMPONENT_VERSIONS,
          dbSchemaVersion: DB_SCHEMA_VERSION
        }
      }
    },
    {
      headers: {
        "Cache-Control": "no-store",
        ...readOnlyWarningHeaders(context2.env, authEnabled)
      }
    }
  );
}
__name(handleMeta, "handleMeta");

// api/_logger/reads-export.js
async function handleExport(context2, db, url) {
  const denied = await guardReadAuth(context2, db);
  if (denied) return denied;
  const type = url.searchParams.get("type") || "all";
  const withMeta = url.searchParams.get("meta") === "1";
  const filters = await resolvePolicyFilters(db, url.searchParams, type);
  const result = await buildExport(db, { type, ...filters });
  let lines = result.lines;
  let count3 = result.count;
  if (String(type).toLowerCase() !== "all" && filters.mergeSubscriptions) {
    try {
      const merged = await mergeSubscriptionRules(
        db,
        String(type).toUpperCase(),
        result.lines
      );
      lines = merged.lines;
      count3 = lines.length;
    } catch {
    }
  }
  const output = renderExportText(
    { ...result, lines, count: count3 },
    {
      withMeta: withMeta && result.lines.length > 0,
      filterText: describeExportFilter({
        type,
        source: filters.source,
        minCount: filters.minCount,
        lastDays: filters.lastDays
      }).text
    }
  );
  const revision = await revisionFromLines(db, type, lines, count3);
  return textResponse(output, {
    headers: {
      // 导出面同样身份相关：private 防共享代理缓存（见 api-constants CACHE_PRIVATE）
      "Cache-Control": "private, max-age=60",
      "X-Export-Count": String(count3),
      "X-Export-IPv4": String(result.ipv4),
      "X-Export-IPv6": String(result.ipv6),
      "X-Export-Revision": revision.revision,
      ...readOnlyWarningHeaders(context2.env, await isAuthEnabled(db))
    }
  });
}
__name(handleExport, "handleExport");
async function handleExportSummary(context2, db, url) {
  const denied = await guardReadAuth(context2, db);
  if (denied) return denied;
  const minCount = readMinCount(url.searchParams);
  const lastDays = readLastDays(url.searchParams);
  const source = url.searchParams.get("source") || "";
  const type = url.searchParams.get("type") || "all";
  const filters = await resolvePolicyFilters(db, url.searchParams, type);
  const result = await buildExport(db, { type, ...filters });
  let matched = result.matched;
  let lines = result.lines;
  if (String(type).toLowerCase() !== "all" && filters.mergeSubscriptions) {
    try {
      const merged = await mergeSubscriptionRules(
        db,
        String(type).toUpperCase(),
        result.lines
      );
      lines = merged.lines;
      matched = [...result.matched, ...merged.items];
    } catch {
    }
  }
  const summary = summarizeExport(matched);
  const revision = await revisionFromLines(db, type, lines, lines.length);
  return jsonResponse(
    {
      success: true,
      data: {
        ...summary,
        filter: describeExportFilter({ type, source, minCount, lastDays }),
        revision
      }
    },
    {
      headers: {
        ...CACHE_PRIVATE,
        ...readOnlyWarningHeaders(context2.env, await isAuthEnabled(db))
      }
    }
  );
}
__name(handleExportSummary, "handleExportSummary");
async function handleExportVersions(context2, db) {
  const denied = await guardReadAuth(context2, db);
  if (denied) return denied;
  const policies = await listExportPolicies(db);
  const keys = ["all", ...policies.map((item) => String(item.policyKey).toLowerCase())];
  const revisions = await resolveExportRevisions(db, keys);
  return jsonResponse(
    {
      success: true,
      data: {
        serverVersion: BUILD_LABEL,
        components: COMPONENT_VERSIONS,
        // 外部资源接口的最低版本要求（面板能力判定用，避免两栈各写一份口径漂移）
        externalResources: { minSurgeVersion: EXTERNAL_RESOURCES_MIN },
        policies: revisions
      }
    },
    {
      headers: {
        "Cache-Control": "no-store",
        ...readOnlyWarningHeaders(context2.env, await isAuthEnabled(db))
      }
    }
  );
}
__name(handleExportVersions, "handleExportVersions");

// api/_logger/reads.js
async function handleList(context2, db, url) {
  const denied = await guardReadAuth(context2, db);
  if (denied) return denied;
  const logs = await listLogs(db, {
    search: url.searchParams.get("search") || "",
    policy: url.searchParams.get("policy") || "ALL",
    type: url.searchParams.get("type") || "ALL",
    limit: url.searchParams.get("limit") || 5e3
  });
  const data = (await readPanelConfig(db)).recordSourceIp ? logs : logs.map(({ ip, ...rest }) => ({ ...rest, ip: "" }));
  return jsonResponse(
    { success: true, data },
    {
      headers: {
        ...CACHE_PRIVATE,
        ...readOnlyWarningHeaders(context2.env, await isAuthEnabled(db))
      }
    }
  );
}
__name(handleList, "handleList");
async function handleStats(context2, db, url) {
  const denied = await guardReadAuth(context2, db);
  if (denied) return denied;
  const panelConfig = await readPanelConfig(db);
  const heartbeatIp = panelConfig.recordSourceIp ? clientIp(context2.request) : "";
  const device = parseDeviceHeaders(context2.request);
  const isHeartbeat = Boolean(device.clientId);
  let heartbeatNote = "";
  let keyQuota = null;
  if (isHeartbeat) {
    const reportAuth = await requireReportAuth(context2.env, db, context2);
    if (!reportAuth.ok) {
      heartbeatNote = "heartbeat-auth-failed";
    } else {
      if (reportAuth.principal?.via === "user-key") keyQuota = reportAuth.principal.keyQuota;
      await registerHeartbeat(db, context2, device, heartbeatIp);
    }
  }
  const data = await buildStatsSnapshot(db, url, {
    device,
    isHeartbeat,
    panelConfig,
    heartbeatNote,
    keyQuota
  });
  const headers = {
    ...isHeartbeat ? { "Cache-Control": "no-store" } : CACHE_PRIVATE,
    ...readOnlyWarningHeaders(context2.env, await isAuthEnabled(db))
  };
  return jsonResponse({ success: true, data }, { headers });
}
__name(handleStats, "handleStats");
async function handleSchema(context2, db) {
  const denied = await guardReadAuth(context2, db);
  if (denied) return denied;
  return textResponse(LOGS_SCHEMA, { headers: NO_CACHE });
}
__name(handleSchema, "handleSchema");

// api/_logger/hit-handlers.js
function deviceContextFromRequest(request, body) {
  const device = parseDeviceHeaders(request);
  const fallbackUsername = normalizeUsername(body?.username);
  const deviceType = resolveDeviceType(request, body);
  const ip = clientIp(request);
  const clientId = device.clientId;
  return {
    clientId,
    name: device.name,
    username: device.username || fallbackUsername,
    ip,
    loggerVersion: device.loggerVersion,
    deviceType,
    platformParams: collectPlatformParams(request, body, deviceType),
    // 外部资源订阅快照（v1.17）：仅面板心跳携带，解析失败返回 null（保留库里旧快照）
    resources: parseResourceSnapshot(device.resourcesRaw)
  };
}
__name(deviceContextFromRequest, "deviceContextFromRequest");
async function touchDeviceSafely(db, context2) {
  try {
    await touchDevice(db, context2);
  } catch (error3) {
    console.warn("[devices] \u8BBE\u5907\u767B\u8BB0\u5931\u8D25\uFF08\u4E0D\u5F71\u54CD\u4E0A\u62A5\uFF09:", error3?.message ?? error3);
  }
}
__name(touchDeviceSafely, "touchDeviceSafely");
async function handleHit(context2, db) {
  const reportAuth = await requireReportAuth(context2.env, db, context2);
  if (!reportAuth.ok) return reportAuth.response;
  const body = await readJson(context2);
  if (!body.ok) return badRequest("\u8BF7\u6C42\u4F53\u4E0D\u662F\u6709\u6548\u7684 JSON");
  const hostname = String(body.value.hostname ?? "").trim();
  if (!hostname) return badRequest("hostname \u4E0D\u80FD\u4E3A\u7A7A");
  if (hostname.length > MAX_HOSTNAME_LENGTH) {
    return badRequest(`hostname \u957F\u5EA6\u8D85\u8FC7 ${MAX_HOSTNAME_LENGTH} \u5B57\u7B26\u4E0A\u9650\uFF08DNS \u540D\u5B57\u4E0A\u9650\uFF09`);
  }
  const panelConfig = await readPanelConfig(db);
  const device = deviceContextFromRequest(context2.request, body.value);
  if (!panelConfig.recordSourceIp) device.ip = "";
  const result = await recordHit(db, hostname, {
    source: normalizeSource(body.value.source),
    // 来源 IP 记录关闭（v1.20）：客户端自报与连接捕获的 IP 一律不入库
    ip: panelConfig.recordSourceIp ? normalizeIp(body.value.ip) || device.ip : "",
    username: normalizeUsername(body.value.username) || device.username,
    policy: body.value.policy,
    type: body.value.type,
    value: body.value.value,
    params: body.value.params
  });
  await touchDeviceSafely(db, device);
  return jsonResponse(
    {
      success: true,
      data: {
        ...result,
        latestLoggerVersion: COMPONENT_VERSIONS.logger,
        loggerLevel: versionLevel(device.loggerVersion, COMPONENT_VERSIONS.logger)
      }
    },
    { headers: NO_CACHE }
  );
}
__name(handleHit, "handleHit");
var HIT_BATCH_RATE_LIMIT = 30;
var HIT_BATCH_RATE_WINDOW_MS = 60 * 1e3;
async function handleHitBatch(context2, db) {
  const reportAuth = await requireReportAuth(context2.env, db, context2);
  if (!reportAuth.ok) return reportAuth.response;
  const gate = hitRateLimit(
    `hits:${reportAuth.principal?.user?.id ?? clientIp(context2.request)}`,
    HIT_BATCH_RATE_LIMIT,
    HIT_BATCH_RATE_WINDOW_MS
  );
  if (!gate.allowed) return tooManyRequests("\u4E0A\u62A5\u8FC7\u4E8E\u9891\u7E41\uFF1A\u8BF7\u7A0D\u540E\u91CD\u8BD5", gate.retryAfterMs);
  const body = await readJson(context2);
  if (!body.ok) return badRequest("\u8BF7\u6C42\u4F53\u4E0D\u662F\u6709\u6548\u7684 JSON");
  const hits = body.value.hits;
  if (!Array.isArray(hits) || !hits.length) return badRequest("hits \u5FC5\u987B\u662F\u975E\u7A7A\u6570\u7EC4");
  if (hits.length > HIT_BATCH_MAX_ITEMS)
    return badRequest(`\u5355\u6B21\u4E0A\u62A5\u6700\u591A ${HIT_BATCH_MAX_ITEMS} \u6761\u547D\u4E2D`);
  const panelConfig = await readPanelConfig(db);
  const device = deviceContextFromRequest(context2.request, body.value);
  if (!panelConfig.recordSourceIp) device.ip = "";
  const enriched = hits.map((hit) => ({
    ...hit,
    // 来源 IP 记录关闭（v1.20）：客户端自报与连接捕获的 IP 一律不入库
    ip: panelConfig.recordSourceIp ? normalizeIp(hit.ip) || device.ip : "",
    username: normalizeUsername(hit.username) || device.username
  }));
  const result = await recordHits(db, enriched);
  await touchDeviceSafely(db, device);
  return jsonResponse(
    {
      success: true,
      data: {
        ...result,
        latestLoggerVersion: COMPONENT_VERSIONS.logger,
        loggerLevel: versionLevel(device.loggerVersion, COMPONENT_VERSIONS.logger)
      }
    },
    { headers: NO_CACHE }
  );
}
__name(handleHitBatch, "handleHitBatch");

// api/_logger/writes.js
var WRITE_PATH_FEATURES = {
  "/api/logger/update": "rules.quickedit",
  "/api/logger/delete": "rules.quickedit",
  "/api/logger/exclude": "rules.quickedit",
  "/api/logger/batch": "rules.batch",
  "/api/logger/clear": "danger.zone",
  "/api/logger/clear-empty": "logs.clean",
  "/api/logger/clear-preset-comments": "logs.clean",
  "/api/logger/clear-all-comments": "logs.clean"
};
async function handleWrite(context2, db, path) {
  const auth = await requireMutationAuth(context2.env, db, context2.request, context2);
  if (!auth.ok) return auth.response;
  const featureDenied = await requireFeature(auth.principal, "logs.write", { path, db });
  if (featureDenied) return featureDenied;
  const pathFeature = WRITE_PATH_FEATURES[path];
  if (pathFeature) {
    const pathDenied = await requireFeature(auth.principal, pathFeature, { path, db });
    if (pathDenied) return pathDenied;
  }
  switch (path) {
    case "/api/logger/update":
      return updateRule(context2, db);
    case "/api/logger/delete":
      return deleteRule(context2, db);
    case "/api/logger/exclude":
      return excludeRule(context2, db);
    case "/api/logger/batch":
      return batchRules(context2, db);
    case "/api/logger/clear":
      return clearAll(context2, db);
    case "/api/logger/clear-empty":
      return jsonResponse(
        { success: true, data: { deleted: await clearEmptyCommentLogs(db) } },
        { headers: NO_CACHE }
      );
    case "/api/logger/clear-preset-comments":
      return jsonResponse(
        { success: true, data: { cleared: await clearPresetCommentPins(db) } },
        { headers: NO_CACHE }
      );
    case "/api/logger/clear-all-comments":
      return jsonResponse(
        { success: true, data: { cleared: await clearAllCommentPins(db) } },
        { headers: NO_CACHE }
      );
    default:
      return notFound(`\u672A\u77E5\u7684\u63A5\u53E3\uFF1A${path}`);
  }
}
__name(handleWrite, "handleWrite");
async function readPatch(context2) {
  const body = await readJson(context2);
  if (!body.ok) return { error: badRequest("\u8BF7\u6C42\u4F53\u4E0D\u662F\u6709\u6548\u7684 JSON") };
  const patch = body.value && typeof body.value === "object" ? body.value : body;
  return { body, patch };
}
__name(readPatch, "readPatch");
function extractHostname(body, patch) {
  return String(body.hostname ?? patch.hostname ?? "").trim();
}
__name(extractHostname, "extractHostname");
async function updateRule(context2, db) {
  const { error: error3, body, patch } = await readPatch(context2);
  if (error3) return error3;
  const hostname = extractHostname(body, patch);
  if (!hostname) return badRequest("hostname \u4E0D\u80FD\u4E3A\u7A7A");
  const optional = /* @__PURE__ */ __name((key) => patch[key] === void 0 || patch[key] === null ? void 0 : String(patch[key]), "optional");
  const result = await updateLog(db, hostname, {
    type: optional("type"),
    value: optional("value"),
    policy: optional("policy"),
    params: patch.params === void 0 ? null : patch.params,
    comment: patch.comment === void 0 ? null : String(patch.comment),
    source: patch.source === void 0 ? null : String(patch.source),
    // v8「取消手动管理」：manual_edited 置 0 + 清空置顶策略，策略交还 AI 判定
    unmanual: patch.unmanual === true
  });
  if (result.error) return badRequest(result.error);
  if (!result.found && !result.created) return notFound("\u8BB0\u5F55\u4E0D\u5B58\u5728");
  return jsonResponse({ success: true, data: result }, { headers: NO_CACHE });
}
__name(updateRule, "updateRule");
async function deleteRule(context2, db) {
  const { error: error3, body, patch } = await readPatch(context2);
  if (error3) return error3;
  const hostname = extractHostname(body, patch);
  if (!hostname) return badRequest("hostname \u4E0D\u80FD\u4E3A\u7A7A");
  const deleted = await deleteLog(db, hostname);
  return jsonResponse({ success: true, data: { deleted } }, { headers: NO_CACHE });
}
__name(deleteRule, "deleteRule");
async function excludeRule(context2, db) {
  const { error: error3, body, patch } = await readPatch(context2);
  if (error3) return error3;
  const target = String(body.target ?? patch.target ?? "").trim();
  if (!target) return badRequest("target \u4E0D\u80FD\u4E3A\u7A7A");
  const result = await reduceExclude(db, target, {
    policy: body.policy ?? patch.policy,
    source: normalizeSource(body.source ?? patch.source)
  });
  return jsonResponse({ success: true, data: result }, { headers: NO_CACHE });
}
__name(excludeRule, "excludeRule");
function countSkipped(rawLines, accepted, exempt) {
  return Math.max(0, rawLines.length - accepted - exempt);
}
__name(countSkipped, "countSkipped");
function isCommentLine(line) {
  return /^[#;]/.test(String(line ?? "").trim());
}
__name(isCommentLine, "isCommentLine");
async function batchRules(context2, db) {
  const { error: error3, patch } = await readPatch(context2);
  if (error3) return error3;
  const rawText = typeof patch.text === "string" ? patch.text : "";
  const rawLines = Array.isArray(patch.lines) ? patch.lines : rawText.split("\n");
  const lines = rawLines.filter(
    (line) => String(line).trim().length > 0 || line && typeof line === "object"
  );
  if (!lines.length) return badRequest("\u6CA1\u6709\u53EF\u5904\u7406\u7684\u89C4\u5219\u884C");
  if (lines.length > BATCH_REQUEST_MAX_LINES) {
    return badRequest(
      `\u5355\u6B21\u6700\u591A ${BATCH_REQUEST_MAX_LINES} \u884C\uFF08\u5F53\u524D ${lines.length} \u884C\uFF09\uFF0C\u8BF7\u5206\u6279\u63D0\u4EA4`
    );
  }
  const mode = patch.mode === "override" ? "override" : "merge";
  const result = await batchOverride(db, lines, {
    mode,
    preserveFrom: typeof patch.preserveFrom === "string" ? patch.preserveFrom : "",
    policyOverride: typeof patch.policy === "string" ? patch.policy : ""
  });
  const commentLines = rawLines.filter(
    (line) => typeof line === "string" && isCommentLine(line)
  ).length;
  const blankLines = rawLines.filter(
    (line) => typeof line === "string" && !String(line).trim()
  ).length;
  return jsonResponse(
    {
      success: true,
      data: {
        ...result,
        mode,
        comments: commentLines,
        skipped: countSkipped(rawLines, result.total, commentLines + blankLines)
      }
    },
    { headers: NO_CACHE }
  );
}
__name(batchRules, "batchRules");
async function clearAll(context2, db) {
  const body = await readJson(context2);
  const confirmed = body.ok && body.value.confirm === true;
  if (!confirmed) return badRequest('\u9AD8\u5371\u64CD\u4F5C\uFF1A\u9700\u8981\u8BF7\u6C42\u4F53 {"confirm": true} \u624D\u80FD\u6E05\u7A7A');
  const deleted = await clearAllLogs(db);
  return jsonResponse({ success: true, data: { deleted } }, { headers: NO_CACHE });
}
__name(clearAll, "clearAll");

// api/_logger/keys.js
var KEY_ISSUE_WINDOW_MS = 60 * 1e3;
var KEY_ISSUE_IP_LIMIT = 10;
var KEY_ROTATE_WINDOW_MS = 60 * 1e3;
function keyIssueSecretRequired(env2) {
  const value = String(env2?.KEY_ISSUE_REQUIRE_SECRET ?? "").trim();
  return value === "1" || value.toLowerCase() === "true";
}
__name(keyIssueSecretRequired, "keyIssueSecretRequired");
function uidGate(uid) {
  return `uid:${String(uid ?? "").trim()}`;
}
__name(uidGate, "uidGate");
async function issueNewKey(db, row, quota, ip, uid) {
  const userKey = generateUserKey();
  const now2 = (/* @__PURE__ */ new Date()).toISOString();
  await setUserKey(db, row.id, {
    keyHash: await hashUserKey(userKey),
    preview: userKeyPreview(userKey)
  });
  await markKeyIssued(db, row.id, now2);
  await deleteUserChannels(db, row.id).catch((error3) => {
    console.warn(
      "[key-issue] \u540A\u9500\u65E7\u5BA2\u6237\u7AEF\u901A\u9053\u5931\u8D25\uFF08\u65E7\u901A\u9053\u53EF\u80FD\u4ECD\u663E\u793A\u5728\u7EBF\uFF09:",
      error3?.message ?? error3
    );
  });
  invalidateAuthStateCache();
  noteKeyAuthSuccess(ip, uidGate(uid));
  return jsonResponse(
    {
      success: true,
      data: {
        userKey,
        preview: userKeyPreview(userKey),
        username: String(row.username ?? ""),
        remaining: quota.remaining,
        total: quota.total,
        createdAt: now2
      }
    },
    { headers: NO_CACHE }
  );
}
__name(issueNewKey, "issueNewKey");
async function handleKeyIssue(context2, db) {
  const ip = clientIp(context2.request);
  const parsed = await readJson(context2);
  if (!parsed.ok) return badRequest("\u8BF7\u6C42\u4F53\u4E0D\u662F\u6709\u6548\u7684 JSON");
  const uid = String(parsed.value?.uid ?? "").trim();
  if (!uid)
    return badRequest("uid \u4E0D\u80FD\u4E3A\u7A7A\uFF1A\u8BF7\u5728\u6A21\u7EC4\u53C2\u6570 FINAL_UID \u91CC\u586B\u5199\u300C\u7528\u6237\u300D\u9875\u5206\u914D\u7684\u7B80\u4FBF ID");
  const deny = /* @__PURE__ */ __name((status4, code, error3, noteFailure = false) => {
    if (noteFailure) noteKeyAuthFailure(ip, uidGate(uid));
    return jsonResponse({ success: false, code, error: error3 }, { status: status4, headers: NO_CACHE });
  }, "deny");
  const ipGate = hitRateLimit(`uid-issue:ip:${ip}`, KEY_ISSUE_IP_LIMIT, KEY_ISSUE_WINDOW_MS);
  if (!ipGate.allowed)
    return tooManyRequests("\u53D6\u94A5\u8BF7\u6C42\u8FC7\u4E8E\u9891\u7E41\uFF1A\u8BF7 1 \u5206\u949F\u540E\u91CD\u8BD5", ipGate.retryAfterMs);
  if (isKeyAuthRateLimited(ip, uidGate(uid)))
    return deny(429, "key-rate-limited", "\u53D6\u94A5\u5931\u8D25\u6B21\u6570\u8FC7\u591A\uFF1A\u8BF7 1 \u5206\u949F\u540E\u91CD\u8BD5");
  const row = await getUserByUid(db, uid);
  if (!row)
    return deny(
      404,
      "uid-not-found",
      "UID \u4E0D\u5B58\u5728\uFF1A\u8BF7\u6838\u5BF9\u6A21\u7EC4\u53C2\u6570 FINAL_UID \u662F\u5426\u4E0E\u300C\u7528\u6237\u300D\u9875\u5206\u914D\u7684\u4E00\u81F4",
      true
    );
  if (String(row.status ?? "active") !== "active")
    return deny(403, "user-disabled", "UID \u5BF9\u5E94\u7684\u8D26\u53F7\u5DF2\u88AB\u7981\u7528\uFF1A\u8BF7\u8054\u7CFB\u7BA1\u7406\u5458", true);
  if (keyIssueSecretRequired(context2.env) && String(row.key_issue_secret ?? "") !== "") {
    const supplied = String(parsed.value?.secret ?? "");
    if (!supplied || !timingSafeEqual(supplied, String(row.key_issue_secret ?? "")))
      return deny(
        403,
        "key-issue-forbidden",
        "\u53D6\u94A5\u5BC6\u94A5\u4E0D\u6B63\u786E\uFF1A\u8BF7\u643A\u5E26\u300C\u7528\u6237\u300D\u9875\u5206\u914D\u7684\u4E8C\u56E0\u5B50\u5BC6\u94A5",
        true
      );
  }
  const quota = keyQuotaView(row.key_quota_total, row.key_quota_used);
  if (quota.total > 0 && quota.remaining <= 0)
    return deny(
      403,
      "key-exhausted",
      "\u8C03\u7528\u989D\u5EA6\u5DF2\u7528\u5B8C\uFF1A\u8BF7\u8054\u7CFB\u7BA1\u7406\u5458\u5728\u300C\u7528\u6237\u300D\u9875\u91CD\u7F6E\u989D\u5EA6\uFF08\u91CD\u7F6E\u540E\u65E0\u9700\u91CD\u65B0\u53D6\u94A5\uFF09",
      true
    );
  const lastIssuedAt = Date.parse(String(row.key_issued_at ?? "")) || 0;
  if (lastIssuedAt && Date.now() - lastIssuedAt < KEY_ROTATE_WINDOW_MS)
    return deny(
      429,
      "key-issue-throttled",
      "\u8BE5\u8D26\u53F7\u521A\u521A\u5DF2\u7B7E\u53D1\u8FC7\u5BC6\u94A5\uFF1A\u8BF7 1 \u5206\u949F\u540E\u518D\u8BD5\uFF08\u9762\u677F\u6B63\u5E38\u5237\u65B0\u4E0D\u53D7\u5F71\u54CD\uFF09"
    );
  return issueNewKey(db, row, quota, ip, uid);
}
__name(handleKeyIssue, "handleKeyIssue");

// api/logger.js
var TAG9 = "api/logger";
function dispatchGet(context2, db, url, path) {
  if (path === "/api/logger") return handleList(context2, db, url);
  if (path === "/api/logger/stats") return handleStats(context2, db, url);
  if (path === "/api/logger/export") return handleExport(context2, db, url);
  if (path === "/api/logger/export-summary") return handleExportSummary(context2, db, url);
  if (path === "/api/logger/export-versions") return handleExportVersions(context2, db);
  if (path === "/api/logger/schema") return handleSchema(context2, db);
  if (path === "/api/logger/meta") return handleMeta(context2, db);
  if (WRITE_PATHS.has(path)) return methodNotAllowed("GET", "POST");
  return notFound(`\u672A\u77E5\u7684\u63A5\u53E3\uFF1A${path}`);
}
__name(dispatchGet, "dispatchGet");
function dispatchPost(context2, db, url, path) {
  if (path === "/api/logger/key") return handleKeyIssue(context2, db);
  if (path === "/api/logger/hit") return handleHit(context2, db);
  if (path === "/api/logger/hits") return handleHitBatch(context2, db);
  if (WRITE_PATHS.has(path)) return handleWrite(context2, db, path);
  if (READ_PATHS.has(path)) return methodNotAllowed("POST", "GET");
  return notFound(`\u672A\u77E5\u7684\u63A5\u53E3\uFF1A${path}`);
}
__name(dispatchPost, "dispatchPost");
async function onRequest9(context2) {
  const { adapter: db, response } = await resolveAdapter(context2.env);
  if (response) return response;
  const url = new URL(context2.request.url);
  const path = normalizePath(url.pathname);
  const method = context2.request.method;
  try {
    await db.ready;
    if (method === "GET") return await dispatchGet(context2, db, url, path);
    if (method === "POST") return await dispatchPost(context2, db, url, path);
    return methodNotAllowed(method, "GET, POST");
  } catch (error3) {
    return errorResponse(TAG9, method, path, error3);
  }
}
__name(onRequest9, "onRequest");

// api/prefs.js
var TAG10 = "api/prefs";
function guardReservedUser(user) {
  return user === AI_CONFIG_USER ? badRequest(`\u7528\u6237\u300C${AI_CONFIG_USER}\u300D\u4E3A\u7CFB\u7EDF\u4FDD\u7559\uFF0CAI \u914D\u7F6E\u8BF7\u901A\u8FC7 /api/ai \u63A5\u53E3\u8BFB\u5199`) : null;
}
__name(guardReservedUser, "guardReservedUser");
var SHARED_EXPORT_USER = "export";
async function onRequest10(context2) {
  const { adapter: db, response } = await resolveAdapter(context2.env);
  if (response) return response;
  await db.ready;
  const url = new URL(context2.request.url);
  const path = url.pathname;
  const method = context2.request.method;
  try {
    if (method === "GET" && path === "/api/prefs/schema") {
      return textResponse(
        `${PREFS_SCHEMA}

-- \u63D0\u793A\uFF1Auser_id \u662F\u524D\u7AEF\u751F\u6210\u7684\u8BBE\u5907\u6807\u8BC6\uFF0C\u5355\u4E2A\u504F\u597D\u503C\u6700\u957F ${MAX_PREFERENCE_LENGTH} \u5B57\u7B26
`
      );
    }
    if (method === "GET" && path === "/api/prefs") return list(context2, db, url);
    if (method === "POST" && path === "/api/prefs") return save(context2, db);
    if (method === "DELETE" && path === "/api/prefs") return remove(context2, db, url);
    if (method === "GET") return notFound(`\u672A\u77E5\u7684\u63A5\u53E3\uFF1A${path}`);
    return methodNotAllowed(method, "GET, POST, DELETE");
  } catch (error3) {
    return errorResponse(TAG10, method, path, error3);
  }
}
__name(onRequest10, "onRequest");
async function guardPrefs(context2, db) {
  return guardPrincipal(context2.env, db, context2.request, context2, { auth: "mutation" });
}
__name(guardPrefs, "guardPrefs");
async function scopedUser(context2, db, rawUser, principal) {
  if (String(rawUser ?? "").includes(":")) {
    return {
      error: badRequest(
        "user \u6807\u8BC6\u5305\u542B\u975E\u6CD5\u5B57\u7B26\uFF1A\u542F\u7528\u9274\u6743\u540E\u7531\u670D\u52A1\u7AEF\u81EA\u52A8\u52A0\u8D26\u53F7\u524D\u7F00\uFF0C\u8BF7\u4F20\u7EAF\u8BBE\u5907\u6807\u8BC6"
      )
    };
  }
  const user = normalizeUserId(rawUser);
  const reserved = guardReservedUser(user);
  if (reserved) return { error: reserved };
  if (user === SHARED_EXPORT_USER) return { user };
  if (await isAuthEnabled(db)) {
    const accountId = principal?.user?.id;
    if (!accountId) return { error: unauthorized("\u504F\u597D\u8BFB\u5199\u9700\u8981\u767B\u5F55\u8D26\u53F7\u6216\u7528\u6237\u5BC6\u94A5") };
    return { user: normalizeUserId(`${accountId}:${user}`) };
  }
  return { user };
}
__name(scopedUser, "scopedUser");
async function list(context2, db, url) {
  const guard5 = await guardPrefs(context2, db);
  if (!guard5.ok) return guard5.response;
  const scoped = await scopedUser(context2, db, url.searchParams.get("user"), guard5.principal);
  if (scoped.error) return scoped.error;
  const settings = await listPrefs(db, scoped.user);
  return jsonResponse({ success: true, user: scoped.user, data: settings });
}
__name(list, "list");
async function save(context2, db) {
  const guard5 = await guardPrefs(context2, db);
  if (!guard5.ok) return guard5.response;
  const body = await readJson(context2);
  if (!body.ok) return badRequest("\u8BF7\u6C42\u4F53\u4E0D\u662F\u6709\u6548\u7684 JSON");
  const scoped = await scopedUser(context2, db, body.value.user, guard5.principal);
  if (scoped.error) return scoped.error;
  const settings = body.value.settings;
  if (!settings || typeof settings !== "object" || Array.isArray(settings)) {
    return badRequest("settings \u5FC5\u987B\u662F\u5BF9\u8C61");
  }
  const result = await savePrefs(db, scoped.user, settings);
  return jsonResponse({ success: true, user: scoped.user, data: result });
}
__name(save, "save");
async function remove(context2, db, url) {
  const guard5 = await guardPrefs(context2, db);
  if (!guard5.ok) return guard5.response;
  const scoped = await scopedUser(context2, db, url.searchParams.get("user"), guard5.principal);
  if (scoped.error) return scoped.error;
  const key = url.searchParams.get("key") || "";
  const data = key === "__all__" ? await clearPrefs(db, scoped.user) : await deletePref(db, scoped.user, key);
  return jsonResponse({ success: true, user: scoped.user, data });
}
__name(remove, "remove");

// _utils/reduce.js
var REDUCE_PREFS_USER = "trigger";
var REDUCE_LAST_RUN_KEY = "reduce.last_run";
var REDUCE_SNAPSHOT_KEY = "reduce.snapshot";
var REDUCE_CONFIG_KEY = "reduce.config";
var MAX_GROUPS = 15;
var MAX_MEMBERS_PER_GROUP = 10;
function defaultReduceConfig() {
  return { level: 3, intervalMinutes: 1440 };
}
__name(defaultReduceConfig, "defaultReduceConfig");
function normalizeReduceConfig(value) {
  const fallback = defaultReduceConfig();
  const level = Math.floor(Number(value?.level));
  const intervalMinutes = Math.floor(Number(value?.intervalMinutes));
  return {
    level: Number.isFinite(level) && level >= 2 && level <= 8 ? level : fallback.level,
    intervalMinutes: Number.isFinite(intervalMinutes) && intervalMinutes >= 0 && intervalMinutes <= 10080 ? intervalMinutes : fallback.intervalMinutes
  };
}
__name(normalizeReduceConfig, "normalizeReduceConfig");
async function loadReduceConfig(db) {
  try {
    const prefs = await listPrefs(db, REDUCE_PREFS_USER);
    return normalizeReduceConfig(safeJson(prefs[REDUCE_CONFIG_KEY]));
  } catch {
    return defaultReduceConfig();
  }
}
__name(loadReduceConfig, "loadReduceConfig");
async function saveReduceConfig(db, value) {
  const config2 = normalizeReduceConfig(value);
  await savePrefs(db, REDUCE_PREFS_USER, { [REDUCE_CONFIG_KEY]: JSON.stringify(config2) });
  return config2;
}
__name(saveReduceConfig, "saveReduceConfig");
function safeJson(text) {
  try {
    return JSON.parse(String(text ?? ""));
  } catch {
    return null;
  }
}
__name(safeJson, "safeJson");
function aggregateByLevel(rows, level = 3, { minMembers = 2 } = {}) {
  const depth = Math.floor(Number(level)) || 3;
  const groups = /* @__PURE__ */ new Map();
  for (const row of rows || []) {
    const hostname = String(row?.hostname ?? "").trim().toLowerCase();
    if (!hostname || !hostname.includes(".")) continue;
    if (hostname.includes("/")) continue;
    if (parseIpTarget(hostname)) continue;
    const parts = hostname.split(".");
    const key = parts.length > depth ? parts.slice(-depth).join(".") : hostname;
    const entry = groups.get(key) ?? { key, records: 0, hits: 0, members: [] };
    const count3 = Number(row?.count) || 1;
    entry.records += 1;
    entry.hits += count3;
    entry.members.push([hostname, count3]);
    groups.set(key, entry);
  }
  const result = [...groups.values()].filter((group3) => group3.records >= minMembers).map((group3) => ({
    ...group3,
    members: group3.members.sort((a, b) => b[1] - a[1]).slice(0, MAX_MEMBERS_PER_GROUP)
  })).sort((a, b) => b.records - a.records || b.hits - a.hits || a.key.localeCompare(b.key));
  return result.slice(0, MAX_GROUPS);
}
__name(aggregateByLevel, "aggregateByLevel");
async function runReduceAnalysis(db, configOverride = null) {
  const config2 = configOverride ?? await loadReduceConfig(db);
  const rows = await db.execute(
    "SELECT hostname, count FROM surge_logs ORDER BY count DESC LIMIT 20000"
  );
  const groups = aggregateByLevel(rows, config2.level);
  const at = (/* @__PURE__ */ new Date()).toISOString();
  const snapshot = { at, level: config2.level, groups };
  await savePrefs(db, REDUCE_PREFS_USER, {
    [REDUCE_SNAPSHOT_KEY]: JSON.stringify(snapshot),
    [REDUCE_LAST_RUN_KEY]: at
  });
  return { at, config: config2, groups };
}
__name(runReduceAnalysis, "runReduceAnalysis");
async function loadReduceSnapshot(db) {
  try {
    const prefs = await listPrefs(db, REDUCE_PREFS_USER);
    const snapshot = safeJson(prefs[REDUCE_SNAPSHOT_KEY]);
    return snapshot && Array.isArray(snapshot.groups) ? snapshot : null;
  } catch {
    return null;
  }
}
__name(loadReduceSnapshot, "loadReduceSnapshot");
async function loadReduceLastRun(db) {
  try {
    const prefs = await listPrefs(db, REDUCE_PREFS_USER);
    return Date.parse(String(prefs[REDUCE_LAST_RUN_KEY] ?? "")) || null;
  } catch {
    return null;
  }
}
__name(loadReduceLastRun, "loadReduceLastRun");

// api/reduce.js
var TAG11 = "api/reduce";
var NO_STORE4 = { "Cache-Control": "no-store" };
async function guardMutation(context2, db) {
  return guardPrincipal(context2.env, db, context2.request, context2, { auth: "mutation" });
}
__name(guardMutation, "guardMutation");
async function handleSuggestions(context2, db) {
  const [config2, snapshot] = await Promise.all([loadReduceConfig(db), loadReduceSnapshot(db)]);
  return jsonResponse(
    { success: true, data: { config: config2, snapshot } },
    {
      headers: {
        ...NO_STORE4,
        ...readOnlyWarningHeaders(context2.env, await isAuthEnabled(db))
      }
    }
  );
}
__name(handleSuggestions, "handleSuggestions");
async function handleConfig(context2, db) {
  const gate = await guardMutation(context2, db);
  if (!gate.ok) return gate.response;
  const parsed = await readJson(context2);
  if (!parsed.ok) return badRequest("\u8BF7\u6C42\u4F53\u4E0D\u662F\u6709\u6548\u7684 JSON");
  const body = parsed.value ?? {};
  if (body.level !== void 0 && !(Number.isFinite(Number(body.level)) && Number(body.level) >= 2 && Number(body.level) <= 8)) {
    return badRequest("\u5C42\u7EA7\u9700\u4E3A 2-8 \u7684\u6574\u6570");
  }
  if (body.intervalMinutes !== void 0 && !(Number.isFinite(Number(body.intervalMinutes)) && Number(body.intervalMinutes) >= 0)) {
    return badRequest("\u9891\u6B21\u9700\u4E3A\u4E0D\u5C0F\u4E8E 0 \u7684\u6574\u6570\u5206\u949F\uFF080 = \u5173\u95ED\u5B9A\u65F6\uFF09");
  }
  const config2 = await saveReduceConfig(db, body);
  return jsonResponse({ success: true, data: config2 }, { headers: NO_STORE4 });
}
__name(handleConfig, "handleConfig");
async function handleAnalyze(context2, db) {
  const gate = await guardMutation(context2, db);
  if (!gate.ok) return gate.response;
  const result = await runReduceAnalysis(db);
  return jsonResponse(
    {
      success: true,
      data: {
        at: result.at,
        config: result.config,
        groups: result.groups
      }
    },
    { headers: NO_STORE4 }
  );
}
__name(handleAnalyze, "handleAnalyze");
async function handleReduceRequest(context2, db, path, method) {
  try {
    if (path === "/api/reduce/suggestions") {
      if (method === "GET") return await handleSuggestions(context2, db);
      return methodNotAllowed(method, "GET");
    }
    if (path === "/api/reduce/config") {
      if (method === "POST") return await handleConfig(context2, db);
      return methodNotAllowed(method, "POST");
    }
    if (path === "/api/reduce/analyze") {
      if (method === "POST") return await handleAnalyze(context2, db);
      return methodNotAllowed(method, "POST");
    }
    return notFound(`\u672A\u77E5\u7684\u63A5\u53E3\uFF1A${path}`);
  } catch (error3) {
    return errorResponse(TAG11, method, path, error3);
  }
}
__name(handleReduceRequest, "handleReduceRequest");
async function onRequest11(context2) {
  const { adapter: db, response } = await resolveAdapter(context2.env);
  if (response) return response;
  await db.ready;
  const url = new URL(context2.request.url);
  return handleReduceRequest(context2, db, url.pathname, context2.request.method);
}
__name(onRequest11, "onRequest");

// api/rollouts.js
var FEATURE_PATH = /^\/api\/rollouts\/([\w.-]+)$/;
async function onRequest12(context2) {
  const { adapter: db, response } = await resolveAdapter(context2.env);
  if (response) return response;
  await db.ready;
  const url = new URL(context2.request.url);
  const path = url.pathname.replace(/\/+$/, "") || url.pathname;
  const method = context2.request.method;
  const gate = await requireAdminAuth(context2.env, db, context2.request, context2);
  if (!gate.ok) return gate.response;
  if (method === "GET" && (path === "/api/rollouts" || path === "/api/rollouts/")) {
    const rollouts = await listRollouts(db);
    return jsonResponse({ success: true, data: { rollouts } }, { headers: NO_CACHE });
  }
  const match2 = path.match(FEATURE_PATH);
  if (!match2) {
    return jsonResponse(
      { success: false, error: `\u672A\u77E5\u7684\u63A5\u53E3\uFF1A${path}` },
      { status: 404, headers: NO_CACHE }
    );
  }
  const feature = match2[1];
  if (method === "PUT") {
    if (!await rolloutsTableReady(db)) {
      return jsonResponse(
        {
          success: false,
          error: "feature_rollouts \u8868\u4E0D\u5B58\u5728\uFF1A\u8BF7\u5230\u300C\u6570\u636E\u300D\u9875\u6267\u884C\u8868\u7ED3\u6784\u81EA\u6108\uFF08v19\uFF09"
        },
        { status: 409, headers: NO_CACHE }
      );
    }
    if (!Object.prototype.hasOwnProperty.call(FEATURES, feature)) {
      return badRequest(`\u672A\u77E5\u7684\u529F\u80FD\u952E\uFF1A${feature}\uFF08\u4EE5 /api/auth/me \u7684 features \u6CE8\u518C\u8868\u4E3A\u51C6\uFF09`);
    }
    let body;
    try {
      body = await context2.request.json();
    } catch {
      return badRequest("\u8BF7\u6C42\u4F53\u4E0D\u662F\u6709\u6548\u7684 JSON");
    }
    const validated = validateRolloutConfig(body);
    if (!validated.ok) return badRequest(validated.error);
    const saved = await writeRollout(db, feature, validated.config);
    await recordAudit(
      db,
      gate.principal,
      "rollout.update",
      "feature",
      feature,
      FEATURES[feature] ?? feature,
      JSON.stringify(validated.config)
    );
    return jsonResponse({ success: true, data: { rollout: saved } }, { status: 200 });
  }
  if (method === "DELETE") {
    const removed = await deleteRollout(db, feature);
    if (!removed) {
      return jsonResponse(
        { success: false, error: `\u8BE5\u529F\u80FD\u6CA1\u6709\u7070\u5EA6\u914D\u7F6E\uFF1A${feature}` },
        { status: 404, headers: NO_CACHE }
      );
    }
    await recordAudit(
      db,
      gate.principal,
      "rollout.delete",
      "feature",
      feature,
      FEATURES[feature] ?? feature,
      ""
    );
    return jsonResponse({ success: true, data: { removed: feature } });
  }
  return jsonResponse(
    { success: false, error: `\u4E0D\u652F\u6301\u7684\u65B9\u6CD5\uFF1A${method}` },
    { status: 405, headers: NO_CACHE }
  );
}
__name(onRequest12, "onRequest");

// api/rules.js
var TAG12 = "api/rules";
var ALLOWED_ACTIONS2 = ["REJECT", "PROXY", "DIRECT", "FINAL"];
var ALLOW_METHODS3 = "GET, POST, PUT, DELETE";
var RULE_COLUMNS = "id, domain, action, remark";
function validateRuleInput(value) {
  const domain2 = String(value?.domain ?? "").trim();
  const action = String(value?.action ?? "").trim().toUpperCase();
  const remark = String(value?.remark ?? "").trim() || null;
  if (!domain2) return { error: "\u57DF\u540D\u4E0D\u80FD\u4E3A\u7A7A" };
  if (domain2.length > 253) return { error: "\u57DF\u540D\u8FC7\u957F\uFF08\u8D85\u8FC7 253 \u5B57\u7B26\uFF09" };
  if (!ALLOWED_ACTIONS2.includes(action)) {
    return { error: `\u52A8\u4F5C\u5FC5\u987B\u662F\u4EE5\u4E0B\u4E4B\u4E00\uFF1A${ALLOWED_ACTIONS2.join(" / ")}` };
  }
  if (remark && remark.length > 200) return { error: "\u5907\u6CE8\u8FC7\u957F\uFF08\u8D85\u8FC7 200 \u5B57\u7B26\uFF09" };
  return { value: { domain: domain2, action, remark } };
}
__name(validateRuleInput, "validateRuleInput");
async function onRequest13(context2) {
  const { adapter: db, response } = await resolveAdapter(context2.env);
  if (response) return response;
  const url = new URL(context2.request.url);
  const path = url.pathname;
  const method = context2.request.method;
  try {
    await db.ready;
    if (method === "GET" && path === "/api/rules") return listRules(db, url);
    if (method === "GET" && path === "/api/rules/list") return exportSubscription(db);
    if (method === "POST" && path === "/api/rules") return createRule(context2, db);
    if (/^\/api\/rules\/(\d+)$/.test(path)) return handleRuleItem(context2, db, path, method);
    return methodNotAllowed(method, ALLOW_METHODS3);
  } catch (error3) {
    return errorResponse(TAG12, method, path, error3);
  }
}
__name(onRequest13, "onRequest");
async function listRules(db, url) {
  const keyword = url.searchParams.get("search")?.trim();
  const like = `%${likeEscape(keyword)}%`;
  const rows = keyword ? await db.execute(
    `SELECT ${RULE_COLUMNS} FROM rules WHERE domain LIKE ? ESCAPE '\\' OR remark LIKE ? ESCAPE '\\' ORDER BY id`,
    [like, like]
  ) : await db.execute(`SELECT ${RULE_COLUMNS} FROM rules ORDER BY id`);
  return jsonResponse({ success: true, data: rows });
}
__name(listRules, "listRules");
async function exportSubscription(db) {
  const rows = await db.execute(`SELECT ${RULE_COLUMNS} FROM rules ORDER BY id`);
  const lines = rows.map((row) => formatRule(row.domain, row.action, row.remark ?? ""));
  return textResponse(joinRuleLines(lines, ""), {
    headers: { "Cache-Control": "public, max-age=60" }
  });
}
__name(exportSubscription, "exportSubscription");
async function createRule(context2, db) {
  const auth = await requireMutationAuth(context2.env, db, context2.request, context2);
  if (!auth.ok) return auth.response;
  const featureDenied = await requireFeature(auth.principal, "logs.write", { db });
  if (featureDenied) return featureDenied;
  const parsed = await readJson(context2);
  if (!parsed.ok) return badRequest("\u8BF7\u6C42\u4F53\u4E0D\u662F\u6709\u6548\u7684 JSON");
  const check2 = validateRuleInput(parsed.value);
  if (check2.error) return badRequest(check2.error);
  const { domain: domain2, action, remark } = check2.value;
  await db.execute("INSERT INTO rules (domain, action, remark) VALUES (?, ?, ?)", [
    domain2,
    action,
    remark
  ]);
  const row = (await db.execute(
    `SELECT ${RULE_COLUMNS} FROM rules WHERE domain = ? AND action = ? ORDER BY id DESC LIMIT 1`,
    [domain2, action]
  ))[0];
  return jsonResponse(
    { success: true, data: row ?? { domain: domain2, action, remark } },
    { status: 201 }
  );
}
__name(createRule, "createRule");
function handleRuleItem(context2, db, path, method) {
  const id = path.match(/^\/api\/rules\/(\d+)$/)[1];
  if (method === "GET") return getRule(db, id);
  return writeRuleItem(context2, db, id, method);
}
__name(handleRuleItem, "handleRuleItem");
async function writeRuleItem(context2, db, id, method) {
  const auth = await requireMutationAuth(context2.env, db, context2.request, context2);
  if (!auth.ok) return auth.response;
  const featureDenied = await requireFeature(auth.principal, "logs.write", { db });
  if (featureDenied) return featureDenied;
  if (method === "PUT") return updateRule2(context2, db, id);
  if (method === "DELETE") return removeRule(db, id);
  return methodNotAllowed(method, ALLOW_METHODS3);
}
__name(writeRuleItem, "writeRuleItem");
async function getRule(db, id) {
  const rows = await db.execute(`SELECT ${RULE_COLUMNS} FROM rules WHERE id = ?`, [id]);
  if (!rows.length) return notFound();
  return jsonResponse({ success: true, data: rows[0] });
}
__name(getRule, "getRule");
async function updateRule2(context2, db, id) {
  const parsed = await readJson(context2);
  if (!parsed.ok) return badRequest("\u8BF7\u6C42\u4F53\u4E0D\u662F\u6709\u6548\u7684 JSON");
  const check2 = validateRuleInput(parsed.value);
  if (check2.error) return badRequest(check2.error);
  const { domain: domain2, action, remark } = check2.value;
  await db.execute("UPDATE rules SET domain = ?, action = ?, remark = ? WHERE id = ?", [
    domain2,
    action,
    remark,
    id
  ]);
  const rows = await db.execute(`SELECT ${RULE_COLUMNS} FROM rules WHERE id = ?`, [id]);
  return jsonResponse({ success: true, data: rows[0] });
}
__name(updateRule2, "updateRule");
async function removeRule(db, id) {
  await db.execute("DELETE FROM rules WHERE id = ?", [id]);
  return jsonResponse({ success: true });
}
__name(removeRule, "removeRule");

// api/schema.js
var RULES_SCHEMA = `CREATE TABLE IF NOT EXISTS rules (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  domain TEXT NOT NULL,
  action TEXT NOT NULL,
  remark TEXT
);
CREATE INDEX IF NOT EXISTS idx_rules_domain ON rules(domain);`.trim();
var TABLES = {
  rules: RULES_SCHEMA,
  logger: LOGS_SCHEMA,
  prefs: PREFS_SCHEMA,
  subscriptions: SUBSCRIPTIONS_SCHEMA,
  health: HEALTH_PROBE_SCHEMA,
  heartbeats: HEARTBEATS_SCHEMA,
  devices: DEVICES_SCHEMA,
  meta: DB_META_SCHEMA,
  auth: AUTH_SCHEMA,
  "user-channels": USER_CHANNELS_SCHEMA,
  "ai-verdict": DOMAIN_VERDICT_SCHEMA,
  "feature-rollouts": FEATURE_ROLLOUTS_SCHEMA,
  "feature-entitlements": FEATURE_ENTITLEMENTS_SCHEMA
};
async function onRequest14(context2) {
  const { adapter: db, response } = await resolveAdapter(context2.env);
  if (response) return response;
  await db.ready;
  if (await isAuthEnabled(db)) {
    const gate = await guardPrincipal(context2.env, db, context2.request, context2, {
      auth: "admin"
    });
    if (!gate.ok) return gate.response;
  }
  const path = new URL(context2.request.url).pathname;
  const method = context2.request.method;
  if (method === "GET" && path === "/api/schema") {
    return textResponse(
      [
        RULES_SCHEMA,
        LOGS_SCHEMA,
        PREFS_SCHEMA,
        SUBSCRIPTIONS_SCHEMA,
        HEALTH_PROBE_SCHEMA,
        HEARTBEATS_SCHEMA,
        DEVICES_SCHEMA,
        DB_META_SCHEMA,
        AUTH_SCHEMA,
        USER_CHANNELS_SCHEMA,
        DOMAIN_VERDICT_SCHEMA,
        FEATURE_ROLLOUTS_SCHEMA,
        FEATURE_ENTITLEMENTS_SCHEMA
      ].join("\n\n") + "\n\n-- \u5168\u90E8\u8BED\u53E5\u5747\u4E3A IF NOT EXISTS\uFF0C\u53EF\u91CD\u590D\u6267\u884C\uFF0C\u4E0D\u4F1A\u7834\u574F\u5DF2\u6709\u6570\u636E",
      { headers: NO_CACHE }
      // DDL 随部署演进且身份相关，禁止缓存
    );
  }
  const match2 = path.match(/^\/api\/schema\/table\/([\w-]+)$/);
  if (method === "GET" && match2) {
    const schema = TABLES[match2[1]];
    if (!schema)
      return notFound(
        `\u672A\u77E5\u7684\u8868\uFF1A${match2[1]}\uFF08\u53EF\u9009 rules / logger / prefs / subscriptions / health / heartbeats / devices / meta / auth / user-channels / ai-verdict / feature-rollouts / feature-entitlements\uFF09`
      );
    return textResponse(schema, { headers: NO_CACHE });
  }
  if (method === "GET") return notFound(`\u672A\u77E5\u7684\u63A5\u53E3\uFF1A${path}`);
  return jsonResponse({ success: false, error: `\u4E0D\u652F\u6301\u7684\u65B9\u6CD5\uFF1A${method}` }, { status: 405 });
}
__name(onRequest14, "onRequest");

// api/setup.js
var TAG13 = "api/setup";
var NO_STORE5 = { "Cache-Control": "no-store" };
async function onRequest15(context2) {
  const url = new URL(context2.request.url);
  const path = url.pathname.replace(/\/+$/, "") || "/api/setup";
  const method = context2.request.method;
  try {
    if (method === "GET" && path === "/api/setup/status") return status2(context2);
    if (method === "POST" && path === "/api/setup/init-schema") return initSchema(context2);
    if (path === "/api/setup/status" || path === "/api/setup/init-schema") {
      return methodNotAllowed(method, "GET, POST");
    }
    return jsonResponse(
      { success: false, error: `\u672A\u77E5\u7684\u63A5\u53E3\uFF1A${path}` },
      { status: 404, headers: NO_STORE5 }
    );
  } catch (error3) {
    return errorResponse(TAG13, method, path, error3);
  }
}
__name(onRequest15, "onRequest");
async function status2(context2) {
  const backendHint = String(context2.env?.DB_BACKEND ?? "").trim() || "turso";
  const platformTokenConfigured = Boolean(String(context2.env?.TURSO_API_TOKEN ?? "").trim());
  const hitTokenConfigured = Boolean(String(context2.env?.PANEL_HIT_TOKEN ?? "").trim());
  let connected2 = false;
  let connectionError = "";
  let db = null;
  let schemaVersion = null;
  let missingTables = [];
  let authEnabled = false;
  let aiConfigured = false;
  try {
    const resolved = await resolveAdapter(context2.env);
    if (resolved.response) {
      const body = await resolved.response.json().catch(() => ({}));
      connectionError = String(body?.error ?? "\u6570\u636E\u5E93\u914D\u7F6E\u65E0\u6548");
    } else {
      db = resolved.adapter;
      await db.ready;
      connected2 = true;
      schemaVersion = await readSchemaVersion(db);
      missingTables = await detectMissingTables(db);
      authEnabled = await isAuthEnabled(db);
      aiConfigured = await readAiConfigured(db);
    }
  } catch (error3) {
    connected2 = false;
    connectionError = String(error3?.message ?? "\u6570\u636E\u5E93\u8FDE\u63A5\u5931\u8D25");
  }
  return jsonResponse(
    {
      success: true,
      data: {
        backend: db?.backend ?? backendHint,
        connected: connected2,
        connectionError,
        schemaVersion: connected2 ? schemaVersion : null,
        expectedSchemaVersion: DB_SCHEMA_VERSION,
        missingTables,
        initialized: connected2 && missingTables.length === 0,
        platformTokenConfigured,
        hitTokenConfigured,
        aiConfigured,
        authEnabled
      }
    },
    { headers: NO_STORE5 }
  );
}
__name(status2, "status");
async function readAiConfigured(db) {
  try {
    const config2 = loadAiConfig(db);
    const accounts = Array.isArray(config2?.accounts) ? config2.accounts : [];
    return accounts.some(
      (entry) => String(entry?.id ?? "").trim() && String(entry?.token ?? "").trim()
    ) || Boolean(
      String(config2?.cfAccountId ?? "").trim() && String(config2?.cfApiToken ?? "").trim()
    );
  } catch {
    return false;
  }
}
__name(readAiConfigured, "readAiConfigured");
async function initSchema(context2) {
  const resolved = await resolveAdapter(context2.env);
  if (resolved.response) return resolved.response;
  const db = resolved.adapter;
  await db.ready;
  let gate = null;
  try {
    gate = await requireAdminAuth(context2.env, db, context2.request, context2);
  } catch {
  }
  if (gate && !gate.ok) {
    const authReady = await hasAnyUser(db).catch(() => false);
    if (authReady) return gate.response;
  }
  const result = await repairSchema(db);
  return jsonResponse(
    {
      success: true,
      data: {
        repaired: result.repaired,
        schemaVersion: result.schemaVersion ?? DB_SCHEMA_VERSION,
        initialized: (await detectMissingTables(db)).length === 0
      }
    },
    { headers: NO_STORE5 }
  );
}
__name(initSchema, "initSchema");

// api/_subscribe/fetch-subscription.js
var FETCH_TIMEOUT_MS2 = 8e3;
var FETCH_MAX_ATTEMPTS = 3;
var FETCH_RETRY_BASE_DELAY_MS = 300;
var FETCH_MAX_TOTAL_MS = 3e4;
var MAX_BODY_BYTES = 2 * 1024 * 1024;
function judgeBodyText(text) {
  if (!text.trim()) return { ok: false, error: "\u8BA2\u9605\u5185\u5BB9\u4E3A\u7A7A" };
  if (text.length > MAX_BODY_BYTES) {
    return { ok: false, error: `\u8BA2\u9605\u5185\u5BB9\u8D85\u8FC7 ${MAX_BODY_BYTES / 1024 / 1024}MB \u4E0A\u9650` };
  }
  return { ok: true, text };
}
__name(judgeBodyText, "judgeBodyText");
async function readBodyCapped(response) {
  const declared = Number(response.headers.get("content-length") || 0);
  if (declared > MAX_BODY_BYTES) {
    return { ok: false, error: `\u8BA2\u9605\u5185\u5BB9\u8D85\u8FC7 ${MAX_BODY_BYTES / 1024 / 1024}MB \u4E0A\u9650` };
  }
  const reader = response.body?.getReader?.();
  if (!reader) {
    try {
      return judgeBodyText(await response.text());
    } catch (error3) {
      return { ok: false, error: `\u8BFB\u53D6\u5185\u5BB9\u5931\u8D25\uFF1A${error3?.message || "\u672A\u77E5\u539F\u56E0"}` };
    }
  }
  const decoder = new TextDecoder();
  let total = 0;
  let text = "";
  try {
    for (; ; ) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_BODY_BYTES) {
        await reader.cancel().catch(() => {
        });
        return {
          ok: false,
          error: `\u8BA2\u9605\u5185\u5BB9\u8D85\u8FC7 ${MAX_BODY_BYTES / 1024 / 1024}MB \u4E0A\u9650`
        };
      }
      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
  } catch (error3) {
    return { ok: false, error: `\u8BFB\u53D6\u5185\u5BB9\u5931\u8D25\uFF1A${error3?.message || "\u672A\u77E5\u539F\u56E0"}` };
  }
  return judgeBodyText(text);
}
__name(readBodyCapped, "readBodyCapped");
async function readBody(response) {
  if (!response.ok) {
    return { ok: false, error: `\u8BA2\u9605\u6E90\u8FD4\u56DE HTTP ${response.status}`, status: response.status };
  }
  const contentType = String(response.headers.get("content-type") || "").toLowerCase();
  if (contentType.includes("text/html")) {
    return { ok: false, error: "\u8FD4\u56DE\u7684\u662F\u7F51\u9875\u800C\u4E0D\u662F\u89C4\u5219\u5185\u5BB9\uFF08content-type \u4E3A text/html\uFF09" };
  }
  return readBodyCapped(response);
}
__name(readBody, "readBody");
function redactUrlForLog(url) {
  try {
    const parsed = new URL(url);
    parsed.username = "";
    parsed.password = "";
    parsed.search = "";
    return `${parsed.origin}${parsed.pathname}`;
  } catch {
    return "<invalid-url>";
  }
}
__name(redactUrlForLog, "redactUrlForLog");
var MAX_REDIRECTS = 5;
function mockOutbound(url, env2) {
  const base = String(env2?.SUBSCRIBE_MOCK_UPSTREAM ?? "").trim();
  if (!base) return url;
  return `${base}?mock_url=${encodeURIComponent(url)}`;
}
__name(mockOutbound, "mockOutbound");
async function fetchWithGuardedRedirects(initialUrl, env2 = null) {
  let url = initialUrl;
  for (let hop = 0; hop <= MAX_REDIRECTS; hop += 1) {
    const checked = checkSubscriptionUrl(url);
    if (checked.error) return { error: checked.error, status: 400 };
    const response = await fetchWithRetry(
      mockOutbound(checked.url, env2),
      { redirect: "manual" },
      {
        timeoutMs: FETCH_TIMEOUT_MS2,
        maxAttempts: FETCH_MAX_ATTEMPTS,
        baseDelayMs: FETCH_RETRY_BASE_DELAY_MS,
        totalBudgetMs: FETCH_MAX_TOTAL_MS,
        onRetry: /* @__PURE__ */ __name((info3) => console.warn("[subscribe][fetch] \u53EF\u91CD\u8BD5\uFF0C\u51C6\u5907\u91CD\u8BD5", {
          ...info3,
          host: redactUrlForLog(checked.url)
        }), "onRetry")
      }
    ).catch((error3) => error3);
    if (response instanceof Error) {
      if (response?.name === "TimeoutError" || response?.name === "AbortError") {
        return {
          error: `\u6293\u53D6\u8D85\u65F6\uFF08\u8D85\u8FC7 ${FETCH_TIMEOUT_MS2 / 1e3} \u79D2\u65E0\u54CD\u5E94\uFF09`,
          status: 504
        };
      }
      return { error: `\u6293\u53D6\u5931\u8D25\uFF1A${response?.message || "\u7F51\u7EDC\u4E0D\u53EF\u8FBE"}`, status: 0 };
    }
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      if (!location)
        return {
          error: `\u8BA2\u9605\u6E90\u8FD4\u56DE ${response.status} \u91CD\u5B9A\u5411\u4F46\u6CA1\u6709 Location`,
          status: 502
        };
      url = new URL(location, checked.url).toString();
      continue;
    }
    return { response };
  }
  return { error: `\u91CD\u5B9A\u5411\u8D85\u8FC7 ${MAX_REDIRECTS} \u8DF3\uFF0C\u5DF2\u4E2D\u6B62`, status: 508 };
}
__name(fetchWithGuardedRedirects, "fetchWithGuardedRedirects");
async function fetchAndExtract(url, env2 = null, filter = null) {
  const outcome = await fetchWithGuardedRedirects(url, env2);
  if (outcome.error) {
    return { ok: false, error: outcome.error, status: outcome.status ?? 0 };
  }
  const response = outcome.response;
  const gate = await readBody(response);
  if (!gate.ok) return gate;
  const first = extractRuleLines(gate.text, filter);
  const decoded = retryAsBase64(gate.text, first, filter);
  if (decoded) return decoded;
  if (first.lines.length === 0) {
    return { ok: false, error: "\u6CA1\u6709\u4ECE\u5185\u5BB9\u91CC\u8BC6\u522B\u51FA\u4EFB\u4F55\u89C4\u5219\uFF08\u53EF\u80FD\u4E0D\u662F\u89C4\u5219\u8BA2\u9605\uFF09" };
  }
  return { ok: true, ...first, truncated: first.lines.length >= MAX_RULE_LINES };
}
__name(fetchAndExtract, "fetchAndExtract");

// api/_subscribe/constants.js
var TAG14 = "api/subscribe";
var READ_PATHS2 = /* @__PURE__ */ new Set(["/api/subscribe", "/api/subscribe/schema"]);
var WRITE_PATHS2 = /* @__PURE__ */ new Set([
  "/api/subscribe/parse",
  "/api/subscribe/save",
  "/api/subscribe/delete",
  "/api/subscribe/filter"
]);
var SUBSCRIBE_FILTER_KEY = "subscribe_filter";
var SUBSCRIBE_FILTER_USER = "subscribe_filter";

// api/_subscribe/routes.js
async function handleSchema2() {
  return textResponse(
    `${SUBSCRIPTIONS_SCHEMA}

-- url \u5FC5\u987B\u7531 normalizeSubscriptionUrl \u89C4\u8303\u5316\u540E\u5199\u5165\uFF0CUNIQUE(url) \u624D\u6709\u6548`
  );
}
__name(handleSchema2, "handleSchema");
async function handleList2(context2, db) {
  const items = await listSubscriptions(db);
  return jsonResponse(
    { success: true, data: items },
    { headers: { ...CACHE_OK, ...warningHeadersIfOpen(context2.env) } }
  );
}
__name(handleList2, "handleList");
async function handleParse(db, payload, env2 = null) {
  const raw = String(payload.url ?? "").trim();
  if (!raw) return badRequest("\u8BA2\u9605\u5730\u5740\u4E0D\u80FD\u4E3A\u7A7A");
  const checked = checkSubscriptionUrl(raw);
  if (checked.error) return badRequest(checked.error);
  const cached = readCache(checked.url);
  const filter = await loadSubscribeFilter(db).catch(() => null);
  const extracted = cached || await fetchAndExtract(checked.url, env2, filter);
  if (cached) writeCache(checked.url, cached);
  if (!extracted.ok) {
    await updateSubscriptionStatus(db, checked.url, {
      ruleCount: 0,
      status: `failed: ${extracted.error}`
    }).catch(() => 0);
    return jsonResponse(
      {
        success: false,
        error: extracted.error,
        data: { url: checked.url, status: extracted.status }
      },
      {
        status: extracted.status === 404 || extracted.status === 410 ? 404 : 400,
        headers: NO_CACHE
      }
    );
  }
  writeCache(checked.url, extracted);
  await updateSubscriptionStatus(db, checked.url, {
    ruleCount: extracted.lines.length,
    status: "ok"
  }).catch(() => 0);
  return jsonResponse(
    {
      success: true,
      data: {
        url: checked.url,
        lines: extracted.lines,
        count: extracted.lines.length,
        skipped: extracted.skipped,
        excluded: Number(extracted.filtered) || 0,
        total: extracted.total,
        truncated: Boolean(extracted.truncated)
      }
    },
    { headers: NO_CACHE }
  );
}
__name(handleParse, "handleParse");
async function loadSubscribeFilter(db) {
  const prefs = await listPrefs(db, SUBSCRIBE_FILTER_USER);
  const raw = prefs?.[SUBSCRIBE_FILTER_KEY];
  return raw ? normalizeFilterConfig(JSON.parse(String(raw))) : null;
}
__name(loadSubscribeFilter, "loadSubscribeFilter");
async function handleFilterGet(db) {
  const filter = await loadSubscribeFilter(db).catch(() => null);
  const normalized = filter ?? { excludeKeywords: [], replacements: [] };
  return jsonResponse(
    {
      success: true,
      data: {
        excludeKeywords: normalized.excludeKeywords.join("\n"),
        replacements: normalized.replacements.map((rule) => `${rule.find} => ${rule.replace}`).join("\n")
      }
    },
    { headers: NO_CACHE }
  );
}
__name(handleFilterGet, "handleFilterGet");
async function handleFilterSave(db, payload) {
  const normalized = normalizeFilterConfig({
    excludeKeywords: String(payload.excludeKeywords ?? ""),
    replacements: String(payload.replacements ?? "")
  });
  await savePrefs(db, SUBSCRIBE_FILTER_USER, {
    [SUBSCRIBE_FILTER_KEY]: JSON.stringify(normalized)
  });
  return jsonResponse(
    {
      success: true,
      data: {
        excludeKeywords: normalized.excludeKeywords.join("\n"),
        replacements: normalized.replacements.map((rule) => `${rule.find} => ${rule.replace}`).join("\n"),
        excludedKeywords: normalized.excludeKeywords.length,
        replacementRules: normalized.replacements.length
      }
    },
    { headers: NO_CACHE }
  );
}
__name(handleFilterSave, "handleFilterSave");
async function handleSave(db, payload) {
  const raw = String(payload.url ?? "").trim();
  if (!raw) return badRequest("\u8BA2\u9605\u5730\u5740\u4E0D\u80FD\u4E3A\u7A7A");
  const checked = checkSubscriptionUrl(raw);
  if (checked.error) return badRequest(checked.error);
  const policy = String(payload.policy ?? "").trim().slice(0, 64);
  const ruleCount = Math.max(0, Math.floor(Number(payload.ruleCount) || 0));
  const saved = await upsertSubscription(db, checked.url, payload.name, {
    ruleCount,
    policy,
    lastStatus: ruleCount > 0 ? String(payload.lastStatus || "ok") : ""
  });
  const items = await listSubscriptions(db);
  return jsonResponse(
    { success: true, data: { id: saved.id, created: saved.created, subscriptions: items } },
    { headers: NO_CACHE }
  );
}
__name(handleSave, "handleSave");
async function handleDelete(db, payload) {
  const id = Number(payload.id);
  if (!Number.isInteger(id) || id <= 0) return badRequest("id \u5FC5\u987B\u662F\u6B63\u6574\u6570");
  const deleted = await deleteSubscription(db, id);
  const items = await listSubscriptions(db);
  return jsonResponse(
    { success: true, data: { deleted, subscriptions: items } },
    { headers: NO_CACHE }
  );
}
__name(handleDelete, "handleDelete");

// api/subscribe.js
async function dispatchWrite(context2, db, path) {
  const auth = await requireMutationAuth(context2.env, db, context2.request, context2);
  if (!auth.ok) return auth.response;
  const featureDenied = await requireFeature(auth.principal, "subscribe.manage", { path, db });
  if (featureDenied) return featureDenied;
  const body = await readJson(context2);
  if (!body.ok) return badRequest("\u8BF7\u6C42\u4F53\u4E0D\u662F\u6709\u6548\u7684 JSON");
  const payload = body.value || {};
  if (path === "/api/subscribe/parse") return handleParse(db, payload, context2.env);
  if (path === "/api/subscribe/save") return handleSave(db, payload);
  if (path === "/api/subscribe/filter") return handleFilterSave(db, payload);
  return handleDelete(db, payload);
}
__name(dispatchWrite, "dispatchWrite");
async function onRequest16(context2) {
  const { adapter: db, response: configError } = await resolveAdapter(context2.env);
  if (configError) return configError;
  await db.ready;
  const url = new URL(context2.request.url);
  const path = normalizePath(url.pathname);
  const method = context2.request.method;
  try {
    if (method === "GET" && path === "/api/subscribe/schema") return handleSchema2();
    if (method === "GET" && path === "/api/subscribe") return handleList2(context2, db);
    if (method === "GET" && path === "/api/subscribe/filter") return handleFilterGet(db);
    if (method === "POST" && WRITE_PATHS2.has(path)) return dispatchWrite(context2, db, path);
    if (method === "GET" && WRITE_PATHS2.has(path)) return methodNotAllowed(method, "POST");
    if (method === "POST" && READ_PATHS2.has(path)) return methodNotAllowed(method, "GET");
    if (method === "GET" || method === "POST") return notFound(`\u672A\u77E5\u7684\u63A5\u53E3\uFF1A${path}`);
    return methodNotAllowed(method, "GET, POST");
  } catch (error3) {
    return errorResponse(TAG14, method, path, error3);
  }
}
__name(onRequest16, "onRequest");

// _utils/trigger.js
var NO_STORE6 = { "Cache-Control": "no-store" };
var TRIGGER_PREFS_USER = "trigger";
var LOCK_KEY_PREFIX = "trigger.lock.";
var lockPrefKey = /* @__PURE__ */ __name((domain2) => `${LOCK_KEY_PREFIX}${String(domain2 ?? "").toLowerCase().replace(/[^a-z0-9_.]/g, "_")}`, "lockPrefKey");
var TRIGGER_LOCK_STALE_MS = 15 * 60 * 1e3;
async function requireTriggerAuth(env2, db, request, context2) {
  const supplied = extractToken(request) || extractUrlOrHeaderToken(context2);
  if (!supplied) {
    if (!await isAuthEnabled(db))
      return { ok: true, principal: { type: "anonymous-legacy" } };
    return {
      ok: false,
      response: jsonResponse(
        {
          success: false,
          error: "\u7F3A\u5C11\u89E6\u53D1\u4EE4\u724C\uFF1A\u8BF7\u5728 URL \u8FFD\u52A0 ?token=<\u7528\u6237\u5BC6\u94A5>\uFF08\u300C\u7528\u6237\u300D\u9875\u53EF\u751F\u6210 / \u91CD\u7F6E\uFF09\uFF0C\u6216\u8BF7\u6C42\u5934\u643A\u5E26 X-Final-Key"
        },
        { status: 401, headers: NO_STORE6 }
      )
    };
  }
  const principal = await resolvePrincipal(env2, db, request, supplied, context2);
  if (principal?.type === "user") return { ok: true, principal };
  return {
    ok: false,
    response: jsonResponse(
      {
        success: false,
        error: "\u89E6\u53D1\u4EE4\u724C\u65E0\u6548\uFF1A?token= / \u8BF7\u6C42\u5934\u91CC\u7684\u5BC6\u94A5\u4E0D\u5339\u914D\u4EFB\u4F55\u7528\u6237\uFF0C\u8BF7\u5230\u9762\u677F\u300C\u7528\u6237\u300D\u9875\u6838\u5BF9"
      },
      { status: 403, headers: NO_STORE6 }
    )
  };
}
__name(requireTriggerAuth, "requireTriggerAuth");
async function peekLock(db, domain2) {
  const prefs = await listPrefs(db, TRIGGER_PREFS_USER);
  const raw = prefs?.[lockPrefKey(domain2)];
  const startedAt = Date.parse(String(raw ?? ""));
  if (!Number.isFinite(startedAt)) return null;
  if (Date.now() - startedAt >= TRIGGER_LOCK_STALE_MS) return null;
  return startedAt;
}
__name(peekLock, "peekLock");
async function acquireTriggerLock(db, domain2) {
  const runningSince = await peekLock(db, domain2);
  if (runningSince) return { acquired: false, runningSince };
  const startedAt = (/* @__PURE__ */ new Date()).toISOString();
  await savePrefs(db, TRIGGER_PREFS_USER, { [lockPrefKey(domain2)]: startedAt });
  return { acquired: true, startedAt };
}
__name(acquireTriggerLock, "acquireTriggerLock");
async function releaseTriggerLock(db, domain2) {
  await deletePref(db, TRIGGER_PREFS_USER, lockPrefKey(domain2)).catch(() => {
  });
}
__name(releaseTriggerLock, "releaseTriggerLock");
async function guardTrigger(env2, db, request, context2, domain2) {
  const auth = await requireTriggerAuth(env2, db, request, context2);
  if (!auth.ok) return auth;
  const lock = await acquireTriggerLock(db, domain2);
  if (!lock.acquired) {
    return {
      ok: true,
      skipped: true,
      response: jsonResponse(
        {
          success: true,
          data: { skipped: true, reason: "running", since: lock.runningSince }
        },
        { headers: NO_STORE6 }
      )
    };
  }
  return { ok: true, principal: auth.principal, startedAt: lock.startedAt };
}
__name(guardTrigger, "guardTrigger");

// api/trigger.js
var TAG15 = "api/trigger";
var NO_STORE7 = { "Cache-Control": "no-store" };
var TRIGGER_PREFS_USER2 = "trigger";
var GIST_SYNC_DOMAIN = "gist-sync";
var REDUCE_DOMAIN = "reduce-analysis";
async function policyKeySegment(policyKey) {
  const raw = String(policyKey ?? "");
  if (/^[a-z0-9]+$/i.test(raw)) return raw.toLowerCase();
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(raw));
  const hex2 = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0"));
  return `u${hex2.slice(0, 16).join("")}`;
}
__name(policyKeySegment, "policyKeySegment");
var lastRunKey = /* @__PURE__ */ __name(async (policyKey) => normalizeKey(`trigger.last.${await policyKeySegment(policyKey)}`), "lastRunKey");
var gistIdKey = /* @__PURE__ */ __name(async (policyKey) => normalizeKey(`trigger.gistid.${await policyKeySegment(policyKey)}`), "gistIdKey");
function isDue(policy, lastRunIso) {
  const intervalMinutes = Number(policy.syncMinutes ?? 0);
  if (!Number.isFinite(intervalMinutes) || intervalMinutes <= 0) return false;
  const lastRun = Date.parse(String(lastRunIso ?? ""));
  if (!Number.isFinite(lastRun)) return true;
  return Date.now() - lastRun >= intervalMinutes * 60 * 1e3;
}
__name(isDue, "isDue");
function contentToLines(content) {
  return String(content ?? "").split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
}
__name(contentToLines, "contentToLines");
async function handleGistSyncTrigger(context2, db) {
  const guard5 = await guardTrigger(context2.env, db, context2.request, context2, GIST_SYNC_DOMAIN);
  if (!guard5.ok) return guard5.response;
  if (guard5.skipped) return guard5.response;
  const parsed = await readJson(context2);
  const body = parsed.ok ? parsed.value ?? {} : {};
  const gistToken = String(context2.request.headers.get("x-gist-token") ?? "").trim() || String(body.gistToken ?? "").trim();
  const at = (/* @__PURE__ */ new Date()).toISOString();
  const summary = { at, uploaded: [], pulled: [], errors: [] };
  try {
    const policies = await listExportPolicies(db);
    const prefs = await listPrefs(db, TRIGGER_PREFS_USER2);
    const requested = String(body.policyKey ?? "").trim();
    const targets = [];
    for (const policy of policies) {
      if (requested) {
        if (policy.policyKey !== normalizePolicyKey(requested)) continue;
      } else if (!isDue(policy, prefs[await lastRunKey(policy.policyKey)])) {
        continue;
      }
      targets.push(policy);
    }
    for (const policy of targets) {
      const key = policy.policyKey;
      try {
        if (policy.gistUrl) {
          const { content, attempts } = await fetchExternalContent({
            url: policy.gistUrl
          });
          const outcome = await batchOverride(db, contentToLines(content), {
            mode: "merge"
          });
          summary.pulled.push({
            policyKey: key,
            imported: outcome.updated + outcome.created,
            created: outcome.created,
            updated: outcome.updated,
            skipped: outcome.skipped,
            attempts
          });
        }
        if (policy.gistEnabled) {
          if (!gistToken)
            throw new Error(
              "\u7F3A\u5C11 Gist Token\uFF08x-gist-token \u5934\uFF09\uFF1A\u670D\u52A1\u7AEF\u4E0D\u4FDD\u5B58 Token\uFF0C\u8BF7\u7531\u9762\u677F\u6216\u89E6\u53D1\u65B9\u968F\u8BF7\u6C42\u4E2D\u8F6C"
            );
          const content = await buildPolicyExportText(db, key);
          if (!content.trim()) throw new Error("\u5F53\u524D\u7B56\u7565\u6CA1\u6709\u53EF\u4E0A\u4F20\u7684\u89C4\u5219\u884C");
          const gistId = String(prefs[await gistIdKey(key)] ?? "").trim();
          const result = await uploadGistFile({
            gistToken,
            gistId,
            fileName: `surge_export_${key.toLowerCase()}.list`,
            content,
            description: `Surge \u7B56\u7565\u7EC4 \xB7 ${key.toUpperCase()}\uFF08\u7531\u9762\u677F Gist \u5B9A\u65F6\u540C\u6B65\u7EF4\u62A4\uFF09`
          });
          await savePrefs(db, TRIGGER_PREFS_USER2, {
            [await gistIdKey(key)]: result.gistId
          });
          await updateExportPolicy(db, policy.id, { gistUrl: result.rawUrl });
          summary.uploaded.push({
            policyKey: key,
            gistId: result.gistId,
            rawUrl: result.rawUrl,
            created: !gistId,
            attempts: result.attempts
          });
        }
        await savePrefs(db, TRIGGER_PREFS_USER2, {
          [await lastRunKey(key)]: (/* @__PURE__ */ new Date()).toISOString()
        });
      } catch (error3) {
        summary.errors.push({ policyKey: key, error: error3.message });
      }
    }
    return jsonResponse({ success: true, data: summary }, { headers: NO_STORE7 });
  } finally {
    await releaseTriggerLock(db, GIST_SYNC_DOMAIN);
  }
}
__name(handleGistSyncTrigger, "handleGistSyncTrigger");
async function handleReduceAnalysisTrigger(context2, db) {
  const guard5 = await guardTrigger(context2.env, db, context2.request, context2, REDUCE_DOMAIN);
  if (!guard5.ok) return guard5.response;
  if (guard5.skipped) return guard5.response;
  try {
    const config2 = await loadReduceConfig(db);
    if (config2.intervalMinutes <= 0) {
      return jsonResponse(
        { success: true, data: { skipped: true, reason: "disabled" } },
        { headers: NO_STORE7 }
      );
    }
    const lastRun = await loadReduceLastRun(db);
    const dueAtMs = (lastRun ?? 0) + config2.intervalMinutes * 60 * 1e3;
    if (lastRun && Date.now() < dueAtMs) {
      return jsonResponse(
        {
          success: true,
          data: {
            skipped: true,
            reason: "not-due",
            nextRunAt: new Date(dueAtMs).toISOString()
          }
        },
        { headers: NO_STORE7 }
      );
    }
    const result = await runReduceAnalysis(db, config2);
    return jsonResponse(
      { success: true, data: { at: result.at, groups: result.groups.length } },
      { headers: NO_STORE7 }
    );
  } finally {
    await releaseTriggerLock(db, REDUCE_DOMAIN);
  }
}
__name(handleReduceAnalysisTrigger, "handleReduceAnalysisTrigger");
async function handleTriggerRequest(context2, db, path, method) {
  try {
    if (path === "/api/trigger/gist-sync") {
      if (method === "POST") return await handleGistSyncTrigger(context2, db);
      return methodNotAllowed(method, "POST");
    }
    if (path === "/api/trigger/reduce-analysis") {
      if (method === "POST") return await handleReduceAnalysisTrigger(context2, db);
      return methodNotAllowed(method, "POST");
    }
    return notFound(`\u672A\u77E5\u7684\u89E6\u53D1\u63A5\u53E3\uFF1A${path}`);
  } catch (error3) {
    return errorResponse(TAG15, method, path, error3);
  }
}
__name(handleTriggerRequest, "handleTriggerRequest");
async function onRequest17(context2) {
  const { adapter: db, response } = await resolveAdapter(context2.env);
  if (response) return response;
  await db.ready;
  const url = new URL(context2.request.url);
  return handleTriggerRequest(context2, db, url.pathname, context2.request.method);
}
__name(onRequest17, "onRequest");

// _utils/turso-platform.js
var PLATFORM_BASE = "https://api.turso.tech";
var PLATFORM_TIMEOUT_MS = 2e4;
function getTursoPlatformConfig(env2) {
  const token = String(env2?.TURSO_API_TOKEN ?? "").trim();
  if (!token) {
    throw new ConfigError(
      "\u672A\u914D\u7F6E TURSO_API_TOKEN\uFF1A\u8BF7\u5230 Turso \u63A7\u5236\u53F0 \u2192 API Tokens \u751F\u6210\u5E73\u53F0\u4EE4\u724C\uFF0C\u5E76\u52A0\u5230 Pages \u73AF\u5883\u53D8\u91CF\uFF08\u672C\u5730\u5F00\u53D1\u5199 .dev.vars\uFF09"
    );
  }
  return { token, org: String(env2?.TURSO_ORG ?? "").trim() };
}
__name(getTursoPlatformConfig, "getTursoPlatformConfig");
async function tursoApiRequest(env2, method, path, { body, query: query2 } = {}) {
  const { token } = getTursoPlatformConfig(env2);
  const base = String(env2?.TURSO_PLATFORM_BASE ?? "").trim() || PLATFORM_BASE;
  const url = new URL(path.replace(/^\//, ""), `${base}/`);
  for (const [key, value] of Object.entries(query2 ?? {})) {
    if (value !== void 0 && value !== null && value !== "")
      url.searchParams.set(key, String(value));
  }
  let response;
  try {
    response = await fetch(url.toString(), {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        ...body ? { "Content-Type": "application/json" } : {}
      },
      body: body ? JSON.stringify(body) : void 0,
      signal: AbortSignal.timeout(PLATFORM_TIMEOUT_MS)
    });
  } catch (error3) {
    const wrapped = new Error(`Turso \u5E73\u53F0\u8BF7\u6C42\u5931\u8D25\uFF1A${error3?.message ?? error3}`);
    wrapped.status = 502;
    throw wrapped;
  }
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const message = payload?.error ?? payload?.message ?? `HTTP ${response.status}`;
    const wrapped = new Error(`Turso \u5E73\u53F0\u8BF7\u6C42\u5931\u8D25\uFF08${response.status}\uFF09\uFF1A${message}`);
    wrapped.status = response.status;
    throw wrapped;
  }
  return payload;
}
__name(tursoApiRequest, "tursoApiRequest");
var orgCache = { token: "", slug: "", at: 0 };
var ORG_CACHE_TTL_MS = 10 * 60 * 1e3;
async function resolveOrganization(env2) {
  const { token, org } = getTursoPlatformConfig(env2);
  if (org) return org;
  if (orgCache.token === token && orgCache.slug && Date.now() - orgCache.at < ORG_CACHE_TTL_MS) {
    return orgCache.slug;
  }
  const orgs = await tursoApiRequest(env2, "GET", "/v1/organizations");
  const list2 = Array.isArray(orgs) ? orgs : Array.isArray(orgs?.organizations) ? orgs.organizations : [];
  const picked = list2.find((entry) => entry?.type === "personal") ?? list2[0];
  const slug = String(picked?.slug ?? "").trim();
  if (!slug) {
    throw new Error(
      "Turso \u5E73\u53F0\u8FD4\u56DE\u7684\u7EC4\u7EC7\u6E05\u5355\u4E3A\u7A7A\uFF1A\u8BF7\u68C0\u67E5 TURSO_API_TOKEN \u662F\u5426\u5C5E\u4E8E\u6B63\u786E\u8D26\u53F7\uFF0C\u6216\u663E\u5F0F\u914D\u7F6E TURSO_ORG"
    );
  }
  orgCache = { token, slug, at: Date.now() };
  return slug;
}
__name(resolveOrganization, "resolveOrganization");
async function listDatabases(env2) {
  const org = await resolveOrganization(env2);
  const payload = await tursoApiRequest(
    env2,
    "GET",
    `/v1/organizations/${encodeURIComponent(org)}/databases`
  );
  const list2 = Array.isArray(payload?.databases) ? payload.databases : [];
  return list2.map((entry) => ({
    name: String(entry?.Name ?? entry?.name ?? ""),
    hostname: String(entry?.Hostname ?? entry?.hostname ?? ""),
    group: String(entry?.group ?? ""),
    primaryRegion: String(entry?.primaryRegion ?? entry?.primary_region ?? ""),
    regions: Array.isArray(entry?.regions) ? entry.regions : [],
    dbId: String(entry?.DbId ?? entry?.id ?? ""),
    deleteProtection: Boolean(entry?.delete_protection)
  }));
}
__name(listDatabases, "listDatabases");
async function createDatabase(env2, { name, group: group3, sizeLimit }) {
  const org = await resolveOrganization(env2);
  const body = { name, group: group3 };
  if (sizeLimit) body.size_limit = String(sizeLimit);
  const payload = await tursoApiRequest(
    env2,
    "POST",
    `/v1/organizations/${encodeURIComponent(org)}/databases`,
    { body }
  );
  const database = payload?.database ?? payload ?? {};
  return {
    name: String(database?.Name ?? database?.name ?? name),
    hostname: String(database?.Hostname ?? database?.hostname ?? ""),
    group: String(database?.Group ?? database?.group ?? group3),
    dbId: String(database?.DbId ?? database?.id ?? "")
  };
}
__name(createDatabase, "createDatabase");
async function deleteDatabase(env2, name) {
  const org = await resolveOrganization(env2);
  return tursoApiRequest(
    env2,
    "DELETE",
    `/v1/organizations/${encodeURIComponent(org)}/databases/${encodeURIComponent(name)}`
  );
}
__name(deleteDatabase, "deleteDatabase");
async function createDatabaseToken(env2, name, { authorization = "full-access", expiration = "never" } = {}) {
  const org = await resolveOrganization(env2);
  const payload = await tursoApiRequest(
    env2,
    "POST",
    `/v1/organizations/${encodeURIComponent(org)}/databases/${encodeURIComponent(name)}/auth/tokens`,
    { query: { authorization, expiration } }
  );
  const token = String(payload?.jwt ?? payload?.token ?? "").trim();
  if (!token) throw new Error("Turso \u5E73\u53F0\u672A\u8FD4\u56DE\u8BBF\u95EE\u4EE4\u724C");
  return { token, authorization, expiration };
}
__name(createDatabaseToken, "createDatabaseToken");
async function getDatabaseUsage(env2, name, { from = "", to = "" } = {}) {
  const org = await resolveOrganization(env2);
  const payload = await tursoApiRequest(
    env2,
    "GET",
    `/v1/organizations/${encodeURIComponent(org)}/databases/${encodeURIComponent(name)}/usage`,
    { query: { from, to } }
  );
  const database = payload?.database ?? {};
  const total = database?.total ?? {};
  return {
    rowsRead: Number(total.rows_read) || 0,
    rowsWritten: Number(total.rows_written) || 0,
    storageBytes: Number(total.storage_bytes) || 0,
    bytesSynced: Number(total.bytes_synced) || 0,
    instances: Array.isArray(database?.instances) ? database.instances.length : 0
  };
}
__name(getDatabaseUsage, "getDatabaseUsage");
async function listGroups2(env2) {
  const org = await resolveOrganization(env2);
  const payload = await tursoApiRequest(
    env2,
    "GET",
    `/v1/organizations/${encodeURIComponent(org)}/groups`
  );
  const list2 = Array.isArray(payload) ? payload : Array.isArray(payload?.groups) ? payload.groups : [];
  return list2.map((entry) => ({
    name: String(entry?.name ?? ""),
    primary: String(entry?.primary ?? entry?.primaryRegion ?? "")
  }));
}
__name(listGroups2, "listGroups");
async function listLocations(env2) {
  const payload = await tursoApiRequest(env2, "GET", "/v1/locations");
  const locations = payload?.locations ?? {};
  return Object.entries(locations).map(([code, label]) => ({
    code,
    label: String(label ?? code)
  }));
}
__name(listLocations, "listLocations");

// _utils/turso-registry.js
function maskToken2(token) {
  const text = String(token ?? "");
  if (!text) return "";
  if (text.length <= 4) return "\u2022\u2022\u2022\u2022";
  return `\u2022\u2022\u2022\u2022${text.slice(-4)}`;
}
__name(maskToken2, "maskToken");
async function saveTursoDatabase(db, {
  name,
  hostname = "",
  region = "",
  groupName = "",
  token = "",
  authorization = "full-access",
  note = "",
  initialized = 0
}) {
  try {
    await db.batch([
      {
        sql: `INSERT INTO ${TURSO_DATABASES_TABLE}
                (name, hostname, region, group_name, token, token_authorization, note, initialized, created_at, updated_at)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
              ON CONFLICT(name) DO UPDATE SET
                hostname = excluded.hostname,
                region = excluded.region,
                group_name = excluded.group_name,
                token = excluded.token,
                token_authorization = excluded.token_authorization,
                note = excluded.note,
                initialized = excluded.initialized,
                updated_at = excluded.updated_at`,
        params: [
          String(name ?? "").trim(),
          String(hostname ?? ""),
          String(region ?? ""),
          String(groupName ?? ""),
          String(token ?? ""),
          String(authorization ?? "full-access"),
          String(note ?? "").slice(0, 200),
          initialized ? 1 : 0,
          nowIso(),
          nowIso()
        ]
      }
    ]);
  } catch (error3) {
    throw asDbError(error3);
  }
}
__name(saveTursoDatabase, "saveTursoDatabase");
async function listTursoDatabases(db) {
  try {
    const rows = await db.execute(
      `SELECT name, hostname, region, group_name, token, token_authorization, note, initialized, created_at, updated_at
         FROM ${TURSO_DATABASES_TABLE} ORDER BY created_at DESC`
    );
    return rows.map((row) => ({
      name: String(row.name ?? ""),
      hostname: String(row.hostname ?? ""),
      region: String(row.region ?? ""),
      group: String(row.group_name ?? ""),
      tokenMask: maskToken2(row.token),
      hasToken: Boolean(String(row.token ?? "")),
      tokenAuthorization: String(row.token_authorization ?? "full-access"),
      note: String(row.note ?? ""),
      initialized: Number(row.initialized) ? 1 : 0,
      createdAt: String(row.created_at ?? ""),
      updatedAt: String(row.updated_at ?? "")
    }));
  } catch (error3) {
    throw asDbError(error3);
  }
}
__name(listTursoDatabases, "listTursoDatabases");
async function getTursoDatabase(db, name) {
  const target = String(name ?? "").trim();
  if (!target) return null;
  try {
    const rows = await db.execute(
      `SELECT name, hostname, region, group_name, token, token_authorization, note, initialized, created_at, updated_at
         FROM ${TURSO_DATABASES_TABLE} WHERE name = ?`,
      [target]
    );
    const row = rows[0];
    if (!row) return null;
    return {
      name: String(row.name ?? ""),
      hostname: String(row.hostname ?? ""),
      region: String(row.region ?? ""),
      group: String(row.group_name ?? ""),
      token: String(row.token ?? ""),
      tokenAuthorization: String(row.token_authorization ?? "full-access"),
      note: String(row.note ?? ""),
      initialized: Number(row.initialized) ? 1 : 0,
      createdAt: String(row.created_at ?? ""),
      updatedAt: String(row.updated_at ?? "")
    };
  } catch (error3) {
    throw asDbError(error3);
  }
}
__name(getTursoDatabase, "getTursoDatabase");
async function deleteTursoDatabase(db, name) {
  const target = String(name ?? "").trim();
  if (!target) return false;
  try {
    const results = await db.batch([
      { sql: `DELETE FROM ${TURSO_DATABASES_TABLE} WHERE name = ?`, params: [target] }
    ]);
    return results[0].changes > 0;
  } catch (error3) {
    throw asDbError(error3);
  }
}
__name(deleteTursoDatabase, "deleteTursoDatabase");

// api/_turso/panel-platform-usage.js
function hostOf(value) {
  const text = String(value ?? "").trim();
  if (!text) return "";
  try {
    return new URL(text.includes("://") ? text : `https://${text}`).hostname;
  } catch {
    return "";
  }
}
__name(hostOf, "hostOf");
var USAGE_WINDOWS = [
  ["24h", 1],
  ["7d", 7],
  ["30d", 30]
];
var USAGE_CACHE_TTL = 60 * 1e3;
var usageCache2 = { key: "", at: 0, data: null };
async function panelPlatformUsage(db, env2 = {}) {
  let backend = "turso";
  try {
    backend = resolveDbBackend(env2);
  } catch {
  }
  if (backend !== "turso") {
    return { error: `\u5F53\u524D\u540E\u7AEF\u4E3A ${backend}\uFF0C\u5E73\u53F0\u7528\u91CF\u4EC5 Turso \u90E8\u7F72\u53EF\u5F97` };
  }
  if (!String(env2?.TURSO_API_URL ?? "").trim()) {
    return { error: "\u672A\u914D\u7F6E\u9762\u677F\u5E93\u5730\u5740\uFF08TURSO_API_URL\uFF09\uFF0C\u65E0\u5E73\u53F0\u7528\u91CF" };
  }
  if (!String(env2?.TURSO_API_TOKEN ?? "").trim()) {
    return {
      error: "\u672A\u914D\u7F6E\u5E73\u53F0\u4EE4\u724C\uFF08TURSO_API_TOKEN\uFF09\uFF0C\u65E0\u5E73\u53F0\u7528\u91CF\uFF1B\u53EF\u5728 Turso \u63A7\u5236\u53F0\u751F\u6210\u540E\u52A0\u5165\u73AF\u5883\u53D8\u91CF"
    };
  }
  const host = hostOf(env2?.TURSO_API_URL);
  if (!host) return { error: "\u9762\u677F\u5E93\u5730\u5740\uFF08TURSO_API_URL\uFF09\u65E0\u6CD5\u89E3\u6790" };
  const registry = await listTursoDatabases(db);
  let name = (Array.isArray(registry) ? registry : []).find(
    (row) => hostOf(row?.hostname) === host
  )?.name;
  if (!name) {
    const platformList = await listDatabases(env2).catch((error3) => ({
      error: error3?.message || "\u5E73\u53F0\u5217\u5E93\u5931\u8D25"
    }));
    if (!Array.isArray(platformList)) {
      return { error: `\u5E73\u53F0\u5217\u5E93\u5931\u8D25\uFF1A${platformList.error}` };
    }
    name = platformList.find((row) => hostOf(row?.hostname) === host)?.name;
  }
  if (!name) {
    return {
      error: "\u9762\u677F\u5E93\u672A\u5728\u5E73\u53F0\u767B\u8BB0\uFF08\u672C\u5730\u767B\u8BB0\u8868\u4E0E\u5E73\u53F0\u5E93\u5217\u8868\u5747\u65E0\u5339\u914D hostname\uFF09\uFF0C\u65E0\u5E73\u53F0\u7528\u91CF"
    };
  }
  const cacheKey = `${host}:${name}`;
  if (usageCache2.data && usageCache2.key === cacheKey && Date.now() - usageCache2.at < USAGE_CACHE_TTL) {
    return usageCache2.data;
  }
  const [month, ...windowEntries] = await Promise.all([
    getDatabaseUsage(env2, name),
    ...USAGE_WINDOWS.map(
      ([label, days]) => getDatabaseUsage(env2, name, {
        from: new Date(Date.now() - days * 86400 * 1e3).toISOString()
      }).then((usage3) => [label, usage3])
    )
  ]);
  const result = {
    database: name,
    storageBytes: month.storageBytes,
    bytesSynced: month.bytesSynced,
    windows: Object.fromEntries(windowEntries)
  };
  usageCache2 = { key: cacheKey, at: Date.now(), data: result };
  return result;
}
__name(panelPlatformUsage, "panelPlatformUsage");

// api/_turso/panel-usage.js
async function panelUsage(db, env2 = {}) {
  const since = Math.floor(
    Date.UTC((/* @__PURE__ */ new Date()).getUTCFullYear(), (/* @__PURE__ */ new Date()).getUTCMonth(), (/* @__PURE__ */ new Date()).getUTCDate()) / 1e3
  );
  try {
    const [todayRows, todayHits, ai24h, users, devices] = await db.batch([
      { sql: `SELECT COUNT(*) AS v FROM surge_logs WHERE time >= ${since}` },
      { sql: `SELECT COALESCE(SUM(count), 0) AS v FROM surge_logs WHERE time >= ${since}` },
      {
        sql: `SELECT COUNT(*) AS v FROM ${DOMAIN_QUERIES_TABLE} WHERE created_at >= datetime('now', '-1 day')`
      },
      { sql: `SELECT COUNT(*) AS v FROM ${USERS_TABLE}` },
      { sql: `SELECT COUNT(*) AS v FROM ${DEVICES_TABLE}` }
    ]);
    const scalar = /* @__PURE__ */ __name((statement) => Number(statement?.rows?.[0]?.v) || 0, "scalar");
    const platformUsage = await panelPlatformUsage(db, env2).catch((error3) => ({
      error: `\u5E73\u53F0\u7528\u91CF\u8BFB\u53D6\u5931\u8D25\uFF1A${error3?.message ?? "\u672A\u77E5\u9519\u8BEF"}`
    }));
    return jsonResponse(
      {
        success: true,
        data: {
          configured: true,
          rowsReadToday: scalar(todayRows),
          hitsToday: scalar(todayHits),
          aiVerdicts24h: scalar(ai24h),
          users: scalar(users),
          devices: scalar(devices),
          windowHours: 24,
          platformUsage
        }
      },
      { headers: NO_CACHE }
    );
  } catch (error3) {
    const message = error3?.message ?? "\u9762\u677F\u5E93\u7528\u91CF\u8BFB\u53D6\u5931\u8D25";
    return jsonResponse(
      {
        success: true,
        data: { configured: false, platformError: `\u9762\u677F\u5E93\u7528\u91CF\u6682\u4E0D\u53EF\u7528\uFF1A${message}` }
      },
      { headers: NO_CACHE }
    );
  }
}
__name(panelUsage, "panelUsage");

// api/_turso/status-meta.js
var metaCache = { at: 0, groups: [], locations: [] };
var META_CACHE_TTL_MS = 10 * 60 * 1e3;
async function status3(context2, db) {
  const configured = Boolean(String(context2.env?.TURSO_API_TOKEN ?? "").trim());
  if (!configured) {
    return jsonResponse(
      {
        success: true,
        data: {
          configured: false,
          org: "",
          groups: [],
          locations: [],
          platformOk: false,
          platformError: "",
          savedCount: (await listTursoDatabases(db)).length
        }
      },
      { headers: NO_CACHE }
    );
  }
  let org = "";
  let platformError = "";
  try {
    org = await resolveOrganization(context2.env);
  } catch (error3) {
    platformError = error3?.message ?? "\u5E73\u53F0\u8FDE\u63A5\u5931\u8D25";
  }
  const now2 = Date.now();
  if (!metaCache.groups.length || !metaCache.locations.length || now2 - metaCache.at > META_CACHE_TTL_MS) {
    const [groups, locations] = await Promise.all([
      listGroups2(context2.env).catch(() => []),
      listLocations(context2.env).catch(() => [])
    ]);
    metaCache = { at: now2, groups, locations };
  }
  return jsonResponse(
    {
      success: true,
      data: {
        configured: true,
        org,
        platformOk: !platformError,
        platformError,
        groups: metaCache.groups,
        locations: metaCache.locations,
        savedCount: (await listTursoDatabases(db)).length
      }
    },
    { headers: NO_CACHE }
  );
}
__name(status3, "status");

// api/_turso/database-tokens.js
async function readToken(db, name) {
  const row = await getTursoDatabase(db, name);
  if (!row || !row.token) return notFound("\u6CA1\u6709\u5DF2\u4FDD\u5B58\u7684\u8BBF\u95EE\u4EE4\u724C\uFF1A\u8BE5\u6570\u636E\u5E93\u53EF\u80FD\u4E0D\u662F\u5728\u672C\u9762\u677F\u521B\u5EFA\u7684");
  return jsonResponse(
    {
      success: true,
      data: {
        name: row.name,
        hostname: row.hostname,
        token: row.token,
        authorization: row.tokenAuthorization,
        createdAt: row.createdAt
      }
    },
    { headers: NO_CACHE }
  );
}
__name(readToken, "readToken");
async function issueToken(context2, db, name) {
  const { token, authorization } = await createDatabaseToken(context2.env, name);
  const existing = await getTursoDatabase(db, name);
  await saveTursoDatabase(db, {
    name,
    hostname: existing?.hostname ?? `${name}.turso.io`,
    region: existing?.region ?? "",
    groupName: existing?.group ?? "",
    token,
    authorization,
    note: existing?.note ?? "",
    initialized: existing?.initialized ?? 0
  });
  return jsonResponse(
    {
      success: true,
      data: { name, token, authorization, tokenMask: maskToken2(token) }
    },
    { headers: NO_CACHE }
  );
}
__name(issueToken, "issueToken");

// api/_turso/database-create.js
var DB_NAME_PATTERN = /^[a-z0-9][a-z0-9-]{0,63}$/;
async function create(context2, db) {
  const body = await readJson(context2);
  if (!body.ok) return badRequest("\u8BF7\u6C42\u4F53\u4E0D\u662F\u6709\u6548\u7684 JSON");
  const name = String(body.value?.name ?? "").trim().toLowerCase();
  if (!DB_NAME_PATTERN.test(name)) {
    return badRequest(
      "\u6570\u636E\u5E93\u540D\u53EA\u80FD\u5305\u542B\u5C0F\u5199\u5B57\u6BCD\u3001\u6570\u5B57\u4E0E\u8FDE\u5B57\u7B26\uFF0C\u4E14\u4EE5\u5B57\u6BCD\u6216\u6570\u5B57\u5F00\u5934\uFF08\u6700\u957F 64 \u5B57\u7B26\uFF09"
    );
  }
  const region = String(body.value?.region ?? "").trim();
  const groupInput = String(body.value?.group ?? "").trim();
  const sizeLimit = String(body.value?.sizeLimit ?? "").trim();
  const initSchema2 = body.value?.initSchema !== false;
  await repairSchema(db);
  const groups = await listGroups2(context2.env).catch(() => []);
  let group3 = groupInput;
  if (!group3) {
    const matched = region ? groups.find((entry) => entry.primary === region || entry.name === region) : null;
    group3 = matched?.name ?? groups[0]?.name ?? "";
  }
  if (!group3) {
    return badRequest(
      "\u8D26\u53F7\u4E0B\u6CA1\u6709\u53EF\u7528\u5206\u7EC4\uFF1APlatform API \u7684\u5EFA\u5E93\u5FC5\u987B\u843D\u5728\u5206\u7EC4\u91CC\uFF0C\u8BF7\u5148\u5728 Turso \u63A7\u5236\u53F0\u521B\u5EFA\u4E00\u4E2A\u5206\u7EC4\uFF08\u6216\u5347\u7EA7\u8BA1\u5212\u540E\u6309\u4F4D\u7F6E\u81EA\u52A8\u5EFA\u7EC4\uFF09"
    );
  }
  const created = await createDatabase(context2.env, { name, group: group3, sizeLimit });
  const { token, authorization } = await createDatabaseToken(context2.env, name);
  let initialized = 0;
  let initError = "";
  if (initSchema2 && created.hostname && token) {
    const result = await initializeSchema(created.hostname, token);
    initialized = result.ok ? 1 : 0;
    initError = result.error ?? "";
  }
  await saveTursoDatabase(db, {
    name,
    hostname: created.hostname,
    region,
    groupName: group3,
    token,
    authorization,
    note: String(body.value?.note ?? "").trim(),
    initialized
  });
  return jsonResponse(
    {
      success: true,
      data: {
        database: { ...created, group: group3 },
        tokenMask: maskToken2(token),
        initialized: Boolean(initialized),
        initError,
        note: "\u8BBF\u95EE\u4EE4\u724C\u5DF2\u5199\u5165\u6570\u636E\u5E93\u767B\u8BB0\uFF0C\u53EF\u5728\u5217\u8868\u4E2D\u968F\u65F6\u67E5\u770B"
      }
    },
    { headers: NO_CACHE }
  );
}
__name(create, "create");
async function initializeSchema(hostname, token) {
  const config2 = { url: `https://${hostname}`, authToken: token };
  const MAX_ATTEMPTS2 = 3;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS2; attempt += 1) {
    try {
      await executeTursoBatch(
        config2,
        BASE_DDL.map((sql) => ({ sql }))
      );
      return { ok: true };
    } catch (error3) {
      if (attempt === MAX_ATTEMPTS2) {
        console.warn(`[turso] \u521D\u59CB\u5316 ${hostname} \u5931\u8D25\uFF1A${error3?.message}`);
        return { ok: false, error: error3?.message ?? "\u521D\u59CB\u5316\u5931\u8D25" };
      }
      await new Promise((resolve) => setTimeout(resolve, 2e3));
    }
  }
  return { ok: false, error: "\u521D\u59CB\u5316\u5931\u8D25" };
}
__name(initializeSchema, "initializeSchema");

// api/turso.js
var TAG16 = "api/turso";
var NO_STORE8 = NO_CACHE;
async function guard3(context2, db) {
  return guardPrincipal(context2.env, db, context2.request, context2, {
    auth: "admin",
    feature: "turso.manage"
  });
}
__name(guard3, "guard");
async function onRequest18(context2) {
  const url = new URL(context2.request.url);
  const path = url.pathname.replace(/\/+$/, "") || "/api/turso";
  const method = context2.request.method;
  let db;
  try {
    const resolved = await resolveAdapter(context2.env);
    if (resolved.response) return resolved.response;
    db = resolved.adapter;
    await db.ready;
  } catch (error3) {
    return errorResponse(TAG16, method, path, error3);
  }
  try {
    if (method === "GET" && path === "/api/turso/panel-usage") {
      const adminGate = await guardPrincipal(context2.env, db, context2.request, context2, {
        auth: "admin"
      });
      if (!adminGate.ok) return adminGate.response;
      return panelUsage(db, context2.env);
    }
    const gate = await guard3(context2, db);
    if (!gate.ok) return gate.response;
    if (method === "GET" && path === "/api/turso/status") return status3(context2, db);
    if (method === "GET" && path === "/api/turso/databases") return listAll(context2, db);
    if (method === "POST" && path === "/api/turso/databases") return create(context2, db);
    if (method === "GET" || method === "POST" || method === "DELETE") {
      const match2 = path.match(/^\/api\/turso\/databases\/([^/]+)(?:\/(token|usage))?$/);
      if (match2) {
        const name = decodeURIComponent(match2[1]);
        const sub = match2[2] ?? "";
        if (sub === "token") {
          if (method === "GET") return readToken(db, name);
          return issueToken(context2, db, name);
        }
        if (sub === "usage" && method === "GET") return usage2(context2, name, url);
        if (!sub && method === "DELETE") return remove2(context2, db, name);
      }
    }
    if (method === "GET") return notFound(`\u672A\u77E5\u7684\u63A5\u53E3\uFF1A${path}`);
    return methodNotAllowed(method, "GET, POST, DELETE");
  } catch (error3) {
    return errorResponse(TAG16, method, path, error3);
  }
}
__name(onRequest18, "onRequest");
async function listAll(context2, db) {
  const [platform2, saved] = await Promise.all([
    listDatabases(context2.env).catch((error3) => ({ error: error3.message })),
    listTursoDatabases(db)
  ]);
  const savedByName = new Map(saved.map((row) => [row.name, row]));
  let platformList = [];
  let platformError = "";
  if (Array.isArray(platform2)) {
    platformList = platform2;
  } else {
    platformError = platform2?.error ?? "\u5E73\u53F0\u6E05\u5355\u8BFB\u53D6\u5931\u8D25";
  }
  const merged = platformList.map((entry) => {
    const local = savedByName.get(entry.name);
    return {
      ...entry,
      tokenMask: local?.tokenMask ?? "",
      hasSavedToken: Boolean(local?.hasToken),
      tokenAuthorization: local?.tokenAuthorization ?? "",
      note: local?.note ?? "",
      initialized: local?.initialized ?? 0,
      savedAt: local?.createdAt ?? ""
    };
  });
  const orphans = saved.filter((row) => !platformList.some((entry) => entry.name === row.name)).map((row) => ({
    name: row.name,
    hostname: row.hostname,
    group: row.group,
    primaryRegion: row.region,
    regions: [],
    dbId: "",
    deleteProtection: false,
    missing: true,
    tokenMask: row.tokenMask,
    hasSavedToken: row.hasToken,
    tokenAuthorization: row.tokenAuthorization,
    note: row.note,
    initialized: row.initialized,
    savedAt: row.createdAt
  }));
  return jsonResponse(
    {
      success: true,
      data: { databases: [...merged, ...orphans], platformError }
    },
    { headers: NO_STORE8 }
  );
}
__name(listAll, "listAll");
async function usage2(context2, name, url) {
  const params = url.searchParams;
  let from = params.get("from") ?? "";
  let to = params.get("to") ?? "";
  const days = Math.min(365, Math.max(1, Math.floor(Number(params.get("days")) || 0)));
  if (!from && days) {
    from = new Date(Date.now() - days * 86400 * 1e3).toISOString();
  }
  const result = await getDatabaseUsage(context2.env, name, { from, to });
  return jsonResponse(
    {
      success: true,
      data: { name, from: from || null, to: to || null, ...result }
    },
    { headers: NO_STORE8 }
  );
}
__name(usage2, "usage");
async function remove2(context2, db, name) {
  const body = await readJson(context2);
  const confirmed = body.ok && body.value?.confirm === true;
  if (!confirmed) return badRequest('\u9AD8\u5371\u64CD\u4F5C\uFF1A\u9700\u8981\u8BF7\u6C42\u4F53 {"confirm": true} \u624D\u80FD\u5220\u9664\u6570\u636E\u5E93');
  await deleteDatabase(context2.env, name);
  const removed = await deleteTursoDatabase(db, name);
  return jsonResponse(
    {
      success: true,
      data: { database: name, registryRemoved: removed }
    },
    { headers: NO_STORE8 }
  );
}
__name(remove2, "remove");

// api/users.js
async function onRequest19(context2) {
  const { adapter: db, response } = await resolveAdapter(context2.env);
  if (response) return response;
  await db.ready;
  const url = new URL(context2.request.url);
  return handleUsersRequest(
    context2,
    db,
    url.pathname.replace(/\/+$/, "") || "/",
    context2.request.method
  );
}
__name(onRequest19, "onRequest");

// api/config.js
var TAG17 = "api/config";
var ALLOW_METHODS4 = "GET, PUT";
async function guard4(context2, db) {
  return guardPrincipal(context2.env, db, context2.request, context2, { auth: "admin" });
}
__name(guard4, "guard");
async function getConfig2(context2, db) {
  const gate = await guard4(context2, db);
  if (!gate.ok) return gate.response;
  return jsonResponse({ success: true, data: await readPanelConfig(db) }, { headers: NO_CACHE });
}
__name(getConfig2, "getConfig");
async function putConfig(context2, db) {
  const gate = await guard4(context2, db);
  if (!gate.ok) return gate.response;
  const parsed = await readJson(context2);
  if (!parsed.ok) return badRequest("\u8BF7\u6C42\u4F53\u4E0D\u662F\u6709\u6548\u7684 JSON");
  const body = parsed.value ?? {};
  if (body.recordSourceIp !== void 0 && typeof body.recordSourceIp !== "boolean") {
    return badRequest("recordSourceIp \u5FC5\u987B\u662F\u5E03\u5C14\u503C");
  }
  const data = await writePanelConfig(db, { recordSourceIp: body.recordSourceIp });
  return jsonResponse({ success: true, data }, { headers: NO_CACHE });
}
__name(putConfig, "putConfig");
async function onRequest20(context2) {
  const { adapter: db, response } = await resolveAdapter(context2.env);
  if (response) return response;
  await db.ready;
  const url = new URL(context2.request.url);
  const path = url.pathname.replace(/\/+$/, "") || "/";
  const method = context2.request.method;
  try {
    if (path === "/api/config") {
      if (method === "GET") return await getConfig2(context2, db);
      if (method === "PUT") return await putConfig(context2, db);
      return methodNotAllowed(method, ALLOW_METHODS4);
    }
    return badRequest(`\u672A\u77E5\u7684\u63A5\u53E3\uFF1A${path}`);
  } catch (error3) {
    return errorResponse(TAG17, method, path, error3);
  }
}
__name(onRequest20, "onRequest");

// ../.wrangler/tmp/pages-oEel8i/functionsRoutes-0.6620713232279972.mjs
var routes = [
  {
    routePath: "/api/_health/run",
    mountPath: "/api/_health",
    method: "",
    middlewares: [],
    modules: [onRequest]
  },
  {
    routePath: "/api/ai/:rest*",
    mountPath: "/api/ai",
    method: "",
    middlewares: [],
    modules: [onRequest2]
  },
  {
    routePath: "/api/auth/:rest*",
    mountPath: "/api/auth",
    method: "",
    middlewares: [],
    modules: [onRequest3]
  },
  {
    routePath: "/api/devices/:rest*",
    mountPath: "/api/devices",
    method: "",
    middlewares: [],
    modules: [onRequest4]
  },
  {
    routePath: "/api/export-policies/:rest*",
    mountPath: "/api/export-policies",
    method: "",
    middlewares: [],
    modules: [onRequest5]
  },
  {
    routePath: "/api/export/:rest*",
    mountPath: "/api/export",
    method: "",
    middlewares: [],
    modules: [onRequest6]
  },
  {
    routePath: "/api/gist/:rest*",
    mountPath: "/api/gist",
    method: "",
    middlewares: [],
    modules: [onRequest7]
  },
  {
    routePath: "/api/groups/:rest*",
    mountPath: "/api/groups",
    method: "",
    middlewares: [],
    modules: [onRequest8]
  },
  {
    routePath: "/api/health/:rest*",
    mountPath: "/api/health",
    method: "",
    middlewares: [],
    modules: [onRequest]
  },
  {
    routePath: "/api/logger/:rest*",
    mountPath: "/api/logger",
    method: "",
    middlewares: [],
    modules: [onRequest9]
  },
  {
    routePath: "/api/prefs/:rest*",
    mountPath: "/api/prefs",
    method: "",
    middlewares: [],
    modules: [onRequest10]
  },
  {
    routePath: "/api/reduce/:rest*",
    mountPath: "/api/reduce",
    method: "",
    middlewares: [],
    modules: [onRequest11]
  },
  {
    routePath: "/api/rollouts/:rest*",
    mountPath: "/api/rollouts",
    method: "",
    middlewares: [],
    modules: [onRequest12]
  },
  {
    routePath: "/api/rules/:rest*",
    mountPath: "/api/rules",
    method: "",
    middlewares: [],
    modules: [onRequest13]
  },
  {
    routePath: "/api/schema/:rest*",
    mountPath: "/api/schema",
    method: "",
    middlewares: [],
    modules: [onRequest14]
  },
  {
    routePath: "/api/setup/:rest*",
    mountPath: "/api/setup",
    method: "",
    middlewares: [],
    modules: [onRequest15]
  },
  {
    routePath: "/api/subscribe/:rest*",
    mountPath: "/api/subscribe",
    method: "",
    middlewares: [],
    modules: [onRequest16]
  },
  {
    routePath: "/api/trigger/:rest*",
    mountPath: "/api/trigger",
    method: "",
    middlewares: [],
    modules: [onRequest17]
  },
  {
    routePath: "/api/turso/:rest*",
    mountPath: "/api/turso",
    method: "",
    middlewares: [],
    modules: [onRequest18]
  },
  {
    routePath: "/api/users/:rest*",
    mountPath: "/api/users",
    method: "",
    middlewares: [],
    modules: [onRequest19]
  },
  {
    routePath: "/api/ai",
    mountPath: "/api",
    method: "",
    middlewares: [],
    modules: [onRequest2]
  },
  {
    routePath: "/api/auth",
    mountPath: "/api",
    method: "",
    middlewares: [],
    modules: [onRequest3]
  },
  {
    routePath: "/api/config",
    mountPath: "/api",
    method: "",
    middlewares: [],
    modules: [onRequest20]
  },
  {
    routePath: "/api/devices",
    mountPath: "/api",
    method: "",
    middlewares: [],
    modules: [onRequest4]
  },
  {
    routePath: "/api/export",
    mountPath: "/api",
    method: "",
    middlewares: [],
    modules: [onRequest6]
  },
  {
    routePath: "/api/export-policies",
    mountPath: "/api",
    method: "",
    middlewares: [],
    modules: [onRequest5]
  },
  {
    routePath: "/api/gist",
    mountPath: "/api",
    method: "",
    middlewares: [],
    modules: [onRequest7]
  },
  {
    routePath: "/api/groups",
    mountPath: "/api",
    method: "",
    middlewares: [],
    modules: [onRequest8]
  },
  {
    routePath: "/api/health",
    mountPath: "/api",
    method: "",
    middlewares: [],
    modules: [onRequest]
  },
  {
    routePath: "/api/logger",
    mountPath: "/api",
    method: "",
    middlewares: [],
    modules: [onRequest9]
  },
  {
    routePath: "/api/prefs",
    mountPath: "/api",
    method: "",
    middlewares: [],
    modules: [onRequest10]
  },
  {
    routePath: "/api/reduce",
    mountPath: "/api",
    method: "",
    middlewares: [],
    modules: [onRequest11]
  },
  {
    routePath: "/api/rollouts",
    mountPath: "/api",
    method: "",
    middlewares: [],
    modules: [onRequest12]
  },
  {
    routePath: "/api/rules",
    mountPath: "/api",
    method: "",
    middlewares: [],
    modules: [onRequest13]
  },
  {
    routePath: "/api/schema",
    mountPath: "/api",
    method: "",
    middlewares: [],
    modules: [onRequest14]
  },
  {
    routePath: "/api/setup",
    mountPath: "/api",
    method: "",
    middlewares: [],
    modules: [onRequest15]
  },
  {
    routePath: "/api/subscribe",
    mountPath: "/api",
    method: "",
    middlewares: [],
    modules: [onRequest16]
  },
  {
    routePath: "/api/trigger",
    mountPath: "/api",
    method: "",
    middlewares: [],
    modules: [onRequest17]
  },
  {
    routePath: "/api/turso",
    mountPath: "/api",
    method: "",
    middlewares: [],
    modules: [onRequest18]
  },
  {
    routePath: "/api/users",
    mountPath: "/api",
    method: "",
    middlewares: [],
    modules: [onRequest19]
  }
];

// ../node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count3 = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count3--;
          if (count3 === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count3++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count3)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name(function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse, "parse");
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");

// ../node_modules/wrangler/templates/pages-template-worker.ts
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env2, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name(async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context2 = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env: env2,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: /* @__PURE__ */ __name(() => {
            isFailOpen = true;
          }, "passThroughOnException")
        };
        const response = await handler(context2);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env2["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error3) {
      if (isFailOpen) {
        const response = await env2["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error3;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");
export {
  pages_template_worker_default as default
};
