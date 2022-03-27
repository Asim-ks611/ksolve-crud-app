const {PrismaClient} = require('@prisma/client')

let prisma = new PrismaClient()


////// -- GET NOTES -- //////
async function getAllNotes(req,res) {
    try {
      const allNotes = await prisma.note.findMany({
        include:{
          User:{
          select:{
            username:true,
          }
        }}
      })
      res.status(200).json({notes:allNotes})
    } catch (error) {
      res.status(400).json({ message: "No response from server", error: err });
    }
  }

////// -- ADD NOTES -- //////
async function addNotes(req, res) {
  const { title, note, userId } = req.body;
  try {
    const newNote = await prisma.note.create({
      data: {
        title: title,
        content: note,
        userId: Number(userId),
      },
    });
    res.status(201).json({ message: "Note Added",log:`Note id:${newNote.id}` });
  } catch (error) {
    res.status(400).json({ message: "No response from server", error: err });
  }
}
  

////// -- UPDATE NOTES -- //////
async function updateNotes(req, res) {
  const id = Number(req.params.id)
  const {title,note} = req.body
  try {
    const updatedNote = await prisma.note.update({
      where:{id:id},
      data:{
        title:title,
        content:note
      }
    })
    res.status(200).json({message:"Note updated"})
  } catch (error) {
    res.status(400).json({ message: `Note cannot be updated`,log:`Updated Note id:${updated.id}` })
  }
}
////// -- DELETE NOTES -- //////
async function deleteNotes(req, res) {
  let id = Number(req.params.id);
  try {
    const deletedNote = await prisma.note.delete({where:{id:id}})
    res.status(200).json({ message: `Note deleted`,log:`Deleted id:${deletedNote.id}` });
  } catch (err) {
    res.status(400).json({ message: `Note does not exist`})
  }
}

module.exports = {getAllNotes,addNotes,updateNotes,deleteNotes}

  