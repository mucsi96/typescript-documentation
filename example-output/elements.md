# Elements

## element.findElement(strategy, selector)

Search for an element on the page, starting from the referenced web element.

**PARAMETERS**

- <code>strategy: [LocatorStrategy](#locatorstrategy)</code>
- <code>selector: string</code>

**RETURNS**

<code>Promise\<[Element](index.md#element)\></code>

**EXAMPLES**

```typescript
const parent = await session.findElement('css selector', '#parent');
const child = await child.findElement('css selector', '#child');
// child = <webdriver element>
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#find-element-from-element)

## element.findElements(strategy, selector)

Search for multiple elements on the page, starting from the referenced web element. The located
elements will be returned as a WebElement JSON objects. The table below lists the locator
strategies that each server should support. Elements should be returned in the order located
in the DOM.

**PARAMETERS**

- <code>strategy: [LocatorStrategy](#locatorstrategy)</code>
- <code>selector: string</code>

**RETURNS**

<code>Promise\<[Element](index.md#element)[]\></code>

**EXAMPLES**

```typescript
const parent = await session.findElement('css selector', '#parent');
const children = await child.findElements('css selector', '#child');
// elements = [<webdriver element>]
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#find-elements)

## element.isSelected()

Determines if the referenced element is selected or not.
This operation only makes sense on input elements of the Checkbox- and Radio Button states, or on option elements.

**RETURNS**

<code>Promise\<boolean\></code>

**EXAMPLES**

```typescript
const checkbox = await session.findElement('css selector', '#checkbox');
const selected = await checkbox.isSelected();
// selected = true
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#is-element-selected)

## element.getAttribute(propertyName)

Returns the attribute of the referenced web element.

**PARAMETERS**

- <code>propertyName: string</code>

**RETURNS**

<code>Promise\<string\></code>

**EXAMPLES**

```typescript
const button = await session.findElement('css selector', '#red-button');
const backgroundColor = await button.getAttribute('css');
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#get-element-attribute)

## element.getProperty(propertyName)

Returns the property of the referenced web element.

**PARAMETERS**

- <code>propertyName: string</code>

**RETURNS**

<code>Promise\<string\></code>

**EXAMPLES**

```typescript
const button = await session.findElement('css selector', '#red-button');
const backgroundColor = await button.getProperty('class');
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#get-element-attribute)

## element.getCssValue(propertyName)

Returns the computed value of the given CSS property for the element.

**PARAMETERS**

- <code>propertyName: string</code>

**RETURNS**

<code>Promise\<string\></code>

**EXAMPLES**

```typescript
const button = await session.findElement('css selector', '#red-button');
const backgroundColor = await button.getCssValue('background-color');
// backgroundColor = 'rgba(255, 0, 0, 1)'
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#get-element-css-value)

## element.getText()

Returns the visible text for the element.

**RETURNS**

<code>Promise\<string\></code>

**EXAMPLES**

```typescript
const result = await session.findElement('css selector', '#result');
const text = await result.getText();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#get-element-text)

## element.getTagName()

Returns the tagName of a Element

**RETURNS**

<code>Promise\<string\></code>

**EXAMPLES**

```typescript
const button = await session.findElement('css selector', '#red-button');
const backgroundColor = await button.getTagName();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#get-element-tag-name)

## element.getRect()

Returns the dimensions and coordinates of the referenced element

**RETURNS**

<code>Promise\<[ElementRect](#elementrect)\></code>

**EXAMPLES**

```typescript
const button = await session.findElement('css selector', '#red-button');
const rect = await button.getRect();
// rect = { x: 10, y: 100, width: 300, height: 50 }
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#get-element-rect)

## element.isEnabled()

Determines if the referenced element is enabled or not.

**RETURNS**

<code>Promise\<boolean\></code>

**EXAMPLES**

```typescript
const inputField = await session.findElement('css selector', '#disabled');
const isElementEnabled = await inputField.isEnabled();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#is-element-enabled)

## element.click()

Click on an element.

**RETURNS**

<code>Promise\<void\></code>

**EXAMPLES**

```typescript
const submitButton = await session.findElement(
  'css selector',
  'button[type="submit"]'
);
await submitButton.click();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#element-click)

## element.clear()

Clear content of an element.

**RETURNS**

<code>Promise\<void\></code>

**EXAMPLES**

```typescript
const fieldA = await session.findElement('css selector', '#a');
await submitButton.clear();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#element-clear)

## element.sendKeys(text)

Send a sequence of key strokes to an element.

**PARAMETERS**

- <code>text: string</code>

**RETURNS**

<code>Promise\<void\></code>

**EXAMPLES**

```typescript
const input = await session.findElement('css selector', '[name="first-name"]');
await input.sendKeys('Hello World');
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#element-send-keys)

## session.findElement(strategy, selector)

Search for an element on the page, starting from the document root.

**PARAMETERS**

- <code>strategy: [LocatorStrategy](#locatorstrategy)</code>
- <code>selector: string</code>

**RETURNS**

<code>Promise\<[Element](index.md#element)\></code>

**EXAMPLES**

```typescript
const element = await session.findElement('css selector', 'h2');
// element = <webdriver element>
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#find-element)

## session.findElements(strategy, selector)

Search for multiple elements on the page, starting from the document root. The located
elements will be returned as a WebElement JSON objects. The table below lists the locator
strategies that each server should support. Elements should be returned in the order located
in the DOM.

**PARAMETERS**

- <code>strategy: [LocatorStrategy](#locatorstrategy)</code>
- <code>selector: string</code>

**RETURNS**

<code>Promise\<[Element](index.md#element)[]\></code>

**EXAMPLES**

```typescript
const elements = await session.findElements('css selector', 'h2');
// elements = [<webdriver element>]
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#find-elements)

## session.getActiveElement()

Get the element on the page that currently has focus.

**RETURNS**

<code>Promise\<[Element](index.md#element)\></code>

**EXAMPLES**

```typescript
const element = await session.getActiveElement();
// element = <webdriver element>
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#get-active-element)

## ElementRect

An object defining the Element Rect.

**PROPERTIES**

- <code>x: number</code>
- <code>y: number</code>
- <code>width: number</code>
- <code>height: number</code>

## LocatorStrategy

Strategy for searching element on the page

**POSSIBLE VALUES**

- <code>'css selector'</code>
- <code>'link text'</code>
- <code>'partial link text'</code>
- <code>'tag name'</code>
- <code>'xpath'</code>
