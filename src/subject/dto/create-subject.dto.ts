import { IsNumber, IsString } from 'class-validator'

export class CreateSubjectDto {
	@IsString()
	name: string

	@IsString()
	slug: string

	@IsNumber()
	revenue: number

	@IsNumber()
	revenueM: number

	@IsNumber()
	sales: number

	@IsNumber()
	salesM: number

	@IsNumber()
	price: number

	@IsNumber()
	priceM: number

	@IsNumber()
	cards: number

	@IsNumber()
	cardsM: number

	@IsNumber()
	sellers: number

	@IsNumber()
	sellersM: number

	@IsNumber()
	brands: number

	@IsNumber()
	brandsM: number

	@IsNumber()
	index: number

}


