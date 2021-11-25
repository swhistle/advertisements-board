const express = require('express');
const passport = require('passport');
const router = express.Router();

const UserModule = require('../../../modules/user');
const formattedData = require('../../../utils/formattedData');

router.get('/signin', (req, res) => {
    res.send('signin');
});

router.post('/signin',
    passport.authenticate(
        'local',
        {
            successRedirect: '/',
            failureRedirect: '/api/user/signin',
        },
    ),
    (req, res) => {
        res.redirect('/')
    }
);

router.post('/signup',
    async (req, res) => {
        if (req.isAuthenticated()) {
            if (req.session) {
                return res.redirect('/');
            }
        }

        const { name, email, password, contactPhone } = req.body;

        if (!name || !email || !password) {
            res.status(400);
            res.send('Bad request');
            return;
        }

        const user = await UserModule.findByEmail(email);

        if (user) {
            res.status(409);
            res.send('A user with this email exists!');
            return;
        }

        try {
            const newUser = await UserModule.create(name, email, password, contactPhone);

            res.status(201);
            res.send(`You are registered successfully! Your name: ${newUser.name}`);
        } catch (e) {
            console.log(e);
            res.status(500);
        }
    }
);

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/profile', (req, res, next) => {
        if (!req.isAuthenticated || !req.isAuthenticated()) {
            if (req.session) {
                req.session.returnTo = req.originalUrl || req.url;
            }
            return res.redirect('/api/user/signin');
        }
        next();
    },
    (req, res) => {
        const userData = {
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
            contactPhone: req.user.contactPhone,
        };

        res.send(formattedData(userData));
    });

module.exports = router;