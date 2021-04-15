import Ad from '../models/Ad';

const addAction = (req, res) => {
    res.json("Worked");
}
const getList = async (req, res) => {
    try {
        const { sort, limit } = req.query;

        const ads = await Ad.find()
            .limit(parseInt(limit) ? parseInt(limit) : 9999999)
            .sort({ 'dateCreated': sort ? sort: 'asc'})
            .populate('state')
            .populate('category')
            .populate({
                path: 'user',
                select: {
                    'name': 1
                }
            });

        const adList = ads.map((adItem) => {
            return {
                id: adItem._id,
                title: adItem.title,
                dateCreated: adItem.dateCreated,
                price: adItem.price,
                priceNegotiable: adItem.priceNegotiable,
                views: adItem.views,
                status: adItem.status,
                categoryId: adItem.category._id,
                category: adItem.category.name,
                userId: adItem.user._id,
                user: adItem.user.name
            };
        });
        return res.json({ ads: adList, total: adList.length });

    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err });
    }
}
const getItem = (req, res) => {
    res.json("Worked");
}

const editAction = (req, res) => {
    res.json("Worked");
}

export {
    addAction,
    getList,
    getItem,
    editAction
};