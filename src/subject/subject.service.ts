import { Injectable, NotFoundException } from '@nestjs/common'
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types'
import { Types } from 'mongoose'
import { InjectModel } from 'nestjs-typegoose'
import { CreateSubjectDto } from './dto/create-subject.dto'
import { SubjectModel } from './subject.model'

@Injectable()
export class SubjectService {
	constructor(
		@InjectModel(SubjectModel)
		private readonly subjectModel: ModelType<SubjectModel>
	) {}

	async getAll(searchTerm?: string): Promise<DocumentType<SubjectModel>[]> {
		let options = {}

		if (searchTerm) {
			options = {
				$or: [
					{
						name: new RegExp(searchTerm, 'i'),
					},
				],
			}
		}

		return (
			this.subjectModel
				.aggregate()
				.match(options)
				.lookup({
					from: 'Item',
					localField: '_id',
					foreignField: 'subjects',
					as: 'items',
				})
				.lookup({
					from: 'Events',
					localField: '_id',
					foreignField: 'subjects',
					as: 'events',
				})
				.addFields({
					countItems: { $size: '$items' },
				})
				.exec()
		)

	}

	async bySlug(slug: string){
		const doc = await this.subjectModel.findOne({ slug }).exec()
		if(!doc) throw new NotFoundException('Предмет не найден')
		return doc
	}

	/* Admin area */

	async byId(id: string): Promise<DocumentType<SubjectModel>> {
		const doc = await this.subjectModel.findById(id).exec()
		if(!doc) throw new NotFoundException('Предмет не найден')
		return doc
	}

	async create(): Promise<Types.ObjectId> {
		const defaultValue: CreateSubjectDto = {
			name: '',
			slug: '',
			revenue: null,
			revenueM: null,
			sales: null,
			salesM: null,
			price: null,
			priceM: null,
			cards: null,
			cardsM: null,
			sellers: null,
			sellersM: null,
			brands: null,
			brandsM: null,
			index: null
		}
		const subject = await this.subjectModel.create(defaultValue)
		return subject._id
	}

	async update(
		id: string,
		dto: CreateSubjectDto
	): Promise<DocumentType<SubjectModel> | null> {
		return this.subjectModel.findByIdAndUpdate(id, dto, { new: true }).exec()
	}

	async delete(id: string): Promise<DocumentType<SubjectModel> | null> {
		return this.subjectModel.findByIdAndDelete(id).exec()
	}
}
