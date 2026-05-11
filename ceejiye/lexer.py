import re

KEYWORDS = {
    'hadii': 'if',
    'kale': 'else',
    'hadii_kale': 'elif',
    'inta': 'while',
    'wareeg': 'for',
    'shaqo': 'def',
    'celi': 'return',
    'run': 'True',
    'been': 'False',
    'nooc': 'class',
    'keen': 'import',
    'jooji': 'break',
    'siiwad': 'continue',
    'isku_day': 'try',
    'qalad': 'except',
    'ugu_dambeyn': 'finally',
    'dhaaf': 'pass',
    'hubi': 'assert',
    'dhal': 'yield',
    'kici': 'raise',
    'tirtir': 'del',
    'guud': 'global',
    'iyo': 'and',
    'ama': 'or',
    'maaha': 'not',
    'ku_jira': 'in',
    'waa': 'is',
    'eber': 'None',
}

BUILTINS = {
    'daabac': 'print',
    'geli': 'input',
    'dherer': 'len',
    'tiro': 'int',
    'qoraal': 'str',
    'liis': 'list',
    'qaamuus': 'dict',
    'sabbeeye': 'float',
    'kala_guur': 'range',
    'nooca': 'type',
    'caawi': 'caawi',
    'xisaab': 'math',
}

class Transpiler:
    def __init__(self):
        # Sort keywords by length descending to avoid partial matches
        self.combined_map = {**KEYWORDS, **BUILTINS}
        self.sorted_keys = sorted(self.combined_map.keys(), key=len, reverse=True)

        # Regex to match strings, comments, or words
        self.pattern = re.compile(
            r'(\"\"\"[\s\S]*?\"\"\"|\'\'\'[\s\S]*?\'\'\'|\".*?\"|\'.*?\'|#.*$|\b' + r'\b|\b'.join(map(re.escape, self.sorted_keys)) + r'\b)',
            re.MULTILINE
        )

    def transpile(self, source):
        def replace(match):
            token = match.group(0)
            if token.startswith(('"', "'", '#')):
                return token
            return self.combined_map.get(token, token)

        return self.pattern.sub(replace, source)
