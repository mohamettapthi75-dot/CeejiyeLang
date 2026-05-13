from ceejiye.stdlib import STDLIB

def test_stdlib_existence():
    assert 'daabac' in STDLIB
    assert 'geli' in STDLIB
    assert 'tiro' in STDLIB
    assert 'wareejin' in STDLIB

def test_stdlib_functionality():
    assert STDLIB['tiro']("5") == 5
    assert STDLIB['dherer']([1, 2, 3]) == 3
    assert STDLIB['isku_xidh'](['a', 'b']) == 'ab'
