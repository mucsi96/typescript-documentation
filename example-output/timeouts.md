# Timeouts

## session.getTimeout()

Gets timeout durations associated with the current session.

**RETURNS**

Promise<[Timeout](#timeout)>

**EXAMPLES**

```typescript
const timeout = await session.getTimeout();
// timeout = {
//   script: 30000,
//   pageLoad: 60000,
//   implicit: 40000
// }
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#get-timeouts)

## session.setTimeout(timeout)

Configure the amount of time that a particular type of operation can execute for before
they are aborted and a |Timeout| error is returned to the client.

**PARAMETERS**

- `timeout`: [Timeout](#timeout)

**RETURNS**

`Promise<void>`

**EXAMPLES**

```typescript
await session.setTimeout({
  script: 30000,
  pageLoad: 60000,
  implicit: 40000
});
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#set-timeouts)

## Timeout

WebDriver Timeout configuration object

**PROPERTIES**

- `script`?: `number`
- `pageLoad`?: `number`
- `implicit`?: `number`
