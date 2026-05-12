import pytest
from ceejiye.interpreter import Interpreter
import io
import contextlib
import os

def test_comprehensive_cee():
    interpreter = Interpreter()
    filepath = "tests/test_comprehensive.cee"

    f = io.StringIO()
    with contextlib.redirect_stdout(f):
        interpreter.run_file(filepath)

    output = f.getvalue()
    assert "Haa" in output
    assert "0" in output
    assert "1" in output
    assert "2" in output
    assert "Asc User" in output
    assert "X waa waxba" in output
    assert "Operators sax" in output
    assert "13" in output

def test_nested_blocks():
    interpreter = Interpreter()
    source = """
hadii run:
    wareeg i ku_jira kala_guur(2):
        hadii i u_yahay 0:
            daabac("Zero")
        kale:
            daabac("One")
"""
    f = io.StringIO()
    with contextlib.redirect_stdout(f):
        interpreter.run_code(source)

    output = f.getvalue()
    assert "Zero" in output
    assert "One" in output
