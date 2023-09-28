import { sql } from "./db.js";

export class PostgresDatabase {
	async list(search) {
		let videos;

		if (search) {
			videos = await sql`SELECT * FROM videos WHERE title ILIKE ${
				"%" + search + "%"
			}`;
		} else {
			videos = await sql`SELECT * FROM videos`;
		}

		return videos;
	}

	async create(video) {
		const { title, description, duration } = video;

		await sql`INSERT INTO videos (title, description, duration) VALUES(${title}, ${description}, ${duration})`;
	}

	async update(id, video) {
		const { title, description, duration } = video;

		await sql`UPDATE videos SET title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id}`;
	}

	async delete(videoId) {
		await sql`DELETE FROM videos WHERE id = ${videoId}`;
	}
}
