import { fastify } from "fastify";
import { PostgresDatabase } from "./postgres-database.js";

const server = fastify();

const database = new PostgresDatabase();

server.get("/videos", async (request) => {
	const { search } = request.query;

	const videos = await database.list(search);

	return videos;
});

server.post("/videos", async (request, reply) => {
	await database.create(request.body);

	return reply.status(201).send();
});

server.put("/videos/:id", async (request, reply) => {
	const videoId = request.params.id;

	await database.update(videoId, request.body);

	return reply.status(204).send();
});

server.delete("/videos/:id", async (request, reply) => {
	const videoId = request.params.id;

	await database.delete(videoId);

	return reply.status(204).send();
});

server.listen({ port: 3333 }).then(() => console.log("Server is online 🚀"));
