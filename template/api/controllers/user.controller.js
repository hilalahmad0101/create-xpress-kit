class UserController {
    static test = (req, res, next) => {
        try {
            return res.status(200).json({
                success: true,
                message: 'Successfully install express starter-kit'
            })
        } catch (e) {
            next(e)
        }
    }
}

export default UserController;