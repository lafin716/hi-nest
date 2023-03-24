import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entites/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  // 이게 :id 밑에 있으면 search를 id로 인식함
  @Get('search')
  search(@Query('year') searchingYear: string) {
    return `We are searching for a movie made after: ${searchingYear}`;
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    console.log(typeof id);
    return this.moviesService.getOne(id);
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    return this.moviesService.create(movieData);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.moviesService.deleteOne(id);
  }

  @Put(':id')
  put(@Param('id') id: number) {
    return `This will update a movie with the id: ${id}`;
  }

  @Patch(':id')
  patch(@Param('id') id: number, @Body() updateData) {
    return {
      id: id,
      ...updateData,
    };
  }
}
