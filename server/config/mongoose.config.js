const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost/project", {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
    .then(() => console.log("Mongoose DB connected"))
    .catch((err) => console.log("I lost the mongoose" , err));