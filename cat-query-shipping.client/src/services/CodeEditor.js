import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
// import dracula from 'monaco-themes/themes/Dracula.json'
import monoIndustrial from 'monaco-themes/themes/monoindustrial.json'
import darkPlus from '../assets/codeThemes/darkPlus.json'

// #region SECTION ALL MONACO THEME STUFF DON'T TOUCH
/** @type {monaco.languages.SemanticTokensLegend} */
const legend = {
  // NOTE special highlighting words
  tokenTypes: [
    'recipient', 'trackingNumber', 'description', 'shippingTier', 'postageCost', 'postageCrypto', 'shippingDate', 'dateFormat', 'delivered', 'postalStation', 'postalHistory', 'insured', 'pirateCoverage', 'insuredCost', 'sector', 'quadrant', 'hasQuadrantCode', 'insuredCrypto', 'quadrantCode', 'galaxy', 'galaxyCode', 'planet', 'planetNumber', 'planetCode', 'containsHazard', 'hazard', 'variable', 'string'
  ],
  tokenModifiers: [
      'declaration', 'documentation', 'readonly', 'static', 'abstract', 'deprecated',
      'modification', 'async'
  ]
};
/** @type {(type: string)=>number} */
function getType(type) {
  return legend.tokenTypes.indexOf(type);
}

/** @type {(modifier: string[]|string|null)=>number} */
function getModifier(modifiers) {
  if (typeof modifiers === 'string') {
      modifiers = [modifiers];
  }
  if (Array.isArray(modifiers)) {
      let nModifiers = 0;
      for (let modifier of modifiers) {
          const nModifier = legend.tokenModifiers.indexOf(modifier);
          if (nModifier > -1) {
              nModifiers |= (1 << nModifier) >>> 0;
          }
      }
      return nModifiers;
  } else {
      return 0;
  }
}
const tokenPattern = new RegExp('([a-zA-Z]+)((?:\\.[a-zA-Z]+)*)', 'g');
monaco.languages.registerDocumentSemanticTokensProvider('javascript', {
  getLegend: function () {
      return legend;
  },
  provideDocumentSemanticTokens: function (model, lastResultId, token) {
      const lines = model.getLinesContent();

      /** @type {number[]} */
      const data = [];

      let prevLine = 0;
      let prevChar = 0;

      for (let i = 0; i < lines.length; i++) {
          const line = lines[i];

          for (let match = null; match = tokenPattern.exec(line);) {
              // translate token and modifiers to number representations
              let type = getType(match[1]);
              if (type === -1) {
                  continue;
              }
              let modifier = match[2].length
                  ? getModifier(match[2].split('.').slice(1))
                  : 0;

              data.push(
                  // translate line to deltaLine
                  i - prevLine,
                  // for the same line, translate start to deltaStart
                  prevLine === i ? match.index - prevChar : match.index,
                  match[0].length,
                  type,
                  modifier
              );

              prevLine = i;
              prevChar = match.index;
          }
      }
      return {
          data: new Uint32Array(data),
          resultId: null
      };
  },
  releaseDocumentSemanticTokens: function (resultId) { }
});
//#endregion



monaco.editor.defineTheme('dark-plus', darkPlus)
monaco.editor.defineTheme('monoindustrial', monoIndustrial)
// monaco.editor.defineTheme('dracula', dracula)

  monaco.editor.defineTheme('cat-theme', {
   ...monoIndustrial,
    rules: [
      // ...monoIndustrial.rules,
      { token: 'variable', foreground: '499678' },
      { token: 'recipient', foreground: '499678' },
      { token: 'trackingNumber', foreground: '499678' },
      { token: 'description', foreground: '499678' },
      { token: 'shippingTier', foreground: '499678' },
      { token: 'postageCost', foreground: '499678' },
      { token: 'postageCrypto', foreground: '499678' },
      { token: 'shippingDate', foreground: '499678' },
      { token: 'dateFormat', foreground: '499678' },
      { token: 'delivered', foreground: '499678' },
      { token: 'postalStation', foreground: '499678' },
      { token: 'postalHistory', foreground: '499678' },
      { token: 'insured', foreground: '499678' },
      { token: 'pirateCoverage', foreground: '499678' },
      { token: 'insuredCost', foreground: '499678' },
      { token: 'insuredCrypto', foreground: '499678' },
      { token: 'sector', foreground: '499678' },
      { token: 'quadrant', foreground: '499678' },
      { token: 'hasQuadrantCode', foreground: '499678' },
      { token: 'quadrantCode', foreground: '499678' },
      { token: 'galaxyCode', foreground: '499678' },
      { token: 'planet', foreground: '499678' },
      { token: 'planetNumber', foreground: '499678' },
      { token: 'planetCode', foreground: '499678' },
      { token: 'containsHazard', foreground: '499678' },
      { token: 'hazard', foreground: '499678' },
      { token: 'string', foreground: 'CC6973' }
    ]
  });
export  function init(){

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker()
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker()
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker()
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker()
    }
    return new editorWorker()
  }
}



  let editor = monaco.editor.create(document.getElementById('code-window'), {
    value: [
      'const query = {',
      'recipient: "Boz"',
      '}'
    ].join('\n'),
    language: 'javascript',
    automaticLayout: true,


    lineNumbers: "off",
        roundedSelection: false,
        scrollBeyondLastLine: false,
        readOnly: false,
        scrollbar: false,
        theme: 'cat-theme',
      'semanticHighlighting.enabled': true

  })

 return editor
}
