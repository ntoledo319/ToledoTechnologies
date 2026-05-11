import os
import re

def clean_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    # 1. Remove kinetic-text class
    # Matches ' kinetic-text', 'kinetic-text ', or 'kinetic-text'
    content = re.sub(r'\bkinetic-text\b', '', content)
    
    # 2. Remove style="--font-weight-peak: [0-9]*;"
    content = re.sub(r'style="--font-weight-peak:\s*[0-9]+;"', '', content)
    
    # 3. Remove font-mono from headings and text elements (except toledotech block)
    # We already did a broad sweep, now we need to fix it.
    # The sed command might have already removed most of them.
    
    # 4. Clean up class attributes: double spaces, leading/trailing spaces
    def clean_classes(match):
        classes = match.group(1)
        # Remove multiple spaces
        classes = re.sub(r'\s+', ' ', classes).strip()
        if not classes:
            return ''
        return f'class="{classes}"'
    
    content = re.sub(r'class="([^"]*)"', clean_classes, content)
    
    # 5. Remove empty style attributes
    content = re.sub(r'style="\s*"', '', content)
    
    # 6. Fix class:list in Astro
    def clean_class_list(match):
        content_list = match.group(1)
        # Remove multiple spaces inside strings in the list
        content_list = re.sub(r"'\s+'", "' '", content_list)
        content_list = re.sub(r'"\s+"', '" "', content_list)
        return f'class:list={match.group(1)}' # This is tricky, maybe skip for now or be careful
    
    # Just fix the specific cases we saw in Header.astro
    content = content.replace("'px-4 py-2 rounded-engine-pill text-sm  font-medium", "'px-4 py-2 rounded-engine-pill text-sm font-medium")
    content = content.replace("'block px-3 py-2 rounded-md text-base  font-medium", "'block px-3 py-2 rounded-md text-base font-medium")

    with open(filepath, 'w') as f:
        f.write(content)

def restore_footer():
    filepath = 'src/components/Footer.astro'
    if not os.path.exists(filepath): return
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Find the identity block and restore font-mono
    pattern = r'(<!-- Top: monospace identity block -->\s*<div class=")\s*(text-sm mb-10">)'
    content = re.sub(pattern, r'\1font-mono \2', content)
    
    with open(filepath, 'w') as f:
        f.write(content)

def clean_global_css():
    filepath = 'src/styles/global.css'
    if not os.path.exists(filepath): return
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Remove .kinetic-text rule
    content = re.sub(r'\.kinetic-text\s*\{[^}]*\}', '', content)
    
    with open(filepath, 'w') as f:
        f.write(content)

# Process all .astro files in src
for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith('.astro'):
            clean_file(os.path.join(root, file))

restore_footer()
clean_global_css()
