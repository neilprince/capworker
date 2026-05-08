"use strict";

const cds = require("@sap/cds");
const { uuid } = cds.utils;

module.exports = cds.service.impl(async function () {
    this.on("executeJob", async (msg) => {
        console.log ('>received exceute job:', msg.event, msg.data);
        const { jobType } = msg.data;
        const { jobId } = uuid();
        console.log(`Job of type ${jobType} with id ${jobId} executed`);
        this.emit ('JobService.completed', { jobId, jobType });
    });
});
