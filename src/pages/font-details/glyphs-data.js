// Unicode glyph categories with their ranges
// Each entry: { name, type ('letter'|'symbol'), ranges: [[start, end], ...] }

export const GLYPH_CATEGORIES = [
  {
    name: 'Basic Latin',
    type: 'mixed',
    ranges: [[0x0020, 0x007E]],
  },
  {
    name: 'Punctuation',
    type: 'symbol',
    ranges: [[0x0021, 0x002F], [0x003A, 0x0040], [0x005B, 0x0060], [0x007B, 0x007E]],
  },
  {
    name: 'Latin-1 Supplement',
    type: 'letter',
    ranges: [[0x00A0, 0x00FF]],
  },
  {
    name: 'Latin Extended-A',
    type: 'letter',
    ranges: [[0x0100, 0x017F]],
  },
  {
    name: 'Latin Extended-B',
    type: 'letter',
    ranges: [[0x0180, 0x024F]],
  },
  {
    name: 'IPA Extensions',
    type: 'letter',
    ranges: [[0x0250, 0x02AF]],
  },
  {
    name: 'Spacing Modifier Letters',
    type: 'symbol',
    ranges: [[0x02B0, 0x02FF]],
  },
  {
    name: 'Combining Diacritical Marks',
    type: 'symbol',
    ranges: [[0x0300, 0x036F]],
  },
  {
    name: 'Greek',
    type: 'letter',
    ranges: [[0x0370, 0x03FF]],
  },
  {
    name: 'General Punctuation',
    type: 'symbol',
    ranges: [[0x2000, 0x206F]],
  },
  {
    name: 'Superscripts and Subscripts',
    type: 'symbol',
    ranges: [[0x2070, 0x209F]],
  },
  {
    name: 'Currency Symbols',
    type: 'symbol',
    ranges: [[0x20A0, 0x20CF]],
  },
  {
    name: 'Letterlike Symbols',
    type: 'symbol',
    ranges: [[0x2100, 0x214F]],
  },
  {
    name: 'Number Forms',
    type: 'symbol',
    ranges: [[0x2150, 0x218F]],
  },
  {
    name: 'Arrows',
    type: 'symbol',
    ranges: [[0x2190, 0x21FF]],
  },
  {
    name: 'Mathematical Operators',
    type: 'symbol',
    ranges: [[0x2200, 0x22FF]],
  },
  {
    name: 'Miscellaneous Technical',
    type: 'symbol',
    ranges: [[0x2300, 0x23FF]],
  },
  {
    name: 'Enclosed Alphanumerics',
    type: 'symbol',
    ranges: [[0x2460, 0x24FF]],
  },
  {
    name: 'Geometric Shapes',
    type: 'symbol',
    ranges: [[0x25A0, 0x25FF]],
  },
  {
    name: 'Miscellaneous Symbols',
    type: 'symbol',
    ranges: [[0x2600, 0x26FF]],
  },
  {
    name: 'Dingbats',
    type: 'symbol',
    ranges: [[0x2700, 0x27BF]],
  },
  {
    name: 'Small Form Variants',
    type: 'symbol',
    ranges: [[0xFE50, 0xFE6F]],
  },
  {
    name: 'Alphabetic Presentation Forms',
    type: 'letter',
    ranges: [[0xFB00, 0xFB4F]],
  },
];

// Generate characters for a category from its ranges
export function getGlyphsForCategory(category) {
  const glyphs = [];
  for (const [start, end] of category.ranges) {
    for (let code = start; code <= end; code++) {
      const char = String.fromCodePoint(code);
      // Skip control characters and unassigned
      if (char.trim() === '' && code !== 0x0020) continue;
      glyphs.push({
        char,
        code,
        hex: `U+${code.toString(16).toUpperCase().padStart(4, '0')}`,
        decimal: code,
      });
    }
  }
  return glyphs;
}

