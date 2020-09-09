const errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let errors = [];
    switch (err.name) {
        case 'SequelizeValidationError':
        case 'SequelizeUniqueConstraintError':
            statusCode = 400;
            err.errors.forEach(el => {
                errors.push({
                    name: el.validatorKey,
                    message: el.message,
                });
            });
            break;
        case 'invalidLogin':
            statusCode = 400;
            errors.push({
                name: err.name,
                message: 'Invalid email or password!',
            });
            break;
        case 'notFoundTask':
            statusCode = 404;
            errors.push({
                name: err.name,
                message: 'Error task not found',
            });
            break;
        case 'notFoundOrganization':
            statusCode = 404;
            errors.push({
                name: err.name,
                message: 'Error organization not found',
            });
            break;
        case 'notFoundUser':
            statusCode = 404;
            errors.push({
                name: err.name,
                message: 'Error user not found',
            });
            break;
        case 'notAuthorizedTask':
            statusCode = 401;
            errors.push({
                name: err.name,
                message: 'User not authorized accessing this Task',
            });
            break;
        case 'notAuthorizedOrganization':
            statusCode = 401;
            errors.push({
                name: err.name,
                message: 'User not authorized accessing this Organization',
            });
            break;
        case 'notAuthorizedUser':
            statusCode = 401;
            errors.push({
                name: err.name,
                message: 'User not authorized accessing this User',
            });
            break;
        case 'notAuthenticated':
            statusCode = 401;
            errors.push({
                name: err.name,
                message: 'User not authenticated',
            });
            break;

        default:
            statusCode = 500;
            errors.push({
                name: 'InternalServerError',
                message: 'Internal server error',
            });
            break;
    }

    return res.status(statusCode).json({ errors });
};

module.exports = errorHandler;
