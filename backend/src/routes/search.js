import uuidv4 from 'uuid/v4';
import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
    const searchs = await req.context.models.Search.findAll();
    return res.send(searchs);
});

router.get('/:searchId', async (req, res) => {
    const search = await req.context.models.Search.findByPk(
        req.params.searchId,
    );
    return res.send(search);
});

router.post('/', async (req, res) => {
    const search = await req.context.models.Search.create({
        kws: req.body.kws,
        searchPosName: req.body.searchPosName,
        dist: req.body.dist,
        order: "creationDate-des",
        maxPrice: req.body.maxPrice,
        minPrice: req.body.minPrice,
        publishDate: 24,
        userId: req.context.me.id,
    });

    return res.send(search);
});

router.delete('/:searchId', async (req, res) => {
    const result = await req.context.models.Search.destroy({
        where: { id: req.params.searchId },
    });

    return res.send(true);
});

export default router;