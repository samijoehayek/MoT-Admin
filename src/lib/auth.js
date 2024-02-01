import {jwtVerify, SignJWT} from 'jose'

export const getJwtSecretKey = () => {
    const secret = process.env.JWT_SECRET_KEY
    
    if (!secret || secret.length === 0) {
        throw new Error('JWT_SECRET_KEY is not defined')
    }

    return secret
}

export const verifyAuth = async (token) => {
    try {
        const verified = await jwtVerify(token, new TextEncoder().encode(getJwtSecretKey()))
        return !(verified.payload.exp < Date.now()) ? verified.payload : null
    } catch (error) {
        throw new Error('Your token has expired')
    }
}