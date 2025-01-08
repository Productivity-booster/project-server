
const logout = async(req, res) =>{
    res.clearCookie("token")

    res.status(200).json({ message: "Logged out successfully." });
}

export default logout;