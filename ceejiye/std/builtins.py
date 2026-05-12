import math

# Somali aliases for built-in functions
daabac = print
geli = input
dherer = len
tiro = int
qoraal = str
liis = list
qaamuus = dict
sabbeeye = float
kala_guur = range
nooca = type

# Additional useful built-ins
xisaab = math

def caawi():
    from rich.console import Console
    from rich.table import Table

    console = Console()
    table = Table(title="CeejiyeLang Ereyada Muhiimka ah")

    table.add_column("Soomaali", style="cyan")
    table.add_column("Python", style="magenta")
    table.add_column("Sharaxaad", style="green")

    keywords = [
        ("daabac", "print", "Qoraal soo saar"),
        ("geli", "input", "Macluumaad weydii"),
        ("hadii", "if", "Haddii xaalad jirto"),
        ("kale", "else", "Haddii kale"),
        ("inta", "while", "Ilaa ay ka dhammaanayso"),
        ("wareeg", "for", "Ku wareeg liis"),
        ("shaqo", "def", "Samee function"),
        ("celi", "return", "Natiijo soo celi"),
        ("run/been", "True/False", "Xaqiiq ama Been"),
        ("maran", "None", "Waxba"),
    ]

    for som, py, desc in keywords:
        table.add_row(som, py, desc)

    console.print(table)
