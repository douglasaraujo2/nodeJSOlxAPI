import { validationResult, matchedData } from 'express-validator';

import User from '../models/User';
import State from '../models/State';
import Category from '../models/Category';
import Ad from '../models/Ad';
import { isValidObjectId } from 'mongoose';
import bcrypt from 'bcrypt';

const info = async (req, res) => {

    try {
        let { token } = req.query;
        const user = await User.
            findOne({ token }).
            populate('state').
            populate({
                path: 'ads',
                select: {
                    '_id': 1,
                    'title': 1,
                    'dateCreated': 1,
                    'price': 1,
                    'priceNegotiable': 1,
                    'views': 1,
                    'status': 1
                },
                populate: {
                    path: 'category',
                    model: 'Category',
                    select: {
                        'name': 1
                    }
                }
            });

        return res.json({
            name: user.name,
            email: user.email,
            stateId: user.state._id,
            state: user.state.name,
            ads: user.ads.map((ad) => {
                return {
                    id: ad._id,
                    title: ad.title,
                    dateCreated: ad.dateCreated,
                    price: ad.price,
                    priceNegotiable: ad.priceNegotiable,
                    views: ad.views,
                    status: ad.status,
                    categoryId: ad.category._id,
                    category: ad.category.name
                }
            })
        });

    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err });
    }

}
const editAction = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.mapped() });
        }

        const data = matchedData(req);

        let updates = {};
        if (data.name) {
            updates.name = data.name;
        }
        if (data.email) {
            const emailCheck = await User.findOne({ email: data.email });
            if (emailCheck) {
                return res.status(400).json({ error: { email: { msg: 'E-mail já existe' } } });
            }
            updates.email = data.email;
        }

        if (data.state) {
            if (isValidObjectId(data.state)) {
                const stateCheck = await State.findById(data.state);
                if (!stateCheck) {
                    return res.status(400).json({ error: { state: { msg: 'Estado não existe' } } });
                }
                updates.state = data.state;
            } else {
                return res.status(400).json({ error: { state: { msg: 'Código do estado inválido' } } });
            }
        }

        if (data.password) {
            updates.passwordhash = await bcrypt.hash(data.password, 10);
        }

        const user = await User.findOneAndUpdate({ token: data.token }, { $set: updates });
        return res.json({ data: user });

    } catch (err) {
        res.status(400).json({ error: err });
    }
}

export {
    info,
    editAction
};