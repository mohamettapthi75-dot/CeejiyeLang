# 🇸🇴 CeejiyeLang v2.0.0

**CeejiyeLang** waa luuqad programming oo casri ah, looguna talagalay bilowga (beginners). Waxay ku dhisantahay luuqadda Python, laakiin ereyadeeda muhiimka ah (keywords) waxaa loo beddelay **Af-Soomaali**. Waxaa loogu talagalay inay ardayda Soomaaliyeed meel kasta oo ay joogaan u fududeyso barashada cilmiga Computer-ka.

```
╔═══════════════════════════════════════╗
║          CeejiyeLang v2.0.0           ║
║   Luuqadda Programming-ka ee Af-Soomaali║
╚═══════════════════════════════════════╝
```

---

## 🚀 Rakibaadda (Installation)

Waxaad ku rakibi kartaa CeejiyeLang deegaan kasta oo leh Python (Termux, Linux, macOS, ama Windows).

### 1. Termux (Android)
Fur Termux ka dibna qor amaradan:
```bash
pkg update && pkg upgrade -y
pkg install python git -y
git clone https://github.com/mohamettapthi75-dot/CeejiyeLang
cd CeejiyeLang
bash install.sh
```

### 2. Linux (Ubuntu/Debian)
Fur Terminal-ka ka dibna qor:
```bash
sudo apt update
sudo apt install python3 python3-pip git -y
git clone https://github.com/mohamettapthi75-dot/CeejiyeLang
cd CeejiyeLang
bash install.sh
```

### 3. Pip (Habka guud)
Haddii aad hore u haysato Python iyo Pip:
```bash
pip install .
```

---

## 🛠️ Sida loo isticmaalo (Usage)

Markaad rakibto ka dib, waxaad isticmaali kartaa amarka `ceejiye`.

### A. Terminal-ka Tooska ah (REPL)
Si aad u gasho meesha koodhka lagu tijaabiyo, qor:
```bash
ceejiye
```
**Tilmaamaha REPL-ka:**
- **Taageerada khadadka badan:** Markaad qorto `hadii`, `shaqo`, ama `wareeg` oo aad ku dhammaato `:`, REPL-ku wuxuu ku siinayaa fursad aad ku qorto khadad badan.
- **Prompt:** REPL-ku wuxuu isticmaalaa `ceeji> ` koodhka caadiga ah iyo `... >` khadadka xiriirka ah.
- **Nadiifin:** Qor `gudi` si aad u nadiifiso screen-ka.
- **Taariikhda koodhka:** Isticmaal fallaadhaha (↑ ↓) si aad u aragto koodhkii aad hore u qortay.
- **Caawinaad:** Qor `caawi` si aad u aragto ereyada muhiimka ah.
- **Ka bixitaanka:** Qor `ka_bax` ama `bax` si aad uga baxdo.

### B. Web Playground
Waxaad CeejiyeLang ku tijaabin kartaa biraawsarkaaga adigoon waxba rakibin:
[CeejiyeLang Web Playground](https://mohamettapthi75-dot.github.io/CeejiyeLang/playground/) (Tusaale ahaan - beddel haddii uu jiro link sax ah)

### C. VS Code Extension
Si aad u hesho "Syntax Highlighting" gudaha VS Code:
1. Nuqul ka samey galka `vscode-ceejiye/`.
2. Dhig galka extensions-ka ee VS Code (`~/.vscode/extensions/`).
3. Dib u bilow VS Code.

### D. Socodsiinta Faylka (.cee)
Haddii aad haysato fayl koodh ah oo ku dhammaanaya `.cee`, u socodsii sidatan:
```bash
ceejiye run examples/calculator.cee
```

---

## 📖 Barashada Luuqadda (Syntax Guide)

Halkan waxaa ku yaal tusaalooyinka ugu muhiimsan si aad u bilowdo:

| Af-Soomaali | Python | Sharaxaad |
| :--- | :--- | :--- |
| `daabac` | `print` | Qoraal soo saar |
| `geli` | `input` | Macluumaad weydii |
| `tiro` | `int` | Ka dhig tiro |
| `hadii` | `if` | Haddii xaalad jirto |
| `kale` | `else` | Haddii kale |
| `hadii_kale` | `elif` | Xaalad kale |
| `inta` | `while` | Ilaa ay ka dhammaanayso |
| `wareeg` | `for` | Ku wareeg liis |
| `shaqo` | `def` | Samee function |
| `celi` | `return` | Natiijo soo celi |
| `soo_celi` | `return` | Natiijo soo celi |
| `fasalka` | `class` | Qeexitaan class |
| `nafta` | `self` | Tixraaca shayga (optional) |
| `u_yahay` | `==` | Ma u yahay? |
| `kama_yahay` | `!=` | Ma ka duwan yahay? |
| `iyo` | `and` | Iyo |
| `ama` | `or` | Ama |
| `ku_lacal` | `+=` | Ku dar oo ku keydi |
| `ka_jar` | `-=` | Ka jar oo ku keydi |

### Tusaale Koodh ah:
```python
# Tani waa barnaamij yar
magac = geli("Magacaaga qor: ")

hadii magac == "Ceejiye":
    daabac("Soo dhawow abuuraha luuqadda!")
kale:
    daabac("Asc " + magac + ", ku soo dhawaaw barashada programming-ka!")
```

---

## 📁 Galalka Mashruuca
- `ceejiye/`: Koodhka rasmiga ah ee luuqadda.
- `examples/`: Barnaamijyo diyaarsan (Calculator, Chatbot, iwm).
- `tests/`: Koodhka lagu tijaabiyo luuqadda.

## 🤝 Ka qayb-qaadashada
Waan soo dhawaynaynaa qof kasta oo raba inuu horumariyo luuqadan. Fadlan akhri [CONTRIBUTING.md](CONTRIBUTING.md).

## 📜 Shatiga (License)
Mashruucan waxaa lagu daabacay shatiga MIT - fiiri [LICENSE](LICENSE).
