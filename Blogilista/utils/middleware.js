const logger= (req, res, next) => {

    //test ympäristön konsolin siistittaminen
    if (process.env.NODE_ENV === 'test'){
        return next()
    }
    console.log('Method: ', req.method)
    console.log('Path: ', req.path)
    console.log('Body: ', req.body)
    console.log('-----')
    next()
}

const error= (req, res) => {
    res.status(404).send({ error : 'unknown endpoint'})
}


const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer ')){
        req.token = authorization.substring(7)
        next()
    }
    next()
}

module.exports = {logger, error, tokenExtractor}
