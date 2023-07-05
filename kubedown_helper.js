// ==UserScript==
// @name         百度网盘-KubeDown-自动下载文件夹中的文件
// @namespace    http://tampermonkey.net/
// @version      0.2.18
// @description  帮助你自动下载百度网盘中一个文件夹里的所有文件，省去一个个点(Kubedown版)
// @author       You
// @grant        GM_xmlhttpRequest
// @match        *://pan.baidu.com/*
// @match        *://yun.baidu.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=baidu.com
// @grant        none
// @license      MIT
// ==/UserScript==
// aria2c.js
(function () { function r(e, n, t) { function o(i, f) { if (!n[i]) { if (!e[i]) { var c = "function" == typeof require && require; if (!f && c) return c(i, !0); if (u) return u(i, !0); var a = new Error("Cannot find module '" + i + "'"); throw a.code = "MODULE_NOT_FOUND", a } var p = n[i] = { exports: {} }; e[i][0].call(p.exports, function (r) { var n = e[i][1][r]; return o(n || r) }, p, p.exports, r, e, n, t) } return n[i].exports } for (var u = "function" == typeof require && require, i = 0; i < t.length; i++)o(t[i]); return o } return r })()({
  1: [function (require, module, exports) {

  }, {}], 2: [function (require, module, exports) {
    // Copyright Joyent, Inc. and other Node contributors.
    //
    // Permission is hereby granted, free of charge, to any person obtaining a
    // copy of this software and associated documentation files (the
    // "Software"), to deal in the Software without restriction, including
    // without limitation the rights to use, copy, modify, merge, publish,
    // distribute, sublicense, and/or sell copies of the Software, and to permit
    // persons to whom the Software is furnished to do so, subject to the
    // following conditions:
    //
    // The above copyright notice and this permission notice shall be included
    // in all copies or substantial portions of the Software.
    //
    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
    // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
    // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
    // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
    // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
    // USE OR OTHER DEALINGS IN THE SOFTWARE.

    'use strict';

    var R = typeof Reflect === 'object' ? Reflect : null
    var ReflectApply = R && typeof R.apply === 'function'
      ? R.apply
      : function ReflectApply(target, receiver, args) {
        return Function.prototype.apply.call(target, receiver, args);
      }

    var ReflectOwnKeys
    if (R && typeof R.ownKeys === 'function') {
      ReflectOwnKeys = R.ownKeys
    } else if (Object.getOwnPropertySymbols) {
      ReflectOwnKeys = function ReflectOwnKeys(target) {
        return Object.getOwnPropertyNames(target)
          .concat(Object.getOwnPropertySymbols(target));
      };
    } else {
      ReflectOwnKeys = function ReflectOwnKeys(target) {
        return Object.getOwnPropertyNames(target);
      };
    }

    function ProcessEmitWarning(warning) {
      if (console && console.warn) console.warn(warning);
    }

    var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
      return value !== value;
    }

    function EventEmitter() {
      EventEmitter.init.call(this);
    }
    module.exports = EventEmitter;
    module.exports.once = once;

    // Backwards-compat with node 0.10.x
    EventEmitter.EventEmitter = EventEmitter;

    EventEmitter.prototype._events = undefined;
    EventEmitter.prototype._eventsCount = 0;
    EventEmitter.prototype._maxListeners = undefined;

    // By default EventEmitters will print a warning if more than 10 listeners are
    // added to it. This is a useful default which helps finding memory leaks.
    var defaultMaxListeners = 10;

    function checkListener(listener) {
      if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
    }

    Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
      enumerable: true,
      get: function () {
        return defaultMaxListeners;
      },
      set: function (arg) {
        if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
          throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
        }
        defaultMaxListeners = arg;
      }
    });

    EventEmitter.init = function () {

      if (this._events === undefined ||
        this._events === Object.getPrototypeOf(this)._events) {
        this._events = Object.create(null);
        this._eventsCount = 0;
      }

      this._maxListeners = this._maxListeners || undefined;
    };

    // Obviously not all Emitters should be limited to 10. This function allows
    // that to be increased. Set to zero for unlimited.
    EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
      if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
        throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
      }
      this._maxListeners = n;
      return this;
    };

    function _getMaxListeners(that) {
      if (that._maxListeners === undefined)
        return EventEmitter.defaultMaxListeners;
      return that._maxListeners;
    }

    EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
      return _getMaxListeners(this);
    };

    EventEmitter.prototype.emit = function emit(type) {
      var args = [];
      for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
      var doError = (type === 'error');

      var events = this._events;
      if (events !== undefined)
        doError = (doError && events.error === undefined);
      else if (!doError)
        return false;

      // If there is no 'error' event listener then throw.
      if (doError) {
        var er;
        if (args.length > 0)
          er = args[0];
        if (er instanceof Error) {
          // Note: The comments on the `throw` lines are intentional, they show
          // up in Node's output if this results in an unhandled exception.
          throw er; // Unhandled 'error' event
        }
        // At least give some kind of context to the user
        var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
        err.context = er;
        throw err; // Unhandled 'error' event
      }

      var handler = events[type];

      if (handler === undefined)
        return false;

      if (typeof handler === 'function') {
        ReflectApply(handler, this, args);
      } else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
          ReflectApply(listeners[i], this, args);
      }

      return true;
    };

    function _addListener(target, type, listener, prepend) {
      var m;
      var events;
      var existing;

      checkListener(listener);

      events = target._events;
      if (events === undefined) {
        events = target._events = Object.create(null);
        target._eventsCount = 0;
      } else {
        // To avoid recursion in the case that type === "newListener"! Before
        // adding it to the listeners, first emit "newListener".
        if (events.newListener !== undefined) {
          target.emit('newListener', type,
            listener.listener ? listener.listener : listener);

          // Re-assign `events` because a newListener handler could have caused the
          // this._events to be assigned to a new object
          events = target._events;
        }
        existing = events[type];
      }

      if (existing === undefined) {
        // Optimize the case of one listener. Don't need the extra array object.
        existing = events[type] = listener;
        ++target._eventsCount;
      } else {
        if (typeof existing === 'function') {
          // Adding the second element, need to change to array.
          existing = events[type] =
            prepend ? [listener, existing] : [existing, listener];
          // If we've already got an array, just append.
        } else if (prepend) {
          existing.unshift(listener);
        } else {
          existing.push(listener);
        }

        // Check for listener leak
        m = _getMaxListeners(target);
        if (m > 0 && existing.length > m && !existing.warned) {
          existing.warned = true;
          // No error code for this since it is a Warning
          // eslint-disable-next-line no-restricted-syntax
          var w = new Error('Possible EventEmitter memory leak detected. ' +
            existing.length + ' ' + String(type) + ' listeners ' +
            'added. Use emitter.setMaxListeners() to ' +
            'increase limit');
          w.name = 'MaxListenersExceededWarning';
          w.emitter = target;
          w.type = type;
          w.count = existing.length;
          ProcessEmitWarning(w);
        }
      }

      return target;
    }

    EventEmitter.prototype.addListener = function addListener(type, listener) {
      return _addListener(this, type, listener, false);
    };

    EventEmitter.prototype.on = EventEmitter.prototype.addListener;

    EventEmitter.prototype.prependListener =
      function prependListener(type, listener) {
        return _addListener(this, type, listener, true);
      };

    function onceWrapper() {
      if (!this.fired) {
        this.target.removeListener(this.type, this.wrapFn);
        this.fired = true;
        if (arguments.length === 0)
          return this.listener.call(this.target);
        return this.listener.apply(this.target, arguments);
      }
    }

    function _onceWrap(target, type, listener) {
      var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
      var wrapped = onceWrapper.bind(state);
      wrapped.listener = listener;
      state.wrapFn = wrapped;
      return wrapped;
    }

    EventEmitter.prototype.once = function once(type, listener) {
      checkListener(listener);
      this.on(type, _onceWrap(this, type, listener));
      return this;
    };

    EventEmitter.prototype.prependOnceListener =
      function prependOnceListener(type, listener) {
        checkListener(listener);
        this.prependListener(type, _onceWrap(this, type, listener));
        return this;
      };

    // Emits a 'removeListener' event if and only if the listener was removed.
    EventEmitter.prototype.removeListener =
      function removeListener(type, listener) {
        var list, events, position, i, originalListener;

        checkListener(listener);

        events = this._events;
        if (events === undefined)
          return this;

        list = events[type];
        if (list === undefined)
          return this;

        if (list === listener || list.listener === listener) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else {
            delete events[type];
            if (events.removeListener)
              this.emit('removeListener', type, list.listener || listener);
          }
        } else if (typeof list !== 'function') {
          position = -1;

          for (i = list.length - 1; i >= 0; i--) {
            if (list[i] === listener || list[i].listener === listener) {
              originalListener = list[i].listener;
              position = i;
              break;
            }
          }

          if (position < 0)
            return this;

          if (position === 0)
            list.shift();
          else {
            spliceOne(list, position);
          }

          if (list.length === 1)
            events[type] = list[0];

          if (events.removeListener !== undefined)
            this.emit('removeListener', type, originalListener || listener);
        }

        return this;
      };

    EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

    EventEmitter.prototype.removeAllListeners =
      function removeAllListeners(type) {
        var listeners, events, i;

        events = this._events;
        if (events === undefined)
          return this;

        // not listening for removeListener, no need to emit
        if (events.removeListener === undefined) {
          if (arguments.length === 0) {
            this._events = Object.create(null);
            this._eventsCount = 0;
          } else if (events[type] !== undefined) {
            if (--this._eventsCount === 0)
              this._events = Object.create(null);
            else
              delete events[type];
          }
          return this;
        }

        // emit removeListener for all listeners on all events
        if (arguments.length === 0) {
          var keys = Object.keys(events);
          var key;
          for (i = 0; i < keys.length; ++i) {
            key = keys[i];
            if (key === 'removeListener') continue;
            this.removeAllListeners(key);
          }
          this.removeAllListeners('removeListener');
          this._events = Object.create(null);
          this._eventsCount = 0;
          return this;
        }

        listeners = events[type];

        if (typeof listeners === 'function') {
          this.removeListener(type, listeners);
        } else if (listeners !== undefined) {
          // LIFO order
          for (i = listeners.length - 1; i >= 0; i--) {
            this.removeListener(type, listeners[i]);
          }
        }

        return this;
      };

    function _listeners(target, type, unwrap) {
      var events = target._events;

      if (events === undefined)
        return [];

      var evlistener = events[type];
      if (evlistener === undefined)
        return [];

      if (typeof evlistener === 'function')
        return unwrap ? [evlistener.listener || evlistener] : [evlistener];

      return unwrap ?
        unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
    }

    EventEmitter.prototype.listeners = function listeners(type) {
      return _listeners(this, type, true);
    };

    EventEmitter.prototype.rawListeners = function rawListeners(type) {
      return _listeners(this, type, false);
    };

    EventEmitter.listenerCount = function (emitter, type) {
      if (typeof emitter.listenerCount === 'function') {
        return emitter.listenerCount(type);
      } else {
        return listenerCount.call(emitter, type);
      }
    };

    EventEmitter.prototype.listenerCount = listenerCount;
    function listenerCount(type) {
      var events = this._events;

      if (events !== undefined) {
        var evlistener = events[type];

        if (typeof evlistener === 'function') {
          return 1;
        } else if (evlistener !== undefined) {
          return evlistener.length;
        }
      }

      return 0;
    }

    EventEmitter.prototype.eventNames = function eventNames() {
      return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
    };

    function arrayClone(arr, n) {
      var copy = new Array(n);
      for (var i = 0; i < n; ++i)
        copy[i] = arr[i];
      return copy;
    }

    function spliceOne(list, index) {
      for (; index + 1 < list.length; index++)
        list[index] = list[index + 1];
      list.pop();
    }

    function unwrapListeners(arr) {
      var ret = new Array(arr.length);
      for (var i = 0; i < ret.length; ++i) {
        ret[i] = arr[i].listener || arr[i];
      }
      return ret;
    }

    function once(emitter, name) {
      return new Promise(function (resolve, reject) {
        function errorListener(err) {
          emitter.removeListener(name, resolver);
          reject(err);
        }

        function resolver() {
          if (typeof emitter.removeListener === 'function') {
            emitter.removeListener('error', errorListener);
          }
          resolve([].slice.call(arguments));
        };

        eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
        if (name !== 'error') {
          addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
        }
      });
    }

    function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
      if (typeof emitter.on === 'function') {
        eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
      }
    }

    function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
      if (typeof emitter.on === 'function') {
        if (flags.once) {
          emitter.once(name, listener);
        } else {
          emitter.on(name, listener);
        }
      } else if (typeof emitter.addEventListener === 'function') {
        // EventTarget does not have `error` event semantics like Node
        // EventEmitters, we do not listen for `error` events here.
        emitter.addEventListener(name, function wrapListener(arg) {
          // IE does not have builtin `{ once: true }` support so we
          // have to do it manually.
          if (flags.once) {
            emitter.removeEventListener(name, wrapListener);
          }
          listener(arg);
        });
      } else {
        throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
      }
    }

  }, {}], 3: [function (require, module, exports) {
    const Aria2 = require("aria2");

    window.aria2 = {
      connect: async function (host = '127.0.0.1', port = 16800) {
        const aria2 = new Aria2({ host: host, port: port });
        await aria2.open()
        return aria2
      }
    }
  }, { "aria2": 4 }], 4: [function (require, module, exports) {
    "use strict";

    const Aria2 = require("./lib/Aria2");

    module.exports = Aria2;

  }, { "./lib/Aria2": 5 }], 5: [function (require, module, exports) {
    "use strict";

    const JSONRPCClient = require("./JSONRPCClient");

    function prefix(str) {
      if (!str.startsWith("system.") && !str.startsWith("aria2.")) {
        str = "aria2." + str;
      }
      return str;
    }

    function unprefix(str) {
      const suffix = str.split("aria2.")[1];
      return suffix || str;
    }

    class Aria2 extends JSONRPCClient {
      addSecret(parameters) {
        let params = this.secret ? ["token:" + this.secret] : [];
        if (Array.isArray(parameters)) {
          params = params.concat(parameters);
        }
        return params;
      }

      _onnotification(notification) {
        const { method, params } = notification;
        const event = unprefix(method);
        if (event !== method) this.emit(event, params);
        return super._onnotification(notification);
      }

      async call(method, ...params) {
        return super.call(prefix(method), this.addSecret(params));
      }

      async multicall(calls) {
        const multi = [
          calls.map(([method, ...params]) => {
            return { methodName: prefix(method), params: this.addSecret(params) };
          }),
        ];
        return super.call("system.multicall", multi);
      }

      async batch(calls) {
        return super.batch(
          calls.map(([method, ...params]) => [
            prefix(method),
            this.addSecret(params),
          ])
        );
      }

      async listNotifications() {
        const events = await this.call("system.listNotifications");
        return events.map((event) => unprefix(event));
      }

      async listMethods() {
        const methods = await this.call("system.listMethods");
        return methods.map((method) => unprefix(method));
      }
    }

    Object.assign(Aria2, { prefix, unprefix });

    Aria2.defaultOptions = Object.assign({}, JSONRPCClient.defaultOptions, {
      secure: false,
      host: "localhost",
      port: 6800,
      secret: "",
      path: "/jsonrpc",
    });

    module.exports = Aria2;

  }, { "./JSONRPCClient": 7 }], 6: [function (require, module, exports) {
    "use strict";

    module.exports = function Deferred() {
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    };

  }, {}], 7: [function (require, module, exports) {
    (function (global) {
      (function () {
        "use strict";

        const Deferred = require("./Deferred");
        const promiseEvent = require("./promiseEvent");
        const JSONRPCError = require("./JSONRPCError");

        const _WebSocket = require("ws");
        const _fetch = require("node-fetch");
        const EventEmitter = require("events");

        const WebSocket = global.WebSocket || _WebSocket;
        const fetch = global.fetch ? global.fetch.bind(global) : _fetch;

        class JSONRPCClient extends EventEmitter {
          constructor(options) {
            super();
            this.deferreds = Object.create(null);
            this.lastId = 0;

            Object.assign(this, this.constructor.defaultOptions, options);
          }

          id() {
            return this.lastId++;
          }

          url(protocol) {
            return (
              protocol +
              (this.secure ? "s" : "") +
              "://" +
              this.host +
              ":" +
              this.port +
              this.path
            );
          }

          websocket(message) {
            return new Promise((resolve, reject) => {
              const cb = (err) => {
                if (err) reject(err);
                else resolve();
              };
              this.socket.send(JSON.stringify(message), cb);
              if (global.WebSocket && this.socket instanceof global.WebSocket) cb();
            });
          }

          async http(message) {
            const response = await this.fetch(this.url("http"), {
              method: "POST",
              body: JSON.stringify(message),
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            });

            response
              .json()
              .then((msg) => this._onmessage(msg))
              .catch((err) => {
                this.emit("error", err);
              });

            return response;
          }

          _buildMessage(method, params) {
            if (typeof method !== "string") {
              throw new TypeError(method + " is not a string");
            }

            const message = {
              method,
              "json-rpc": "2.0",
              id: this.id(),
            };

            if (params) Object.assign(message, { params });
            return message;
          }

          async batch(calls) {
            const promises = [];

            const message = calls.map(([method, params]) => {
              return this._buildMessage(method, params);
            });

            await this._send(message);

            return message.map(({ id }) => {
              const { promise } = (this.deferreds[id] = new Deferred());
              return promise;
            });
          }

          async call(method, parameters) {
            const message = this._buildMessage(method, parameters);
            await this._send(message);

            const { promise } = (this.deferreds[message.id] = new Deferred());

            return promise;
          }

          async _send(message) {
            this.emit("output", message);

            const { socket } = this;
            return socket && socket.readyState === 1
              ? this.websocket(message)
              : this.http(message);
          }

          _onresponse({ id, error, result }) {
            const deferred = this.deferreds[id];
            if (!deferred) return;
            if (error) deferred.reject(new JSONRPCError(error));
            else deferred.resolve(result);
            delete this.deferreds[id];
          }

          _onrequest({ method, params }) {
            return this.onrequest(method, params);
          }

          _onnotification({ method, params }) {
            this.emit(method, params);
          }

          _onmessage(message) {
            this.emit("input", message);

            if (Array.isArray(message)) {
              for (const object of message) {
                this._onobject(object);
              }
            } else {
              this._onobject(message);
            }
          }

          _onobject(message) {
            if (message.method === undefined) this._onresponse(message);
            else if (message.id === undefined) this._onnotification(message);
            else this._onrequest(message);
          }

          async open() {
            const socket = (this.socket = new this.WebSocket(this.url("ws")));

            socket.onclose = (...args) => {
              this.emit("close", ...args);
            };
            socket.onmessage = (event) => {
              let message;
              try {
                message = JSON.parse(event.data);
              } catch (err) {
                this.emit("error", err);
                return;
              }
              this._onmessage(message);
            };
            socket.onopen = (...args) => {
              this.emit("open", ...args);
            };
            socket.onerror = (...args) => {
              this.emit("error", ...args);
            };

            return promiseEvent(this, "open");
          }

          async close() {
            const { socket } = this;
            socket.close();
            return promiseEvent(this, "close");
          }
        }

        JSONRPCClient.defaultOptions = {
          secure: false,
          host: "localhost",
          port: 80,
          secret: "",
          path: "/jsonrpc",
          fetch,
          WebSocket,
        };

        module.exports = JSONRPCClient;

      }).call(this)
    }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
  }, { "./Deferred": 6, "./JSONRPCError": 8, "./promiseEvent": 9, "events": 2, "node-fetch": 1, "ws": 1 }], 8: [function (require, module, exports) {
    "use strict";

    module.exports = class JSONRPCError extends Error {
      constructor({ message, code, data }) {
        super(message);
        this.code = code;
        if (data) this.data = data;
        this.name = this.constructor.name;
      }
    };

  }, {}], 9: [function (require, module, exports) {
    "use strict";

    module.exports = function promiseEvent(target, event) {
      return new Promise((resolve, reject) => {
        function cleanup() {
          target.removeListener(event, onEvent);
          target.removeListener("error", onError);
        }
        function onEvent(data) {
          resolve(data);
          cleanup();
        }
        function onError(err) {
          reject(err);
          cleanup();
        }
        target.addListener(event, onEvent);
        target.addListener("error", onError);
      });
    };

  }, {}]
}, {}, [3]);




