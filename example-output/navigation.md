# Navigation

## session.navigateTo(targetUrl)

Navigate to a new URL.

**PARAMETERS**

- <code>targetUrl: string</code>

**RETURNS**

<code>Promise\<void\></code>

**EXAMPLES**

```typescript
await session.navigateTo('http://localhost:8080');
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#navigate-to)

## session.getCurrentUrl()

Get current page URL

**RETURNS**

<code>Promise\<string\></code>

**EXAMPLES**

```typescript
const currentUrl = await session.getCurrentUrl();
// currentUrl = 'http://localhost:8080'
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#get-current-url)

## session.back()

Navigate to previous url from history

**RETURNS**

<code>Promise\<void\></code>

**EXAMPLES**

```typescript
await session.back();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#back)

## session.forward()

Navigate forward to next url from history

**RETURNS**

<code>Promise\<void\></code>

**EXAMPLES**

```typescript
await session.forward();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#forward)

## session.refresh()

Refresh the current page

**RETURNS**

<code>Promise\<void\></code>

**EXAMPLES**

```typescript
await session.refresh();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#refresh)

## session.getTitle()

Get the current page title.

**RETURNS**

<code>Promise\<string\></code>

**EXAMPLES**

```typescript
const title = await session.getTitle();
// title = 'web page title'
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#get-title)
