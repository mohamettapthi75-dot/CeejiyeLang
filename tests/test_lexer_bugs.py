from ceejiye.lexer import Transpiler

def test_escaped_quotes():
    t = Transpiler()
    source = 'daabac("Wuxuu yiri \\"Haye\\"")'
    # Current lexer might fail here if it doesn't handle escaped quotes
    transpiled = t.transpile(source)
    assert 'print("Wuxuu yiri \\"Haye\\"")' in transpiled

def test_keyword_in_string():
    t = Transpiler()
    source = 'x = "hadii"'
    transpiled = t.transpile(source)
    assert 'x = "hadii"' in transpiled
    assert 'x = "if"' not in transpiled

def test_keyword_in_comment():
    t = Transpiler()
    source = '# hadii waa if\nx = 1'
    transpiled = t.transpile(source)
    assert '# hadii waa if' in transpiled

def test_multiline_string():
    t = Transpiler()
    source = '"""\nhadii\n"""'
    transpiled = t.transpile(source)
    assert '"""\nhadii\n"""' in transpiled
    assert 'if' not in transpiled

def test_escaped_quotes_failure():
    t = Transpiler()
    source = 'x = "Waa \\"hadii\\""'
    transpiled = t.transpile(source)
    assert 'x = "Waa \\"if\\""' not in transpiled
    assert 'x = "Waa \\"hadii\\""' in transpiled

def test_operators():
    t = Transpiler()
    source = 'hadii x u_yahay 5 ama y kama_yahay 10:'
    transpiled = t.transpile(source)
    assert 'if x == 5 or y != 10:' in transpiled

def test_word_boundaries():
    t = Transpiler()
    # hadiiyad starts with hadii
    source = 'hadiiyad = 5'
    transpiled = t.transpile(source)
    assert 'ifiyad' not in transpiled
    assert 'hadiiyad = 5' in transpiled
