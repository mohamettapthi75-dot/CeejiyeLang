# 🇸🇴 CeejiyeLang v1.0

**CeejiyeLang** is a modern, beginner-friendly programming language inspired by Python, but written entirely using Somali syntax. It is designed to help Somali students worldwide learn the fundamentals of programming in their native language.

```
╔═══════════════════════════════════════╗
║          CeejiyeLang v1.0             ║
║   Luuqadda Programming-ka ee Af-Soomaali║
╚═══════════════════════════════════════╝
```

## ✨ Features
- **Somali Keywords**: Replace standard programming keywords with intuitive Somali equivalents.
- **Python-Powered**: Runs on top of Python, making it fast and reliable.
- **Somali Errors**: Readable and educational error messages in Somali.
- **Interactive REPL**: A colorful terminal shell with history and syntax highlighting.
- **Termux & Linux Support**: Works perfectly on mobile (Termux) and desktop environments.

## 🚀 Quick Start

### Installation
To install CeejiyeLang on Linux or Termux, run:
```bash
bash install.sh
```
Or via pip:
```bash
pip install .
```

### Usage
Run a script:
```bash
ceejiye run examples/calculator.cee
```

Start the interactive shell:
```bash
ceejiye
```

## 📖 Syntax Guide

| Somali | Python |
| :--- | :--- |
| `daabac` | `print` |
| `geli` | `input` |
| `hadii` | `if` |
| `kale` | `else` |
| `hadii_kale` | `elif` |
| `inta` | `while` |
| `wareeg` | `for` |
| `shaqo` | `def` |
| `celi` | `return` |
| `run` | `True` |
| `been` | `False` |

### Example Code
```python
magac = geli("Magacaga: ")

hadii magac == "Ceejiye":
    daabac("Soo dhawow!")
kale:
    daabac("Asc,", magac)
```

## 📁 Project Structure
- `ceejiye/`: Core interpreter logic.
- `examples/`: Sample programs to get you started.
- `std/`: Somali standard library.
- `docs/`: Detailed documentation.

## 🤝 Contributing
Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
