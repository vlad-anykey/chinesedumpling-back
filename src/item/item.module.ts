import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { ItemController } from './item.controller'
import { ItemModel } from './item.model'
import { ItemService } from './item.service'

@Module({
	controllers: [ItemController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: ItemModel,
				schemaOptions: {
					collection: 'Item',
				},
			},
		]),
	],
	providers: [ItemService],
	exports: [ItemService],
})
export class ItemModule {}
