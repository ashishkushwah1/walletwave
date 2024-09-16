const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const mongoose = require('mongoose');

const router = express.Router();
const app = express();
app.use(express.json());

router.get('/balance', authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });
    res.json({
        balance: account.balance
    });
})

router.post('/transfer', authMiddleware, async (req, res) => {
    const { amount, to } = req.body;
    const session = await mongoose.startSession();
    session.startTransaction();
    const userId = req.userId;

    const fromAccount = await Account.findOne({
        userId: userId
    }).session(session);
    if (!fromAccount || fromAccount.balance < amount) {
        await session.abortTransaction();
        session.endSession();
        return res.json({
            msg: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({
        userId: to
    }).session(session);
    if (!toAccount) {
        await session.abortTransaction();
        session.endSession();
        return res.json({
            msg: "Wrong userid"
        })
    }

    await Account.findOneAndUpdate({
        userId: userId
    }, {
        $inc: {
            balance: -amount
        }
    }).session(session);
    await Account.findOneAndUpdate({
        userId: to
    }, {
        $inc: {
            balance: amount
        }
    }).session(session);
    await session.commitTransaction();
    session.endSession();
    res.json({
        msg: "Money transferred successfully"
    });
})
module.exports = router;