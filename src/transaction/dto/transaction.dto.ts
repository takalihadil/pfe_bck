// src/transaction/dto/transaction.dto.ts
import { IsString, IsEnum, IsNumber, IsOptional, IsDate } from 'class-validator';
import { Category, TransactionType, Source } from '@prisma/client';

export class TransactionDto {
  @IsString()
  description: string;

  @IsEnum(Category)
  category: Category;

  @IsEnum(TransactionType)
  type: TransactionType;

  @IsNumber()
  amount: number;

  @IsEnum(Source)
  source: Source;

  @IsOptional()  
  @IsNumber()
  feeDeductions?: number;

  @IsOptional()  
  @IsNumber()
  taxDeductions?: number;

  @IsDate()
  date: Date;

  @IsString()
  userId: string; 
}
