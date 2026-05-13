import math

# Somali-named built-in functions
STDLIB = {
    'daabac': print,
    'geli': input,
    'gel': input,
    'dherer': len,
    'tiro': int,
    'jajab': float,
    'qoraal': str,
    'liis': list,
    'nooc': type,
    'nooca': type,
    'wareejin': range,
    'kala_guur': range,
    'xidid': range,
    'xidh': range,
    'xaddid': range,
    'isku_xidh': ''.join,
    'kala_jar': str.split,
    'caawi': None, # Set in interpreter or repl
    'math': math
}

def caawi_v3():
    from rich.console import Console
    from rich.table import Table

    console = Console()
    table = Table(title="CeejiyeLang v3.0.0 Ereyada Muhiimka ah")

    table.add_column("Soomaali", style="cyan")
    table.add_column("Python", style="magenta")
    table.add_column("Sharaxaad", style="green")

    keywords = [
        ("daabac", "print", "Qoraal soo saar"),
        ("geli", "input", "Macluumaad weydii"),
        ("hadii", "if", "Haddii xaalad jirto"),
        ("kale", "else", "Haddii kale"),
        ("inta/markale", "while", "Ilaa ay ka dhammaanayso"),
        ("wareeg/loo", "for", "Ku wareeg liis"),
        ("shaqo", "def", "Samee function"),
        ("celi/soo_celi", "return", "Natiijo soo celi"),
        ("fasalka", "class", "Abuur class"),
        ("ka_soo_qaado", "import", "Module soo jiid"),
    ]

    for som, py, desc in keywords:
        table.add_row(som, py, desc)

    console.print(table)
