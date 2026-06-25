# ColdSweatEvents.gatherDefaultModifiers

## Basic info

- Valid script types: [SERVER]

- Has result? ✘

- Event class: DefaultModifiersEventJS (third-party)

### Available fields:

| Name | Type | Static? |
| ---- | ---- | ------- |

Note: Even if no fields are listed above, some methods are still available as fields through *beans*.

### Available methods:

| Name | Parameters | Return type | Static? |
| ---- | ---------- | ----------- | ------- |
| placed | String, String, Predicate<TempModifier> |  | Placement | ✘ |
| addModifiers | String, TempModifier[] |  | void | ✘ |
| addModifierById | String, ResourceLocation, Consumer<TempModifier>, Placement |  | void | ✘ |
| removeModifiers | String, Predicate<TempModifier> |  | void | ✘ |
| addModifier | String, TempModifier, Placement |  | void | ✘ |
| addModifier | String, TempModifier |  | void | ✘ |
| getEntity |  |  | Entity | ✘ |
| getModifiers |  |  | Map<Trait, List<TempModifier>> | ✘ |
| getPlayer |  |  | Player | ✘ |
| getLevel |  |  | Level | ✘ |
| getServer |  |  | MinecraftServer | ✘ |
| success |  |  | Object | ✘ |
| success | Object |  | Object | ✘ |
| cancel | Object |  | Object | ✘ |
| cancel |  |  | Object | ✘ |
| exit | Object |  | Object | ✘ |
| exit |  |  | Object | ✘ |


### Documented members:

- `Object success()`
```
Stops the event with default exit value. Execution will be stopped **immediately**.

`success` denotes a `true` outcome.
```

- `Object success(Object var0)`

  Parameters:
  - var0: Object

```
Stops the event with the given exit value. Execution will be stopped **immediately**.

`success` denotes a `true` outcome.
```

- `Object cancel(Object var0)`

  Parameters:
  - var0: Object

```
Cancels the event with the given exit value. Execution will be stopped **immediately**.

`cancel` denotes a `false` outcome.
```

- `Object cancel()`
```
Cancels the event with default exit value. Execution will be stopped **immediately**.

`cancel` denotes a `false` outcome.
```

- `Object exit(Object var0)`

  Parameters:
  - var0: Object

```
Stops the event with the given exit value. Execution will be stopped **immediately**.

`exit` denotes a `default` outcome.
```

- `Object exit()`
```
Stops the event with default exit value. Execution will be stopped **immediately**.

`exit` denotes a `default` outcome.
```



### Example script:

```js
ColdSweatEvents.gatherDefaultModifiers((event) => {
	// This space (un)intentionally left blank
});
```

