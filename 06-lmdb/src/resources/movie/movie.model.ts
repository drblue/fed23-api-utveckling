import { model, Schema, Document } from "mongoose";

export interface MovieDocument extends Document {
	title: string
	runtime: number | null
	release_year?: number
	genres: string[]
	watched: Date
}

const MovieSchema: Schema = new Schema<MovieDocument>({
	title: {
		type: String,
		required: true,
		trim: true,
		minlength: 3,
	},
	runtime: {
		type: Number,
		// min: 1,
		default: null,
		validate(value: number) {
			if (value < 1 && value !== null) {
				throw new Error("Just because you thought the movie was bad, it shouldn't have zero or negative runtime");
			}
		}
	},
	release_year: {
		type: Number,
		min: 1895,
		max: new Date().getFullYear(),
	},
	genres: {
		type: [String],
		lowercase: true,
		default: [],
		// enums: ["action", "sci-fi", "bromance", "realism"],
	},
	watched: {
		type: Date,
		default() {
			return Date.now();
		},
	}
});

export const Movie = model<MovieDocument>("Movie", MovieSchema);
