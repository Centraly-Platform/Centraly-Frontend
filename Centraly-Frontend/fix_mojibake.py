import pathlib, re

broken = re.compile(r"[À-ÿ]{2,}")

fixed_count = 0
for path in pathlib.Path("src").rglob("*.ts*"):
    text = path.read_text(encoding="utf-8")
    def fix(m):
        try:
            return m.group(0).encode("latin1").decode("utf-8")
        except UnicodeDecodeError:
            return m.group(0)
    new_text = broken.sub(fix, text)
    if new_text != text:
        path.write_text(new_text, encoding="utf-8")
        fixed_count += 1
        print("fixed:", path)

print("Total files fixed by python script:", fixed_count)
