// passport-jwt.strategy.ts

import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt'
import { PassportStatic } from 'passport'
import { AppDataSource } from '../../data-source'
import { User } from '../../users/entities/user.entity'

export const JwtSecretKey = process.env.JWT_SECRET || 'thesuppersecret'
export const RefreshTokenSecretKey = 'your_refresh_secret_key'

interface JwtPayload {
  sub: string
}

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JwtSecretKey,
}

export const configurePassport = (passport: PassportStatic): void => {
  passport.use(
    new Strategy(options, async (jwtPayload: JwtPayload, done: VerifiedCallback) => {
      try {
        console.log('jwtPayload', jwtPayload)
        const userRepository = AppDataSource.getRepository(User)
        const user = await userRepository.findBy({
          email: jwtPayload.sub,
        })
        if (user) {
          return done(null, user)
        } else {
          return done(null, false)
        }
      } catch (error) {
        return done(error, false)
      }
    })
  )
}
