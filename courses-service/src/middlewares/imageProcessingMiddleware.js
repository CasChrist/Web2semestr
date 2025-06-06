"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processImage = void 0;
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const watermarkPath = path_1.default.join(__dirname, '../../utils/watermark.png');
const processImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        return next();
    }
    const inputPath = req.file.path;
    const outputPath = path_1.default.join(path_1.default.dirname(inputPath), 'processed-' + req.file.filename);
    try {
        const watermark = yield (0, sharp_1.default)(watermarkPath).resize(100).png().toBuffer();
        yield (0, sharp_1.default)(inputPath)
            .resize(800) // Resize image to max width 800px
            .composite([{ input: watermark, gravity: 'southeast', blend: 'overlay' }])
            .jpeg({ quality: 80 })
            .toFile(outputPath);
        // Replace original file with processed file
        fs_1.default.unlinkSync(inputPath);
        fs_1.default.renameSync(outputPath, inputPath);
        next();
    }
    catch (error) {
        console.error('Error processing image:', error);
        next(error);
    }
});
exports.processImage = processImage;
