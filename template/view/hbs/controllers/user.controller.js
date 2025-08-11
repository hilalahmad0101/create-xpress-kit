class UserController {

    static home = async (req, res) => {
        try {
            return res.render('index', { title: 'Home', layout: 'layouts/auth' })
        } catch (e) {
            return res.status(500).json({
                success: false,
                message: e.message
            })
        }
    }

}

export default UserController;