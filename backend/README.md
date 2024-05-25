# Backend

## File structure
| -- src
| ------ index.js
| ------ models (schema)
| ---------- [order | lab_staff | qa_engineer].js
| ------ routes (api routes)
| ---------- [order | lab_staff | qa_engineer].js
| ------ services (functions)
| ---------- [order | lab_staff | qa_engineer].js

## Note
1. Please open a mongo container
```bash
docker run --name my-mongodb -p 27017:27017 -d mongo
```
2. Please follow the structure in src/models when testing DB