import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private supabase: SupabaseClient;

  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private configService: ConfigService
  ) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseKey = this.configService.get<string>('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase URL or Service Role Key is missing in .env');
    }

    this.supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
  }

  async register(data: { email: string; password: string; fullname: string; phone?: string; role?: string }) {
    const existingUser = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    
    const { data: authData, error: authError } = await this.supabase.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
    });
  
    if (authError) {
      throw new ConflictException(`Supabase Auth Error: ${authError.message}`);
    }
  
    if (!authData || !authData.user) {
      throw new InternalServerErrorException('User creation failed: No user data returned from Supabase');
    }
  
    const userId = authData.user.id; 
    if (!userId) {
      throw new InternalServerErrorException('Failed to retrieve user ID from Supabase.');
    }
  
    const user = await this.prisma.user.create({
      data: {
        id_users: userId,  
        email: data.email,
        fullname: data.fullname,
        phone: data.phone || null,
        role: data.role || 'user', 
        password: data.password,  
      },
    });
  
    return { message: 'User registered successfully', user };
  }
  
  
  
  

  async login(email: string, password: string) {
    const response = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });
  
    if (response.error || !response.data || !response.data.user) {
      throw new ConflictException('Invalid email or password');
    }
  
    const user = response.data.user; 
  
    const payload = { sub: user.id, email: user.email };
  
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
  async getUsers(currentUserId?: string) {
    const whereCondition = currentUserId
      ? { id_users: { not: currentUserId } }
      : {};
  
    const users = await this.prisma.user.findMany({
      where: whereCondition,
      select: {
        id: true,
        id_users: true,
        fullname: true,
        profile_photo: true,
        email: true,
        phone: true
      }
    });
  
    return users;
  }
  
  async getUserById(userId: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          projects: {
            include: {
              tasks: true,
            },
          },
          posts: {
            include: {
              media: true,
              reactions: true,
              comments: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          },
          habits: {
            include: {
              completions: {
                orderBy: {
                  date: "desc",
                },
                take: 10,
              },
            },
          },
          followedBy: {
            include: {
              follower: {
                select: {
                  id: true,
                  fullname: true,
                  profile_photo: true,
                },
              },
            },
          },
          following: {
            include: {
              following: {
                select: {
                  id: true,
                  fullname: true,
                  profile_photo: true,
                },
              },
            },
          },
        },
      })

      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`)
      }

      return user
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }
      console.error("Error fetching user by ID:", error)
      throw new InternalServerErrorException("Failed to fetch user profile")
    }
  }
  
  

}
