import { Module } from '@nestjs/common';

import { UsuariosController } from './usuario/usuarios.controller';

@Module({
  imports: [],
  controllers: [UsuariosController],
  providers: [],
})
export class AppModule {}
