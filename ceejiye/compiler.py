import ast
import tokenize
import io
import sys
from .lexer import KEYWORDS, BUILTINS

class Compiler:
    def __init__(self):
        self.combined_map = {**KEYWORDS, **BUILTINS}

    def compile_to_python(self, source):
        """
        Transpiles Somali code to Python by replacing tokens at the name level.
        This is safer than regex as it respects token types.
        """
        if not source:
            return ""

        result = []
        # tokenize.generate_tokens expects a callable that returns lines
        lines = io.StringIO(source).readlines
        token_gen = tokenize.generate_tokens(io.StringIO(source).readline)

        try:
            for toknum, tokval, start, end, line in token_gen:
                if toknum == tokenize.NAME:
                    # Replace Somali keyword/builtin with Python equivalent
                    new_val = self.combined_map.get(tokval, tokval)
                    result.append((toknum, new_val, start, end, line))
                else:
                    result.append((toknum, tokval, start, end, line))

            python_code = tokenize.untokenize(result)
            # Re-validate with ast.parse to catch logic errors before execution
            ast.parse(python_code)
            return python_code

        except tokenize.TokenError as e:
            msg, (lineno, col) = e.args
            raise SyntaxError(f"Khalad Token: {msg}", (None, lineno, col, source.splitlines()[lineno-1]))
        except SyntaxError as e:
            # We will handle translation in interpreter.py
            raise e

    def get_ast(self, source):
        python_code = self.compile_to_python(source)
        return ast.parse(python_code)
