import { Server } from "./backend/Server";
import express from 'express';
const app = express();

const port = 8081;

const server = new Server(app);
server.start(port);
