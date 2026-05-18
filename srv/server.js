const cds = require('@sap/cds');

cds.once('served', async () => {
    const messaging = await cds.connect.to('messaging');
    const JobService = await cds.connect.to('JobService');

    // Route incoming broker messages to the local service handler.
    // Safe: 'executeJob' is NOT a CDS-declared event, so CAP will NOT
    // re-publish it back to the broker — no loop.
    messaging.on('JobService.executeJob', msg => JobService.emit('executeJob', msg.data));

    // No bridge needed for 'completed': this.emit('completed', ...) in the
    // service impl auto-publishes to the broker because 'completed' IS a
    // declared CDS event with messaging configured.
});
