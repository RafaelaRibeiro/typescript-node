import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { Subject } from "typeorm/persistence/Subject";

interface IAuthenticateRequest {
	email: string;
	password: string;
}
class AuthUserService {
	async execute({ email, password }: IAuthenticateRequest) {
		//Verificar se e-mail existe
		const usersRepositories = getCustomRepository(UsersRepositories);

		const user = await usersRepositories.findOne({
			email,
		});

		if (!user) {
			throw new Error("Email/Password incorrect");
		}

		//Verificar se a senha está correta

		const passwordMacth = await compare(password, user.password);

		if (!passwordMacth) {
			throw new Error("Email/Password incorrect");
		}

		// Gerar Token
		const token = sign(
			{
				email: user.email,
			},
			"56cef011e243968da90b8039bc80cdeb",
			{
				subject: user.id,
				expiresIn: "1d",
			},
		);

		return token;
	}
}

export { AuthUserService };
