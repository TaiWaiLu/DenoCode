# 方法1：使用 requests 库（最常用）
import requests

def get_user_info(username):
    url = f"http://localhost:8000/api/users/{username}"
    response = requests.get(url)
    
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.status_code}")
        return response.json()

# 使用示例
result = get_user_info("张三")
print(result)


# 方法2：使用 urllib（Python 标准库）
from urllib import request
import json

def get_user_info_urllib(username):
    url = f"http://localhost:8000/api/users/{username}"
    
    try:
        response = request.urlopen(url)
        data = json.loads(response.read().decode('utf-8'))
        return data
    except Exception as e:
        print(f"Error: {str(e)}")
        return None

# 使用示例
result = get_user_info_urllib("张三")
print(result)