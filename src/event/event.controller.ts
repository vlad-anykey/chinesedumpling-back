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
	ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/Auth.decorator'
import { IdValidationPipe } from 'src/pipes/id.validation.pipe'
import { CreateEventDto } from './dto/creat-event.dto'
import { EventService } from './event.service'

@Controller('events')
export class EventController {
	constructor(private readonly eventService: EventService) {}

	//@Auth()
	@Get('by-slug/:slug')
	async bySlug(@Param('slug') slug: string) {
		return this.eventService.bySlug(slug)
	}

	//@Auth()
	@Get()
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.eventService.getAll(searchTerm)
	}

	@Get(':id')
	@Auth('admin')
	async get(@Param('id', IdValidationPipe) id: string) {
		return this.eventService.byId(id)
	}

	@UsePipes(new ValidationPipe())
	@Post()
	@HttpCode(200)
	@Auth('admin')
	async create() {
		return this.eventService.create()
	}

	@UsePipes(new ValidationPipe())
	@Put(':id')
	@HttpCode(200)
	@Auth('admin')
	async update(
		@Param('id', IdValidationPipe) id: string,
		@Body() dto: CreateEventDto
	) {
		const updateEvent = await this.eventService.update(id, dto)
		if (!updateEvent) throw new NotFoundException('Выставка не найдена')
		return updateEvent
	}

	@Delete(':id')
	@Auth('admin')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const deletedDoc = await this.eventService.delete(id)
		if (!deletedDoc) throw new NotFoundException('Выставка не найдена')
	}
}
