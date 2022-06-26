Colour pickers are quite varied in how they allow you to choose colours. The following colour models should be supported (all have an implied alpha channel):

* RGB
* RGB Hex (Hex4 and Hex8)
* HSL
* HSV
* CMYK
* LAB
* Grayscale
* Strings (e.g. "red", "grey", "cornflowerblue" - the web colours)

Hex colour codes can be:

* Hex3: RGB, where each channel is 1 hex digit.
* Hex4: RGBA, where each channel is 1 hex digit.
* Hex6: RGB, where each channel is 2 hex digits.
* Hex8: RGBA, where each channel is 2 hex digits.

Internally, when working with colours, they should always include the alpha channel (conversion may drop it though). TinyColor is probably the best utility library to use. The "string" colours can't be supported in the utility elements - they need to be converted to one of the other models first.

## Color Channel Ranges
In all cases the alpha channel is 0.0 - 1.0, and is usually represented as a percentage.

### RGB
* Each channel is 0 to 255.

### RGB Hex
* Hex4: Each channel is 0 to F.
* Hex8: Each channel is 00 to FF.

### HSL
* H: 0 to 360
* S and L: 0 to 100

### HSV
* H: 0 to 360
* S and V: 0 to 100

### CMYK
* Each channel is 0 to 100.

### LAB
* L: 0 to 100
* A and B: -128 to 127

### Grayscale
* Gray: 0 to 100

## Editor Types
Since colours have 2, 4 or 5 (CMYKA) channels, the need to be edited separately and the best you can do is 2 channels together.

* Text or numeric editor: Single channel or full RGB Hex.
* Combobox: Sometimes used for fixed steps like the alpha channel.
* Color Slider/Bar: Single channel.
* Colour Area or Wheel: 2 channels (limited to combinations that make sense).

## Components
The idea is to provide the various colour channel editors, which can then be assembled to create any colour picker layout you want. The text, numeric and combobox editors aren't special (they're already part of the component suite), so they don't need to be provided in this context. The following components need to be provided:

* Color Bar (linear single slider)
* Color Area (area single slider)
* Color Circle (circular area single slider)
* Color Wheel (circular single slider)
* Color Box
* Color Marker
* Color Swatch
* Foreground/Background Switcher (Primary/Secondary)

Each of the first 3 will work with a single color in a particular color model, but only edit the specified channel(s). The color box and color marker simply display the given color (for each model). The color marker can also ignore the alpha channel. The color swatch is just a collection of color boxes, and the switcher is 2 color boxes with affordances to switch their values, or set them to zero.

The important properties are:

### Color Bar
* colorModel
* color
* channel

### Color Area/Circle/Wheel
* colorModel
* color
* channel1
* channel2

### Color Box/Marker
* colorModel
* color
* ignoreAlpha

### Color Swatch
* colorModel
* items: `Array<color>`

### Foreground/Background Switcher
* colorModel
* primaryColor
* secondaryColor