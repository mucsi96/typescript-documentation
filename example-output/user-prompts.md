# User prompts

## session.dismissAlert()

Dismiss the alert in current page

**RETURNS**

<code>Promise\<void\></code>

**EXAMPLES**

```typescript
await session.dismissAlert();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#dismiss-alert)

## session.acceptAlert()

Accept the alert in current page

**RETURNS**

<code>Promise\<void\></code>

**EXAMPLES**

```typescript
await session.acceptAlert();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#accept-alert)

## session.getAlertText()

Returns the text from an alert

**RETURNS**

<code>Promise\<string\></code>

**EXAMPLES**

```typescript
const alertText = await session.getAlertText();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#get-alert-text)

## session.sendAlertText(propertyName)

Sets the text field of a prompt to the given value.

**PARAMETERS**

- <code>propertyName: string</code>

**RETURNS**

<code>Promise\<void\></code>

**EXAMPLES**

```typescript
await session.sendAlertText('Test');
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#send-alert-text)