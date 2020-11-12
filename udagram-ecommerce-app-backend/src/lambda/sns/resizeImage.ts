import { SNSHandler, SNSEvent, S3EventRecord } from 'aws-lambda';
import 'source-map-support/register';

import {createThumbnail} from '../../businessLogic/ItemImage'

export const handler:SNSHandler = async (event:SNSEvent)=>{
    console.log('Processing SNS event ', JSON.stringify(event))

    for (const snsRecord of event.Records){
        const s3eEvent = JSON.parse(snsRecord.Sns.Message);
        console.log('Processing S3 event', s3eEvent);

        for (const record of s3eEvent.Records){
            await processImage(record);
        }
    }
}

async function processImage(record:S3EventRecord){
    console.log('In processImage function()');
    const key = record.s3.object.key;
    console.log('Key of record ', key)
    await createThumbnail(key);
}