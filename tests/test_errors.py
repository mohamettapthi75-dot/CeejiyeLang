from ceejiye.interpreter import Interpreter
import io
import contextlib

def test_syntax_error_line_number():
    interpreter = Interpreter()
    # hadii without colon is a SyntaxError in Python (after transpilation to 'if')
    source = "hadii run\n    daabac('Haye')"

    f = io.StringIO()
    with contextlib.redirect_stdout(f):
        interpreter.run_code(source, "test.cee")

    output = f.getvalue()
    assert "Khalad: Xariiqda 1 — hab-qoraalka ayaa khaldan" in output
    assert "Meesha: test.cee, Line 1" in output

def test_name_error_translation():
    interpreter = Interpreter()
    source = "daabac(magac_aan_jirin)"

    f = io.StringIO()
    with contextlib.redirect_stdout(f):
        interpreter.run_code(source, "test.cee")

    output = f.getvalue()
    assert "Khalad: Xariiqda 1 — magaca 'magac_aan_jirin' lama aqoonsan" in output
