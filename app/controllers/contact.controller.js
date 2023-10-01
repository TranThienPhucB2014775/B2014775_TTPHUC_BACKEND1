const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");
const ContactService = require("../service/contact.service");
const { ReturnDocument } = require("mongodb");


exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Name can not be empty"));
    }

    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
};

exports.findALL = async (req, res, next) => {
    let document = []
    try{
        const contactService = new ContactService(MongoDB.client)
        const {name} = req.body;
        if(name) {
            document = await contactService.findbyName(name)
        }else {
            document = await contactService.find({})
        }
        return res.send(document);
    }catch(error){
        console.log(error)
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
}
exports.findOne= async (req, res, next) => {
    
    try{
        const contactService = new ContactService(MongoDB.client)
        const document = await contactService.findById(req.query.id)
        if (!document){
            return next(new ApiError(404, "COntact not found"))
        }
        return res.send(document)
    }catch(error){
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
}

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length == 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.update(req.query.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({ message: "Contact was updated successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating contact with id=${req.query.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.delete(req.query.id);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({ message: "Contact was deleted successully" });
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Could not delete contact with id=${req.query.id}`
            )
        );
    }
};

exports.deleteALL = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const deletedCount = await contactService.deleteAll();
        return res.send({
            message: `${deletedCount} contacts were deleted successfully`,
        });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while removing all contacts")
        );
    }
};

exports.findALLFavorite = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const documents = await contactService.findFavorite();
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(
                500,
                "An error occurred while retrieving favorite contacts"
            )
        );
    }
};

