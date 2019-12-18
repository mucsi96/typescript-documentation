# Contexts

## session.getWindowHandle()

Get handle of current window

**RETURNS**

<code>Promise\<string\></code>

**EXAMPLES**

```typescript
const handle = await session.getWindowHandle();
// handle = 'CDwindow-7321145136535301DE771CCBD9555CEA'
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#get-window-handle)

## session.closeWindow()

Close the current window.

**RETURNS**

<code>Promise\<void\></code>

**EXAMPLES**

```typescript
await session.closeWindow();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#close-window)

## session.switchToWindow(handle)

Change focus to another window. The window to change focus to may be specified by it's server assigned window handle.

**PARAMETERS**

- <code>handle: string</code>

**RETURNS**

<code>Promise\<void\></code>

**EXAMPLES**

```typescript
await session.switchToWindow('CDwindow-7321145136535301DE771CCBD9555CEA');
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#switch-to-window)

## session.getWindowHandles()

Get all window handles

**RETURNS**

<code>Promise\<string[]\></code>

**EXAMPLES**

```typescript
const handles = await session.getWindowHandles();
// handles = ['CDwindow-7321145136535301DE771CCBD9555CEA']
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#get-window-handles)

## session.switchToFrame(target)

Change focus to another frame on the page

**PARAMETERS**

- <code>target: null | number | [Element](index.md#element)</code>

**RETURNS**

<code>Promise\<void\></code>

**EXAMPLES**

```typescript
const iframe = await session.findElement('css selector', 'iframe');
await session.switchToFrame(iframe);
```

```typescript
await session.switchToFrame(null);
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#switch-to-frame)

## session.switchToParentFrame()

Change focus to parent frame on the page

**RETURNS**

<code>Promise\<void\></code>

**EXAMPLES**

```typescript
await session.switchToParentFrame();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#switch-to-frame)

## session.getWindowRect()

Get the size and position on the screen of the operating system window

**RETURNS**

<code>Promise\<[WindowRect](#windowrect)\></code>

**EXAMPLES**

```typescript
await session.getWindowRect();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#get-window-rect)

## session.setWindowRect(windowRect)

Set the size and position on the screen of the operating system window

**PARAMETERS**

- <code>windowRect: [WindowRect](#windowrect)</code>

**RETURNS**

<code>Promise\<void\></code>

**EXAMPLES**

```typescript
await session.setWindowRect();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#set-window-rect)

## session.maximizeWindow()

Maximizes the current window

**RETURNS**

<code>Promise\<void\></code>

**EXAMPLES**

```typescript
await session.maximizeWindow();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#maximize-window)

## session.minimizeWindow()

Minimizes the current window

**RETURNS**

<code>Promise\<void\></code>

**EXAMPLES**

```typescript
await session.minimizeWindow();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#minimize-window)

## session.fullScreenWindow()

This command increases Current window to Full-Screen

**RETURNS**

<code>Promise\<void\></code>

**EXAMPLES**

```typescript
await session.fullScreenWindow();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#fullscreen-window)

## WindowRect

An object defining the Window Rect.

**PROPERTIES**

- <code>x: number</code>
- <code>y: number</code>
- <code>width: number</code>
- <code>height: number</code>
