const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World to');
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ozyf1.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const studentsCollection = client.db("production").collection("students");
        const studentsBlogsCollection = client.db("production").collection("studentsBlogs");
        const studentsProblemsCollection = client.db("production").collection("problems");

        // Set & Update User
        app.put('/students/:studentId', async (req, res) => {
            const student = req.params.studentId;
            const user = req.body;
            const filter = { student: student };
            const options = { upsert: true };
            const updatedDoc = {
                $set: user,
            };
            const result = await studentsCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        });

        // Load User by User Email
        app.get('/students', async (req, res) => {
            const student = req.query.student;
            const query = { student: student };
            const result = await studentsCollection.find(query).toArray();
            res.send(result);
        });

        // All Students Blogs from DB
        app.get('/studentsBlogs', async (req, res) => {
            const result = await studentsBlogsCollection.find().toArray();
            res.send(result);
        });

        // Post Blog On Data Base
        app.post('/studentsBlogs', async (req, res) => {
            const body = req.body;
            const result = await studentsBlogsCollection.insertOne(body);
            res.send(result);
        });

        // All Students Problems from DB
        app.get('/studentsProblems', async (req, res) => {
            const result = await studentsProblemsCollection.find().toArray();
            res.send(result);
        });

        // Post Problems On Data Base
        app.post('/studentsProblems', async (req, res) => {
            const body = req.body;
            const result = await studentsProblemsCollection.insertOne(body);
            res.send(result);
        });


    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log('Server site running', port);
});