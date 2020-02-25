const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/api/notes", (req, res) => {
    return res.json(db);
});

app.post("/api/notes", (req, res) => {
    let note = req.body;
    db.push(note);

    (async () => {
        await fs.writeFile('db/db.json', JSON.stringify(db), err => {
            if (err) throw err;
        })
    })()
    res.json({ Ok: true });
});
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
    console.log(__dirname);
});