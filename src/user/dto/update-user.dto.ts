import { IsEmail } from 'class-validator'

export class UpdaeUserDto{

	@IsEmail()
	email: string

	name?: string

	password?:string

	isAdmin?:boolean
}