import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const user = await req.context.models.User.findByPk(
            req.context.me.id,
        );
        return res.send(user);
    }
    catch {
        console.log('errRRRRRRRrror')
    }
});

export default router;