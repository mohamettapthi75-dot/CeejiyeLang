import ast
from ceejiye.lexer import Transpiler

def test_get_ast():
    t = Transpiler()
    source = """
hadii run:
    daabac("Haye")
"""
    tree = t.get_ast(source)
    assert isinstance(tree, ast.Module)
    assert isinstance(tree.body[0], ast.If)

def test_ast_unparse():
    # Only if python >= 3.9
    import sys
    if sys.version_info >= (3, 9):
        t = Transpiler()
        source = "shaqo test():\n    celi 5"
        tree = t.get_ast(source)
        generated = ast.unparse(tree)
        assert "def test():" in generated
        assert "return 5" in generated
