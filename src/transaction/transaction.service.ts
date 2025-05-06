
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TransactionDto } from './dto/transaction.dto';
import { Transaction } from '@prisma/client';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  
  async create(userId: string, data: TransactionDto): Promise<Transaction> {
    return this.prisma.transaction.create({
      data: {
        description: data.description,
        amount: data.amount,
        date: data.date || new Date(),
        category: data.category,
        type: data.type,
        source: data.source,
        feeDeductions: data.feeDeductions || 0,
        taxDeductions: data.taxDeductions || 0,
        userId: userId, 
      },
    });
  }

  
  async findAll(): Promise<Transaction[]> {
    return this.prisma.transaction.findMany();
  }

  
  async findOne(id: string): Promise<Transaction> {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    return transaction;
  }

  
  async update(id: string, transactionDto: TransactionDto): Promise<Transaction> {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
    });

    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    
    return this.prisma.transaction.update({
      where: { id },
      data: {
        description: transactionDto.description,
        amount: transactionDto.amount,
        date: transactionDto.date || new Date(),
        category: transactionDto.category,
        type: transactionDto.type,
        source: transactionDto.source,
        feeDeductions: transactionDto.feeDeductions || 0,
        taxDeductions: transactionDto.taxDeductions || 0,
      },
    });
  }

  async remove(id: string): Promise<Transaction> {
   
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
    });

    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

  
    return this.prisma.transaction.delete({
      where: { id },
    });
  }
}
