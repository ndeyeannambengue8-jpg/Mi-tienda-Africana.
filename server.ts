import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy initializer for Gemini API client to prevent crashing on startup if key is missing
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === 'MY_GEMINI_API_KEY') {
      throw new Error('GEMINI_API_KEY is not configured or is the default placeholder. Please add your key in Settings > Secrets.');
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// REST API Endpoints
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', keyConfigured: !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY' });
});

app.post('/api/generate-print', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Se requiere un prompt de texto válido.' });
  }

  try {
    const ai = getAiClient();
    
    // Call Gemini 3.1 Flash Image model as requested by metadata
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-image',
      contents: {
        parts: [
          {
            text: `${prompt}. Seamless pattern, vibrant African summer wax print texture, Ankara style, highly detailed fashion design fabric swatch.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: '1:1',
          imageSize: '1K',
        },
      },
    });

    let base64Image = null;
    if (response.candidates && response.candidates[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          base64Image = `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    if (!base64Image) {
      throw new Error('No se pudo extraer la imagen de la respuesta de Gemini.');
    }

    res.json({ success: true, imageUrl: base64Image });
  } catch (error: any) {
    console.error('Error generating print with Gemini 3.1:', error);
    
    // Fallback: Try gemini-2.5-flash-image if gemini-3.1 is not available/authorized
    try {
      console.log('Attempting fallback with gemini-2.5-flash-image...');
      const ai = getAiClient();
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              text: `${prompt}. Seamless African Ankara print textile swatch.`,
            },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: '1:1',
          },
        },
      });

      let base64Image = null;
      if (response.candidates && response.candidates[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            base64Image = `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
            break;
          }
        }
      }

      if (base64Image) {
        return res.json({ success: true, imageUrl: base64Image, fallbackUsed: true });
      }
    } catch (fallbackError: any) {
      console.error('Fallback model failed too:', fallbackError);
    }

    // Elegant Mock Fallback (so the app NEVER crashes and always outputs a beautiful pattern)
    // We return a randomly chosen beautiful Ankara pattern style from pre-defined geometric SVG definitions
    const fallbacks = [
      // Solar Ankara
      `<svg width="500" height="500" xmlns="http://www.w3.org/2000/svg" style="background-color: #fca5a5;">
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#dc2626" stroke-width="2"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="#f59e0b"/>
        <g fill="#dc2626" opacity="0.85">
          <circle cx="250" cy="250" r="180" fill="none" stroke="#b91c1c" stroke-width="15" stroke-dasharray="10 15" />
          <circle cx="250" cy="250" r="140" fill="none" stroke="#2563eb" stroke-width="20" />
          <circle cx="250" cy="250" r="80" fill="#1e3a8a" />
          <path d="M 250 50 L 250 450 M 50 250 L 450 250" stroke="#fca5a5" stroke-width="8" />
          <path d="M 100 100 L 400 400 M 100 400 L 400 100" stroke="#fca5a5" stroke-width="6" />
        </g>
        <rect width="100%" height="100%" fill="url(#grid)" opacity="0.3" />
      </svg>`,
      // Royal Kente
      `<svg width="500" height="500" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#10b981"/>
        <g stroke="#eab308" stroke-width="12" fill="none">
          <path d="M 0 50 L 500 50 M 0 150 L 500 150 M 0 250 L 500 250 M 0 350 L 500 350 M 0 450 L 500 450" />
          <path d="M 50 0 L 50 500 M 150 0 L 150 500 M 250 0 L 250 500 M 350 0 L 350 500 M 450 0 L 450 500" stroke="#ef4444" />
        </g>
        <g fill="#3b82f6" opacity="0.9">
          <polygon points="100,100 150,150 100,200 50,150" />
          <polygon points="300,100 350,150 300,200 250,150" fill="#ef4444" />
          <polygon points="200,300 250,350 200,400 150,350" fill="#eab308" />
          <polygon points="400,300 450,350 400,400 350,350" />
        </g>
      </svg>`
    ];

    const randomFallback = fallbacks[Math.floor(Math.random() * fallbacks.length)];
    const svgBase64 = Buffer.from(randomFallback).toString('base64');
    const mockUrl = `data:image/svg+xml;base64,${svgBase64}`;

    res.json({
      success: true,
      imageUrl: mockUrl,
      fallbackUsed: true,
      isMock: true,
      errorInfo: error.message || 'Error general en la API de Imagen.'
    });
  }
});

// Vite middleware or Static Hosting setup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Moda Africana] Servidor escuchando en http://0.0.0.0:${PORT}`);
  });
}

startServer();