// aria2c.js

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

function is_valid_file_row(row) {
  return row.querySelector("input") != null
}

function get_download_list() {
  const file_list = document.querySelectorAll("tr")
  let result = []
  for (let v of file_list) {
    if (is_valid_file_row(v))
      result.push(v)
  }
  for (let i = 0; i < result.length; i++) {
    const row = result[i]
    if (row.querySelector("input").checked == true) return result.slice(i)
  }
  alert("请先选择文件然后开始下载")
  return null
}

function set_checked(target, state) {
  let checked_box = target.querySelector("input")
  if (checked_box.checked != state) checked_box.click()
}

function get_file_name_from_link(link) {
  const params = link.split('&')
  for (let param of params) {
    const param_key_value = param.split("=")
    if (param_key_value[0] == 'fin') return param_key_value[1]
  }
}

const helper_address = 'http://127.0.0.1:8000/'

function check_helper() {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', helper_address + "docs")
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          resolve()
          return
        }
        reject({ status: xhr.status, response: xhr.response })
      }
    }
    xhr.send()
  })
}

function resolve_captcha(captcha_base64) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open('POST', helper_address + "captcha")
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          resolve(JSON.parse(xhr.responseText)["result"])
          return
        }
        alert("无法连接到captcha_resolver,请检查captcha_resolver.exe是否启动")
        reject({ status: xhr.status, response: xhr.response })
      }
    }
    xhr.send(JSON.stringify({ "img": captcha_base64 }))
  })
}

