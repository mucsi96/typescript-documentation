# README

## newSession\(options\)

## typescript-documentation

Before we can send any command to the browser we drive we need to create a [WebDriver](https://www.w3.org/TR/webdriver) session. This should be always the first step of interaction through the protocol. After executing this command the browser will be started and ready to receive the commands. As part of session creation we have to provide the url of WebDriver protocol compliant server. This can be a locally running browser driver server \([Chromedriver](http://chromedriver.chromium.org), [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver), etc.\), [Selenium Server or Grid](https://www.seleniumhq.org) or cloud provider url \([BrowserStack](https://www.browserstack.com), [Sauce Labs](https://saucelabs.com), .etc.\). Also we can set the browser and operating system parameters we want to interact with.

[![npm version](https://badge.fury.io/js/%40mucsi96%2Ftypescript-documentation.svg)](https://www.npmjs.com/package/@mucsi96/typescript-documentation) [![Build Status](https://github.com/mucsi96/typescript-documentation/workflows/Build/badge.svg)](https://github.com/mucsi96/typescript-documentation/actions?query=workflow%3ABuild+branch%3Amaster) [![Coverage Status](https://coveralls.io/repos/github/mucsi96/typescript-documentation/badge.svg?branch=master)](https://coveralls.io/github/mucsi96/typescript-documentation?branch=master) [![npm](https://img.shields.io/npm/dw/@mucsi96/typescript-documentation)](https://www.npmjs.com/package/@mucsi96/typescript-documentation) [![github](https://img.shields.io/badge/PRs-welcome-blue.svg)](https://github.com/mucsi96/typescript-documentation)

**PARAMETERS**

Generate markdown API documentation directly from TypeScript source code.

* `options: object`
  * `url: string`
  * `capabilities:` [`Capabilities`](capabilities.md#capabilities)
  * `desiredCapabilities?: object`
    * `browserstack.use_w3c: boolean`
  * `headers: Headers | string[] | object`

## :construction: Work in progress...

**RETURNS**

## Documenting variables

`Promise\<`[`Session`]()`>`

_Example input:_

**EXAMPLES**

```typescript
/**
 * Simple variable description
 * line 2
 * @see {@link https://test.url.1|Example url 1}
 * @see {@link https://test.url.2|Example url 2}
 * @example
 * example 1 line 1
 * example 1 line 2
 * @example
 * example 2 line 1
 * example 2 line 2
 */
export const simpleVariable: number = 1;
```

```typescript
import { newSession } from 'w3c-webdriver';

let session;

(async () => {
  try {
    session = await newSession({
      url: 'http://localhost:4444',
      capabilities: {
        alwaysMatch: {
          browserName: 'Chrome'
        }
      }
    });
  } catch (err) {
    console.log(err.stack);
  } finally {
    session.close();
  }
})();
```

_Example output:_

```typescript
const credentials = Buffer.from(
  ['myusername', 'Password123'].join(':')
).toString('base64');
const session = await newSession({
  headers: {
    Authorization: `Basic ${credentials}`
  }
});
```

### simpleVariable

**SEE ALSO**

Simple variable description line 2

* [WebDriver spec](https://www.w3.org/TR/webdriver/#new-session)

**TYPE**

## status\(url\)

`number`

To be able to verify if the WebDriver server is ready for new session creation sometimes it can be useful to query it's status. This function queries the WebDriver server's current status. The status contains meta information about the WebDriver server and operating system.

**EXAMPLES**

**PARAMETERS**

```typescript
example 1 line 1
example 1 line 2
```

* `url: string`

```typescript
example 2 line 1
example 2 line 2
```

**RETURNS**

**SEE ALSO**

`Promise\<`[`Status`](sessions.md#status)`>`

* [Example url 1](https://test.url.1)
* [Example url 2](https://test.url.2)

**EXAMPLES**

## Documenting functions

```typescript
import { status } from 'w3c-webdriver';

const status = await status('http://localhost:4444');
// status = {
//   build: { version: '1.2.0' },
//   os: { name: 'mac', version: 'unknown', arch: '64bit' }
// }
```

_Example input:_

**SEE ALSO**

```typescript
/**
 * Simple function description
 * line 2
 * @see {@link https://test.url.1|Example url 1}
 * @see {@link https://test.url.2|Example url 2}
 * @example
 * example 1 line 1
 * example 1 line 2
 * @example
 * example 2 line 1
 * example 2 line 2
 */
export function simpleFunction(a: string, b?: number): string {
  return a;
}
```

* [WebDriver spec](https://www.w3.org/TR/webdriver/#status)

_Example output:_

## Element

### simpleFunction\(a, b\)

This object represents a WebDriver element.

Simple function description line 2

**SEE ALSO**

**PARAMETERS**

* [Elements](elements.md)
* [Screen capture](screen-capture.md)
* `a: string`
* `b?: number`

## Session

**RETURNS**

This object represents a WebDriver session.

`string`

**SEE ALSO**

**EXAMPLES**

* [Actions](actions.md)
* [Contexts](contexts.md)
* [Cookies](cookies.md)
* [Document](document.md)
* [Elements](elements.md)
* [Navigation](navigation.md)
* [Screen capture](screen-capture.md)
* [Sessions](sessions.md)
* [Timeouts](timeouts.md)
* [User prompts](user-prompts.md)

```typescript
example 1 line 1
example 1 line 2
```

```typescript
example 2 line 1
example 2 line 2
```

**SEE ALSO**

* [Example url 1](https://test.url.1)
* [Example url 2](https://test.url.2)

## Documenting classes

_Example input:_

```typescript
/**
 * Simple class description
 * line 2
 * @see {@link https://test.url.1|Example url 1}
 * @see {@link https://test.url.2|Example url 2}
 * @example
 * example 1 line 1
 * example 1 line 2
 * @example
 * example 2 line 1
 * example 2 line 2
 */
export class SimpleClass {
  /**
   * simpleMethod1 description
   * line 2
   * @see {@link https://test.url.3|Example url 3}
   * @see {@link https://test.url.4|Example url 4}
   * @example
   * example 3 line 1
   * example 3 line 2
   * @example
   * example 4 line 1
   * example 4 line 2
   */
  public simpleMethod1(): void {
    return;
  }

  /**
   * simpleMethod2 description
   * line 2
   */
  public simpleMethod2(a: string, b: number): string {
    return a + b;
  }
}
```

_Example output:_

### SimpleClass

Simple class description line 2

**EXAMPLES**

```typescript
example 1 line 1
example 1 line 2
```

```typescript
example 2 line 1
example 2 line 2
```

**SEE ALSO**

* [Example url 1](https://test.url.1)
* [Example url 2](https://test.url.2)

### simpleClass.simpleMethod1\(\)

simpleMethod1 description line 2

**RETURNS**

`void`

**EXAMPLES**

```typescript
example 3 line 1
example 3 line 2
```

```typescript
example 4 line 1
example 4 line 2
```

**SEE ALSO**

* [Example url 3](https://test.url.3)
* [Example url 4](https://test.url.4)

### simpleClass.simpleMethod2\(a, b\)

simpleMethod2 description line 2

**PARAMETERS**

* `a: string`
* `b: number`

**RETURNS**

`string`

## Documenting types

_Example input:_

```typescript
/**
 * Simple type description
 * line 2
 * @see {@link https://test.url.1|Example url 1}
 * @see {@link https://test.url.2|Example url 2}
 * @example
 * example 1 line 1
 * example 1 line 2
 * @example
 * example 2 line 1
 * example 2 line 2
 */
export type SimpleType = {
  a: string;
  b?: number;
};
```

_Example output:_

### SimpleType

Simple type description line 2

**PROPERTIES**

* `a: string`
* `b?: number`

**EXAMPLES**

```typescript
example 1 line 1
example 1 line 2
```

```typescript
example 2 line 1
example 2 line 2
```

**SEE ALSO**

* [Example url 1](https://test.url.1)
* [Example url 2](https://test.url.2)

## Documenting enumerations

_Example input:_

```typescript
/**
 * Simple enumeration description
 * line 2
 * @see {@link https://test.url.1|Example url 1}
 * @see {@link https://test.url.2|Example url 2}
 * @example
 * example 1 line 1
 * example 1 line 2
 * @example
 * example 2 line 1
 * example 2 line 2
 */
export enum SimpleEnum {
  ONE,
  TWO
}
```

_Example output:_

### SimpleEnum

Simple enumeration description line 2

**POSSIBLE VALUES**

* `ONE`
* `TWO`

**EXAMPLES**

```typescript
example 1 line 1
example 1 line 2
```

```typescript
example 2 line 1
example 2 line 2
```

**SEE ALSO**

* [Example url 1](https://test.url.1)
* [Example url 2](https://test.url.2)

