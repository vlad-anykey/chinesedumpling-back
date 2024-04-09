import { Injectable, NotFoundException } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { CreateEventDto } from './dto/creat-event.dto'
import { EventModel } from './event.model'

@Injectable()
export class EventService {
	constructor(
		@InjectModel(EventModel) private readonly eventModel: ModelType<EventModel>,
	) {}

	async getAll(searchTerm?: string){
		let options = {}

		if (searchTerm) {
			options = {
				$or: [
					{
						name: new RegExp(searchTerm, 'i'),
					},
					{
						city: new RegExp(searchTerm, 'i'),
					},
					{
						description: new RegExp(searchTerm, 'i'),
					},
				],
			}
		}

		return this.eventModel
			.find(options)
			.sort({ index: 'asc' })
			.populate('subjects')
			.exec()
	}

	async bySlug(slug: string){
		const doc = await this.eventModel.findOne({ slug }).exec()
		if(!doc) throw new NotFoundException('Выставка не найдена')
		return doc
	}


	/* Admin area */

	async byId(id: string){
		const doc = await this.eventModel.findById(id).exec()
		if(!doc) throw new NotFoundException('Выставка не найдена')
		return doc
	}

	async create(){
		const defaultValue: CreateEventDto = {
			name: '',
			slug: '',
			city: '',
			icon: '',
			description: '',
			subjects: [],
			index: null,
		}
		const event = await this.eventModel.create(defaultValue)
		return event._id
	}

	async update(
		id: string,
		dto: CreateEventDto
	){
		return this.eventModel.findByIdAndUpdate(id, dto, { new: true }).exec()
	}

	async delete(id: string){
		return this.eventModel.findByIdAndDelete(id).exec()
	}

}
