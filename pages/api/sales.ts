import type { NextApiRequest, NextApiResponse } from 'next'
import db, { Offer } from '../../prisma';
import nextConnect from 'next-connect';
import multer from 'multer';
import checkSession from "../../src/services/checkCookie";
import helmet from "helmet";
import { z, ZodError } from 'zod';

const upload = multer({
    storage: multer.diskStorage({
        destination: './public/uploads',
        filename: (req, file, cb) => cb(null, file.originalname),
    }),
});

const apiRoute = nextConnect<NextApiRequest & { file?: Express.Multer.File }, NextApiResponse>({
    onError(error, req, res) {
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.use(upload.single('image'));
apiRoute.use(helmet());

apiRoute.post(async (req, res, next) => {
    const token = req.cookies['sid']
    const admin = await checkSession(token)
    if (admin) {
        return next()
    }
    next(new Error('Auth required'))
}, async (req, res) => {
    try {
        const img: string = req.file ? req.file.filename : ''
        const loginSchema = z.object({
            title: z.string().min(2).max(30),
            shortDesc: z.string().min(2).max(60),
            description: z.string().min(2).max(300),
            filterMainPeople: z.string().min(2).max(60),
            detailFilterBrand: z.string().min(2).max(60),
            detailFilterMode: z.string().min(2).max(60),
            price: z.string().min(3).max(60),
        })
        const {
            title, shortDesc, description, filterMainPeople, detailFilterBrand, detailFilterMode, price
        } = loginSchema.parse(req.body)
        const newOffer = await db.offer.create({
            data: {
                title,
                shortDesc,
                description,
                filterMainPeople,
                detailFilterBrand,
                detailFilterMode,
                img,
                price,
                active: true,
            }
        })
        res.status(200).send(newOffer)
    } catch (error) {
        console.error(error)
        if (error instanceof ZodError) {
            return res.status(404).send({ message: "???????????? ?????????????????? ???? ??????????????" })
        }
        res.status(500).send({ message: "???????????? ??????????????" })
    }
});

export default apiRoute;

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};