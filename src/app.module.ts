import { join } from 'path';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import { CommonModule } from './common/common.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { SeedModule } from './seed/seed.module';

const mongoUri = process.env.MONGO_URI ?? 'mongodb://localhost:27017/nest-pokedex';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    MongooseModule.forRoot(mongoUri),

    PokemonModule,
    CommonModule,
    SeedModule,
  ],
})
export class AppModule {}
