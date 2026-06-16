const z = require('zod');
const BadRequest = require('../handler/error.badrequest');

const validation = (schema) => {
    return async (req, res, next) => {

        try {
            (await schema.parseAsync(req.body))

            next();
        } catch (error) {

            if (error instanceof z.ZodError) {
                throw new BadRequest(error.issues.map(issue => issue.message).join(', '));
            }

            next(error);
        }
    }
}

module.exports = { validation }