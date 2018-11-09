var colors = {
  wcag: {
    // Less strict requirements for higher contrast ratio, see https://www.w3.org/TR/WCAG20/
    // normal is 14px font size
    // large is 18px font size
    aaRatio: {
      normal: 4.5,
      large: 3
    },
    // More strict requirements for higher contrast ratio, see https://www.w3.org/TR/WCAG20/
    // normal is 14px font size
    // large is 18px font size
    aaaRatio: {
      normal: 7,
      large: 4.5
    }
  },
  conversion: {
    hexToRgb: function(hex){
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
      } : null;
    },
    hslToRgb: function(hue, sat, light){
      var t1, t2, r, g, b;

      hue = hue / 60;

      if ( light <= 0.5 ) {
        t2 = light * (sat + 1);
      } else {
        t2 = light + sat - (light * sat);
      }

      t1 = light * 2 - t2;
      r = hueToRgb(t1, t2, hue + 2) * 255;
      g = hueToRgb(t1, t2, hue) * 255;
      b = hueToRgb(t1, t2, hue - 2) * 255;

      return {
        r: r,
        g: g,
        b: b
      }
    }
  },
  fn: {
    luminanace: function(r, g, b) {
      var a = [r, g, b].map(function (v) {
          v /= 255;
          return v <= 0.03928
              ? v / 12.92
              : Math.pow( (v + 0.055) / 1.055, 2.4 );
      });
      return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    },
    getContrastRatio: function(rgb1, rgb2){
      var ratio = (this.luminanace(rgb1.r, rgb1.g, rgb1.b) + 0.05) / (this.luminanace(rgb2.r, rgb2.g, rgb2.b) + 0.05);

      return ratio;
    },
    contrastValidation: function(rgb1, rgb2){
      var ratio = colors.fn.getContrastRatio(rgb1, rgb2);

      return {
        aaRatio: {
          normal: ratio >= colors.wcag.aaRatio.normal,
          large: ratio >= colors.wcag.aaRatio.large
        },
        aaaRatio: {
          normal: ratio >= colors.wcag.aaaRatio.normal,
          large: ratio >= colors.wcag.aaaRatio.large
        }
      }
    }
  }
}
