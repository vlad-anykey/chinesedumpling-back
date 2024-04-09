import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { SubjectController } from './subject.controller'
import { SubjectModel } from './subject.model'
import { SubjectService } from './subject.service'

@Module({
	controllers: [SubjectController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: SubjectModel,
				schemaOptions: {
					collection: 'Subject',
				},
			},
		]),
	],
	providers: [SubjectService],
})
export class SubjectModule {}
