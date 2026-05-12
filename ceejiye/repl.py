import sys
from prompt_toolkit import PromptSession
from prompt_toolkit.history import FileHistory
from prompt_toolkit.lexers import PygmentsLexer
from rich.console import Console
from rich.panel import Panel
from .interpreter import Interpreter, translate_error
from .lexer import Transpiler
from .pygments_lexer import CeejiyeLexer

console = Console()

LOGO = """
╔══════════════════════════════════╗
║   CeejiyeLang v1.0.0 REPL       ║
║   Ku soo dhawaaw! Qor 'ka_bax'  ║
║   si aad u baxdo.                ║
╚══════════════════════════════════╝
"""

class REPL:
    def __init__(self):
        self.interpreter = Interpreter()
        self.transpiler = Transpiler()
        self.session = PromptSession(history=FileHistory('.ceejiye_history'))

    def start(self):
        console.print(LOGO, style="bold cyan")
        console.print("[yellow]Talo: Qor 'caawi' si aad u aragto ereyada muhiimka ah.[/yellow]\n")

        while True:
            try:
                # Use custom Somali lexer for highlighting
                text = self.session.prompt("««« ", lexer=PygmentsLexer(CeejiyeLexer))

                if text.strip() in ["bax", "ka_bax"]:
                    break
                if not text.strip():
                    continue

                # Check for multiline keywords followed by colon
                multiline_keywords = ['hadii', 'haddii', 'shaqo', 'inta', 'markale', 'wareeg', 'loo', 'fasalka', 'isku_day', 'kale', 'hadii_kale', 'khalad', 'qalad', 'qab', 'ugu_dambeyn', 'ugu_dambayn']

                is_multiline = False
                stripped = text.strip()
                if stripped.endswith(':'):
                    for kw in multiline_keywords:
                        if stripped.startswith(kw):
                            is_multiline = True
                            break

                if is_multiline:
                    lines = [text]
                    while True:
                        line = self.session.prompt("... ")
                        if not line.strip():
                            break
                        lines.append(line)
                    text = "\n".join(lines)

                self.interpreter.run_code(text)

            except KeyboardInterrupt:
                continue
            except EOFError:
                break
            except Exception:
                exc_type, exc_value, tb = sys.exc_info()
                error_msg, _ = translate_error(exc_type, exc_value, tb)
                console.print(f"[bold red]{error_msg}[/bold red]")

        console.print("\n[bold green]Nabad gelyo![/bold green]")

if __name__ == "__main__":
    repl = REPL()
    repl.start()
