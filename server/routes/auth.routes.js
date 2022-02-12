const Router = require("express")
const User = require("../models/User")
const config = require("config")
const {check, validationResult} = require("express-validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const router = new Router()

router.post("/register",
    [
    check('email', "Incorrect email").isEmail(),
    check('password', "Password must be longer then 3 and shorter then 12").isLength({min: 3, max: 12}),
    ],
    async function(req, res, next){
    try{
        const errors = validationResult(req)

        if (!errors.isEmpty()){
            return res.status(404).json({message: "404 Incorrect request", errors})
        }
        const {email, password} = req.body

        const  candidate = await User.findOne({email})

        if (candidate){
            return res.status(403).json({message: `User with email ${email} already exists`})
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const user = new User({email, password:hashPassword})
        await user.save()

        return res.status(200).json({message: "User was created"})
    }catch(error){
        res.status(500).send({message: "Server error"})
    }
});

router.post('/login', async (req, res) => {
        try{
            const {email, password} = req.body
            const user = await User.findOne({email})

            if (!user){
                return res.status(404).json({message: "user not found"})
            }
            const isPassValid = bcrypt.compareSync(password, user.password)
            if (!isPassValid){
                return res.status(400).json({message: "Invalid Password"})
            }

            const token = jwt.sign(
                {id: user.id},
                config.get("secretKey"),
                {expiresIn: "1h"}
                )

            return res.json({
                token,
                email: user.email,
                diskSpace: user.diskSpace,
                usedSpace: user.usedSpace,
                avatar: user.avatar
            })

        }catch(error){
            console.log(error)
            res.send({message: "Server error"})
        }
    })

module.exports = router