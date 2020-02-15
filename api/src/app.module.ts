import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MoviesModule } from './movies/movies.module';

// mongodb+srv://admin:admin_123@nestrom-playground1-hofdl.mongodb.net/test?retryWrites=true&w=majority
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost', {
      dbName: 'nestrom',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
