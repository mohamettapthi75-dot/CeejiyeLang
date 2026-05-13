import pytest
from ceejiye.repl import REPL
from unittest.mock import MagicMock, patch

def test_repl_exit_keywords():
    with patch('ceejiye.repl.PromptSession') as mock_session:
        # Mock session.prompt to return 'ka_bax' on first call
        mock_instance = mock_session.return_value
        mock_instance.prompt.side_effect = ['ka_bax']

        repl = REPL()
        # This should finish immediately due to 'ka_bax'
        repl.start()

        assert mock_instance.prompt.call_count == 1

def test_repl_multiline_trigger():
    with patch('ceejiye.repl.PromptSession') as mock_session:
        mock_instance = mock_session.return_value
        # 1. Start a function
        # 2. Add a body line
        # 3. Add an empty line to finish block
        # 4. Exit
        mock_instance.prompt.side_effect = ['shaqo test():', 'daabac("Hi")', '', 'ka_bax']

        repl = REPL()
        with patch.object(repl.interpreter, 'run_code') as mock_run:
            repl.start()
            # run_code should be called with the combined multiline string
            # and then there's an implicit call for the empty line? No, my code skips empty lines.
            # Wait, 'ka_bax' is handled before run_code.
            mock_run.assert_called_once()
            args, _ = mock_run.call_args
            assert 'shaqo test():\ndaabac("Hi")' in args[0]

def test_repl_clear_command():
    with patch('ceejiye.repl.PromptSession') as mock_session:
        mock_instance = mock_session.return_value
        mock_instance.prompt.side_effect = ['gudi', 'ka_bax']

        repl = REPL()
        with patch('click.clear') as mock_clear:
            repl.start()
            mock_clear.assert_called_once()
