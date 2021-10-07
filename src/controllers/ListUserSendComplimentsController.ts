import { Request, Response } from "express";
import { ListUserSenderComplimentsService } from "../services/ListUserSendComplimentsService";

class ListUserSendComplimentsController {
	async handle(req: Request, res: Response) {
		const { user_id } = req;
		const listUserSendComplimentsService = new ListUserSenderComplimentsService();
		const compliments = await listUserSendComplimentsService.execute(user_id);

		return res.json(compliments);
	}
}

export { ListUserSendComplimentsController };
