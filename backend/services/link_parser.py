def detect_platform(url: str) -> str:
    """
    Returns: 'leetcode', 'gfg', 
             'codeforces', 'hackerrank', 
             or 'unknown'
    """
    if 'leetcode.com' in url:
        return 'leetcode'
    elif 'geeksforgeeks.org' in url:
        return 'gfg'
    elif 'codeforces.com' in url:
        return 'codeforces'
    elif 'hackerrank.com' in url:
        return 'hackerrank'
    else:
        return 'unknown'

def parse_leetcode(url: str) -> dict:
    """
    Extract problem slug from URL.
    URL format: leetcode.com/problems/two-sum/
    Slug: "two-sum"
    
    Then call LeetCode GraphQL API:
    POST https://leetcode.com/graphql
    """
    import re
    import requests
    
    # Extract slug from URL
    match = re.search(r'leetcode\.com/problems/([^/]+)', url)
    if not match:
        return {"success": False, "error": "Invalid LeetCode URL"}
    
    slug = match.group(1)
    
    # GraphQL query to get problem details
    query = """
    query getProblem($titleSlug: String!) {
        question(titleSlug: $titleSlug) {
            title
            difficulty
            content
            exampleTestcases
            topicTags {
                name
            }
        }
    }
    """
    
    headers = {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
    
    response = requests.post(
        'https://leetcode.com/graphql',
        json={
            'query': query,
            'variables': {'titleSlug': slug}
        },
        headers=headers,
        timeout=10
    )
    
    data = response.json()
    if 'data' not in data or not data['data'].get('question'):
        return {"success": False, "error": "Could not find LeetCode question. Make sure it is a valid public problem."}
        
    question = data['data']['question']
    
    # Strip HTML tags from content
    from bs4 import BeautifulSoup
    content = BeautifulSoup(question['content'] or '', 'html.parser').get_text(separator='\n')
    
    return {
        "success": True,
        "platform": "leetcode",
        "title": question['title'],
        "difficulty": question['difficulty'],
        "problem_text": content,
        "constraints": "",
        "tags": [t['name'] for t in question.get('topicTags', [])]
    }

def parse_gfg(url: str) -> dict:
    """
    GFG can be scraped with requests + BeautifulSoup.
    """
    import requests
    from bs4 import BeautifulSoup
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36'
    }
    
    response = requests.get(url, headers=headers, timeout=10)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Try multiple selectors (GFG changes layout)
    title = (
        soup.find('h1') or 
        soup.find(class_='problems_header_content__title__L3bk1')
    )
    
    content = (
        soup.find(class_='problems_problem_content__Xm_eO') or
        soup.find(class_='content') or
        soup.find('div', {'class': lambda x: x and 'problem' in x.lower()})
    )
    
    if not content:
        return {
            "success": False,
            "error": "Could not parse GFG problem. Please paste the problem text directly."
        }
    
    return {
        "success": True,
        "platform": "gfg",
        "title": title.get_text(strip=True) if title else "GFG Problem",
        "problem_text": content.get_text(separator='\n', strip=True),
        "constraints": "",
        "tags": []
    }

def parse_codeforces(url: str) -> dict:
    """
    Codeforces URL formats:
    codeforces.com/problemset/problem/1/A
    codeforces.com/contest/1/problem/A
    """
    import requests
    from bs4 import BeautifulSoup
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
    
    response = requests.get(url, headers=headers, timeout=10)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Codeforces problem structure
    title = soup.find('div', class_='title')
    statement = soup.find('div', class_='problem-statement')
    
    if not statement:
        return {
            "success": False,
            "error": "Could not parse Codeforces problem."
        }
    
    # Get time and memory limits
    time_limit = soup.find('div', class_='time-limit')
    memory_limit = soup.find('div', class_='memory-limit')
    
    constraints_text = ""
    if time_limit:
        constraints_text += time_limit.get_text()
    if memory_limit:
        constraints_text += " | " + memory_limit.get_text()
    
    return {
        "success": True,
        "platform": "codeforces",
        "title": title.get_text(strip=True) if title else "Codeforces Problem",
        "problem_text": statement.get_text(separator='\n', strip=True),
        "constraints": constraints_text,
        "tags": []
    }

def parse_hackerrank(url: str) -> dict:
    """
    HackerRank blocks simple requests.
    Use Playwright (headless browser) to render the page and extract content.
    """
    from playwright.sync_api import sync_playwright
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        page.set_extra_http_headers({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        
        page.goto(url, timeout=15000)
        
        # Wait for problem content to load
        page.wait_for_selector('.challenge-body-html', timeout=10000)
        
        title = page.query_selector('h1')
        content = page.query_selector('.challenge-body-html')
        
        result = {
            "success": True,
            "platform": "hackerrank",
            "title": title.inner_text() if title else "HackerRank Problem",
            "problem_text": content.inner_text() if content else "",
            "constraints": "",
            "tags": []
        }
        
        browser.close()
        return result

def parse_problem_from_url(url: str) -> dict:
    """
    Returns:
    {
      "success": True/False,
      "platform": "leetcode",
      "title": "Two Sum",
      "problem_text": "full problem statement...",
      "examples": "Example 1: ...",
      "constraints": "1 <= n <= 10^4",
      "error": None or "error message"
    }
    """
    platform = detect_platform(url)
    
    if platform == 'unknown':
        return {
            "success": False,
            "error": "Unsupported platform. Paste the problem text directly."
        }
    
    try:
        if platform == 'leetcode':
            return parse_leetcode(url)
        elif platform == 'gfg':
            return parse_gfg(url)
        elif platform == 'codeforces':
            return parse_codeforces(url)
        elif platform == 'hackerrank':
            return parse_hackerrank(url)
    except Exception as e:
        return {
            "success": False,
            "error": f"Failed to fetch problem: {str(e)}"
        }
