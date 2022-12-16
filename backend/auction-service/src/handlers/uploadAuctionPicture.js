import middy from '@middy/core';
import httpErrorHandler from "@middy/http-error-handler";
import validator from '@middy/validator';
import cors from '@middy/http-cors';
import createError from 'http-errors';
import { getAuctionByID } from "./getAuction";
import { uploadPictureToS3 } from "../lib/uploadPictureToS3";
import { setAuctionPictureUrl } from '../lib/setAuctionPictureUrl';
import uploadAuctionPictureSchema from '../lib/schemas/uploadAuctionPictureSchema';

export async function uploadAuctionPicture(event) {
    const { id } = event.pathParameters;
    const { email } = event.requestContext.authorizer;
    const auction = await getAuctionByID(id);

    if (auction.seller !== email) {
        throw new createError.Forbidden('You are not the seller of this auction');
    }

    // var base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    // if (base64regex.test(auction.pictureUrl) === FALSE) {
    //     throw new createError.Forbidden('no picture added')
    // }

    const base64 = event.body.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64, 'base64');

    let updatedAuction;

    try{
        const pictureUrl = await uploadPictureToS3(auction.id + '.jpg', buffer);
        updatedAuction = await setAuctionPictureUrl(auction.id, pictureUrl);
    } catch(error) {
        console.error(error);
        throw new createError.InternalServerError(error);
    }

    return {
        statusCode: 200,
        body: JSON.stringify(updatedAuction),
    };
}

export const handler = middy(uploadAuctionPicture)
    .use(httpErrorHandler())
    .use(
        validator({
            inputSchema: uploadAuctionPictureSchema,
            ajvOptions: {
                strict: false,
            },
        })
    )
    .use(cors());