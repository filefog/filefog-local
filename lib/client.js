var q = require('q')
    , fs = require('fs')
    , path = require('path')
    , extend = require('node.extend');

var Client = function () {

    if(!this.config.base_directory){
        throw new Exception("A base directory is required for verifying filesystem requests");
    }
};

Client.prototype.accountInfo = function (options) {
    var self = this;
    //TODO: retrieve some information about the current user
};

Client.prototype.checkQuota = function (options) {
    var self = this;
    //TODO: retrive some limits from the filesystem?
};

Client.prototype.createFile = function (fileName, parentIdentifier, content_buffer, options) {
    var filePath = path.join(parentIdentifier, fileName);
    if(filePath.startsWith(this.config.base_directory)){
        var deferred = q.defer();
        fs.writeFile(filePath, content_buffer, options, function(err, result){
            if (err) return deferred.reject(err);
            return deferred.resolve(result);
        })
        return deferred.promise;
    }
    else{
        return q.reject("Request is not in the base directory")
    }
};

Client.prototype.deleteFile = function (identifier) {
    //TODO: determine how to do this in NodeJS
};

Client.prototype.downloadFile = function (identifier) {
    if(identifier.startsWith(this.config.base_directory)){
        var deferred = q.defer();
        fs.readFile(identifier, function (err, data) {
            if (err) return deferred.reject(err);
            return deferred.resolve(data);
        });
        return deferred.promise;
    }
    else{
        return q.reject("Request is not in the base directory")
    }
};

Client.prototype.getFileInformation = function (identifier) {
    console.log("CALLED GET FILE INFO METHOD");

    if(identifier.startsWith(this.config.base_directory)){
        console.log("identifer success");
        var deferred = q.defer();
        fs.stat(identifier, function (err, data) {
            if (err) return deferred.reject(err);
            return deferred.resolve(data);
        });
        return deferred.promise;
    }
    else{
        console.log("identifer failure");

        return q.reject("Request is not in the base directory")
    }
};

Client.prototype.createFolder = function (folderName, parentIdentifier, options) {
    var folderPath = path.join(parentIdentifier, folderName);
    if(folderPath.indexOf(this.config.base_directory)!=-1){
        var deferred = q.defer();
        fs.mkdir(folderPath, function (err, data) {
            if (err) return deferred.reject(err);
            return deferred.resolve(data);
        });
        return deferred.promise;
    }
    else{
        return q.reject("Request is not in the base directory")
    }
};

Client.prototype.deleteFolder = function (identifier){
    if(identifier.startsWith(this.config.base_directory)){
        var deferred = q.defer();
        fs.rmdir(identifier, function (err, data) {
            if (err) return deferred.reject(err);
            return deferred.resolve(data);
        });
        return deferred.promise;
    }
    else{
        return q.reject("Request is not in the base directory")
    }
};

Client.prototype.getFolderInformation = Client.prototype.getFileInformation;

Client.prototype.retrieveFolderItems = function (identifier,options) {
    if(identifier.startsWith(this.config.base_directory)){
        var deferred = q.defer();
        fs.readdir(identifier, function (err, data) {
            if (err) return deferred.reject(err);
            return deferred.resolve(data);
        });
        return deferred.promise;
    }
    else{
        return q.reject("Request is not in the base directory")
    }
};

module.exports = Client;