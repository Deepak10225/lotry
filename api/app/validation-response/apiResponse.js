const formatValidationErrors = (errors) => {
    return errors.array().reduce((acc, err) => {
        acc[err.path] = err.msg;
        return acc;
    }, {});
};

module.exports ={formatValidationErrors}