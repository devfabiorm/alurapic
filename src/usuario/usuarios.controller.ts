import { Body, Controller, Post } from '@nestjs/common';

@Controller('users')
export class UsuariosController {
  private usuarios = [];

  @Post()
  cria(@Body() usuario) {
    this.usuarios.push(usuario);

    return usuario;
  }
}
