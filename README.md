# 🇸🇴 CeejiyeLang v1.0

**CeejiyeLang** waa luuqad programming oo casri ah, looguna talagalay bilowga (beginners). Waxay ku dhisantahay luuqadda Python, laakiin ereyadeeda muhiimka ah (keywords) waxaa loo beddelay **Af-Soomaali**. Waxaa loogu talagalay inay ardayda Soomaaliyeed meel kasta oo ay joogaan u fududeyso barashada cilmiga Computer-ka.

```
╔═══════════════════════════════════════╗
║          CeejiyeLang v1.0             ║
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
git clone <URL_KA_REPOSIORY>
cd ceejiye-lang
bash install.sh
```

### 2. Linux (Ubuntu/Debian)
Fur Terminal-ka ka dibna qor:
```bash
sudo apt update
sudo apt install python3 python3-pip git -y
git clone <URL_KA_REPOSIORY>
cd ceejiye-lang
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
Halkaas waxaad ku qori kartaa koodhkaaga tusaale: `daabac("Asc Soomaaliya")`.

### B. Socodsiinta Faylka (.cee)
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
