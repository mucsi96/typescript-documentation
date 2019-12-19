# Capabilities

## ChromeOptions

**PROPERTIES**

* `w3c?: boolean`
* `binary?: string`
* `args?: string[]`

## FirefoxOptions

**PROPERTIES**

* `log?: object`
  * `level?: string`
* `args?: string[]`

## InternetExplorerOptions

**PROPERTIES**

* `ignoreProtectedModeSettings: boolean`
* `ignoreZoomSetting: boolean`
* `ie.ensureCleanSession: boolean`

## BrowserStackOptions

**PROPERTIES**

* `os?: string`
* `osVersion?: string`
* `sessionName?: string`
* `buildName?: string`
* `projectName?: string`
* `debug?: boolean`
* `networkLogs?: boolean`
* `local?: boolean`
* `safari?: object`
  * `enablePopups?: boolean`
  * `allowAllCookies?: boolean`

## BrowserCapability

**PROPERTIES**

* `browserName: string`
* `goog:chromeOptions?:` [`ChromeOptions`](capabilities.md#chromeoptions)
* `moz:firefoxOptions?:` [`FirefoxOptions`](capabilities.md#firefoxoptions)
* `se:ieOptions?:` [`InternetExplorerOptions`](capabilities.md#internetexploreroptions)
* `bstack:options?:` [`BrowserStackOptions`](capabilities.md#browserstackoptions)

## Capabilities

**PROPERTIES**

* `alwaysMatch?:` [`BrowserCapability`](capabilities.md#browsercapability)
* `firstMatch?:` [`BrowserCapability`](capabilities.md#browsercapability)`[]`

