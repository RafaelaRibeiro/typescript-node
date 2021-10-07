import { Request, Response, NextFunction, request } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
	sub: string;
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
	//Receber Token
	const authTtoken = req.headers.authorization;

	//Validar se token está preenchido

	if (!authTtoken) {
		return res.status(401).json({ message: "Token missing" });
	}

	const [, token] = authTtoken.split(" ");

	//Validar se token é válido
	try {
		const { sub } = verify(token, "56cef011e243968da90b8039bc80cdeb") as IPayload;

		req.user_id = sub;

		return next();
	} catch (err) {
		return res.status(401).json({ message: "Token invalid" });
	}

	//Recuperar informações do usuário
}
