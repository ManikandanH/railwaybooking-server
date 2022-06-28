const propertyValidators = {
    string: String,
    number: Number,
    object: "object",
};
let finalResult = {
    error: null,
    message: "",
};

const validator = (
    dbPropertyValue,
    payloadPropertyValue,
    currentPropertyName,
    wholeObject,
    lastIndex
) => {
    const objectPropertyType = Object.keys(wholeObject[currentPropertyName]);
    for (let i = 0; i < objectPropertyType.length; i++) {
        if (
            wholeObject[currentPropertyName] &&
            typeof wholeObject[currentPropertyName][objectPropertyType[i]] !==
            "object"
        ) {
            if (dbPropertyValue["required"]) {
                if (
                    payloadPropertyValue &&
                    propertyValidators[typeof payloadPropertyValue] ===
                    dbPropertyValue.type
                ) {
                    if (lastIndex) {
                        if (finalResult.error === null) {
                            finalResult.message = "SUCCESS";
                        }
                    }
                } else if (payloadPropertyValue) {
                    const errorMessage = `${currentPropertyName} property type is different or wrong`;
                    finalResult.error = errorMessage;
                    return;
                } else {
                    const errorMessage = `${currentPropertyName} property is Missing`;
                    finalResult.error = errorMessage;
                    return;
                }
            } else {
                if (lastIndex) {
                    if (finalResult.error === null) {
                        finalResult.message = "SUCCESS";
                    }
                }
            }
        } else {
            if (
                wholeObject[currentPropertyName] &&
                typeof wholeObject[currentPropertyName][objectPropertyType[i]] ===
                "object" &&
                payloadPropertyValue
            ) {
                validator(
                    wholeObject[currentPropertyName][objectPropertyType[i]],
                    payloadPropertyValue[objectPropertyType[i]],
                    objectPropertyType[i],
                    wholeObject[currentPropertyName]
                );
                if (finalResult.error) {
                    return;
                } else if (lastIndex) {
                    finalResult.message = "SUCCESS";
                    return;
                }
            } else {
                const errorMessage = `${currentPropertyName} property is Missing`;
                finalResult.error = errorMessage;
                return;
            }
        }
    }
};

const validation = (DBInterface, specificProperty, payloadData, callback) => {
    const DBInterfaceInternalObj = {};
    for (let i = 0; specificProperty && i < specificProperty.length; i++) {
        Object.defineProperty(DBInterfaceInternalObj, specificProperty[i], {
            value: DBInterface[specificProperty[i]],
            configurable: true,
            writable: true,
            enumerable: true,
        });
    }
    finalResult = {
        error: null,
        message: "",
    };
    const DBInterfaceProperty = Object.keys(
        specificProperty ? DBInterfaceInternalObj : DBInterface
    );
    for (i = 0; i < DBInterfaceProperty.length; i++) {
        validator(
            DBInterface[DBInterfaceProperty[i]],
            payloadData[DBInterfaceProperty[i]],
            DBInterfaceProperty[i],
            DBInterface,
            i === DBInterfaceProperty.length - 1
        );
        if (finalResult.error) {
            callback(finalResult, null);
            break;
        } else if (
            finalResult.message !== "" &&
            i === DBInterfaceProperty.length - 1
        ) {
            callback(null, finalResult);
            break;
        }
    }
};

module.exports = validation;