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
import { Auth } from 'src/auth/decorators/Auth.decorator'
import { IdValidationPipe } from 'src/pipes/id.validation.pipe'
import { CreateSubjectDto } from './dto/create-subject.dto'
import { SubjectService } from './subject.service'

@Controller('subjects')
export class SubjectController {
	constructor(private readonly subjectService: SubjectService) {}

	@Auth()
	@Get()
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.subjectService.getAll(searchTerm)
	}

	@Auth()
	@Get('by-slug/:slug')
	async bySlug(@Param('slug') slug: string) {
		return this.subjectService.bySlug(slug)
	}

	@UsePipes(new ValidationPipe())
	@Post()
	@HttpCode(200)
	@Auth('admin')
	async create() {
		return this.subjectService.create()
	}

	@Get(':id')
	@Auth('admin')
	async get(@Param('id', IdValidationPipe) id: string) {
		return this.subjectService.byId(id)
	}

	@UsePipes(new ValidationPipe())
	@Put(':id')
	@HttpCode(200)
	@Auth('admin')
	async update(
		@Param('id', IdValidationPipe) id: string,
		@Body() dto: CreateSubjectDto
	) {
		const updateSubject = await this.subjectService.update(id, dto)
		if (!updateSubject) throw new NotFoundException('Subject not found')
		return updateSubject
	}

	@Delete(':id')
	@Auth('admin')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const deletedDoc = await this.subjectService.delete(id)
		if (!deletedDoc) throw new NotFoundException('Subject not found')
	}
}
