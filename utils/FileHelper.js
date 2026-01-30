const fs = require('fs');
const path = require('path');

class FileHelper {
    /**
     * Read file content
     * @param {string} filePath - Path to the file
     * @returns {string} File content
     */
    static readFile(filePath) {
        return fs.readFileSync(filePath, 'utf8');
    }

    /**
     * Write content to file
     * @param {string} filePath - Path to the file
     * @param {string} content - Content to write
     */
    static writeFile(filePath, content) {
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(filePath, content, 'utf8');
    }

    /**
     * Check if file exists
     * @param {string} filePath - Path to the file
     * @returns {boolean} True if file exists
     */
    static fileExists(filePath) {
        return fs.existsSync(filePath);
    }

    /**
     * Delete file
     * @param {string} filePath - Path to the file
     */
    static deleteFile(filePath) {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }

    /**
     * Create directory if it doesn't exist
     * @param {string} dirPath - Directory path
     */
    static createDirectory(dirPath) {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    }

    /**
     * Get files in directory
     * @param {string} dirPath - Directory path
     * @param {string} extension - File extension filter (optional)
     * @returns {Array<string>} Array of file paths
     */
    static getFilesInDirectory(dirPath, extension = null) {
        if (!fs.existsSync(dirPath)) {
            return [];
        }
        
        const files = fs.readdirSync(dirPath);
        
        if (extension) {
            return files.filter(file => file.endsWith(extension));
        }
        
        return files;
    }

    /**
     * Copy file
     * @param {string} source - Source file path
     * @param {string} destination - Destination file path
     */
    static copyFile(source, destination) {
        const destDir = path.dirname(destination);
        this.createDirectory(destDir);
        fs.copyFileSync(source, destination);
    }

    /**
     * Get file size in bytes
     * @param {string} filePath - Path to the file
     * @returns {number} File size in bytes
     */
    static getFileSize(filePath) {
        const stats = fs.statSync(filePath);
        return stats.size;
    }

    /**
     * Get file modification time
     * @param {string} filePath - Path to the file
     * @returns {Date} File modification time
     */
    static getFileModificationTime(filePath) {
        const stats = fs.statSync(filePath);
        return stats.mtime;
    }

    /**
     * Clean directory (remove all files)
     * @param {string} dirPath - Directory path
     */
    static cleanDirectory(dirPath) {
        if (fs.existsSync(dirPath)) {
            const files = fs.readdirSync(dirPath);
            for (const file of files) {
                const filePath = path.join(dirPath, file);
                const stat = fs.statSync(filePath);
                
                if (stat.isDirectory()) {
                    this.cleanDirectory(filePath);
                    fs.rmdirSync(filePath);
                } else {
                    fs.unlinkSync(filePath);
                }
            }
        }
    }
}

module.exports = FileHelper;