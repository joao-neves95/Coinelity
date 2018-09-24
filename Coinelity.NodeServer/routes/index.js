const router = require( 'express' ).Router();
const exchangesRoute = require( '../routes/exchanges' );

router.use( ( req, res, next ) => {
  res.type( 'application/json' );
  next();
} );

router.get( '/pairs', ( req, res ) => {
  return exchangesRoute.getAllPairs();
} );

module.exports = router;
