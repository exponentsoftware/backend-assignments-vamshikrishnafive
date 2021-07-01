const uniqueMessage = error => {
    let output;
    try {
        let fieldName = error.message.substring(
            error.message.lastIndexOf(".$") + 2,
            error.message.lastIndexOf("_1")
        );
        output = fieldName.charAt(0).toUpperCase + fieldName.slice(1) + "Aleady account existing";
    } catch (error) {
        output = "Something went wrong"
    }
    return output;
}

exports.errorHandler = error => {
    let message = String;
    if(error.code) {
        switch (error.code) {
            case 11000:
            case 11001:
                message = uniqueMessage(error);
                break;
            default: message = "something went wrong";
        }
    }
    for(let errorName in error.errorors) {
        if(error.errorors[errorName].message) {
            message = error.errorors[errorName].message;
        }
    }
    return message;
}