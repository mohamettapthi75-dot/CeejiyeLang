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
╔═══════════════════════════════════════╗
║         CeejiyeLang v1.0.0            ║
║   Luuqadda Programming-ka ee Af-Soomaali║
╚═══════════════════════════════════════╝
"""

class REPL:
    def __init__(self):
        self.interpreter = Interpreter()
        self.transpiler = Transpiler()
        self.session = PromptSession(history=FileHistory('.ceejiye_history'))

    def start(self):
        console.print(Panel(LOGO, style="bold cyan"))
        console.print("[yellow]Qor 'bax' si aad uga baxdo, 'caawi' si aad u hesho caawinaad.[/yellow]\n")

        while True:
            try:
                # Use custom Somali lexer for highlighting
                text = self.session.prompt("««« ", lexer=PygmentsLexer(CeejiyeLexer))

                if text.strip() == "bax":
                    break
                if not text.strip():
                    continue

                # Check for multiline (simple colon check)
                if text.strip().endswith(':'):
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
