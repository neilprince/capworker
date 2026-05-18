"use strict";
const cds = require("@sap/cds");

module.exports = cds.service.impl(async function () {
    const messaging = await cds.connect.to('messaging');

    messaging.on('appService.JobSubmitted', async (msg) => {
        const { jobType } = msg.data;
        const jobId = cds.utils.uuid();
        console.log(`> Received job of type ${jobType}, assigned id ${jobId}`);
        // simulate job processing time
        const waitTime = Math.floor(Math.random() * 3000) + 2000;
        await new Promise(resolve => setTimeout(resolve, waitTime));
        console.log(`> Sending: Job of type ${jobType} with id ${jobId} executed`);
        await this.emit('completed', { jobId, jobType });
    });
});