async function get_link_address() {
  let count = 0
  for (; ;) {
    if (count++ >= 30) throw "timeout"
    await sleep(1000)
    const link_input = document.getElementById('swal-input1')
    if (link_input) break
    const captcha_container = document.getElementById('swal2-html-container')
    if (!captcha_container) continue
    const captcha = captcha_container.children[0]
    if (!captcha) continue
    let captcha_base64 = captcha.getAttribute('src')
    if (!captcha_base64) continue
    captcha_base64 = captcha_base64.replace('data:image/png;base64,', '')
    const captcha_input = captcha_container.nextElementSibling
    captcha_input.value = await resolve_captcha(captcha_base64)
    const confirm_button = document.querySelectorAll('.swal2-confirm')[0]
    confirm_button.click()
    break
  }
  count = 0
  for (; ;) {
    if (count++ >= 30) throw "timeout"
    await sleep(1000)
    const link_input = document.getElementById('swal-input1')
    if (!link_input) continue
    const link = link_input.value
    if (!link) continue
    return link
  }
}


const Notification = (function () {
  let element = null

  function init_element() {
    element = document.createElement('div');
    element.style.width = '300px';
    element.style.minHeight = '70px';
    element.style.position = 'fixed';
    element.style.zIndex = 99999
    element.style.top = '0';
    element.style.left = '50%';
    element.style.transform = 'translateX(-50%)';
    element.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    element.style.color = '#fff';
    element.style.textAlign = 'center';
    element.style.lineHeight = '50px';
    element.textContent = '正在获取链接，如果太久请刷新页面重试';
    element.style.display = "none"
    element.style.fontSize = '16px'
    document.body.appendChild(element);
    element.onclick = function () {
      element.style.display = "none"
    }
  }

  return {
    get_element: function () {
      if (element == null) init_element()
      return element
    },

    hide: function () {
      this.get_element().style.display = 'none'
    },

    show: function (msg) {
      this.get_element().style.display = 'block'
      this.get_element().textContent = msg
    }
  }
})()

