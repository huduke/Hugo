import json
import requests
import os
import shutil
from multiprocessing import Pool


# 无代理
def requestList(taskUrl):
    r = requests.get(taskUrl)
    name = taskUrl.split('/')[-1]
    with open('task/'+ str(name), 'wb') as f:
        f.write(r.content)

# 有代理
def requestTaskPorxy(taskUrl):
    r = requests.get(taskUrl, proxies=proxy)
    name = taskUrl.split('/')[-1]
    with open('task/'+ str(name), 'wb') as f:
        f.write(r.content)

# 有代理
def requestTaskListPorxy(taskUrl):
    r = requests.get(taskUrl, proxies=proxy, stream=True)
    name = taskUrl.split('/')[-1]
    with open('taskList/'+ str(name), 'wb') as f:
        f.write(r.content)
    return str(name)

# 保存文件
def save_to_file(file_name, contents):
    fh = open(file_name, 'w', encoding='utf-8')
    fh.write(contents)
    fh.close()

# 拷贝文件到V2P
def copy_to_file(source_path, target_path):
    if not os.path.exists(target_path):
        os.makedirs(target_path)
    print('copy files start!')
    if os.path.exists(source_path):
        # root 所指的是当前正在遍历的这个文件夹的本身的地址
        # dirs 是一个 list，内容是该文件夹中所有的目录的名字(不包括子目录)
        # files 同样是 list, 内容是该文件夹中所有的文件(不包括子目录)
        for root, dirs, files in os.walk(source_path):
            for file in files:
                src_file = os.path.join(root, file)
                shutil.copy(src_file, target_path)
                # print(src_file)
    print('copy files finished!')

# 获取远程文件
taskUrl = 'https://raw.githubusercontent.com/sngxpro/QuanX/master/V2pTaskSub/sngxprov2p.json'
proxy = {'socks': 'http://127.0.0.1:1080'}
source_path = os.path.abspath(r'E:\PycharmProjects\pythonProject\taskList')
target_path = os.path.abspath(r'E:\elecV2P\script\JSFile')
requestTaskPorxy(taskUrl)
print('获取远程文件成功!')

#解析远程文件
jsonfile = open("task/sngxprov2p.json", encoding='utf-8')
json_str = json.load(jsonfile)
jsonfile.close()
#修改远程文件
URL = []
json_str_Modify = json_str
for index, item in enumerate(json_str_Modify["list"]):
        URL.insert(index, item['job']['target'])
        name = item['job']['target'].split('/')[-1]
        item['job']['target'] = name
save_to_file('task/taskUrl.txt', str(URL))
print('生成任务文件链接成功!')
save_to_file('task/sngxprov2pLocal.json', str(json_str_Modify))
print('生成本地订阅成功!')
# 下载任务文件
r = ""
if __name__ == '__main__':
    taskNum = len(URL)
    print('开始下载任务文件！共' + str(taskNum) + '个')
    with Pool(30) as pool:
        r = list((tqdm(pool.imap(requestTaskListPorxy, URL), total=taskNum, desc='监视进度')))
        pool.close()
# if(r != ""):
    # copy_to_file(source_path, target_path)