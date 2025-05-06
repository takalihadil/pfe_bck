import { Controller, Post, Get, Body, Param, Patch, Delete, Request, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionDto } from './dto/transaction.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('transactions')
@UseGuards(AuthGuard('jwt')) // Protège toutes les routes avec JWT
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async create(@Request() req, @Body() data: TransactionDto) {
    const userId = req.user.id; 
    return this.transactionService.create(userId, data);
  }

  @Get()
  async findAll() {
    return this.transactionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.transactionService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: TransactionDto) {
    return this.transactionService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.transactionService.remove(id);
  }
}
