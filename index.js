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
        const studentNoticeCollection = client.db("production").collection("studentNotice");
        const studentSuggestionCollection = client.db("production").collection("suggestions");
        const teachersCollection = client.db("production").collection("teachers");
        const aminCollection = client.db("production").collection("admin");

        // Set & Update Student
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

        // Load Student by Student ID
        app.get('/students', async (req, res) => {
            const student = req.query.student;
            const query = { student: student };
            const result = await studentsCollection.find(query).toArray();
            res.send(result);
        });

        // All Students Loaded from DB
        app.get('/allStudents', async (req, res) => {
            const result = await studentsCollection.find().toArray();
            res.send(result);
        });

        // Post Blog On DB
        app.post('/students', async (req, res) => {
            const body = req.body;
            const result = await studentsCollection.insertOne(body);
            res.send(result);
        });

        // All Students Blogs from DB
        app.get('/studentsBlogs', async (req, res) => {
            const result = await studentsBlogsCollection.find().toArray();
            res.send(result);
        });

        // Post Blog On DB
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

        // All Students Notice from DB
        app.get('/studentNotice', async (req, res) => {
            const result = await studentNoticeCollection.find().toArray();
            res.send(result);
        });

        // Post Notice On DB
        app.post('/studentNotice', async (req, res) => {
            const body = req.body;
            const result = await studentNoticeCollection.insertOne(body);
            res.send(result);
        });

        // All Students Suggestions from DB
        app.get('/studentSuggestion', async (req, res) => {
            const result = await studentSuggestionCollection.find().toArray();
            res.send(result);
        });

        // Post Suggestion On DB
        app.post('/studentSuggestion', async (req, res) => {
            const body = req.body;
            const result = await studentSuggestionCollection.insertOne(body);
            res.send(result);
        });

        // Set & Update Teachers
        app.put('/teachers/:teacherId', async (req, res) => {
            const teacher = req.params.teacherId;
            const user = req.body;
            const filter = { teacher: teacher };
            const options = { upsert: true };
            const updatedDoc = {
                $set: user,
            };
            const result = await teachersCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        });

        // Load Teachers by Teacher ID
        app.get('/teachers', async (req, res) => {
            const teacher = req.query.teacher;
            const query = { teacher: teacher };
            const result = await teachersCollection.find(query).toArray();
            res.send(result);
        });

        // All Teachers Load
        app.get('/allTeachers', async (req, res) => {
            const result = await teachersCollection.find().toArray();
            res.send(result);
        });

        // Post Admin On DB
        app.post('/addTeachers', async (req, res) => {
            const body = req.body;
            const result = await teachersCollection.insertOne(body);
            res.send(result);
        });

        // Amin Loaded from DB
        app.get('/admin', async (req, res) => {
            const result = await aminCollection.find().toArray();
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