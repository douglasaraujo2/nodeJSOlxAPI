import { validationResult, matchedData } from 'express-validator';
import { isValidObjectId } from 'mongoose';
import bcrypt from 'bcrypt';

import User from '../models/User';
import State from '../models/State';


const signIn = async (req, res) => {

    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(403).json({ error: errors.mapped() });
        }

        const data = matchedData(req);
        const user = await User.findOne({ email: data.email });
        if (!user) {
            return res.status(403).json({ error: 'E-mail e/ou senha incorretos' });
        }

        const match = await bcrypt.compare(data.password, user.passwordHash);
        if (!match) {
            return res.status(403).json({ error: 'E-mail e/ou senha incorretos' });
        }

        const payload = (Date.now() + Math.random()).toString();
        const token = await bcrypt.hash(payload, 10);

        user.token = token;
        await user.save();
        return res.json({ token, email: data.email });

    } catch (err) {
        return res.status(403).json({ error: err });
    }
}
const signUp = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.mapped() });
        }

        const data = matchedData(req);
        const user = await User.findOne({ email: data.email });
        if (user) {
            return res.status(400).json({ error: { email: { msg: 'E-mail já existe' } } });
        }
        if (isValidObjectId(data.state)) {
            const state = await State.findById(data.state);
            if (!state) {
                return res.status(400).json({ error: { state: { msg: 'Estado inválido' } } });
            }
        } else {
            return res.json({ error: { state: { msg: 'Código de estado inválido' } } });
        }

        const passwordHash = await bcrypt.hash(data.password, 10);

        const payload = (Date.now() + Math.random()).toString();

        const token = await bcrypt.hash(payload, 10);

        const newUser = new User({
            name: data.name,
            email: data.email,
            passwordHash,
            token,
            state: data.state
        });

        await newUser.save();
        return res.json({ token });
    } catch (err) {
        return res.status(400).json({ error: err });
    }
}

export {
    signIn,
    signUp
};