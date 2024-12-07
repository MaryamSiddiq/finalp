/*import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';  // For creating temporary files

@Controller('images')
export class ImageControllerr {
  @Post('predicts')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: multer.diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          callback(null, file.originalname);
        },
      }),
      limits: { fileSize: 10 * 1024 * 1024 }, // Max file size: 10MB
    }),
  )
  async predict(@UploadedFile() file) {
    try {
      if (!file) {
        return { error: 'No file uploaded.' };
      }

      const filePath = path.join(__dirname, '..', '..', 'uploads', file.originalname);
      const imageData = fs.readFileSync(filePath);

      // Create a temporary file to store the image
      const tempFilePath = path.join(os.tmpdir(), 'temp_image.jpg');
      fs.writeFileSync(tempFilePath, imageData);  // Write the image to the temp file

      // Resolve the Python script path dynamically
      const pythonScript = path.resolve(
        __dirname,
        process.env.NODE_ENV === 'production' ? '../scripts/predict.py' : '../../src/scripts/predict.py'
      );
      console.log('Resolved Python script path:', pythonScript);

      if (!fs.existsSync(pythonScript)) {
        throw new Error(`Python script not found at path: ${pythonScript}`);
      }

      // Execute the Python script and pass the path to the temporary image file
      const command = `python ${pythonScript} "${tempFilePath}"`;

      const prediction = await new Promise<string>((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
          if (error) {
            reject(`Error: ${stderr || error.message}`);
          }
          resolve(stdout);
        });
      });

      // Clean up temporary file
      fs.unlinkSync(tempFilePath);  // Remove the temporary file after execution

      return { prediction: JSON.parse(prediction) };

    } catch (error) {
      console.error(error);
      return { error: error.message || 'An error occurred while processing the image.' };
    }
  }
}*/

import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';  // For creating temporary files

@Controller('images')
export class ImageControllerr {
  @Post('predicts')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: multer.diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          callback(null, file.originalname);
        },
      }),
      limits: { fileSize: 10 * 1024 * 1024 }, // Max file size: 10MB
    }),
  )
  async predict(@UploadedFile() file) {
    try {
      console.log("Received file:", file);  // Log the uploaded file

      if (!file) {
        console.error("No file uploaded.");  // Log when no file is uploaded
        return { error: 'No file uploaded.' };
      }

      const filePath = path.join(__dirname, '..', '..', 'uploads', file.originalname);
      console.log("File path:", filePath);  // Log the file path

      const imageData = fs.readFileSync(filePath);
      console.log("Image data read successfully");

      // Create a temporary file to store the image
      const tempFilePath = path.join(os.tmpdir(), 'temp_image.jpg');
      fs.writeFileSync(tempFilePath, imageData);  // Write the image to the temp file
      console.log("Temporary file created at:", tempFilePath);

      // Resolve the Python script path dynamically
      const pythonScript = path.resolve(
        __dirname,
        process.env.NODE_ENV === 'production' ? '../scripts/predict.py' : '../../src/scripts/predict.py'
      );
      console.log('Resolved Python script path:', pythonScript);

      if (!fs.existsSync(pythonScript)) {
        console.error(`Python script not found at path: ${pythonScript}`);  // Log if the script is not found
        throw new Error(`Python script not found at path: ${pythonScript}`);
      }

      // Ensure Python script runs with UTF-8 encoding by setting the environment variable
      const command = `python ${pythonScript} "${tempFilePath}"`;

      const prediction = await new Promise<string>((resolve, reject) => {
        exec(command, { encoding: 'utf8', env: { ...process.env, PYTHONIOENCODING: 'utf-8' } }, (error, stdout, stderr) => {
          if (error) {
            console.error("Python script execution error:", stderr || error.message);  // Log script errors
            reject(`Error: ${stderr || error.message}`);
          }
          console.log("Prediction result:", stdout);  // Log the prediction result
          resolve(stdout);
        });
      });

      // Clean up temporary file
      fs.unlinkSync(tempFilePath);  // Remove the temporary file after execution
      console.log("Temporary file removed");

      // Parse the JSON output
      const predictionData = JSON.parse(prediction);

      return { prediction: predictionData };

    } catch (error) {
      console.error("Error during image processing:", error);  // Log detailed error information
      return { error: error.message || 'An error occurred while processing the image.' };
    }
  }
}
