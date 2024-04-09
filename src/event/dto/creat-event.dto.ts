import { IsArray, IsString } from 'class-validator'

export class CreateEventDto {
	@IsString()
	name: string

	@IsString()
	slug: string
	
	@IsString()
	city: string
	
	@IsString()
	description: string

	@IsString()
	icon: string

	@IsString()
	index: number

	@IsArray()
	@IsString({ each: true })
	subjects: string[]
}
