import express from 'express';
import cors from 'cors';

import { authRoutes } from "./modules/auth/auth.routes.js";

export const app = express();
app.use(cors()); // Ajustar origens permitidas antes de publicar.
app.use(express.json());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'achaqui-api' }));
