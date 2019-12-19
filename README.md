# typescript-documentation

[![npm version](https://badge.fury.io/js/%40mucsi96%2Ftypescript-documentation.svg)](https://www.npmjs.com/package/@mucsi96/typescript-documentation)
[![Build Status](https://github.com/mucsi96/typescript-documentation/workflows/Build/badge.svg)](https://github.com/mucsi96/typescript-documentation/actions?query=workflow%3ABuild+branch%3Amaster)
[![Coverage Status](https://coveralls.io/repos/github/mucsi96/typescript-documentation/badge.svg?branch=master)](https://coveralls.io/github/mucsi96/typescript-documentation?branch=master)
[![npm](https://img.shields.io/npm/dw/@mucsi96/typescript-documentation)](https://www.npmjs.com/package/@mucsi96/typescript-documentation)
[![github](https://img.shields.io/badge/PRs-welcome-blue.svg)](https://github.com/mucsi96/typescript-documentation)

Generate markdown API documentation directly from TypeScript source code.

# :construction: Work in progress...

# Documenting variables

_Example input:_

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

_Example output:_

## simpleVariable

Simple variable description
line 2

**TYPE**

`number`

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

- [Example url 1](https://test.url.1)
- [Example url 2](https://test.url.2)

# Documenting functions

_Example input:_

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

_Example output:_

## simpleFunction(a, b)

Simple function description
line 2

**PARAMETERS**

- `a: string`
- `b?: number`

**RETURNS**

`string`

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

- [Example url 1](https://test.url.1)
- [Example url 2](https://test.url.2)

# Documenting classes

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

## SimpleClass

Simple class description
line 2

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

- [Example url 1](https://test.url.1)
- [Example url 2](https://test.url.2)

## simpleClass.simpleMethod1()

simpleMethod1 description
line 2

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

- [Example url 3](https://test.url.3)
- [Example url 4](https://test.url.4)

## simpleClass.simpleMethod2(a, b)

simpleMethod2 description
line 2

**PARAMETERS**

- `a: string`
- `b: number`

**RETURNS**

`string`

# Documenting types

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

## SimpleType

Simple type description
line 2

**PROPERTIES**

- `a: string`
- `b?: number`

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

- [Example url 1](https://test.url.1)
- [Example url 2](https://test.url.2)

# Documenting enumerations

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

## SimpleEnum

Simple enumeration description
line 2

**POSSIBLE VALUES**

- `ONE`
- `TWO`

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

- [Example url 1](https://test.url.1)
- [Example url 2](https://test.url.2)
