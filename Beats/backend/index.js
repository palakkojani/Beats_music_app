import express from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import cors from 'cors';
import { faker } from '@faker-js/faker';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3333;

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const localMusicDir = path.join(__dirname, 'music_gallery');

// Enable CORS for React frontend
app.use(cors({
  origin: 'http://beats-three.vercel.app'
}));
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = './uploads/music';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('audio/')) {
      cb(null, true);
    } else {
      cb(new Error('Only audio files are allowed!'), false);
    }
  }
});

if (!fs.existsSync(localMusicDir)) {
  fs.mkdirSync(localMusicDir, { recursive: true });
}

// Function to load local songs
function loadLocalSongs() {
  try {
    const files = fs.readdirSync(localMusicDir);
    return files
      .filter(file => file.match(/\.(mp3|wav|m4a|flac|ogg|aac)$/i))
      .map((file, index) => ({
        id: `local-${Date.now()}-${index}`,
        name: path.parse(file).name,
        artist: 'Unknown Artist',
        album: 'Unknown Album',
        cover: faker.image.avatar(),
        filename: file,
        path: path.join(localMusicDir, file),
        plays: '0 plays',
        duration: '0:00',
        url: `https://beats-5dm9.onrender.com/api/local/${file}`
      }));
  } catch (error) {
    console.error('Error loading local songs:', error);
    return [];
  }
}

// Sample music data with real streaming URLs
const sampleMusicData = [
];

// {
//   id: 1,
//   name: "Death Bed",
//   artist: "Powfu",
//   album: "Death Bed EP",
//   cover: "https://samplesongs.netlify.app/album-arts/death-bed.jpg",
//   url: "https://samplesongs.netlify.app/Death%20Bed.mp3",
//   plays: "45M plays",
//   duration: "2:53"
// },
// {
//   id: 2,
//   name: "Bad Liar",
//   artist: "Imagine Dragons",
//   album: "Origins",
//   cover: "https://samplesongs.netlify.app/album-arts/bad-liar.jpg",
//   url: "https://samplesongs.netlify.app/Bad%20Liar.mp3",
//   plays: "120M plays",
//   duration: "4:20"
// },
// {
//   id: 3,
//   name: "Faded",
//   artist: "Alan Walker",
//   album: "Different World",
//   cover: "https://samplesongs.netlify.app/album-arts/faded.jpg",
//   url: "https://samplesongs.netlify.app/Faded.mp3",
//   plays: "2.8B plays",
//   duration: "3:32"
// },
// {
//   id: 4,
//   name: "Hate Me",
//   artist: "Ellie Goulding",
//   album: "Brightest Blue",
//   cover: "https://samplesongs.netlify.app/album-arts/hate-me.jpg",
//   url: "https://samplesongs.netlify.app/Hate%20Me.mp3",
//   plays: "89M plays",
//   duration: "3:06"
// },
// {
//   id: 5,
//   name: "Solo",
//   artist: "Clean Bandit",
//   album: "What Is Love?",
//   cover: "https://samplesongs.netlify.app/album-arts/solo.jpg",
//   url: "https://samplesongs.netlify.app/Solo.mp3",
//   plays: "1.2B plays",
//   duration: "3:42"
// },
// {
//   id: 6,
//   name: "Without Me",
//   artist: "Halsey",
//   album: "Manic",
//   cover: "https://samplesongs.netlify.app/album-arts/without-me.jpg",
//   url: "https://samplesongs.netlify.app/Without%20Me.mp3",
//   plays: "2.1B plays",
//   duration: "3:21"
// }
// Generate additional fake music data
export function generateMusic() {
  // let musicLibrary = [...generateMusic(), ...loadLocalSongs()];
  const additionalData = [];
  for (let i = 0; i <= 10; i++) {
    additionalData.push({
      id: i,
      name: faker.music.songName(),
      album: faker.music.album(),
      artist: faker.person.fullName(),
      cover: faker.image.avatar(),
      url: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(i % 16) + 1}.mp3`,
      plays: `${faker.number.int({ min: 1, max: 999 })}M plays`,
      duration: `${faker.number.int({ min: 2, max: 5 })}:${faker.number.int({ min: 10, max: 59 })}`
    });
  }
  return [...sampleMusicData, ...additionalData];
}

export function fetchLocalSongs() {

}

export function generateArtist() {
  const data = []
  for (let i = 0; i < 10; i++) {
    data.push({
      id: i,
      name: faker.person.fullName(),
      plays: faker.number.int(100),
      avatar: faker.image.avatar()
    })
  }
  return data
}
// In-memory storage for music metadata
let musicLibrary = generateMusic();
let artistLibrary = generateArtist();
// Get all music artist
app.get('/api/artist', (req, res) => {
  try {
    res.json({
      success: true,
      data: artistLibrary
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      error: "Failed to fetch artists"
    })
  }
})

// Get all music files
app.get('/api/music', (req, res) => {
  try {
    res.json({
      success: true,
      data: musicLibrary
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch music'
    });
  }
});

// Upload music files
app.post('/api/upload', upload.single('music'), (req, res) => {
  try {
    const { title, artist } = req.body;
    const musicFile = {
      id: Date.now(),
      name: title || 'Unknown Title',
      artist: artist || 'Unknown Artist',
      album: 'Unknown Album',
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      cover: faker.image.avatar(),
      plays: '0 plays',
      duration: '0:00',
      url: `https://beats-5dm9.onrender.com/api/stream/${req.file.filename}`
    };

    musicLibrary.push(musicFile);
    res.json({
      success: true,
      message: 'Music uploaded successfully',
      music: musicFile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Upload failed'
    });
  }
});

// Stream music files with range support
app.get('/api/stream/:filename', (req, res) => {
  const filename = req.params.filename;
  const musicPath = path.join(__dirname, 'uploads/music', filename);

  if (!fs.existsSync(musicPath)) {
    return res.status(404).json({ error: 'Music file not found' });
  }

  const stat = fs.statSync(musicPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = (end - start) + 1;

    const file = fs.createReadStream(musicPath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'audio/mpeg',
    };

    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'audio/mpeg',
      'Accept-Ranges': 'bytes'
    };

    res.writeHead(200, head);
    fs.createReadStream(musicPath).pipe(res);
  }
});

app.listen(PORT, () => {
  console.log(`Server is started sir!`);
});
