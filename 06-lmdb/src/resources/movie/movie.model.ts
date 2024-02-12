import { model, Schema, Document } from "mongoose";

export interface MovieDocument extends Document {
	title: string
	runtime?: number
	release_year?: number
}

const MovieSchema: Schema = new Schema<MovieDocument>({
	title: { type: String, required: true },
	runtime: Number,
	release_year: Number,
});

export const Movie = model<MovieDocument>("Movie", MovieSchema);
