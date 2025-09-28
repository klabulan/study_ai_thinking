#!/usr/bin/env node
/**
 * Simple Node.js HTTP server for local development of the presentation.
 * Fixes CORS issues when loading content from file system.
 *
 * Usage:
 *   node dev-server.js
 *
 * Then open: http://localhost:8000
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 8000;

// MIME types for proper content serving
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.md': 'text/markdown',
    '.txt': 'text/plain',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon'
};

function getMimeType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    return mimeTypes[ext] || 'application/octet-stream';
}

function serveFile(res, filePath) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found');
            return;
        }

        const mimeType = getMimeType(filePath);
        res.writeHead(200, {
            'Content-Type': mimeType,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': '*'
        });
        res.end(data);
    });
}

const server = http.createServer((req, res) => {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        res.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': '*'
        });
        res.end();
        return;
    }

    const parsedUrl = url.parse(req.url);
    let pathname = parsedUrl.pathname;

    // Default to index.html
    if (pathname === '/') {
        pathname = '/index.html';
    }

    // Remove leading slash and resolve file path
    const filePath = path.join(__dirname, pathname.slice(1));

    // Security check - ensure file is within project directory
    const resolvedPath = path.resolve(filePath);
    const projectRoot = path.resolve(__dirname);

    if (!resolvedPath.startsWith(projectRoot)) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('Access denied');
        return;
    }

    // Check if file exists
    fs.access(resolvedPath, fs.constants.F_OK, (err) => {
        if (err) {
            // Try to serve index.html for SPA routing
            if (pathname.endsWith('.html') || !path.extname(pathname)) {
                serveFile(res, path.join(__dirname, 'index.html'));
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('File not found');
            }
        } else {
            serveFile(res, resolvedPath);
        }
    });
});

server.listen(PORT, () => {
    console.log('🚀 Starting presentation development server...');
    console.log(`📁 Serving from: ${__dirname}`);
    console.log(`🌐 Open in browser: http://localhost:${PORT}`);
    console.log('🛑 Press Ctrl+C to stop');
    console.log();
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`❌ Port ${PORT} is already in use.`);
        console.log('   Try a different port or stop the running server.');
    } else {
        console.log(`❌ Error starting server: ${err.message}`);
    }
    process.exit(1);
});

process.on('SIGINT', () => {
    console.log('\n👋 Server stopped.');
    process.exit(0);
});