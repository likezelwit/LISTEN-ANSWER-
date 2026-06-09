const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// URL File MP3 asli Billie Eilish yang mau kita tembak
const MP3_URL = "https://pub-c5e31b5cdafb419a86a69d5d340a9ade.r2.dev/Billie_Eilish_-_WILDFLOWER_Official.mp3";

app.get('/stream-lagu', async (req, res) => {
    try {
        // 1. Set Header CORS agar browser di GitHub Pages tidak memblokir audio ini
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'audio/mpeg');

        // 2. Ambil file MP3 asli sebagai stream (aliran data mentah)
        const response = await axios({
            method: 'get',
            url: MP3_URL,
            responseType: 'stream'
        });

        // 3. Salurkan (pipe) data lagu langsung ke website game kamu
        response.data.pipe(res);

    } catch (error) {
        console.error("Gagal mengambil audio:", error.message);
        res.status(500).send("Error mengambil file audio");
    }
});

app.listen(PORT, () => {
    console.log(`Server Jembatan Anti-CORS aktif di port ${PORT}`);
});
