import pytest
from ceejiye.interpreter import Interpreter
import io
import contextlib
import os

def test_keywords_cee():
    interpreter = Interpreter()
    filepath = "tests/test_keywords.cee"

    f = io.StringIO()
    with contextlib.redirect_stdout(f):
        interpreter.run_file(filepath)

    output = f.getvalue()
    assert "Hadii wuxuu shaqaynayaa" in output
    assert "hadii" in output
    assert "10" in output

def test_operators_cee():
    interpreter = Interpreter()
    filepath = "tests/test_operators.cee"

    f = io.StringIO()
    with contextlib.redirect_stdout(f):
        interpreter.run_file(filepath)

    output = f.getvalue()
    assert "Operators sax" in output
    assert "13" in output
    assert "Iyo/Ma-aha sax" in output

def test_nested_cee():
    interpreter = Interpreter()
    filepath = "tests/test_nested.cee"

    f = io.StringIO()
    with contextlib.redirect_stdout(f):
        interpreter.run_file(filepath)

    output = f.getvalue()
    assert "Deep nesting works!" in output

def test_v1_0_0_keywords_cee():
    interpreter = Interpreter()
    filepath = "tests/test_v1_0_0_keywords.cee"

    f = io.StringIO()
    with contextlib.redirect_stdout(f):
        interpreter.run_file(filepath)

    output = f.getvalue()
    assert "True False None" in output
    assert "8" in output
    assert "Qalad ayaa dhacay" in output
    assert "Dhammaadka isku dayga" in output
    assert "0" in output
    assert "1" in output
    assert "4.0" in output

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
