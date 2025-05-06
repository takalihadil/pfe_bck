import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Logger } from '@nestjs/common';

@Injectable()
export class SupabaseService implements OnModuleInit {
  private supabase: SupabaseClient;
  private readonly logger = new Logger(SupabaseService.name);

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseKey = this.configService.get<string>('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseKey) {
      this.logger.warn('Supabase URL or key not provided. Real-time functionality will be limited.');
      return;
    }

    this.supabase = createClient(supabaseUrl, supabaseKey);
    this.logger.log('Supabase client initialized');
  }

  getClient(): SupabaseClient {
    if (!this.supabase) {
      throw new Error('Supabase client not initialized');
    }
    return this.supabase;
  }

  async broadcastToChat(chatId: string, event: string, payload: any): Promise<void> {
    if (!this.supabase) return;

    try {
      await this.supabase.channel(`chat:${chatId}`).send({
        type: 'broadcast',
        event,
        payload,
      });
      this.logger.debug(`Broadcast to chat:${chatId} - Event: ${event}`);
    } catch (error) {
      this.logger.error(`Failed to broadcast to chat:${chatId}`, error);
    }
  }

  async broadcastTyping(chatId: string, userId: string, name: string, isTyping: boolean): Promise<void> {
    await this.broadcastToChat(chatId, 'typing', {
      chatId,
      userId,
      name,
      isTyping,
    });
  }

  async broadcastMessageStatus(chatId: string, messageId: string, status: string): Promise<void> {
    await this.broadcastToChat(chatId, 'message_status', {
      messageId,
      status,
    });
  }

  async broadcastNewMessage(chatId: string, message: any): Promise<void> {
    await this.broadcastToChat(chatId, 'message', message);
  }

  async broadcastMessageDeleted(
    chatId: string,
    messageId: string,
    deletedForEveryone: boolean,
    userId?: string
  ): Promise<void> {
    await this.broadcastToChat(chatId, 'message_deleted', {
      messageId,
      deletedForEveryone,
      deletedForUser: userId
    });
  }
}