const Aria2 = (function () {
  let instance = null

  return {
    async get() {
      if (instance == null) {
        instance = await window.aria2.connect()
      }
      return instance
    }
  }
})()

function wait_download_complete(aria2) {
  return new Promise((resolve, reject) => {
    aria2.on('onDownloadComplete', resolve)
    aria2.on('onDownloadError', reject)
  })
}

function check_service() {
  const ele = document.getElementById('KubeDown')
  if (!ele) {
    Notification.show("每日脚本更新，刚安装KubeDown都可能导致此情况，请刷新页面，确保蓝色的KubeDown按钮存在")
    alert("无法找到KubeDown,请刷新页面重试")
    return false
  }
  return true
}

async function download_list(file_list) {
  let aria2 = null
  try {
    aria2 = await Aria2.get()
  } catch (e) {
    console.log(e)
    Notification.show("请启动aria2")
    alert("无法连接到aria2，请检查motrix是否打开")
    return false
  }
  if (!check_service()) return false
  for (let file of file_list) {
    set_checked(file, true)
    await sleep(1000)
    for (; ;) {
      try {
        Notification.show("正在获取链接,超时30s自动重试")
        document.getElementById('KubeDown').click()
        const address = await get_link_address()
        const file_name = get_file_name_from_link(address)
        Notification.show("成功发送到Motirx，正在下载中")
        aria2.call("addUri", [address], { "user-agent": "netdisk", 'out': decodeURI(file_name) });
        await wait_download_complete(aria2)
        Notification.show("下载完成")
        break
      } catch (e) {
        console.error(e)
        Notification.show("发生错误，重试中...")
        console.log("重试...")
        await sleep(1000)
        continue
      }
    }
    set_checked(file, false)
    await sleep(1000)
  }
  return true
}

async function batch_download_current_page() {
  Notification.show("开始解析")
  const file_list = get_download_list()
  if (!file_list) {
    Notification.show("获取文件列表失败")
    return
  }
  if (await download_list(file_list)) Notification.show("所有任务下载完成,点击此处关闭窗口")
}

async function create_button() {
  const class_name = 'wp-s-agile-tool-bar__header';
  for (; ;) {
    await sleep(1000)
    const elements = document.getElementsByClassName(class_name);
    if (elements.length > 0) {
      const button_bar_node = elements[0]
      const button = document.createElement("button");
      button.style.marginLeft = "10px"
      button.style.backgroundColor = "#06a7ff"
      button.style.color = "white"
      button.style.borderRadius = "5px";
      button.style.paddingLeft = "5px";
      button.style.paddingRight = "5px";
      const buttonText = document.createTextNode("开始下载(KubeDown)");
      button.appendChild(buttonText);
      button.addEventListener("click", function () {
        batch_download_current_page()
      });
      button_bar_node.appendChild(button)
      return
    }
  }
}

(function () {
  'use strict';
  void (create_button())
})();
