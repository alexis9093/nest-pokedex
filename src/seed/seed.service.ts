import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from '../common/adapters/axios.adapter';
//Paginacion
@Injectable()
export class SeedService {
  
  
  
  constructor(
    @InjectModel(Pokemon.name)
        private readonly pokemonModel: Model<Pokemon>,
        private readonly http: AxiosAdapter,
  ) {}

  
  async excuteSeed() {

    await this.pokemonModel.deleteMany({}); // delete * from pokemons;

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    const pokemosnToInsert: {name: string, no: number}[] = []; //Recomendado usar este tipo de arreglo para insertar todos los pokemons en una sola consulta a la base de datos, ya que es mas eficiente que hacer un create por cada pokemon

    const insertPromisesArray: Promise<any>[] = [];

    data.results.forEach(({name, url}) => {

      const segments = url.split('/');
      const no = +segments[segments.length - 2];
      //const pokemon = await this.pokemonModel.create({name, no});
      /*insertPromisesArray.push(
        this.pokemonModel.create({name, no})
      );*/

      pokemosnToInsert.push({name, no});// [{name: bulbasaur, no: 1}, {name: ivysaur, no: 2}, ...]
    });

    await this.pokemonModel.insertMany(pokemosnToInsert); // insert into pokemons (name, no) values (bulbasaur, 1), (ivysaur, 2), ...[Recomendado hacerlo de esta manera ya que es mas eficiente que hacer un create por cada pokemon]]

    //await Promise.all(insertPromisesArray);

    return 'Seed executed successfully';
  }

}
