There are a number of different slider variants:

* Linear (single axis)
  * Single
    * Vertical
    * Horizontal
  * Multi (e.g. gradient color stops)
    * Vertical
    * Horizontal
  * Range
    * Vertical
    * Horizontal
* Area (double axis - 2D. It does not have to be square)
  * Single (e.g. color picker)
  * Multi (seems weird, but here for completeness)
  * Range (seems weird, but here for completeness)
* Radial (donut, or knob - single axis)
  * Single
  * Multi (seems weird, but here for completeness)
  * Range
* Circular Area (double axis - 2D)
  * Single
  * Multi (seems weird, but here for completeness)
  * Range

The core behaviour is shared between BaseSlider (the form element behaviour) and SliderController (the actual physical behaviour). The core properties are:

* value
* min
* max
* step (number, or "any")

For consistency and to stick to the standard slider interface, the same 4 properties will be used for all the variants, but the types will be expanded. If an object is used for the value, then a mapping needs to be created to the internal numeric value. The property should be called valueMap.

The types for value, min, max, step and valueMap will have to be the union of all the possible values below.

*The radial slider will also have a "radius" (size of slider - could be implied from the bounds) property and an "arc" property (size of the slider arc).*

## Properties
### Linear Single and Radial Single
* value: number | object (min...max)
* min: number
* max: number
* step: number | "any"
* valueMap: string | null

### Linear Multi and Radial Multi
* value: Array<number | object> (min...max)
* min: number
* max: number
* step: number | "any"
* valueMap: string | null

### Linear Range and Radial Range
* value: { start: number | object, end: number | object }
* min: number
* max: number
* step: number | "any"
* valueMap: string | null

### Area Single
* value: { x: number | object, y: number | object }
* min: { x: number, y: number }
* max: { x: number, y: number }
* step: { x: number | "any", y: number | "any" }
* valueMap: { x: string, y: string } | null

### Area Multi
* value: Array<{ x: number | object, y: number | object }>
* min: { x: number, y: number }
* max: { x: number, y: number }
* step: { x: number | "any", y: number | "any" }
* valueMap: { x: string, y: string } | null

### Area Range
value: { start: { x: number | object, y: number | object }, end: { x: number | object, y: number | object } }
* min: { x: number, y: number }
* max: { x: number, y: number}
* step: { x: number | "any", y: number | "any" }
* valueMap: { x: string, y: string } | null

### Circular Area
Same as Area, but there is a radial constraint on the values. It may be possible to combine Area and Circular Area in a single component (with variants). It can only be circular - doesn't make sense to be radial (pacman shape).

### Triangular Area
This is very specific to color pickers and is usually set in the middle of a radial slider, and can probably be replaced by an area slider. Not sure if it's worth the effort.

## Hash Marks and Labels
There is no standard, but some browsers sort of support something like this.

```html
<my-slider>
    <datalist>
        <option value="0" label="0%"></option>
        <option value="25"></option>
        <option value="50" label="50%"></option>
        <option value="75"></option>
        <option value="100" label="100%">
    </datalist>
</my-slider>
```

Since there is no standard, it probably makes more sense to provide the tick marks as a single object property rather than markup, which is quite verbose. Tick marks don't really make sense on a circular slider but they have a dual purpose of being used on tooltips, so they can be included.

`TickValue: { value: number, label?: null | string }`

Since ticks are non-standard and not all sliders will use them, they should be provided as separate mixins that can be used by implementers, if necessary.

### Linear and Circular
`ticks: Array<TickValue>`

### Area
`ticks: { x: Array<TickValue>, y: Array<TickValue> }`

## Implementation
This is how the base classes will be organized.

* BaseSlider
  * BaseSingleSlider (SingleSliderController)
    * BaseLinearSingleSlider (vertical and horizontal - may be variants or separate classes, will see)
    * BaseRadialSingleSlider
  * BaseMultiSlider (MultiSliderController)
    * BaseLinearMultiSlider (vertical and horizontal - may be variants or separate classes, will see)
    * BaseRadialMultiSlider
  * BaseRangeSlider (RangeSliderController)
    * BaseLinearRangeSlider (vertical and horizontal - may be variants or separate classes, will see)
    * BaseRadialRangeSlider
  * BaseAreaSlider (*may not be required*)
    * BaseAreaSingleSlider (SingleSliderController)
    * BaseAreaMultiSlider (MultiSliderController)
    * BaseAreaRangeSlider (RangeSliderController)
    * BaseCircularAreaSingleSlider (SingleSliderController)
    * BaseCircularAreaMultiSlider (MultiSliderController)
    * BaseCircularAreaRangeSlider (RangeSliderController)
    * BaseTriangularAreaSingleSlider (SingleSliderController)
    * BaseTriangularAreaMultiSlider (MultiSliderController)
    * BaseTriangularAreaRangeSlider (RangeSliderController)

The assumption that the single, multi and range controllers can cleanly handle linear, circular and area sliders may not be correct. The controllers will have a similar hierarchy.

* SliderController
  * SingleSliderController
  * MultiSliderController
  * RangeSliderController

Tick Mixins.

* SliderTickMixin (for linear and circular sliders)
* AreaSliderTickMixin (for area sliders)

## Issues
The "value" property having predefined types (number, x/y, start/end) are a problem for specific type sliders where x/y isn't a convenient naming convention. e.g. A color area value is saturation and lightness, and x and y aren't intuitive. Also, the various color sliders require extra information to render the background and typically take a color (HSLA) value. For these reasons it makes sense for the values to be a generic object. If this is the case then there needs to be a way to map the single or double (x/y) internal values to properties on the generic value. The min, max and step values can stay as is.

*TODO: Figure out how to have a required type with at least 1 or 2 properties of type number, with any names.*

## Predefined Base Sliders
There are base sliders designed for a specific purpose.

### Color Slider
A single linear slider (horizontal and vertical) that allows you to choose a color hue (0 - 360).

### Opacity Slider
A single linear slider (horizontal and vertical) that allows you to choose a color opacity (0 - 100, converts to 0.0 - 1.0).

### Color Wheel
A single circular slider that allows you to choose a color hue (0 - 360).

### Color Area
A single area slider that allows you to choose a color saturation and lightness for a given hue (0 - 100 on both axes, converts to percent).

### Color Circle
A single circular area slider that allows you to choose a color saturation and lightness for a given hue (0 - 100 on both axes, converts to percent).