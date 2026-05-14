let editor;
require.config({ paths: { vs: 'https://unpkg.com/monaco-editor@0.44.0/min/vs' } });
require(['vs/editor/editor.main'], function () {
    editor = monaco.editor.create(document.getElementById('editor'), {
        value: \`daabac("Salaan, Adduunka!")\`,
        language: 'python',
        theme: 'vs-dark',
        automaticLayout: true,
        fontSize: 14,
        minimap: { enabled: false }
    });
    monaco.languages.register({ id: 'ceejiye' });
    monaco.languages.setMonarchTokensProvider('ceejiye', {
        keywords: ['hadii', 'markale', 'loo', 'shaqo', 'soo_celi', 'daabac', 'gel'],
        tokenizer: {
            root: [
                [/#.*/, 'comment'],
                [/"[^"]*"/, 'string'],
                [/'[^']*'/, 'string'],
                [/\\b(hadii|markale|loo|shaqo|soo_celi|daabac|gel)\\b/, 'keyword'],
                [/\\b\\d+\\b/, 'number'],
            ]
        }
    });
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) { editor.setValue(atob(code)); }
});
document.getElementById('runBtn').addEventListener('click', runCode);
document.getElementById('transpileBtn').addEventListener('click', transpileCode);
document.getElementById('clearBtn').addEventListener('click', () => { editor.setValue(''); });
document.getElementById('shareBtn').addEventListener('click', () => {
    const code = btoa(editor.getValue());
    const url = window.location.origin + window.location.pathname + "?code=" + code;
    navigator.clipboard.writeText(url);
    alert("Xiriirka wadaagga waa la koobiyey!");
});
async function transpileCode() {
    const code = editor.getValue();
    const outputDiv = document.getElementById('pythonCode');
    try {
        const response = await fetch('/api/transpile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: code })
        });
        const data = await response.json();
        if (data.success) { outputDiv.textContent = data.python_code; }
        else { outputDiv.textContent = '❌ Qalad: ' + data.error; }
    } catch (error) { outputDiv.textContent = '❌ Khalad: ' + error.message; }
}
async function runCode() {
    const code = editor.getValue();
    const outputDiv = document.getElementById('output');
    outputDiv.textContent = '⏳ Sugaya...';
    try {
        const response = await fetch('/api/run', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: code })
        });
        const data = await response.json();
        if (data.success) { outputDiv.textContent = data.output || '(Wax output ah ma jiro)'; }
        else { outputDiv.textContent = '❌ Qalad:\\n' + data.error; }
    } catch (error) { outputDiv.textContent = '❌ Khalad: ' + error.message; }
}
