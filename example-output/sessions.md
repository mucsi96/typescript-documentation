# Sessions

## session.close()

Close the session.

**RETURNS**

<code>Promise\<void\></code>

**EXAMPLES**

```typescript
import { newSession } from 'w3c-webdriver';

let session;

(async () => {
  try {
    session = await newSession('http://localhost:4444', {
      desiredCapabilities: {
        browserName: 'Chrome'
      }
    });
  } catch (err) {
    console.log(err.stack);
  } finally {
    session.close();
  }
})();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#delete-session)

## StatusOfOS

**PROPERTIES**

- <code>name: string</code>
- <code>version: string</code>
- <code>arch: string</code>

## StatusOfWebDriver

**PROPERTIES**

- <code>version: string</code>

## Status

WebDriver status object

**PROPERTIES**

- <code>message: string</code>
- <code>ready: boolean</code>
- <code>os: [StatusOfOS](#statusofos)</code>
- <code>build: [StatusOfWebDriver](#statusofwebdriver)</code>
