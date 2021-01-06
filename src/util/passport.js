import { PrismaClient } from "@prisma/client";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

const verifyUser = async (payload, done) => {
  const prisma = new PrismaClient();
  try {
    const user = await prisma.user({ id: payload.id });
    if (user !== null) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
};
passport.use(new Strategy(jwtOptions, verifyUser));
