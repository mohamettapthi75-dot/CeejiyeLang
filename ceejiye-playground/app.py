from flask import Flask, render_template, request, jsonify
import sys
from io import StringIO
import os

# Adjust path to import ceejiye
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

try:
    from ceejiye.compiler import Compiler
except ImportError:
    from ceejiye.lexer import Transpiler as Compiler

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/transpile', methods=['POST'])
def transpile():
    try:
        data = request.json
        code = data.get('code', '')
        compiler = Compiler()
        if hasattr(compiler, 'compile_to_python'):
            python_code = compiler.compile_to_python(code)
        else:
            python_code = compiler.transpile(code)
        return jsonify({'success': True, 'python_code': python_code})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

@app.route('/api/run', methods=['POST'])
def run_code():
    try:
        data = request.json
        code = data.get('code', '')
        compiler = Compiler()
        if hasattr(compiler, 'compile_to_python'):
            python_code = compiler.compile_to_python(code)
        else:
            python_code = compiler.transpile(code)

        old_stdout = sys.stdout
        sys.stdout = StringIO()
        try:
            exec(python_code, {})
            output = sys.stdout.getvalue()
            sys.stdout = old_stdout
            return jsonify({'success': True, 'output': output})
        except Exception as e:
            sys.stdout = old_stdout
            return jsonify({'success': False, 'error': str(e)}), 400
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
