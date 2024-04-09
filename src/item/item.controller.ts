import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { Types } from 'mongoose'
import { Auth } from 'src/auth/decorators/Auth.decorator'
import { IdValidationPipe } from '../pipes/id.validation.pipe'
import { CreateItemDto } from './dto/create-item.dto'
import { ItemService } from './item.service'

@Controller('items')
export class ItemController {
	constructor(private readonly itemService: ItemService) {}

	//@Auth()
	@Get('by-slug/:slug')
	async bySlug(@Param('slug') slug: string) {
		return this.itemService.bySlug(slug)
	}

	@Auth()
	@Get('by-subject/:subjectId')
	async bySubject(@Param('subjectId', IdValidationPipe) subjectId: Types.ObjectId) {
		return this.itemService.bySubject(subjectId)
	}

	//@Auth()
	@UsePipes(new ValidationPipe())
	@Post('by-events')
	@HttpCode(200)
	async byEvents(
		@Body('eventIds')
		eventIds: Types.ObjectId[]
	) {
		return this.itemService.byEvents(eventIds)
	}

	//@Auth()
	@Get()
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.itemService.getAll(searchTerm)
	}

	//@Auth()
	@Get('most-popular')
	async getMostPopular() {
		return this.itemService.getMostPopular()
	}

	@Put('update-count-opened')
	@HttpCode(200)
	async updateCountOpened(@Body('slug') slug: string) {
		return this.itemService.updateCountOpened(slug)
	}

	@Get(':id')
	@Auth('admin')
	async get(@Param('id', IdValidationPipe) id: string) {
		return this.itemService.byId(id)
	}

	@Post()
	@HttpCode(200)
	@Auth('admin')
	async create() {
		return this.itemService.create()
	}

	@UsePipes(new ValidationPipe())
	@Put(':id')
	@HttpCode(200)
	@Auth('admin')
	async update(
		@Param('id', IdValidationPipe) id: string,
		@Body() dto: CreateItemDto
	) {
		const updateItem = await this.itemService.update(id, dto)
		if (!updateItem) throw new NotFoundException('Предмет не найден')
		return updateItem
	}

	@Delete(':id')
	@Auth('admin')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const deletedDoc = await this.itemService.delete(id)
		if (!deletedDoc) throw new NotFoundException('Предмет не найден')
	}
}
