import { ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import * as KeycloakBearerStrategy from 'passport-keycloak-bearer';

@Injectable()
export class KeycloakStrategy extends PassportStrategy(KeycloakBearerStrategy) {
  constructor() {
    super({
      realm: 'pessoas',
      url: process.env.KEYCLOAK_AUTHENTICATION_ENDPOINT,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.nome };
  }
}
