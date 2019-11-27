# typescript-documentation

Generate markdown documentation for TypeScript projects

# Variables

Example input:

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

Example output:

## [simpleVariable](#simple-variable)

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

# Functions

Example input:

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
export function simpleFunction(a: string, b: number): string {
  return a + b;
}
```

Example output:

## [simpleFunction(a, b)](#simple-function)

Simple function description
line 2

**PARAMETERS**

- `a: string`
- `b: number`

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

# Classes

Example input:

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

Example output:

## [SimpleClass](#simple-class)

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

## [simpleClass.simpleMethod1()](#simple-class-simple-method1)

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

## [simpleClass.simpleMethod2(a, b)](#simple-class-simple-method2)

simpleMethod2 description
line 2

**PARAMETERS**

- `a: string`
- `b: number`

**RETURNS**

`string`

# Types

Example input:

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
  b: number;
};
```

Example output:

## [SimpleType](#simple-type)

Simple type description
line 2

**PROPERTIES**

- `a: string`
- `b: number`

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

# Enumerations

Example input:

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
export enum simpleEnum {
  ONE,
  TWO
}
```

Example output:

## [simpleEnum](#simple-enum)

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
