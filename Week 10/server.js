let express = require("express");
let Books = require("./BooksSchema"); // MongoDB schema for books
let mongodbConnected = require("./MongoDBConnect"); // MongoDB connection logic
let cors = require("cors");

var app = express();
var bodyparser = require("body-parser");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cors());

// Log books schema connection
console.log("BOOKS", Books);

// API to get all books
app.get("/allbooks", async (req, res) => {
  const d = await Books.find();
  return res.json(d);
});

// API to get a single book by ID
app.get("/getbook/:id", function (req, res) {
  let id = req.params.id;
  Books.findById(id, function (err, book) {
    if (err) {
      console.log(err);
      return res.status(500).send("Error occurred while fetching book data");
    }
    res.json(book);
  });
});

// API to add a new book
app.post("/addbooks", function (req, res) {
  let newbook = new Books(req.body);
  newbook
    .save()
    .then(() => {
      res.status(200).json({ books: "book added successfully" });
    })
    .catch((err) => {
      res.status(400).send("Adding new book failed");
    });
});
app.post('/updatebook/:id',function(req, res) {
  let id = req.params.id;
  let updatedbook = new Books(req.body);
  Books.findByIdAndUpdate(id,
  {
  booktitle:updatedbook.booktitle,
  PubYear:updatedbook.PubYear,
  author:updatedbook.author,
  Topic:updatedbook.Topic,
  formate:updatedbook.formate
} ,
function (err, docs) {
if (err){
console.log(err)
}
else{
res.status(200).json({'books': 'book updated successfully'});
}
}

)

});

// API to delete a book
app.delete("/deleteBook/:id", function (req, res) {
  let id = req.params.id;
  Books.findByIdAndDelete(id, function (err, docs) {
    if (err) {
      console.log(err);
      return res.status(500).send("Error occurred while deleting the book");
    }
    res.status(200).send("Book Deleted");
  });
});

// Server setup
app.listen(5000, function () {
  console.log("Server is running on the port 5000");
});
