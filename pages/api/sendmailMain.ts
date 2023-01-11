import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../prisma';
import nodemailer from 'nodemailer';
import { z } from 'zod';

export default async function sendmailMain(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const clinetSchema = z.object({
            name: z.string().min(2).max(20),
            phone: z.string().min(2).max(20),
            officeName: z.string().min(2).max(50),
        })
        const adminFromReq = clinetSchema.parse(req.body)
        try {
            //письмо
            let testEmailAccount = await nodemailer.createTestAccount()
            let transporter = nodemailer.createTransport({
                host: 'smtp.yandex.ru',
                port: 465,
                secure: true,
                auth: {
                    user: 'UriyAPKOHT@yandex.ru',
                    pass: 'sgqwqfsmmnajkskr',
                },
            })
            let result = await transporter.sendMail({
                from: '"Заявка с arkont.ru" UriyAPKOHT@yandex.ru',
                to: 'UriyAPKOHT@yandex.ru',
                subject: `Заявка с arkont.ru `,
                text: `Заявка  от ${adminFromReq.name} ${adminFromReq.phone} ${ adminFromReq.officeName} arkont.ru`,
                html:
                `Заявка  от ${adminFromReq.name} ${adminFromReq.phone} ${ adminFromReq.officeName} arkont.ru`,
            })
            //регистрация в базу
            const clientSend = await db.clientNeedCall.create({data: {
                name:adminFromReq.name, 
                phone:adminFromReq.phone, 
                office:adminFromReq.officeName
            }})
            res.status(200).send(clientSend);
        } catch (error) {
             res.status(500).send({ message: "Ошибка сервера" })
        }
    } else {
        res.status(404).send({ message: "Неверный адрес" })
    }
}

