require('dotenv').config()
const express = require("express")
const app = express()
const cors = require('cors')
)
const port=process.env.PORT
const characters=require("./harrypotter.json")
app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send("Hello Harry Potter Characters")
})

app.get('/characters',(req,res)=>{
    res.send(characters)
})

app.get('/characters/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    const character =characters.find((character)=>character.id===id)
    if (character==undefined){
        res.status(404).send("The character does not exist")
    }
        else{
            res.send(character)
        }
    }
)

const ids=characters.map((character)=>(character.id))
let maxId=Math.max(...ids)


app.listen(port,()=>{
    console.log(`app listening on port ${port}`)
})

app.post('/characters',(req,res)=>{
    const character=characters.find((character)=>character.name.toLowerCase()==req.body.name.toLowerCase())
    console.log(req.body)
    if(character != undefined){
        res.status(409).send("The Character already exist")
    }else{
        maxId+=1;//This is equal to maxID = maxID + 1
        req.body.id=maxId;
        characters.push(req.body)
        res.status(201).send(req.body)
    }
    }
)

app.delete("/characters/:name",(req,res)=>{
    const name=req.params.name.toLowerCase();
    const characterIndex=characters.findIndex((character)=>character.name.toLowerCase()==name)
    console.log(characterIndex)
    if(characterIndex==-1){
        res.status(404).send("The character does not exist")
    }
    else{
        characters.splice(characterIndex,1)
        res.sendStatus(204)
    }
})

app.patch("/characters/:name",(req,res)=>{
    const name=req.params.name.toLowerCase()
    const character=characters.find((character)=>character.name.toLowerCase()==name)
    const newCharacterName=req.body.name

    if(character==undefined){
        res.status(404).send("The character does not exist")
    }else{
        character.name=newCharacterName
        res.status(200).send(character)
    }
})