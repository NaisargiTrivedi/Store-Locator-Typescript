import { Request } from "express";

import multer from 'multer';
import path from 'path';
import logger from '../../helpers/logger';

let filePath: string;
const uniqueId = Date.now();

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const storage = multer.diskStorage({
    destination (_request: Request, _file: Express.Multer.File, cb: DestinationCallback) {
        cb(null, '../StoreLocator_TypeScript/dist/public/Login_v15/storeLogo');
        cb(null, '../StoreLocator_TypeScript/src/public/Login_v15/storeLogo');
    },
    filename (_req: Request, file: Express.Multer.File, cb: FileNameCallback) {
        logger.info('multer......');
        logger.debug(file.originalname);
        filePath = uniqueId + path.extname(file.originalname);
        cb(null, filePath);
    }
});

const upload = multer({ storage });


export { upload, filePath };