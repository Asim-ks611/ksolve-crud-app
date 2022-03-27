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
   > a. 