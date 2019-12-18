# Actions

## session.performActions(actionSequences)

Sends virtualised device input to the web browser like keyboard or pointer events in a series of actions.

**PARAMETERS**

- <code>actionSequences: [ActionSequence](#actionsequence)[]</code>

**RETURNS**

<code>Promise\<void\></code>

**EXAMPLES**

```typescript
await session.performActions([
  {
    type: 'none',
    id: 'none_id',
    actions: [{ type: 'pause', duration: 0 }]
  },
  {
    type: 'pointer',
    id: 'click on b field',
    actions: [
      { type: 'pause', duration: 0 },
      { type: 'pointerMove', x: 118, y: 121 },
      { type: 'pointerDown', button: 0 },
      { type: 'pointerUp', button: 0 }
    ]
  }
]);
```

```typescript
await session.performActions([
  {
    type: 'key',
    id: 'type in 15',
    actions: [
      { type: 'pause', duration: 100 },
      { type: 'keyDown', value: '1' },
      { type: 'keyUp', value: '1' },
      { type: 'keyDown', value: '5' },
      { type: 'keyUp', value: '5' }
    ]
  }
]);
```

```typescript
await session.performActions([
  {
    type: 'pointer',
    id: 'click on add button',
    actions: [
      {
        type: 'pointerMove',
        x: 1,
        y: 1,
        origin: await session.findElement('css selector', '#add')
      },
      { type: 'pointerDown', button: 0 },
      { type: 'pointerUp', button: 0 }
    ],
    parameters: {
      pointerType: 'mouse'
    }
  }
]);
```

```typescript
await session.performActions([
  {
    type: 'key',
    id: 'key id',
    actions: [
      { type: 'keyDown', value: 'a' },
      { type: 'keyUp', value: 'a' },
      { type: 'keyDown', value: 'b' },
      { type: 'keyUp', value: 'b' },
      { type: 'keyDown', value: Key.LEFT },
      { type: 'keyUp', value: Key.LEFT },
      { type: 'keyDown', value: Key.DELETE },
      { type: 'keyUp', value: Key.DELETE }
    ]
  }
]);
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#perform-actions)

## session.releaseActions()

Release all the keys and pointer buttons that are currently depressed

**RETURNS**

<code>Promise\<void\></code>

**EXAMPLES**

```typescript
await session.performActions([
  {
    type: 'key',
    id: 'key id',
    actions: [{ type: 'keyDown', value: 'a' }]
  }
]);
await session.releaseActions();
// Now 'a' key was pressed
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#release-actions)

## PauseAction

**PROPERTIES**

- <code>type: 'pause'</code>
- <code>duration: number</code>

## KeyDownAction

**PROPERTIES**

- <code>type: 'keyDown'</code>
- <code>value: string</code>

## KeyUpAction

**PROPERTIES**

- <code>type: 'keyUp'</code>
- <code>value: string</code>

## PointerMoveAction

**PROPERTIES**

- <code>type: 'pointerMove'</code>
- <code>x: number</code>
- <code>y: number</code>
- <code>duration?: number</code>
- <code>origin: [Element](index.md#element) | 'viewport' | 'pointer'</code>

## PointerUpAction

**PROPERTIES**

- <code>type: 'pointerUp'</code>
- <code>button: number</code>

## PointerDownAction

**PROPERTIES**

- <code>type: 'pointerDown'</code>
- <code>button: number</code>

## NullAction

**PROPERTIES**

- <code>type: 'pause'</code>
- <code>duration: number</code>

## KeyAction

**POSSIBLE VALUES**

- <code>[PauseAction](#pauseaction)</code>
- <code>[KeyDownAction](#keydownaction)</code>
- <code>[KeyUpAction](#keyupaction)</code>

## PointerAction

**POSSIBLE VALUES**

- <code>[PauseAction](#pauseaction)</code>
- <code>[PointerMoveAction](#pointermoveaction)</code>
- <code>[PointerUpAction](#pointerupaction)</code>
- <code>[PointerDownAction](#pointerdownaction)</code>

## NullActionSequence

**PROPERTIES**

- <code>type: 'none'</code>
- <code>id: string</code>
- <code>actions: [PauseAction](#pauseaction)[]</code>

## KeyActionSequence

**PROPERTIES**

- <code>type: 'key'</code>
- <code>id: string</code>
- <code>actions: [KeyAction](#keyaction)[]</code>

## PointerParameters

**PROPERTIES**

- <code>pointerType: 'mouse' | 'pen' | 'touch'</code>

## PointerActionSequence

**PROPERTIES**

- <code>type: 'pointer'</code>
- <code>id: string</code>
- <code>actions: [PointerAction](#pointeraction)[]</code>
- <code>parameters?: [PointerParameters](#pointerparameters)</code>

## ActionSequence

**POSSIBLE VALUES**

- <code>[NullActionSequence](#nullactionsequence)</code>
- <code>[KeyActionSequence](#keyactionsequence)</code>
- <code>[PointerActionSequence](#pointeractionsequence)</code>

## Key

**POSSIBLE VALUES**

- <code>NULL</code>
- <code>CANCEL</code>
- <code>HELP</code>
- <code>BACKSPACE</code>
- <code>TAB</code>
- <code>CLEAR</code>
- <code>RETURN</code>
- <code>ENTER</code>
- <code>SHIFT</code>
- <code>CONTROL</code>
- <code>ALT</code>
- <code>PAUSE</code>
- <code>ESCAPE</code>
- <code>SPACE</code>
- <code>PAGE_UP</code>
- <code>PAGE_DOWN</code>
- <code>END</code>
- <code>HOME</code>
- <code>LEFT</code>
- <code>UP</code>
- <code>RIGHT</code>
- <code>DOWN</code>
- <code>INSERT</code>
- <code>DELETE</code>
- <code>SEMICOLON</code>
- <code>EQUALS</code>
- <code>NUMPAD0</code>
- <code>NUMPAD1</code>
- <code>NUMPAD2</code>
- <code>NUMPAD3</code>
- <code>NUMPAD4</code>
- <code>NUMPAD5</code>
- <code>NUMPAD6</code>
- <code>NUMPAD7</code>
- <code>NUMPAD8</code>
- <code>NUMPAD9</code>
- <code>MULTIPLY</code>
- <code>ADD</code>
- <code>SEPARATOR</code>
- <code>SUBTRACT</code>
- <code>DECIMAL</code>
- <code>DIVIDE</code>
- <code>F1</code>
- <code>F2</code>
- <code>F3</code>
- <code>F4</code>
- <code>F5</code>
- <code>F6</code>
- <code>F7</code>
- <code>F8</code>
- <code>F9</code>
- <code>F10</code>
- <code>F11</code>
- <code>F12</code>
- <code>META</code>
- <code>ZENKAKUHANKAKU</code>
- <code>R_SHIFT</code>
- <code>R_CONTROL</code>
- <code>R_ALT</code>
- <code>R_META</code>
- <code>R_PAGEUP</code>
- <code>R_PAGEDOWN</code>
- <code>R_END</code>
- <code>R_HOME</code>
- <code>R_ARROWLEFT</code>
- <code>R_ARROWUP</code>
- <code>R_ARROWRIGHT</code>
- <code>R_ARROWDOWN</code>
- <code>R_INSERT</code>
- <code>R_DELETE</code>
