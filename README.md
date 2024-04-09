# Memories

### 我們的回憶錄

## 目的
1. 送禮物
2. 學習與練習沒碰過的東西
3. 練習用docker開發與部屬
   
## 技術
1. vue3 + typescript
2. nodejs(express)
   * login
     ```
     密碼強度驗證採用 yup-password
     採用 passport-local-mongoose 建立user 帳號
     搭配 jsonwebtoken 產生token 並用passport-jwt 驗證token
     ```
4. mongodb(mongoose)
5. docker(docker-compose)
6. <del>github action<del>
7. GCP
   * cloud build
        ```
        用於cicd，取代github action
        當github push 到某分支時自動觸發docker build and push 到 artifact registry
        並且deploy 到cloud run
        ```
   * artifact registry
        ```
        儲存docker images
        ```
   * cloud run 
        ```
        部屬用
        ```


