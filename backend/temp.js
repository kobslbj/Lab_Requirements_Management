const { MongoClient, GridFSBucket } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function uploadFile(file) {
  await client.connect();
  const db = client.db('temp');
  const bucket = new GridFSBucket(db);
  
  const uploadStream = bucket.openUploadStream(file.filename);
  const attachments = [];

  await new Promise((resolve, reject) => {
    uploadStream.end(file.data);
    uploadStream.on("finish", () => {
      attachments.push({ file: uploadStream.id });
      resolve();
    });
    uploadStream.on("error", (error) => {
      reject(error);
    });
  });

  return attachments;
}

// Example usage
const file = {
  filename: 'example.txt',
  data: Buffer.from('Hello, world!')
};

uploadFile(file)
  .then(attachments => {
    console.log('Uploaded successfully:', attachments);
  })
  .catch(error => {
    console.error('Error uploading file:', error);
  });
