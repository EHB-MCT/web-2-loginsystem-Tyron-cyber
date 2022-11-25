const express = require('express')
const app = express()
const cors = require('cors')
const {
    MongoClient
} = require('mongodb')

// let users = [];

app.use(express.urlencoded({
    extended: false
}));
app.use(cors())
app.use(express.json())

let url = "mongodb+srv://Admin:Admin@cluster0.1sqcbqj.mongodb.net/test"
const client = new MongoClient(url)

async function run() {
    try {
        // connection to mongodb //
        await client.connect()
        console.log("succesfully connected to mongodb")


        app.post('/register', async (req, res) => {
            try {
                //get collection from database //
                let db = await client.db("session8")
                let coll = await db.collection("users")

                // making a user //
                let user = {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                }

                //validation//
                if (!user.password || !user.username || !user.email) {
                    res.status(404).send({
                        message: "fill in all the fields"
                    })
                }

                // inserting user to database // 
                coll.insertOne(user)
                console.log("user succesfully added to collection")

                // response //
                res.send({
                    message: "you are registered"
                })

            } catch (err) {
                res.status(500).send({
                    message: "something went wrong",
                    error: err.message
                })

            }

        })

        app.post("/login", async (req, res) => {
            try {
                console.log(req.body)
                //bestaande user ophalen///

                let user = users.find(u => {

                    return u.email == req.body.email

                })


                //Als user gevonden is, vergelijk password

                if (user) {

                    //compare password

                    if (user.password == req.body.password) {

                        res.status(200).send({
                            message: "you are logged in "
                        })

                    } else {

                        res.status(400).send({
                            message: "wrong pasword"
                        })

                    }

                } else {

                    res.status(400).send({
                        message: "The user does not exist (Email not found)"
                    })

                }
            } catch (err) {
                res.status(500).send({
                    status: "Tis kapot",
                    error: err.message
                })
            }

        })
    } catch (err) {
        res.status(500).send({
            message: "something went wrong",
            error: err.message
        })

    }

}


run().catch(console.dir)
app.listen(3000);
console.log("app running at http://localhost:3000");