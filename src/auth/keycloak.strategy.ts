import { ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import * as KeycloakBearerStrategy from 'passport-keycloak-bearer';

@Injectable()
export class KeycloakStrategy extends PassportStrategy(KeycloakBearerStrategy) {
  constructor() {
    super({
      realm: process.env.NODE_ENV === 'production' ? 'pessoas' : 'Funcionarios',
      url:
        process.env.NODE_ENV === 'production'
          ? process.env.KEYCLOAK_AUTHENTICATION_ENDPOINT
          : process.env.KEYCLOAK_PERSON_AUTHENTICATION_ENDPOINT,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.nome };
  }
}
