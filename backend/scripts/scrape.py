import os
import requests
from bs4 import BeautifulSoup
import urllib3
from urllib.parse import urljoin, urlparse

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

BASE_URL = "https://tekweiser.com/"

pages = {
    "about": "/about-us",
    "services": "/services",
    "technology": "/technology",
    "portfolio": "/portfolio",
    "blog": "/blog-2",
    "contact": "/contact-us",
}

os.makedirs("../data", exist_ok=True)

def extract_main_text(html):
    soup = BeautifulSoup(html, "html.parser")
    for tag in soup(["nav", "header", "footer", "script", "style"]):
        tag.decompose()
    text_parts = []
    for tag in soup.find_all(["h1", "h2", "h3", "p", "li"]):
        if tag.get_text(strip=True):
            text_parts.append(tag.get_text(strip=True))
    return "\n".join(text_parts)

def get_internal_links(html, base_url):
    soup = BeautifulSoup(html, "html.parser")
    links = set()
    for a in soup.find_all("a", href=True):
        href = a["href"]
        full_url = urljoin(base_url, href)
        parsed = urlparse(full_url)
        # Only include tekweiser.com links (no external links)
        if parsed.netloc == "tekweiser.com":
            if parsed.path != "/" and not any(exclude in parsed.path for exclude in ["/contact", "/blog", "/portfolio"]):
                links.add(full_url.rstrip("/"))
    return links

visited = set()

for name, path in pages.items():
    full_url = f"{BASE_URL.rstrip('/')}{path}"
    print(f"Fetching: {full_url}")
    try:
        res = requests.get(full_url, verify=False)
        if res.status_code == 200:
            main_text = extract_main_text(res.text)
            with open(f"../data/{name}.txt", "w", encoding="utf-8") as f:
                f.write(main_text)
            
            # Also fetch sub-links for services and technology
            if name in ["services", "technology"]:
                sub_links = get_internal_links(res.text, BASE_URL)
                for link in sub_links:
                    if link not in visited:
                        visited.add(link)
                        print(f"  ↳ Subpage: {link}")
                        try:
                            sub_res = requests.get(link, verify=False)
                            if sub_res.status_code == 200:
                                sub_text = extract_main_text(sub_res.text)
                                slug = urlparse(link).path.strip("/").replace("/", "_")
                                with open(f"../data/{slug}.txt", "w", encoding="utf-8") as f:
                                    f.write(sub_text)
                        except Exception as e:
                            print(f"  ↳ Failed to fetch subpage {link}: {e}")
        else:
            print(f"Failed to fetch {name}: {res.status_code}")
    except Exception as e:
        print(f"Error fetching {name}: {e}")
