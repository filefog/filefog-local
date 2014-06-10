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
    //TODO: retrieve some information about the current user?
    return q({})
};

Client.prototype.checkQuota = function (options) {
    var self = this;
    //TODO: retrive some limits from the filesystem?
    return q({limits:{},total_bytes:0, used_bytes:0})
};

Client.prototype.createFile = function (fileName, parentIdentifier, content_buffer, options) {
    parentIdentifier = parentIdentifier || this.config.base_directory;
    var filePath = path.join(parentIdentifier, fileName);
    if(startsWith(filePath, this.config.base_directory)){
        var deferred = q.defer();
        fs.writeFile(filePath, content_buffer, options, function(err){
            if (err) return deferred.reject(err);
            return deferred.resolve({identifier: filePath});
        })
        return deferred.promise;
    }
    else{
        return q.reject("Request is not in the base directory")
    }
};

Client.prototype.deleteFile = function (identifier) {
    if(startsWith(identifier,this.config.base_directory)){
        var deferred = q.defer();
        fs.unlink(identifier, function (err, data) {
            if (err) return deferred.reject(err);
            return deferred.resolve(data);
        });
        return deferred.promise;
    }
    else{
        return q.reject("Request is not in the base directory")
    }
};

Client.prototype.downloadFile = function (identifier) {
    if(startsWith(identifier,this.config.base_directory)){
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
    if(startsWith(identifier,this.config.base_directory)){
        var deferred = q.defer();
        fs.stat(identifier, function (err, data) {
            if (err) return deferred.reject(err);
            return deferred.resolve({identifier: identifier, stats:data});
        });
        return deferred.promise;
    }
    else{
        console.log("identifer failure");

        return q.reject("Request is not in the base directory")
    }
};

Client.prototype.createFolder = function (folderName, parentIdentifier, options) {
    parentIdentifier = parentIdentifier || this.config.base_directory;
    var folderPath = path.join(parentIdentifier, folderName);
    if(startsWith(folderPath,this.config.base_directory)){
        var deferred = q.defer();
        fs.mkdir(folderPath, function (err) {
            if (err) return deferred.reject(err);
            return deferred.resolve({identifier:folderPath});
        });
        return deferred.promise;
    }
    else{
        return q.reject("Request is not in the base directory")
    }
};

Client.prototype.deleteFolder = function (identifier){
    if(startsWith(identifier,this.config.base_directory)){
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

Client.prototype.retrieveFolderItems = function (identifier,options) {
    identifier = identifier || this.config.base_directory;
    if(startsWith(identifier,this.config.base_directory)){
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


///////////////////////////////////////////////////////////////////////////////
// Aliases
Client.prototype.getFolderInformation = Client.prototype.getFileInformation;

///////////////////////////////////////////////////////////////////////////////
// Helper Methods
function startsWith(string, value){
    return string.lastIndexOf(value, 0) === 0
}

module.exports = Client;