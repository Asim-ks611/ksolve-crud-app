# crud-app-ksolve
A Crud App using React as a frontend and express as backend, with tools like Prisma ORM ,JWT and MySQL .etc

#1 : PRISMA NOTES
  > a. use '```npx prisma db push```  to sync db
  > b. In relational schema eg Posts schema keep First letter Capital of relation
  > User___User?___@relation(fields: [userId], references: [id],onDelete:Cascade )
  > userId___Int?
  >c. With delete API try to use relation as optional by placing "?" at end
   eg. in the above as with USER having many posts.

#2 : CORS SET UP TO GET HTTP ONLY COOKIES
   > a. As middleware if we need to narrow the req, we have to pass origin.ie
   ```app.use(cors({
      origin:"http://localhost:3000",
      credentials: true
      }))```
    > b. Here I passed my client server Ip as origin saying hey express allow req from this origin xxx:3000/*/*
    > c. Also credential:true for getting cookies in response, and we also need to set
    ```withCredentials:true``` in req headers option of axios requests from client side.