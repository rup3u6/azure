# 開發啟動步驟
## 1. 確認node版本：v16.19.1
>$ node -v
## 切換至此專案路徑
$ cd /path/to/wistronfamily_cms_fe/

## 2. 安裝相關套件
>$ npm install

## 3. 啟動專案
>$ npm run start

---
---
# docker部屬步驟
## 1. 確認node版本：v16.19.1
>$ node -v

## 切換至此專案路徑
>$ cd /path/to/wistronfamily_cms_fe/

## 2. 安裝相關套件
>$ npm install

## 3. 打包輸出成靜態頁面，確認dist/ 資料夾檔案存在
>$ npm run build

## 4. wis_fe.conf檔案設定
確認後端各api server位置是否正確

## 5. 建立image
>$ docker image build -t nginx_wis_family_cms:0.0.1 .

## 6. Run container
>$ docker run -d --name web -p 8091:80 nginx_wis_family_cms:0.0.1

## 7. Test
開啟頁面 http://localhost:8091/wis_cms_fe/