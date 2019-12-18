# Cookies

## session.getAllCookies()

Returns all cookies associated with the address of the current browsing context’s active
document.

**RETURNS**

<code>Promise\<[Cookie](#cookie)[]\></code>

**EXAMPLES**

```typescript
const cookies = await session.getAllCookies();
// cookies = [
//   {
//     name: 'cookie name',
//     value: 'cookie value',
//     path: '/',
//     domain: 'localhost',
//     secure: false,
//     httpOnly: true
//   }
// ]
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#get-all-cookies)

## session.getNamedCookie(propertyName)

Returns cookie based on the cookie name

**PARAMETERS**

- <code>propertyName: string</code>

**RETURNS**

<code>Promise\<[Cookie](#cookie)\></code>

**EXAMPLES**

```typescript
const cookie = await session.getNamedCookie('cookieName');
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#get-named-cookie)

## session.addCookie(cookie)

Adds a single cookie to the cookie store associated with the active document’s address.

**PARAMETERS**

- <code>cookie: [Cookie](#cookie)</code>

**RETURNS**

<code>Promise\<void\></code>

**EXAMPLES**

```typescript
await session.addCookie({ name: 'test cookie', value: 'test value' });
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#add-cookie)

## session.deleteCookie(propertyName)

Delete a cookie based on its name

**PARAMETERS**

- <code>propertyName: string</code>

**RETURNS**

<code>Promise\<void\></code>

**EXAMPLES**

```typescript
await session.deleteCookie('cookieName');
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#delete-cookie)

## session.deleteAllCookies()

Delete all cookies associated with the address of the current browsing context’s active
document.

**RETURNS**

<code>Promise\<void\></code>

**EXAMPLES**

```typescript
await session.deleteAllCookies();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#delete-all-cookies)

## Cookie

An object defining the cookie.

**PROPERTIES**

- <code>name: string</code>
- <code>value: string</code>
- <code>path?: string</code>
- <code>domain?: string</code>
- <code>secure?: boolean</code>
- <code>httpOnly?: boolean</code>
- <code>expiry?: number</code>
