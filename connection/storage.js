const { BlobServiceClient } = require('@azure/storage-blob');
const connect = () => {
  return BlobServiceClient.fromConnectionString(
    process.env.CUSTOMCONNSTR_AZURE_STORAGE
  );
};

module.exports = { connect };
