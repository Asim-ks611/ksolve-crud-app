# KSOLVES CRUD APP

## NOTES :
  > 1. use '```npx prisma db push```  to sync db
  > 2. In relational schema eg Posts schema keep First letter Capital of relation
  > User___User?___@relation(fields: [userId], references: [id],onDelete:Cascade )
  > userId___Int?
  >3. With delete API try to use relation as optional by placing "?" at end
   eg. in the above as with USER having many posts.