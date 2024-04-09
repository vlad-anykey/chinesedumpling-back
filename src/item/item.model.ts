import { prop, Ref } from '@typegoose/typegoose'
import { Base } from '@typegoose/typegoose/lib/defaultClasses'
import { EventModel } from 'src/event/event.model'
import { SubjectModel } from 'src/subject/subject.model'

export interface ItemModel extends Base {}

export class ItemModel {
	@prop({ unique: true })
	slug: string
	
	@prop()
	name: string
	
	@prop()
	seller: string
	
	@prop()
	brand: string
	
	@prop()
	image: string
	
	@prop()
	revenue: number
	
	@prop()
	sales: number
	
	@prop()
	price: number
	
	@prop()
	index: number

	@prop({ ref: () => SubjectModel })
	subjects: Ref<SubjectModel>[]

	@prop({ default: 0 })
	countOpened?: number

	@prop({ ref: () => EventModel })
	events: Ref<EventModel>[]



}
