// passport-jwt.strategy.ts

import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt'
import { PassportStatic } from 'passport'
import { User } from '../../users/entities/user.entity'
import { AppDataSource } from '../../data-source'

export const JwtSecretKey = process.env.JWT_SECRET || 'thesuppersecret'
export const RefreshTokenSecretKey = 'your_refresh_secret_key'

interface JwtPayload {
  sub: number
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
          id: jwtPayload.sub,
        }) // find by id
        if (user) {
          return done(null, user)
        } else {
          return done(null, false)
          // or you could create a new account
        }
      } catch (error) {
        return done(error, false)
      }
    })
  )
}
