import re

KEYWORDS = {
    # Control flow
    'hadii': 'if',
    'haddii': 'if',
    'kale': 'else',
    'hadii_kale': 'elif',
    'inta': 'while',
    'markale': 'while',
    'wareeg': 'for',
    'loo': 'for',
    'shaqo': 'def',
    'soo_celi': 'return',
    'celi': 'return',
    'run': 'True',
    'been': 'False',
    'fasalka': 'class',
    'keen': 'import',
    'ka_soo_qaado': 'import',
    'jooji': 'break',
    'siiwad': 'continue',
    'sii_wad': 'continue',
    'isku_day': 'try',
    'qalad': 'except',
    'khalad': 'except',
    'qab': 'except',
    'ugu_dambeyn': 'finally',
    'ugu_dambayn': 'finally',
    'dhaaf': 'pass',
    'la_dhaaf': 'pass',
    'mar': 'pass',
    'hubi': 'assert',
    'dhal': 'yield',
    'kici': 'raise',
    'kor_u_qaad': 'raise',
    'tirtir': 'del',
    'guud': 'global',
    'iyo': 'and',
    'ama': 'or',
    'maaha': 'not',
    'ma_aha': 'is not',
    'ku_jira': 'in',
    'kuma_jira': 'not in',
    'waa': 'is',
    'eber': 'None',
    'waxba': 'None',
    'maran': 'None',
    'u_yahay': '==',
    'kama_yahay': '!=',
    'ka_weyn': '>',
    'ka_yar': '<',
    'ka_weyn_ama_lamida': '>=',
    'ka_yar_ama_lamida': '<=',
    'ku_lacal': '+=',
    'ka_jar': '-=',
    'labajibbaar': '**',
    'ee': 'as',
    'lambar': 'lambda',
    'in': 'in',
}

BUILTINS = {
    'daabac': 'print',
    'geli': 'input',
    'gel': 'input',
    'nooc': 'type',
    'nooca': 'type',
    'dherer': 'len',
    'tiro': 'int',
    'jajab': 'float',
    'sabbeeye': 'float',
    'liis': 'list',
    'qoraal': 'str',
    'qaamuus': 'dict',
    'boole': 'bool',
    'kala_guur': 'range',
    'xidid': 'range',
    'xidh': 'range',
    'xaddid': 'range',
    'fur': 'open',
    'xir': 'close',
    'caawi': 'caawi',
    'xisaab': 'math',
}

class Transpiler:
    def __init__(self):
        # Sort keywords by length descending to avoid partial matches
        self.combined_map = {**KEYWORDS, **BUILTINS}
        self.sorted_keys = sorted(self.combined_map.keys(), key=len, reverse=True)

        # Regex to match strings, comments, or words
        # Robust pattern to handle multi-line strings and escaped quotes
        self.pattern = re.compile(
            r'("""[\s\S]*?"""|\'\'\'[\s\S]*?\'\'\'|' +
            r'\"(?:\\.|[^\"\\])*\"|\'(?:\\.|[^\'\\])*\'|' +
            r'#.*$|\b' + r'\b|\b'.join(map(re.escape, self.sorted_keys)) + r'\b)',
            re.MULTILINE
        )

    def transpile(self, source):
        if not source:
            return ""

        def replace(match):
            token = match.group(0)
            if token.startswith(('"', "'", '#')):
                return token
            return self.combined_map.get(token, token)

        return self.pattern.sub(replace, source)
