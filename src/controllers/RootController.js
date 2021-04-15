import State from '../models/State';
import Category from '../models/Category';

const getStates = async (req, res) => {
    let states = await State.find();
    res.json({ states });
}

const getCagegories = async (req, res) => {
    try {
        let cats = await Category.find();
        let categories = cats.map((category) => {
            return {
                ...category._doc, 
                img: `${process.env.BASE}/assets/images/${category.slug}.png`
            }
        });

        return res.json({ categories });
    } catch (err) {
        return res.status(400).json({ error: err });
    }

}

export { getStates, getCagegories }