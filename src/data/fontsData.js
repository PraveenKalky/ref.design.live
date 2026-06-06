export const FONT_CATEGORY_COUNTS = {
  'Sans-Serif': '1842', 'Serif': '1203', 'Display': '874', 'Monospace': '312',
  'Handwritten': '547', 'Script': '693', 'Geometric': '428', 'Humanist': '376',
  'Slab Serif': '284', 'Condensed': '196', 'Variable': '318', 'Rounded': '241',
  'Wide': '167', 'Retro': '432', 'Futuristic': '289', 'Decorative': '514',
  'Transitional': '193', 'Bold & Heavy': '621', 'Thin & Light': '398'
};

export const initialFontsData = [
  { 
    id: 1, 
    name: "Neue Montreal", 
    description: "The only Grotesk you'll ever need.", 
    stylesInfo: "36 styles + Variable cut\nIncluding Italics & Text", 
    category: "Sans-Serif", 
    badge: "Update", 
    isVariable: true, 
    googleFont: "'Inter', sans-serif",
    stylesList: [
      { name: "Thin", weight: 100, italic: false },
      { name: "Thin Italic", weight: 100, italic: true },
      { name: "Light", weight: 300, italic: false },
      { name: "Light Italic", weight: 300, italic: true },
      { name: "Regular", weight: 400, italic: false },
      { name: "Italic", weight: 400, italic: true },
      { name: "Medium", weight: 500, italic: false },
      { name: "Medium Italic", weight: 500, italic: true },
      { name: "SemiBold", weight: 600, italic: false },
      { name: "SemiBold Italic", weight: 600, italic: true },
      { name: "Bold", weight: 700, italic: false },
      { name: "Bold Italic", weight: 700, italic: true },
      { name: "Black", weight: 900, italic: false },
      { name: "Black Italic", weight: 900, italic: true }
    ]
  },
  { 
    id: 2, 
    name: "PP Fragment", 
    description: "Classic serifs with a contemporary twist.", 
    stylesInfo: "32 styles + Variable cut\nIncluding Italic & Bold", 
    category: "Serif", 
    badge: "New", 
    isVariable: true, 
    googleFont: "'Playfair Display', serif",
    stylesList: [
      { name: "Glare Light", weight: 300, italic: false },
      { name: "Glare Regular", weight: 400, italic: false },
      { name: "Glare Bold", weight: 700, italic: false },
      { name: "Elegant Light", weight: 300, italic: true },
      { name: "Elegant Regular", weight: 400, italic: true },
      { name: "Elegant Bold", weight: 700, italic: true },
      { name: "Serif Regular", weight: 400, italic: false },
      { name: "Serif Italic", weight: 400, italic: true },
      { name: "Serif Bold", weight: 700, italic: false },
      { name: "Sans Regular", weight: 400, italic: false },
      { name: "Sans Bold", weight: 700, italic: false }
    ]
  },
  { 
    id: 3, 
    name: "Right Grotesk", 
    description: "Neutral, but not boring.", 
    stylesInfo: "130 styles + Variable cut\nCompact to Wide", 
    category: "Sans-Serif", 
    isVariable: true, 
    googleFont: "'Space Grotesk', sans-serif",
    stylesList: [
      { name: "Compact Fine", weight: 200, italic: false },
      { name: "Compact Regular", weight: 400, italic: false },
      { name: "Compact Bold", weight: 700, italic: false },
      { name: "Compact Black", weight: 900, italic: false },
      { name: "Normal Regular", weight: 400, italic: false },
      { name: "Normal Italic", weight: 400, italic: true },
      { name: "Normal Bold", weight: 700, italic: false },
      { name: "Wide Regular", weight: 400, italic: false },
      { name: "Wide Bold", weight: 700, italic: false },
      { name: "Wide Black", weight: 900, italic: false }
    ]
  },
  { 
    id: 4, 
    name: "Mori", 
    description: "A versatile gothic sans-serif.", 
    stylesInfo: "16 styles\nIncluding Italics", 
    category: "Sans-Serif", 
    googleFont: "'Gothic A1', sans-serif",
    stylesList: [
      { name: "ExtraLight", weight: 200, italic: false },
      { name: "Light", weight: 300, italic: false },
      { name: "Book", weight: 350, italic: false },
      { name: "Regular", weight: 400, italic: false },
      { name: "Italic", weight: 400, italic: true },
      { name: "Medium", weight: 500, italic: false },
      { name: "SemiBold", weight: 600, italic: false },
      { name: "Bold", weight: 700, italic: false },
      { name: "ExtraBold", weight: 800, italic: false }
    ]
  },
  { 
    id: 5, 
    name: "Pangram Sans", 
    description: "The geometric workhorse.", 
    stylesInfo: "28 styles + Variable cut\nIncluding Rounded", 
    category: "Geometric", 
    isVariable: true, 
    googleFont: "'Plus Jakarta Sans', sans-serif",
    stylesList: [
      { name: "Thin", weight: 100, italic: false },
      { name: "Light", weight: 300, italic: false },
      { name: "Regular", weight: 400, italic: false },
      { name: "Medium", weight: 500, italic: false },
      { name: "Bold", weight: 700, italic: false },
      { name: "Black", weight: 900, italic: false },
      { name: "Rounded Regular", weight: 400, italic: false },
      { name: "Rounded Bold", weight: 700, italic: false }
    ]
  },
  { 
    id: 6, 
    name: "Formula", 
    description: "A highly versatile display font.", 
    stylesInfo: "20 styles\nIncluding Condensed", 
    category: "Display", 
    googleFont: "'Bebas Neue', sans-serif",
    stylesList: [
      { name: "Condensed Light", weight: 300, italic: false },
      { name: "Condensed Regular", weight: 400, italic: false },
      { name: "Condensed Bold", weight: 700, italic: false },
      { name: "Regular", weight: 400, italic: false },
      { name: "Bold", weight: 700, italic: false },
      { name: "Black", weight: 900, italic: false },
      { name: "Expanded Regular", weight: 400, italic: false },
      { name: "Expanded Bold", weight: 700, italic: false }
    ]
  },
  { 
    id: 7, 
    name: "Editorial New", 
    description: "Elegant retro editorial serif.", 
    stylesInfo: "16 styles + Variable cut\nIncluding Italics", 
    category: "Serif", 
    badge: "Update", 
    isVariable: true, 
    googleFont: "'Newsreader', serif",
    stylesList: [
      { name: "Ultralight", weight: 200, italic: false },
      { name: "Ultralight Italic", weight: 200, italic: true },
      { name: "Light", weight: 300, italic: false },
      { name: "Light Italic", weight: 300, italic: true },
      { name: "Regular", weight: 400, italic: false },
      { name: "Italic", weight: 400, italic: true },
      { name: "Medium", weight: 500, italic: false },
      { name: "Medium Italic", weight: 500, italic: true },
      { name: "Bold", weight: 700, italic: false },
      { name: "Bold Italic", weight: 700, italic: true }
    ]
  },
  { 
    id: 8, 
    name: "Telegraph", 
    description: "A sturdy workhorse with character.", 
    stylesInfo: "16 styles\nIncluding Italics", 
    category: "Sans-Serif", 
    googleFont: "'Work Sans', sans-serif",
    stylesList: [
      { name: "Light", weight: 300, italic: false },
      { name: "Regular", weight: 400, italic: false },
      { name: "Italic", weight: 400, italic: true },
      { name: "Medium", weight: 500, italic: false },
      { name: "Bold", weight: 700, italic: false },
      { name: "Black", weight: 900, italic: false }
    ]
  }
];
