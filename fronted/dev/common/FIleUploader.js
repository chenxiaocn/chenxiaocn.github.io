function FileUploader(config){
    this.url = config.url;
    this.multiSelection = config.multiple;

    this.fileName = 'file';
    if(config.fileName){
        this.fileName = config.fileName;
    }

    this.browseButton = config.browseButton;

    this.maxFileSize = '1mb';
    if(config.maxFileSize) {
        this.maxFileSize = config.maxFileSize;
    }

    this.mimeTypes = [
        {title : "Image files", extensions : "gif,png,bmp,jpg,jpeg"}
    ];
    if(config.mimeTypes){
        this.mimeTypes = config.mimeTypes;
    }

    var _this = this;
    this.plUploader = new plupload.Uploader({
        runtimes : 'html5,flash,silverlight,html4',
        browse_button : this.browseButton,
        url : this.url,
        flash_swf_url : 'Moxie.swf',
        silverlight_xap_url : 'Moxie.xap',
        file_data_name: this.fileName,
        multi_selection: this.multiSelection,
        filters : {
            max_file_size : this.maxFileSize,
            mime_types: this.mimeTypes
        },
        init: {
            FilesAdded: function(up, files) {
                _this.plUploader.start();
            },
            Error: function(up, err) {
                var errs  = err.message;
                if(err.code == -600){
                    alert('上传文件大小不可以超过'+_this.maxFileSize);
                }else{
                    alert(errs);
                }
            }
        }
    });
    this.plUploader.init();
}

FileUploader.prototype = {
    constructor : FileUploader,
    getUploader: function(){
        return this.plUploader;
    },
    setUploadProgress: function(callback){
        this.plUploader.bind('UploadProgress', callback);
    },
    setBeforeUpload: function(callback){
        this.plUploader.bind('BeforeUpload', callback);
    },
    setFileUploaded: function(callback){
        this.plUploader.bind('FileUploaded', function (up, file, info){
            if(info.response=="\"login\""){
                sessionStorage.clear();
                location.reload();
            }else{
                callback(up, file, info);
            }
        });
    }
};

export {FileUploader as default}