const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// UPLOAD FILE TO S3
function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
    ContentType : 'image/jpeg',
  };

  return s3.upload(uploadParams).promise();
}

// DOWNLOAD FILE FROM S3
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3.getObject(downloadParams).createReadStream();
}

function deleteFile(fileKey) {
  const deleteParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3.deleteObject(deleteParams).promise();
}


const uploadLogsFile = async(req,res)=>{
  let ts = Date.now();

  let date_ob = new Date(ts);
  let date = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  fs.readFile('logs/info.log',async function(err, data) {
    if (err) throw err;
    const params = {
        Bucket: bucketName,
        Key: `logs/${year}-${month}-${date}.log`,
        Body: data,
    };
    s3.upload(params, async function(s3Err, data) {
        if (s3Err) throw s3Err;
        fs.writeFile('logs/info.log', '',async function(){});
    });
 });
}

module.exports = { 
    uploadFile, 
    getFileStream,
    deleteFile,
    uploadLogsFile,
};