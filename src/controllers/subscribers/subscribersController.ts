import { Request, Response } from "express";
import { getSubscribersService, insertSubscriberService } from "../../services/subscribers/subscribersService";
import { errorResponse, successResponse } from "../../utils/responseHandler";
import { Subscriber } from "../../types/subscriber";

export async function getSubscribers(req: Request, res: Response) {
       try {
              const result = await getSubscribersService();
              res.json(successResponse(result, 'success'));
       } catch (err: any) {
              res.status(500).json(errorResponse(err.message, "error"));
       }
}
export async function insertSubscriber(req: Request, res: Response) {
       try {
              const data: Subscriber = req.body;

              const result = await insertSubscriberService(data);

              res.json(successResponse(result, 'success'));
       } catch (err: any) {
              res.status(500).json(errorResponse(err.message, "error"));
       }
}