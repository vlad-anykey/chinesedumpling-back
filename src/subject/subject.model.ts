import { prop } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export interface SubjectModel extends Base {}

export class SubjectModel{
	@prop()
	name: string

	@prop({ unique: true })
	slug: string

	@prop()
	revenue: number

	@prop()
	revenueM: number

	@prop()
	sales: number

	@prop()
	salesM: number

	@prop()
	price: number

	@prop()
	priceM: number

	@prop()
	cards: number

	@prop()
	cardsM: number

	@prop()
	sellers: number

	@prop()
	sellersM: number

	@prop()
	brands: number

	@prop()
	brandsM: number

	@prop()
	index: number
}
