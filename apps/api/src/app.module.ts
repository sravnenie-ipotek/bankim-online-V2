import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import {
  LoggerModule,
  HttpExceptionFilter,
  HttpLoggingInterceptor,
} from '@bankimonline/logger';
import { validateEnv } from './config/env.validation';
import { DbModule } from './db/db.module';
import { HealthModule } from './modules/health/health.module';
import { ContentModule } from './modules/content/content.module';
import { MortgageModule } from './modules/mortgage/mortgage.module';
import { CustomerModule } from './modules/customer/customer.module';
import { BanksModule } from './modules/banks/banks.module';
import { LocationsModule } from './modules/locations/locations.module';
import { VacanciesModule } from './modules/vacancies/vacancies.module';
import { AuthModule } from './modules/auth/auth.module';
import { BankWorkerModule } from './modules/bank-worker/bank-worker.module';
import { RefinanceModule } from './modules/refinance/refinance.module';
import { LawyersModule } from './modules/lawyers/lawyers.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
    }),
    LoggerModule,
    CacheModule.register({
      isGlobal: true,
      ttl: 300_000, // 5 min default
    }),
    DbModule,
    HealthModule,
    ContentModule,
    MortgageModule,
    CustomerModule,
    BanksModule,
    LocationsModule,
    VacanciesModule,
    AuthModule,
    BankWorkerModule,
    RefinanceModule,
    LawyersModule,
    AdminModule,
  ],
  providers: [
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: HttpLoggingInterceptor },
  ],
})
export class AppModule {}
