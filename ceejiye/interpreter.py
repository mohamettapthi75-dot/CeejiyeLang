import sys
import traceback
import os
import re

# Use absolute import for when run as module, but handle it gracefully
try:
    from .lexer import Transpiler
    from .std.builtins import caawi
except ImportError:
    from lexer import Transpiler
    from std.builtins import caawi

ERROR_MAPPING = {
    'NameError': 'Variable lama helin',
    'SyntaxError': 'Syntax khaldan',
    'TypeError': 'Nooca xogta qaldan',
    'ValueError': 'Qiimo qaldan',
    'IndexError': 'Index-ka waa la dhaafay',
    'KeyError': 'Key-ga lama helin',
    'ZeroDivisionError': 'Eber looma qaybin karo',
    'ModuleNotFoundError': 'Module-ka lama helin',
    'AttributeError': 'Sifada lama helin',
    'FileNotFoundError': 'Faylka lama helin',
    'IndentationError': 'Indentation-ka waa qaldan yahay',
}

def translate_error(exc_type, exc_value, tb):
    type_name = exc_type.__name__
    somali_type = ERROR_MAPPING.get(type_name, type_name)

    # Extract line number and file info
    stack = traceback.extract_tb(tb) if tb else []
    if stack:
        filename, line, func, text = stack[-1]
    else:
        # For SyntaxError, it might not have a traceback in the same way
        filename = getattr(exc_value, 'filename', '<string>')
        line = getattr(exc_value, 'lineno', '?')

    # Clean up filename if it's the internal execution string
    if filename == '<string>':
        filename = "Ceejiye"

    error_msg = f"Qalad: {somali_type}"

    # Add more details
    if type_name == 'NameError':
        match = re.search(r"name '(.+)' is not defined", str(exc_value))
        if match:
            error_msg = f"Qalad: Variable '{match.group(1)}' lama helin"
    elif type_name == 'SyntaxError':
        # Use exc_value.lineno directly for SyntaxError as it's more reliable
        line = getattr(exc_value, 'lineno', line)
        error_msg = f"Qalad: Syntax khaldan line {line}"
    elif type_name == 'ModuleNotFoundError':
        match = re.search(r"No module named '(.+)'", str(exc_value))
        if match:
            error_msg = f"Qalad: Module-ka '{match.group(1)}' lama helin"

    return error_msg, line

class Interpreter:
    def __init__(self):
        self.transpiler = Transpiler()
        import math
        self.globals = {
            '__name__': '__main__',
            '__builtins__': __builtins__,
            'caawi': caawi,
            'math': math
        }

    def run_file(self, filepath):
        if not os.path.exists(filepath):
            print(f"Qalad: Faylka '{filepath}' lama helin")
            return

        with open(filepath, 'r', encoding='utf-8') as f:
            source = f.read()

        self.run_code(source, filepath)

    def run_code(self, source, filename="<string>"):
        python_code = self.transpiler.transpile(source)
        try:
            # compile first to catch SyntaxErrors early
            code_obj = compile(python_code, filename, 'exec')
            exec(code_obj, self.globals)
        except Exception:
            exc_type, exc_value, tb = sys.exc_info()
            error_msg, line = translate_error(exc_type, exc_value, tb)
            print(f"\n{error_msg}")
            if filename != "<string>":
                print(f"Meesha: {filename}, Line {line}")
