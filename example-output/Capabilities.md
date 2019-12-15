## ChromeOptions

**PROPERTIES**

- <code>w3c?: boolean</code>
- <code>binary?: string</code>
- <code>args?: string[]</code>

## FirefoxOptions

**PROPERTIES**

- <code>log?: object</code>
  - <code>level?: string</code>
- <code>args?: string[]</code>

## InternetExplorerOptions

**PROPERTIES**

- <code>ignoreProtectedModeSettings: boolean</code>
- <code>ignoreZoomSetting: boolean</code>
- <code>ie.ensureCleanSession: boolean</code>

## BrowserStackOptions

**PROPERTIES**

- <code>os?: string</code>
- <code>osVersion?: string</code>
- <code>sessionName?: string</code>
- <code>buildName?: string</code>
- <code>projectName?: string</code>
- <code>debug?: boolean</code>
- <code>networkLogs?: boolean</code>
- <code>local?: boolean</code>
- <code>safari?: object</code>
  - <code>enablePopups?: boolean</code>
  - <code>allowAllCookies?: boolean</code>

## BrowserCapability

**PROPERTIES**

- <code>browserName: string</code>
- <code>goog:chromeOptions?: [ChromeOptions](#chromeoptions)</code>
- <code>moz:firefoxOptions?: [FirefoxOptions](#firefoxoptions)</code>
- <code>se:ieOptions?: [InternetExplorerOptions](#internetexploreroptions)</code>
- <code>bstack:options?: [BrowserStackOptions](#browserstackoptions)</code>

## Capabilities

**PROPERTIES**

- <code>alwaysMatch?: [BrowserCapability](#browsercapability)</code>
- <code>firstMatch?: [BrowserCapability](#browsercapability)[]</code>
