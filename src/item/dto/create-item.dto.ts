import {
	IsArray,
	IsNumber,
	IsString
} from 'class-validator'

export class CreateItemDto {
	@IsString()
	slug: string

	@IsString()
	name: string

	@IsString()
	seller: string

	@IsString()
	brand: string

	@IsArray()
	@IsString({ each: true })
	subjects: string[]

	@IsArray()
	@IsString({ each: true })
	events: string[]

	@IsString()
	image: string

	@IsNumber()
	revenue: number

	@IsNumber()
	sales: number

	@IsNumber()
	price: number

	@IsNumber()
	index: number
}
