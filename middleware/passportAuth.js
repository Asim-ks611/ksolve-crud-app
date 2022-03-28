const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

var options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};

passport.use(
  new JwtStrategy(options, async function (jwtPayload, done) {
    try {
      const user = prisma.user.findUnique({
        where: {
          id: jwtPayload.sub,
        },
      });
      if (user) {
        return done(null, user);
      }
    } catch (error) {
      return done(null, false);
    }
  })
);
