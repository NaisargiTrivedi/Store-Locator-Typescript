import { Request, Response } from "express";

const dashboard = async (_req: Request, res: Response): Promise<any> => {
    return res.render('stores');
};

export { dashboard };