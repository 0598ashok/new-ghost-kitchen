import os

def fix_file(filepath):
    with open(filepath, 'rb') as f:
        content = f.read()

    # Mappings of garbled byte sequences to their intended UTF-8 bytes
    # These are common sequences when UTF-8 is interpreted as CP1252/ISO-8859-1 and then re-saved.
    replacements = [
        (b'\xc3\xa2\xe2\x82\xac\xe2\x80\x94', b'\xe2\x80\x94'), # em dash
        (b'\xc3\xa2\xe2\x82\xac\xe2\x80\x93', b'\xe2\x80\x93'), # en dash
        (b'\xc3\xa2\xc5\x93\xe2\x80\x94', b'\xe2\x9c\x93'),    # checkmark
        (b'\xc3\xb0\xc5\xb8\xc2\xa5\xe2\x80\x93', b'\xf0\x9f\xa5\x97'), # salad/vegan
        (b'\xc3\xb0\xc5\xb8\xc5\x92\xc2\xbe', b'\xf0\x9f\x8c\xbe'),     # wheat
        (b'\xc3\xb0\xc5\xb8\xc2\xa5\xc2\xa9', b'\xf0\x9f\xa5\xa9'),     # meat
        (b'\xc3\xb0\xc5\xb8\xc2\xab\xe2\x82\xac', b'\xf0\x9f\xab\x80'), # heart
        (b'\xc3\xa2\xc5\x93\xe2\x80\x9c', b'\xe2\x9c\x93'),             # checkmark alt
        (b'\xc3\xa2\xc2\x80\xc2\x94', b'\xe2\x80\x94'),                 # em dash alt
        (b'\xc3\xa2\xc2\x80\xc2\x93', b'\xe2\x80\x93'),                 # en dash alt
    ]

    new_content = content
    for old, new in replacements:
        new_content = new_content.replace(old, new)

    if new_content != content:
        with open(filepath, 'wb') as f:
            f.write(new_content)
        print(f"Fixed: {filepath}")
    else:
        print(f"No changes: {filepath}")

if __name__ == "__main__":
    targets = [
        "d:/Final HTML Pages/Ghost-Kitchen/pages/services.html",
        "d:/Final HTML Pages/Ghost-Kitchen/pages/index.html",
        "d:/Final HTML Pages/Ghost-Kitchen/pages/about.html",
        "d:/Final HTML Pages/Ghost-Kitchen/pages/blog.html",
        "d:/Final HTML Pages/Ghost-Kitchen/pages/contact.html",
        "d:/Final HTML Pages/Ghost-Kitchen/pages/menu.html"
    ]
    for target in targets:
        if os.path.exists(target):
            fix_file(target)
