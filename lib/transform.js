var path = require('path')
var transform = {};

transform.accountInfo = function(account_response){
    account_response._raw = account_response
    return account_response;
};

transform.checkQuota = function (quota_response){
    quota_response._raw = quota_response;
    return quota_response;
};

transform.createFile = function(create_response){
    var identifier = create_response.identifier;
    var transform = {};
    transform.is_file = true;
    transform.is_folder = false;
    transform.identifier = identifier;
    transform.parent_identifier =path.dirname(identifier);
    transform.created_date = new Date();
    transform.modified_date = new Date();
    transform.name = path.basename(identifier);
    transform.description = '';
    transform.extension = path.extname(identifier);
    transform.checksum = null;
    transform.file_size = null;
    transform._raw = identifier;
    return transform;
};

transform.deleteFile = function(deletion_response){
    var transform = {};
    transform.success = true;
    transform._raw = deletion_response;
    return transform;
};

transform.downloadFile = function(download_response){
    var transform = {};
    transform.data = download_response;
    transform.headers = {};
    transform._raw = download_response;
    return transform;
};

transform.getFileInformation = function (file_response){
    var identifier = file_response.identifier;
    var stats = file_response.stats;
    var transform = {};
    transform.is_file = !stats.isDirectory();
    transform.is_folder = stats.isDirectory();
    transform.etag = '';
    transform.identifier = identifier;
    transform.parent_identifier = path.dirname(identifier);
    transform.mimetype = '';
    transform.created_date = stats.ctime;
    transform.modified_date = stats.mtime;
    transform.name = path.basename(identifier);
    transform.description = '';
    transform.extension = path.extname(identifier);
    transform.checksum = '';
    transform.file_size = stats.size;
    transform._raw = file_response;
    return transform;
};

transform.createFolder = function(create_response){
    var identifier = create_response.identifier;
    var transform = {};
    transform.is_file = false;
    transform.is_folder = true;
    transform.etag = '';
    transform.identifier = identifier;
    transform.parent_identifier = path.dirname(identifier);
    transform.created_date = new Date();
    transform.modified_date = new Date();
    transform.name = path.basename(identifier);
    transform.description = '';
    transform._raw = create_response;
    return transform;
};

transform.deleteFolder = function(deletion_response){
    var transform = {};
    transform.success = true;
    transform._raw = deletion_response;
    return transform;
};


transform.getFolderInformation = function(folder_response){
    var identifier = folder_response.identifier;
    var stats = folder_response.stats;
    var transform = {};
    transform.is_file = !stats.isDirectory();
    transform.is_folder = stats.isDirectory();
    transform.etag = '';
    transform.identifier = identifier;
    transform.parent_identifier = path.dirname(identifier);
    transform.created_date = stats.ctime;
    transform.modified_date = stats.mtime;
    transform.name = path.basename(identifier);
    transform.description = '';
    transform._raw = folder_response;
    return transform;
};


transform.retrieveFolderItems = function(items_response){
    var transform = {};
    transform.total_items = null;
    transform.content = items_response;
    return transform;
};

module.exports = transform;
