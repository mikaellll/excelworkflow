import urllib.request
url = "https://excelworkflow.com/sitemap-index.xml"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        print(f"Status: {response.getcode()}")
        headers = response.info()
        for header in headers.items():
            if 'robot' in header[0].lower():
                print(f"ROBOT HEADER: {header[0]}: {header[1]}")
            else:
                print(f"{header[0]}: {header[1]}")
except Exception as e:
    print(str(e))
