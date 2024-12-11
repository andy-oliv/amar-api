import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Logger } from 'nestjs-pino';
import { ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserManagementService } from '../user-management/user-management.service';

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;
  let logger: Logger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findFirst: jest.fn(),
              create: jest.fn(),
            },
          },
        },
        {
          provide: Logger,
          useValue: {
            error: jest.fn(),
            log: jest.fn(),
          },
        },
        {
          provide: UserManagementService,
          useValue: {
            idValidation: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
    logger = module.get<Logger>(Logger);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should throw ConflictException if the email already exists', async () => {
    const mockUser = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'password',
    };
    (prismaService.user.findFirst as jest.Mock).mockResolvedValue(mockUser);

    await expect(userService.createUser(mockUser)).rejects.toThrow(
      ConflictException,
    );
    expect(logger.error).toHaveBeenCalledWith(expect.any(String), {
      error: mockUser.email,
    });
  });
});
