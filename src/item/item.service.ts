import { Injectable, NotFoundException } from '@nestjs/common'
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types'
import { Types } from 'mongoose'
import { InjectModel } from 'nestjs-typegoose'

import { CreateItemDto } from './dto/create-item.dto'
import { ItemModel } from './item.model'

@Injectable()
export class ItemService {
	constructor(
		@InjectModel(ItemModel) private readonly itemModel: ModelType<ItemModel>
	) {}

	async getAll(searchTerm?: string): Promise<DocumentType<ItemModel>[]> {
		let options = {}

		if (searchTerm) {
			options = {
				$or: [
					{
						name: new RegExp(searchTerm, 'i'),
					},
					{
						brand: new RegExp(searchTerm, 'i'),
					},
					{
						seller: new RegExp(searchTerm, 'i'),
					},
				],
			}
		}

		return this.itemModel
			.find(options)
			.sort({ index: 'asc' })
			.populate('events subjects')
			.exec()
	}

	async bySlug(slug: string) {
		const doc =  this.itemModel.findOne({ slug }).populate('events subjects').exec()
		if (!doc) throw new NotFoundException('Предмет не найден')
		return doc
	}

	async bySubject(subjectId: Types.ObjectId): Promise<DocumentType<ItemModel>[]> {
		const doc = this.itemModel.find({ subjects: subjectId }).exec()
		if (!doc) throw new NotFoundException('Предметы не найдены')
		return doc
	}

	async byEvents(
		eventIds: Types.ObjectId[]
	): Promise<DocumentType<ItemModel>[]> {
		const doc = this.itemModel.find({ events: { $in: eventIds } }).exec()
		if (!doc) throw new NotFoundException('Предметы не найдены')
		return doc
	}

	async updateCountOpened(slug: string) {
		const updateDoc = this.itemModel
			.findOneAndUpdate({ slug }, { $inc: { countOpened: 1 } },
			{
				new: true,
			})
			.exec()
			if (!updateDoc) throw new NotFoundException('Предметы не найдены')
			return updateDoc
	}

	/* Admin area */

	async byId(id: string): Promise<DocumentType<ItemModel>> {
		const doc = this.itemModel.findById(id).exec()
		if (!doc) throw new NotFoundException('Предмет не найден')
		return doc
	}

	async create(): Promise<Types.ObjectId> {
		const defaultValue: CreateItemDto = {
			slug:'',
			name:'',
			seller:'',
			brand:'',
			image:'',
			revenue: null,
			sales: null,
			price: null,
			index: null,
			subjects:[],
			events:[],
		}
		const item = await this.itemModel.create(defaultValue)
		return item._id
	}

	async update(
		id: string,
		dto: CreateItemDto
	): Promise<DocumentType<ItemModel> | null> {
		const updateDoc = this.itemModel.findByIdAndUpdate(id, dto, { new: true }).exec()
		if (!updateDoc) throw new NotFoundException('Предметы не найдены')
		return updateDoc
	}

	async delete(id: string): Promise<DocumentType<ItemModel> | null> {
		const doc = this.itemModel.findByIdAndDelete(id).exec()
		if (!doc) throw new NotFoundException('Предмет не найден')
		return doc
	}

	async getMostPopular(): Promise<DocumentType<ItemModel>[]> {
		return this.itemModel
			.find({ countOpened: { $gt: 0 } })
			.sort({ countOpened: -1 })
			.populate('subjects')
			.exec()
	}
}
