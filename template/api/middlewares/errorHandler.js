export const errorHandler = (err, req, res, next) => {
    try {
        if (err.isJoi) {
            const errorMessages = err.details.map(detail => detail.message);
            return res.status(422).json({
                success: false,
                message: errorMessages
            })
        }
        next();
        return res.status(500).json({
            success: false,
            message: err.message
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: e.message
        })
    }
};
