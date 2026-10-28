import express from 'express';
import cors from 'cors';

import { authRoutes } from "./modules/auth/auth.routes.js";
import { categoriasRoutes } from "./modules/categorias/categoria.routes.js";
import { profissionaisRoutes } from "./modules/profissionais/profissionais.routes.js";
import cookieParser from "cookie-parser";

export const app = express();
app.use(cookieParser());
app.use(cors()); 
app.use(express.json());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/categorias", categoriasRoutes);
app.use("/api/profissionais", profissionaisRoutes);
app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'achaqui-api' }));
