exports.create = (req,res) =>{
    res.send({message: "Create handler"});
};

exports.findALL = (req, res) => {
    res.send({message: "findALL handler"})
};

exports.findOne = (req, res) => {
    req.send({message: "findOne handler"})
};

exports.update = (req, res) => {
    req.send({message: "update handler"})
};

exports.delete = (req, res) => {
    req.send({message: "delete handler"})
};

exports.deleteALL = (req, res) => {
    req.send({message: "deleteALL handler"})
};

exports.findALLFavorite = (req, res) => {
    res.send({message: "findALLFavorite handler"})
};