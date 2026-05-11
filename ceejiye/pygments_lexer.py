from pygments.lexer import RegexLexer, words
from pygments.token import Keyword, Name, String, Number, Operator, Comment

class CeejiyeLexer(RegexLexer):
    name = 'Ceejiye'
    aliases = ['ceejiye', 'cee']
    filenames = ['*.cee']

    # Somali keywords mapping to Python
    KEYWORDS = (
        'hadii', 'kale', 'hadii_kale', 'inta', 'wareeg', 'shaqo', 'celi',
        'run', 'been', 'nooc', 'keen', 'jooji', 'siiwad', 'isku_day', 'qalad',
        'ugu_dambeyn', 'dhaaf', 'hubi', 'dhal', 'kici', 'tirtir', 'guud',
        'iyo', 'ama', 'maaha', 'ku_jira', 'waa', 'eber'
    )

    BUILTINS = (
        'daabac', 'geli', 'dherer', 'tiro', 'qoraal', 'liis', 'qaamuus',
        'sabbeeye', 'kala_guur', 'nooca', 'caawi', 'xisaab'
    )

    tokens = {
        'root': [
            (r'#.*$', Comment.Single),
            (r'\"\"\"[\s\S]*?\"\"\"', String.Double),
            (r'\'\'\'[\s\S]*?\'\'\'', String.Single),
            (r'\"(.*?)\"', String.Double),
            (r'\'(.*?)\'', String.Single),
            (words(KEYWORDS, suffix=r'\b'), Keyword),
            (words(BUILTINS, suffix=r'\b'), Name.Builtin),
            (r'[0-9]+', Number.Integer),
            (r'[\+\-\*/%=<>!&|]+', Operator),
            (r'[a-zA-Z_][a-zA-Z0-9_]*', Name),
            (r'\s+', Name), # whitespace
        ]
    }
