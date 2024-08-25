import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Controller, UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "@project/core";
import {AuthKeyName} from "@project/config";

@ApiTags('orders')
@Controller('orders')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth(AuthKeyName)
export class OrdersController {}
