# ColdSweatEvents.registries

## Basic info

- Valid script types: [SERVER]

- Has result? ✘

- Event class: ModRegistriesEventJS (third-party)

### Available fields:

| Name | Type | Static? |
| ---- | ---- | ------- |

Note: Even if no fields are listed above, some methods are still available as fields through *beans*.

### Available methods:

| Name | Parameters | Return type | Static? |
| ---- | ---------- | ----------- | ------- |
| addSoulspringLampFuel | Consumer<FuelBuilderJS> |  | void | ✘ |
| addBlockTemperature | double, String, Consumer<BlockTempBuilderJS> |  | void | ✘ |
| addBlockTemperature | Consumer<BlockTempBuilderJS>, Function |  | void | ✘ |
| addInsulator | Consumer<InsulatorBuilderJS> |  | void | ✘ |
| addFoodTemperature | Consumer<FoodBuilderJS> |  | void | ✘ |
| addHearthFuel | Consumer<FuelBuilderJS> |  | void | ✘ |
| addBoilerFuel | Consumer<FuelBuilderJS> |  | void | ✘ |
| addIceboxFuel | Consumer<FuelBuilderJS> |  | void | ✘ |
| addItemTemperature | Consumer<ItemTempBuilderJS> |  | void | ✘ |
| addDryingItem | Consumer<DryingItemBuilderJS> |  | void | ✘ |
| addBiomeTemperature | double, double, String, String[], double |  | void | ✘ |
| addBiomeTemperature | double, double, String, String[] |  | void | ✘ |
| addBiomeOffset | double, double, String, String[], double |  | void | ✘ |
| addBiomeOffset | double, double, String, String[] |  | void | ✘ |
| addDimensionTemperature | double, String, String[] |  | void | ✘ |
| addDimensionTemperature | double, double, String, String[] |  | void | ✘ |
| addDimensionOffset | double, String, String[] |  | void | ✘ |
| addDimensionOffset | double, double, String, String[] |  | void | ✘ |
| addStructureTemperature | double, String[] |  | void | ✘ |
| addStructureTemperature | double, String, String[] |  | void | ✘ |
| addStructureOffset | double, String[] |  | void | ✘ |
| addStructureOffset | double, String, String[] |  | void | ✘ |
| addEntityTemperature | Consumer<EntityTempBuilderJS> |  | void | ✘ |
| addEntityClimate | Consumer<EntityClimateBuilderJS> |  | void | ✘ |
| addInsulatingMount | Consumer<InsulatingMountBuilderJS> |  | void | ✘ |
| addSpawnBiomes | Consumer<SpawnBiomeBuilderJS> |  | void | ✘ |
| addTempModifier | String, Function<TempModifierDataJS, Function<Double, Double>> |  | void | ✘ |
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
ColdSweatEvents.registries((event) => {
	// This space (un)intentionally left blank
});
```

