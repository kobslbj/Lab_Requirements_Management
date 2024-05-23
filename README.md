# Lab Requirements Management

## Tech Stack

- Frontend: Next.js (App Router)
- Backend: Express.js

## Git Flow

1. 新增自己開發用的 branch (例：`m4xshen-dev`)
2. 在自己的 branch 上開發並 commit
3. 完成後，把自己的branch push 到 remote
4. 發起 Pull Request 到 `dev` branch
5. 選擇 Rebase and merge 並 merge PR

## Create mongo container
```bash
docker run --name my-mongodb -p 27017:27017 -d mongo
```

