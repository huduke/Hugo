import json
import os
import shutil


# 保存文件
def save_to_file(file_name, contents):
    fh = open(file_name, 'w', encoding='utf-8')
    fh.write(contents)
    fh.close()


# 拷贝文件到V2P
def copy_to_file(srcfile, targetpath):
    try:
        shutil.copy(srcfile, targetpath)
    except IOError as e:
        print("Unable to copy file. %s" % e)


# 取文件解析
# 第一次V2p rewrite 要先清除，重新生成rewrite.list，后面就是有新的就加进去就好了,或者运行脚本也可以;
src_file = os.path.abspath(r'E:\elecV2P\script\Lists\rewrite.list')
target_path = os.path.abspath(r'E:\PycharmProjects\pythonProject\task')
copy_to_file(src_file, target_path)
print('取rewrite.list文件成功!')
jsonfile = open("task/rewrite.list", encoding='utf-8')
json_str = json.load(jsonfile)
jsonfile.close()
# 修改文件
URL = []
json_str_Modify = json_str
json_str_Modify['rewritesub']['N9eDgcLX']['enable'] = 0
json_str_Modify['rewritesub']['DUmpWqY3']['enable'] = 0
for index, item in enumerate(json_str_Modify["rewrite"]["list"]):
    URL.insert(index, item['target'])
    name = item['target'].split('/')[-1]
    item['target'] = name
    # 1:启用，0：不启用
    item['enable'] = 1
data = str(json_str_Modify).replace("\'", "\"")
# data = json.loads(data)
save_to_file('task/rewriteLocal/rewrite.list', data)
print('生成本地重写成功!')
src_file = os.path.abspath(r'E:\PycharmProjects\pythonProject\task\rewriteLocal\rewrite.list')
target_path = os.path.abspath(r'E:\elecV2P\script\Lists')
copy_to_file(src_file, target_path)
print('新生成rewrite.list文件覆盖成功!')
