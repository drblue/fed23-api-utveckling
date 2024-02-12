import { model, Schema, Document } from "mongoose";

export interface MovieDocument extends Document {
	title: string
	runtime?: number
	release_year?: number
}

const MovieSchema: Schema = new Schema<MovieDocument>({
	title: {
		type: String,
		required: true,
	},
	runtime: {
		type: Number,
		min: 1,
	},
	release_year: {
		type: Number,
		min: 1895,
		max: new Date().getFullYear(),
	},
});

export const Movie = model<MovieDocument>("Movie", MovieSchema);
