import{_ as te,g as ne,A as ie}from"./index.7606b25d.js";import{s as se,c as re,o as M,d as j,F as le,j as ae,e as C,t as P}from"./vendor.a96acae7.js";function Q(){return{async:!1,baseUrl:null,breaks:!1,extensions:null,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:null,sanitize:!1,sanitizer:null,silent:!1,smartypants:!1,tokenizer:null,walkTokens:null,xhtml:!1}}let L=Q();function oe(l){L=l}const ce=/[&<>"']/,he=/[&<>"']/g,pe=/[<>"']|&(?!#?\w+;)/,ue=/[<>"']|&(?!#?\w+;)/g,fe={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},N=l=>fe[l];function x(l,e){if(e){if(ce.test(l))return l.replace(he,N)}else if(pe.test(l))return l.replace(ue,N);return l}const ge=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;function F(l){return l.replace(ge,(e,t)=>(t=t.toLowerCase(),t==="colon"?":":t.charAt(0)==="#"?t.charAt(1)==="x"?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):""))}const de=/(^|[^\[])\^/g;function k(l,e){l=typeof l=="string"?l:l.source,e=e||"";const t={replace:(n,i)=>(i=i.source||i,i=i.replace(de,"$1"),l=l.replace(n,i),t),getRegex:()=>new RegExp(l,e)};return t}const ke=/[^\w:]/g,me=/^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;function H(l,e,t){if(l){let n;try{n=decodeURIComponent(F(t)).replace(ke,"").toLowerCase()}catch{return null}if(n.indexOf("javascript:")===0||n.indexOf("vbscript:")===0||n.indexOf("data:")===0)return null}e&&!me.test(t)&&(t=_e(e,t));try{t=encodeURI(t).replace(/%25/g,"%")}catch{return null}return t}const v={},xe=/^[^:]+:\/*[^/]*$/,be=/^([^:]+:)[\s\S]*$/,we=/^([^:]+:\/*[^/]*)[\s\S]*$/;function _e(l,e){v[" "+l]||(xe.test(l)?v[" "+l]=l+"/":v[" "+l]=q(l,"/",!0)),l=v[" "+l];const t=l.indexOf(":")===-1;return e.substring(0,2)==="//"?t?e:l.replace(be,"$1")+e:e.charAt(0)==="/"?t?e:l.replace(we,"$1")+e:l+e}const D={exec:function(){}};function y(l){let e=1,t,n;for(;e<arguments.length;e++){t=arguments[e];for(n in t)Object.prototype.hasOwnProperty.call(t,n)&&(l[n]=t[n])}return l}function V(l,e){const t=l.replace(/\|/g,(s,r,a)=>{let c=!1,g=r;for(;--g>=0&&a[g]==="\\";)c=!c;return c?"|":" |"}),n=t.split(/ \|/);let i=0;if(n[0].trim()||n.shift(),n.length>0&&!n[n.length-1].trim()&&n.pop(),n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;i<n.length;i++)n[i]=n[i].trim().replace(/\\\|/g,"|");return n}function q(l,e,t){const n=l.length;if(n===0)return"";let i=0;for(;i<n;){const s=l.charAt(n-i-1);if(s===e&&!t)i++;else if(s!==e&&t)i++;else break}return l.slice(0,n-i)}function ye(l,e){if(l.indexOf(e[1])===-1)return-1;const t=l.length;let n=0,i=0;for(;i<t;i++)if(l[i]==="\\")i++;else if(l[i]===e[0])n++;else if(l[i]===e[1]&&(n--,n<0))return i;return-1}function W(l){l&&l.sanitize&&!l.silent&&console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options")}function X(l,e){if(e<1)return"";let t="";for(;e>1;)e&1&&(t+=l),e>>=1,l+=l;return t+l}function G(l,e,t,n){const i=e.href,s=e.title?x(e.title):null,r=l[1].replace(/\\([\[\]])/g,"$1");if(l[0].charAt(0)!=="!"){n.state.inLink=!0;const a={type:"link",raw:t,href:i,title:s,text:r,tokens:n.inlineTokens(r)};return n.state.inLink=!1,a}return{type:"image",raw:t,href:i,title:s,text:x(r)}}function $e(l,e){const t=l.match(/^(\s+)(?:```)/);if(t===null)return e;const n=t[1];return e.split(`
`).map(i=>{const s=i.match(/^\s+/);if(s===null)return i;const[r]=s;return r.length>=n.length?i.slice(n.length):i}).join(`
`)}class O{constructor(e){this.options=e||L}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(/^ {1,4}/gm,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:q(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],i=$e(n,t[3]||"");return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline._escapes,"$1"):t[2],text:i}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(/#$/.test(n)){const i=q(n,"#");(this.options.pedantic||!i||/ $/.test(i))&&(n=i.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:t[0]}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){const n=t[0].replace(/^ *>[ \t]?/gm,"");return{type:"blockquote",raw:t[0],tokens:this.lexer.blockTokens(n,[]),text:n}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n,i,s,r,a,c,g,u,w,d,p,z,_=t[1].trim();const A=_.length>1,m={type:"list",raw:"",ordered:A,start:A?+_.slice(0,-1):"",loose:!1,items:[]};_=A?`\\d{1,9}\\${_.slice(-1)}`:`\\${_}`,this.options.pedantic&&(_=A?_:"[*+-]");const b=new RegExp(`^( {0,3}${_})((?:[	 ][^\\n]*)?(?:\\n|$))`);for(;e&&(z=!1,!(!(t=b.exec(e))||this.rules.block.hr.test(e)));){if(n=t[0],e=e.substring(n.length),u=t[2].split(`
`,1)[0],w=e.split(`
`,1)[0],this.options.pedantic?(r=2,p=u.trimLeft()):(r=t[2].search(/[^ ]/),r=r>4?1:r,p=u.slice(r),r+=t[1].length),c=!1,!u&&/^ *$/.test(w)&&(n+=w+`
`,e=e.substring(w.length+1),z=!0),!z){const I=new RegExp(`^ {0,${Math.min(3,r-1)}}(?:[*+-]|\\d{1,9}[.)])((?: [^\\n]*)?(?:\\n|$))`),S=new RegExp(`^ {0,${Math.min(3,r-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),T=new RegExp(`^ {0,${Math.min(3,r-1)}}(?:\`\`\`|~~~)`),E=new RegExp(`^ {0,${Math.min(3,r-1)}}#`);for(;e&&(d=e.split(`
`,1)[0],u=d,this.options.pedantic&&(u=u.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  ")),!(T.test(u)||E.test(u)||I.test(u)||S.test(e)));){if(u.search(/[^ ]/)>=r||!u.trim())p+=`
`+u.slice(r);else if(!c)p+=`
`+u;else break;!c&&!u.trim()&&(c=!0),n+=d+`
`,e=e.substring(d.length+1)}}m.loose||(g?m.loose=!0:/\n *\n *$/.test(n)&&(g=!0)),this.options.gfm&&(i=/^\[[ xX]\] /.exec(p),i&&(s=i[0]!=="[ ] ",p=p.replace(/^\[[ xX]\] +/,""))),m.items.push({type:"list_item",raw:n,task:!!i,checked:s,loose:!1,text:p}),m.raw+=n}m.items[m.items.length-1].raw=n.trimRight(),m.items[m.items.length-1].text=p.trimRight(),m.raw=m.raw.trimRight();const B=m.items.length;for(a=0;a<B;a++){this.lexer.state.top=!1,m.items[a].tokens=this.lexer.blockTokens(m.items[a].text,[]);const I=m.items[a].tokens.filter(T=>T.type==="space"),S=I.every(T=>{const E=T.raw.split("");let Z=0;for(const ee of E)if(ee===`
`&&(Z+=1),Z>1)return!0;return!1});!m.loose&&I.length&&S&&(m.loose=!0,m.items[a].loose=!0)}return m}}html(e){const t=this.rules.block.html.exec(e);if(t){const n={type:"html",raw:t[0],pre:!this.options.sanitizer&&(t[1]==="pre"||t[1]==="script"||t[1]==="style"),text:t[0]};if(this.options.sanitize){const i=this.options.sanitizer?this.options.sanitizer(t[0]):x(t[0]);n.type="paragraph",n.text=i,n.tokens=this.lexer.inline(i)}return n}}def(e){const t=this.rules.block.def.exec(e);if(t){t[3]&&(t[3]=t[3].substring(1,t[3].length-1));const n=t[1].toLowerCase().replace(/\s+/g," ");return{type:"def",tag:n,raw:t[0],href:t[2]?t[2].replace(this.rules.inline._escapes,"$1"):t[2],title:t[3]?t[3].replace(this.rules.inline._escapes,"$1"):t[3]}}}table(e){const t=this.rules.block.table.exec(e);if(t){const n={type:"table",header:V(t[1]).map(i=>({text:i})),align:t[2].replace(/^ *|\| *$/g,"").split(/ *\| */),rows:t[3]&&t[3].trim()?t[3].replace(/\n[ \t]*$/,"").split(`
`):[]};if(n.header.length===n.align.length){n.raw=t[0];let i=n.align.length,s,r,a,c;for(s=0;s<i;s++)/^ *-+: *$/.test(n.align[s])?n.align[s]="right":/^ *:-+: *$/.test(n.align[s])?n.align[s]="center":/^ *:-+ *$/.test(n.align[s])?n.align[s]="left":n.align[s]=null;for(i=n.rows.length,s=0;s<i;s++)n.rows[s]=V(n.rows[s],n.header.length).map(g=>({text:g}));for(i=n.header.length,r=0;r<i;r++)n.header[r].tokens=this.lexer.inline(n.header[r].text);for(i=n.rows.length,r=0;r<i;r++)for(c=n.rows[r],a=0;a<c.length;a++)c[a].tokens=this.lexer.inline(c[a].text);return n}}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:x(t[1])}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&/^<a /i.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:this.options.sanitize?"text":"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,text:this.options.sanitize?this.options.sanitizer?this.options.sanitizer(t[0]):x(t[0]):t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&/^</.test(n)){if(!/>$/.test(n))return;const r=q(n.slice(0,-1),"\\");if((n.length-r.length)%2==0)return}else{const r=ye(t[2],"()");if(r>-1){const c=(t[0].indexOf("!")===0?5:4)+t[1].length+r;t[2]=t[2].substring(0,r),t[0]=t[0].substring(0,c).trim(),t[3]=""}}let i=t[2],s="";if(this.options.pedantic){const r=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(i);r&&(i=r[1],s=r[3])}else s=t[3]?t[3].slice(1,-1):"";return i=i.trim(),/^</.test(i)&&(this.options.pedantic&&!/>$/.test(n)?i=i.slice(1):i=i.slice(1,-1)),G(t,{href:i&&i.replace(this.rules.inline._escapes,"$1"),title:s&&s.replace(this.rules.inline._escapes,"$1")},t[0],this.lexer)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let i=(n[2]||n[1]).replace(/\s+/g," ");if(i=t[i.toLowerCase()],!i||!i.href){const s=n[0].charAt(0);return{type:"text",raw:s,text:s}}return G(n,i,n[0],this.lexer)}}emStrong(e,t,n=""){let i=this.rules.inline.emStrong.lDelim.exec(e);if(!i||i[3]&&n.match(/[\p{L}\p{N}]/u))return;const s=i[1]||i[2]||"";if(!s||s&&(n===""||this.rules.inline.punctuation.exec(n))){const r=i[0].length-1;let a,c,g=r,u=0;const w=i[0][0]==="*"?this.rules.inline.emStrong.rDelimAst:this.rules.inline.emStrong.rDelimUnd;for(w.lastIndex=0,t=t.slice(-1*e.length+r);(i=w.exec(t))!=null;){if(a=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!a)continue;if(c=a.length,i[3]||i[4]){g+=c;continue}else if((i[5]||i[6])&&r%3&&!((r+c)%3)){u+=c;continue}if(g-=c,g>0)continue;c=Math.min(c,c+g+u);const d=e.slice(0,r+i.index+(i[0].length-a.length)+c);if(Math.min(r,c)%2){const z=d.slice(1,-1);return{type:"em",raw:d,text:z,tokens:this.lexer.inlineTokens(z)}}const p=d.slice(2,-2);return{type:"strong",raw:d,text:p,tokens:this.lexer.inlineTokens(p)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(/\n/g," ");const i=/[^ ]/.test(n),s=/^ /.test(n)&&/ $/.test(n);return i&&s&&(n=n.substring(1,n.length-1)),n=x(n,!0),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e,t){const n=this.rules.inline.autolink.exec(e);if(n){let i,s;return n[2]==="@"?(i=x(this.options.mangle?t(n[1]):n[1]),s="mailto:"+i):(i=x(n[1]),s=i),{type:"link",raw:n[0],text:i,href:s,tokens:[{type:"text",raw:i,text:i}]}}}url(e,t){let n;if(n=this.rules.inline.url.exec(e)){let i,s;if(n[2]==="@")i=x(this.options.mangle?t(n[0]):n[0]),s="mailto:"+i;else{let r;do r=n[0],n[0]=this.rules.inline._backpedal.exec(n[0])[0];while(r!==n[0]);i=x(n[0]),n[1]==="www."?s="http://"+i:s=i}return{type:"link",raw:n[0],text:i,href:s,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(e,t){const n=this.rules.inline.text.exec(e);if(n){let i;return this.lexer.state.inRawBlock?i=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(n[0]):x(n[0]):n[0]:i=x(this.options.smartypants?t(n[0]):n[0]),{type:"text",raw:n[0],text:i}}}}const h={newline:/^(?: *(?:\n|$))+/,code:/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,fences:/^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?=\n|$)|$)/,hr:/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,heading:/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,blockquote:/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,list:/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,html:"^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",def:/^ {0,3}\[(label)\]: *(?:\n *)?<?([^\s>]+)>?(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,table:D,lheading:/^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,_paragraph:/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,text:/^[^\n]+/};h._label=/(?!\s*\])(?:\\.|[^\[\]\\])+/;h._title=/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;h.def=k(h.def).replace("label",h._label).replace("title",h._title).getRegex();h.bullet=/(?:[*+-]|\d{1,9}[.)])/;h.listItemStart=k(/^( *)(bull) */).replace("bull",h.bullet).getRegex();h.list=k(h.list).replace(/bull/g,h.bullet).replace("hr","\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def","\\n+(?="+h.def.source+")").getRegex();h._tag="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";h._comment=/<!--(?!-?>)[\s\S]*?(?:-->|$)/;h.html=k(h.html,"i").replace("comment",h._comment).replace("tag",h._tag).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();h.paragraph=k(h._paragraph).replace("hr",h.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",h._tag).getRegex();h.blockquote=k(h.blockquote).replace("paragraph",h.paragraph).getRegex();h.normal=y({},h);h.gfm=y({},h.normal,{table:"^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"});h.gfm.table=k(h.gfm.table).replace("hr",h.hr).replace("heading"," {0,3}#{1,6} ").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",h._tag).getRegex();h.gfm.paragraph=k(h._paragraph).replace("hr",h.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("table",h.gfm.table).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",h._tag).getRegex();h.pedantic=y({},h.normal,{html:k(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",h._comment).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:D,paragraph:k(h.normal._paragraph).replace("hr",h.hr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",h.lheading).replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").getRegex()});const o={escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,autolink:/^<(scheme:[^\s\x00-\x1f<>]*|email)>/,url:D,tag:"^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",link:/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,reflink:/^!?\[(label)\]\[(ref)\]/,nolink:/^!?\[(ref)\](?:\[\])?/,reflinkSearch:"reflink|nolink(?!\\()",emStrong:{lDelim:/^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,rDelimAst:/^(?:[^_*\\]|\\.)*?\_\_(?:[^_*\\]|\\.)*?\*(?:[^_*\\]|\\.)*?(?=\_\_)|(?:[^*\\]|\\.)+(?=[^*])|[punct_](\*+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|(?:[^punct*_\s\\]|\\.)(\*+)(?=[^punct*_\s])/,rDelimUnd:/^(?:[^_*\\]|\\.)*?\*\*(?:[^_*\\]|\\.)*?\_(?:[^_*\\]|\\.)*?(?=\*\*)|(?:[^_\\]|\\.)+(?=[^_])|[punct*](\_+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/},code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,br:/^( {2,}|\\)\n(?!\s*$)/,del:D,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,punctuation:/^([\spunctuation])/};o._punctuation="!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~";o.punctuation=k(o.punctuation).replace(/punctuation/g,o._punctuation).getRegex();o.blockSkip=/\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g;o.escapedEmSt=/(?:^|[^\\])(?:\\\\)*\\[*_]/g;o._comment=k(h._comment).replace("(?:-->|$)","-->").getRegex();o.emStrong.lDelim=k(o.emStrong.lDelim).replace(/punct/g,o._punctuation).getRegex();o.emStrong.rDelimAst=k(o.emStrong.rDelimAst,"g").replace(/punct/g,o._punctuation).getRegex();o.emStrong.rDelimUnd=k(o.emStrong.rDelimUnd,"g").replace(/punct/g,o._punctuation).getRegex();o._escapes=/\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;o._scheme=/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;o._email=/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;o.autolink=k(o.autolink).replace("scheme",o._scheme).replace("email",o._email).getRegex();o._attribute=/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;o.tag=k(o.tag).replace("comment",o._comment).replace("attribute",o._attribute).getRegex();o._label=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;o._href=/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/;o._title=/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;o.link=k(o.link).replace("label",o._label).replace("href",o._href).replace("title",o._title).getRegex();o.reflink=k(o.reflink).replace("label",o._label).replace("ref",h._label).getRegex();o.nolink=k(o.nolink).replace("ref",h._label).getRegex();o.reflinkSearch=k(o.reflinkSearch,"g").replace("reflink",o.reflink).replace("nolink",o.nolink).getRegex();o.normal=y({},o);o.pedantic=y({},o.normal,{strong:{start:/^__|\*\*/,middle:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,endAst:/\*\*(?!\*)/g,endUnd:/__(?!_)/g},em:{start:/^_|\*/,middle:/^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,endAst:/\*(?!\*)/g,endUnd:/_(?!_)/g},link:k(/^!?\[(label)\]\((.*?)\)/).replace("label",o._label).getRegex(),reflink:k(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",o._label).getRegex()});o.gfm=y({},o.normal,{escape:k(o.escape).replace("])","~|])").getRegex(),_extended_email:/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,url:/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,_backpedal:/(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/});o.gfm.url=k(o.gfm.url,"i").replace("email",o.gfm._extended_email).getRegex();o.breaks=y({},o.gfm,{br:k(o.br).replace("{2,}","*").getRegex(),text:k(o.gfm.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()});function ze(l){return l.replace(/---/g,"\u2014").replace(/--/g,"\u2013").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1\u2018").replace(/'/g,"\u2019").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1\u201C").replace(/"/g,"\u201D").replace(/\.{3}/g,"\u2026")}function J(l){let e="",t,n;const i=l.length;for(t=0;t<i;t++)n=l.charCodeAt(t),Math.random()>.5&&(n="x"+n.toString(16)),e+="&#"+n+";";return e}class R{constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||L,this.options.tokenizer=this.options.tokenizer||new O,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const t={block:h.normal,inline:o.normal};this.options.pedantic?(t.block=h.pedantic,t.inline=o.pedantic):this.options.gfm&&(t.block=h.gfm,this.options.breaks?t.inline=o.breaks:t.inline=o.gfm),this.tokenizer.rules=t}static get rules(){return{block:h,inline:o}}static lex(e,t){return new R(t).lex(e)}static lexInline(e,t){return new R(t).inlineTokens(e)}lex(e){e=e.replace(/\r\n|\r/g,`
`),this.blockTokens(e,this.tokens);let t;for(;t=this.inlineQueue.shift();)this.inlineTokens(t.src,t.tokens);return this.tokens}blockTokens(e,t=[]){this.options.pedantic?e=e.replace(/\t/g,"    ").replace(/^ +$/gm,""):e=e.replace(/^( *)(\t+)/gm,(a,c,g)=>c+"    ".repeat(g.length));let n,i,s,r;for(;e;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some(a=>(n=a.call({lexer:this},e,t))?(e=e.substring(n.raw.length),t.push(n),!0):!1))){if(n=this.tokenizer.space(e)){e=e.substring(n.raw.length),n.raw.length===1&&t.length>0?t[t.length-1].raw+=`
`:t.push(n);continue}if(n=this.tokenizer.code(e)){e=e.substring(n.raw.length),i=t[t.length-1],i&&(i.type==="paragraph"||i.type==="text")?(i.raw+=`
`+n.raw,i.text+=`
`+n.text,this.inlineQueue[this.inlineQueue.length-1].src=i.text):t.push(n);continue}if(n=this.tokenizer.fences(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.heading(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.hr(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.blockquote(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.list(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.html(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.def(e)){e=e.substring(n.raw.length),i=t[t.length-1],i&&(i.type==="paragraph"||i.type==="text")?(i.raw+=`
`+n.raw,i.text+=`
`+n.raw,this.inlineQueue[this.inlineQueue.length-1].src=i.text):this.tokens.links[n.tag]||(this.tokens.links[n.tag]={href:n.href,title:n.title});continue}if(n=this.tokenizer.table(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.lheading(e)){e=e.substring(n.raw.length),t.push(n);continue}if(s=e,this.options.extensions&&this.options.extensions.startBlock){let a=1/0;const c=e.slice(1);let g;this.options.extensions.startBlock.forEach(function(u){g=u.call({lexer:this},c),typeof g=="number"&&g>=0&&(a=Math.min(a,g))}),a<1/0&&a>=0&&(s=e.substring(0,a+1))}if(this.state.top&&(n=this.tokenizer.paragraph(s))){i=t[t.length-1],r&&i.type==="paragraph"?(i.raw+=`
`+n.raw,i.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=i.text):t.push(n),r=s.length!==e.length,e=e.substring(n.raw.length);continue}if(n=this.tokenizer.text(e)){e=e.substring(n.raw.length),i=t[t.length-1],i&&i.type==="text"?(i.raw+=`
`+n.raw,i.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=i.text):t.push(n);continue}if(e){const a="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){let n,i,s,r=e,a,c,g;if(this.tokens.links){const u=Object.keys(this.tokens.links);if(u.length>0)for(;(a=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)u.includes(a[0].slice(a[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,a.index)+"["+X("a",a[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(a=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)r=r.slice(0,a.index)+"["+X("a",a[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;(a=this.tokenizer.rules.inline.escapedEmSt.exec(r))!=null;)r=r.slice(0,a.index+a[0].length-2)+"++"+r.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex),this.tokenizer.rules.inline.escapedEmSt.lastIndex--;for(;e;)if(c||(g=""),c=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some(u=>(n=u.call({lexer:this},e,t))?(e=e.substring(n.raw.length),t.push(n),!0):!1))){if(n=this.tokenizer.escape(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.tag(e)){e=e.substring(n.raw.length),i=t[t.length-1],i&&n.type==="text"&&i.type==="text"?(i.raw+=n.raw,i.text+=n.text):t.push(n);continue}if(n=this.tokenizer.link(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(n.raw.length),i=t[t.length-1],i&&n.type==="text"&&i.type==="text"?(i.raw+=n.raw,i.text+=n.text):t.push(n);continue}if(n=this.tokenizer.emStrong(e,r,g)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.codespan(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.br(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.del(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.autolink(e,J)){e=e.substring(n.raw.length),t.push(n);continue}if(!this.state.inLink&&(n=this.tokenizer.url(e,J))){e=e.substring(n.raw.length),t.push(n);continue}if(s=e,this.options.extensions&&this.options.extensions.startInline){let u=1/0;const w=e.slice(1);let d;this.options.extensions.startInline.forEach(function(p){d=p.call({lexer:this},w),typeof d=="number"&&d>=0&&(u=Math.min(u,d))}),u<1/0&&u>=0&&(s=e.substring(0,u+1))}if(n=this.tokenizer.inlineText(s,ze)){e=e.substring(n.raw.length),n.raw.slice(-1)!=="_"&&(g=n.raw.slice(-1)),c=!0,i=t[t.length-1],i&&i.type==="text"?(i.raw+=n.raw,i.text+=n.text):t.push(n);continue}if(e){const u="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(u);break}else throw new Error(u)}}return t}}class U{constructor(e){this.options=e||L}code(e,t,n){const i=(t||"").match(/\S*/)[0];if(this.options.highlight){const s=this.options.highlight(e,i);s!=null&&s!==e&&(n=!0,e=s)}return e=e.replace(/\n$/,"")+`
`,i?'<pre><code class="'+this.options.langPrefix+x(i,!0)+'">'+(n?e:x(e,!0))+`</code></pre>
`:"<pre><code>"+(n?e:x(e,!0))+`</code></pre>
`}blockquote(e){return`<blockquote>
${e}</blockquote>
`}html(e){return e}heading(e,t,n,i){if(this.options.headerIds){const s=this.options.headerPrefix+i.slug(n);return`<h${t} id="${s}">${e}</h${t}>
`}return`<h${t}>${e}</h${t}>
`}hr(){return this.options.xhtml?`<hr/>
`:`<hr>
`}list(e,t,n){const i=t?"ol":"ul",s=t&&n!==1?' start="'+n+'"':"";return"<"+i+s+`>
`+e+"</"+i+`>
`}listitem(e){return`<li>${e}</li>
`}checkbox(e){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"'+(this.options.xhtml?" /":"")+"> "}paragraph(e){return`<p>${e}</p>
`}table(e,t){return t&&(t=`<tbody>${t}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+t+`</table>
`}tablerow(e){return`<tr>
${e}</tr>
`}tablecell(e,t){const n=t.header?"th":"td";return(t.align?`<${n} align="${t.align}">`:`<${n}>`)+e+`</${n}>
`}strong(e){return`<strong>${e}</strong>`}em(e){return`<em>${e}</em>`}codespan(e){return`<code>${e}</code>`}br(){return this.options.xhtml?"<br/>":"<br>"}del(e){return`<del>${e}</del>`}link(e,t,n){if(e=H(this.options.sanitize,this.options.baseUrl,e),e===null)return n;let i='<a href="'+x(e)+'"';return t&&(i+=' title="'+t+'"'),i+=">"+n+"</a>",i}image(e,t,n){if(e=H(this.options.sanitize,this.options.baseUrl,e),e===null)return n;let i=`<img src="${e}" alt="${n}"`;return t&&(i+=` title="${t}"`),i+=this.options.xhtml?"/>":">",i}text(e){return e}}class K{strong(e){return e}em(e){return e}codespan(e){return e}del(e){return e}html(e){return e}text(e){return e}link(e,t,n){return""+n}image(e,t,n){return""+n}br(){return""}}class Y{constructor(){this.seen={}}serialize(e){return e.toLowerCase().trim().replace(/<[!\/a-z].*?>/ig,"").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,"").replace(/\s/g,"-")}getNextSafeSlug(e,t){let n=e,i=0;if(this.seen.hasOwnProperty(n)){i=this.seen[e];do i++,n=e+"-"+i;while(this.seen.hasOwnProperty(n))}return t||(this.seen[e]=i,this.seen[n]=0),n}slug(e,t={}){const n=this.serialize(e);return this.getNextSafeSlug(n,t.dryrun)}}class ${constructor(e){this.options=e||L,this.options.renderer=this.options.renderer||new U,this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new K,this.slugger=new Y}static parse(e,t){return new $(t).parse(e)}static parseInline(e,t){return new $(t).parseInline(e)}parse(e,t=!0){let n="",i,s,r,a,c,g,u,w,d,p,z,_,A,m,b,B,I,S,T;const E=e.length;for(i=0;i<E;i++){if(p=e[i],this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[p.type]&&(T=this.options.extensions.renderers[p.type].call({parser:this},p),T!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(p.type))){n+=T||"";continue}switch(p.type){case"space":continue;case"hr":{n+=this.renderer.hr();continue}case"heading":{n+=this.renderer.heading(this.parseInline(p.tokens),p.depth,F(this.parseInline(p.tokens,this.textRenderer)),this.slugger);continue}case"code":{n+=this.renderer.code(p.text,p.lang,p.escaped);continue}case"table":{for(w="",u="",a=p.header.length,s=0;s<a;s++)u+=this.renderer.tablecell(this.parseInline(p.header[s].tokens),{header:!0,align:p.align[s]});for(w+=this.renderer.tablerow(u),d="",a=p.rows.length,s=0;s<a;s++){for(g=p.rows[s],u="",c=g.length,r=0;r<c;r++)u+=this.renderer.tablecell(this.parseInline(g[r].tokens),{header:!1,align:p.align[r]});d+=this.renderer.tablerow(u)}n+=this.renderer.table(w,d);continue}case"blockquote":{d=this.parse(p.tokens),n+=this.renderer.blockquote(d);continue}case"list":{for(z=p.ordered,_=p.start,A=p.loose,a=p.items.length,d="",s=0;s<a;s++)b=p.items[s],B=b.checked,I=b.task,m="",b.task&&(S=this.renderer.checkbox(B),A?b.tokens.length>0&&b.tokens[0].type==="paragraph"?(b.tokens[0].text=S+" "+b.tokens[0].text,b.tokens[0].tokens&&b.tokens[0].tokens.length>0&&b.tokens[0].tokens[0].type==="text"&&(b.tokens[0].tokens[0].text=S+" "+b.tokens[0].tokens[0].text)):b.tokens.unshift({type:"text",text:S}):m+=S),m+=this.parse(b.tokens,A),d+=this.renderer.listitem(m,I,B);n+=this.renderer.list(d,z,_);continue}case"html":{n+=this.renderer.html(p.text);continue}case"paragraph":{n+=this.renderer.paragraph(this.parseInline(p.tokens));continue}case"text":{for(d=p.tokens?this.parseInline(p.tokens):p.text;i+1<E&&e[i+1].type==="text";)p=e[++i],d+=`
`+(p.tokens?this.parseInline(p.tokens):p.text);n+=t?this.renderer.paragraph(d):d;continue}default:{const Z='Token with "'+p.type+'" type was not found.';if(this.options.silent){console.error(Z);return}else throw new Error(Z)}}}return n}parseInline(e,t){t=t||this.renderer;let n="",i,s,r;const a=e.length;for(i=0;i<a;i++){if(s=e[i],this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[s.type]&&(r=this.options.extensions.renderers[s.type].call({parser:this},s),r!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(s.type))){n+=r||"";continue}switch(s.type){case"escape":{n+=t.text(s.text);break}case"html":{n+=t.html(s.text);break}case"link":{n+=t.link(s.href,s.title,this.parseInline(s.tokens,t));break}case"image":{n+=t.image(s.href,s.title,s.text);break}case"strong":{n+=t.strong(this.parseInline(s.tokens,t));break}case"em":{n+=t.em(this.parseInline(s.tokens,t));break}case"codespan":{n+=t.codespan(s.text);break}case"br":{n+=t.br();break}case"del":{n+=t.del(this.parseInline(s.tokens,t));break}case"text":{n+=t.text(s.text);break}default:{const c='Token with "'+s.type+'" type was not found.';if(this.options.silent){console.error(c);return}else throw new Error(c)}}}return n}}function f(l,e,t){if(typeof l=="undefined"||l===null)throw new Error("marked(): input parameter is undefined or null");if(typeof l!="string")throw new Error("marked(): input parameter is of type "+Object.prototype.toString.call(l)+", string expected");if(typeof e=="function"&&(t=e,e=null),e=y({},f.defaults,e||{}),W(e),t){const i=e.highlight;let s;try{s=R.lex(l,e)}catch(c){return t(c)}const r=function(c){let g;if(!c)try{e.walkTokens&&f.walkTokens(s,e.walkTokens),g=$.parse(s,e)}catch(u){c=u}return e.highlight=i,c?t(c):t(null,g)};if(!i||i.length<3||(delete e.highlight,!s.length))return r();let a=0;f.walkTokens(s,function(c){c.type==="code"&&(a++,setTimeout(()=>{i(c.text,c.lang,function(g,u){if(g)return r(g);u!=null&&u!==c.text&&(c.text=u,c.escaped=!0),a--,a===0&&r()})},0))}),a===0&&r();return}function n(i){if(i.message+=`
Please report this to https://github.com/markedjs/marked.`,e.silent)return"<p>An error occurred:</p><pre>"+x(i.message+"",!0)+"</pre>";throw i}try{const i=R.lex(l,e);if(e.walkTokens){if(e.async)return Promise.all(f.walkTokens(i,e.walkTokens)).then(()=>$.parse(i,e)).catch(n);f.walkTokens(i,e.walkTokens)}return $.parse(i,e)}catch(i){n(i)}}f.options=f.setOptions=function(l){return y(f.defaults,l),oe(f.defaults),f};f.getDefaults=Q;f.defaults=L;f.use=function(...l){const e=y({},...l),t=f.defaults.extensions||{renderers:{},childTokens:{}};let n;l.forEach(i=>{if(i.extensions&&(n=!0,i.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if(s.renderer){const r=t.renderers?t.renderers[s.name]:null;r?t.renderers[s.name]=function(...a){let c=s.renderer.apply(this,a);return c===!1&&(c=r.apply(this,a)),c}:t.renderers[s.name]=s.renderer}if(s.tokenizer){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");t[s.level]?t[s.level].unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}s.childTokens&&(t.childTokens[s.name]=s.childTokens)})),i.renderer){const s=f.defaults.renderer||new U;for(const r in i.renderer){const a=s[r];s[r]=(...c)=>{let g=i.renderer[r].apply(s,c);return g===!1&&(g=a.apply(s,c)),g}}e.renderer=s}if(i.tokenizer){const s=f.defaults.tokenizer||new O;for(const r in i.tokenizer){const a=s[r];s[r]=(...c)=>{let g=i.tokenizer[r].apply(s,c);return g===!1&&(g=a.apply(s,c)),g}}e.tokenizer=s}if(i.walkTokens){const s=f.defaults.walkTokens;e.walkTokens=function(r){let a=[];return a.push(i.walkTokens.call(this,r)),s&&(a=a.concat(s.call(this,r))),a}}n&&(e.extensions=t),f.setOptions(e)})};f.walkTokens=function(l,e){let t=[];for(const n of l)switch(t=t.concat(e.call(f,n)),n.type){case"table":{for(const i of n.header)t=t.concat(f.walkTokens(i.tokens,e));for(const i of n.rows)for(const s of i)t=t.concat(f.walkTokens(s.tokens,e));break}case"list":{t=t.concat(f.walkTokens(n.items,e));break}default:f.defaults.extensions&&f.defaults.extensions.childTokens&&f.defaults.extensions.childTokens[n.type]?f.defaults.extensions.childTokens[n.type].forEach(function(i){t=t.concat(f.walkTokens(n[i],e))}):n.tokens&&(t=t.concat(f.walkTokens(n.tokens,e)))}return t};f.parseInline=function(l,e){if(typeof l=="undefined"||l===null)throw new Error("marked.parseInline(): input parameter is undefined or null");if(typeof l!="string")throw new Error("marked.parseInline(): input parameter is of type "+Object.prototype.toString.call(l)+", string expected");e=y({},f.defaults,e||{}),W(e);try{const t=R.lexInline(l,e);return e.walkTokens&&f.walkTokens(t,e.walkTokens),$.parseInline(t,e)}catch(t){if(t.message+=`
Please report this to https://github.com/markedjs/marked.`,e.silent)return"<p>An error occurred:</p><pre>"+x(t.message+"",!0)+"</pre>";throw t}};f.Parser=$;f.parser=$.parse;f.Renderer=U;f.TextRenderer=K;f.Lexer=R;f.lexer=R.lex;f.Tokenizer=O;f.Slugger=Y;f.parse=f;$.parse;R.lex;const Se={setup(){se(()=>{l()});async function l(){await ne.getChangelog()}return{logs:re(()=>ie.changelogs.filter(e=>e.body)),parseMarkdown(e){if(e)return f.parse(e)}}}},Te={class:"container-fluid pt-3"},Re={class:"d-flex justify-content-between"},Ae={class:"text-start bg-primary text-light rounded-pill px-3"},Ie={class:"text-info darken-20"},Ee=["innerHTML"],Ce=["href"],Le=C("i",{class:"mdi mdi-github"},null,-1),Be=[Le];function Ze(l,e,t,n,i,s){return M(),j("div",Te,[(M(!0),j(le,null,ae(n.logs,r=>(M(),j("div",{class:"row p-2 border border-bottom my-1 justify-content-end",key:r},[C("div",Re,[C("h4",Ae,P(r.title),1),C("div",Ie,P(r.date.toLocaleString()),1)]),C("p",{class:"text-primary p-3 ps-5",innerHTML:n.parseMarkdown(r.body)},null,8,Ee),C("a",{class:"col-1 text-danger text-end",target:"_blank",href:r.link},Be,8,Ce)]))),128))])}var qe=te(Se,[["render",Ze]]);export{qe as default};
