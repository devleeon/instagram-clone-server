import { PrismaClient } from "@prisma/client";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.PASSPORT_SECRET,
};

const verifyUser = async (payload, done) => {
  const prisma = new PrismaClient();
  try {
    const user = await prisma.user.findUnique({ where: { id: payload.id } });
    if (user !== null) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
};

export const authenticateJwt = (req, res, next) =>
  passport.authenticate("jwt", { sessions: false }, (error, user) => {
    if (user) {
      req.user = user;
    } else {
      console.log(error);
    }
    next();
  })(req, res, next);

passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();
