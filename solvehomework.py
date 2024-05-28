from selenium import webdriver
import time
web = webdriver.Chrome()
url = "https://teams.microsoft.com/v2/?culture=ar-sa&country=ww"
web.get(url)
time.sleep(100)
sname = 'Abudllah Hisham'
name = web.find_element('xpath','//*[@id="question-list"]/div[1]/div[2]/div/span/input')
name.send_keys(sname)