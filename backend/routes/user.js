const express = require('express');
const router = express.Router();
const { User, Account } = require('../db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const zod = require('zod');
const { authMiddleware } = require('../middleware')

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
    }, JWT_SECRET);

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
        }, JWT_SECRET);
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
        // Query to get the total number of users matching the filter
        const totalUsers = await User.countDocuments({
            $or: [{
                firstName: { '$regex': filter, '$options': 'i' } // Case-insensitive search
            }, {
                lastName: { '$regex': filter, '$options': 'i' }
            }]
        });

        // Fetch the paginated users
        const users = await User.find({
            $or: [{
                firstName: { '$regex': filter, '$options': 'i' }
            }, {
                lastName: { '$regex': filter, '$options': 'i' }
            }]
        })
        .skip(skip)
        .limit(limit);

        // Filter out the current user from the results
        const filteredUsers = users.filter(user => String(user._id) !== String(req.userId));

        // Send the paginated users and total count
        res.json({
            user: filteredUsers.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            })),
            totalUsers // Include the total number of filtered users
        });
    } catch (e) {
        res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router;