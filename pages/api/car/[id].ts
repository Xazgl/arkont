import { NextApiRequest, NextApiResponse } from "next"
import db from "../../../prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query
    try {
        if (req.method === 'GET') {
            if (typeof id === 'string') {
                const answer = await db.car.findUnique({
                    where: {
                        id: id
                    },
                    include: {
                        CarModel: true,
                        CarComplectation: true,
                        CarModification: true,
                        extras: true,
                        DealerModel: true,
                        FavoriteCarsToCar:true,
                        CompareCarsToCar:true,
                    }
                })
                res.status(200).send(answer)
            }
        } else {
            res.status(403).send({ message: "не найдена машина" })
        }
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: "Ошибка сервера" })
    }
}
