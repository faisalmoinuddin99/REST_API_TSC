import bodyParser from 'body-parser'
import express,{ Request, Response } from 'express'

const app = express() 
const port = process.env.PORT || 5000

// my demo database
const myDB = [
    {
        id : 1,
        name: "faisal",
        email: "faisal25march@gmail.com"
    },
    {
        id: 2,
        name: "naruto",
        email: "naruto_uz@hotmail.com"
    },
    {
        id: 3,
        name: "messi",
        email: "messi_arg@gmail.com"
    },
     {
        id: 4,
        name: "neymar",
        email: "neymar_brz@gmail.com"
    },
]
//middleware
app.use(bodyParser.json())


//Create new user 
app.post('/api/data',(req:Request, res:Response):void => {
    const new_user = req.body 

    new_user.id = myDB.length + 1 
   
    myDB.push(new_user)
    res.json(new_user)
})

// Read 
app.get('/api/data',(req:Request,res:Response):void => {
    const metadata = {
         total_count : myDB.length 
    }
    res.set('Content-Type', 'application/json');

    res.send(JSON.stringify({ _metadata: metadata, records: myDB }));
})

// Delete
app.delete('/api/data/:userId',(req:Request, res:Response) => {
    const user_id = req.params.userId 
    const id = Number(user_id)

    const user = myDB.splice(id, 1)
    
    
    Promise.all([user]).then(result => {
        console.log(result)
        res.status(200).json({
            msg: "user deleted successfully"
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            msg: "something went wrong!",
            err : err
        })
        
    }) 
})
app.listen(port,():void=>{
    console.log(`server is running at ${port}....` );
    
})