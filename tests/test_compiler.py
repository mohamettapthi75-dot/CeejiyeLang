import pytest
from ceejiye.compiler import Compiler
import ast

def test_compiler_basic():
    c = Compiler()
    source = "daabac('Hi')"
    py = c.compile_to_python(source)
    assert "print('Hi')" in py
    ast.parse(py)

def test_compiler_nested():
    c = Compiler()
    source = """
hadii run:
    wareeg i ku_jira xaddid(5):
        daabac(i)
"""
    py = c.compile_to_python(source)
    assert "if True:" in py
    assert "for i in range(5):" in py
    ast.parse(py)

def test_compiler_syntax_error():
    c = Compiler()
    source = "hadii run" # Missing colon
    with pytest.raises(SyntaxError):
        c.compile_to_python(source)
