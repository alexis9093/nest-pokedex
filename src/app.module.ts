import { join } from 'path';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';


import { CommonModule } from './common/common.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { SeedModule } from './seed/seed.module';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';

//const mongoUri = process.env.MONGODB;

/*if (!mongoUri) {
  throw new Error('La variable de entorno MONGODB no está definida');
}*/

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
      uri: configService.get<string>('MONGODB'),
      dbname: 'pokemonsdb'
  }),
    }),

    PokemonModule,
    CommonModule,
    SeedModule,
  ],
})
export class AppModule {}
