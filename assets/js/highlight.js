import hljs from 'highlight.js/lib/core';

import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import bash from 'highlight.js/lib/languages/bash';
import xml from 'highlight.js/lib/languages/xml';
import ini from 'highlight.js/lib/languages/ini';
import yaml from 'highlight.js/lib/languages/yaml';
import markdown from 'highlight.js/lib/languages/markdown';
import python from 'highlight.js/lib/languages/python';
import go from 'highlight.js/lib/languages/go';
import rust from 'highlight.js/lib/languages/rust';
import typescript from 'highlight.js/lib/languages/typescript';
import c from 'highlight.js/lib/languages/c';


hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('json', json);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('shell', bash);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('ini', ini);
hljs.registerLanguage('toml', ini);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('md', markdown);
hljs.registerLanguage('python', python);
hljs.registerLanguage('Go', go);
hljs.registerLanguage('go', go);
hljs.registerLanguage('golang', go);
hljs.registerLanguage('Golang', go);
hljs.registerLanguage('rust', rust);
hljs.registerLanguage('Rust', rust);
hljs.registerLanguage('c', c);
hljs.registerLanguage('C', c);


document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('pre code:not(.language-mermaid)').forEach((block) => {
    hljs.highlightElement(block);
  });
});
