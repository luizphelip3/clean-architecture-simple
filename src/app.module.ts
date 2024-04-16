import { AuthModule } from '@modules/auth/auth.module';
import { JwtAuthGuard } from '@modules/auth/domain/guards/jwt/jwt.guard';
import { PublicationModule } from '@modules/publication/publication.module';
import { UserModule } from '@modules/user/user.module';
import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AuthModule, PublicationModule, UserModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
