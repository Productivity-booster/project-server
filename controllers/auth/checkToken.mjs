const checkToken = async(req, res) =>{

    const user_id = req.user.user_id;
    const username = req.user.username;

    // console.log("verification:", true);

    return(res.json({user_id : user_id, username : username, verification: true}));
}

export default checkToken;