// Unicode character names (common ones for display)
const CHAR_NAMES = {
  0x0020: 'SPACE',
  0x0021: 'EXCLAMATION MARK',
  0x0022: 'QUOTATION MARK',
  0x0023: 'NUMBER SIGN',
  0x0024: 'DOLLAR SIGN',
  0x0025: 'PERCENT SIGN',
  0x0026: 'AMPERSAND',
  0x0027: 'APOSTROPHE',
  0x0028: 'LEFT PARENTHESIS',
  0x0029: 'RIGHT PARENTHESIS',
  0x002A: 'ASTERISK',
  0x002B: 'PLUS SIGN',
  0x002C: 'COMMA',
  0x002D: 'HYPHEN-MINUS',
  0x002E: 'FULL STOP',
  0x002F: 'SOLIDUS',
  0x0030: 'DIGIT ZERO',
  0x0031: 'DIGIT ONE',
  0x0032: 'DIGIT TWO',
  0x0033: 'DIGIT THREE',
  0x0034: 'DIGIT FOUR',
  0x0035: 'DIGIT FIVE',
  0x0036: 'DIGIT SIX',
  0x0037: 'DIGIT SEVEN',
  0x0038: 'DIGIT EIGHT',
  0x0039: 'DIGIT NINE',
  0x003A: 'COLON',
  0x003B: 'SEMICOLON',
  0x003C: 'LESS-THAN SIGN',
  0x003D: 'EQUALS SIGN',
  0x003E: 'GREATER-THAN SIGN',
  0x003F: 'QUESTION MARK',
  0x0040: 'COMMERCIAL AT',
  0x005B: 'LEFT SQUARE BRACKET',
  0x005C: 'REVERSE SOLIDUS',
  0x005D: 'RIGHT SQUARE BRACKET',
  0x005E: 'CIRCUMFLEX ACCENT',
  0x005F: 'LOW LINE',
  0x0060: 'GRAVE ACCENT',
  0x007B: 'LEFT CURLY BRACKET',
  0x007C: 'VERTICAL LINE',
  0x007D: 'RIGHT CURLY BRACKET',
  0x007E: 'TILDE',
  0x00A9: 'COPYRIGHT SIGN',
  0x00AE: 'REGISTERED SIGN',
  0x00B0: 'DEGREE SIGN',
  0x00B1: 'PLUS-MINUS SIGN',
  0x00B5: 'MICRO SIGN',
  0x00D7: 'MULTIPLICATION SIGN',
  0x00F7: 'DIVISION SIGN',
  0x2013: 'EN DASH',
  0x2014: 'EM DASH',
  0x2018: 'LEFT SINGLE QUOTATION MARK',
  0x2019: 'RIGHT SINGLE QUOTATION MARK',
  0x201C: 'LEFT DOUBLE QUOTATION MARK',
  0x201D: 'RIGHT DOUBLE QUOTATION MARK',
  0x2022: 'BULLET',
  0x2026: 'HORIZONTAL ELLIPSIS',
  0x20AC: 'EURO SIGN',
  0x2190: 'LEFTWARDS ARROW',
  0x2191: 'UPWARDS ARROW',
  0x2192: 'RIGHTWARDS ARROW',
  0x2193: 'DOWNWARDS ARROW',
  0x2194: 'LEFT RIGHT ARROW',
  0x221E: 'INFINITY',
  0x2248: 'ALMOST EQUAL TO',
  0x2260: 'NOT EQUAL TO',
  0x2264: 'LESS-THAN OR EQUAL TO',
  0x2265: 'GREATER-THAN OR EQUAL TO',
};

export function getGlyphName(code) {
  if (CHAR_NAMES[code]) return CHAR_NAMES[code];
  // Generate name from code range
  if (code >= 0x0041 && code <= 0x005A) return `LATIN CAPITAL LETTER ${String.fromCodePoint(code)}`;
  if (code >= 0x0061 && code <= 0x007A) return `LATIN SMALL LETTER ${String.fromCodePoint(code)}`;
  if (code >= 0x00C0 && code <= 0x00FF) return `LATIN LETTER ${String.fromCodePoint(code).toUpperCase()}`;
  if (code >= 0x0370 && code <= 0x03FF) return `GREEK LETTER`;
  if (code >= 0x2190 && code <= 0x21FF) return `ARROW`;
  if (code >= 0x2200 && code <= 0x22FF) return `MATHEMATICAL OPERATOR`;
  if (code >= 0x2300 && code <= 0x23FF) return `TECHNICAL SYMBOL`;
  if (code >= 0x2460 && code <= 0x24FF) return `ENCLOSED ALPHANUMERIC`;
  if (code >= 0x25A0 && code <= 0x25FF) return `GEOMETRIC SHAPE`;
  if (code >= 0x2600 && code <= 0x26FF) return `MISCELLANEOUS SYMBOL`;
  if (code >= 0x2700 && code <= 0x27BF) return `DINGBAT`;
  if (code >= 0x20A0 && code <= 0x20CF) return `CURRENCY SYMBOL`;
  return `UNICODE CHARACTER ${String.fromCodePoint(code).toUpperCase()}`;
}

export function getGlyphCategory(code) {
  if (code >= 0x0030 && code <= 0x0039) return 'Decimal digit number';
  if (code >= 0x0041 && code <= 0x005A) return 'Uppercase letter';
  if (code >= 0x0061 && code <= 0x007A) return 'Lowercase letter';
  if ((code >= 0x0021 && code <= 0x002F) || (code >= 0x003A && code <= 0x0040) ||
      (code >= 0x005B && code <= 0x0060) || (code >= 0x007B && code <= 0x007E))
    return 'Other punctuation';
  if (code >= 0x00C0 && code <= 0x00FF) return 'Letter';
  if (code >= 0x0100 && code <= 0x024F) return 'Letter';
  if (code >= 0x0250 && code <= 0x02AF) return 'Letter';
  if (code >= 0x02B0 && code <= 0x02FF) return 'Modifier letter';
  if (code >= 0x0300 && code <= 0x036F) return 'Nonspacing mark';
  if (code >= 0x0370 && code <= 0x03FF) return 'Letter';
  if (code >= 0x2000 && code <= 0x206F) return 'Punctuation';
  if (code >= 0x2070 && code <= 0x209F) return 'Number';
  if (code >= 0x20A0 && code <= 0x20CF) return 'Currency symbol';
  if (code >= 0x2100 && code <= 0x214F) return 'Symbol';
  if (code >= 0x2150 && code <= 0x218F) return 'Number form';
  if (code >= 0x2190 && code <= 0x21FF) return 'Symbol';
  if (code >= 0x2200 && code <= 0x22FF) return 'Mathematical symbol';
  if (code >= 0x2300 && code <= 0x23FF) return 'Symbol';
  if (code >= 0x2460 && code <= 0x24FF) return 'Symbol';
  if (code >= 0x25A0 && code <= 0x25FF) return 'Symbol';
  if (code >= 0x2600 && code <= 0x26FF) return 'Symbol';
  if (code >= 0x2700 && code <= 0x27BF) return 'Symbol';
  if (code >= 0xFB00 && code <= 0xFB4F) return 'Letter';
  if (code >= 0xFE50 && code <= 0xFE6F) return 'Punctuation';
  return 'Other';
}
