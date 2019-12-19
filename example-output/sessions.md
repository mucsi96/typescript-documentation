# Sessions

## session.close()

Close the session.

**RETURNS**

Promise<void>

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

- name: string
- version: string
- arch: string

## StatusOfWebDriver

**PROPERTIES**

- version: string

## Status

WebDriver status object

**PROPERTIES**

- message: string
- ready: boolean
- os: [StatusOfOS](#statusofos)
- build: [StatusOfWebDriver](#statusofwebdriver)
