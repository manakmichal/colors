# colors
Simple functions for playing and dealing with colors.

Currently, it's about:
- Converting HEX & HSL to RGB
- Comparing two colors to get a contrast ratio
- Contrast validation using WCAG 2.0 guidelines

## Contrast check

You can compare two different colors (foreground and background) to get a contrast ratio.

```javascript
// imagine you have two colors
var foreground = "#FFFFFF",
    background = "#000000";

// to get the contrast, you need to convert HEX to RGB
var fgRGB = colors.convert.hexToRgb(foreground),
    bgRGB = colors.convert.hexToRgb(background);

// now check the ratio
var ratio = colors.fn.getContrastRatio(foreground, background);
```

For this example, the ratio is **21**.

You can also check if the ratio meets WCAG 2.0 guidelines directly:

```javascript
// imagine you have two colors
var foreground = "#FFFFFF",
    background = "#000000";

// to get the contrast, you need to convert HEX to RGB
var fgRGB = colors.convert.hexToRgb(foreground),
    bgRGB = colors.convert.hexToRgb(background);

// now check the ratio
var ratio = colors.fn.contrastValidation(foreground, background);
```

For this example, the returned value stored in the ratio variable is an object:
```javascript
{
  aaRatio: {
    large: true,
    normal: true
  },
  aaaRatio: {
    large: true,
    normal: true
  }
}
```

You can check how it works on https://www.manakmichal.cz/colors/.
