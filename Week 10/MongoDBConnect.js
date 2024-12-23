const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/test1', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

.then(() => console.log("MongoDB connected!happy"))
.catch(err => console.error("Error occurred:", err));
