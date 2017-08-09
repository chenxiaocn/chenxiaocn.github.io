let Validation = {
    trim:function(obj){
        return (obj + "").trim();
    },
    required:function(obj){
        obj = this.trim(obj);
        if(obj.length == 0){
            return false
        }
        return true;
    },
    maxLength:function(obj,maxLength){
        obj = this.trim(obj);
        if(obj.length > maxLength){
            return false
        }
        return true;
    },
    mixLength:function(obj,mixLength){
        obj = this.trim(obj);
        if(obj.length < mixLength){
            return false
        }
        return true;
    },
    isMobile:function(obj){
        obj = this.trim(obj);
        if(!(/^1[34578]\d{9}$/.test(obj)) && !(/^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(obj))){
            return false
        }
        return true;
    },
    isMail:function(obj){
        obj = this.trim(obj);
        if(!(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(obj))){
            return false;
        }
        return true;
    },
    isEqual:function(obj1,obj2){
        if(!(obj1 === obj2)){
            return false;
        }
        return true;
    },
    isPositiveNumber:function(obj){
        obj = this.trim(obj);
        if(!(/^[1-9]*[1-9][0-9]*$/.test(obj))){
            return false;
        }
        return true;
    },
    knowledgeCode:function(obj){
        obj = this.trim(obj);
        if(!(/^N[0-9]{2}X[0-9]{2}Z[0-9]{2}-[0-9]{1}$/.test(obj))){
            return false;
        }
        return true;
    }
};
module.exports=Validation;