const express = require('express');
const router = express.Router();
const { User, Account } = require('../db');
const jwt = require('jsonwebtoken');
const zod = require('zod');
const { authMiddleware } = require('../middleware')
require('dotenv').config();
const signupSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
});

router.post('/signup', async (req, res) => {
    const body = req.body;
    const { success, error } = signupSchema.safeParse(body);
    if (!success) {
        return res.status(401).json({
            msg: "Wrong format",
            error: error.errors
        })
    }
    const user = await User.findOne({
        username: body.username
    })
    if (user) {
        return res.status(411).json({
            msg: "Email already exists"
        })
    }
    const dbUser = await User.create(body);
    const userId = dbUser._id;
    await Account.create({
        userId: userId,
        balance: 1 + Math.random() * 10000
    });

    const token = jwt.sign({
        userId: dbUser._id
    }, process.env.JWT_SECRET);

    res.json({
        msg: "User created successfully",
        token: token
    })
});

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post('/signin', async (req, res) => {
    const body = req.body;
    const { success } = signinBody.safeParse(body);
    if (!success) {
        return res.status(411).json({
            msg: "Wrong format"
        })
    }
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })
    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, process.env.JWT_SECRET);
        res.json({
            token: token
        });
        return;
    }
    res.status(411).json({
        msg: "Wrong Username or password"
    });
})


router.get('/me', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('username firstName lastName');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ user });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
const updateBody = zod.object({
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
});

router.get('/bulk/:id', authMiddleware, async (req, res) => {
    const id = req.userId;
    const user = await User.findById(id).select('username firstName lastName');
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user });
});

router.put('/', authMiddleware, async (req, res) => {
    const body = req.body;
    const { success } = updateBody.safeParse(body);
    if (!success) {
        return res.status(411).json({
            msg: "Incorrect inputs"
        })
    }
    await User.updateOne({
        _id: req.userId
    }, {
        $set: body
    });
    res.json({
        msg: "Updated successfully"
    })
})

router.get('/bulk', authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    try {
        // Fetch the paginated users
        const users = await User.find({
            $or: [{
                firstName: { '$regex': filter, '$options': 'i' }
            }, {
                lastName: { '$regex': filter, '$options': 'i' }
            }]
        });

        // Filter out the current user from the results
        const filteredUsers = users.filter(user => String(user._id) !== String(req.userId));
        const paginatedUsers = filteredUsers.slice(skip, skip + limit);
        console.log(paginatedUsers);
        // Send the paginated users and total count
        res.json({
            user: paginatedUsers.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            })),
            totalUsers: filteredUsers.length // Include the total number of filtered users
        });
    } catch (e) {
        res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router;