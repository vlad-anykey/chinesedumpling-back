import { prop, Ref } from '@typegoose/typegoose'
import { Base } from '@typegoose/typegoose/lib/defaultClasses'
import { SubjectModel } from 'src/subject/subject.model'

export interface EventModel extends Base {}

export class EventModel{
	@prop()
	name: string

	@prop({ unique: true })
	slug: string

	@prop()
	city: string

	@prop()
	description: string

	@prop({default:"MdLocationOn"})
	icon: string

	@prop()
	index: number

	@prop({ ref: () => SubjectModel })
	subjects: Ref<SubjectModel>[]
}
