import click
import sys
import os
from .interpreter import Interpreter
from .repl import REPL

@click.group(invoke_without_command=True)
@click.pass_context
@click.version_option(version='1.0.0', prog_name='CeejiyeLang')
def cli(ctx):
    """CeejiyeLang - Somali Programming Language."""
    if ctx.invoked_subcommand is None:
        # Check if a file was passed as a positional argument
        if len(sys.argv) > 1 and not sys.argv[1].startswith('-'):
            ctx.invoke(run, filename=sys.argv[1])
        else:
            ctx.invoke(repl)

@cli.command()
@click.argument('filename')
def run(filename):
    """Execute a .cee file."""
    if not filename.endswith('.cee'):
        click.echo(f"Digniin: Faylka '{filename}' ma laha kordhinta .cee")

    interpreter = Interpreter()
    interpreter.run_file(filename)

@cli.command()
def repl():
    """Start the interactive Somali REPL."""
    r = REPL()
    r.start()

def main():
    cli()

if __name__ == "__main__":
    main()
