import sys
import traceback
import os
import re
import tokenize

# Use absolute import for when run as module, but handle it gracefully
try:
    from .lexer import Transpiler
    from .std.builtins import caawi
except ImportError:
    from lexer import Transpiler
    from std.builtins import caawi

ERROR_MAPPING = {
    'NameError': 'Magaca lama aqoonsan (doorsoome lama helin)',
    'SyntaxError': 'Hab-qoraalka ayaa khaldan',
    'TypeError': 'Nooca xogta ayaa khaldan',
    'ValueError': 'Qiimaha xogta ayaa khaldan',
    'IndexError': 'Tirada booska (index) ayaa ka baxsan xadka',
    'KeyError': 'Furaha (key) lama helin',
    'ZeroDivisionError': 'Eber looma qaybin karo',
    'ModuleNotFoundError': 'Qaybta (module) koodhka lama helin',
    'AttributeError': 'Sifada ama shaqada lama helin',
    'FileNotFoundError': 'Faylka lama helin',
    'IndentationError': 'Meel-fogeynta koodhka (indentation) ayaa khaldan',
}

def translate_error(exc_type, exc_value, tb):
    type_name = exc_type.__name__
    somali_type = ERROR_MAPPING.get(type_name, type_name)

    # Extract line number and file info
    stack = traceback.extract_tb(tb) if tb else []
    if stack:
        filename, line, func, text = stack[-1]
    else:
        filename = getattr(exc_value, 'filename', '<string>')
        line = getattr(exc_value, 'lineno', '?')

    if filename == '<string>': filename = "Ceejiye"

    error_msg = f"Khalad: Xariiqda {line} — {somali_type}"
    talo = ""

    # Add more details and Somali suggestions
    if type_name == 'NameError':
        match = re.search(r"name '(.+)' is not defined", str(exc_value))
        if match:
            var_name = match.group(1)
            error_msg = f"Khalad: Xariiqda {line} — magaca '{var_name}' lama aqoonsan"
            talo = f"Talo: Hubi inaad u qeexday doorsoome '{var_name}' ka hor isticmaalka."
    elif type_name == 'SyntaxError':
        line = getattr(exc_value, 'lineno', line)
        error_msg = f"Khalad: Xariiqda {line} — hab-qoraalka ayaa khaldan"
        talo = "Talo: Hubi kolonka (:), qaansooyinka, iyo ereyada muhiimka ah."
    elif type_name == 'ZeroDivisionError':
        talo = "Talo: Ha isku dayin inaad tiro u qaybiso eber (0)."
    elif type_name == 'IndentationError':
        talo = "Talo: Hubi in koodhku leeyahay meel-fogeyn isku mid ah (4 boos)."

    full_msg = f"\n{error_msg}"
    if talo: full_msg += f"\n{talo}"

    return full_msg, line

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
        try:
            from .compiler import Compiler
            compiler = Compiler()
            python_code = compiler.compile_to_python(source)
        except ImportError:
            # Fallback to transpiler if compiler not found
            python_code = self.transpiler.transpile(source)
        except (SyntaxError, IndentationError, tokenize.TokenError):
            exc_type, exc_value, tb = sys.exc_info()
            error_msg, line = translate_error(exc_type, exc_value, tb)
            print(f"\n{error_msg}")
            if filename != "<string>":
                print(f"Meesha: {filename}, Line {line}")
            return

        try:
            code_obj = compile(python_code, filename, 'exec')
            exec(code_obj, self.globals)
        except Exception:
            exc_type, exc_value, tb = sys.exc_info()
            error_msg, line = translate_error(exc_type, exc_value, tb)
            print(f"\n{error_msg}")
            if filename != "<string>":
                print(f"Meesha: {filename}, Line {line}")
